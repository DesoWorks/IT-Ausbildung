"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");

const values = new Map();
const window = {
  localStorage: { getItem(key) { return values.has(key) ? values.get(key) : null; } },
  document: { createElement() { return { setAttribute() {} }; } }
};
vm.runInNewContext(fs.readFileSync(path.join(root, "js/fortschritt.js"), "utf8"), { window, document: window.document, globalThis: window });
const api = window.LERNFORTSCHRITT;

const ids = ["anfrage", "fragen", "level", "notiz", "sla", "status", "kontakt", "ursache", "loesung", "gespraech", "qualitaet"];
ids.forEach((n) => {
  const lesson = require(path.join(root, "js", "lf6-" + n + ".js"));
  assert.equal(lesson.ID, "lf6-" + n);
  assert.equal(lesson.KEY, "it-ausbildung.lf6-" + n + ".v1");
  const answers = Object.fromEntries(lesson.QUESTIONS.map((q) => [q.id, q.correct]));
  values.clear();
  assert.equal(api.abgeschlossen(lesson.ID), false, n + ": ohne Stand nicht abgeschlossen");
  values.set(lesson.KEY, JSON.stringify({ checked: true, finish: true, answers }));
  assert.equal(api.abgeschlossen(lesson.ID), true, n + ": alles richtig und Abschluss geöffnet");
  values.set(lesson.KEY, JSON.stringify({ checked: true, finish: false, answers }));
  assert.equal(api.abgeschlossen(lesson.ID), false, n + ": ohne Abschluss nicht abgeschlossen");
  values.set(lesson.KEY, JSON.stringify({ checked: true, finish: true, answers: {} }));
  assert.equal(api.abgeschlossen(lesson.ID), false, n + ": leere Abgabe zählt nicht");
  const falsch = Object.assign({}, answers, { q1: "falsch" });
  values.set(lesson.KEY, JSON.stringify({ checked: true, finish: true, answers: falsch }));
  assert.equal(api.abgeschlossen(lesson.ID), false, n + ": eine falsche Antwort zählt nicht");
});

require(path.join(root, "js", "lf6-kontrolle.js"));
const kontrolle = require(path.join(root, "js", "lf6-kontrolle-rest.js"));
const key = "it-ausbildung.lf6-kontrolle.v1";
const soll = kontrolle.FRAGEN.map((f) => f.richtig);
const alle = {};
soll.forEach((b, i) => { alle[i] = b; });
values.clear();
assert.equal(api.abgeschlossen("lf6-kontrolle"), false);
values.set(key, JSON.stringify({ answers: alle, finish: true }));
assert.equal(api.abgeschlossen("lf6-kontrolle"), true, "alle 24 richtig und abgegeben");
values.set(key, JSON.stringify({ answers: alle, finish: false }));
assert.equal(api.abgeschlossen("lf6-kontrolle"), false, "nicht abgegeben");
const eine = Object.assign({}, alle, { 5: alle[5] === "a" ? "b" : "a" });
values.set(key, JSON.stringify({ answers: eine, finish: true }));
assert.equal(api.abgeschlossen("lf6-kontrolle"), false, "eine falsche Antwort");
values.set(key, JSON.stringify({ answers: {}, finish: true }));
assert.equal(api.abgeschlossen("lf6-kontrolle"), false, "leere Abgabe");
assert.equal(api.abgeschlossen("lf6"), false, "das Lernfeld selbst hat keinen eigenen Abschluss");

console.log("lf6-fortschritt: alle Prüfungen bestanden");
