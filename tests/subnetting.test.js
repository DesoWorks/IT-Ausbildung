const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'module/subnetting.html'),'utf8'),js=fs.readFileSync(path.join(root,'js/subnetting.js'),'utf8'),data=fs.readFileSync(path.join(root,'js/module-daten.js'),'utf8');
assert(html.includes('192.168.1.0/24')&&html.includes('255.255.255.128'));
for(const value of ['192.168.1.0','192.168.1.127','192.168.1.1–192.168.1.126','192.168.1.128','192.168.1.255','192.168.1.129–192.168.1.254']) assert(html.includes(value),value);
assert(!html.includes('<svg'),'Diagramm ist HTML/CSS, kein SVG-Text mehr');
assert(/<div class="subnetz-raster" role="group" aria-label="[^"]*\.127[^"]*\.255[^"]*">/.test(html),'Diagramm mit Textalternative');
assert(html.includes('<input type="text" id="net1"')&&html.includes('<input type="text" id="net2"'),'Eingabefelder mit type=text');
assert(html.includes('class="formular-aktionen"'),'Abstandsgruppe für Prüfen-Button');
assert(html.includes('aria-live="polite"')&&html.includes('Antworten prüfen'));
assert(data.includes('id: "lf3-subnetting"')&&data.includes('datei: "module/subnetting.html"'));
const context={window:{},module:{exports:{}},document:undefined};vm.runInNewContext(js,context);const api=context.module.exports;
assert.equal(api.progress(),0);assert.equal(api.complete(),false);assert.equal(api.questions.length,2);assert.equal(api.items.length,2);
const progress=fs.readFileSync(path.join(root,'js/fortschritt.js'),'utf8');assert(progress.includes('lf3-subnetting')&&progress.includes('192.168.1.127'));
console.log('subnetting.test.js: all assertions passed');

/* Integrationstest: Formular wirklich ausführen und den angezeigten Feedbacktext prüfen (Fake-DOM, kein echter Browser). */
(function renderedFeedback(){
  class El{constructor(t){this.tag=t;this.children=[];this._text='';this.style={};this.dataset={};this.hidden=false;this.value='';this.listeners={};this.attrs={};this.className='';this.classList={add(){},remove(){}};}
    get textContent(){return this._text+this.children.map(c=>c.textContent).join('|');}
    set textContent(v){this._text=v;this.children=[];}
    appendChild(c){this.children.push(c);return c;} append(...c){c.forEach(x=>this.appendChild(x));}
    addEventListener(t,f){this.listeners[t]=f;} setAttribute(k,v){this.attrs[k]=v;} removeAttribute(k){delete this.attrs[k];} focus(){} reset(){}}
  const ids={};['fortschritt-balken','fortschritt-text','subnet-finish','subnet-result','subnet-form','subnet-reset','subnet-reset-progress','fachwoerter-liste','erklaerung','schritte','uebung','abschluss','hauptinhalt','net1','net2'].forEach(i=>ids[i]=new El('x'));
  const radios={};const store={};
  const doc={readyState:'complete',getElementById:i=>ids[i],createElement:t=>new El(t),querySelectorAll:()=>[],
    querySelector:s=>{const m=/name="(q\d)"/.exec(s);return m&&radios[m[1]]?{value:radios[m[1]]}:null;}};
  const ctx={document:doc,module:{exports:{}},localStorage:{getItem:k=>store[k]||null,setItem:(k,v)=>{store[k]=v;},removeItem:k=>{delete store[k];}},confirm:()=>true,scrollTo(){},GLOSSAR:[]};
  vm.runInNewContext(js,ctx);
  const submit=()=>ids['subnet-form'].listeners.submit({preventDefault(){}});
  const edit=name=>ids['subnet-form'].listeners.input({target:{name}});
  const view=()=>{const box=ids['subnet-result'];return {hidden:box.hidden,title:box.children[0]&&box.textContent.split('|')[0],rows:box.children[1]?box.children[1].children.map(li=>li.textContent):[]};};
  const noUndef=v=>{assert(!/undefined|NaN|null/.test(JSON.stringify(v)),'undefined im Feedback: '+JSON.stringify(v));};
  // 1) alles leer
  submit();let v=view();noUndef(v);assert.equal(v.rows.length,4);assert(v.title.includes('Noch nicht richtig'));
  assert(v.rows[2].includes('Broadcastadresse des ersten Teilnetzes')&&v.rows[2].includes('Deine Eingabe: keine Eingabe')&&v.rows[2].includes('192.168.1.127'),v.rows[2]);
  assert(v.rows[3].includes('Erste nutzbare Adresse des zweiten Teilnetzes')&&v.rows[3].includes('Nicht beantwortet'),v.rows[3]);
  // 2) alles falsch
  radios.q1='false';radios.q2='false';ids.net1.value='192.168.1.255';ids.net2.value='192.168.1.128';submit();v=view();noUndef(v);
  assert(v.title.includes('Noch nicht richtig'));assert(v.rows[0].includes('Deine Eingabe: Falsch')&&v.rows[0].includes('255.255.255.128'),v.rows[0]);
  assert(v.rows[2].includes('Deine Eingabe: 192.168.1.255')&&v.rows[2].includes('Richtiger Wert: 192.168.1.127'),v.rows[2]);
  assert(v.rows[3].includes('Deine Eingabe: 192.168.1.128')&&v.rows[3].includes('192.168.1.129'),v.rows[3]);
  // 3) teilweise richtig
  radios.q1='true';ids.net1.value='192.168.1.127';submit();v=view();noUndef(v);
  assert(v.title.includes('Teilweise richtig'));assert(v.rows[0].startsWith('✓ Richtig')&&v.rows[1].startsWith('✗'),v.rows.join(' / '));
  // 4) nachträglich geändert: Ergebnisbox muss verschwinden
  edit('net1');assert.equal(ids['subnet-result'].hidden,true);assert.equal(ids['subnet-result'].textContent,'');
  // 5) alles richtig
  radios.q2='true';ids.net1.value='192.168.1.127';ids.net2.value='192.168.1.129';submit();v=view();noUndef(v);
  assert(v.title.includes('Alles richtig'));assert(v.rows.every(r=>r.startsWith('✓ Richtig')&&r.includes('Deine Eingabe:')),v.rows.join(' / '));
  console.log('subnetting.test.js: gerenderter Feedbacktext (leer/falsch/teilweise/geändert/richtig) bestanden');
})();
