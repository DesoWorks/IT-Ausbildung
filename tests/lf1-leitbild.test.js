"use strict";
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
global.window = global;
require(path.join(root, "js/glossar-daten.js"));
const lesson = require(path.join(root, "js/lf1-leitbild.js"));
const html = fs.readFileSync(path.join(root, "module/lf1-leitbild.html"), "utf8");
const src = fs.readFileSync(path.join(root, "js/lf1-leitbild.js"), "utf8");

// Struktur und Identität
assert.equal(lesson.ID, "lf1-leitbild-ziele");
assert.equal(lesson.KEY, "it-ausbildung.lf1-leitbild-ziele.v1");
assert.equal(lesson.STEPS.join(","), "start,erklaerung,beispiel,uebung,abschluss");
lesson.STEPS.forEach(s => assert(html.includes('id="' + s + '"'), "Abschnitt fehlt: " + s));
assert.notEqual(lesson.KEY, "it-ausbildung.lf1-betrieb-aufgaben.v1", "eigene Fortschritts-ID");

// Fragenmodell
assert.equal(lesson.QUESTIONS.length, 5);
const positions = [];
lesson.QUESTIONS.forEach(q => {
  const ids = q.options.map(o => o.id);
  assert.equal(new Set(ids).size, ids.length, "Antwort-IDs eindeutig in " + q.id);
  assert.equal(q.options.filter(o => o.id === q.correct).length, 1, "genau eine richtige Antwort in " + q.id);
  q.options.forEach(o => { assert(o.id.startsWith(q.id + "-")); assert(o.feedback.length > 40, "Feedback je Antwort"); });
  positions.push(ids.indexOf(q.correct));
});
assert(new Set(positions).size >= 3, "richtige Antwort steht auf mindestens drei verschiedenen Positionen: " + positions);
assert(positions.some(p => p !== 0) && !positions.every(p => p === positions[0]), "kein festes Muster");

// Auswertung über IDs
const right = { q1: "q1-orientierung", q2: "q2-oekologisch", q3: "q3-sozial", q4: "q4-oekonomisch", q5: "q5-abwaegen" };
assert.deepEqual(lesson.QUESTIONS.map(q => q.correct), Object.values(right));
let ev = lesson.evaluate(right);
assert(ev.allCorrect && ev.correct === 5 && ev.wrong === 0 && ev.empty === 0);
ev = lesson.evaluate({});
assert.equal(ev.empty, 5); assert(!ev.allCorrect);
ev = lesson.evaluate({ q1: "q1-vertrag", q2: "q2-oekologisch" });
assert.equal(ev.results[0].status, "wrong"); assert.equal(ev.results[1].status, "correct"); assert.equal(ev.results[2].status, "empty");
assert(ev.results[0].feedback.length > 0);
assert.equal(lesson.evaluate({ q1: "team" }).results[0].status, "empty", "unbekannte ID zählt nicht");
assert.equal(lesson.evaluate({ q1: 1 }).results[0].status, "empty", "Position ist keine gültige Antwort");

// Fortschritt, veraltete Ergebnisse
assert.equal(lesson.progress({ answers: {}, checked: false, finish: false }), 0);
assert.equal(lesson.progress({ answers: right, checked: false, finish: true }), 17, "ungeprüfte Antworten zählen nicht");
assert.equal(lesson.progress({ answers: right, checked: true, finish: true }), 100);
assert.equal(lesson.progress({ answers: { q1: "q1-vertrag" }, checked: true, finish: false }), 0);
assert(lesson.isComplete({ answers: right, checked: true, finish: true }));
assert(!lesson.isComplete({ answers: right, checked: false, finish: true }));
assert(!lesson.isComplete({ answers: right, checked: true, finish: false }));
assert(!lesson.isComplete({ answers: Object.assign({}, right, { q5: "q5-teuer" }), checked: true, finish: true }));

// Gemeinsame Abschlussableitung
global.localStorage = { getItem: k => k === lesson.KEY ? JSON.stringify({ answers: right, checked: true, finish: true }) : null };
delete require.cache[require.resolve(path.join(root, "js/fortschritt.js"))];
require(path.join(root, "js/fortschritt.js"));
assert.equal(global.LERNFORTSCHRITT.abgeschlossen("lf1-leitbild-ziele"), true);
global.localStorage = { getItem: () => JSON.stringify({ answers: right, checked: false, finish: true }) };
assert.equal(global.LERNFORTSCHRITT.abgeschlossen("lf1-leitbild-ziele"), false, "veraltetes Ergebnis");
global.localStorage = { getItem: () => JSON.stringify({ answers: Object.assign({}, right, { q2: "q2-sozial" }), checked: true, finish: true }) };
assert.equal(global.LERNFORTSCHRITT.abgeschlossen("lf1-leitbild-ziele"), false, "falsche Antwort");

// Verhalten im Quelltext: keine Vorauswahl, Invalidierung, Reset, Reload
assert.match(src, /input\.type = "radio"/);
assert.match(src, /input\.checked = false/);
const build = src.slice(src.indexOf("function buildQuestions"), src.indexOf("function restoreSelection"));
assert(build.length > 100 && !/checked\s*=\s*true/.test(build), "keine Vorauswahl beim Aufbau der Fragen");
const restore = src.slice(src.indexOf("function restoreSelection"), src.indexOf("function selected"));
assert(/checked = true/.test(restore), "gespeicherte Auswahl wird nur bei Reload wiederhergestellt");
assert.equal((src.match(/input\.checked\s*=\s*true/g) || []).length, 1, "input.checked = true nur in restoreSelection");
assert(!/<input[^>]*\bchecked\b/.test(html), "keine vorausgewählten Antworten im HTML");
assert.match(src, /state\.checked = false;\s*hideResult\(\)/, "Änderung invalidiert Auswertung");
assert.match(src, /function reset\(\)[\s\S]*?checked: false[\s\S]*?i\.checked = false/, "Reset leert Auswahl");
assert.match(src, /restoreSelection\(\);\s*if \(state\.checked\) renderResult\(\)/, "Reload stellt Auswahl wieder her");

// Markup, Barrierefreiheit, Anzeige, Navigation, Offline
assert.match(html, /\.rollen-optionen \{[^}]*grid-template-columns:minmax\(0,1fr\)/);
assert.match(html, /\.rollen-option:focus-within/);
assert.match(src, /createElement\("fieldset"\)/); assert.match(src, /createElement\("legend"\)/);
assert(html.includes('data-page="lf1-leitbild"'));
["module-daten", "fortschritt", "navigation", "glossar-daten", "anzeige-glossar", "version", "lf1-leitbild"].forEach(s =>
  assert(html.includes('../js/' + s + '.js'), "Skript fehlt: " + s));
assert(html.includes("../assets/desoworks/logo-orbital-werkstatt.svg") && html.includes("data-version"));
assert(!/https?:\/\/(?!www\.w3)/.test(html.replace(/<a [^>]*>/g, "")), "keine externen Abhängigkeiten");
assert(!html.includes('type="text"') && !html.includes('type="email"'), "keine Eingabe persönlicher Daten");
assert(/frei erfunden/i.test(html) && /keine Rechtsberatung/i.test(html) && /kein verbindlicher betrieblicher Ausbildungsplan/i.test(html));
assert(html.includes("Lernziele") && html.includes("Vorkenntnisse") && html.includes("Das nimmst du mit") && html.includes("Übung wiederholen"));

// Glossar und Katalog
lesson.TERMS.forEach(t => assert(global.GLOSSAR.some(g => g.begriff === t), "Glossarbegriff fehlt: " + t));
assert.equal(new Set(global.GLOSSAR.map(g => g.begriff)).size, global.GLOSSAR.length, "Glossar eindeutig");
const inlineTerms = Array.from(html.matchAll(/data-begriffe="([^"]+)"/g)).flatMap(m => m[1].split("|"));
assert(inlineTerms.length >= 6, "Fachwörter direkt am Inhalt vorhanden");
inlineTerms.forEach(t => assert(global.GLOSSAR.some(g => g.begriff === t), "Begriff am Inhalt fehlt im Glossar: " + t));
require(path.join(root, "js/module-daten.js"));
const lf1 = global.MODULE_DATEN[0].module.find(m => m.id === "lf1");
const entry = lf1.unterthemen.find(u => u.id === "lf1-leitbild-ziele");
assert(entry && entry.page === "lf1-leitbild" && entry.status === "verfuegbar" && entry.datei === "module/lf1-leitbild.html");
assert(fs.existsSync(path.join(root, entry.datei)));
assert(lf1.unterthemen.some(u => u.id === "lf1-betrieb-aufgaben"), "LF1.1 bleibt erhalten");
assert(fs.readFileSync(path.join(root, "js/glossar-seite.js"), "utf8").includes('"lf1-leitbild.html": true'));

console.log("lf1-leitbild.test.js: PASS — Fragenmodell, ID-Auswertung, Positionen, Fortschritt, Invalidierung, Glossar, Katalog, Markup");
