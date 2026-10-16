"use strict";
var assert = require("assert");
var fs = require("fs");
var path = require("path");
var L = require("../js/lf5-werte.js");

var RICHTIG = { q1: "text", q2: "zahl", q3: "janein", q4: "nichtrechnen" };
var N = 4;

assert.strictEqual(L.ID, "lf5-werte");
assert.strictEqual(L.KEY, "it-ausbildung.lf5-werte.v1");
assert.strictEqual(L.QUESTIONS.length, N);

var positionen = {};
L.QUESTIONS.forEach(function (q) {
  assert.strictEqual(RICHTIG[q.id], q.correct, "richtige Antwort " + q.id);
  var pos = q.options.findIndex(function (o) { return o.id === q.correct; });
  assert.ok(pos !== -1, "richtige Option vorhanden: " + q.id);
  positionen[pos] = true;
  var richtig = q.options[pos].label.length;
  var laengster = Math.max.apply(null, q.options.filter(function (o) { return o.id !== q.correct; }).map(function (o) { return o.label.length; }));
  assert.ok(richtig < laengster, "richtige Antwort ist nicht die längste: " + q.id);
  q.options.forEach(function (o) {
    assert.ok(o.feedback.length >= 40, "Feedback lang genug: " + q.id + "/" + o.id);
  });
});
assert.ok(Object.keys(positionen).length >= 3, "Position der richtigen Antwort wechselt");

var leer = L.evaluate({});
assert.strictEqual(leer.empty, N);
assert.strictEqual(leer.correct, 0);
assert.strictEqual(L.evaluate().empty, N);

var alle = L.evaluate(RICHTIG);
assert.strictEqual(alle.allCorrect, true);
assert.strictEqual(alle.correct, N);

var ev = L.evaluate(Object.assign({}, RICHTIG, { q2: "name" }));
assert.strictEqual(ev.wrong, 1);
assert.strictEqual(ev.correct, N - 1);
assert.strictEqual(ev.allCorrect, false);

assert.ok(L.progressText({}).indexOf("Fortschritt: 0 von 5 Schritten") === 0);
assert.strictEqual(L.progress({}), 0);
assert.strictEqual(L.barWidth({}), 0);
assert.strictEqual(L.progress({ answers: RICHTIG, checked: true, finish: true }), 5);
assert.strictEqual(L.barWidth({ answers: RICHTIG, checked: true, finish: true }), 100);
assert.strictEqual(L.barWidth({ finish: true }), 20);
var voll = L.progressText({ answers: RICHTIG, checked: true, finish: true });
assert.ok(voll.indexOf("5 von 5") !== -1, voll);
assert.ok(voll.indexOf("Abschluss geöffnet") !== -1, voll);

var html = fs.readFileSync(path.join(__dirname, "..", "module", "lf5-werte.html"), "utf8");
assert.ok(html.indexOf("Fortschritt: 0 von 5 Schritten · Abschluss noch nicht geöffnet") !== -1);
assert.ok(html.indexOf("Fortschritt: 0 %") === -1);
assert.ok(html.indexOf('data-page="lf5-werte"') !== -1);
assert.ok(html.indexOf("Einfache Werte lesen") !== -1);
assert.ok(html.indexOf("../js/lf5-werte.js") !== -1);

console.log("lf5-werte: alle Prüfungen bestanden");
