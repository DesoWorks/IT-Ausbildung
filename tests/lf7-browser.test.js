/* Eigener temporärer Chrome und lokaler Server; kein Zugriff auf persönliche Profile. */
"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const http = require("node:http");
const { spawn } = require("node:child_process");
const root = path.resolve(__dirname, "..");
const ids = ["system", "schnittstelle", "fluesse", "auswahl", "unterlage", "zusammenfuehren", "pruefung", "sicherheit"].map(x => "lf7-" + x);
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function until(fn, label) {
  for (let i = 0; i < 100; i++) { if (await fn()) return; await delay(50); }
  throw new Error("Nicht erreicht: " + label);
}
async function main() {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "lf7-test-"));
  const server = http.createServer((req, res) => {
    const file = path.resolve(root, "." + decodeURIComponent(new URL(req.url, "http://localhost").pathname));
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); res.end(); return; }
    const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon" };
    res.setHeader("Content-Type", types[path.extname(file)] || "application/octet-stream");
    fs.createReadStream(file).pipe(res);
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
      if (message.id && waiting.has(message.id)) { const w = waiting.get(message.id); clearTimeout(w.timer); waiting.delete(message.id); message.error ? w.reject(Error(JSON.stringify(message.error))) : w.resolve(message.result); }
      if (message.method === "Runtime.exceptionThrown") errors.push(message.params.exceptionDetails.text + " " + (message.params.exceptionDetails.exception || {}).description);
      if (message.method === "Network.responseReceived" && message.params.response.status >= 400) httpErrors.push(message.params.response.url);
    });
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = ++sequence;
        const timer = setTimeout(() => { waiting.delete(id); reject(Error("CDP Timeout " + method)); }, 8000);
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
    async function nav(id) {
      await send("Page.navigate", { url: base + "/module/" + id + ".html" });
      await until(async () => {
        try { return await ev('document.readyState === "complete" && document.body.dataset.page === ' + JSON.stringify(id) + ' && document.querySelectorAll("#questions fieldset, #lernziel-fragen fieldset").length > 0'); } catch (_) { return false; }
      }, "Seite " + id);
    }
    for (const id of ids) {
      await nav(id);
      assert.equal(await ev('document.querySelectorAll("#questions fieldset").length'), 4);
      assert.equal(await ev('document.querySelectorAll("#questions input").length'), 12);
      assert.equal(await ev('document.getElementById("pct").textContent'), "Fortschritt: 0 von 5 Schritten · Abschluss noch nicht geöffnet");
      await ev('document.querySelector(\'[data-step="exercise"]\').click(); document.getElementById("check").click()');
      assert.match(await ev('document.getElementById("result").textContent'), /Noch keine Antwort/);
      await ev(`window.currentLesson = LF7_INHALTE[${JSON.stringify(id)}]; currentLesson.QUESTIONS.forEach(q => document.querySelector('input[name="' + q.id + '"][value="' + q.correct + '"]').click()); document.getElementById('check').click(); document.querySelector('[data-step="finish"]').click()`);
      assert.match(await ev('document.getElementById("done").textContent'), /Lektion abgeschlossen/);
      assert.equal(await ev('document.getElementById("bar").style.width'), "100%");
      await nav(id);
      assert.equal(await ev('document.querySelectorAll("#questions input:checked").length'), 4);
      assert.equal(await ev('document.getElementById("finish").hidden'), false);
      await ev('document.querySelector(\'[data-step="exercise"]\').click()');
      const stack = await ev(`Array.from(document.querySelectorAll('#questions fieldset:first-child label')).map(x => ({y:x.getBoundingClientRect().y,h:x.getBoundingClientRect().height}))`);
      assert.ok(stack[1].y >= stack[0].y + stack[0].h, "Antworten untereinander " + id);
      await ev(`var l = LF7_INHALTE[${JSON.stringify(id)}]; var q = l.QUESTIONS[0]; document.querySelector('input[name="' + q.id + '"][value="' + q.options.find(o => o.id !== q.correct).id + '"]').click()`);
      assert.equal(await ev('document.getElementById("result").hidden'), true);
      assert.equal(await ev('Array.from(document.querySelectorAll(\'[id^="fb-"]\')).every(e => e.hidden)'), true, "veraltetes Feedback gelöscht");
      assert.equal(await ev('document.getElementById("bar").style.width'), "20%");
      await ev('document.getElementById("check").click()');
      assert.equal(await ev('document.getElementById("bar").style.width'), "80%");
      await ev('document.getElementById("reset").click()');
      assert.equal(await ev('document.querySelectorAll("#questions input:checked").length'), 0);
      assert.equal(await ev('document.getElementById("bar").style.width'), "0%");
      await ev('document.querySelector(\'[data-step="case"]\').click(); document.querySelector(\'[data-step="exercise"]\').click(); history.back()');
      await until(() => ev('document.getElementById("case").hidden === false'), "Browser-Zurück " + id);
      console.log(id + ": Auswahl, Prüfung, Speicherung, Wiederladen, Rücksetzen und Zurück bestanden");
    }
    await nav("lf7-kontrolle");
    assert.equal(await ev('document.querySelectorAll("#lernziel-fragen fieldset").length'), 24);
    await ev('document.getElementById("lernziel-abgeben").click()');
    assert.match(await ev('document.getElementById("lernziel-status").textContent'), /Noch offen/);
    await ev(`LF7_KONTROLLE.FRAGEN.forEach((q,i) => document.querySelector('input[name="f' + i + '"][value="' + q.richtig + '"]').click()); document.getElementById('lernziel-abgeben').click()`);
    assert.match(await ev('document.getElementById("lernziel-status").textContent'), /^Bestanden/);
    assert.equal(await ev('document.querySelectorAll("#lernziel-fragen input:disabled").length'), 72);
    await nav("lf7-kontrolle");
    assert.match(await ev('document.getElementById("lernziel-status").textContent'), /^Bestanden/);
    await ev('localStorage.setItem("it-ausbildung.lf7-system.v1", "unveraendert"); document.getElementById("lernziel-reset").click(); document.getElementById("reset-form").requestSubmit()');
    await until(() => ev('document.getElementById("reset-hinweis").textContent.includes("Kein Passwort")'), "leeres Passwort");
    assert.equal(await ev('document.querySelectorAll("#lernziel-fragen input:disabled").length'), 72);
    await ev('document.getElementById("reset-passwort").value = "falsch"; document.getElementById("reset-form").requestSubmit()');
    await until(() => ev('document.getElementById("reset-hinweis").textContent.includes("nicht richtig")'), "falsches Passwort");
    assert.equal(await ev('document.querySelectorAll("#lernziel-fragen input:disabled").length'), 72);
    await ev('document.getElementById("reset-passwort").value = "FiSi-Jahr1"; document.getElementById("reset-form").requestSubmit()');
    await until(() => ev('document.querySelectorAll("#lernziel-fragen input:checked").length === 0'), "richtiges Passwort leert die Kontrolle");
    assert.equal(await ev('localStorage.getItem("it-ausbildung.lf7-system.v1")'), "unveraendert", "andere Lektion bleibt erhalten");
    await ev(`LF7_KONTROLLE.FRAGEN.forEach((q,i) => document.querySelector('input[name="f' + i + '"][value="a"]').click()); document.getElementById('lernziel-abgeben').click()`);
    assert.match(await ev('document.getElementById("lernziel-status").textContent'), /8 von 24 richtig.*nicht bestanden/);
    await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    assert.equal(await ev('document.documentElement.scrollWidth <= innerWidth'), true, "Kontrolle mobil ohne Überbreite");
    await nav("lf7-system");
    await ev('document.querySelector(\'[data-step="exercise"]\').click()');
    assert.equal(await ev('document.documentElement.scrollWidth <= innerWidth'), true, "Lektion mobil ohne Überbreite");
    // Speicherfehler an einem neuen, nicht am zuvor gesperrten Versuch prüfen.
    await ev('localStorage.removeItem("it-ausbildung.lf7-kontrolle.v1")');
    const injected = await send("Page.addScriptToEvaluateOnNewDocument", { source: 'Object.defineProperty(Storage.prototype, "setItem", {value: function(){throw Error("Speicher gesperrt");}})' });
    await nav("lf7-system");
    await ev('document.querySelector(\'[data-step="exercise"]\').click(); document.getElementById("check").click()');
    assert.match(await ev('document.getElementById("storage-hint").textContent'), /nicht gespeichert/);
    await nav("lf7-kontrolle");
    await ev('document.querySelector("#lernziel-fragen input").click()');
    assert.match(await ev('document.getElementById("speicher-hinweis").textContent'), /nicht gespeichert/);
    await send("Page.removeScriptToEvaluateOnNewDocument", { identifier: injected.identifier });
    assert.deepEqual(errors, [], "keine unbehandelten Browserfehler");
    assert.deepEqual(httpErrors, [], "keine fehlenden Ressourcen");
    console.log("LF7 Browser: 9 Seiten, 24-Fragen-Abgabe, Sperre, Ergebnis, Speichergrenzen und Mobilansicht bestanden.");
  } finally {
    // Chrome soll seine Unterprozesse und Profildateien vor dem Löschen schließen.
    const exited = chrome.exitCode !== null || chrome.signalCode !== null
      ? Promise.resolve() : new Promise(resolve => chrome.once("exit", resolve));
    if (sendCommand && chrome.exitCode === null && chrome.signalCode === null) {
      try { await sendCommand("Browser.close"); } catch (_) { /* Fallback unten. */ }
    }
    await Promise.race([exited, delay(3000)]);
    if (socket) socket.close();
    if (chrome.exitCode === null && chrome.signalCode === null) {
      chrome.kill("SIGTERM"); await Promise.race([exited, delay(2000)]);
    }
    if (chrome.exitCode === null && chrome.signalCode === null) { chrome.kill("SIGKILL"); await exited; }
    await new Promise(resolve => server.close(resolve));
    fs.rmSync(profile, { recursive: true, force: true, maxRetries: 20, retryDelay: 200 });
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });