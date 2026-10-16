"use strict";
var assert = require("assert");
var fs = require("fs");
var path = require("path");
var L = require("../js/lf4-schutzbedarf.js");

var RICHTIG = { q1: "hoch", q2: "mittel", q3: "niedrig", q4: "abstimmen" };

assert.strictEqual(L.ID, "lf4-schutzbedarf");
assert.strictEqual(L.KEY, "it-ausbildung.lf4-schutzbedarf.v1");
assert.strictEqual(L.QUESTIONS.length, 4);

L.QUESTIONS.forEach(function (q) {
  assert.strictEqual(RICHTIG[q.id], q.correct, "richtige Antwort " + q.id);
  q.options.forEach(function (o) {
    assert.ok(o.feedback.length >= 40, "Feedback lang genug: " + q.id + "/" + o.id);
  });
});

var leer = L.evaluate({});
assert.strictEqual(leer.empty, 4);
assert.strictEqual(leer.correct, 0);

var alle = L.evaluate(RICHTIG);
assert.strictEqual(alle.allCorrect, true);
assert.strictEqual(alle.correct, 4);

var eine = L.evaluate({ q1: "niedrig", q2: "mittel", q3: "niedrig", q4: "abstimmen" });
assert.strictEqual(eine.wrong, 1);
assert.strictEqual(eine.correct, 3);
assert.strictEqual(eine.allCorrect, false);

assert.ok(L.progressText({}).indexOf("Fortschritt: 0 von 5 Schritten") === 0);
var voll = L.progressText({ answers: RICHTIG, checked: true, finish: true });
assert.ok(voll.indexOf("5 von 5") !== -1, voll);
assert.ok(voll.indexOf("Abschluss geöffnet") !== -1, voll);

var html = fs.readFileSync(path.join(__dirname, "..", "module", "lf4-schutzbedarf.html"), "utf8");
assert.ok(html.indexOf("Fortschritt: 0 von 5 Schritten · Abschluss noch nicht geöffnet") !== -1);
assert.ok(html.indexOf("Fortschritt: 0 %") === -1);
assert.ok(html.indexOf('data-page="lf4-schutzbedarf"') !== -1);
assert.ok(html.indexOf("../js/lf4-schutzbedarf.js") !== -1);

console.log("lf4-schutzbedarf: alle Prüfungen bestanden");
