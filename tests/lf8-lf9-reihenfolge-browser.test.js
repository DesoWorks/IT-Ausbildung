/* Paket 3, Browserprüfung der tatsächlichen Anordnung (eigenes temporäres Chrome-Profil).
 * Prüft: input.value bleibt Original-ID, alte Speicherstände werden gleich bewertet,
 * Anordnung bleibt je Seitenbesuch stabil (Klick, Prüfen, Abgabe) und wechselt zwischen Besuchen. */
"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs"), path = require("node:path"), os = require("node:os"), http = require("node:http");
const { spawn } = require("node:child_process");
const root = path.resolve(__dirname, "..");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function until(fn, label) { for (let i = 0; i < 100; i++) { if (await fn()) return; await delay(50); } throw Error("Nicht erreicht: " + label); }
async function main() {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "lf89-reihenfolge-"));
  const server = http.createServer((req, res) => {
    const file = path.resolve(root, "." + decodeURIComponent(new URL(req.url, "http://localhost").pathname));
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); res.end(); return; }
    const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon" };
    res.setHeader("Content-Type", types[path.extname(file)] || "application/octet-stream"); fs.createReadStream(file).pipe(res);
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const base = "http://127.0.0.1:" + server.address().port;
  const chrome = spawn(process.env.CHROME_BIN || "/usr/bin/google-chrome", ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu", "--remote-debugging-port=0", "--user-data-dir=" + profile, "about:blank"], { stdio: "ignore" });
  let socket, sendCommand;
  try {
    await until(() => fs.existsSync(path.join(profile, "DevToolsActivePort")), "Chrome gestartet");
    const port = fs.readFileSync(path.join(profile, "DevToolsActivePort"), "utf8").split("\n")[0];
    const targets = await (await fetch("http://127.0.0.1:" + port + "/json")).json();
    socket = new WebSocket(targets.find(t => t.type === "page").webSocketDebuggerUrl);
    await new Promise((resolve, reject) => { socket.addEventListener("open", resolve); socket.addEventListener("error", reject); });
    const waiting = new Map(), errors = []; let sequence = 0;
    socket.addEventListener("message", event => {
      const message = JSON.parse(event.data);
      if (message.id && waiting.has(message.id)) { const w = waiting.get(message.id); clearTimeout(w.timer); waiting.delete(message.id); message.error ? w.reject(Error(JSON.stringify(message.error))) : w.resolve(message.result); }
      if (message.method === "Runtime.exceptionThrown") errors.push(message.params.exceptionDetails);
    });
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = ++sequence, timer = setTimeout(() => { waiting.delete(id); reject(Error("CDP Timeout " + method)); }, 8000);
        waiting.set(id, { resolve, reject, timer }); socket.send(JSON.stringify({ id, method, params }));
      });
    }
    sendCommand = send;
    async function ev(expression) {
      const result = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
      if (result.exceptionDetails) throw Error(JSON.stringify(result.exceptionDetails));
      return result.result.value;
    }
    await send("Page.enable"); await send("Runtime.enable");
    const ready = id => until(async () => { try { return await ev('document.readyState === "complete" && document.body.dataset.page === ' + JSON.stringify(id) + ' && document.querySelectorAll("#questions fieldset, #lernziel-fragen fieldset").length > 0'); } catch (_) { return false; } }, "Seite " + id);
    async function nav(id) { await send("Page.navigate", { url: base + "/module/" + id + ".html" }); await ready(id); }
    async function reload(id) { await send("Page.reload", { ignoreCache: true }); await ready(id); }
    const click = selector => ev(`document.querySelector(${JSON.stringify(selector)}).click()`);
    // Sichtbare Reihenfolge der input.value je Frage, von oben nach unten
    const order = host => ev(`Array.from(document.querySelectorAll(${JSON.stringify(host + " fieldset")})).map(f => Array.from(f.querySelectorAll("input")).map(i => i.value).join(","))`);
    const seenOrders = async (id, host, n) => { const set = new Set(); for (let i = 0; i < n; i++) { set.add(JSON.stringify(await order(host))); await reload(id); } return set; };

    // 1) Lektion mit altem vollständigem Speicherstand
    for (const [id, field, answers] of [
      ["lf8-quellen", "LF8", { q1: "kasse", q2: "neben", q3: "beschreiben", q4: "ohne" }],
      ["lf9-anforderung", "LF9", { q1: "trennung", q2: "zehn", q3: "nein", q4: "an" }]
    ]) {
      await nav(id);
      const key = "it-ausbildung." + id + ".v1";
      const ids = await ev(`${field}_INHALTE[${JSON.stringify(id)}].QUESTIONS.map(q => q.options.map(o => o.id).sort().join(","))`);
      await ev(`localStorage.setItem(${JSON.stringify(key)}, JSON.stringify({answers:${JSON.stringify(answers)},checked:true,finish:true,step:"exercise"}))`);
      await reload(id);
      const fieldsets = await order("#questions");
      fieldsets.forEach((o, i) => assert.equal(o.split(",").sort().join(","), ids[i], id + " Frage " + (i + 1) + ": gleiche Options-IDs, nur andere Reihenfolge erlaubt"));
      assert.deepEqual(await ev('Array.from(document.querySelectorAll("#questions input:checked")).map(i => i.name + "=" + i.value)'), Object.entries(answers).map(([k, v]) => k + "=" + v), id + " alter Stand wählt die richtige ID");
      assert.match(await ev('document.getElementById("result").textContent'), /Alle Antworten richtig/, id + " alter Stand bleibt als richtig bewertet");
      // Interaktion mischt nicht neu
      const before = JSON.stringify(await order("#questions"));
      const wrongId = await ev(`(function(){var q=${field}_INHALTE[${JSON.stringify(id)}].QUESTIONS[0];return q.options.find(o=>o.id!==q.correct).id})()`);
      await ev(`document.querySelector('input[name="q1"][value="${wrongId}"]').click()`);
      await click("#check");
      assert.equal(JSON.stringify(await order("#questions")), before, id + " Anordnung bleibt nach Klick und Prüfen");
      assert.match(await ev('document.getElementById("result").textContent'), /Noch nicht vollständig richtig/);
      assert.equal(JSON.parse(await ev(`localStorage.getItem(${JSON.stringify(key)})`)).answers.q1, wrongId, id + " gespeichert wird die Options-ID");
      // Wechsel zwischen Besuchen
      const orders = await seenOrders(id, "#questions", 8);
      assert.ok(orders.size > 1, id + " Anordnung wechselt zwischen Besuchen");
      console.log(id + ": alter Stand, Options-IDs, stabile Anordnung je Besuch, Wechsel zwischen Besuchen bestanden (" + orders.size + " Anordnungen in 8 Besuchen)");
    }

    // 2) Kontrollen
    for (const [id, field] of [["lf8-kontrolle", "LF8"], ["lf9-kontrolle", "LF9"]]) {
      const key = "it-ausbildung." + id + ".v1";
      await nav(id);
      const richtig = await ev(`${field}_KONTROLLE.FRAGEN.map(q => q.richtig)`);
      // alter abgegebener Stand
      const alt = {}; richtig.forEach((r, i) => { alt[i] = r; });
      await ev(`localStorage.setItem(${JSON.stringify(key)}, JSON.stringify({answers:${JSON.stringify(alt)},finish:true}))`);
      await reload(id);
      assert.deepEqual(await ev('Array.from(document.querySelectorAll("#lernziel-fragen input:checked")).map(i => i.value)'), richtig, id + " alter Stand wählt Buchstaben der Speicherung");
      assert.match(await ev('document.getElementById("lernziel-status").textContent'), /^Bestanden/);
      assert.equal(await ev('Array.from(document.querySelectorAll("#lernziel-fragen p")).filter(p => p.textContent.startsWith("Richtig.")).length'), 24, id + " alle 24 als richtig bewertet");
      // frischer Versuch
      await ev(`localStorage.removeItem(${JSON.stringify(key)})`); await reload(id);
      const frisch = JSON.stringify(await order("#lernziel-fragen"));
      (JSON.parse(frisch)).forEach(o => assert.equal(o.split(",").sort().join(","), "a,b,c", id + " nur a/b/c als Werte"));
      await ev('document.querySelector(\'#lernziel-fragen input[name="f0"][value="b"]\').click()');
      assert.deepEqual(JSON.parse(await ev(`localStorage.getItem(${JSON.stringify(key)})`)).answers, { 0: "b" }, id + " Speicher: Frageindex -> Buchstabe");
      await click("#lernziel-abgeben");
      assert.match(await ev('document.getElementById("lernziel-status").textContent'), /Noch offen/);
      assert.equal(JSON.stringify(await order("#lernziel-fragen")), frisch, id + " Anordnung bleibt bei unvollständiger Abgabe");
      await ev(`${field}_KONTROLLE.FRAGEN.forEach((q,i) => document.querySelector('input[name="f' + i + '"][value="' + q.richtig + '"]').click())`);
      assert.equal(JSON.stringify(await order("#lernziel-fragen")), frisch, id + " Anordnung bleibt nach Antworten");
      await click("#lernziel-abgeben");
      assert.match(await ev('document.getElementById("lernziel-status").textContent'), /^Bestanden/);
      assert.equal(JSON.stringify(await order("#lernziel-fragen")), frisch, id + " Anordnung bleibt nach Abgabe");
      assert.equal(await ev('Array.from(document.querySelectorAll("#lernziel-fragen label")).every(l => l.getAttribute("for") === l.querySelector("input").id)'), true, id + " Label gehört zum eigenen Eingabefeld");
      // sichtbare Position der richtigen Antwort ist nicht starr abc
      const pos = JSON.parse(frisch).map((o, i) => o.split(",").indexOf(richtig[i]));
      assert.ok(new Set(pos).size > 1 && pos.join("") !== "012".repeat(8), id + " sichtbare Positionen der richtigen Antwort nicht starr: " + pos.join(""));
      await ev(`localStorage.removeItem(${JSON.stringify(key)})`);
      const orders = await seenOrders(id, "#lernziel-fragen", 5);
      assert.ok(orders.size > 1, id + " Anordnung wechselt zwischen Besuchen");
      await ev(`localStorage.removeItem(${JSON.stringify(key)})`);
      console.log(id + ": alter Stand, Speicherformat, stabile Anordnung bis nach Abgabe, nicht starres abc bestanden");
    }
    assert.deepEqual(errors, [], "keine unbehandelten Browserfehler");
    console.log("LF8/LF9 Reihenfolge Browser: bestanden.");
  } finally {
    const exited = chrome.exitCode !== null || chrome.signalCode !== null ? Promise.resolve() : new Promise(resolve => chrome.once("exit", resolve));
    if (sendCommand && chrome.exitCode === null && chrome.signalCode === null) { try { await sendCommand("Browser.close"); } catch (_) {} }
    await Promise.race([exited, delay(3000)]);
    if (socket) socket.close();
    if (chrome.exitCode === null && chrome.signalCode === null) { chrome.kill("SIGTERM"); await Promise.race([exited, delay(2000)]); }
    if (chrome.exitCode === null && chrome.signalCode === null) { chrome.kill("SIGKILL"); await exited; }
    await new Promise(resolve => server.close(resolve));
    fs.rmSync(profile, { recursive: true, force: true, maxRetries: 20, retryDelay: 200 });
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
