'use strict';
/* Echte Chrome-DOM-Interaktionen via CDP. Keine Modellmutation durch den Test. */
const assert=require('node:assert/strict');
const {getJson,connect}=require('./cdp-helper');
(async()=>{
 const c=await connect((await getJson('/json',Number(process.env.CDP_PORT||9335))).find(t=>t.type==='page').webSocketDebuggerUrl);
 const ev=async expression=>{const x=await c.send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(x.result.exceptionDetails)throw Error(JSON.stringify(x.result.exceptionDetails));return x.result.result.value;};
 const click=id=>ev(`document.getElementById(${JSON.stringify(id)}).click()`);
 const change=(id,value)=>ev(`{const n=document.getElementById(${JSON.stringify(id)});n.value=${JSON.stringify(value)};n.dispatchEvent(new Event('change'));}`);
 const state=n=>ev(`document.getElementById('bay-${n}').dataset.state`);
 const text=()=>ev(`document.getElementById('raid-ergebnis').textContent`);
 const action=async n=>{await click('bay-'+n);await click('action-'+n);};
 const level=async l=>{await click('raid-reset');await change('raid-level',l);await click('raid-preset');};
 const fail=async slots=>{for(const n of slots)await action(n);};
 const rebuild=async n=>{await action(n);assert.equal(await state(n),'ersatz');assert.equal(await ev(`document.querySelector('#action-${n}').disabled`),false);await action(n);assert.equal(await state(n),'rebuild');assert((await text()).includes('Degradiert'));await action(n);assert.equal(await state(n),'bereit');};
 let cases=0;
 try {
 await c.send('Page.enable');await c.send('Page.navigate',{url:(process.env.BASE_URL||'http://127.0.0.1:8154/')+'module/raid-labor.html'});
 for(let i=0;i<100;i++){if(await ev(`!!document.getElementById('bay-16')`))break;await new Promise(r=>setTimeout(r,50));}
 // Test akzeptiert ausdrücklich nur die erklärenden Szenariobestätigungen.
 await ev(`window.confirm=()=>true;window.__p0errors=[];window.addEventListener('error',e=>__p0errors.push(e.message))`);
 for(const width of [1440,768,320])for(const theme of ['hell','dunkel']) {
  await c.send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});await change('farbmodus',theme);
  for(const l of ['1','5','6','10','50','60']){await level(l);const n=l==='60'?6:1;await fail([n]);await rebuild(n);assert((await text()).includes('Funktionsfähig'));cases++;}
  for(const [l,slots] of [['0',[1]],['5',[1,2]],['6',[1,2,3]],['10',[1,2]],['50',[1,2]],['60',[5,6,7]]]) {
   await level(l);await fail(slots);assert((await text()).includes('Datenverlust'));await action(slots[0]);assert.equal(await state(slots[0]),'ersatz');assert(await ev(`document.querySelector('#action-${slots[0]}').disabled`));assert(await ev(`document.querySelector('#group-${slots[0]}').disabled`));cases++;
  }
  for(const l of ['6','60']){await level(l);await fail([1,2]);await rebuild(1);await rebuild(2);assert((await text()).includes('Funktionsfähig'));cases++;}
  await level('10');await fail([1,3]);await rebuild(1);await rebuild(3);assert((await text()).includes('Funktionsfähig'));cases++;
  await level('60');assert((await text()).includes('32 TB'));assert((await text()).includes('16 TB'));
  await fail([6]);await action(6);await change('cap-6','1');assert(await ev(`document.querySelector('#action-6').disabled`));assert((await ev(`document.querySelector('#raid-bay-detail').textContent`)).includes('zu klein'));
  await change('cap-6','2');await action(6);await fail([5]);await action(6);assert.equal(await state(6),'bereit');assert((await text()).includes('Degradiert'));cases++;
  await level('60');await fail([6]);await action(6);await action(6);await fail([5,7]);await click('bay-6');assert(await ev(`document.querySelector('#action-6').disabled`));assert((await text()).includes('Datenverlust'));cases++;
  await click('raid-reset');await click('bay-6');await change('group-6','1');await click('bay-1');await change('group-1','2');assert.equal(await ev(`document.querySelector('#bay-6 .raid-bay-group').textContent`),'Gruppe 1');
  await click('raid-show-groups');assert.equal(await ev(`getComputedStyle(document.querySelector('.raid-bay-group')).display`),'none');assert.equal(await ev(`getComputedStyle(document.querySelector('.raid-group-summary')).display`),'none');assert.equal(await ev(`document.querySelectorAll('.raid-bay').length`),16);
  await click('raid-show-groups');assert.notEqual(await ev(`getComputedStyle(document.querySelector('.raid-bay-group')).display`),'none');
  await click('raid-reset-all');assert.equal(await ev(`document.querySelector('#bay-1').getAttribute('aria-pressed')`),'true');assert.equal(await ev(`document.querySelector('#raid-level').value`),'60');assert.equal(await ev(`document.querySelector('#raid-show-groups').checked`),true);assert.equal(await ev(`document.querySelectorAll('.raid-bay[data-state=bereit]').length`),16);
  for(let n=1;n<=16;n++){await click('bay-'+n);assert.equal(await ev(`document.querySelector('#raid-bay-detail h3').textContent`),'Schacht '+String(n).padStart(2,'0'));assert.equal(await ev(`document.querySelectorAll('#raid-bay-detail fieldset').length`),1);}
  await ev(`document.getElementById('action-16').focus()`);await c.send('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,text:'\r'});await c.send('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});assert.equal(await state(16),'failed');assert.equal(await ev(`document.activeElement.id`),'action-16');assert.notEqual(await ev(`getComputedStyle(document.activeElement).outlineStyle`),'none');
  assert.equal(await ev(`document.documentElement.scrollWidth>innerWidth`),false);assert.deepEqual(await ev(`__p0errors`),[]);
 }
 console.log('RAID lifecycle browser: '+cases+' scenario/width/theme cases passed; full 06 replacement/rebuild, persistent loss, undersize, rebuild failures, grouping toggle, all bays, resets, keyboard and overflow.');
 } finally {c.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
