/* Reale Browserprüfung mit eigenem temporären Profil. Keine fachliche Abnahme.
 * Nutzt technische Lösungsschlüssel; keine Katalogfreigabe, keine Zusatzpakete. */
"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs"), path = require("node:path"), os = require("node:os"), http = require("node:http");
const { spawn } = require("node:child_process");
const root = path.resolve(__dirname, "..");
const fields = {
  lf8: ["quellen", "struktur", "recht", "auswahl", "konzept", "aufbereiten", "uebergabe", "reflexion"],
  lf9: ["anforderung", "ist", "dienste", "infrastruktur", "eignung", "standard", "schutz", "zukunft"]
};
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function until(fn, label) {
  for (let i = 0; i < 100; i++) { if (await fn()) return; await delay(50); }
  throw Error("Nicht erreicht: " + label);
}
async function main() {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "lf8-lf9-test-"));
  const output = path.join(root, ".output", "lf8-lf9");
  fs.mkdirSync(output, { recursive: true });
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
    const waiting = new Map(), errors = [], httpErrors = []; let sequence = 0;
    socket.addEventListener("message", event => {
      const message = JSON.parse(event.data);
      if (message.id && waiting.has(message.id)) {
        const w = waiting.get(message.id); clearTimeout(w.timer); waiting.delete(message.id);
        message.error ? w.reject(Error(JSON.stringify(message.error))) : w.resolve(message.result);
      }
      if (message.method === "Runtime.exceptionThrown") errors.push(message.params.exceptionDetails);
      if (message.method === "Network.responseReceived" && message.params.response.status >= 400) httpErrors.push(message.params.response.url);
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
    await send("Page.enable"); await send("Runtime.enable"); await send("Network.enable");
    async function ready(id) {
      await until(async () => {
        try { return await ev('document.readyState === "complete" && document.body.dataset.page === ' + JSON.stringify(id) + ' && document.querySelectorAll("#questions fieldset, #lernziel-fragen fieldset").length > 0'); }
        catch (_) { return false; }
      }, "Seite " + id);
    }
    async function nav(id) { await send("Page.navigate", { url: base + "/module/" + id + ".html" }); await ready(id); }
    async function reload(id) { await send("Page.reload", { ignoreCache: true }); await ready(id); }
    async function click(selector) { await ev(`document.querySelector(${JSON.stringify(selector)}).click()`); }
    async function viewport(width) { await send("Emulation.setDeviceMetricsOverride", { width, height: 844, deviceScaleFactor: 1, mobile: width < 600 }); }
    async function screenshot(name) {
      const image = await send("Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(path.join(output, name + ".png"), Buffer.from(image.data, "base64"));
    }
    for (const [field, suffixes] of Object.entries(fields)) {
      const namespace = field.toUpperCase();
      for (const suffix of suffixes) {
        const id = field + "-" + suffix;
        await viewport(1280); await nav(id);
        assert.equal(await ev('document.querySelectorAll("#questions fieldset").length'), 4);
        assert.match(await ev('document.getElementById("pct").textContent'), /0 von 5/);
        await click('[data-step="finish"]');
        assert.match(await ev('document.getElementById("done").textContent'), /noch alle vier Antworten/);
        assert.equal(await ev(`LERNFORTSCHRITT.abgeschlossen(${JSON.stringify(id)})`), false, "Abschluss allein reicht nicht");
        await click('[data-step="exercise"]'); await click("#check");
        assert.match(await ev('document.getElementById("result").textContent'), /Noch keine Antwort/);
        await ev(`window.lesson = ${namespace}_INHALTE[${JSON.stringify(id)}]; var q = lesson.QUESTIONS[0]; document.querySelector('input[name="' + q.id + '"][value="' + q.correct + '"]').click()`);
        await click("#check");
        assert.match(await ev('document.getElementById("result").textContent'), /Nicht beantwortet/);
        await ev(`lesson.QUESTIONS.forEach(q => document.querySelector('input[name="' + q.id + '"][value="' + q.correct + '"]').click())`);
        await click("#check"); await click('[data-step="finish"]');
        assert.match(await ev('document.getElementById("done").textContent'), /Lektion abgeschlossen/);
        assert.equal(await ev(`LERNFORTSCHRITT.abgeschlossen(${JSON.stringify(id)})`), true);
        await reload(id);
        assert.equal(await ev('document.querySelectorAll("#questions input:checked").length'), 4);
        assert.equal(await ev('document.getElementById("finish").hidden'), false);
        await click('[data-step="exercise"]');
        await ev(`var q = ${namespace}_INHALTE[${JSON.stringify(id)}].QUESTIONS[0]; document.querySelector('input[name="' + q.id + '"][value="' + q.options.find(o => o.id !== q.correct).id + '"]').click()`);
        assert.equal(await ev('document.getElementById("result").hidden'), true, "altes Feedback entfernt");
        assert.equal(await ev(`LERNFORTSCHRITT.abgeschlossen(${JSON.stringify(id)})`), false);
        await click("#check");
        assert.match(await ev('document.getElementById("result").textContent'), /Noch nicht richtig/);
        await click("#reset");
        assert.equal(await ev('document.querySelectorAll("#questions input:checked").length'), 0);
        assert.equal(await ev('document.getElementById("bar").style.width'), "0%");
        await click('[data-step="case"]'); await click('[data-step="exercise"]');
        const beforeBack = await ev(`localStorage.getItem("it-ausbildung.${id}.v1")`);
        await ev("history.back()");
        await until(() => ev('document.getElementById("case").hidden === false'), "Browser-Zurück " + id);
        assert.equal(await ev(`localStorage.getItem("it-ausbildung.${id}.v1")`), beforeBack, "Zurück ändert gespeicherten Lernstand nicht");
        await reload(id);
        assert.equal(await ev('document.getElementById("exercise").hidden'), false, "Neuladen stellt letzten ausdrücklich gespeicherten Schritt wieder her: " + id);
        await click('[data-step="exercise"]');
        for (const width of [320, 390]) {
          await viewport(width);
          assert.equal(await ev('document.documentElement.scrollWidth <= innerWidth'), true, id + " ohne Überbreite " + width);
          const rects = await ev('Array.from(document.querySelectorAll("#questions fieldset:first-child label")).map(e => { const r=e.getBoundingClientRect(); return { y:r.y, bottom:r.bottom }; })');
          assert.ok(rects[1].y >= rects[0].bottom, id + " Antworten untereinander");
        }
        if (suffix === suffixes[0]) { await ev('window.scrollTo(0, document.getElementById("exercise").offsetTop)'); await screenshot(field + "-uebung-mobil"); }
        console.log(id + ": leer/teilweise/falsch/richtig, Fortschritt, Reload, Reset, Zurück+Reload, 320/390px bestanden");
      }
      const control = field + "-kontrolle", key = "it-ausbildung." + control + ".v1";
      await viewport(1280); await nav(control);
      assert.equal(await ev('document.querySelectorAll("#lernziel-fragen fieldset").length'), 24);
      await click("#lernziel-abgeben");
      assert.match(await ev('document.getElementById("lernziel-status").textContent'), /Noch offen: Frage 1, 2/);
      assert.equal(await ev(`localStorage.getItem(${JSON.stringify(key)})`), null);
      await click('#lernziel-fragen input[name="f0"][value="a"]'); await reload(control);
      assert.equal(await ev('document.querySelectorAll("#lernziel-fragen input:checked").length'), 1);
      await click("#lernziel-abgeben");
      assert.match(await ev('document.getElementById("lernziel-status").textContent'), /Noch offen: Frage 2, 3/);
      await ev(`${namespace}_KONTROLLE.FRAGEN.forEach((q,i) => document.querySelector('input[name="f' + i + '"][value="' + q.richtig + '"]').click())`);
      await click("#lernziel-abgeben");
      assert.match(await ev('document.getElementById("lernziel-status").textContent'), /^Bestanden/);
      assert.equal(await ev('document.querySelectorAll("#lernziel-fragen input:disabled").length'), 72);
      assert.equal(await ev(`LERNFORTSCHRITT.abgeschlossen(${JSON.stringify(control)})`), true);
      await reload(control);
      assert.match(await ev('document.getElementById("lernziel-status").textContent'), /^Bestanden/);
      const saved = await ev(`localStorage.getItem(${JSON.stringify(key)})`);
      await click("#lernziel-reset"); await ev('document.getElementById("reset-form").requestSubmit()');
      await until(() => ev('document.getElementById("reset-hinweis").textContent.includes("Kein Passwort")'), "leeres Passwort");
      await ev('document.getElementById("reset-passwort").value = "absichtlich-falsch"; document.getElementById("reset-form").requestSubmit()');
      await until(() => ev('document.getElementById("reset-hinweis").textContent.includes("nicht richtig")'), "falsches Passwort");
      assert.equal(await ev(`localStorage.getItem(${JSON.stringify(key)})`), saved, "Reset ohne gültiges Passwort erhält Daten");
      assert.equal(await ev('document.querySelectorAll("#lernziel-fragen input:disabled").length'), 72);
      await click("#reset-abbrechen");
      for (const width of [320, 390]) { await viewport(width); assert.equal(await ev('document.documentElement.scrollWidth <= innerWidth'), true, control + " ohne Überbreite " + width); }
      await screenshot(field + "-kontrolle-mobil");
      // Nur im isolierten Testprofil neuen Versuch vorbereiten; kein App-Reset getestet.
      await ev(`localStorage.removeItem(${JSON.stringify(key)})`); await nav(control);
      await ev(`${namespace}_KONTROLLE.FRAGEN.forEach((q,i) => document.querySelector('input[name="f' + i + '"][value="a"]').click())`);
      await click("#lernziel-abgeben");
      assert.match(await ev('document.getElementById("lernziel-status").textContent'), /8 von 24 richtig.*nicht bestanden/);
      await reload(control);
      assert.equal(await ev('document.querySelectorAll("#lernziel-fragen input:disabled").length'), 72);
      const injected = await send("Page.addScriptToEvaluateOnNewDocument", { source: 'Object.defineProperty(Storage.prototype, "setItem", {value: function(){throw Error("Test: Speicher gesperrt");}})' });
      await ev(`localStorage.removeItem(${JSON.stringify(key)})`);
      await nav(control); await click("#lernziel-fragen input");
      assert.match(await ev('document.getElementById("speicher-hinweis").textContent'), /nicht gespeichert/);
      await nav(field + "-" + suffixes[0]); await click('[data-step="exercise"]'); await click("#check");
      assert.match(await ev('document.getElementById("storage-hint").textContent'), /nicht gespeichert/);
      await send("Page.removeScriptToEvaluateOnNewDocument", { identifier: injected.identifier });
      console.log(control + ": Abgabe, bestanden/nicht bestanden, Sperre+Reload, Reset-Schutz, Speicherfehler bestanden");
    }
    await viewport(1280);
    await send("Page.navigate", { url: base + "/index.html" });
    await until(() => ev('document.readyState === "complete" && !!document.querySelector("[data-field-id=lf9]")'), "Katalog geladen");
    for (const field of Object.keys(fields)) {
      assert.equal(await ev(`document.querySelector('[data-field-id="${field}"]').querySelectorAll('a[href]').length`), 0, "keine Katalogfreigabe " + field);
      assert.equal(await ev(`document.querySelector('[data-field-id="${field}"]').querySelectorAll('.overview-lesson.planned').length`), 9);
    }
    assert.ok(await ev('document.querySelector("[data-field-id=lf6]").querySelectorAll("a[href]").length > 0'), "LF6 bleibt erreichbar");
    assert.deepEqual(errors, [], "keine unbehandelten Browserfehler");
    assert.deepEqual(httpErrors, [], "keine Ressourcenfehler");
    console.log("LF8/LF9 Browser: 18 Seiten und Katalog bestanden. Bilder: .output/lf8-lf9/");
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
