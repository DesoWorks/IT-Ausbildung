"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict"),root=path.resolve(__dirname,"..");global.window=global;const m=require(path.join(root,"js/lf2-abschluss.js"));
assert.equal(m.ID,"lf2-abschluss");assert.equal(m.KEY,"it-ausbildung.lf2-abschluss.v1");assert.equal(m.QUESTIONS.length,6);
for(const q of m.QUESTIONS){assert.equal(q.options.filter(o=>o.id===q.correct).length,1);assert.equal(new Set(q.options.map(o=>o.id)).size,3);assert(q.options.every(o=>o.feedback.length>20));}
const pos=m.QUESTIONS.map(q=>q.options.findIndex(o=>o.id===q.correct));assert(new Set(pos).size>=2);
const a={q1:"anforderung",q2:"pflicht",q3:"gesamt",q4:"melden",q5:"pruefen",q6:"massnahme"};assert.equal(m.evaluate({}).empty,6);assert.equal(m.evaluate(a).correct,6);assert.equal(m.evaluate({...a,q3:"billig"}).wrong,1);assert.equal(m.evaluate({...a,q4:undefined}).empty,1);assert.equal(m.progress({checked:true,finish:true,answers:a}),100);
const h=fs.readFileSync(path.join(root,"module/lf2-abschluss.html"),"utf8"),catalog=fs.readFileSync(path.join(root,"js/module-daten.js"),"utf8"),fp=fs.readFileSync(path.join(root,"js/fortschritt.js"),"utf8"),js=fs.readFileSync(path.join(root,"js/lf2-abschluss.js"),"utf8");
for(const x of ["Nordlicht IT-Service","Praxis am Park","fiktiv","role=\"img\"","Textalternative","data-page=\"lf2-abschluss\""])assert(h.includes(x),x);assert(!/checked(?:="checked")?/.test(h));assert(h.includes("LF2.1–LF2.12"));assert(catalog.includes('page: "lf2-abschluss", status: "verfuegbar", datei: "module/lf2-abschluss.html"'));assert(fp.includes('"lf2-abschluss": "it-ausbildung.lf2-abschluss.v1"'));assert(js.includes("clear();save();update();"));
const pos2=m.QUESTIONS.map(q=>q.options.findIndex(o=>o.id===q.correct));assert.equal(new Set(pos2).size,3,"alle drei Positionen kommen vor");for(const p of [0,1,2])assert(pos2.filter(x=>x===p).length<=3,"Position "+p+" nicht dominant");
for(const q of m.QUESTIONS){const L=q.options.map(o=>o.label.length),c=q.options.findIndex(o=>o.id===q.correct);assert(!(L[c]===Math.max(...L)&&L.filter(x=>x===L[c]).length===1),"kein Längenhinweis bei "+q.id);assert(q.options.every(o=>o.id===q.correct?o.feedback.startsWith("Richtig"):!o.feedback.startsWith("Richtig")),"Feedback-Muster "+q.id);}
assert.deepEqual(m.QUESTIONS.map(q=>q.id),["q1","q2","q3","q4","q5","q6"]);assert.equal(m.evaluate({...a,q2:"farbe"}).results[1].status,"wrong");assert.equal(m.evaluate({...a,q2:"farbe"}).allCorrect,false);
assert(m.progress({checked:false,finish:true,answers:a})<100,"ungeprüfte Antworten ergeben keinen vollen Fortschritt");assert.equal(m.progress({}),0);
assert(h.includes("765 Euro")&&h.includes("Unbenotete Selbstprüfung"),"Fallwerte und unbenotet");
require(path.join(root,"js/glossar-daten.js"));
for(const w of ["Pflichtkriterium","Wunschkriterium","Wareneingang","Gesamtkosten","Befund","Wirkungsprüfung"]){assert(global.GLOSSAR.some(x=>x.begriff===w),"Glossarbegriff vorhanden: "+w);assert(h.includes("<summary>"+w)||h.includes("Befund und Wirkungsprüfung"),"Seite erklärt "+w);}
assert(h.includes("../glossar.html?von=lf2-abschluss.html"),"Glossarlink");
console.log("lf2-abschluss.test.js: PASS — integrierter Auftrag, Antwortlogik, Katalog, Fortschritt und Glossar");

/* Abnahme: leerer Check und Fortschrittstext */
{
  const N = m.QUESTIONS.length;
  const leer = m.evaluate({});
  assert.equal(leer.empty, N);
  assert.equal(leer.correct, 0);
  assert(leer.results.every(function (r) { return r.status === "empty" && r.optionId === ""; }), "leerer Check wählt keine Option");
  assert.equal(m.progress({ checked: true, finish: false, answers: {} }), 0);
  const alle = {}; m.QUESTIONS.forEach(function (q) { alle[q.id] = q.correct; });
  assert.equal(m.progressText({ checked: true, finish: false, answers: alle }), "Fortschritt: " + N + " von " + (N + 1) + " Schritten \u00b7 Abschluss noch nicht ge\u00f6ffnet");
  assert.equal(m.progressText({ checked: true, finish: true, answers: alle }), "Fortschritt: " + (N + 1) + " von " + (N + 1) + " Schritten \u00b7 Abschluss ge\u00f6ffnet");
  assert.equal(m.progressText({ checked: true, finish: false, answers: {} }), "Fortschritt: 0 von " + (N + 1) + " Schritten \u00b7 Abschluss noch nicht ge\u00f6ffnet");
  assert(!/%/.test(m.progressText({ checked: true, finish: false, answers: alle })), "Text zeigt keine Prozentzahl");
}
