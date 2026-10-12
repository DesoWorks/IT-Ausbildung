"use strict";
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
global.window = global;
require(path.join(root, "js/glossar-daten.js"));
const m = require(path.join(root, "js/lf2-uebergabe.js"));
const prev = require(path.join(root, "js/lf2-einrichten.js"));

assert.equal(m.ID, "lf2-uebergabe");
assert.equal(m.KEY, "it-ausbildung.lf2-uebergabe.v1");
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

// Konsistenz mit den simulierten Prüfergebnissen aus LF2.10
assert.deepEqual(m.RESULTS.map(r => [r.id, r.label, r.result]), prev.CHECKLIST.map(r => [r.id, r.label, r.result]), "Ergebnisse stimmen mit LF2.10 überein");

// Status: offener Punkt = keine erfolgreiche Übergabe
const st = m.status();
assert.deepEqual(st, { total: 6, ok: 5, open: 1, openIds: ["komponenten"], state: "zurueckgestellt", success: false });
const fixed = m.status(m.RESULTS.map(x => ({ ...x, result: "ok" })));
assert.equal(fixed.success, true); assert.equal(fixed.state, "uebergabebereit");

const all = { q1: "nachweis", q2: "zurueckgestellt", q3: "mangeltext", q4: "ehrlich", q5: "nachpruefen", q6: "einweisung" };
const none = m.evaluate({});
assert.equal(none.empty, 6); assert.equal(none.allCorrect, false);
assert(none.results.every(r => r.status === "empty" && r.feedback === ""));
const ok = m.evaluate(all);
assert.equal(ok.correct, 6); assert.equal(ok.allCorrect, true);
const partial = m.evaluate({ ...all, q2: "uebergeben", q6: undefined });
assert.equal(partial.correct, 4); assert.equal(partial.wrong, 1); assert.equal(partial.empty, 1);
assert.equal(partial.results[1].status, "wrong");
assert(partial.results[1].feedback.length > 20);
assert.equal(m.evaluate({ q1: "unbekannt" }).results[0].status, "empty");
assert.equal(m.evaluate({ ...all, q4: "ja" }).allCorrect, false, "geänderte Antwort invalidiert");
assert.equal(m.progress({ checked: false, finish: false }), 0);
assert.equal(m.progress({ checked: true, finish: true, answers: all }), 100);
assert.equal(m.progress({ checked: false, finish: true, answers: all }), 14);

const h = fs.readFileSync(path.join(root, "module/lf2-uebergabe.html"), "utf8");
for (const t of ['data-page="lf2-uebergabe"', "Nordlicht IT-Service", "Praxis am Park", "Küstenblick Bürotechnik", "Musterarbeitsplatz", "Übungsdaten", "erfunden", "keine echten Kundendaten", "role=\"img\"", "Textalternative", "glossar.html", "aria-live", "lf2-einrichten.html", "js/lf2-uebergabe.js", "js/navigation.js", "js/anzeige-glossar.js", "Das nimmst du mit", "nicht erfolgreich", "Übergabe zurückgestellt", "Frau Brandt", "Frau Keller", "Blickschutzfilter fehlt"])
  assert(h.includes(t), "missing: " + t);
assert(!/\schecked[\s>=]/.test(h), "keine vorausgewählte Antwort im HTML");
assert(!/https?:\/\/(?!www\.w3)/.test(h.replace(/<link[^>]*>/g, "")), "keine externen Verweise");
const ids = [...h.matchAll(/ id="([^"]+)"/g)].map(x => x[1]);
assert.equal(new Set(ids).size, ids.length, "HTML-IDs eindeutig");
for (const st2 of m.STEPS) assert(h.includes('id="' + st2 + '"') && h.includes('data-step="' + st2 + '"'), "Schritt: " + st2);
for (const r of m.RESULTS) assert(h.includes(r.label), "Prüfpunkt im HTML: " + r.id);

const js = fs.readFileSync(path.join(root, "js/lf2-uebergabe.js"), "utf8");
assert(js.includes("s.answers[q.id] = o.id; s.checked = false; clearFeedback();"), "Antwortänderung entfernt veraltetes Ergebnis");
assert(js.includes("function reset()") && js.includes('$("done").textContent = ""'), "Reset räumt Ergebnis und Abschlusstext");
assert(js.includes('d.createElement("fieldset")') && js.includes('input.type = "radio"'), "Radio-Gruppen in Fieldsets");
assert(!/Kaufvertrag|Gewährleistung|Rücktritt|Schadensersatz|DGUV|VDE|Prüffrist/.test(h + js), "keine Rechts-/Normbehauptungen");

const catalog = fs.readFileSync(path.join(root, "js/module-daten.js"), "utf8");
assert(catalog.includes('page: "lf2-uebergabe", status: "verfuegbar", datei: "module/lf2-uebergabe.html"'));
assert.equal((catalog.match(/id: "lf2-uebergabe"/g) || []).length, 1, "stabile ID genau einmal");
assert.equal((catalog.match(/id: "lf2-auswertung"[^}]*status: "verfuegbar"/g) || []).length, 1, "LF2.12 ist umgesetzt");

const fp = fs.readFileSync(path.join(root, "js/fortschritt.js"), "utf8");
assert(fp.includes('"lf2-uebergabe": "it-ausbildung.lf2-uebergabe.v1"'));
assert(fp.includes('id === "lf2-uebergabe"'));
for (const v of Object.values(all)) assert(fp.includes('"' + v + '"'), "Fortschrittsprüfung nutzt Antwort-ID " + v);

const names = global.GLOSSAR.map(x => x.begriff);
assert.equal(new Set(names).size, names.length, "Glossar eindeutig");
for (const b of ["Übergabeprotokoll", "Übergabestatus", "Nachprüfung", "Einweisung"]) {
  const e = global.GLOSSAR.find(x => x.begriff === b);
  assert(e, "Glossar: " + b);
  assert(h.includes("<summary>" + b + "</summary><p>" + e.erklaerung.replace(/&/g, "&amp;") + "</p>"), "Hinweis im Modul = Glossartext: " + b);
}
// Längenbalance: Die Länge darf die richtige Antwort nicht verraten (prüft nur Länge, nicht Plausibilität)
let correctLongest = 0, correctShortest = 0;
for (const q of m.QUESTIONS) {
  const len = q.options.map(o => o.label.length), c = q.options.find(o => o.id === q.correct).label.length;
  assert(Math.max(...len) / Math.min(...len) <= 1.3, q.id + ": Längenverhältnis höchstens 1,3: " + len);
  if (c === Math.max(...len)) correctLongest++;
  if (c === Math.min(...len)) correctShortest++;
}
assert(correctLongest <= 2, "richtige Antwort nicht systematisch die längste: " + correctLongest);
assert(correctShortest <= 2, "richtige Antwort nicht systematisch die kürzeste: " + correctShortest);
assert(js.includes('b.hidden = true; b.textContent = "";\n    $("done").textContent = "";'), "Antwortänderung leert den Abschlusstext");

console.log("lf2-uebergabe.test.js: PASS — Status, Antwortlogik, Seite, Katalog, Fortschritt, Glossar");
