/* Ausschließlich lokale Lernsimulation; keine Systembefehle, kein Netzwerk. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const core = globalThis.RAID_KERN;
  let seq = 0, schritt = -1;
  let disks = Array.from({length:3},()=>({id:'d'+(++seq),tb:2,failed:false}));
  const labels = {funktionsfaehig:'Funktionsfähig',degradiert:'Degradiert',datenverlust:'Datenverlust im Modell'};
  function el(tag,text,parent) { const n=document.createElement(tag); if(text!==undefined)n.textContent=text; if(parent)parent.append(n); return n; }
  function gruppen(level) {
    if(!['10','50','60'].includes(level))return undefined;
    const n=Number($('raid-gruppen').value), size=Math.ceil(disks.length/n);
    return Array.from({length:n},(_,i)=>disks.slice(i*size,(i+1)*size).map(d=>d.id));
  }
  function input() { const level=$('raid-level').value; return {level,disks:disks.map(d=>({id:d.id,tb:d.tb})),groups:gruppen(level),failed:disks.filter(d=>d.failed).map(d=>d.id)}; }
  function redrawInputs(focusId) {
    const box=$('raid-laufwerke'); box.replaceChildren();
    disks.forEach((d,i)=>{
      const row=el('div',undefined,box); row.className='raid-disk-form';
      const label=el('label','Laufwerk '+(i+1)+' · Kapazität in TB',row);
      label.htmlFor='cap-'+d.id;
      const cap=el('input',undefined,label); cap.id=label.htmlFor; cap.type='number'; cap.min='0.01'; cap.max='1000000'; cap.step='any'; cap.value=Number.isFinite(d.tb)?d.tb:'';
      cap.addEventListener('input',()=>{d.tb=cap.value.trim()===''?NaN:Number(cap.value);schritt=-1;render();});
      const failedLabel=el('label',undefined,row); failedLabel.className='raid-ausfall';
      const failed=el('input',undefined,failedLabel); failed.type='checkbox';failed.id='fail-'+d.id;failed.checked=d.failed;
      failedLabel.append(document.createTextNode('Laufwerk '+(i+1)+' ausgefallen'));
      failed.addEventListener('change',()=>{d.failed=failed.checked;render();});
      const remove=el('button','Entfernen',row);remove.type='button'; remove.id='remove-'+d.id;remove.setAttribute('aria-label','Laufwerk '+(i+1)+' entfernen');
      remove.addEventListener('click',()=>{disks=disks.filter(x=>x.id!==d.id);schritt=-1;redrawInputs('raid-add');render();});
    });
    $('raid-add').disabled=disks.length>=32;
    if(focusId)$(focusId)?.focus();
  }
  function blockRows(level,group,groupIndex) {
    const rows=[];
    for(let stripe=0;stripe<3;stripe++) {
      const row=[]; let dataIndex=0;
      const sub=level==='50'?'5':level==='60'?'6':level==='10'?'1':level;
      const n=group.ids.length, p=(n-1-stripe%n+n)%n, q=(p-1+n)%n;
      for(let j=0;j<n;j++) {
        const key='G'+(groupIndex+1)+'S'+(stripe+1);
        if(sub==='1')row.push({kind:j===0?'D':'M',text:(j===0?'D ':'M ')+key+' (gleicher Inhalt)'});
        else if(sub==='5'&&j===p)row.push({kind:'P',text:'P '+key});
        else if(sub==='6'&&(j===p||j===q))row.push({kind:j===p?'P':'Q',text:(j===p?'P ':'Q ')+key});
        else row.push({kind:'D',text:'D '+key+'-'+(++dataIndex)});
      }
      rows.push(row);
    }
    return rows;
  }
  function render() {
    const e=input(), r=core.berechne(e), out=$('raid-ergebnis');out.replaceChildren();
    $('raid-grafik').replaceChildren();$('raid-blockliste').replaceChildren();
    $('raid-gruppen').disabled=!['10','50','60'].includes(e.level);
    $('raid-schritt').disabled=!r.gueltig;
    if(!r.gueltig) {
      el('p','Konfiguration noch nicht gültig:',out);const ul=el('ul',undefined,out);r.fehler.forEach(t=>el('li',t,ul));
      $('raid-schritt-text').textContent='Erst eine gültige Konfiguration herstellen.'; return;
    }
    el('p',labels[r.status]+'. '+r.toleranzText,out);
    const dl=el('dl',undefined,out), fmt=n=>new Intl.NumberFormat('de-DE',{maximumFractionDigits:4}).format(n)+' TB';
    [['Rohkapazität',r.rohTB],['Logische Nutzkapazität (konfiguriert)',r.nutzTB],['Spiegel-/Paritätsanteil',r.overheadTB],['Ungenutzter Größenanteil',r.ungenutztTB]].forEach(([name,value])=>{el('dt',name,dl);el('dd',fmt(value),dl);});
    if(r.status==='datenverlust')el('p','Die konfigurierte Kapazität ist nicht vollständig rekonstruierbar. Die Zahl oben behauptet keine aktuelle Datenverfügbarkeit.',out);
    $('raid-modell').textContent=r.modell;
    const steps=['Datenblöcke des Stripes zuordnen.','Spiegel bzw. Paritätswerte berechnen (hier nur symbolisch).','Daten und Redundanz auf die Mitglieder verteilen.'];
    $('raid-schritt-text').textContent=schritt<0?'Schreibdurchlauf noch nicht gestartet.':('Schritt '+(schritt+1)+' von 3: '+steps[schritt]+' Verteilte Parität rotiert zwischen den dargestellten Stripes.');
    r.gruppen.forEach((g,gi)=>{
      const section=el('section',undefined,$('raid-grafik'));section.className='raid-gruppe';
      el('h3','Gruppe '+(gi+1)+' · '+labels[g.status]+' · '+g.ausfaelle+' Ausfälle (Grenze '+g.toleranz+')',section);
      const grid=el('div',undefined,section);grid.className='raid-disks';
      const rows=blockRows(e.level,g,gi);
      const list=el('ul',undefined,$('raid-blockliste'));
      g.ids.forEach((id,di)=>{
        const disk=disks.find(d=>d.id===id), number=disks.indexOf(disk)+1;
        const card=el('div',undefined,grid);card.className='raid-disk';card.dataset.failed=String(disk.failed);
        el('h4','Laufwerk '+number,card);el('p',fmt(disk.tb)+' · '+(disk.failed?'Ausgefallen':'Verfügbar'),card);
        rows.forEach((row,ri)=>{
          const b=row[di];const block=el('div',b.text,card);block.className='raid-block';block.dataset.kind=b.kind;
          block.dataset.active=String(schritt===2||(schritt===0&&b.kind==='D')||(schritt===1&&b.kind!=='D'));
          el('li','Gruppe '+(gi+1)+', Laufwerk '+number+', Stripe '+(ri+1)+': '+b.text+(disk.failed?' – nicht verfügbar':''),list);
        });
      });
    });
  }
  $('raid-form').addEventListener('submit',e=>e.preventDefault());
  $('raid-add').addEventListener('click',()=>{if(disks.length<32){const id='d'+(++seq);disks.push({id,tb:2,failed:false});schritt=-1;redrawInputs('cap-'+id);render();}});
  $('raid-level').addEventListener('change',()=>{schritt=-1;render();});
  $('raid-gruppen').addEventListener('change',()=>{schritt=-1;render();});
  $('raid-preset').addEventListener('click',()=>{const level=$('raid-level').value, n=core.minimum[level];$('raid-gruppen').value='2';disks=Array.from({length:n},()=>({id:'d'+(++seq),tb:2,failed:false}));schritt=-1;redrawInputs();render();});
  $('raid-reset').addEventListener('click',()=>{disks.forEach(d=>d.failed=false);redrawInputs('raid-reset');render();});
  $('raid-schritt').addEventListener('click',()=>{schritt=(schritt+1)%3;render();});
  $('raid-schreiben-reset').addEventListener('click',()=>{schritt=-1;render();});
  $('raid-quiz').addEventListener('submit',e=>{e.preventDefault();const v=document.querySelector('input[name="raid-antwort"]:checked')?.value;$('raid-quiz-feedback').textContent=!v?'Bitte eine Antwort wählen.':(v==='gruppen'?'Richtig. ':'Noch nicht. ')+'Bei RAID 10 muss in jeder Zweier-Spiegelgruppe mindestens eine vollständige Kopie bleiben. RAID ersetzt kein Backup.';});
  redrawInputs();render();
}());
