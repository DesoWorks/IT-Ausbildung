'use strict';
/* Real Chrome interaction; requires own browser CDP_PORT and preview BASE_URL. */
const assert=require('node:assert/strict'),fs=require('node:fs');
const {getJson,connect}=require('./cdp-helper');
(async()=>{
 const c=await connect((await getJson('/json',Number(process.env.CDP_PORT||9331))).find(t=>t.type==='page').webSocketDebuggerUrl);
 const ev=async expression=>{const x=await c.send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(x.result.exceptionDetails)throw Error(JSON.stringify(x.result.exceptionDetails));return x.result.result.value;};
 const click=id=>ev(`document.getElementById(${JSON.stringify(id)}).click()`);
 const text=()=>ev(`document.getElementById('raid-ergebnis').textContent`);
 const level=async value=>{await ev(`document.getElementById('raid-level').value='${value}';document.getElementById('raid-level').dispatchEvent(new Event('change'))`);await click('raid-preset');};
 const key=async(k,code,n)=>{await c.send('Input.dispatchKeyEvent',{type:'keyDown',key:k,code,windowsVirtualKeyCode:n,...(k==='Enter'?{text:'\r'}:{})});await c.send('Input.dispatchKeyEvent',{type:'keyUp',key:k,code,windowsVirtualKeyCode:n});};
 const change=async(id,value)=>ev(`{const x=document.getElementById('${id}');x.value=${JSON.stringify(value)};x.dispatchEvent(new Event('change'));}`);
 try{
 await c.send('Page.enable');await c.send('Page.navigate',{url:(process.env.BASE_URL||'http://127.0.0.1:8151/')+'module/raid-labor.html'});
 for(let n=0;n<80;n++){if(await ev(`!!document.querySelector('#bay-16')`))break;await new Promise(r=>setTimeout(r,50));}
 let cases=0;
 for(const width of [1440,768,320]){
  await c.send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
  for(const theme of ['hell','dunkel']){
   await ev(`document.getElementById('farbmodus').value='${theme}';document.getElementById('farbmodus').dispatchEvent(new Event('change'))`);
   await level('60');assert.equal(await ev(`getComputedStyle(document.querySelector('#raid-gruppen').closest('label')).display`),'none');assert((await text()).includes('32 TB'));assert((await text()).includes('16 TB'));
   assert.equal(await ev(`document.querySelectorAll('.raid-bay').length`),16);
   const dims=await ev(`({overflow:document.documentElement.scrollWidth>innerWidth,w:document.querySelector('.raid-bay').getBoundingClientRect().width,h:document.querySelector('.raid-bay').getBoundingClientRect().height})`);assert(!dims.overflow);assert(dims.w>=44&&dims.h>=44);
   for(const n of [1,2,5,6,9,10,13,14])await click('bay-'+n);assert((await text()).includes('Degradiert'));
   await click('bay-3');assert((await text()).includes('Datenverlust'));await click('bay-1');assert.equal(await ev(`document.querySelector('#bay-1').dataset.state`),'failed');
   await click('raid-reset');await ev(`document.querySelector('#bay-1').focus()`);await key('Enter','Enter',13);assert.equal(await ev(`document.querySelector('#bay-1').dataset.state`),'failed');
   assert.equal(await ev(`document.activeElement.id`),'bay-1');assert.notEqual(await ev(`getComputedStyle(document.activeElement).outlineStyle`),'none');
   await click('bay-1');assert.equal(await ev(`document.querySelector('#bay-1').dataset.state`),'rebuild');assert((await text()).includes('Degradiert'));await click('bay-1');assert((await text()).includes('Funktionsfähig'));
   for(const l of ['0','1','5','6','10','50','60']){await level(l);assert((await text()).includes('Funktionsfähig'));cases++;}
   await level('10');await click('bay-1');await click('bay-3');assert((await text()).includes('Degradiert'));await click('raid-reset');await click('bay-1');await click('bay-2');assert((await text()).includes('Datenverlust'));
   await level('50');await click('bay-1');await click('bay-4');assert((await text()).includes('Degradiert'));await click('bay-2');assert((await text()).includes('Datenverlust'));
   await level('5');assert.equal(await ev(`document.querySelector('#group-1').options.length`),2);assert((await ev(`document.querySelector('.raid-gruppe h3').textContent`)).includes('Gemeinsames Array'));await level('1');await ev(`document.querySelector('#raid-laufwerke').parentElement.open=true`);await change('cap-2','20');assert((await text()).includes('22 TB'));assert((await text()).includes('18 TB'));
   await click('bay-3');assert((await text()).includes('Freie Laufwerke: 1'));await change('group-3','1');assert((await text()).includes('24 TB'));await click('remove-3');assert((await text()).includes('22 TB'));
   await change('cap-1','');assert((await text()).includes('endliche Zahl'));await click('raid-preset');await click('raid-schritt');assert((await ev(`document.querySelector('#raid-schritt-text').textContent`)).includes('Schritt 1'));
   await ev(`document.querySelector('[name=raid-antwort][value=gruppen]').checked=true;document.querySelector('#raid-quiz').requestSubmit()`);assert((await ev(`document.querySelector('#raid-quiz-feedback').textContent`)).includes('Richtig'));
  }
 }
 await level('60');await c.send('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:1});await ev(`document.querySelector('#bay-1').scrollIntoView({block:'center'})`);
 const rect=await ev(`{const r=document.querySelector('#bay-1').getBoundingClientRect();({x:r.x+r.width/2,y:r.y+r.height/2})}`);
 await c.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[rect]});await c.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 assert.equal(await ev(`document.querySelector('#bay-1').dataset.state`),'failed');
 await c.send('Emulation.setTouchEmulationEnabled',{enabled:false});
 for(const width of [1440,768,320]){await c.send('Emulation.setDeviceMetricsOverride',{width,height:1100,deviceScaleFactor:1,mobile:false});await ev(`document.querySelector('#raid-rack').scrollIntoView({block:'start'})`);const shot=await c.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync('.output/unified-rack-'+width+'.png',Buffer.from(shot.result.data,'base64'));}
 console.log('RAID rack browser: '+cases+' level/width/theme cases; capacity, grouping, rebuild, loss protection, keyboard focus, touch simulation and HTML alternative passed.');
 }finally{c.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
