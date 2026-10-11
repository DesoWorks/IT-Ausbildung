"use strict";
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
const m = require(path.join(root, "js/lf2-sichere-auswahl.js"));

assert.equal(m.ID, "lf2-sichere-auswahl");
assert.equal(m.KEY, "it-ausbildung.lf2-sichere-auswahl.v1");
assert.equal(m.QUESTIONS.length, 4);
for (const q of m.QUESTIONS) {
  assert.equal(q.options.filter(o => o.id === q.correct).length, 1, q.id + ": genau eine richtige Antwort");
  assert.equal(new Set(q.options.map(o => o.id)).size, q.options.length, q.id + ": eindeutige Options-IDs");
  assert(q.options.every(o => o.feedback.length > 20), q.id + ": Erklärfeedback");
}
const pos = m.QUESTIONS.map(q => q.options.findIndex(o => o.id === q.correct));
assert(new Set(pos).size > 1, "richtige Positionen variieren");
assert(pos[0] !== 0, "Position 1 ist nicht durchgehend richtig");
assert(!pos.every(p => p === 0), "richtige Antwort nicht immer zuerst");

const all = { q1: "klaeren", q2: "getrennt", q3: "unbelegt", q4: "sicherheit" };
const none = m.evaluate({});
assert.equal(none.empty, 4); assert.equal(none.allCorrect, false);
assert(none.results.every(r => r.status === "empty"));
const ok = m.evaluate(all);
assert.equal(ok.correct, 4); assert.equal(ok.allCorrect, true);
const wrong = m.evaluate({ ...all, q1: "selbst" });
assert.equal(wrong.correct, 3); assert.equal(wrong.wrong, 1);
assert.equal(wrong.results[0].status, "wrong");
assert(wrong.results[0].feedback.length > 20);
assert.equal(m.evaluate({ q1: "unbekannt" }).results[0].status, "empty");
// Änderung der Antwort: neue Auswertung statt alter Zustand
assert.equal(m.evaluate({ ...all, q2: "geprueft" }).allCorrect, false);
assert.equal(m.evaluate(all).allCorrect, true);
assert.equal(m.progress({ checked: false, finish: false }), 0);
assert.equal(m.progress({ checked: true, finish: true, answers: all }), 100);
assert.equal(m.progress({ checked: false, finish: true, answers: all }), 20);

const h = fs.readFileSync(path.join(root, "module/lf2-sichere-auswahl.html"), "utf8");
for (const t of ['data-page="lf2-sichere-auswahl"', "Fiktive Produktkarten", "keine Rechtsberatung", "Netzspannung", "Lumo 24", "Voltix N-65", "Klangtal H3", "Lichtblick L1", "europa.eu/youreurope", "baua.de", "gesetze-im-internet.de", "glossar.html", "aria-live", "lf2-kriterien.html", "js/lf2-sichere-auswahl.js", "js/navigation.js", "js/anzeige-glossar.js"])
  assert(h.includes(t), "missing: " + t);

const catalog = fs.readFileSync(path.join(root, "js/module-daten.js"), "utf8");
assert(catalog.includes('page: "lf2-sichere-auswahl", status: "verfuegbar", datei: "module/lf2-sichere-auswahl.html"'));
assert.equal((catalog.match(/id: "lf2-sichere-auswahl"/g) || []).length, 1, "stabile ID genau einmal");
assert.equal((catalog.match(/id: "lf2-auswertung"[^}]*status: "verfuegbar"/g) || []).length, 1, "LF2.12 ist umgesetzt");

const fp = fs.readFileSync(path.join(root, "js/fortschritt.js"), "utf8");
assert(fp.includes('"lf2-sichere-auswahl": "it-ausbildung.lf2-sichere-auswahl.v1"'));

const gl = fs.readFileSync(path.join(root, "js/glossar-daten.js"), "utf8");
for (const b of ["CE-Kennzeichnung", "GS-Zeichen", "Elektroaltgeräte-Symbol"]) assert(gl.includes('begriff: "' + b + '"'), "Glossar: " + b);
console.log("lf2-sichere-auswahl.test.js: PASS — Modell, Seite, Katalog, Fortschritt, Glossar");
