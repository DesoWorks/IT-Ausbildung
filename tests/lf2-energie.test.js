"use strict";
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
global.window = global;
require(path.join(root, "js/glossar-daten.js"));
const m = require(path.join(root, "js/lf2-energie.js"));

assert.equal(m.ID, "lf2-energie");
assert.equal(m.KEY, "it-ausbildung.lf2-energie.v1");
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

// Rechenweg W × h = Wh, / 1000 = kWh
assert.deepEqual(m.VARIANTS.map(v => m.dayWh(v.id)), [192, 142, 116]);
assert.deepEqual(m.VARIANTS.map(v => m.yearWh(v.id)), [42240, 31240, 25520]);
assert.deepEqual(m.VARIANTS.map(v => m.fmt(m.toKwh(m.yearWh(v.id)))), ["42,24", "31,24", "25,52"]);
assert.equal(m.fmt(m.toKwh(m.yearWh("lumo") - m.yearWh("vento"))), "16,72");
assert.equal(m.fmt(m.toKwh(116)), "0,116");
assert(Number.isNaN(m.dayWh("unbekannt")));
assert.equal(m.dayWh("vento", { loadH: 8, idleH: 0, days: 220 }), 144, "anderes Profil ändert das Ergebnis");
assert.equal(18 * 6, 108, "q1");

const all = { q1: "formel", q2: "k0116", q3: "k3124", q4: "diff1672", q5: "annahmen" };
const none = m.evaluate({});
assert.equal(none.empty, 5); assert.equal(none.allCorrect, false);
assert(none.results.every(r => r.status === "empty"));
const ok = m.evaluate(all);
assert.equal(ok.correct, 5); assert.equal(ok.allCorrect, true);
const partial = m.evaluate({ ...all, q3: "k142", q5: undefined });
assert.equal(partial.correct, 3); assert.equal(partial.wrong, 1); assert.equal(partial.empty, 1);
assert.equal(partial.results[2].status, "wrong");
assert(partial.results[2].feedback.length > 20);
assert.equal(m.evaluate({ q1: "unbekannt" }).results[0].status, "empty");
assert.equal(m.evaluate({ ...all, q4: "w12" }).allCorrect, false, "geänderte Antwort invalidiert");
assert.equal(m.evaluate(all).allCorrect, true);
assert.equal(m.progress({ checked: false, finish: false }), 0);
assert.equal(m.progress({ checked: true, finish: true, answers: all }), 100);
assert.equal(m.progress({ checked: false, finish: true, answers: all }), 17);

const h = fs.readFileSync(path.join(root, "module/lf2-energie.html"), "utf8");
for (const t of ['data-page="lf2-energie"', "Nordlicht IT-Service", "Praxis am Park", "Übungsdaten", "erfunden", "Lumo Kompakt", "Terra Modular", "Vento Allround", "Nutzungsprofil", "Watt × Stunden = Wattstunden", "÷ 1000 = Kilowattstunden", "ökologischen Ziel", "keine Messung", "role=\"img\"", "Textalternative", "glossar.html", "aria-live", "lf2-technische-daten.html", "lf2-varianten.html", "js/lf2-energie.js", "js/navigation.js", "js/anzeige-glossar.js", "Das nimmst du mit", "Rechtliche Vorgaben"])
  assert(h.includes(t), "missing: " + t);
for (const v of m.VARIANTS) {
  const p = m.PROFILE, last = v.loadW * p.loadH, leer = v.idleW * p.idleH, tag = last + leer;
  for (const cell of [
    v.loadW + " W × " + p.loadH + " h = " + last + " Wh",
    v.idleW + " W × " + p.idleH + " h = " + leer + " Wh",
    last + " + " + leer + " = " + tag + " Wh",
    tag + " Wh ÷ 1000 = " + m.fmt(m.toKwh(tag)) + " kWh",
    m.fmt(m.toKwh(tag)) + " kWh × " + p.days + " = " + m.fmt(m.toKwh(m.yearWh(v.id))) + " kWh"
  ]) assert(h.includes(cell), "Rechenweg im HTML: " + cell);
}
assert(!/€|Euro|Cent/.test(h.replace(/Kosten in Euro werden nicht berechnet/, "")), "keine Kostenrechnung");
assert(!/\schecked[\s>=]/.test(h), "keine vorausgewählte Antwort im HTML");
assert(!/https?:\/\/(?!www\.w3)/.test(h.replace(/<link[^>]*>/g, "")), "keine externen Verweise");

const js = fs.readFileSync(path.join(root, "js/lf2-energie.js"), "utf8");
assert(js.includes("s.answers[q.id] = o.id; s.checked = false; clearFeedback();"), "Antwortänderung entfernt veraltetes Ergebnis");
assert(js.includes("function reset()") && js.includes('$("done").textContent = ""'), "Reset räumt Ergebnis und Abschlusstext");

const catalog = fs.readFileSync(path.join(root, "js/module-daten.js"), "utf8");
assert(catalog.includes('page: "lf2-energie", status: "verfuegbar", datei: "module/lf2-energie.html"'));
assert.equal((catalog.match(/id: "lf2-energie"/g) || []).length, 1, "stabile ID genau einmal");
assert.equal((catalog.match(/id: "lf2-auswertung"[^}]*status: "verfuegbar"/g) || []).length, 1, "LF2.12 ist umgesetzt");

const fp = fs.readFileSync(path.join(root, "js/fortschritt.js"), "utf8");
assert(fp.includes('"lf2-energie": "it-ausbildung.lf2-energie.v1"'));
assert(fp.includes('id === "lf2-energie"'));

const names = global.GLOSSAR.map(x => x.begriff);
assert.equal(new Set(names).size, names.length, "Glossar eindeutig");
for (const b of ["Leistungsaufnahme", "Wattstunde", "Kilowattstunde", "Nutzungsprofil", "Energieeffizienz", "Ökologisches Ziel"]) {
  const e = global.GLOSSAR.find(x => x.begriff === b);
  assert(e, "Glossar: " + b);
  assert(h.includes("<summary>" + b + "</summary><p>" + e.erklaerung.replace(/&/g, "&amp;") + "</p>"), "Hinweis im Modul = Glossartext: " + b);
}
console.log("lf2-energie.test.js: PASS — Modell, Rechnung, Seite, Katalog, Fortschritt, Glossar");
