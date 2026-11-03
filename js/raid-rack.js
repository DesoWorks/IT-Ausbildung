/* Datengetriebene Serverfront und vollständige HTML-Bedienalternative. */
(function(){
 'use strict';
 const $=id=>document.getElementById(id), rack=globalThis.RAID_RACK;
 let model=rack.neu(),schritt=-1;
 const states={leer:'Leer',bereit:'Betriebsbereit',failed:'Ausgefallen',rebuild:'Rebuild – noch nicht verfügbar'};
 const status={funktionsfaehig:'Funktionsfähig',degradiert:'Degradiert',datenverlust:'Datenverlust im Modell'};
 const fmt=n=>new Intl.NumberFormat('de-DE',{maximumFractionDigits:4}).format(n)+' TB';
 function el(tag,text,parent){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(parent)parent.append(n);return n;}
 function button(text,parent,fn,id){const b=el('button',text,parent);b.type='button';if(id)b.id=id;b.addEventListener('click',fn);return b;}
 const front=el('div');front.id='raid-rack';front.className='raid-rack';front.setAttribute('role','group');front.setAttribute('aria-label','Serverfront mit 16 Laufwerksschächten');$('raid-form').before(front);
 const note=el('p','Klick auf ein betriebsbereites Laufwerk: Ausfall simulieren. Auf ein ausgefallenes Laufwerk: Rebuild beginnen, sofern rekonstruierbar. Rebuild wird separat abgeschlossen. Leere Schächte setzen ein freies Laufwerk ein.');front.before(note);
 const message=el('p');message.id='raid-rack-meldung';message.setAttribute('role','status');front.after(message);
 const details=el('details');const summary=el('summary','Vollständige Laufwerksübersicht und Bedienung',details);void summary;$('raid-laufwerke').before(details);details.append($('raid-laufwerke'));
 $('raid-gruppen').closest('label').hidden=true;
 $('raid-gruppen-hilfe').textContent='Gruppen je Laufwerk frei zuweisen. Bei RAID 10/50/60 sind mindestens zwei gleich große Gruppen erforderlich; Reihen sind nur beim RAID-60-Beispiel Gruppen. Freie Laufwerke zählen nicht zum Array. Strukturänderungen sind Konfigurationsexperimente, kein Hot-Swap-Rebuild. Ein eingetretener Datenverlust bleibt bis zum ausdrücklichen Szenarioreset markiert.';
 function act(slot,action,value){let msg;try{rack.aktion(model,slot,action,value);msg='Schacht '+String(slot).padStart(2,'0')+': '+states[model.bays[slot-1].state]+'.';}catch(e){msg=e.message;}render();message.textContent=msg;}
 function primary(b){return b.state==='leer'?'einsetzen':b.state==='bereit'?'ausfall':b.state==='failed'?'rebuild':'abschluss';}
 function renderInputs(){
  front.replaceChildren();$('raid-laufwerke').replaceChildren();
  model.bays.forEach(b=>{
   const num=String(b.slot).padStart(2,'0');
   const bay=button('',front,()=>act(b.slot,primary(b)),'bay-'+b.slot);bay.className='raid-bay';bay.dataset.state=b.state;
   bay.setAttribute('aria-label','Schacht '+num+', '+states[b.state]+(b.state!=='leer'?', '+fmt(b.tb)+', '+(b.group?'Gruppe '+b.group:'nicht zugewiesen'):'')+'. '+({leer:'Laufwerk einsetzen',bereit:'Ausfall simulieren',failed:'Rebuild versuchen',rebuild:'Rebuild abschließen'})[b.state]);
   const icon=document.createElementNS('http://www.w3.org/2000/svg','svg');icon.setAttribute('viewBox','0 0 180 36');icon.setAttribute('aria-hidden','true');
   for(let j=0;j<9;j++){const line=document.createElementNS(icon.namespaceURI,'path');line.setAttribute('d','M '+(20+j*14)+' 7 v 21');line.setAttribute('stroke','currentColor');line.setAttribute('stroke-width','4');icon.append(line);}bay.append(icon);
   el('strong','Schacht '+num,bay);el('span',b.state==='leer'?'Leerer Einschub':fmt(b.tb)+' · '+(b.group?'Gruppe '+b.group:'Frei'),bay);
   const state=el('span',states[b.state],bay);state.className='raid-bay-state';
   const row=el('fieldset',undefined,$('raid-laufwerke'));el('legend','Schacht '+num+' · '+states[b.state],row);row.className='raid-rack-row';
   if(b.state!=='leer'){
    const label=el('label','Kapazität in TB',row);const cap=el('input',undefined,label);cap.type='number';cap.min='0.01';cap.max='1000000';cap.step='any';cap.value=Number.isFinite(b.tb)?b.tb:'';cap.id='cap-'+b.slot;
    cap.addEventListener('change',()=>act(b.slot,'kapazitaet',cap.value.trim()===''?NaN:Number(cap.value)));
    const nested=['10','50','60'].includes(model.level);
   const gl=el('label',nested?'RAID-Gruppe':'Array-Zuweisung',row),select=el('select',undefined,gl);select.id='group-'+b.slot;
    for(let g=0;g<=(nested?8:1);g++){const o=el('option',g?(nested?'Gruppe '+g:'Mitglied des Arrays'):'Nicht zugewiesen (frei)',select);o.value=String(g);}select.value=String(b.group>0&&!nested?1:b.group);select.addEventListener('change',()=>act(b.slot,'gruppe',Number(select.value)));
    button('Laufwerk entfernen',row,()=>act(b.slot,'entfernen'),'remove-'+b.slot);
   }
   button(({leer:'Einsetzen',bereit:'Ausfall simulieren',failed:'Rebuild beginnen',rebuild:'Rebuild abschließen'})[b.state],row,()=>act(b.slot,primary(b)),'action-'+b.slot);
  });
  $('raid-add').disabled=!model.bays.some(b=>b.state==='leer');
 }
 function blocks(r){
  const list=$('raid-blockliste');list.replaceChildren();const graph=$('raid-grafik');graph.replaceChildren();
  r.gruppen.forEach((g,gi)=>{
   const section=el('section',undefined,graph);section.className='raid-gruppe';const members=g.ids.map(id=>model.bays.find(b=>b.id===id));
   const nested=['10','50','60'].includes(model.level);
   const group=nested?members[0].group:1;el('h3',(nested?'Gruppe '+group:'Gemeinsames Array')+' · '+status[g.status]+' · '+g.ausfaelle+' nicht verfügbar (Grenze '+g.toleranz+')',section);
   const grid=el('div',undefined,section);grid.className='raid-disks';const ul=el('ul',undefined,list);
   members.forEach((b,j)=>{
    const card=el('div',undefined,grid);card.className='raid-disk';card.dataset.failed=String(b.state!=='bereit');el('h4','Schacht '+String(b.slot).padStart(2,'0'),card);el('p',states[b.state],card);
    const sub=model.level==='60'?'6':model.level==='50'?'5':model.level==='10'?'1':model.level;
    for(let stripe=0;stripe<3;stripe++){
     const p=(members.length-1-stripe%members.length+members.length)%members.length,q=(p-1+members.length)%members.length;
     const kind=sub==='1'?(j===0?'D':'M'):(sub==='5'||sub==='6')&&j===p?'P':sub==='6'&&j===q?'Q':'D';
     const text=kind+' G'+group+' S'+(stripe+1)+(sub==='1'?' (gleicher Inhalt)':' / '+(j+1));
     const block=el('div',text,card);block.className='raid-block';block.dataset.kind=kind;block.dataset.active=String(schritt===2||(schritt===0&&kind==='D')||(schritt===1&&kind!=='D'));
     el('li','Schacht '+b.slot+': '+text+(b.state!=='bereit'?' – nicht verfügbar':''),ul);
    }
   });
  });
 }
 function render(){
  const focus=document.activeElement?.id;renderInputs();const r=rack.berechne(model),out=$('raid-ergebnis');out.replaceChildren();$('raid-level').value=model.level;
  if(model.verlust)el('p','Datenverlust im Szenario bleibt markiert. Nur ein Szenarioreset oder neues Beispiel beginnt ein neues Experiment; dies rekonstruiert keine echten Daten.',out);
  if(!r.gueltig){el('p','Konfiguration noch nicht gültig:',out);const ul=el('ul',undefined,out);r.fehler.forEach(t=>el('li',t,ul));$('raid-grafik').replaceChildren();$('raid-blockliste').replaceChildren();}
  else{
   el('p',status[r.status]+'. '+r.toleranzText,out);const dl=el('dl',undefined,out);
   [['Rohkapazität der Array-Mitglieder',r.rohTB],['Logische Nutzkapazität (konfiguriert)',r.nutzTB],['Spiegel-/Paritätsanteil',r.overheadTB],['Ungenutzter Größenanteil',r.ungenutztTB]].forEach(([t,v])=>{el('dt',t,dl);el('dd',fmt(v),dl);});
   el('p','Freie Laufwerke: '+model.bays.filter(b=>b.state!=='leer'&&!b.group).length+'. Leere Schächte: '+model.bays.filter(b=>b.state==='leer').length+'.',out);
   if(r.status==='datenverlust')el('p','Die konfigurierte Kapazität ist keine Aussage über aktuell verfügbare Daten.',out);$('raid-modell').textContent=r.modell;blocks(r);
  }
  $('raid-schritt').disabled=!r.gueltig;
  $('raid-schritt-text').textContent=schritt<0?'Schreibdurchlauf noch nicht gestartet.':'Schritt '+(schritt+1)+' von 3: '+['Datenblöcke zuordnen.','Spiegel oder unabhängige P/Q-Paritätswerte berechnen (symbolisch).','Daten und Redundanz verteilen; Parität rotiert zwischen Stripes.'][schritt];
  if(focus)$(focus)?.focus({preventScroll:true});
 }
 $('raid-form').addEventListener('submit',e=>e.preventDefault());
 $('raid-level').addEventListener('change',()=>{model.level=$('raid-level').value;if(!['10','50','60'].includes(model.level))model.bays.forEach(b=>{if(b.group>0)b.group=1;});schritt=-1;render();message.textContent='RAID-Level geändert. Gruppen prüfen oder passendes Beispiel laden.';});
 $('raid-preset').addEventListener('click',()=>{model=rack.neu(model.level);schritt=-1;render();message.textContent='Neues Beispiel geladen: neues Szenario, keine Datenwiederherstellung.';});
 $('raid-reset').addEventListener('click',()=>{rack.reset(model);render();message.textContent='Ausfallszenario zurückgesetzt. Dies ist keine Datenrekonstruktion.';});
 $('raid-add').addEventListener('click',()=>{const b=model.bays.find(b=>b.state==='leer');if(b)act(b.slot,'einsetzen');});
 $('raid-schritt').addEventListener('click',()=>{schritt=(schritt+1)%3;render();});$('raid-schreiben-reset').addEventListener('click',()=>{schritt=-1;render();});
 $('raid-quiz').addEventListener('submit',e=>{e.preventDefault();const v=document.querySelector('[name=raid-antwort]:checked')?.value;$('raid-quiz-feedback').textContent=!v?'Bitte eine Antwort wählen.':(v==='gruppen'?'Richtig. ':'Noch nicht. ')+'Jede Spiegelgruppe benötigt eine vollständige Kopie. RAID ersetzt kein Backup.';});
 render();
}());
