'use strict';
const assert=require('node:assert/strict');
const {connect}=require('./cdp-helper');
(async()=>{
 const port=Number(process.env.CDP_PORT);assert(port,'CDP_PORT fehlt');
 const url='file://'+require('node:path').resolve(__dirname,'../module/windows-werkzeugkiste.html');
 const t=await(await fetch('http://127.0.0.1:'+port+'/json/new?'+encodeURIComponent(url),{method:'PUT'})).json();
 const c=await connect(t.webSocketDebuggerUrl);
 const ev=async expression=>{const r=await c.send('Runtime.evaluate',{expression,returnByValue:true});if(r.result.exceptionDetails)throw Error(JSON.stringify(r.result.exceptionDetails));return r.result.result.value;};
 const key=async(k,code=k)=>{await c.send('Input.dispatchKeyEvent',{type:'keyDown',key:k,code,windowsVirtualKeyCode:k==='Enter'?13:9,...(k==='Enter'?{text:'\r'}:{})});await c.send('Input.dispatchKeyEvent',{type:'keyUp',key:k,code});};
 try {
  for(let i=0;i<50;i++){if(await ev('!!document.getElementById("ww-labor-auswahl")?.options.length'))break;await new Promise(r=>setTimeout(r,100));}
  await c.send('Page.bringToFront');
  let cases=0;
  for(const width of [1440,768,320]){
   await c.send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
   await ev(`document.getElementById('ww-modus-labor').focus()`);await key('Enter');
   assert.equal(await ev(`document.getElementById('ww-bereich-labor').hidden`),false);
   await ev(`document.getElementById('ww-labor-suche').focus()`);await key('Tab');
   assert.equal(await ev(`document.activeElement.id`),'ww-labor-shell');
   assert.notEqual(await ev(`getComputedStyle(document.activeElement).outlineStyle`),'none');
   for(const id of ['cmd-shutdown','cmd-ssh','cmd-diskpart']){
    await ev(`document.getElementById('ww-labor-auswahl').value='${id}';document.getElementById('ww-labor-auswahl').dispatchEvent(new Event('change'))`);
    assert(!(await ev(`document.documentElement.scrollWidth>innerWidth`)));
    await ev(`document.querySelector('#ww-labor-detail form button').focus()`);await key('Enter');
    assert((await ev(`document.getElementById('ww-labor-feedback').textContent`)).includes('Bitte'));
    await ev(`document.querySelector('#ww-labor-detail input[type=radio]').focus()`);
    await c.send('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowDown',code:'ArrowDown',windowsVirtualKeyCode:40});await c.send('Input.dispatchKeyEvent',{type:'keyUp',key:'ArrowDown',code:'ArrowDown'});
    assert.equal(await ev(`document.querySelector('#ww-labor-detail input:checked').value`),'option-1');
    await ev(`document.querySelector('#ww-labor-detail form button').focus()`);await key('Enter');assert((await ev(`document.getElementById('ww-labor-feedback').textContent`)).includes('Noch nicht'));
    await ev(`document.querySelector('#ww-labor-detail input[type=radio]').click();document.querySelector('#ww-labor-detail form button').focus()`);await key('Enter');assert((await ev(`document.getElementById('ww-labor-feedback').textContent`)).includes('Richtig'));cases++;
   }
  }
  console.log('Windows Browser: '+cases+' neue Profil-/Breitenkombinationen, echte Enter-/Tab-/Radio-Pfeileingabe, Fokus, Feedback und kein Seitenüberlauf bestanden.');
 } finally {c.close();await fetch('http://127.0.0.1:'+port+'/json/close/'+t.id);}
})().catch(e=>{console.error(e);process.exitCode=1;});
