"use strict";const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict");const root=path.resolve(__dirname,"..");const m=require(path.join(root,"js/lf2-kundenbedarf.js"));assert.equal(m.QUESTIONS.length,4);for(const q of m.QUESTIONS){assert.equal(q.options.filter(o=>o.id===q.correct).length,1);assert(q.options.every(o=>o.feedback.length>20));}assert.deepEqual(m.QUESTIONS.map(q=>q.options[0].id===q.correct),[false,false,true,true]);assert.equal(m.evaluate({}).empty,4);assert.equal(m.evaluate({q1:"anforderung",q2:"software",q3:"rahmen",q4:"klaeren"}).correct,4);assert.equal(m.evaluate({q1:"budget",q2:"software",q3:"rahmen",q4:"klaeren"}).correct,3);assert.equal(m.progress({checked:false,finish:false}),0);const h=fs.readFileSync(path.join(root,"module/lf2-kundenbedarf.html"),"utf8");for(const t of ["Interne und externe Kundschaft unterscheiden.","Fiktiver Auftrag","1.200 Euro","Offene Rückfragen","aria-live","aria-live"])assert(h.includes(t),"missing: "+t);assert(fs.readFileSync(path.join(root,"js/module-daten.js"),"utf8").includes('datei: "module/lf2-kundenbedarf.html"'));console.log("lf2-kundenbedarf.test.js: PASS — fiktiver Bedarf, IDs, answer positions, feedback and catalogue");

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
