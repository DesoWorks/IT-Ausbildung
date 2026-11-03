/* Reines Frontmodell. Keine Gerätezugriffe. Der bestehende RAID-Kern bleibt maßgeblich. */
(function(root) {
 'use strict';
 const core = typeof module !== 'undefined' && module.exports ? require('./raid-kern') : root.RAID_KERN;
 const copy = value => JSON.parse(JSON.stringify(value));
 const nested = level => ['10','50','60'].includes(level);
 function neu(level = '60') {
  const n = level === '60' ? 16 : core.minimum[level];
  return {level, verlust:false, basis:null, verloreneGruppen:[], bays:Array.from({length:16},(_,i)=>({
   id:'s'+(i+1), slot:i+1, tb:2, state:i<n?'bereit':'leer',
   group:i<n?(nested(level)?Math.floor(i/(level==='60'?4:level==='50'?3:2))+1:1):0
  }))};
 }
 function berechne(m) {
  // Während eines Ausfallexperiments bleibt die logische Array-Geometrie erhalten.
  // Ein entfernter Datenträger ist weiterhin ein fehlendes Mitglied, kein kleineres Array.
  const original = m.basis ? m.basis.bays : m.bays;
  const members = original.filter(b=>b.state!=='leer' && b.group>0);
  const groups = [...new Set(members.map(b=>b.group))].sort((a,b)=>a-b)
   .map(g=>members.filter(b=>b.group===g).map(b=>b.id));
  const r = core.berechne({level:m.basis?m.basis.level:m.level,
   disks:members.map(b=>({id:b.id,tb:m.basis?b.tb:m.bays[b.slot-1].tb})),
   groups:nested(m.level)?groups:undefined,
   failed:members.filter(b=>m.bays[b.slot-1].state!=='bereit').map(b=>b.id)});
  if(m.verlust) {
   r.status='datenverlust';
   (r.gruppen||[]).forEach(g=>{if(g.ids.some(id=>m.verloreneGruppen.includes(id)))g.status='datenverlust';});
  }
  return r;
 }
 function erforderlich(m,slot) {
  const b = m.basis?.bays.find(b=>b.slot===slot);
  return b && b.group>0 ? Math.min(...m.basis.bays.filter(x=>x.group>0&&x.state!=='leer').map(x=>x.tb)) : 0;
 }
 function freigabe(m,slot) {
  const b=m.bays[slot-1], r=berechne(m);
  let grund='';
  if(!b || !['ersatz','rebuild'].includes(b.state)) grund='Zuerst das defekte Laufwerk austauschen und ein Ersatzlaufwerk einsetzen.';
  else if(m.verlust || r.status==='datenverlust') grund='Datenverlust im Modell: Die Rekonstruktionsgrundlage fehlt. Austausch oder Umgruppierung retten keine verlorenen Daten.';
  else if(!r.gueltig || !b.group) grund='Keine gültige, rekonstruierbare Array-Konfiguration vorhanden.';
  else if(!Number.isFinite(b.tb)||b.tb<=0||b.tb>1000000) grund='Ersatzkapazität muss eine endliche Zahl größer als 0 und höchstens 1000000 TB sein.';
  else if(b.tb<erforderlich(m,slot)) grund='Ersatzlaufwerk zu klein: mindestens '+erforderlich(m,slot)+' TB für das bisherige Array erforderlich.';
  return {erlaubt:!grund,grund};
 }
 function merkeVerlust(m) {
  const r=berechne(m);
  if(r.gueltig && r.status==='datenverlust') {
   m.verlust=true;
   for(const g of r.gruppen.filter(g=>g.status==='datenverlust'))
    for(const id of g.ids) if(!m.verloreneGruppen.includes(id))m.verloreneGruppen.push(id);
  }
 }
 function aktion(m,slot,action,value) {
  const b=m.bays.find(b=>b.slot===slot);
  if(!b)throw Error('Unbekannter Schacht.');
  const before=berechne(m);
  if(['gruppe','level'].includes(action) && m.basis)
   throw Error('Gruppen und RAID-Level sind während eines Ausfallexperiments gesperrt. Erst das Szenario zurücksetzen.');
  if(action==='kapazitaet' && m.basis && b.state!=='ersatz')
   throw Error('Während des Experiments kann nur die Ersatzkapazität angepasst werden.');
  if(['ausfall','entfernen'].includes(action) && before.gueltig && !m.basis)
   m.basis={level:m.level,bays:copy(m.bays)};
  if(action==='ausfall' && b.state==='bereit') b.state='failed';
  else if(action==='austauschen' && b.state==='failed') {
   b.state='ersatz';
   if(value!==undefined)b.tb=value;
  } else if(action==='rebuild' || action==='abschluss') {
   const f=freigabe(m,slot);
   if(!f.erlaubt)throw Error(f.grund);
   if(action==='rebuild' && b.state==='ersatz') b.state='rebuild';
   else if(action==='abschluss' && b.state==='rebuild') b.state='bereit';
   else throw Error('Diese Aktion passt nicht zum Schachtzustand.');
  } else if(action==='einsetzen' && b.state==='leer') {
   const old=m.basis?.bays[slot-1];
   b.state=old?.group>0?'ersatz':'bereit';b.group=old?.group||0;b.tb=old?.tb||2;
  } else if(action==='entfernen') {b.state='leer';if(!m.basis)b.group=0;}
  else if(action==='kapazitaet') b.tb=value;
  else if(action==='gruppe') b.group=value;
  else if(action==='level') {m.level=String(value);if(!nested(m.level))m.bays.forEach(x=>{if(x.group>0)x.group=1;});}
  else throw Error('Diese Aktion passt nicht zum Schachtzustand.');
  merkeVerlust(m);
  return m;
 }
 function reset(m) {
  if(m.basis){m.level=m.basis.level;m.bays=copy(m.basis.bays);}
  m.basis=null;m.verlust=false;m.verloreneGruppen=[];
  return m;
 }
 const api={neu,berechne,aktion,reset,freigabe,erforderlich};
 root.RAID_RACK=api;
 if(typeof module!=='undefined'&&module.exports)module.exports=api;
}(typeof globalThis!=='undefined'?globalThis:this));
