"use strict";
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
global.window = global;
require(path.join(root, "js/glossar-daten.js"));
const m = require(path.join(root, "js/lf2-beschaffung.js"));

assert.equal(m.ID, "lf2-beschaffung");
assert.equal(m.KEY, "it-ausbildung.lf2-beschaffung.v1");
assert.equal(m.QUESTIONS.length, 6);
assert.deepEqual(m.QUESTIONS.map(q => q.id), ["q1", "q2", "q3", "q4", "q5", "q6"]);
for (const q of m.QUESTIONS) {
  assert.equal(q.options.length, 3, q.id + ": drei Optionen");
  assert.equal(q.options.filter(o => o.id === q.correct).length, 1, q.id + ": genau eine richtige Antwort");
  assert.equal(new Set(q.options.map(o => o.id)).size, q.options.length, q.id + ": eindeutige Options-IDs");
  assert(q.options.every(o => /^[a-z][a-z0-9]{2,}$/.test(o.id)), q.id + ": sprechende IDs statt Positionen");
  assert(q.options.every(o => o.feedback.length > 20), q.id + ": Erklärfeedback");
}
const pos = m.QUESTIONS.map(q => q.options.findIndex(o => o.id === q.correct));
assert.deepEqual(new Set(pos), new Set([0, 1, 2]), "richtige Positionen verteilt: " + pos);
assert(pos[0] !== 0, "erste Aufgabe: Position 1 ist nicht richtig");

// Lieferzeit: Mittwoch + 5 Werktage = Mittwoch der Folgewoche; Montag + 5 = Montag der Folgewoche
assert.deepEqual(m.deliveryDay(2, 5), { index: 2, day: "Mittwoch", nextWeek: true, weeks: 1 });
assert.equal(m.deliveryDay(0, 5).day, "Montag");
assert.equal(m.deliveryDay(0, 5).nextWeek, true);
assert.equal(m.deliveryDay(0, 4).day, "Freitag");
assert.equal(m.deliveryDay(0, 4).nextWeek, false);
assert.equal(m.deliveryDay(4, 1).day, "Montag", "Wochenende wird übersprungen");
assert.equal(m.deliveryDay(2, 0).day, "Mittwoch");
assert.equal(m.deliveryDay(2, 3).day, "Montag", "Mittwoch + 3 Werktage (nicht 5 Kalendertage-Lösung)");
assert.notEqual(m.deliveryDay(2, 5).day, "Montag");
const lab = (q, id) => m.QUESTIONS.find(x => x.id === q).options.find(o => o.id === id).label;
assert(lab("q3", "mittwoch").startsWith(m.deliveryDay(2, 5).day));

// Wareneingang
assert.deepEqual(m.deviations(), [{ id: "bildschirm", kind: "schaden", count: 1 }, { id: "filter", kind: "menge", diff: -1 }]);
assert(m.RECEIPT.every(r => r.ordered === 3 && r.note === 3), "Bestellung und Lieferschein stimmen überein");
assert(lab("q4", "fehlt").includes("fehlt 1 Filter"));

const all = { q1: "ablegen", q2: "abgleich", q3: "mittwoch", q4: "fehlt", q5: "sachlich", q6: "melden" };
const none = m.evaluate({});
assert.equal(none.empty, 6); assert.equal(none.allCorrect, false);
assert(none.results.every(r => r.status === "empty" && r.feedback === ""));
const ok = m.evaluate(all);
assert.equal(ok.correct, 6); assert.equal(ok.allCorrect, true);
const partial = m.evaluate({ ...all, q3: "montag", q6: undefined });
assert.equal(partial.correct, 4); assert.equal(partial.wrong, 1); assert.equal(partial.empty, 1);
assert.equal(partial.results[2].status, "wrong");
assert(partial.results[2].feedback.length > 20);
assert.equal(m.evaluate({ q1: "unbekannt" }).results[0].status, "empty");
assert.equal(m.evaluate({ ...all, q5: "vorwurf" }).allCorrect, false, "geänderte Antwort invalidiert");
assert.equal(m.evaluate(all).allCorrect, true);
assert.equal(m.progress({ checked: false, finish: false }), 0);
assert.equal(m.progress({ checked: true, finish: true, answers: all }), 100);
assert.equal(m.progress({ checked: false, finish: true, answers: all }), 14);

const h = fs.readFileSync(path.join(root, "module/lf2-beschaffung.html"), "utf8");
for (const t of ['data-page="lf2-beschaffung"', "Nordlicht IT-Service", "Praxis am Park", "Küstenblick Bürotechnik", "erfunden", "Übungsdaten", "fiktiv", "keine Rechtsberatung", "Rechtliche Fragen", "role=\"img\"", "Textalternative", "glossar.html", "aria-live", "lf2-angebote.html", "lf2-angebot.html", "js/lf2-beschaffung.js", "js/navigation.js", "js/anzeige-glossar.js", "Das nimmst du mit", "Werktag", "Mängelbericht", "Wareneingang", "Lieferschein", "Fehlmenge 1", "SN-F-0452", "Frau Brandt", "wird nicht abgeschickt"])
  assert(h.includes(t), "missing: " + t);
assert(!/\schecked[\s>=]/.test(h), "keine vorausgewählte Antwort im HTML");
assert(!/https?:\/\/(?!www\.w3)/.test(h.replace(/<link[^>]*>/g, "")), "keine externen Verweise");
const ids = [...h.matchAll(/ id="([^"]+)"/g)].map(x => x[1]);
assert.equal(new Set(ids).size, ids.length, "HTML-IDs eindeutig");
for (const st of m.STEPS) assert(h.includes('id="' + st + '"') && h.includes('data-step="' + st + '"'), "Schritt: " + st);
for (const r of m.RECEIPT) assert(h.includes(r.label), "Position im HTML: " + r.id);

const js = fs.readFileSync(path.join(root, "js/lf2-beschaffung.js"), "utf8");
assert(js.includes("s.answers[q.id] = o.id; s.checked = false; clearFeedback();"), "Antwortänderung entfernt veraltetes Ergebnis");
assert(js.includes("function reset()") && js.includes('$("done").textContent = ""'), "Reset räumt Ergebnis und Abschlusstext");
assert(!/Kaufvertrag|Gewährleistung|Mängelrecht|Rücktritt|Schadensersatz/.test(h + js), "keine Rechtsbehauptungen");

const catalog = fs.readFileSync(path.join(root, "js/module-daten.js"), "utf8");
assert(catalog.includes('page: "lf2-beschaffung", status: "verfuegbar", datei: "module/lf2-beschaffung.html"'));
assert.equal((catalog.match(/id: "lf2-beschaffung"/g) || []).length, 1, "stabile ID genau einmal");
assert.equal((catalog.match(/id: "lf2-auswertung"[^}]*status: "verfuegbar"/g) || []).length, 1, "LF2.12 ist umgesetzt");

const fp = fs.readFileSync(path.join(root, "js/fortschritt.js"), "utf8");
assert(fp.includes('"lf2-beschaffung": "it-ausbildung.lf2-beschaffung.v1"'));
assert(fp.includes('id === "lf2-beschaffung"'));
for (const v of Object.values(all)) assert(fp.includes('"' + v + '"'), "Fortschrittsprüfung nutzt Antwort-ID " + v);

const names = global.GLOSSAR.map(x => x.begriff);
assert.equal(new Set(names).size, names.length, "Glossar eindeutig");
for (const b of ["Bestellung", "Bestellfreigabe", "Auftragsbestätigung", "Lieferzeit", "Wareneingang", "Lieferschein", "Mängelbericht"]) {
  const e = global.GLOSSAR.find(x => x.begriff === b);
  assert(e, "Glossar: " + b);
  assert(h.includes("<summary>" + b + "</summary><p>" + e.erklaerung.replace(/&/g, "&amp;") + "</p>"), "Hinweis im Modul = Glossartext: " + b);
}
console.log("lf2-beschaffung.test.js: PASS — Lieferzeit, Wareneingang, Antwortlogik, Seite, Katalog, Fortschritt, Glossar");
