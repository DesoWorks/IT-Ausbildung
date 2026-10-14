"use strict";
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
global.window = global;
require(path.join(root, "js/glossar-daten.js"));
const m = require(path.join(root, "js/lf2-angebote.js"));

assert.equal(m.ID, "lf2-angebote");
assert.equal(m.KEY, "it-ausbildung.lf2-angebote.v1");
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
  assert(right <= Math.max(...lens) * 1.35, q.id + ": richtige Antwort nicht auffällig länger (" + right + " gegen " + lens + ")");
}

// Gesamtkosten nachvollziehbar
assert.deepEqual(m.OFFERS.map(o => m.offerSum(o.id)), [950, 960, 765]);
assert.deepEqual(m.OFFERS.map(o => m.adjustedSum(o.id)), [950, 960, 895]);
assert(m.OFFERS.every(o => m.adjustedSum(o.id) <= m.BUDGET), "Pflichtkriterium Budget erfüllt");
assert(Number.isNaN(m.offerSum("unbekannt")) && Number.isNaN(m.adjustedSum("x")) && Number.isNaN(m.total("x")));
for (const o of m.OFFERS) for (const it of m.ITEMS) {
  if (o.items[it.id] === null) assert(o.estimates[it.id] > 0, o.id + ": fehlender Teil hat Schätzung " + it.id);
}
// Nutzwert
assert.equal(m.CRITERIA.reduce((s, c) => s + c.weight, 0), 10);
assert.equal(Object.values(m.ALT_WEIGHTS).reduce((a, b) => a + b, 0), 10);
for (const o of m.OFFERS) for (const c of m.CRITERIA) assert(o.points[c.id] >= 1 && o.points[c.id] <= 5, "Punkte 1–5");
assert.deepEqual(m.OFFERS.map(o => m.total(o.id)), [41, 38, 38]);
assert.deepEqual(m.OFFERS.map(o => m.total(o.id, m.ALT_WEIGHTS)), [41, 42, 32]);
// Stufenliste passt zu den Punkten
const kosten = c => c <= 900 ? 5 : c <= 950 ? 4 : c <= 1000 ? 3 : 0;
const liefer = d => d <= 2 ? 5 : d <= 5 ? 4 : d <= 10 ? 3 : 0;
for (const o of m.OFFERS) {
  assert.equal(o.points.kosten, kosten(m.adjustedSum(o.id)), o.id + ": Kostenstufe");
  assert.equal(o.points.lieferzeit, liefer(o.days), o.id + ": Lieferstufe");
}
// Lösungen entsprechen der Rechnung
assert.equal(m.adjustedSum("klarwerk"), 765 + 30 + 100, "q1");
assert.equal(m.adjustedSum("nordwind"), 960, "q2");
assert.equal(m.total("nordwind"), 38, "q3");
assert(m.total("nordwind", m.ALT_WEIGHTS) > m.total("kueste", m.ALT_WEIGHTS), "q4");
assert.equal(m.total("nordwind", m.ALT_WEIGHTS), 42);
assert.equal(m.total("kueste", m.ALT_WEIGHTS), 41);
assert(m.total("kueste") > m.total("nordwind") && m.total("kueste") > m.total("klarwerk"), "q5: A führt");

const all = { q1: "ergaenzen", q2: "s960", q3: "p38", q4: "bvorn", q5: "empfehlung" };
const none = m.evaluate({});
assert.equal(none.empty, 5); assert.equal(none.allCorrect, false);
assert(none.results.every(r => r.status === "empty"));
const ok = m.evaluate(all);
assert.equal(ok.correct, 5); assert.equal(ok.allCorrect, true);
const partial = m.evaluate({ ...all, q3: "p16", q5: undefined });
assert.equal(partial.correct, 3); assert.equal(partial.wrong, 1); assert.equal(partial.empty, 1);
assert.equal(partial.results[2].status, "wrong");
assert(partial.results[2].feedback.length > 20);
assert.equal(m.evaluate({ q1: "unbekannt" }).results[0].status, "empty");
assert.equal(m.evaluate({ ...all, q4: "avorn" }).allCorrect, false, "geänderte Antwort invalidiert");
assert.equal(m.evaluate(all).allCorrect, true);
assert.equal(m.progress({ checked: false, finish: false }), 0);
assert.equal(m.progress({ checked: true, finish: true, answers: all }), 100);
assert.equal(m.progress({ checked: false, finish: true, answers: all }), 17);

const h = fs.readFileSync(path.join(root, "module/lf2-angebote.html"), "utf8");
for (const t of ['data-page="lf2-angebote"', "Nordlicht IT-Service", "Praxis am Park", "erfunden", "Übungsdaten", "Küstenblick Bürotechnik", "Nordwind Systemhaus", "Klarwerk Onlinehandel", "Schätzung", "quantitativ", "qualitativ", "Stufenliste", "Pflichtkriterium", "1.200 Euro", "Terra Modular", "31,24 kWh", "Zielkonflikt", "role=\"img\"", "Textalternative", "glossar.html", "aria-live", "lf2-kriterien.html", "lf2-varianten.html", "lf2-energie.html", "js/lf2-angebote.js", "js/navigation.js", "js/anzeige-glossar.js", "Das nimmst du mit", "Rechtliche Fragen"])
  assert(h.includes(t), "missing: " + t);
for (const o of m.OFFERS) {
  assert(h.includes(o.name), "Anbieter im HTML: " + o.name);
  assert(h.includes("<strong>" + m.adjustedSum(o.id) + " Euro</strong>"), "Gesamtkosten im HTML: " + o.id);
  assert(h.includes("<strong>" + m.total(o.id) + "</strong>"), "Nutzwert im HTML: " + o.id);
  for (const c of m.CRITERIA) assert(h.includes(o.points[c.id] + " × " + c.weight + " = " + o.points[c.id] * c.weight), "Matrix: " + o.id + " " + c.id);
  assert(h.includes(o.days + " Werktage"), "Lieferzeit im HTML: " + o.id);
  for (const it of m.ITEMS) if (o.items[it.id] !== null) assert(h.includes(o.items[it.id] + " Euro"), "Preis im HTML: " + o.id + " " + it.id);
}
for (const t of ["950 Euro", "960 Euro", "765 Euro", "895 Euro", "640 + 150 + 30 + 40 + 0 + 90 = 950 Euro", "610 + 140 + 30 + 35 + 25 + 120 = 960 Euro", "590 + 130 + 30 + 15 = 765 Euro", "B erreicht 42 Punkte, A 41 und C nur 32"])
  assert(h.includes(t.replace("B erreicht 42 Punkte, A 41 und C nur 32", "dann erreicht B 42 Punkte, A 41 und C nur 32")) , "Rechnung im HTML: " + t);
assert(!/\schecked[\s>=]/.test(h), "keine vorausgewählte Antwort im HTML");
assert(!/https?:\/\/(?!www\.w3)/.test(h.replace(/<link[^>]*>/g, "")), "keine externen Verweise");

const js = fs.readFileSync(path.join(root, "js/lf2-angebote.js"), "utf8");
assert(js.includes("s.answers[q.id] = o.id; s.checked = false; clearFeedback();"), "Antwortänderung entfernt veraltetes Ergebnis");
assert(js.includes("function reset()") && js.includes('$("done").textContent = ""'), "Reset räumt Ergebnis und Abschlusstext");

const catalog = fs.readFileSync(path.join(root, "js/module-daten.js"), "utf8");
assert(catalog.includes('page: "lf2-angebote", status: "verfuegbar", datei: "module/lf2-angebote.html"'));
assert.equal((catalog.match(/id: "lf2-angebote"/g) || []).length, 1, "stabile ID genau einmal");
assert.equal((catalog.match(/id: "lf2-auswertung"[^}]*status: "verfuegbar"/g) || []).length, 1, "LF2.12 ist umgesetzt");

const fp = fs.readFileSync(path.join(root, "js/fortschritt.js"), "utf8");
assert(fp.includes('"lf2-angebote": "it-ausbildung.lf2-angebote.v1"'));
assert(fp.includes('id === "lf2-angebote"'));
for (const v of Object.values(all)) assert(fp.includes('"' + v + '"'), "Fortschrittsprüfung nutzt Antwort-ID " + v);

const names = global.GLOSSAR.map(x => x.begriff);
assert.equal(new Set(names).size, names.length, "Glossar eindeutig");
for (const b of ["Bezugsquelle", "Angebot", "Gesamtkosten", "Lieferzeit", "Serviceumfang", "Quantitative Angabe", "Qualitative Angabe"]) {
  const e = global.GLOSSAR.find(x => x.begriff === b);
  assert(e, "Glossar: " + b);
  assert(h.includes("<summary>" + b + "</summary><p>" + e.erklaerung.replace(/&/g, "&amp;") + "</p>"), "Hinweis im Modul = Glossartext: " + b);
}
console.log("lf2-angebote.test.js: PASS — Modell, Gesamtkosten, Nutzwert, Seite, Katalog, Fortschritt, Glossar");

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
