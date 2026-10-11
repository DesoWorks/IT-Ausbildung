"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,"..");global.window=global;require(path.join(root,"js/glossar-daten.js"));const m=require(path.join(root,"js/lf1-markt-kundschaft.js"));
assert.equal(m.ID,"lf1-markt-kundschaft");assert.equal(m.QUESTIONS.length,4);assert.equal(new Set(m.QUESTIONS.map(q=>q.id)).size,4);
for(const q of m.QUESTIONS){assert.equal(q.options.filter(o=>o.id===q.correct).length,1);assert(q.options.every(o=>o.id&&o.feedback.length>20));assert(q.options.some(o=>o.id===q.correct));}
assert.deepEqual(m.QUESTIONS.map(q=>q.options[0].id===q.correct),[false,false,true,false],"correct options must vary");
assert.equal(m.evaluate({}).empty,4);assert.equal(m.evaluate({q1:"kunde",q2:"lieferant",q3:"intern",q4:"wettbewerber"}).correct,4);assert.equal(m.evaluate({q1:"lieferant",q2:"lieferant",q3:"intern",q4:"wettbewerber"}).wrong,1);
assert.equal(m.progress({answers:{q1:"kunde"},checked:false,finish:false}),0);assert(m.progress({answers:{q1:"kunde"},checked:true,finish:false})>0);
const html=fs.readFileSync(path.join(root,"module/lf1-markt-kundschaft.html"),"utf8");assert.match(html,/<html lang="de">/);assert.match(html,/Nordlicht IT-Service/);assert.match(html,/Fiktives Beispiel:[\s\S]*?erfunden/);assert.match(html,/aria-label="[^\"]*Kundschaft[^\"]*Lieferant[^\"]*Wettbewerber/s);const logic=fs.readFileSync(path.join(root,"js/lf1-markt-kundschaft.js"),"utf8");assert.match(logic,/input\.type="radio"/);assert.match(logic,/createElement\("fieldset"\)/);assert.match(logic,/createElement\("legend"\)/);assert.match(html,/data-page="lf1-markt-kundschaft"/);assert.match(html,/../);
const catalog=fs.readFileSync(path.join(root,"js/module-daten.js"),"utf8");assert.match(catalog,/id: "lf1-markt-kundschaft"/);assert.equal((catalog.match(/id: "lf1-markt-kundschaft"/g)||[]).length,1);
for(const term of m.TERMS)assert(global.GLOSSAR.some(g=>g.begriff===term),"glossary missing: "+term);
console.log("lf1-markt-kundschaft.test.js: PASS — content, catalogue, stable IDs, feedback model, glossary and progress");
