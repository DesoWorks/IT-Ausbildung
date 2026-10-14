"use strict";
var assert = require("assert");
var fs = require("fs");
var path = require("path");
var L = require("../js/lf4-schutzziele.js");

var RICHTIG = { q1: "vertraulichkeit", q2: "integritaet", q3: "verfuegbarkeit", q4: "abstimmen" };

assert.strictEqual(L.ID, "lf4-schutzziele");
assert.strictEqual(L.KEY, "it-ausbildung.lf4-schutzziele.v1");
assert.strictEqual(L.QUESTIONS.length, 4);

var positionen = {};
L.QUESTIONS.forEach(function (q) {
  assert.strictEqual(RICHTIG[q.id], q.correct, "richtige Antwort " + q.id);
  var ids = {};
  var laengste = 0;
  var richtigLaenge = 0;
  q.options.forEach(function (o, i) {
    assert.ok(o.feedback.length >= 40, "Feedback lang genug: " + q.id + "/" + o.id);
    assert.ok(!ids[o.id], "Option-ID eindeutig: " + q.id + "/" + o.id);
    ids[o.id] = true;
    laengste = Math.max(laengste, o.label.length);
    if (o.id === q.correct) { richtigLaenge = o.label.length; positionen[i] = true; }
  });
  assert.ok(ids[q.correct], "richtige Option vorhanden: " + q.id);
  assert.ok(richtigLaenge < laengste, "richtige Antwort ist nie die längste: " + q.id);
});
assert.ok(Object.keys(positionen).length >= 2, "richtige Position wechselt");

var leer = L.evaluate({});
assert.strictEqual(leer.empty, 4);
assert.strictEqual(leer.correct, 0);

var alle = L.evaluate(RICHTIG);
assert.strictEqual(alle.allCorrect, true);
assert.strictEqual(alle.correct, 4);

var eine = L.evaluate({ q1: "aenderung", q2: "integritaet", q3: "verfuegbarkeit", q4: "abstimmen" });
assert.strictEqual(eine.wrong, 1);
assert.strictEqual(eine.correct, 3);
assert.strictEqual(eine.allCorrect, false);

assert.ok(L.progressText({}).indexOf("Fortschritt: 0 von 5 Schritten") === 0);
var voll = L.progressText({ answers: RICHTIG, checked: true, finish: true });
assert.ok(voll.indexOf("5 von 5") !== -1, voll);
assert.ok(voll.indexOf("Abschluss geöffnet") !== -1, voll);

assert.strictEqual(L.percent({}), 0);
assert.strictEqual(L.percent({ answers: { q1: "vertraulichkeit", q2: "integritaet" }, checked: true }), 40);
assert.strictEqual(L.percent({ answers: RICHTIG, checked: true, finish: true }), 100);

var html = fs.readFileSync(path.join(__dirname, "..", "module", "lf4-schutzziele.html"), "utf8");
assert.ok(html.indexOf("Fortschritt: 0 von 5 Schritten · Abschluss noch nicht geöffnet") !== -1);
assert.ok(html.indexOf("Fortschritt: 0 %") === -1);
assert.ok(html.indexOf('data-page="lf4-schutzziele"') !== -1);
assert.ok(html.indexOf("<title>Schutzziele unterscheiden</title>") !== -1);
assert.ok(html.indexOf("../glossar.html?von=lf4-schutzziele.html") !== -1);
assert.ok(html.indexOf("../js/lf4-schutzziele.js") !== -1);

console.log("lf4-schutzziele: alle Prüfungen bestanden");
