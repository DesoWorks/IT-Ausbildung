'use strict';
/* Eigener headless Chrome: CDP_PORT angeben. Keine fremden Tabs verwenden. */
const assert=require('node:assert/strict'),fs=require('node:fs');
const {getJson,connect}=require('./cdp-helper');
(async()=>{
 const port=Number(process.env.CDP_PORT);assert(port,'CDP_PORT fehlt');
 const target=(await getJson('/json',port)).find(t=>t.type==='page');const c=await connect(target.webSocketDebuggerUrl);
 const ev=async expression=>{const x=await c.send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(x.result.exceptionDetails)throw Error(JSON.stringify(x.result.exceptionDetails));return x.result.result.value;};
 await c.send('Page.enable');await c.send('Page.navigate',{url:'http://127.0.0.1:8151/module/raid-labor.html'});
 for(let i=0;i<50;i++){if(await ev('!!document.getElementById("raid-ergebnis")?.textContent'))break;await new Promise(r=>setTimeout(r,100));}
 let cases=0;
 for(const width of [1440,768,320]){
  await c.send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
  for(const level of ['0','1','5','6','10','50','60']){
   await ev(`document.getElementById('raid-level').value='${level}';document.getElementById('raid-level').dispatchEvent(new Event('change'));document.getElementById('raid-preset').click()`);
   const r=await ev(`({text:document.getElementById('raid-ergebnis').textContent,overflow:document.documentElement.scrollWidth>innerWidth,groups:document.querySelectorAll('.raid-gruppe').length,disks:document.querySelectorAll('.raid-disk').length,inputs:document.querySelectorAll('#raid-laufwerke input[type=number]').length})`);
   assert(r.text.includes('Funktionsfähig'),r.text);assert(!r.overflow,width+' RAID '+level);assert(r.disks===r.inputs);assert(r.groups===(['10','50','60'].includes(level)?2:1));cases++;
   await ev(`document.querySelector('#raid-laufwerke input[type=number]').value='';document.querySelector('#raid-laufwerke input[type=number]').dispatchEvent(new Event('input'))`);
   assert((await ev(`document.getElementById('raid-ergebnis').textContent`)).includes('endliche Zahl'));await ev(`document.getElementById('raid-preset').click()`);
  }
  await ev(`document.getElementById('raid-level').value='10';document.getElementById('raid-preset').click();document.querySelectorAll('input[type=checkbox]')[0].click();document.querySelectorAll('input[type=checkbox]')[2].click()`);
  assert((await ev(`document.getElementById('raid-ergebnis').textContent`)).includes('Degradiert'));
  await ev(`document.querySelectorAll('input[type=checkbox]')[2].click();document.querySelectorAll('input[type=checkbox]')[1].click()`);
  assert((await ev(`document.getElementById('raid-ergebnis').textContent`)).includes('Datenverlust'));
  await ev(`document.getElementById('raid-reset').click();document.getElementById('raid-schritt').click()`);
  assert((await ev(`document.getElementById('raid-schritt-text').textContent`)).includes('Schritt 1'));
  await ev(`document.getElementById('raid-quiz').reset();document.getElementById('raid-quiz').requestSubmit()`);assert((await ev(`document.getElementById('raid-quiz-feedback').textContent`)).includes('Bitte'));
  await ev(`document.querySelector('[value=gruppen]').checked=true;document.getElementById('raid-quiz').requestSubmit()`);assert((await ev(`document.getElementById('raid-quiz-feedback').textContent`)).includes('Richtig'));
  await ev(`document.getElementById('raid-add').focus()`);await c.send('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',text:'\r',windowsVirtualKeyCode:13});await c.send('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
  assert.equal(await ev(`document.querySelectorAll('#raid-laufwerke input[type=number]').length`),5);
  await ev(`document.getElementById('raid-preset').click();document.getElementById('raid-level').focus()`);
  await c.send('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});await c.send('Input.dispatchKeyEvent',{type:'keyUp',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});
  assert((await ev(`getComputedStyle(document.activeElement).outlineStyle`))!=='none');
  if(process.env.SCREENSHOTS){const shot=await c.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync('docs/uebergaben/raid-'+width+'.png',Buffer.from(shot.result.data,'base64'));}
 }
 c.close();console.log('RAID Browser: '+cases+' Level-/Breitenkombinationen, Eingabefehler, Gruppenausfälle, Quiz, Tastaturaktivierung und Fokus bestanden.');
})().catch(e=>{console.error(e);process.exitCode=1;});
