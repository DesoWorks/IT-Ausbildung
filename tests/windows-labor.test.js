"use strict";
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const d = require('../js/windows-labor-daten.js');
const api = require('../js/windows-labor.js');
assert.deepEqual(api.validiere(d), {ok:true,fehler:[]});
const cmd=['ping','ipconfig','tracert','nslookup','netstat','arp','route print','hostname','whoami','systeminfo','tasklist','taskkill','sfc /scannow','DISM','chkdsk'];
const ps=['Get-Help','Get-Command','Get-Process','Get-Service','Get-ComputerInfo','Get-NetIPAddress','Test-Connection','Test-NetConnection','Resolve-DnsName','Get-EventLog','Get-WinEvent','Get-Volume','Get-Disk','Get-PhysicalDisk'];
assert.equal(d.befehle.length,29);
for(const [shell,names] of [['cmd',cmd],['powershell',ps]]) assert.deepEqual(d.befehle.filter(b=>b.shell===shell).map(b=>b.name).sort(),names.sort());
for(const b of d.befehle){
  assert(b.ausgabe.length>0);
  assert(!/[„“]/.test(b.praxis.befehl));
  for(const s of b.syntax) assert(!/[„“]/.test(s.aufruf));
  assert.equal(api.bewerte(b,'').gueltig,false);
  assert.equal(api.bewerte(b,b.uebung.loesungId).richtig,true);
  assert.equal(api.bewerte(b,b.uebung.optionen.find(o=>o.id!==b.uebung.loesungId).id).richtig,false);
  assert(api.bewerte(b,b.uebung.loesungId).text.length>20);
  assert(api.filter(d,b.name,b.shell,'').some(x=>x.id===b.id));
}
assert.equal(api.filter(d,'','cmd','').length,15);
assert.equal(api.filter(d,'','powershell','').length,14);
assert.equal(api.filter(d,'  gibtesnicht-123  ','','').length,0);
assert(api.filter(d,'DNS','','').length>=2);
const clone=()=>JSON.parse(JSON.stringify(d));
let invalid=clone(); invalid.befehle[0].sicherheit=''; assert(!api.validiere(invalid).ok);
invalid=clone(); invalid.befehle[0].quellen[0].url='javascript:alert(1)'; assert(!api.validiere(invalid).ok);
invalid=clone(); invalid.befehle[1].id=invalid.befehle[0].id; assert(!api.validiere(invalid).ok);
const b=id=>d.befehle.find(x=>x.id===id);
assert(b('cmd-netstat').ausgabe.some(x=>x.includes(':8080')));
assert(!b('cmd-tasklist').ausgabe.some(x=>x.includes('svchost.exe')));
assert(b('ps-get-eventlog').fehler.some(x=>x.ursache.includes('PowerShell 7')));
assert(b('ps-test-connection').syntax.some(x=>x.aufruf.includes('-TargetName')&&x.erklaerung.includes('5.1')));
assert(b('cmd-tracert').deutung.some(x=>x.erklaerung.includes('keine UDP')));
assert(b('cmd-route-print').deutung.some(x=>x.erklaerung.includes('Präfix')));
assert(b('cmd-ping').deutung.some(x=>x.erklaerung.includes('hosts')));
for(const file of ['js/windows-labor.js','js/windows-labor-daten.js']){
  const code=fs.readFileSync(path.join(__dirname,'..',file),'utf8');
  assert(!/innerHTML|outerHTML|insertAdjacentHTML|\beval\s*\(|new Function|\bfetch\s*\(|XMLHttpRequest|child_process|localStorage|sessionStorage/.test(code),file+' safe APIs');
}
const html=fs.readFileSync(path.join(__dirname,'../module/windows-werkzeugkiste.html'),'utf8');
for(const id of ['ww-modus-labor','ww-labor-suche','ww-labor-shell','ww-labor-kategorie','ww-labor-auswahl','ww-labor-status']) assert(html.includes('id="'+id+'"'));
assert(html.indexOf('windows-labor-daten.js')<html.indexOf('windows-labor.js'));
console.log('windows-labor: 29 Pflichtprofile, Didaktikfelder, Filter, 87 Antwortfälle, Quellen-/Sicherheits-/Fachregression bestanden');
