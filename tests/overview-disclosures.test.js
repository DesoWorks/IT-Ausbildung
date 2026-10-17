"use strict";
const fs = require("fs");
const path = require("path");
const assert = require("assert");
const vm = require("node:vm");
const root = path.join(__dirname, "..");
const js = fs.readFileSync(path.join(root, "js/startseite.js"), "utf8");
const css = fs.readFileSync(path.join(root, "css/startseite.css"), "utf8");
assert(js.includes('erzeuge("details", "overview-year")'), "Jahre als native details");
assert(js.includes('erzeuge("details", "overview-field")'), "Lernfelder als native details");
assert(js.includes('year.jahr === 1'), "Jahr 1 standardmäßig geöffnet");
assert(js.includes('"year:" + year.jahr'), "Jahreszustände getrennt gespeichert");
assert(js.includes('"field:" + field.id'), "Lernfeldzustände getrennt gespeichert");
assert(js.includes('aria-expanded') && js.includes('– schließen') && js.includes('– öffnen'), "Zustand und Öffnen/Schließen-Ansage");
assert(js.includes("RETURN_KEY") && js.includes("sessionStorage.setItem(RETURN_KEY, field.id)"), "Rückkehr speichert Lernfeld-ID");
assert(js.includes("hasField.open = true"), "Rückkehr öffnet zugehöriges Lernfeld");
assert(js.includes("completionCount(lessons, field)"), "Fortschritt berücksichtigt den Freigabestatus des Lernfelds");
// Seit LF8/LF9 reicht ein verfügbares Unterthema allein nicht zur Freigabe.
// Die tatsächlichen Hilfsfunktionen prüfen, nicht nur deren Schreibweise.
const helpers = { window: { LERNFORTSCHRITT: { abgeschlossen: id => id === "fertig" } } };
vm.runInNewContext(js.slice(js.indexOf("  function allLessons("), js.indexOf("  function makeLesson(")), helpers);
const lessons = [
  { id: "fertig", status: "verfuegbar", datei: "module/fertig.html" },
  { id: "offen", status: "verfuegbar", datei: "module/offen.html" },
  { id: "fertig", status: "kommt-bald", datei: "module/geplant.html" }
];
assert.equal(helpers.completionCount(lessons, { status: "verfuegbar" }), 1, "nur verfügbare abgeschlossene Lektionen zählen");
assert.equal(helpers.completionCount(lessons, { status: "kommt-bald" }), 0, "gesperrtes Lernfeld zeigt keinen freigegebenen Fortschritt");
assert.equal(helpers.isAvailable(lessons[0], { status: "kommt-bald" }), false, "vorbereitete Lektion bleibt gesperrt");
assert(js.includes('lesson.typ !== "werkzeug"') || js.includes('x.typ !== "werkzeug"'), "Werkzeuge ausgeschlossen");
assert(css.includes(".overview-year") && css.includes(".overview-field"), "kompakte Details-Gestaltung");
assert(css.includes("#jahre > .overview-year { height: auto; align-self: start;"), "Übersichtsbereiche erhalten natürliche Höhe");
assert(fs.readFileSync(path.join(root, "js/module-daten.js"), "utf8").includes("MODULE_DATEN"), "zentraler Katalog bleibt Datenquelle");
console.log("overview-disclosures.test.js: alle Prüfungen bestanden");
