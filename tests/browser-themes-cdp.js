/* Interaktive CDP-Prüfung: Hell/Dunkel/Hochkontrast mit gerenderten Kontrastwerten und Screenshots.
   Erwartet headless Chrome auf :9223. Kein echter Browser-Zoom, nur Farbmodi. */
const fs = require('node:fs'), assert = require('node:assert/strict');
const { getJson, connect } = require('./cdp-helper.js');

const CONTRAST_JS = `(()=>{
 function parse(c){const m=c.match(/rgba?\\(([^)]+)\\)/);if(!m)return null;const p=m[1].split(',').map(s=>parseFloat(s));return {r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1};}
 function bgOf(el){const layers=[];for(let e=el;e;e=e.parentElement){const c=parse(getComputedStyle(e).backgroundColor);if(c&&c.a>0){layers.push(c);if(c.a>=1)break;}}
  let base={r:255,g:255,b:255};
  for(let i=layers.length-1;i>=0;i--){const l=layers[i];base={r:l.r*l.a+base.r*(1-l.a),g:l.g*l.a+base.g*(1-l.a),b:l.b*l.a+base.b*(1-l.a)};}return base;}
 function gradOf(el){for(let e=el;e;e=e.parentElement){const bi=getComputedStyle(e).backgroundImage;if(bi&&bi.includes('gradient'))return (bi.match(/rgba?\\([^)]+\\)/g)||[]).map(parse);const c=parse(getComputedStyle(e).backgroundColor);if(c&&c.a>=1)return null;}return null;}
 function lum(c){const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)};return 0.2126*f(c.r)+0.7152*f(c.g)+0.0722*f(c.b);}
 function ratio(a,b){const x=lum(a),y=lum(b);return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05);}
 const res=[];
 document.querySelectorAll('h1,h2,h3,p,li,label,a,button,input,select,summary,th,td,code,output,span,strong').forEach(el=>{
  const r=el.getBoundingClientRect();if(r.width<2||r.height<2)return;if(r.right<=0||r.bottom<=0)return;if(el.tagName==='INPUT'&&/range|radio|checkbox/.test(el.type))return;
  const cs=getComputedStyle(el);if(cs.visibility==='hidden'||cs.display==='none'||parseFloat(cs.opacity)===0)return;
  const hasText=[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())||el.tagName==='INPUT'||el.tagName==='SELECT';
  if(!hasText)return;
  const fg=parse(cs.color);if(!fg)return;const bg=bgOf(el);
  const eff=fg.a<1?{r:fg.r*fg.a+bg.r*(1-fg.a),g:fg.g*fg.a+bg.g*(1-fg.a),b:fg.b*fg.a+bg.b*(1-fg.a)}:fg;
  const fs=parseFloat(cs.fontSize);const big=fs>=24||(fs>=18.66&&parseInt(cs.fontWeight)>=700);
  res.push({tag:el.tagName,id:el.id||'',txt:(el.textContent||el.value||'').trim().slice(0,30),ratio:Math.round((gradOf(el)?Math.min(...gradOf(el).map(x=>ratio(eff,x))):ratio(eff,bg))*100)/100,min:big?3:4.5});
 });
 const bad=res.filter(x=>x.ratio<x.min);
 return {n:res.length,min:Math.min(...res.map(x=>x.ratio)),badCount:bad.length,bad:bad.slice(0,8),theme:document.documentElement.dataset.theme};
})()`;

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
  const root = 'file:///home/starnet/projects/IT-Ausbildung/';
  await cmd('Page.enable'); await cmd('Runtime.enable');
  fs.mkdirSync('screenshots/theme-check', { recursive: true });
  const shot = async n => {
    const r = await cmd('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
    fs.writeFileSync('screenshots/theme-check/' + n + '.png', Buffer.from(r.result.data, 'base64'));
  };
  const pages = [['index', 'index.html'], ['subnetting', 'module/subnetting.html'], ['zahlensysteme', 'module/zahlensysteme.html'], ['einheiten', 'module/einheiten.html']];
  const out = {}, failures = [];
  await cmd('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  for (const [name, file] of pages) {
    for (const theme of ['hell', 'dunkel', 'kontrast']) {
      await cmd('Page.navigate', { url: root + file }); await wait(500);
      await ev(`localStorage.setItem("it-ausbildung.anzeige.v1",JSON.stringify({text:100,spacing:false,theme:"${theme}",ruhig:false}))`);
      await cmd('Page.navigate', { url: root + file }); await wait(600);
      if (name === 'subnetting') {
        await ev('(()=>{const a=document.querySelector("[data-ziel=schritte]");a&&a.click();const w=document.querySelector("[data-weiter=uebung]");w&&w.click();const f=document.querySelector("#subnet-form button[type=submit]");f&&f.click()})()');
        await wait(250);
      }
      const c = await ev(CONTRAST_JS);
      assert.equal(c.theme, theme);
      out[name + '/' + theme] = { n: c.n, min: c.min, badCount: c.badCount };
      if (c.badCount) failures.push({ name, theme, bad: c.bad });
      await shot(name + '-' + theme);
    }
  }
  await ev('localStorage.removeItem("it-ausbildung.anzeige.v1")');
  console.log(JSON.stringify({ result: failures.length ? 'FAIL' : 'PASS', failures, out }, null, 1));
  ws.close(); process.exit(failures.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
