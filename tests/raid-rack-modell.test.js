'use strict';
const assert=require('node:assert/strict'),rack=require('../js/raid-rack-modell');
let checks=0;
function eq(a,b){assert.deepEqual(a,b);checks++;}
let m=rack.neu();let r=rack.berechne(m);eq([r.rohTB,r.nutzTB,r.overheadTB],[32,16,16]);eq(m.bays.length,16);
for(const s of [1,2,5,6,9,10,13,14])rack.aktion(m,s,'ausfall');eq(rack.berechne(m).status,'degradiert');
rack.aktion(m,3,'ausfall');eq(rack.berechne(m).status,'datenverlust');assert.throws(()=>rack.aktion(m,1,'rebuild'));checks++;
rack.aktion(m,3,'entfernen');eq(rack.berechne(m).status,'datenverlust');rack.reset(m);eq(rack.berechne(m).gueltig,true);
m=rack.neu();rack.aktion(m,1,'ausfall');rack.aktion(m,1,'austauschen');rack.aktion(m,1,'rebuild');eq(m.bays[0].state,'rebuild');eq(rack.berechne(m).status,'degradiert');rack.aktion(m,1,'abschluss');eq(rack.berechne(m).status,'funktionsfaehig');
for(const level of ['10','50']){m=rack.neu(level);const next=level==='10'?3:4;rack.aktion(m,1,'ausfall');rack.aktion(m,next,'ausfall');eq(rack.berechne(m).status,'degradiert');rack.reset(m);rack.aktion(m,1,'ausfall');rack.aktion(m,2,'ausfall');eq(rack.berechne(m).status,'datenverlust');}
m=rack.neu('1');rack.aktion(m,2,'kapazitaet',20);r=rack.berechne(m);eq([r.rohTB,r.nutzTB,r.ungenutztTB],[22,2,18]);rack.aktion(m,3,'einsetzen');eq(rack.berechne(m).rohTB,22);rack.aktion(m,3,'gruppe',1);eq(rack.berechne(m).rohTB,24);
rack.aktion(m,1,'kapazitaet',NaN);eq(rack.berechne(m).gueltig,false);assert.throws(()=>rack.aktion(m,17,'einsetzen'));checks++;
for(const level of ['0','1','5','6','10','50','60'])eq(rack.berechne(rack.neu(level)).gueltig,true);
console.log('raid-rack-modell: '+checks+' checks passed; capacity, group distribution, loss latch, free/mixed drives and rebuild.');
