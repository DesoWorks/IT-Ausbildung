'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const ctx={};vm.runInNewContext(fs.readFileSync('js/module-daten.js','utf8'),ctx);
const entry=ctx.MODULE_TOOLS.find(x=>x.id==='raid-labor');assert(entry&&entry.datei==='module/raid-labor.html');
const html=fs.readFileSync(entry.datei,'utf8');
for(const id of ['raid-level','raid-gruppen','raid-laufwerke','raid-ergebnis','raid-grafik','raid-blockliste','raid-quiz'])assert(html.includes('id="'+id+'"'));
assert(html.includes('RAID ersetzt kein Backup'));
for(const file of ['js/raid-kern.js','js/raid-rack-modell.js','js/raid-rack.js']){
 const s=fs.readFileSync(file,'utf8');assert(!/innerHTML|\beval\s*\(|child_process|\bfetch\s*\(|XMLHttpRequest|localStorage|sessionStorage|new Function/.test(s),file);
}
assert(html.indexOf('raid-kern.js')<html.indexOf('raid-rack-modell.js'));
assert(html.indexOf('raid-rack-modell.js')<html.indexOf('raid-rack.js'));
assert(html.includes('navigation.js') && html.includes('anzeige-glossar.js'));
console.log('RAID Integration: Katalog, HTML-Alternative, Skriptreihenfolge, Backup-Hinweis und sichere lokale APIs bestanden.');
