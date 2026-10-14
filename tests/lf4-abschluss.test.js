"use strict";
var assert = require("assert");
var fs = require("fs");
var path = require("path");
var L = require("../js/lf4-abschluss.js");

var RICHTIG = { q1: "hoch", q2: "sperren", q3: "vertraulichkeit", q4: "melden", q5: "eigen", q6: "nachfragen" };
var N = 6;

assert.strictEqual(L.ID, "lf4-abschluss");
assert.strictEqual(L.KEY, "it-ausbildung.lf4-abschluss.v1");
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

var eine = Object.assign({}, RICHTIG, { q1: "niedrig" });
var ev = L.evaluate(eine);
assert.strictEqual(ev.wrong, 1);
assert.strictEqual(ev.correct, N - 1);
assert.strictEqual(ev.allCorrect, false);

assert.ok(L.progressText({}).indexOf("Fortschritt: 0 von 7 Schritten") === 0);
assert.strictEqual(L.progress({}), 0);
assert.strictEqual(L.barWidth({}), 0);
assert.strictEqual(L.progress({ answers: RICHTIG, checked: true, finish: true }), 7);
assert.strictEqual(L.barWidth({ answers: RICHTIG, checked: true, finish: true }), 100);
assert.strictEqual(L.barWidth({ finish: true }), Math.round(1 / 7 * 100));
var voll = L.progressText({ answers: RICHTIG, checked: true, finish: true });
assert.ok(voll.indexOf("7 von 7") !== -1, voll);
assert.ok(voll.indexOf("Abschluss geöffnet") !== -1, voll);

var html = fs.readFileSync(path.join(__dirname, "..", "module", "lf4-abschluss.html"), "utf8");
assert.ok(html.indexOf("Fortschritt: 0 von 7 Schritten · Abschluss noch nicht geöffnet") !== -1);
assert.ok(html.indexOf("Fortschritt: 0 %") === -1);
assert.ok(html.indexOf('data-page="lf4-abschluss"') !== -1);
assert.ok(html.indexOf("Lernfeld 4: Zusammenfassung und Abschlussaufgabe") !== -1);
assert.ok(html.indexOf("../js/lf4-abschluss.js") !== -1);
["lf4-schutzbedarf", "lf4-schutzziele", "lf4-risiken", "lf4-handlungen", "lf4-zugang", "lf4-vorfall"].forEach(function (n) {
  assert.ok(html.indexOf('href="' + n + '.html"') !== -1, "Nachbarlink " + n);
});

console.log("lf4-abschluss: alle Prüfungen bestanden");
