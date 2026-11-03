'use strict';
/* All HTML module resources and runtime exceptions, plus real browser history. */
const assert=require('node:assert/strict'),fs=require('node:fs');
const {getJson,connect}=require('./cdp-helper');
(async()=>{
 const c=await connect((await getJson('/json',Number(process.env.CDP_PORT||9331))).find(t=>t.type==='page').webSocketDebuggerUrl);
 const ev=async expression=>{const x=await c.send('Runtime.evaluate',{expression,returnByValue:true});if(x.result.exceptionDetails)throw Error(JSON.stringify(x.result.exceptionDetails));return x.result.result.value;};
 const base=process.env.BASE_URL||'http://127.0.0.1:8151/';
 async function go(p){await c.send('Page.navigate',{url:base+p});for(let n=0;n<100;n++){if(await ev(`location.href===${JSON.stringify(base+p)}&&document.readyState==='complete'&&!!document.querySelector('main')`))return;await new Promise(r=>setTimeout(r,40));}throw Error('Page timeout '+p);}
 try{
 await c.send('Page.enable');
 await c.send('Page.addScriptToEvaluateOnNewDocument',{source:`window.__errors=[];addEventListener('error',e=>__errors.push(e.message||'Resource: '+e.target?.src),true);addEventListener('unhandledrejection',e=>__errors.push(String(e.reason)));`});
 const files=['index.html','glossar.html',...fs.readdirSync('module').filter(f=>f.endsWith('.html')).map(f=>'module/'+f)];
 for(const file of files){await go(file);assert.deepEqual(await ev('window.__errors'),[],file);}
 await go('module/bwl-werkstatt.html');await go('module/raid-labor.html');const h=await c.send('Page.getNavigationHistory');const index=h.result.currentIndex;
 await c.send('Page.navigateToHistoryEntry',{entryId:h.result.entries[index-1].id});
 for(let n=0;n<80;n++){if(await ev(`location.pathname.endsWith('bwl-werkstatt.html')&&document.readyState==='complete'`))break;await new Promise(r=>setTimeout(r,40));}
 assert(await ev(`location.pathname.endsWith('bwl-werkstatt.html')`));await c.send('Page.navigateToHistoryEntry',{entryId:h.result.entries[index].id});
 for(let n=0;n<80;n++){if(await ev(`!!document.querySelector('#bay-16')`))break;await new Promise(r=>setTimeout(r,40));}assert(await ev(`!!document.querySelector('#bay-16')`));
 console.log('Unified pages: '+files.length+' pages without runtime/resource errors, back/forward restores RAID.');
 }finally{c.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
