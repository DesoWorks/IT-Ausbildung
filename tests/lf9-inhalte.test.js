"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const ids = ["lf9-anforderung","lf9-ist","lf9-dienste","lf9-infrastruktur","lf9-eignung","lf9-standard","lf9-schutz","lf9-zukunft"];
const expected = [
  ["trennung","zehn","nein","an"],
  ["ohne","luecke","adresse","soll"],
  ["gast","getrennt","geraet","datei"],
  ["keinweg","annahme","papier","live"],
  ["grenze","offen","nur","grund"],
  ["regel","kasse","weg","mess"],
  ["erheben","liste","sichtbar","nicht"],
  ["drei","sichtbar","extra","frei"]
];
function read(relative) { return fs.readFileSync(path.join(root, relative), "utf8"); }
function checkPage(id, title) {
  const html = read("module/" + id + ".html");
  assert.ok(html.includes("<title>" + title + "</title>"), id + " title");
  assert.ok(html.includes("<h1>" + title + "</h1>"), id + " h1");
  assert.ok(html.includes('data-page="' + id + '"'));
  for (const favicon of ["favicon.svg", "favicon-32.png", "favicon.ico"]) assert.ok(html.includes("../assets/desoworks/" + favicon));
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
    assert.equal(q.correct, expected[lessonIndex][i], "Lösungsschlüssel " + id);
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
  assert.ok(html.indexOf('src="../js/lf9-lektion.js"') < html.indexOf('src="../js/' + id + '.js"'));
  const browser = { console }; browser.window = browser;
  vm.runInNewContext(read("js/lf9-lektion.js"), browser);
  vm.runInNewContext(read("js/" + id + ".js"), browser);
  assert.equal(browser.LF9_INHALTE[id].QUESTIONS.length, 4, "Browser-Modus ohne CommonJS");
});
const K = require(path.join(root, "js/lf9-kontrolle.js"));
assert.equal(K.ID, "lf9-kontrolle");
assert.equal(K.KEY, "it-ausbildung.lf9-kontrolle.v1");
assert.equal(K.FRAGEN.length, 24);
const answers = {}, counts = {};
K.FRAGEN.forEach((q, i) => {
  assert.ok(ids.includes(q.quelle), q.quelle);
  counts[q.quelle] = (counts[q.quelle] || 0) + 1;
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
const controlHtml = checkPage(K.ID, "LF9 Lernzielkontrolle");
assert.ok(controlHtml.includes(".quiz-option{display:flex"));
assert.ok(controlHtml.includes("<footer"));
assert.ok(controlHtml.includes("LF9 Lernzielkontrolle"));
const allSource = ids.concat("lf9-kontrolle", "lf9-lektion").map(id => read("js/" + id + ".js")).join("\n");
assert.ok(!/fetch\s*\(|XMLHttpRequest|WebSocket/i.test(allSource), "kein Netzwerkzugriff");
assert.ok(!/FiSi-Jahr1/.test(allSource), "Passwort nicht im Klartext");
assert.match(read("docs/plan-lf9.md"), /nichts installiert/);
const lf9Text = ids.concat("lf9-kontrolle").map(id => read("js/" + id + ".js")).join("\n");
assert.ok(/mindestens zehn/i.test(lf9Text) && !/höchstens zehn/i.test(lf9Text), "F7: Mindestkapazität statt harter Obergrenze");
assert.ok(/RFC 2131/.test(lf9Text), "F4: konkrete Spezifikation genannt");
assert.ok(!/keine Personendaten erhoben/.test(lf9Text), "F3: keine pauschale Kein-Personenbezug-Aussage");
console.log("LF9 Inhalte: 8 Lektionen, 32 Übungsfragen, 24 Kontrollfragen, Schlüssel, Auswertung und Seiten bestanden.");
