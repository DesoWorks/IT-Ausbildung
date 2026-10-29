/* Regressionstest: Scrollposition der linken Navigation bleibt beim echten Dokumentwechsel erhalten.
   Startet eigenen headless Chrome (Port 9223, temporäres Profil) und eigenen HTTP-Server. Kein Fremdprozess wird berührt. */
const http = require('node:http'), fs = require('node:fs'), os = require('node:os'), path = require('node:path');
const { spawn } = require('node:child_process'), assert = require('node:assert/strict');
const { getJson, connect } = require('./cdp-helper');
const root = path.resolve(__dirname, '..');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css' };
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const server = http.createServer((req, res) => {
    const p = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!p.startsWith(root) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': types[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(res);
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port + '/';
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'nav-scroll-'));
  const chrome = spawn('google-chrome', ['--headless=new', '--no-sandbox', '--disable-gpu', '--remote-debugging-port=9223', '--user-data-dir=' + profile, 'about:blank'], { stdio: 'ignore' });
  let ws;
  const cleanup = async () => {
    try { ws && ws.close(); } catch (e) {}
    chrome.kill('SIGKILL');
    await new Promise(r => { chrome.once('exit', r); setTimeout(r, 3000); });
    server.close();
    /* Chrome-Unterprozesse können noch kurz schreiben: mit Wiederholung löschen, Restfehler sind kein Testfehler. */
    try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 }); } catch (e) {}
  };
  try {
    let target;
    for (let i = 0; i < 50 && !target; i++) { try { target = (await getJson('/json')).find(x => x.type === 'page'); } catch (e) { await sleep(200); } }
    assert(target, 'Chrome-Debugport nicht erreichbar');
    ws = await connect(target.webSocketDebuggerUrl);
    const ev = async expression => { const r = await ws.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }); if (r.result && r.result.exceptionDetails) throw Error(r.result.exceptionDetails.exception.description); return r.result.result.value; };
    const open = async (url, expectPath) => { await ws.send('Page.navigate', { url }); for (let i = 0; i < 60; i++) { await sleep(150); try { if (await ev(`location.pathname.endsWith(${JSON.stringify(expectPath)}) && document.readyState==='complete' && !!document.querySelector('.site-nav a[aria-current=page]')`)) return; } catch (e) {} } throw Error('Seite nicht geladen: ' + url); };
    const view = (w, h) => ws.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: false });
    const navState = () => ev(`(()=>{const n=document.querySelector('.site-nav'),a=n.querySelector('a[aria-current=page]'),r=n.getBoundingClientRect(),c=a.getBoundingClientRect();return {top:Math.round(n.scrollTop),max:n.scrollHeight-n.clientHeight,visible:c.top>=r.top&&c.bottom<=r.bottom,cur:a.getAttribute('data-progress-id')}})()`);
    await ws.send('Page.enable'); await ws.send('Runtime.enable');

    /* A: Desktop, Klick auf Thema nach tiefem Scroll */
    await view(1400, 900);
    await open(base + 'module/lf1-ausbildungsbetrieb.html', '/lf1-ausbildungsbetrieb.html');
    await ev(`sessionStorage.clear()`);
    await ev(`(()=>{const n=document.querySelector('.site-nav');n.scrollTop=n.scrollHeight;})()`);
    const before = await navState(); assert(before.top > 300, 'Navigation muss scrollbar sein: ' + JSON.stringify(before));
    await ev(`document.querySelector('.site-nav a[data-progress-id=lf1-markt-kundschaft]').scrollIntoView({block:'nearest'});`);
    const beforeClick = await navState();
    await ev(`document.querySelector('.site-nav a[data-progress-id=lf1-markt-kundschaft]').click()`);
    await open(base + 'module/lf1-markt-kundschaft.html', '/lf1-markt-kundschaft.html');
    await sleep(500);
    const afterClick = await navState();
    assert(afterClick.top > 300, 'Scrollposition nach Klick verloren: ' + JSON.stringify({ beforeClick, afterClick }));
    assert(Math.abs(afterClick.top - beforeClick.top) <= 60, 'Scrollposition weicht zu stark ab: ' + JSON.stringify({ beforeClick, afterClick }));
    assert.equal(afterClick.visible, true, 'aktives Thema nicht sichtbar'); assert.equal(afterClick.cur, 'lf1-markt-kundschaft');

    /* B: Tastatur (Fokus + Enter) */
    await ev(`(()=>{const a=document.querySelector('.site-nav a[data-progress-id=lf1-betrieb-aufgaben]');a.scrollIntoView({block:'nearest'});a.focus({preventScroll:true});})()`);
    const beforeKey = await navState();
    for (const type of ['rawKeyDown', 'char', 'keyUp']) await ws.send('Input.dispatchKeyEvent', { type, key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, text: type === 'keyUp' ? undefined : '\r' });
    await open(base + 'module/lf1-ausbildungsbetrieb.html', '/lf1-ausbildungsbetrieb.html'); await sleep(500);
    const afterKey = await navState();
    assert(afterKey.top > 300 && Math.abs(afterKey.top - beforeKey.top) <= 60, 'Tastaturwechsel verliert Scrollposition: ' + JSON.stringify({ beforeKey, afterKey }));
    assert.equal(afterKey.cur, 'lf1-betrieb-aufgaben');

    /* C: direkter Aufruf ohne gespeicherten Wert -> aktives Thema sichtbar, Seite scrollt nicht mit */
    await ev(`sessionStorage.clear()`);
    await open(base + 'module/lf5-prozess.html', '/lf5-prozess.html'); await sleep(500);
    const direct = await navState();
    assert.equal(direct.visible, true, 'aktives Thema bei direktem Aufruf nicht sichtbar: ' + JSON.stringify(direct));
    assert.equal(await ev('window.scrollY'), 0, 'Seite selbst darf nicht springen');

    /* D: kaputter/fremder Speicherwert ist harmlos */
    await ev(`sessionStorage.setItem('it-ausbildung.nav-scroll.v1','abc')`);
    await open(base + 'module/lf5-prozess.html', '/lf5-prozess.html'); await sleep(300);
    assert.equal((await navState()).visible, true, 'ungültiger Speicherwert darf nichts brechen');

    /* E: Ansichtsgrößen (Tablet 1100 hoch/niedrig, schmal) */
    await view(1100, 500);
    await ev(`sessionStorage.clear()`);
    await open(base + 'module/lf1-ausbildungsbetrieb.html', '/lf1-ausbildungsbetrieb.html');
    await ev(`(()=>{const n=document.querySelector('.site-nav');n.scrollTop=n.scrollHeight;})()`);
    await ev(`document.querySelector('.site-nav a[data-progress-id=lf1-markt-kundschaft]').click()`);
    await open(base + 'module/lf1-markt-kundschaft.html', '/lf1-markt-kundschaft.html'); await sleep(500);
    const small = await navState(); assert(small.top > 300 && small.visible, 'niedriges Fenster: ' + JSON.stringify(small));
    await view(320, 700);
    await open(base + 'module/lf1-ausbildungsbetrieb.html', '/lf1-ausbildungsbetrieb.html'); await sleep(300);
    const narrow = await ev(`({disp:getComputedStyle(document.querySelector('.site-nav')).display,sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth})`);
    assert.equal(narrow.disp, 'none'); assert(narrow.sw <= narrow.cw, 'horizontaler Überlauf: ' + JSON.stringify(narrow));
    await ev(`document.querySelector('.nav-toggle').click()`);
    assert.equal(await ev(`document.querySelector('.nav-toggle').getAttribute('aria-expanded')`), 'true');

    console.log('browser-nav-scroll-cdp.js: PASS', JSON.stringify({ beforeClick, afterClick, beforeKey, afterKey, direct, small, narrow }));
  } finally { await cleanup(); }
})().catch(e => { console.error('browser-nav-scroll-cdp.js: FAIL', e.message); process.exit(1); });
