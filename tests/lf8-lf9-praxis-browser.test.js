/* Nutzerpfade für die neu eingeführten Labore, eigenes temporäres Chrome-Profil. */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), os = require('node:os'), http = require('node:http');
const { spawn } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const delay = ms => new Promise(r => setTimeout(r, ms));
async function until(fn, label) { for (let i = 0; i < 100; i++) { if (await fn()) return; await delay(50); } throw Error('Nicht erreicht: ' + label); }
async function main() {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'lf89-praxis-'));
  const output = path.join(root, '.output', 'lf89-praxis'); fs.mkdirSync(output, { recursive: true });
  const server = http.createServer((req, res) => {
    const file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); res.end(); return; }
    res.setHeader('Content-Type', ({ '.html': 'text/html;charset=utf-8', '.js': 'text/javascript;charset=utf-8', '.css': 'text/css;charset=utf-8' })[path.extname(file)] || 'application/octet-stream');
    fs.createReadStream(file).pipe(res);
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const chrome = spawn(process.env.CHROME_BIN || '/usr/bin/google-chrome', ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--remote-debugging-port=0', '--user-data-dir=' + profile, 'about:blank'], { stdio: 'ignore' });
  let socket;
  try {
    await until(() => fs.existsSync(path.join(profile, 'DevToolsActivePort')), 'Chrome');
    const port = fs.readFileSync(path.join(profile, 'DevToolsActivePort'), 'utf8').split('\n')[0];
    const targets = await (await fetch('http://127.0.0.1:' + port + '/json')).json();
    socket = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
    await new Promise((r, j) => { socket.addEventListener('open', r); socket.addEventListener('error', j); });
    const pending = new Map(), errors = [], failed = []; let seq = 0;
    socket.addEventListener('message', event => {
      const m = JSON.parse(event.data);
      if (m.id && pending.has(m.id)) { const p = pending.get(m.id); clearTimeout(p.timer); pending.delete(m.id); m.error ? p.reject(Error(JSON.stringify(m.error))) : p.resolve(m.result); }
      if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails);
      if (m.method === 'Network.responseReceived' && m.params.response.status >= 400) failed.push(m.params.response.url);
    });
    function send(method, params = {}) { return new Promise((resolve, reject) => { const id = ++seq, timer = setTimeout(() => { pending.delete(id); reject(Error('CDP Timeout ' + method)); }, 8000); pending.set(id, { resolve, reject, timer }); socket.send(JSON.stringify({ id, method, params })); }); }
    async function ev(expression) { const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw Error(JSON.stringify(r.exceptionDetails)); return r.result.value; }
    await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
    async function nav(id) { await send('Page.navigate', { url: base + '/module/' + id + '.html' }); await until(async () => { try { return await ev('document.readyState === "complete" && document.body.dataset.page === ' + JSON.stringify(id) + ' && document.querySelectorAll("#questions fieldset").length === 4'); } catch (_) { return false; } }, id); }
    async function click(selector) { await ev('document.querySelector(' + JSON.stringify(selector) + ').click()'); }
    async function set(id, value) { await ev('var el = document.getElementById(' + JSON.stringify(id) + '); el.value = ' + JSON.stringify(value) + '; el.dispatchEvent(new Event("input", {bubbles:true}));'); }
    async function reload(id) { await send('Page.reload'); await until(() => ev('document.readyState === "complete" && document.body.dataset.page === ' + JSON.stringify(id)), 'Reload'); }
    async function mobile(name) {
      for (const width of [320, 390]) {
        await send('Emulation.setDeviceMetricsOverride', { width, height: 844, deviceScaleFactor: 1, mobile: true });
        assert.equal(await ev('document.documentElement.scrollWidth <= innerWidth'), true, name + ' ohne Überbreite ' + width);
        await ev('document.querySelector(".praxis").scrollIntoView()');
        const shot = await send('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync(path.join(output, name + '-' + width + '.png'), Buffer.from(shot.data, 'base64'));
      }
    }
    await nav('lf8-aufbereiten'); await click('[data-step="exercise"]');
    const originalCSV = await ev('document.getElementById("praxis-kasse").value');
    await set('praxis-kasse', ''); await click('#praxis-erzeugen');
    assert.match(await ev('document.getElementById("praxis-status").textContent'), /Nicht bereitgestellt/);
    await click('#praxis-beispiel'); await set('praxis-mapping', 'personen'); await click('#praxis-erzeugen');
    assert.match(await ev('document.getElementById("praxis-status").textContent'), /Feldmapping/);
    await click('#praxis-beispiel'); await click('#praxis-erzeugen');
    assert.equal(await ev('document.querySelectorAll("#praxis-zeilen tr").length'), 4);
    assert.match(await ev('document.getElementById("praxis-zeilen").textContent'), /0,00 EUR/);
    assert.match(await ev('document.getElementById("praxis-ausgabe").value'), /"2026-10-14","","EUR","fehlend"/);
    assert.equal(await ev('document.getElementById("praxis-download").hidden'), false);
    assert.match(await ev('(async () => (await fetch(document.getElementById("praxis-download").href)).text())()'), /datum,umsatz/);
    await click('#praxis-kopieren'); assert.equal(await ev('document.activeElement.id'), 'praxis-ausgabe');
    await set('praxis-notiz', 'Rolle B: 14.10. fehlend, Früh und Spät erhalten.');
    await set('praxis-kasse', originalCSV.replace('1234.5', '1000'));
    assert.equal(await ev('document.getElementById("praxis-ergebnis").hidden'), true);
    await click('[data-step="case"]'); await ev('history.back()');
    await until(() => ev('!document.getElementById("exercise").hidden'), 'Zurück Datenwerkstatt');
    await reload('lf8-aufbereiten'); await click('[data-step="exercise"]');
    assert.match(await ev('document.getElementById("praxis-kasse").value'), /1000/);
    assert.match(await ev('document.getElementById("praxis-notiz").value'), /Rolle B/);
    assert.equal(await ev('document.getElementById("praxis-ergebnis").hidden'), true);
    await click('#praxis-erzeugen'); await mobile('lf8-datenwerkstatt');
    await nav('lf9-infrastruktur'); await click('[data-step="exercise"]');
    await click('#netz-testen'); assert.match(await ev('document.getElementById("netz-status").textContent'), /Zuerst/);
    await set('netz-gateway', ''); await click('#netz-anwenden');
    assert.match(await ev('document.getElementById("netz-status").textContent'), /Nicht angewendet/);
    await click('#netz-beispiel'); await click('#netz-dhcp'); await click('#netz-anwenden'); await click('#netz-testen');
    assert.match(await ev('document.getElementById("netz-status").textContent'), /0\/10 Leases/);
    assert.match(await ev('document.getElementById("netz-zeilen").textContent'), /nicht prüfbar ohne Lease/);
    await click('#netz-beispiel'); await click('#netz-block'); await click('#netz-anwenden'); await click('#netz-testen');
    assert.match(await ev('document.getElementById("netz-zeilen").textContent'), /ERREICHBAR: Schutzfehler/);
    await click('#netz-beispiel'); await set('netz-end', '24'); await click('#netz-anwenden'); await click('#netz-testen');
    assert.match(await ev('document.getElementById("netz-status").textContent'), /5\/10 Leases/);
    await click('#netz-beispiel'); await click('#netz-anwenden'); await click('#netz-testen');
    assert.match(await ev('document.getElementById("netz-status").textContent'), /Modellkriterien erfüllt/);
    assert.equal(await ev('document.querySelectorAll("#netz-zeilen tr").length'), 10);
    await set('netz-count', '15'); assert.equal(await ev('document.getElementById("netz-ergebnis").hidden'), true);
    await click('#netz-testen'); assert.match(await ev('document.getElementById("netz-status").textContent'), /10\/15/);
    await set('netz-end', '34'); await click('#netz-testen'); assert.match(await ev('document.getElementById("netz-status").textContent'), /Zuerst/);
    await click('#netz-anwenden'); await click('#netz-testen'); assert.match(await ev('document.getElementById("netz-status").textContent'), /15\/15/);
    await click('#netz-kopieren'); assert.equal(await ev('document.activeElement.id'), 'netz-protokoll');
    await click('#netz-rechnen'); assert.match(await ev('document.getElementById("netz-kosten").textContent'), /243.07 EUR/);
    await set('netz-notiz', 'B hat fehlenden Zugriffsschutz bemerkt. Pool für 15 erweitert.');
    await reload('lf9-infrastruktur'); await click('[data-step="exercise"]');
    assert.equal(await ev('document.getElementById("netz-end").value'), '34');
    assert.match(await ev('document.getElementById("netz-notiz").value'), /Pool für 15/);
    assert.equal(await ev('document.getElementById("netz-ergebnis").hidden'), true);
    await click('#netz-anwenden'); await click('#netz-testen'); await mobile('lf9-netzlabor');
    assert.deepEqual(errors, [], 'keine Browser-Ausnahmen'); assert.deepEqual(failed, [], 'keine fehlenden Ressourcen');
    console.log('LF8/LF9 Praxis-Browser: leer/falsch/richtig, Änderung/Zurück/Reload, Export/Kopieren, DHCP/Schutz/Kapazität/Kosten und 320/390px bestanden. Screenshots: .output/lf89-praxis');
  } finally {
    if (socket) socket.close(); chrome.kill('SIGTERM'); await new Promise(r => server.close(r)); await delay(200); fs.rmSync(profile, { recursive: true, force: true });
  }
}
main().catch(e => { console.error(e.stack || e); process.exitCode = 1; });
