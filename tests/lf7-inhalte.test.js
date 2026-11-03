"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const ids = ["system", "schnittstelle", "fluesse", "auswahl", "unterlage", "zusammenfuehren", "pruefung", "sicherheit"].map(x => "lf7-" + x);
const expected = [
  ["sensor", "steuerung", "leuchte", "ziel"],
  ["kontext", "uebergang", "format", "alt"],
  ["energie", "information", "kein", "trennen"],
  ["passung", "aufloesung", "kompatibel", "liste"],
  ["genauigkeit", "ja", "schritte", "offen"],
  ["sensor", "steuerung", "stoerung", "funktionsplan"],
  ["abweichung", "ein", "zehn", "protokoll"],
  ["versorgung", "integritaet", "sicher", "noetig"]
];
function read(relative) { return fs.readFileSync(path.join(root, relative), "utf8"); }
function checkPage(id, title) {
  const html = read("module/" + id + ".html");
  assert.ok(html.includes('<title>' + title + '</title>'));
  assert.ok(html.includes('<h1>' + title + '</h1>'));
  assert.ok(html.includes('data-page="' + id + '"'));
  for (const favicon of ["favicon.svg", "favicon-32.png", "favicon.ico"]) assert.ok(html.includes('../assets/desoworks/' + favicon));
  assert.ok(!html.includes("Zusammenfassung und Übungsaufgabe"));
  for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    assert.ok(fs.existsSync(path.resolve(root, "module", match[1])), id + " Ziel existiert: " + match[1]);
  }
  assert.ok(html.includes("[hidden]{display:none!important}"));
  return html;
}
ids.forEach((id, lessonIndex) => {
  const L = require(path.join(root, "js", id + ".js"));
  assert.equal(L.ID, id);
  assert.equal(L.KEY, "it-ausbildung." + id + ".v1");
  assert.equal(L.QUESTIONS.length, 4);
  const correct = {}, wrong = {}, positions = [];
  L.QUESTIONS.forEach((q, i) => {
    assert.equal(q.id, "q" + (i + 1));
    assert.equal(q.correct, expected[lessonIndex][i], "eigenständiger Lösungsschlüssel " + id);
    assert.equal(q.options.length, 3);
    assert.equal(new Set(q.options.map(o => o.id)).size, 3);
    const pos = q.options.findIndex(o => o.id === q.correct); positions.push(pos);
    assert.ok(pos >= 0);
    assert.ok(q.options[pos].label.length < Math.max(...q.options.filter(o => o.id !== q.correct).map(o => o.label.length)), "richtig ist nicht längste Antwort " + id + q.id);
    if (i) assert.notEqual(positions[i], positions[i - 1], "richtige Position wechselt " + id);
    q.options.forEach(o => assert.ok(o.feedback.length >= 40, "Feedback " + id + q.id));
    correct[q.id] = q.correct;
    wrong[q.id] = q.options.find(o => o.id !== q.correct).id;
  });
  assert.equal(new Set(positions).size, 3);
  assert.equal(L.evaluate().empty, 4);
  assert.equal(L.evaluate(wrong).wrong, 4);
  assert.equal(L.evaluate(correct).allCorrect, true);
  assert.equal(L.evaluate({ q1: "unbekannt" }).empty, 4);
  const mixed = { ...correct, q2: wrong.q2 }; delete mixed.q4;
  assert.equal(L.evaluate(mixed).correct, 2);
  assert.equal(L.evaluate(mixed).wrong, 1);
  assert.equal(L.evaluate(mixed).empty, 1);
  assert.equal(L.progress({}), 0);
  assert.equal(L.barWidth({ finish: true }), 20);
  assert.equal(L.barWidth({ answers: correct, checked: true, finish: true }), 100);
  assert.equal(L.barWidth({ answers: correct, checked: false, finish: true }), 20);
  assert.match(L.progressText({}), /0 von 5 Schritten · Abschluss noch nicht geöffnet/);
  assert.deepEqual(L.normalize(null), { answers: {}, checked: false, finish: false, step: "start" });
  assert.deepEqual(L.normalize({ answers: { q1: "unbekannt" }, step: "kaputt", checked: "ja" }), L.normalize());
  assert.deepEqual(L.normalize({ answers: correct, finish: true, checked: true, step: "exercise" }).answers, correct);
  const html = checkPage(id, L.CONFIG.title);
  assert.ok(html.includes(".opts{display:grid;grid-template-columns:1fr"), "Antworten untereinander");
  assert.ok(html.indexOf('src="../js/lf7-lektion.js"') < html.indexOf('src="../js/' + id + '.js"'));
  const browser = { console }; browser.window = browser;
  vm.runInNewContext(read("js/lf7-lektion.js"), browser);
  vm.runInNewContext(read("js/" + id + ".js"), browser);
  assert.equal(browser.LF7_INHALTE[id].QUESTIONS.length, 4, "Browser-Modus ohne CommonJS");
});
const K = require(path.join(root, "js/lf7-kontrolle.js"));
assert.equal(K.KEY, "it-ausbildung.lf7-kontrolle.v1");
assert.equal(K.FRAGEN.length, 24);
const answers = {}, counts = {};
K.FRAGEN.forEach((q, i) => {
  assert.ok(ids.includes(q.quelle)); counts[q.quelle] = (counts[q.quelle] || 0) + 1;
  assert.equal(q.richtig, ["a", "b", "c"][i % 3]);
  const pos = q.richtig.charCodeAt(0) - 97;
  assert.ok(q.optionen[pos].length < Math.max(...q.optionen.filter((_, j) => j !== pos).map(o => o.length)), "Kontrolle richtige Antwort nicht längste " + i);
  assert.ok(q.hinweis.length >= 40);
  answers[i] = q.richtig;
});
ids.forEach(id => assert.equal(counts[id], 3, "drei Fragen je Lektion"));
assert.equal(K.evaluate().empty, 24);
assert.equal(K.evaluate(answers).allCorrect, true);
assert.equal(K.evaluate({ ...answers, 0: "b" }).wrong, 1);
assert.equal(K.evaluate({ 0: "ungueltig" }).empty, 24);
assert.equal(K.normalize({ finish: "ja" }).finish, false);
const controlHtml = checkPage(K.ID, "LF7 Lernzielkontrolle");
assert.ok(controlHtml.includes(".quiz-option{display:flex"));
const allSource = ids.concat("lf7-kontrolle", "lf7-lektion").map(id => read("js/" + id + ".js")).join("\n");
assert.ok(!/fetch\s*\(|XMLHttpRequest|WebSocket/i.test(allSource), "kein Netzwerkzugriff");
assert.ok(!/FiSi-Jahr1/.test(allSource), "Passwort nicht im Klartext");
assert.ok(!/GPIO|Firmware-Flash|Netzscan|SQL|Exploit/i.test(allSource), "keine ausgeschlossenen Übungsinhalte");
const insertion = read("docs/lf7-katalog-einschub.md");
const catalogCode = insertion.match(/```javascript\n([\s\S]*?)\n```/);
assert.ok(catalogCode, "Katalogobjekt vorhanden");
const catalog = vm.runInNewContext("(" + catalogCode[1] + ")");
assert.equal(catalog.id, "lf7");
assert.equal(catalog.status, "verfuegbar", "Feld nach Prüfung freigeschaltet");
assert.equal(catalog.unterthemen.length, 9);
catalog.unterthemen.forEach((entry, index) => {
  assert.equal(entry.id, ids.concat("lf7-kontrolle")[index]);
  assert.equal(entry.page, entry.id);
  assert.equal(entry.status, "verfuegbar");
  assert.equal(entry.datei, "module/" + entry.id + ".html");
  assert.equal(entry.typ, index === 8 ? "lernzielkontrolle" : "lektion");
  assert.ok(read(entry.datei).includes("<h1>" + entry.titel + "</h1>"));
  assert.ok(insertion.includes("it-ausbildung." + entry.id + ".v1"));
});
assert.match(read("docs/plan-lf7.md"), /keine echte Inbetriebnahme/);
console.log("LF7 Inhalte: 8 Lektionen, 32 Übungsfragen, 24 Kontrollfragen, Schlüssel, Auswertung und Seiten bestanden.");