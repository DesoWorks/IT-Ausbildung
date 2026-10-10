/* Datentest für die modulare Startseite (js/module-daten.js).
 *
 * Prüft nur die Daten, nicht die Darstellung im Browser.
 * Aufruf:  node tests/startseite.test.js
 */
"use strict";
const fs = require("fs");
const path = require("path");
const assert = require("assert");

const wurzel = path.join(__dirname, "..");
global.window = global;
require(path.join(wurzel, "js", "module-daten.js"));
const daten = global.MODULE_DATEN;

const erwartetJahr1 = [
  ["Lernfeld 1", "Ausbildungsbetrieb und berufliche Rolle"],
  ["Lernfeld 2", "Hardware, Betriebssysteme und Arbeitsplatzgestaltung"],
  ["Lernfeld 3", "Netzwerkgrundlagen und Client-Anbindung"],
  ["Lernfeld 4", "Schutzbedarf und Grundlagen der IT-Sicherheit"],
  ["Lernfeld 5", "Programmiergrundlagen und Datenverwaltung"]
];

assert.strictEqual(daten.length, 3, "drei Ausbildungsjahre");

const j1 = daten[0].module;
const lernfelder = j1.filter(m => m.lernfeld);
assert.deepStrictEqual(lernfelder.map(m => [m.lernfeld, m.titel]), erwartetJahr1, "Jahr-1-Titel wörtlich");
assert.strictEqual(daten[1].module.length, 4, "Jahr 2: vier Bereiche");
assert.strictEqual(daten[2].module.length, 3, "Jahr 3: drei Bereiche");

const lf3 = j1.find(m => m.id === "lf3");
assert.deepStrictEqual(lf3.unterthemen.map(u => u.titel), ["IPv4", "Subnetting"]);
assert(lf3.unterthemen.every(u => u.status === "kommt-bald" && !u.datei), "Unterthemen: In Kürze, ohne Datei");

const alle = daten.flatMap(j => j.module);
assert(!alle.some(m => /ipv4|subnet/i.test(m.titel)), "IPv4/Subnetting keine eigene Karte");

const verfuegbar = alle.filter(m => m.status === "verfuegbar");
assert(verfuegbar.some(m => m.id === "computer-grundlagen"), "vorhandenes Modul bleibt");
verfuegbar.forEach(m => assert(fs.existsSync(path.join(wurzel, m.datei)), "Datei fehlt: " + m.datei));
alle.filter(m => m.status !== "verfuegbar").forEach(m => assert(!m.datei, m.id + " ohne Datei"));

console.log("startseite.test.js: alle Prüfungen bestanden");
