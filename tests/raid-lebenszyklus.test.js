'use strict';
const assert = require('node:assert/strict');
const rack = require('../js/raid-rack-modell');
let checks = 0;
function eq(a,b) { assert.deepEqual(a,b); checks++; }
function fail(m,...slots) { slots.forEach(s=>rack.aktion(m,s,'ausfall')); }
function rebuild(m,s) {
 const group=m.bays[s-1].group;
 rack.aktion(m,s,'austauschen'); eq(m.bays[s-1].state,'ersatz');
 eq(m.bays[s-1].group,group);
 rack.aktion(m,s,'rebuild'); eq(m.bays[s-1].state,'rebuild');
 eq(rack.berechne(m).status,'degradiert');
 rack.aktion(m,s,'abschluss'); eq(m.bays[s-1].state,'bereit');
}
for(const level of ['1','5','6','10','50','60']) {
 const m=rack.neu(level); fail(m,level==='60'?6:1); rebuild(m,level==='60'?6:1);
 eq(rack.berechne(m).status,'funktionsfaehig');
}
for(const [level,slots] of [['0',[1]],['5',[1,2]],['6',[1,2,3]],['10',[1,2]],['50',[1,2]],['60',[5,6,7]]]) {
 const m=rack.neu(level); fail(m,...slots); eq(rack.berechne(m).status,'datenverlust');
 rack.aktion(m,slots[0],'austauschen'); assert.throws(()=>rack.aktion(m,slots[0],'rebuild')); checks++;
 assert.throws(()=>rack.aktion(m,slots[1]||slots[0],'gruppe',8)); checks++;
 eq(rack.berechne(m).status,'datenverlust');
 rack.reset(m); eq(rack.berechne(m).status,'funktionsfaehig');
}
for(const level of ['6','60']) {const m=rack.neu(level);fail(m,1,2);rebuild(m,1);rebuild(m,2);eq(rack.berechne(m).status,'funktionsfaehig');}
let m=rack.neu('10');fail(m,1,3);rebuild(m,1);rebuild(m,3);eq(rack.berechne(m).status,'funktionsfaehig');
m=rack.neu();fail(m,6);rack.aktion(m,6,'austauschen',1);eq(m.bays[5].group,2);assert.match(rack.freigabe(m,6).grund,/klein/);assert.throws(()=>rack.aktion(m,6,'rebuild'));checks+=2;
rack.aktion(m,6,'kapazitaet',2);rack.aktion(m,6,'rebuild');fail(m,5);eq(rack.berechne(m).status,'degradiert');rack.aktion(m,6,'abschluss');eq(m.bays[5].state,'bereit');
m=rack.neu();fail(m,6);rack.aktion(m,6,'austauschen');rack.aktion(m,6,'rebuild');fail(m,5,7);assert.throws(()=>rack.aktion(m,6,'abschluss'));checks++;eq(rack.berechne(m).status,'datenverlust');
m=rack.neu();fail(m,13,14);rack.aktion(m,15,'entfernen');eq(rack.berechne(m).status,'datenverlust');rack.reset(m);eq(m.bays.slice(12).map(b=>b.group),[4,4,4,4]);eq(m.bays.every(b=>b.state==='bereit'),true);
m=rack.neu('1');rack.aktion(m,2,'kapazitaet',20);fail(m,2);rack.aktion(m,2,'austauschen',2);eq(rack.freigabe(m,2).erlaubt,true);
console.log('RAID lifecycle: '+checks+' assertions passed');
