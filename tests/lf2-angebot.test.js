"use strict";
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
global.window = global;
require(path.join(root, "js/glossar-daten.js"));
const m = require(path.join(root, "js/lf2-angebot.js"));

assert.equal(m.ID, "lf2-angebot");
assert.equal(m.KEY, "it-ausbildung.lf2-angebot.v1");
assert.equal(m.QUESTIONS.length, 5);
assert.deepEqual(m.QUESTIONS.map(q => q.id), ["q1", "q2", "q3", "q4", "q5"]);
for (const q of m.QUESTIONS) {
  assert.equal(q.options.length, 3, q.id + ": drei Optionen");
  assert.equal(q.options.filter(o => o.id === q.correct).length, 1, q.id + ": genau eine richtige Antwort");
  assert.equal(new Set(q.options.map(o => o.id)).size, q.options.length, q.id + ": eindeutige Options-IDs");
  assert(q.options.every(o => /^[a-z][a-z0-9]{2,}$/.test(o.id)), q.id + ": sprechende IDs statt Positionen");
  assert(q.options.every(o => o.feedback.length > 20), q.id + ": Erklärfeedback");
}
const pos = m.QUESTIONS.map(q => q.options.findIndex(o => o.id === q.correct));
assert(new Set(pos).size === 3, "richtige Positionen verteilt: " + pos);
assert(pos[0] !== 0, "erste Aufgabe: Position 1 ist nicht richtig");
for (const q of m.QUESTIONS) {
  const right = q.options.find(o => o.id === q.correct).label.length;
  const longestWrong = Math.max(...q.options.filter(o => o.id !== q.correct).map(o => o.label.length));
  assert(right <= longestWrong * 1.35, q.id + ": richtige Antwort verrät sich nicht über die Länge (" + right + " gegen " + longestWrong + ")");
}

// Rechenmodell in ganzen Cent
assert.deepEqual(m.ITEMS.map(i => m.lineTotal(i.id)), [192000, 45000, 9000, 12000, 0, 27000]);
assert(Number.isNaN(m.lineTotal("unbekannt")));
assert.equal(m.positionsSum(), 285000);
assert.equal(m.positionsSum(), m.WORKPLACES * 95000 , "Kontrolle: 3 x 950 Euro");
assert.equal(m.percent(285000, 7), 19950);
assert.equal(m.percent(304950, 5), 15248, "152,475 wird kaufmännisch aufgerundet");
assert.equal(m.percent(304949, 5), 15247, "152,445 wird abgerundet");
assert.equal(m.percent(0, 7), 0);
const c = m.calc();
assert.deepEqual(c, { positions: 285000, hk: 19950, selbstkosten: 304950, gewinn: 15248, netto: 320198 });
assert(c.netto <= m.WORKPLACES * m.BUDGET_PER_WORKPLACE, "Beispielbudget eingehalten");
assert.equal(m.percent(285000, 12) + 285000, 319200, "12 % Summenzuschlag ergibt einen anderen Betrag");
assert.equal(m.fmt(285000), "2.850,00");
assert.equal(m.fmt(19950), "199,50");
assert.equal(m.fmt(15248), "152,48");
assert.equal(m.fmt(320198), "3.201,98");
assert.equal(m.fmt(5), "0,05");

// Lösungen entsprechen der Rechnung
const label = (q, id) => m.QUESTIONS.find(x => x.id === q).options.find(o => o.id === id).label;
assert(label("q1", "n2850").startsWith(m.fmt(c.positions)));
assert(label("q2", "z19950").startsWith(m.fmt(c.hk)));
assert(label("q3", "g15248").startsWith(m.fmt(c.gewinn)));
assert(label("q4", "e320198").startsWith(m.fmt(c.netto)));
assert(label("q4", "e319200").startsWith("3.192,00"));
assert(label("q1", "n950").startsWith(m.fmt(95000)));

const all = { q1: "n2850", q2: "z19950", q3: "g15248", q4: "e320198", q5: "pruefen" };
const none = m.evaluate({});
assert.equal(none.empty, 5); assert.equal(none.allCorrect, false);
assert(none.results.every(r => r.status === "empty" && r.feedback === ""));
const ok = m.evaluate(all);
assert.equal(ok.correct, 5); assert.equal(ok.allCorrect, true);
const partial = m.evaluate({ ...all, q3: "g15247", q5: undefined });
assert.equal(partial.correct, 3); assert.equal(partial.wrong, 1); assert.equal(partial.empty, 1);
assert.equal(partial.results[2].status, "wrong");
assert(partial.results[2].feedback.length > 20);
assert.equal(m.evaluate({ q1: "unbekannt" }).results[0].status, "empty");
assert.equal(m.evaluate({ ...all, q4: "e304950" }).allCorrect, false, "geänderte Antwort invalidiert");
assert.equal(m.evaluate(all).allCorrect, true);
assert.equal(m.progress({ checked: false, finish: false }), 0);
assert.equal(m.progress({ checked: true, finish: true, answers: all }), 100);
assert.equal(m.progress({ checked: false, finish: true, answers: all }), 17);

const h = fs.readFileSync(path.join(root, "module/lf2-angebot.html"), "utf8");
for (const t of ['data-page="lf2-angebot"', "Nordlicht IT-Service", "Praxis am Park", "Küstenblick Bürotechnik", "erfunden", "Übungsdaten", "fiktiv", "keine Rechtsberatung", "netto", "Handlungskostenzuschlag", "Gewinnzuschlag", "Selbstkosten", "role=\"img\"", "Textalternative", "glossar.html", "aria-live", "lf2-kriterien.html", "lf2-angebote.html", "js/lf2-angebot.js", "js/navigation.js", "js/anzeige-glossar.js", "Das nimmst du mit", "Rechtliche Fragen"])
  assert(h.includes(t), "missing: " + t);
for (const t of ["2.850,00 × 7 ÷ 100 = 199,50", "3.049,50 × 5 ÷ 100 = 152,475", "<strong>3.201,98</strong>", "3.600 Euro", "3.192,00 Euro"])
  assert(h.includes(t), "Rechenweg im HTML: " + t);
for (const it of m.ITEMS) {
  assert(h.includes(m.fmt(it.qty * it.unit)), "Gesamtpreis im HTML: " + it.id);
  assert(h.includes(it.qty + " × " + m.fmt(it.unit)), "Rechnung im HTML: " + it.id);
}
assert(!/\schecked[\s>=]/.test(h), "keine vorausgewählte Antwort im HTML");
assert(!/https?:\/\/(?!www\.w3)/.test(h.replace(/<link[^>]*>/g, "")), "keine externen Verweise");
const ids = [...h.matchAll(/ id="([^"]+)"/g)].map(x => x[1]);
assert.equal(new Set(ids).size, ids.length, "HTML-IDs eindeutig");
for (const st of m.STEPS) assert(h.includes('id="' + st + '"') && h.includes('data-step="' + st + '"'), "Schritt: " + st);

const js = fs.readFileSync(path.join(root, "js/lf2-angebot.js"), "utf8");
assert(js.includes("s.answers[q.id] = o.id; s.checked = false; clearFeedback();"), "Antwortänderung entfernt veraltetes Ergebnis");
assert(js.includes("function reset()") && js.includes('$("done").textContent = ""'), "Reset räumt Ergebnis und Abschlusstext");

const catalog = fs.readFileSync(path.join(root, "js/module-daten.js"), "utf8");
assert(catalog.includes('page: "lf2-angebot", status: "verfuegbar", datei: "module/lf2-angebot.html"'));
assert.equal((catalog.match(/id: "lf2-angebot"/g) || []).length, 1, "stabile ID genau einmal");
assert.equal((catalog.match(/id: "lf2-auswertung"[^}]*status: "verfuegbar"/g) || []).length, 1, "LF2.12 ist umgesetzt");

const fp = fs.readFileSync(path.join(root, "js/fortschritt.js"), "utf8");
assert(fp.includes('"lf2-angebot": "it-ausbildung.lf2-angebot.v1"'));
assert(fp.includes('id === "lf2-angebot"'));
for (const v of Object.values(all).filter(v => v !== "pruefen").concat(["pruefen"])) assert(fp.includes('"' + v + '"'), "Fortschrittsprüfung nutzt Antwort-ID " + v);

const names = global.GLOSSAR.map(x => x.begriff);
assert.equal(new Set(names).size, names.length, "Glossar eindeutig");
for (const b of ["Position", "Nettopreis", "Zuschlag", "Handlungskostenzuschlag", "Selbstkosten", "Gewinnzuschlag", "Kaufmännische Rundung"]) {
  const e = global.GLOSSAR.find(x => x.begriff === b);
  assert(e, "Glossar: " + b);
  assert(h.includes("<summary>" + b + "</summary><p>" + e.erklaerung.replace(/&/g, "&amp;") + "</p>"), "Hinweis im Modul = Glossartext: " + b);
}
console.log("lf2-angebot.test.js: PASS — Rechenmodell, Rundung, Seite, Katalog, Fortschritt, Glossar");

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
