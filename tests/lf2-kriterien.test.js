"use strict";
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
const m = require(path.join(root, "js/lf2-kriterien.js"));

assert.equal(m.ID, "lf2-kriterien");
assert.equal(m.KEY, "it-ausbildung.lf2-kriterien.v1");
assert.equal(m.QUESTIONS.length, 4);
for (const q of m.QUESTIONS) {
  assert.equal(q.options.filter(o => o.id === q.correct).length, 1, q.id + ": genau eine richtige Antwort");
  assert.equal(new Set(q.options.map(o => o.id)).size, q.options.length, q.id + ": eindeutige Options-IDs");
  assert(q.options.every(o => o.feedback.length > 20), q.id + ": Erklärfeedback");
}
const pos = m.QUESTIONS.map(q => q.options.findIndex(o => o.id === q.correct));
assert(new Set(pos).size > 1, "richtige Positionen variieren");
assert(!pos.every(p => p === 0), "richtige Antwort nicht immer zuerst");

const all = { q1: "pflicht", q2: "wunsch", q3: "messbar", q4: "ausscheiden" };
assert.equal(m.evaluate({}).empty, 4);
assert.equal(m.evaluate(all).correct, 4);
assert.equal(m.evaluate(all).allCorrect, true);
const part = m.evaluate({ ...all, q1: "wunsch" });
assert.equal(part.correct, 3); assert.equal(part.wrong, 1); assert.equal(part.allCorrect, false);
assert.equal(m.evaluate({ q1: "unbekannt" }).results[0].status, "empty");
assert.equal(m.progress({ checked: false, finish: false }), 0);
assert.equal(m.progress({ checked: true, finish: true, answers: all }), 100);

const h = fs.readFileSync(path.join(root, "module/lf2-kriterien.html"), "utf8");
for (const t of ['data-page="lf2-kriterien"', "Fiktiver Auftrag", "1.200 Euro", "Pflicht", "Wunsch", "aria-live", "lf2-kundenbedarf.html", "js/lf2-kriterien.js", "js/navigation.js", "js/anzeige-glossar.js"])
  assert(h.includes(t), "missing: " + t);

const catalog = fs.readFileSync(path.join(root, "js/module-daten.js"), "utf8");
assert(catalog.includes('page: "lf2-kriterien", status: "verfuegbar", datei: "module/lf2-kriterien.html"'));
assert.equal((catalog.match(/id: "lf2-kriterien"/g) || []).length, 1, "stabile ID genau einmal");
assert.equal((catalog.match(/id: "lf2-auswertung"[^}]*status: "verfuegbar"/g) || []).length, 1, "LF2.12 ist verfügbar");

const gl = fs.readFileSync(path.join(root, "js/glossar-daten.js"), "utf8");
assert(gl.includes('begriff: "Pflichtkriterium"') && gl.includes('begriff: "Wunschkriterium"'));
console.log("lf2-kriterien.test.js: PASS — Modell, Seite, Katalog, Glossar");

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
