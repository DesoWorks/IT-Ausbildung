'use strict';
const assert = require('node:assert/strict');
const {berechne,minimum} = require('../js/raid-kern.js');
const disks = sizes => sizes.map((tb,i)=>({id:'d'+i,tb}));
function run(level,sizes,groups,failed=[]) { return berechne({level,disks:disks(sizes),groups,failed}); }
let checks=0;
function ok(v) { assert(v); checks++; }
for (const [l,n] of Object.entries(minimum)) {
  const groups = ['10','50','60'].includes(l) ? [Array.from({length:n/2},(_,i)=>'d'+i),Array.from({length:n/2},(_,i)=>'d'+(i+n/2))] : undefined;
  let r=run(l,Array(n).fill(2),groups);
  ok(r.gueltig); ok(r.rohTB===n*2); ok(r.status==='funktionsfaehig');
  const expected={'0':4,'1':2,'5':4,'6':4,'10':4,'50':8,'60':8};
  ok(r.nutzTB===expected[l]);
  ok(!run(l,Array(n-1).fill(2),groups).gueltig);
  for(let mask=0;mask<2**n;mask++) {
    const failed=Array.from({length:n},(_,i)=>i).filter(i=>mask&(1<<i)).map(i=>'d'+i);
    r=run(l,Array(n).fill(2),groups,failed);
    const threshold=l==='0'?0:l==='1'?n-1:['6','60'].includes(l)?2:1;
    const lost=(groups||[disks(Array(n).fill(2)).map(d=>d.id)]).some(g=>g.filter(id=>failed.includes(id)).length>threshold);
    ok((r.status==='datenverlust')===lost);
    ok(r.nutzTB+r.overheadTB+r.ungenutztTB===r.rohTB);
  }
}
let r=run('1',[2,4,8]); ok(r.gueltig&&r.nutzTB===2&&r.overheadTB===4&&r.ungenutztTB===8);
r=run('5',[1,2,4]); ok(r.nutzTB===2&&r.overheadTB===1&&r.ungenutztTB===4);
const g=[['d0','d1'],['d2','d3']];
ok(run('10',[2,4,2,4],g,['d0','d2']).status==='degradiert');
ok(run('10',[2,4,2,4],g,['d0','d1']).status==='datenverlust');
for(const sizes of [[],[0,2],[-1,2],[NaN,2],[Infinity,2],['2',2],[1000001,2]]) ok(!run('1',sizes).gueltig);
for(const e of [null,{}, {level:'99',disks:disks([2,2])}, {level:'1',disks:[{id:'x',tb:1},{id:'x',tb:2}]}, {level:'1',disks:disks([2,2]),failed:['no']}, {level:'10',disks:disks([2,2,2,2]),groups:[['d0','d1'],['d1','d2']]}, {level:'50',disks:disks(Array(7).fill(2)),groups:[['d0','d1','d2'],['d3','d4','d5','d6']]}]) ok(!berechne(e).gueltig);
const input={level:'10',disks:disks([2,2,2,2]),groups:g,failed:['d0']};
const before=JSON.stringify(input); berechne(input); ok(JSON.stringify(input)===before);
console.log('raid-kern: '+checks+' Assertions inkl. vollständiger Ausfallkombinationen an Mindesttopologien bestanden.');
