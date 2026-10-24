"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const js = fs.readFileSync(path.join(root, "js/bwl-werkstatt.js"), "utf8");
const html = fs.readFileSync(path.join(root, "module/bwl-werkstatt.html"), "utf8");
const ctx = { window: {}, module: { exports: {} }, document: undefined };
vm.runInNewContext(js, ctx);
const b = ctx.module.exports;
const plain = x => JSON.parse(JSON.stringify(x));

// Hinzufügen: genau eine Position pro Klick, Höchstgrenze sechs
assert.equal(b.MAX_POSITIONEN, 6);
assert.equal(b.positionenHinzufuegen(1), 2);
assert.equal(b.positionenHinzufuegen(5), 6);
assert.equal(b.positionenHinzufuegen(6), 6, "Höchstgrenze bleibt sechs");
assert.equal(b.positionenHinzufuegen(0), 1);
assert.equal(b.positionenHinzufuegen(undefined), 1);
let n = 1;
for (let i = 0; i < 10; i++) n = b.positionenHinzufuegen(n);
assert.equal(n, 6, "auch nach vielen Klicks nie mehr als sechs");

// Entfernen: übrige Positionen rücken nach, Reihenfolge bleibt
const rows = [
  { name: "A", menge: "1", einzelpreis: "10,00" },
  { name: "B", menge: "2", einzelpreis: "20,00" },
  { name: "C", menge: "3", einzelpreis: "30,00" }
];
const ohneB = b.positionenEntfernen(rows, 1);
assert.equal(JSON.stringify(plain(ohneB.map(r => r.name))), JSON.stringify(["A", "C"]));
assert.equal(rows.length, 3, "Eingabe wird nicht verändert");
const ohneC = b.positionenEntfernen(rows, 2);
assert.equal(JSON.stringify(plain(ohneC.map(r => r.name))), JSON.stringify(["A", "B"]));
assert.equal(b.positionenEntfernen(rows, 0).length, 3, "Artikel 1 ist nicht entfernbar");
assert.equal(b.positionenEntfernen(rows, 3).length, 3, "Index außerhalb ändert nichts");
assert.equal(b.positionenEntfernen(rows, -1).length, 3);
assert.equal(b.positionenEntfernen(rows, 1.5).length, 3);
assert.equal(b.positionenEntfernen(null, 1).length, 0);

// Berechnung nach Entfernen: nur verbleibende Positionen, neu nummeriert
const vor = b.angebot({ positionen: rows, handlungskostenSatz: "0", gewinnSatz: "0" });
assert.equal(vor.positionssumme, 14000);
const nach = b.angebot({ positionen: ohneB, handlungskostenSatz: "0", gewinnSatz: "0" });
assert.equal(nach.positionssumme, 10000, "A (10,00) plus C (90,00); B (40,00) geht nicht mehr ein");
assert.equal(nach.zeilen.length, 2);
assert(nach.steps[1].startsWith("Position 2: "), "Nummerierung lückenlos");
assert.equal(nach.zeilen[1].name, "C");
// mit Zuschlägen: gleiche Rundung wie bisher
const mitZ = b.angebot({ positionen: ohneB, handlungskostenSatz: "7", gewinnSatz: "5" });
assert.equal(mitZ.positionssumme, 10000);
assert.equal(mitZ.handlungskosten, 700);
assert.equal(mitZ.selbstkosten, 10700);
assert.equal(mitZ.gewinn, 535);
assert.equal(mitZ.netto, 11235);
// Referenzwert bleibt
const ref = b.lf2Referenz();
assert.equal(ref.netto, 320198);

// HTML: Start mit einer Position, fünf ausgeblendet
const zeilen = html.match(/<div class="bwl-zeile"[^>]*>/g);
assert.equal(zeilen.length, 6);
assert(!/hidden/.test(zeilen[0]), "Position 1 sichtbar");
for (let i = 1; i < 6; i++) assert(/ hidden>/.test(zeilen[i]), "Position " + (i + 1) + " startet ausgeblendet");
assert(!html.includes("freiwillig"), "kein 'freiwillig' mehr");
assert.equal((html.match(/Artikelname \(optional\)/g) || []).length, 6);
for (let i = 1; i <= 6; i++) assert(html.includes(">Artikel " + i + "</h3>"), "Überschrift Artikel " + i);
assert(html.includes('id="bwl-artikel-plus">Weiteren Artikel hinzufügen</button>'));
assert.equal((html.match(/data-entfernen/g) || []).length, 5, "Entfernen nur ab Artikel 2");
assert(!/p1-name[\s\S]{0,0}data-entfernen/.test(zeilen[0]));
assert(html.includes('id="bwl-position-status"') && /id="bwl-position-status"[^>]*role="status"/.test(html));

// Datenübernahme: Moduswechsel verändert keine Eingaben
const setModus = js.slice(js.indexOf("function setModus"), js.indexOf("function lernPhase"));
assert(setModus.includes("hidden") && !/\.value\s*=|setPositionen|clearInputs/.test(setModus), "Moduswechsel blendet nur ein/aus");
assert(html.includes('<div id="bwl-frei" class="bwl-bereich">'), "freier Rechner bleibt im DOM");

// Keine versteckten Werte: ausgeblendete Zeilen werden geleert und nie gelesen
assert(js.includes('[data-position]:not([hidden])'), "readPositions liest nur sichtbare Zeilen");
const setPos = js.slice(js.indexOf("function setPositionen"), js.indexOf("$(\"bwl-artikel-plus\").addEventListener"));
assert(/if \(!an\) posSchreiben\(row, \{ name: "", menge: "", einzelpreis: "" \}\)/.test(setPos), "ausgeblendete Zeile wird geleert");
assert(setPos.includes("disabled = anzahl >= MAX_POSITIONEN"));

// Lernmodus: Taschenrechner-Hinweis
const lern = html.slice(html.indexOf('id="bwl-lern"'));
assert(lern.includes("Du darfst einen Taschenrechner benutzen. Wichtig ist, dass du den Rechenweg verstehst."));

console.log("bwl-positionen.test.js: all assertions passed");
