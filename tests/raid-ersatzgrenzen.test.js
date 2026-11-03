'use strict';
const assert=require('node:assert/strict'),rack=require('../js/raid-rack-modell');
for(const size of [NaN,Infinity,-1,0,1,1000001]) {
 const m=rack.neu();rack.aktion(m,6,'ausfall');rack.aktion(m,6,'austauschen');rack.aktion(m,6,'kapazitaet',size);
 assert.equal(rack.freigabe(m,6).erlaubt,false,'Ungültiger Ersatz '+size);
 assert.throws(()=>rack.aktion(m,6,'rebuild'));
}
console.log('Ersatzgrenzen: 12 Assertions bestanden');
