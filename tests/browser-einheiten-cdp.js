/* Interaktive CDP-Prüfung des Einheitenrechners (headless Chrome auf :9223, lokale file://-Seite).
   Prüft Bedienung, Ergebnistext, Fehlerfall, Enter-Absenden, Stale-Löschung und Überlauf. Kein Screenreader-Test. */
const assert = require('node:assert/strict');
const { getJson, connect } = require('./cdp-helper.js');

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
  const url = 'file:///home/starnet/projects/IT-Ausbildung/module/einheiten.html';
  const out = {}, failures = [];
  const check = (ok, msg) => { if (!ok) failures.push(msg); };
  await cmd('Page.enable'); await cmd('Runtime.enable');
  await cmd('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  await cmd('Page.navigate', { url }); await wait(800);

  out.optionen = await ev('document.querySelectorAll("#eh-von option").length');
  check(out.optionen === 13, 'Einheitenliste unvollständig: ' + out.optionen);
  out.vorab = await ev('document.getElementById("eh-ergebnis").hidden');
  check(out.vorab === true, 'Ergebnis vor Eingabe sichtbar');

  // Beispiel per Tastatur (Fokus + Enter)
  await ev('document.getElementById("eh-beispiel").focus()'); await key('Enter', 'Enter', 13); await wait(250);
  const bsp = await ev('document.getElementById("eh-ergebnis").innerText');
  out.beispiel = bsp.split('\n').slice(0, 4);
  check(bsp.includes('931,322575') && bsp.includes('Rechenweg') && bsp.includes('Warum GB und GiB'), 'Beispiel unvollständig');
  check(!/undefined|NaN/.test(bsp), 'undefined/NaN im Beispiel');

  // Änderung löscht Ergebnis
  await ev('document.getElementById("eh-eingabe").focus()'); await typeText('5');
  out.staleHidden = await ev('document.getElementById("eh-ergebnis").hidden');
  check(out.staleHidden === true, 'altes Ergebnis nicht gelöscht');

  // Eingabe per Tastatur, Enter im Feld
  await ev('document.getElementById("eh-eingabe").value=""; document.getElementById("eh-von").value="Mbit"; document.getElementById("eh-nach").value="MB"');
  await ev('document.getElementById("eh-eingabe").focus()'); await typeText('100'); await key('Enter', 'Enter', 13); await wait(250);
  const mb = await ev('document.getElementById("eh-ergebnis").innerText');
  out.mbit = mb.split('\n').slice(0, 3);
  check(mb.includes('12,5') && mb.includes('100 Mbit'), 'Mbit→MB falsch');

  // Fehlerfall
  await ev('document.getElementById("eh-eingabe").value=""'); await ev('document.getElementById("eh-eingabe").focus()');
  await typeText('abc'); await key('Enter', 'Enter', 13); await wait(250);
  out.fehler = await ev('({t:document.getElementById("eh-fehler").innerText,h:document.getElementById("eh-fehler").hidden,inv:document.getElementById("eh-eingabe").getAttribute("aria-invalid"),erg:document.getElementById("eh-ergebnis").hidden})');
  check(!out.fehler.h && out.fehler.inv === 'true' && out.fehler.erg === true && out.fehler.t.length > 10, 'Fehleranzeige falsch');

  // Layout
  out.layout = {};
  for (const [w, h, scale] of [[1280, 900, 1], [390, 800, 1], [320, 800, 1], [720, 900, 2]]) {
    await cmd('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: scale, mobile: w < 500 });
    await cmd('Page.navigate', { url }); await wait(700);
    await ev('document.getElementById("eh-beispiel").click()'); await wait(200);
    const m = await ev('({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,inp:document.getElementById("eh-eingabe").getBoundingClientRect().height,tab:document.querySelectorAll("#eh-tabelle tbody tr").length})');
    out.layout[w + 'x' + scale] = m;
    check(m.sw <= m.cw + 1, 'Überlauf bei ' + w + ': ' + m.sw + '>' + m.cw);
    check(m.inp >= 44, 'Eingabe zu flach bei ' + w);
    check(m.tab === 13, 'Tabelle unvollständig bei ' + w);
  }
  ws.close();
  const result = { result: failures.length ? 'FAIL' : 'PASS', failures, out };
  require('node:fs').writeFileSync('/tmp/einheiten-cdp.json', JSON.stringify(result, null, 1));
  console.log(JSON.stringify(result, null, 1));
  process.exit(failures.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
