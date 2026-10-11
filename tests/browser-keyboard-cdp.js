/* Interaktive CDP-Tastaturprüfung (echte Key-Events): Tab-Reihenfolge, sichtbarer Fokus, Enter-Absenden.
   Erwartet headless Chrome auf :9223. Kein Screenreader-Test, kein echter Browser-Zoom. */
const assert = require('node:assert/strict');
const { getJson, connect } = require('./cdp-helper.js');

const TAB_JS = `(()=>{const a=document.activeElement;if(!a||a===document.body)return null;
 const cs=getComputedStyle(a);const r=a.getBoundingClientRect();
 const outline=cs.outlineStyle!=='none'&&parseFloat(cs.outlineWidth)>=2;
 const shadow=!!cs.boxShadow&&cs.boxShadow!=='none';
 const hidden=r.width<2||r.height<2;
 return {tag:a.tagName,id:a.id||'',txt:(a.textContent||a.value||'').trim().slice(0,24),visibleFocus:outline||shadow,hidden};})()`;

(async () => {
  const page = (await getJson('/json')).find(x => x.type === 'page');
  assert(page, 'keine Chrome-Seite auf :9223');
  const ws = await connect(page.webSocketDebuggerUrl);
  const cmd = (m, p = {}) => ws.send(m, p);
  const ev = async e => {
    const r = await cmd('Runtime.evaluate', { expression: e, awaitPromise: true, returnByValue: true });
    if (r.result.exceptionDetails) throw Error(r.result.exceptionDetails.exception.description);
    return r.result.result.value;
  };
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const key = async (k, code, vk) => {
    await cmd('Input.dispatchKeyEvent', { type: 'keyDown', key: k, code, windowsVirtualKeyCode: vk, text: k === 'Enter' ? '\r' : undefined });
    await cmd('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code, windowsVirtualKeyCode: vk });
  };
  const typeText = async s => { for (const ch of s) await cmd('Input.dispatchKeyEvent', { type: 'char', text: ch }); };
  const root = 'file:///home/starnet/projects/IT-Ausbildung/';
  await cmd('Page.enable'); await cmd('Runtime.enable');
  await cmd('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  const out = {}, failures = [];

  for (const [name, file] of [['index', 'index.html'], ['subnetting', 'module/subnetting.html'], ['zahlensysteme', 'module/zahlensysteme.html'], ['einheiten', 'module/einheiten.html']]) {
    await cmd('Page.navigate', { url: root + file }); await wait(700);
    await ev('localStorage.removeItem("it-ausbildung.anzeige.v1")');
    const seq = [], noFocus = [];
    for (let i = 0; i < 80; i++) {
      await key('Tab', 'Tab', 9);
      const f = await ev(TAB_JS);
      if (!f) continue;
      if (seq.length > 3 && seq[0].tag === f.tag && seq[0].id === f.id && seq[0].txt === f.txt) break;
      seq.push(f);
      if (!f.visibleFocus && !f.hidden) noFocus.push(f.tag + '#' + f.id + ' ' + f.txt);
    }
    out[name] = { stops: seq.length, ohneSichtbarenFokus: noFocus, erste: seq.slice(0, 4).map(s => s.tag + ':' + s.txt) };
    if (noFocus.length) failures.push({ name, noFocus });
  }

  // Subnetting rein per Tastatur: Übung öffnen, Felder füllen, mit Enter absenden
  await cmd('Page.navigate', { url: root + 'module/subnetting.html' }); await wait(700);
  await ev('document.querySelector("[data-ziel=schritte]").focus()'); await key('Enter', 'Enter', 13); await wait(200);
  await ev('document.querySelector("[data-weiter=uebung]").focus()'); await key('Enter', 'Enter', 13); await wait(250);
  await ev('document.getElementById("net1").focus()'); await typeText('192.168.1.127');
  await key('Tab', 'Tab', 9); await typeText('192.168.1.129');
  await key('Enter', 'Enter', 13); await wait(300);
  const res = await ev('document.getElementById("subnet-result").innerText');
  out.subnettingEnter = res.split('\n').slice(0, 3);
  if (!res.trim() || /undefined|NaN/.test(res) || !res.includes('192.168.1.127')) failures.push({ subnettingEnter: res });

  // Zahlensysteme per Tastatur: Wert tippen, Enter
  await cmd('Page.navigate', { url: root + 'module/zahlensysteme.html' }); await wait(700);
  await ev('document.querySelector(".zs-form input").focus()'); await typeText('192'); await key('Enter', 'Enter', 13); await wait(300);
  const zs = await ev('document.querySelector("main").innerText');
  out.zahlensystemeEnter = { hatBinaer: /1100\s?0000/.test(zs), hatHex: /C0/.test(zs) };
  if (!out.zahlensystemeEnter.hatBinaer || !out.zahlensystemeEnter.hatHex) failures.push({ zahlensystemeEnter: zs.slice(0, 300) });

  console.log(JSON.stringify({ result: failures.length ? 'FAIL' : 'PASS', failures, out }, null, 1));
  ws.close(); process.exit(failures.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
