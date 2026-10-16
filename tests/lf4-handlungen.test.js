"use strict";
var assert = require("assert");
var fs = require("fs");
var path = require("path");
var L = require("../js/lf4-handlungen.js");

var RICHTIG = { q1: "sperren", q2: "liegenlassen", q3: "fragen", q4: "nichttesten" };

assert.strictEqual(L.ID, "lf4-handlungen");
assert.strictEqual(L.KEY, "it-ausbildung.lf4-handlungen.v1");
assert.strictEqual(L.QUESTIONS.length, 4);

var positionen = {};
L.QUESTIONS.forEach(function (q) {
  assert.strictEqual(RICHTIG[q.id], q.correct, "richtige Antwort " + q.id);
  var richtig = q.options.find(function (o) { return o.id === q.correct; });
  positionen[q.options.indexOf(richtig)] = true;
  q.options.forEach(function (o) {
    assert.ok(o.feedback.length >= 40, "Feedback lang genug: " + q.id + "/" + o.id);
    if (o !== richtig) assert.ok(richtig.label.length < o.label.length, "richtige Antwort ist nicht die längste: " + q.id);
  });
});
assert.ok(Object.keys(positionen).length > 1, "richtige Position wechselt");

var leer = L.evaluate({});
assert.strictEqual(leer.empty, 4);
assert.strictEqual(leer.correct, 0);

var alle = L.evaluate(RICHTIG);
assert.strictEqual(alle.allCorrect, true);
assert.strictEqual(alle.correct, 4);

var eine = L.evaluate({ q1: "offen", q2: "liegenlassen", q3: "fragen", q4: "nichttesten" });
assert.strictEqual(eine.wrong, 1);
assert.strictEqual(eine.correct, 3);
assert.strictEqual(eine.allCorrect, false);

assert.ok(L.progressText({}).indexOf("Fortschritt: 0 von 5 Schritten") === 0);
var voll = L.progressText({ answers: RICHTIG, checked: true, finish: true });
assert.ok(voll.indexOf("5 von 5") !== -1, voll);
assert.ok(voll.indexOf("Abschluss geöffnet") !== -1, voll);

var html = fs.readFileSync(path.join(__dirname, "..", "module", "lf4-handlungen.html"), "utf8");
assert.ok(html.indexOf("Fortschritt: 0 von 5 Schritten · Abschluss noch nicht geöffnet") !== -1);
assert.ok(html.indexOf("Fortschritt: 0 %") === -1);
assert.ok(html.indexOf('data-page="lf4-handlungen"') !== -1);
assert.ok(html.indexOf("../js/lf4-handlungen.js") !== -1);
assert.ok(html.indexOf("Sichere und unsichere Handlungen unterscheiden") !== -1);

console.log("lf4-handlungen: alle Prüfungen bestanden");
