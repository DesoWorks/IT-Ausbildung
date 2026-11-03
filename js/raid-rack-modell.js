/* Reines Frontmodell. Keine Gerätezugriffe. Der bestehende RAID-Kern bleibt maßgeblich. */
(function(root){
 'use strict';
 const core=typeof module!=='undefined'&&module.exports?require('./raid-kern'):root.RAID_KERN;
 function neu(level='60') {
  const n=level==='60'?16:core.minimum[level];
  return {level,verlust:false,bays:Array.from({length:16},(_,i)=>({id:'s'+(i+1),slot:i+1,tb:2,state:i<n?'bereit':'leer',group:i<n?(['10','50','60'].includes(level)?Math.floor(i/(level==='60'?4:level==='50'?3:2))+1:1):0}))};
 }
 function berechne(m) {
  const members=m.bays.filter(b=>b.state!=='leer'&&b.group>0);
  const nested=['10','50','60'].includes(m.level);
  const groups=[...new Set(members.map(b=>b.group))].sort((a,b)=>a-b).map(g=>members.filter(b=>b.group===g).map(b=>b.id));
  const r=core.berechne({level:m.level,disks:members.map(b=>({id:b.id,tb:b.tb})),groups:nested?groups:undefined,failed:members.filter(b=>b.state!=='bereit').map(b=>b.id)});
  if(m.verlust)r.status='datenverlust';
  return r;
 }
 function aktion(m,slot,action,value) {
  const b=m.bays.find(b=>b.slot===slot);if(!b)throw Error('Unbekannter Schacht.');
  const before=berechne(m);
  if(action==='ausfall'&&b.state==='bereit')b.state='failed';
  else if(action==='rebuild') {
   if(b.state!=='failed'||!before.gueltig||before.status==='datenverlust')throw Error('Kein Rebuild möglich: Das Array muss aus den verbleibenden Mitgliedern rekonstruierbar sein.');
   b.state='rebuild';
  } else if(action==='abschluss') {
   if(b.state!=='rebuild'||!before.gueltig||before.status==='datenverlust')throw Error('Rebuild nicht abschließbar: Die Rekonstruktionsgrundlage fehlt.');
   b.state='bereit';
  } else if(action==='einsetzen'&&b.state==='leer'){b.state='bereit';b.group=0;b.tb=2;}
  else if(action==='entfernen'){b.state='leer';b.group=0;}
  else if(action==='kapazitaet')b.tb=value;
  else if(action==='gruppe')b.group=value;
  else throw Error('Diese Aktion passt nicht zum Schachtzustand.');
  const after=berechne(m);
  if((before.gueltig&&before.status==='datenverlust')||(after.gueltig&&after.status==='datenverlust'))m.verlust=true;
  return m;
 }
 function reset(m){m.bays.forEach(b=>{if(b.state!=='leer')b.state='bereit';});m.verlust=false;return m;}
 const api={neu,berechne,aktion,reset};root.RAID_RACK=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
}(typeof globalThis!=='undefined'?globalThis:this));
