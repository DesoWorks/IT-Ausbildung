'use strict';
const assert=require('node:assert/strict');
const {getJson,connect}=require('./cdp-helper');
(async()=>{
 const c=await connect((await getJson('/json',Number(process.env.CDP_PORT||9331))).find(t=>t.type==='page').webSocketDebuggerUrl);
 const ev=async expression=>{const x=await c.send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(x.result.exceptionDetails)throw Error(JSON.stringify(x.result.exceptionDetails));return x.result.result.value;};
 const base=process.env.BASE_URL||'http://127.0.0.1:8151/';
 async function go(p){await c.send('Page.navigate',{url:base+p});for(let n=0;n<80;n++){if(await ev(`location.href===${JSON.stringify(base+p)}&&document.readyState==='complete'&&!!document.querySelector('#farbmodus')`))return;await new Promise(r=>setTimeout(r,50));}throw Error('Navigation timeout '+p);}
 let cases=0;
 try{await c.send('Page.enable');
 for(const width of [1440,768,320]){await c.send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
 for(const theme of ['hell','dunkel']){await go('index.html');await ev(`document.querySelector('#farbmodus').value='${theme}';document.querySelector('#farbmodus').dispatchEvent(new Event('change'))`);
 for(const p of ['module/bwl-werkstatt.html','module/pc-explorer.html','module/windows-werkzeugkiste.html','module/raid-labor.html']){await go(p);const r=await ev(`({theme:document.documentElement.dataset.theme,overflow:document.documentElement.scrollWidth>innerWidth,nav:!!document.querySelector('#site-nav a[href="../module/raid-labor.html"]')})`);assert.equal(r.theme,theme,p);assert(!r.overflow,width+' '+p);assert(r.nav);cases++;await go(p);assert.equal(await ev('document.documentElement.dataset.theme'),theme);}}}
 console.log('Unified browser: '+cases+' module/width/theme combinations, navigation and theme persistence passed.');
 }finally{c.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
