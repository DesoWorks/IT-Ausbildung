"use strict";
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict"), root = path.resolve(__dirname, "..");
global.window = global;
const m = require(path.join(root, "js/lf3-abschluss.js"));
assert.equal(m.ID, "lf3-abschluss");
assert.equal(m.KEY, "it-ausbildung.lf3-abschluss.v1");
assert.equal(m.QUESTIONS.length, 6);
for (const q of m.QUESTIONS) {
  assert.equal(q.options.filter(o => o.id === q.correct).length, 1);
  assert.equal(new Set(q.options.map(o => o.id)).size, 3);
  assert(q.options.every(o => o.feedback.length > 20));
}
const pos = m.QUESTIONS.map(q => q.options.findIndex(o => o.id === q.correct));
assert.equal(new Set(pos).size, 3, "alle drei Positionen kommen vor");
for (const p of [0, 1, 2]) assert(pos.filter(x => x === p).length <= 3, "Position " + p + " nicht dominant");
const a = { q1: "oktett", q2: "passt", q3: "dienst", q4: "zuordnung", q5: "naechste", q6: "getrennt" };
assert.equal(m.evaluate({}).empty, 6);
assert.equal(m.evaluate(a).correct, 6);
assert.equal(m.evaluate({ ...a, q4: "erreichbar" }).wrong, 1);
assert.equal(m.evaluate({ ...a, q5: undefined }).empty, 1);
assert.equal(m.progress({ checked: true, finish: true, answers: a }), 100);
assert(m.progress({ checked: false, finish: true, answers: a }) < 100);
assert.equal(m.progress({}), 0);
const h = fs.readFileSync(path.join(root, "module/lf3-abschluss.html"), "utf8");
const catalog = fs.readFileSync(path.join(root, "js/module-daten.js"), "utf8");
const fp = fs.readFileSync(path.join(root, "js/fortschritt.js"), "utf8");
for (const x of ["Mira-01", "wiki.lernnetz.test", "fiktiv", "role=\"img\"", "Textalternative", "data-page=\"lf3-abschluss\"", "Unbenotete Selbstprüfung"]) assert(h.includes(x), x);
assert(!/checked(?:="checked")?/.test(h));
assert(catalog.includes('page: "lf3-abschluss", status: "verfuegbar", datei: "module/lf3-abschluss.html"'));
assert(fp.includes('"lf3-abschluss": "it-ausbildung.lf3-abschluss.v1"'));
for (const q of m.QUESTIONS) {
  const lengths = q.options.map(o => o.label.length);
  const correct = q.options.findIndex(o => o.id === q.correct);
  assert(!(lengths[correct] === Math.max(...lengths) && lengths.filter(x => x === lengths[correct]).length === 1), "kein Längenhinweis bei " + q.id);
  assert(q.options.every(o => o.id === q.correct ? o.feedback.startsWith("Richtig") : !o.feedback.startsWith("Richtig")));
}
assert.equal(m.progressText({ checked: true, finish: false, answers: a }), "Fortschritt: 6 von 7 Schritten · Abschluss noch nicht geöffnet");
assert.equal(m.progressText({ checked: true, finish: true, answers: a }), "Fortschritt: 7 von 7 Schritten · Abschluss geöffnet");
assert(!/%/.test(m.progressText({ checked: true, finish: true, answers: a })), "Text zeigt keine Prozentzahl");
require(path.join(root, "js/glossar-daten.js"));
for (const w of ["IPv4", "Netzmaske", "DHCP", "DNS", "Befund"]) {
  assert(global.GLOSSAR.some(x => x.begriff === w), "Glossarbegriff vorhanden: " + w);
  assert(h.includes("<summary>" + w), "Seite erklärt " + w);
}
assert(h.includes("../glossar.html?von=lf3-abschluss.html"));
console.log("lf3-abschluss.test.js: PASS");
