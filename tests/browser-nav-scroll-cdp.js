/* Regressionstest: Scrollposition der linken Navigation bleibt beim echten Dokumentwechsel erhalten.
   Startet eigenen Chrome (dynamischer Debug-Port, temporäres Profil) und eigenen HTTP-Server (Port 0).
   Kein Fremdprozess wird berührt, es wird kein fester Port belegt.
   Umgebungsvariablen:
     NAV_VISIBLE=1  sichtbares Fenster (braucht DISPLAY/WAYLAND_DISPLAY) mit Pausen zum Zuschauen
     NAV_PAUSE=ms   Pause je Schritt im sichtbaren Modus (Standard 1500)
     CHROME_BIN     Pfad zum Browser (Standard google-chrome)
   Zusätzlich misst eine Probe pro geladenem Dokument bildweise (requestAnimationFrame) den scrollTop der Navigation,
   um kurzes Aufblitzen bei 0 oder Sprünge zu erkennen. */
const http = require('node:http'), fs = require('node:fs'), os = require('node:os'), path = require('node:path');
const { spawn } = require('node:child_process'), assert = require('node:assert/strict');
const { getJson, connect } = require('./cdp-helper');
const root = path.resolve(__dirname, '..');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css' };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const visible = process.env.NAV_VISIBLE === '1';
const pause = Number(process.env.NAV_PAUSE || 1500);
const hasDisplay = !!(process.env.DISPLAY || process.env.WAYLAND_DISPLAY);

/* Probe läuft auf jeder neuen Seite vor deren Skripten. */
const probe = `(()=>{const s=[];window.__navSamples=s;const t0=performance.now();const f=()=>{const n=document.querySelector('.site-nav');if(n)s.push(Math.round(n.scrollTop));if(performance.now()-t0<800)requestAnimationFrame(f)};requestAnimationFrame(f)})()`;

let server, chrome, profile, ws, cleaned = false;

/* Idempotent und synchron genug, um auch aus process.on('exit') zu funktionieren. */
function cleanupSync() {
  if (cleaned) return; cleaned = true;
  try { ws && ws.close(); } catch (e) {}
  if (chrome && chrome.pid) {
    try { process.kill(-chrome.pid, 'SIGKILL'); } catch (e) { try { chrome.kill('SIGKILL'); } catch (e2) {} }
  }
  try { server && server.close(); } catch (e) {}
  if (profile) {
    for (let i = 0; i < 10; i++) {
      try { fs.rmSync(profile, { recursive: true, force: true }); } catch (e) {}
      if (!fs.existsSync(profile)) break;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 200);
    }
    if (fs.existsSync(profile)) console.error('WARNUNG: Profil nicht entfernt: ' + profile);
  }
}
process.on('exit', cleanupSync);
for (const sig of ['SIGINT', 'SIGTERM', 'SIGHUP']) process.on(sig, () => { console.error('browser-nav-scroll-cdp.js: abgebrochen (' + sig + ')'); cleanupSync(); process.exit(130); });
process.on('uncaughtException', e => { console.error('browser-nav-scroll-cdp.js: FAIL', e.message); cleanupSync(); process.exit(1); });
process.on('unhandledRejection', e => { console.error('browser-nav-scroll-cdp.js: FAIL', e && e.message || e); cleanupSync(); process.exit(1); });

(async () => {
  if (visible && !hasDisplay) throw Error('NAV_VISIBLE=1 braucht DISPLAY oder WAYLAND_DISPLAY; in dieser Umgebung nicht vorhanden');
  server = http.createServer((req, res) => {
    const p = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!p.startsWith(root) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': types[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(res);
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port + '/';
  profile = fs.mkdtempSync(path.join(os.tmpdir(), 'nav-scroll-'));
  const args = ['--no-sandbox', '--disable-gpu', '--no-first-run', '--remote-debugging-port=0', '--user-data-dir=' + profile, 'about:blank'];
  if (!visible) args.unshift('--headless=new');
  /* detached: eigene Prozessgruppe, damit das Aufräumen alle Chrome-Unterprozesse trifft */
  chrome = spawn(process.env.CHROME_BIN || 'google-chrome', args, { stdio: 'ignore', detached: true });
  chrome.on('error', e => { console.error('Chrome nicht startbar: ' + e.message); cleanupSync(); process.exit(1); });

  /* Chrome schreibt den tatsächlich vergebenen Port in <profil>/DevToolsActivePort */
  let port, target;
  for (let i = 0; i < 100 && !port; i++) {
    try { port = Number(fs.readFileSync(path.join(profile, 'DevToolsActivePort'), 'utf8').split('\n')[0]); } catch (e) { await sleep(100); }
  }
  assert(port > 0, 'DevToolsActivePort nicht gefunden');
  for (let i = 0; i < 50 && !target; i++) { try { target = (await getJson('/json', port)).find(x => x.type === 'page'); } catch (e) { await sleep(200); } }
  assert(target, 'Chrome-Debugport nicht erreichbar (Port ' + port + ')');
  ws = await connect(target.webSocketDebuggerUrl);

  const ev = async expression => { const r = await ws.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }); if (r.result && r.result.exceptionDetails) throw Error(r.result.exceptionDetails.exception.description); return r.result.result.value; };
  const step = async () => { if (visible) await sleep(pause); };
  const open = async (url, expectPath) => { await ws.send('Page.navigate', { url }); for (let i = 0; i < 60; i++) { await sleep(150); try { if (await ev(`location.pathname.endsWith(${JSON.stringify(expectPath)}) && document.readyState==='complete' && !!document.querySelector('.site-nav a[aria-current=page]')`)) { await sleep(900); return; } } catch (e) {} } throw Error('Seite nicht geladen: ' + url); };
  const view = (w, h) => ws.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: false });
  const navState = () => ev(`(()=>{const n=document.querySelector('.site-nav'),a=n.querySelector('a[aria-current=page]'),r=n.getBoundingClientRect(),c=a.getBoundingClientRect();return {top:Math.round(n.scrollTop),max:n.scrollHeight-n.clientHeight,visible:c.top>=r.top&&c.bottom<=r.bottom,cur:a.getAttribute('data-progress-id')}})()`);
  const samples = () => ev(`window.__navSamples||[]`);
  await ws.send('Page.enable'); await ws.send('Runtime.enable');
  await ws.send('Page.addScriptToEvaluateOnNewDocument', { source: probe });

  /* A: Desktop, Klick auf Thema nach tiefem Scroll */
  await view(1400, 900);
  await open(base + 'module/lf1-ausbildungsbetrieb.html', '/lf1-ausbildungsbetrieb.html');
  await ev(`sessionStorage.clear()`);
  await ev(`(()=>{const n=document.querySelector('.site-nav');n.scrollTop=n.scrollHeight;})()`);
  const before = await navState(); assert(before.top > 300, 'Navigation muss scrollbar sein: ' + JSON.stringify(before));
  await ev(`document.querySelector('.site-nav a[data-progress-id=lf1-markt-kundschaft]').scrollIntoView({block:'nearest'});`);
  const beforeClick = await navState(); await step();
  await ev(`document.querySelector('.site-nav a[data-progress-id=lf1-markt-kundschaft]').click()`);
  await open(base + 'module/lf1-markt-kundschaft.html', '/lf1-markt-kundschaft.html');
  const afterClick = await navState();
  const flickA = await samples();
  assert(afterClick.top > 300, 'Scrollposition nach Klick verloren: ' + JSON.stringify({ beforeClick, afterClick }));
  assert(Math.abs(afterClick.top - beforeClick.top) <= 60, 'Scrollposition weicht zu stark ab: ' + JSON.stringify({ beforeClick, afterClick }));
  assert.equal(afterClick.visible, true, 'aktives Thema nicht sichtbar'); assert.equal(afterClick.cur, 'lf1-markt-kundschaft');
  assert(flickA.length > 0, 'Aufblitz-Probe lieferte keine Bilder');
  assert(flickA.every(t => Math.abs(t - beforeClick.top) <= 60), 'Aufblitzen/Scrollsprung im Bildverlauf: ' + JSON.stringify(flickA.slice(0, 20)));
  await step();

  /* B: Tastatur (Fokus + Enter) */
  await ev(`(()=>{const a=document.querySelector('.site-nav a[data-progress-id=lf1-betrieb-aufgaben]');a.scrollIntoView({block:'nearest'});a.focus({preventScroll:true});})()`);
  const beforeKey = await navState(); await step();
  for (const type of ['rawKeyDown', 'char', 'keyUp']) await ws.send('Input.dispatchKeyEvent', { type, key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, text: type === 'keyUp' ? undefined : '\r' });
  await open(base + 'module/lf1-ausbildungsbetrieb.html', '/lf1-ausbildungsbetrieb.html');
  const afterKey = await navState(); const flickB = await samples();
  assert(afterKey.top > 300 && Math.abs(afterKey.top - beforeKey.top) <= 60, 'Tastaturwechsel verliert Scrollposition: ' + JSON.stringify({ beforeKey, afterKey }));
  assert.equal(afterKey.cur, 'lf1-betrieb-aufgaben');
  assert(flickB.length > 0 && flickB.every(t => Math.abs(t - beforeKey.top) <= 60), 'Aufblitzen/Scrollsprung (Tastatur): ' + JSON.stringify(flickB.slice(0, 20)));
  await step();

  /* C: direkter Aufruf ohne gespeicherten Wert -> aktives Thema sichtbar, Seite scrollt nicht mit */
  await ev(`sessionStorage.clear()`);
  await open(base + 'module/lf5-prozess.html', '/lf5-prozess.html');
  const direct = await navState();
  assert.equal(direct.visible, true, 'aktives Thema bei direktem Aufruf nicht sichtbar: ' + JSON.stringify(direct));
  assert.equal(await ev('window.scrollY'), 0, 'Seite selbst darf nicht springen');

  /* D: kaputter/fremder Speicherwert ist harmlos */
  await ev(`sessionStorage.setItem('it-ausbildung.nav-scroll.v1','abc')`);
  await open(base + 'module/lf5-prozess.html', '/lf5-prozess.html');
  assert.equal((await navState()).visible, true, 'ungültiger Speicherwert darf nichts brechen');
  await step();

  /* E: Ansichtsgrößen (Tablet 1100 hoch/niedrig, schmal) */
  await view(1100, 500);
  await ev(`sessionStorage.clear()`);
  await open(base + 'module/lf1-ausbildungsbetrieb.html', '/lf1-ausbildungsbetrieb.html');
  await ev(`(()=>{const n=document.querySelector('.site-nav');n.scrollTop=n.scrollHeight;})()`);
  await ev(`document.querySelector('.site-nav a[data-progress-id=lf1-markt-kundschaft]').click()`);
  await open(base + 'module/lf1-markt-kundschaft.html', '/lf1-markt-kundschaft.html');
  const small = await navState(); assert(small.top > 300 && small.visible, 'niedriges Fenster: ' + JSON.stringify(small));
  await view(320, 700);
  await open(base + 'module/lf1-ausbildungsbetrieb.html', '/lf1-ausbildungsbetrieb.html');
  const narrow = await ev(`({disp:getComputedStyle(document.querySelector('.site-nav')).display,sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth})`);
  assert.equal(narrow.disp, 'none'); assert(narrow.sw <= narrow.cw, 'horizontaler Überlauf: ' + JSON.stringify(narrow));
  await ev(`document.querySelector('.nav-toggle').click()`);
  assert.equal(await ev(`document.querySelector('.nav-toggle').getAttribute('aria-expanded')`), 'true');

  console.log('browser-nav-scroll-cdp.js: PASS', JSON.stringify({ mode: visible ? 'sichtbar' : 'headless', port, frames: { click: flickA.length, key: flickB.length }, beforeClick, afterClick, beforeKey, afterKey, direct, small, narrow }));
})().then(() => { cleanupSync(); process.exit(0); }).catch(e => { console.error('browser-nav-scroll-cdp.js: FAIL', e.message); cleanupSync(); process.exit(1); });
