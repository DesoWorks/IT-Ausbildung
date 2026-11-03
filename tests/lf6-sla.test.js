"use strict";
var assert = require("assert");
var fs = require("fs");
var path = require("path");
var L = require("../js/lf6-sla.js");
var RICHTIG = { q1: "reaktion", q2: "aufnahme", q3: "vorort", q4: "klaeren" };
var N = 4;

assert.strictEqual(L.ID, "lf6-sla");
assert.strictEqual(L.KEY, "it-ausbildung.lf6-sla.v1");
assert.strictEqual(globalThis.LF6_SLA, L);
assert.deepStrictEqual(L.STEPS, ["start", "case", "exercise", "finish"]);
assert.strictEqual(L.QUESTIONS.length, N);
assert.strictEqual(new Set(L.QUESTIONS.map(function (q) { return q.id; })).size, N);
var positionen = [];
L.QUESTIONS.forEach(function (q) {
  assert.strictEqual(RICHTIG[q.id], q.correct, "richtige Antwort " + q.id);
  assert.ok(q.prompt.length > 0);
  assert.strictEqual(q.options.length, 3);
  assert.strictEqual(new Set(q.options.map(function (o) { return o.id; })).size, 3);
  var pos = q.options.findIndex(function (o) { return o.id === q.correct; });
  assert.ok(pos >= 0);
  positionen.push(pos);
  assert.ok(q.options[pos].label.length < Math.max.apply(null, q.options.map(function (o) { return o.label.length; })), "richtige Antwort nie die längste: " + q.id);
  q.options.forEach(function (o) {
    assert.ok(o.feedback.length >= 40, "Feedback mindestens 40 Zeichen: " + q.id + "/" + o.id);
    var answers = {};
    answers[q.id] = o.id;
    var result = L.evaluate(answers).results.find(function (r) { return r.id === q.id; });
    assert.strictEqual(result.status, o.id === q.correct ? "correct" : "wrong");
    assert.strictEqual(result.optionId, o.id);
    assert.strictEqual(result.feedback, o.feedback);
  });
});
assert.strictEqual(new Set(positionen).size, 3);
positionen.forEach(function (pos, index) {
  if (index) assert.notStrictEqual(pos, positionen[index - 1], "richtige Position wechselt");
});
[undefined, null, {}, { q1: "unbekannt" }].forEach(function (answers) {
  var ev = L.evaluate(answers);
  assert.strictEqual(ev.empty, N);
  assert.strictEqual(ev.correct, 0);
  assert.strictEqual(ev.wrong, 0);
  assert.strictEqual(ev.allCorrect, false);
});
assert.strictEqual(L.evaluate(RICHTIG).allCorrect, true);
assert.strictEqual(L.evaluate(RICHTIG).correct, N);
var gemischt = L.evaluate(Object.assign({}, RICHTIG, { q2: "ersatz" }));
assert.strictEqual(gemischt.correct, 3);
assert.strictEqual(gemischt.wrong, 1);
assert.strictEqual(gemischt.empty, 0);
assert.strictEqual(gemischt.allCorrect, false);
assert.strictEqual(L.evaluate({ q1: "reparatur", q2: "reparieren", q3: "erfassen", q4: "erfinden" }).wrong, N);
assert.strictEqual(L.progress(), 0);
assert.strictEqual(L.barWidth(), 0);
assert.strictEqual(L.progress({ answers: RICHTIG, checked: false }), 0);
assert.strictEqual(L.progress({ answers: RICHTIG, checked: true }), 4);
assert.strictEqual(L.progress({ answers: RICHTIG, checked: true, finish: true }), 5);
assert.strictEqual(L.barWidth({ answers: RICHTIG, checked: true, finish: true }), 100);
assert.strictEqual(L.barWidth({ finish: true }), 20);
assert.strictEqual(L.progress({ answers: { q1: "reaktion", q2: "ersatz" }, checked: true }), 1);
assert.strictEqual(L.progressText({}), "Fortschritt: 0 von 5 Schritten · Abschluss noch nicht geöffnet");
assert.strictEqual(L.progressText({ answers: RICHTIG, checked: true, finish: true }), "Fortschritt: 5 von 5 Schritten · Abschluss geöffnet");

// Drei Antworten oder unbeantwortet je Frage: 4 hoch 4 Kombinationen.
var kombinationen = 0;
function pruefeKombination(index, answers, correct, wrong, empty) {
  if (index === N) {
    var result = L.evaluate(answers);
    assert.strictEqual(result.correct, correct);
    assert.strictEqual(result.wrong, wrong);
    assert.strictEqual(result.empty, empty);
    assert.strictEqual(result.allCorrect, correct === N);
    assert.strictEqual(L.progress({ answers: answers, checked: true }), correct);
    assert.strictEqual(L.progress({ answers: answers, checked: true, finish: true }), correct + 1);
    kombinationen += 1;
    return;
  }
  var q = L.QUESTIONS[index];
  [null].concat(q.options).forEach(function (o) {
    var next = Object.assign({}, answers);
    if (o) next[q.id] = o.id;
    pruefeKombination(index + 1, next, correct + (o && o.id === q.correct ? 1 : 0), wrong + (o && o.id !== q.correct ? 1 : 0), empty + (!o ? 1 : 0));
  });
}
pruefeKombination(0, {}, 0, 0, 0);
assert.strictEqual(kombinationen, 256);

var html = fs.readFileSync(path.join(__dirname, "..", "module", "lf6-sla.html"), "utf8");
var js = fs.readFileSync(path.join(__dirname, "..", "js", "lf6-sla.js"), "utf8");
var titel = "Die vertragliche Grundlage prüfen";
assert.ok(html.includes("<title>" + titel + "</title>"));
assert.ok(html.includes("<h1>" + titel + "</h1>"));
assert.ok(html.includes('data-page="lf6-sla"'));
assert.ok(html.includes('src="../js/lf6-sla.js"'));
assert.ok(html.includes("Fortschritt: 0 von 5 Schritten · Abschluss noch nicht geöffnet"));
assert.ok(!html.includes("Fortschritt: 0 %"));
assert.ok(/<footer[^>]*>.*Lernfeld 6 · Serviceanfragen bearbeiten/.test(html));
["Nordlicht IT-Service", "Samira", "kein echter Vertrag", "keine echten Kundendaten", "kein Passwort", "kein produktives System", "Angriff", "Seite 17", "40 Stunden", "2. Ausbildungsjahr", "Service-Level-Agreement", "zwei Servicestunden", "Montag 12 Uhr", "erste qualifizierte Rückmeldung", "nicht die fertige Reparatur", "Vor-Ort-Reparaturen", "Gerätekauf und Austausch", "Serviceleitung", "nicht heimlich"].forEach(function (text) {
  assert.ok(html.includes(text), "Kontext vorhanden: " + text);
});
L.STEPS.concat(["main", "bar", "pct", "questions", "check", "reset", "reset-all", "result", "done"]).forEach(function (id) {
  assert.strictEqual(html.split('id="' + id + '"').length - 1, 1, "DOM-Ziel genau einmal: " + id);
});
L.STEPS.forEach(function (step) {
  assert.ok(html.includes('data-step="' + step + '"'), "Navigation vorhanden: " + step);
});
Array.from(html.matchAll(/(?:src|href)="([^"#]+)"/g)).forEach(function (match) {
  assert.ok(fs.existsSync(path.resolve(__dirname, "..", "module", match[1])), "lokaler Verweis existiert: " + match[1]);
});
assert.ok(!/lf5|LF5|Datenbank|Übungskarte/.test(html + js), "keine fremden Vorlageninhalte");
assert.ok(js.includes("lf6SlaStep"));
assert.ok(!/lf6-(?:anfrage|fragen|status)/.test(html + js), "keine Verknüpfung zu parallelen Lektionen");
assert.deepStrictEqual(Array.from(html.matchAll(/href="([^"#]+\.html)"/g)).map(function (match) { return match[1]; }), ["../index.html", "../index.html"], "nur Links zur Übersicht");
console.log("lf6-sla: alle Prüfungen bestanden (vier Fragen, 256 Antwortkombinationen, Fortschritt und HTML-Verknüpfung)");
