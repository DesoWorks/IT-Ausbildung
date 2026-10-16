/* Interaktive lokale CDP-Prüfung via vorhandene Chrome-Instanz auf :9223. */
const net=require('node:net'),crypto=require('node:crypto'),http=require('node:http'),fs=require('node:fs'),assert=require('node:assert/strict');
function getJson(p){return new Promise((resolve,reject)=>http.get('http://127.0.0.1:9223'+p,r=>{let s='';r.on('data',x=>s+=x);r.on('end',()=>resolve(JSON.parse(s)))}).on('error',reject));}
function connect(url){return new Promise((resolve,reject)=>{const u=new URL(url),c=net.connect(+u.port,u.hostname,()=>{const key=crypto.randomBytes(16).toString('base64');c.write(`GET ${u.pathname}${u.search} HTTP/1.1\r\nHost: ${u.host}\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: ${key}\r\nSec-WebSocket-Version: 13\r\n\r\n`)});let buf=Buffer.alloc(0),up=false,id=0;const waits=new Map();const send=(method,params={})=>new Promise((res,rej)=>{const n=++id;waits.set(n,res);const p=Buffer.from(JSON.stringify({id:n,method,params}));let h=p.length<126?Buffer.from([129,128|p.length]):Buffer.from([129,254,p.length>>8,p.length&255]);const m=crypto.randomBytes(4),o=Buffer.alloc(h.length+4+p.length);h.copy(o);m.copy(o,h.length);for(let i=0;i<p.length;i++)o[h.length+4+i]=p[i]^m[i%4];c.write(o);setTimeout(()=>rej(Error('CDP timeout '+method)),5000)});c.on('data',d=>{buf=Buffer.concat([buf,d]);if(!up){const i=buf.indexOf('\r\n\r\n');if(i<0)return;up=true;buf=buf.subarray(i+4)}while(buf.length>=2){let n=buf[1]&127,o=2;if(n===126){if(buf.length<4)return;n=buf.readUInt16BE(2);o=4;}else if(n===127){if(buf.length<10)return;n=Number(buf.readBigUInt64BE(2));o=10;}const mask=buf[1]&128?4:0;if(buf.length<o+mask+n)return;const opcode=buf[0]&15;let p=buf.subarray(o+mask,o+mask+n);if(mask){const m=buf.subarray(o,o+4);p=Buffer.from(p);for(let i=0;i<n;i++)p[i]^=m[i%4]}buf=buf.subarray(o+mask+n);if(opcode===9){c.write(Buffer.concat([Buffer.from([0x8a,p.length]),p]));continue;}if(opcode===10)continue;if(opcode===1){const x=JSON.parse(p.toString().replace(/^\0+/,""));if(x.id&&waits.has(x.id)){waits.get(x.id)(x);waits.delete(x.id)}}}});c.on('error',reject);c.on('data',()=>{if(up)resolve({send,close:()=>c.destroy()})});});}
(async()=>{const targets=await getJson('/json');const page=targets.find(x=>x.type==='page');assert(page);const ws=await connect(page.webSocketDebuggerUrl);const cmd=(m,p={})=>ws.send(m,p);
const ev=async(e)=>{const r=await cmd('Runtime.evaluate',{expression:e,awaitPromise:true,returnByValue:true});if(r.result.exceptionDetails)throw Error(r.result.exceptionDetails.exception.description);return r.result.result.value};
const wait=ms=>new Promise(r=>setTimeout(r,ms));const root='file:///home/starnet/projects/IT-Ausbildung/';
await cmd('Page.enable');await cmd('Runtime.enable');
async function shot(n){const r=await cmd('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});fs.writeFileSync('screenshots/subnetting-fix/'+n+'.png',Buffer.from(r.result.data,'base64'));}
const out={};
for(const [w,h,scale] of [[1440,1000,1],[390,860,1],[320,860,1],[720,900,2]]){
 await cmd('Emulation.setDeviceMetricsOverride',{width:w,height:h,deviceScaleFactor:1,mobile:w<600});
 await cmd('Page.navigate',{url:root+'module/subnetting.html'});await wait(700);
 if(scale===2)await cmd('Emulation.setPageScaleFactor',{pageScaleFactor:2});
 const tag=w+(scale===2?'-zoom200':'');
 await ev('document.querySelector("[data-ziel=schritte]").click()');await wait(150);
 const d=await ev('(()=>{const cs=[...document.querySelectorAll(".subnetz-karte")].map(c=>{const r=c.getBoundingClientRect();return {l:r.left,r:r.right,t:r.top,b:r.bottom,sw:c.scrollWidth,cw:c.clientWidth}});return {cards:cs,docScroll:document.documentElement.scrollWidth,docClient:document.documentElement.clientWidth}})()');
 assert(d.docScroll<=d.docClient,'Overflow '+tag);d.cards.forEach(c=>assert(c.sw<=c.cw+1,'Clipping '+tag));
 const overlap=!(d.cards[0].r<=d.cards[1].l+0.5||d.cards[0].b<=d.cards[1].t+0.5);assert(!overlap,'Karten überlappen '+tag);
 await shot('beispiel-'+tag);
 await ev('document.querySelector("[data-weiter=uebung]").click()');await wait(150);await shot('uebung-leer-'+tag);
 const inp=await ev('(()=>{const i=document.getElementById("net1"),b=document.querySelector("#subnet-form button[type=submit]"),r=document.getElementById("subnet-form");const ir=i.getBoundingClientRect(),br=b.getBoundingClientRect();const lastIn=document.getElementById("net2").getBoundingClientRect();return {inputH:ir.height,font:getComputedStyle(i).fontSize,pad:getComputedStyle(i).paddingLeft,gapBtn:br.top-lastIn.bottom}})()');
 assert(inp.inputH>=44&&inp.gapBtn>=12,JSON.stringify(inp));
 // leer prüfen
 await ev('document.querySelector("#subnet-form button[type=submit]").click()');await wait(150);
 const leer=await ev('document.getElementById("subnet-result").innerText');assert(!/undefined|NaN/.test(leer),leer);
 // falsch/teilweise
 await ev('(()=>{document.querySelector("input[name=q1][value=true]").click();document.querySelector("input[name=q2][value=false]").click();const a=document.getElementById("net1"),b=document.getElementById("net2");a.value="192.168.1.127";a.dispatchEvent(new Event("input",{bubbles:true}));b.value="192.168.1.128";b.dispatchEvent(new Event("input",{bubbles:true}));document.querySelector("#subnet-form button[type=submit]").click()})()');await wait(150);
 const teil=await ev('document.getElementById("subnet-result").innerText');assert(!/undefined|NaN/.test(teil)&&teil.includes('Teilweise richtig')&&teil.includes('Deine Eingabe: 192.168.1.128'),teil);
 await shot('uebung-teilweise-'+tag);
 // nachträglich geändert
 await ev('(()=>{const b=document.getElementById("net2");b.value="192.168.1.129";b.dispatchEvent(new Event("input",{bubbles:true}))})()');
 const hid=await ev('document.getElementById("subnet-result").hidden');assert.equal(hid,true);
 // richtig
 await ev('(()=>{document.querySelector("input[name=q2][value=true]").click();document.querySelector("#subnet-form button[type=submit]").click()})()');await wait(150);
 const ok=await ev('document.getElementById("subnet-result").innerText');assert(ok.includes('Alles richtig')&&!/undefined/.test(ok),ok);
 // Abschluss
 await ev('document.querySelector("[data-weiter=abschluss]").click()');await wait(200);
 const ab=await ev('(()=>{const n=document.querySelector(".schritte").getBoundingClientRect(),m=document.querySelector("main").getBoundingClientRect(),s=document.getElementById("abschluss").getBoundingClientRect(),f=document.querySelector("footer").getBoundingClientRect();const fp=document.getElementById("fortschritt-text").getBoundingClientRect();return {progressToSection:s.top-fp.bottom,navBottomToSection:s.top-n.bottom,mainTopToSection:s.top-m.top,sectionBottomToFooter:f.top-s.bottom,sectionH:s.height,vh:innerHeight,finish:document.getElementById("subnet-finish").innerText}})()');
 assert(ab.progressToSection<=48&&ab.sectionBottomToFooter<=80,"Leerraum Abschluss "+tag+" "+JSON.stringify(ab));
 await shot('abschluss-'+tag);
 out[tag]={cards:d.cards.length,input:inp,abschluss:ab,leer:leer.split('\n').slice(0,4),teil:teil.split('\n')};
}
console.log(JSON.stringify({result:'PASS',out},null,1));ws.close();})().catch(e=>{console.error(e);process.exit(1)});
