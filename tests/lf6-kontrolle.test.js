"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");

require(path.join(root, "js", "lf6-kontrolle.js"));
const api = require(path.join(root, "js", "lf6-kontrolle-rest.js"));
const fragen = api.FRAGEN;

assert.equal(fragen.length, 24, "24 Fragen");
assert.match(api.HASH, /^[0-9a-f]{64}$/, "nur ein SHA-256-Hash, kein Passwort im Klartext");

const positionen = new Set();
const texte = new Set();
fragen.forEach((f, i) => {
  assert.equal(f.optionen.length, 3, "drei Antworten: Frage " + (i + 1));
  const pos = "abc".indexOf(f.richtig);
  assert.ok(pos >= 0, "gültiger Buchstabe: Frage " + (i + 1));
  positionen.add(pos);
  const richtig = f.optionen[pos].length;
  const laengste = Math.max.apply(null, f.optionen.filter((_, k) => k !== pos).map((o) => o.length));
  assert.ok(richtig < laengste, "richtige Antwort ist nicht die längste: Frage " + (i + 1));
  assert.ok(f.hinweis.length >= 40, "Hinweis lang genug: Frage " + (i + 1));
  assert.ok(f.hinweis.indexOf("Richtig.") === 0, "Hinweis beginnt mit Richtig.: Frage " + (i + 1));
  texte.add(f.text + "|" + f.optionen.join("|"));
});
assert.equal(positionen.size, 3, "richtige Position wechselt über alle drei Plätze");
assert.equal(texte.size, 24, "keine doppelte Frage");

const html = fs.readFileSync(path.join(root, "module", "lf6-kontrolle.html"), "utf8");
assert.ok(html.includes("<title>LF6 Lernzielkontrolle</title>"));
assert.ok(html.includes("<h1>LF6 Lernzielkontrolle</h1>"));
assert.ok(html.includes('data-page="lf6-kontrolle"'));
assert.ok(html.includes("../js/lf6-kontrolle.js") && html.includes("../js/lf6-kontrolle-rest.js"));
assert.ok(!/lf5|LF5|lf7|LF7|Übungsaufgabe|Zusammenfassung/.test(html), "keine Reste anderer Lernfelder");

const katalog = fs.readFileSync(path.join(root, "js", "module-daten.js"), "utf8");
assert.ok(katalog.includes('titel: "LF6 Lernzielkontrolle"'));

console.log("lf6-kontrolle: alle Prüfungen bestanden");
