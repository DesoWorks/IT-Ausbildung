"use strict";
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
global.window = global;
require(path.join(root, "js/glossar-daten.js"));
const m = require(path.join(root, "js/lf2-einrichten.js"));

assert.equal(m.ID, "lf2-einrichten");
assert.equal(m.KEY, "it-ausbildung.lf2-einrichten.v1");
assert.equal(m.QUESTIONS.length, 6);
assert.deepEqual(m.QUESTIONS.map(q => q.id), ["q1", "q2", "q3", "q4", "q5", "q6"]);
for (const q of m.QUESTIONS) {
  assert.equal(q.options.length, 3, q.id + ": drei Optionen");
  assert.equal(q.options.filter(o => o.id === q.correct).length, 1, q.id + ": genau eine richtige Antwort");
  assert.equal(new Set(q.options.map(o => o.id)).size, q.options.length, q.id + ": eindeutige Options-IDs");
  assert(q.options.every(o => /^[a-z][a-z0-9]{2,}$/.test(o.id)), q.id + ": sprechende IDs");
  assert(q.options.every(o => o.feedback.length > 20), q.id + ": Erklärfeedback");
}
const pos = m.QUESTIONS.map(q => q.options.findIndex(o => o.id === q.correct));
assert.deepEqual(new Set(pos), new Set([0, 1, 2]), "richtige Positionen verteilt: " + pos);
assert(pos[0] !== 0, "erste Aufgabe: Position 1 ist nicht richtig");

// Länge darf die richtige Antwort nicht verraten
const rank = m.QUESTIONS.map(q => {
  const len = q.options.map(o => o.label.length), c = q.options.find(o => o.id === q.correct).label.length;
  assert(Math.max(...len) / Math.min(...len) <= 1.3, q.id + ": Optionslängen ähnlich: " + len);
  assert(c < Math.max(...len), q.id + ": richtige Antwort ist nicht die längste");
  return c === Math.min(...len) ? "min" : "mid";
});
assert(rank.filter(x => x === "min").length <= 2, "richtige Antwort nicht systematisch die kürzeste: " + rank);
assert(!m.QUESTIONS.some(q => q.options.some(o => /Frau Brandt/.test(o.label) && o.id !== "eintrag")), "Namen nur in der richtigen Antwort wäre ein Hinweis");

// Checkliste: 5 von 6 bestanden, genau ein Punkt offen -> nicht übergabefähig
const sum = m.summarize();
assert.deepEqual(sum, { total: 6, ok: 5, open: 1, openIds: ["komponenten"], ready: false });
assert.equal(m.summarize(m.CHECKLIST.map(x => ({ ...x, result: "ok" }))).ready, true);

const all = { q1: "vorbereiten", q2: "melden", q3: "stoppen", q4: "kabel", q5: "eintrag", q6: "nichtfrei" };
const none = m.evaluate({});
assert.equal(none.empty, 6); assert.equal(none.allCorrect, false);
assert(none.results.every(r => r.status === "empty" && r.feedback === ""));
const ok = m.evaluate(all);
assert.equal(ok.correct, 6); assert.equal(ok.allCorrect, true);
const partial = m.evaluate({ ...all, q3: "probieren", q6: undefined });
assert.equal(partial.correct, 4); assert.equal(partial.wrong, 1); assert.equal(partial.empty, 1);
assert.equal(partial.results[2].status, "wrong");
assert(partial.results[2].feedback.length > 20);
assert.equal(m.evaluate({ q1: "unbekannt" }).results[0].status, "empty");
assert.equal(m.evaluate({ ...all, q5: "alleskla" }).allCorrect, false, "geänderte Antwort invalidiert");
assert.equal(m.progress({ checked: false, finish: false }), 0);
assert.equal(m.progress({ checked: true, finish: true, answers: all }), 100);
assert.equal(m.progress({ checked: false, finish: true, answers: all }), 14);

const h = fs.readFileSync(path.join(root, "module/lf2-einrichten.html"), "utf8");
for (const t of ['data-page="lf2-einrichten"', "Nordlicht IT-Service", "Praxis am Park", "Küstenblick Bürotechnik", "Musterarbeitsplatz", "Übungsdaten", "erfunden", "nicht an ein produktives System", "Netzspannung", "role=\"img\"", "Textalternative", "glossar.html", "aria-live", "lf2-beschaffung.html", "js/lf2-einrichten.js", "js/navigation.js", "js/anzeige-glossar.js", "Das nimmst du mit", "Sichtprüfung", "Funktionsprüfung", "Eskalation", "noch nicht übergabefähig", "Frau Brandt"])
  assert(h.includes(t), "missing: " + t);
assert(!/\schecked[\s>=]/.test(h), "keine vorausgewählte Antwort im HTML");
assert(!/https?:\/\/(?!www\.w3)/.test(h.replace(/<link[^>]*>/g, "")), "keine externen Verweise");
const ids = [...h.matchAll(/ id="([^"]+)"/g)].map(x => x[1]);
assert.equal(new Set(ids).size, ids.length, "HTML-IDs eindeutig");
for (const st of m.STEPS) assert(h.includes('id="' + st + '"') && h.includes('data-step="' + st + '"'), "Schritt: " + st);
for (const c of m.CHECKLIST) assert(h.includes(c.label), "Prüfpunkt im HTML: " + c.id);

const js = fs.readFileSync(path.join(root, "js/lf2-einrichten.js"), "utf8");
assert(js.includes("s.answers[q.id] = o.id; s.checked = false; clearFeedback();"), "Antwortänderung entfernt veraltetes Ergebnis");
assert(/function clearFeedback\(\) \{[^}]*\$\("done"\)\.textContent = ""/.test(js), "Antwortänderung löscht veralteten Abschlusstext");
assert(js.includes("function reset()") && js.includes('$("done").textContent = ""'), "Reset räumt Ergebnis und Abschlusstext");
assert(js.includes('d.createElement("fieldset")') && js.includes('input.type = "radio"'), "Radio-Gruppen in Fieldsets");
assert(!/Kaufvertrag|Gewährleistung|Mängelrecht|Rücktritt|Schadensersatz|DGUV|VDE|Prüffrist/.test(h + js), "keine Rechts-/Normbehauptungen");

const catalog = fs.readFileSync(path.join(root, "js/module-daten.js"), "utf8");
assert(catalog.includes('page: "lf2-einrichten", status: "verfuegbar", datei: "module/lf2-einrichten.html"'));
assert.equal((catalog.match(/id: "lf2-einrichten"/g) || []).length, 1, "stabile ID genau einmal");
assert.equal((catalog.match(/id: "lf2-auswertung"[^}]*status: "verfuegbar"/g) || []).length, 1, "LF2.12 ist umgesetzt");

const fp = fs.readFileSync(path.join(root, "js/fortschritt.js"), "utf8");
assert(fp.includes('"lf2-einrichten": "it-ausbildung.lf2-einrichten.v1"'));
assert(fp.includes('id === "lf2-einrichten"'));
for (const v of Object.values(all)) assert(fp.includes('"' + v + '"'), "Fortschrittsprüfung nutzt Antwort-ID " + v);

const names = global.GLOSSAR.map(x => x.begriff);
assert.equal(new Set(names).size, names.length, "Glossar eindeutig");
for (const b of ["Musterarbeitsplatz", "Checkliste", "Sichtprüfung", "Inbetriebnahme", "Funktionsprüfung", "Eskalation"]) {
  const e = global.GLOSSAR.find(x => x.begriff === b);
  assert(e, "Glossar: " + b);
  assert(h.includes("<summary>" + b + "</summary><p>" + e.erklaerung.replace(/&/g, "&amp;") + "</p>"), "Hinweis im Modul = Glossartext: " + b);
}
console.log("lf2-einrichten.test.js: PASS — Checkliste, Antwortlogik, Seite, Katalog, Fortschritt, Glossar");

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
