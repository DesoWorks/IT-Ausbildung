"use strict";
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
global.window = global;
require(path.join(root, "js/glossar-daten.js"));
const m = require(path.join(root, "js/lf2-varianten.js"));

assert.equal(m.ID, "lf2-varianten");
assert.equal(m.KEY, "it-ausbildung.lf2-varianten.v1");
assert.equal(m.QUESTIONS.length, 5);
assert.deepEqual(m.QUESTIONS.map(q => q.id), ["q1", "q2", "q3", "q4", "q5"]);
for (const q of m.QUESTIONS) {
  assert.equal(q.options.filter(o => o.id === q.correct).length, 1, q.id + ": genau eine richtige Antwort");
  assert.equal(new Set(q.options.map(o => o.id)).size, q.options.length, q.id + ": eindeutige Options-IDs");
  assert(q.options.every(o => /^[a-z][a-z0-9]{2,}$/.test(o.id)), q.id + ": sprechende IDs statt Positionen");
  assert(q.options.every(o => o.feedback.length > 20), q.id + ": Erklärfeedback");
}
const pos = m.QUESTIONS.map(q => q.options.findIndex(o => o.id === q.correct));
assert(new Set(pos).size === 3, "richtige Positionen verteilt: " + pos);
assert(pos[0] !== 0, "erste Aufgabe: Position 1 ist nicht richtig");
for (const q of m.QUESTIONS) {
  const lens = q.options.filter(o => o.id !== q.correct).map(o => o.label.length);
  const right = q.options.find(o => o.id === q.correct).label.length;
  assert(right <= Math.max(...lens) * 1.35, q.id + ": richtige Antwort nicht auffällig länger als falsche (" + right + " vs " + lens + ")");
}

// Berechnung nachvollziehbar und konsistent
assert.equal(m.CRITERIA.reduce((s, c) => s + c.weight, 0), 10, "Gewichte summieren sich zu 10");
assert.equal(Object.values(m.ALT_WEIGHTS).reduce((a, b) => a + b, 0), 10, "alternative Gewichte summieren sich zu 10");
assert.deepEqual(m.VARIANTS.map(v => m.total(v.id)), [25, 45, 43]);
assert.deepEqual(m.VARIANTS.map(v => m.total(v.id, m.ALT_WEIGHTS)), [25, 44, 45]);
assert(Number.isNaN(m.total("unbekannt")));
for (const v of m.VARIANTS) for (const c of m.CRITERIA) assert(v.points[c.id] >= 1 && v.points[c.id] <= 5, "Punkte 1–5");
assert.equal(m.total("vento"), 43, "q3: Lösung entspricht der Rechnung");
assert(m.total("vento", m.ALT_WEIGHTS) > m.total("terra", m.ALT_WEIGHTS), "q4: Rangfolge dreht sich");
assert(m.total("terra") > m.total("vento"), "q5: Terra führt mit ursprünglichen Gewichten");

const all = { q1: "pflicht", q2: "verschraubt", q3: "c43", q4: "vento", q5: "offen" };
const none = m.evaluate({});
assert.equal(none.empty, 5); assert.equal(none.allCorrect, false);
assert(none.results.every(r => r.status === "empty"));
const ok = m.evaluate(all);
assert.equal(ok.correct, 5); assert.equal(ok.allCorrect, true);
const partial = m.evaluate({ ...all, q3: "c17", q5: undefined });
assert.equal(partial.correct, 3); assert.equal(partial.wrong, 1); assert.equal(partial.empty, 1);
assert.equal(partial.results[2].status, "wrong");
assert(partial.results[2].feedback.length > 20);
assert.equal(m.evaluate({ q1: "unbekannt" }).results[0].status, "empty");
assert.equal(m.evaluate({ ...all, q4: "terra" }).allCorrect, false, "geänderte Antwort invalidiert");
assert.equal(m.evaluate(all).allCorrect, true);
assert.equal(m.progress({ checked: false, finish: false }), 0);
assert.equal(m.progress({ checked: true, finish: true, answers: all }), 100);
assert.equal(m.progress({ checked: false, finish: true, answers: all }), 17);

const h = fs.readFileSync(path.join(root, "module/lf2-varianten.html"), "utf8");
for (const t of ['data-page="lf2-varianten"', "Nordlicht IT-Service", "Praxis am Park", "sind erfunden", "Lumo Kompakt", "Terra Modular", "Vento Allround", "Trade-off", "Recycling", "Ergonomie", "role=\"img\"", "Textalternative", "glossar.html", "aria-live", "lf2-kriterien.html", "lf2-technische-daten.html", "js/lf2-varianten.js", "js/navigation.js", "js/anzeige-glossar.js", "Das nimmst du mit", "Rechtliche Vorgaben"])
  assert(h.includes(t), "missing: " + t);
for (const v of m.VARIANTS) for (const c of m.CRITERIA) {
  const cell = v.points[c.id] + " × " + c.weight + " = " + (v.points[c.id] * c.weight);
  assert(h.includes(cell), "Matrix enthält: " + cell);
}
for (const v of m.VARIANTS) assert(h.includes("<strong>" + m.total(v.id) + "</strong>"), "Summe im HTML: " + v.id);
assert(!/\schecked[\s>=]/.test(h), "keine vorausgewählte Antwort im HTML");
assert(!/https?:\/\/(?!www\.w3)/.test(h.replace(/<link[^>]*>/g, "")), "keine externen Verweise");

const js = fs.readFileSync(path.join(root, "js/lf2-varianten.js"), "utf8");
assert(js.includes("s.answers[q.id] = o.id; s.checked = false; clearFeedback();"), "Antwortänderung entfernt veraltetes Ergebnis");

const catalog = fs.readFileSync(path.join(root, "js/module-daten.js"), "utf8");
assert(catalog.includes('page: "lf2-varianten", status: "verfuegbar", datei: "module/lf2-varianten.html"'));
assert.equal((catalog.match(/id: "lf2-varianten"/g) || []).length, 1, "stabile ID genau einmal");
assert.equal((catalog.match(/id: "lf2-auswertung"[^}]*status: "verfuegbar"/g) || []).length, 1, "LF2.12 ist umgesetzt");

const fp = fs.readFileSync(path.join(root, "js/fortschritt.js"), "utf8");
assert(fp.includes('"lf2-varianten": "it-ausbildung.lf2-varianten.v1"'));
assert(fp.includes('id === "lf2-varianten"'));

const names = global.GLOSSAR.map(x => x.begriff);
assert.equal(new Set(names).size, names.length, "Glossar eindeutig");
for (const b of ["Nutzwertanalyse", "Gewichtung", "Ergonomie", "Recycling", "Pflichtkriterium", "Zielkonflikt", "Ökologisches Ziel"]) {
  const e = global.GLOSSAR.find(x => x.begriff === b);
  assert(e, "Glossar: " + b);
  assert(h.includes("<summary>" + b + "</summary><p>" + e.erklaerung.replace(/&/g, "&amp;") + "</p>"), "Hinweis im Modul = Glossartext: " + b);
}
console.log("lf2-varianten.test.js: PASS — Modell, Rechnung, Seite, Katalog, Fortschritt, Glossar");
