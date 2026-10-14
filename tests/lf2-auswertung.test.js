"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict"),root=path.resolve(__dirname,"..");
global.window=global;require(path.join(root,"js/glossar-daten.js"));const m=require(path.join(root,"js/lf2-auswertung.js"));
assert.equal(m.ID,"lf2-auswertung");assert.equal(m.KEY,"it-ausbildung.lf2-auswertung.v1");assert.equal(m.QUESTIONS.length,5);
for(const q of m.QUESTIONS){assert.equal(q.options.filter(o=>o.id===q.correct).length,1);assert.equal(new Set(q.options.map(o=>o.id)).size,3);assert(q.options.every(o=>o.feedback.length>20));}
for(const q of m.QUESTIONS){const L=q.options.map(o=>o.label.length),c=q.options.findIndex(o=>o.id===q.correct);assert(!(L[c]===Math.max(...L)&&L.filter(x=>x===L[c]).length===1),"kein Längenhinweis bei "+q.id);assert(q.options.every(o=>/^[a-z0-9-]+$/.test(o.id)),"stabile IDs "+q.id);}
const positions=m.QUESTIONS.map(q=>q.options.findIndex(o=>o.id===q.correct));assert(new Set(positions).size>=2,"richtige Antwortpositionen variieren");
const correct={q1:"kriterium",q2:"fakten",q3:"massnahme",q4:"einordnen",q5:"pruefen"};assert.equal(m.evaluate({}).empty,5);assert.equal(m.evaluate(correct).correct,5);assert.equal(m.evaluate({...correct,q4:"allgemein"}).wrong,1);assert.equal(m.evaluate({...correct,q5:undefined}).empty,1);assert.equal(m.progress({checked:false,finish:false}),0);
const html=fs.readFileSync(path.join(root,"module/lf2-auswertung.html"),"utf8"),js=fs.readFileSync(path.join(root,"js/lf2-auswertung.js"),"utf8"),catalog=fs.readFileSync(path.join(root,"js/module-daten.js"),"utf8"),fp=fs.readFileSync(path.join(root,"js/fortschritt.js"),"utf8");
for(const s of ["Nordlicht IT-Service","Praxis am Park","fiktiv","Textalternative","glossar.html","role=\"img\"","data-page=\"lf2-auswertung\""])assert(html.includes(s),s);
assert(!/checked(?:="checked")?/.test(html));assert(js.includes("s.checked=false;clear();"));assert(js.includes('d.createElement("fieldset")')&&js.includes('input.type="radio"'));assert(catalog.includes('page: "lf2-auswertung", status: "verfuegbar", datei: "module/lf2-auswertung.html"'));assert(fp.includes('"lf2-auswertung": "it-ausbildung.lf2-auswertung.v1"'));
for(const word of ["Auftragsauswertung","Verbesserungsmaßnahme","Befund","Wirkungsprüfung"])assert(global.GLOSSAR.some(x=>x.begriff===word),word);
console.log("lf2-auswertung.test.js: PASS — Antworten, Fortschritt, Seite, Katalog und Glossar");

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
