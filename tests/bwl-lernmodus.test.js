"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const js = fs.readFileSync(path.join(root, "js/bwl-werkstatt.js"), "utf8");
const html = fs.readFileSync(path.join(root, "module/bwl-werkstatt.html"), "utf8");
const css = fs.readFileSync(path.join(root, "css/bwl-werkstatt.css"), "utf8");
const ctx = { window: {}, module: { exports: {} }, document: undefined };
vm.runInNewContext(js, ctx);
const b = ctx.module.exports;

// Referenzwerte bleiben unverändert (Kern)
const ref = b.lf2Referenz();
assert.deepEqual(
  [ref.positionssumme, ref.handlungskosten, ref.selbstkosten, ref.gewinn, ref.netto],
  [285000, 19950, 304950, 15248, 320198]
);

// Artikelbezeichnungen: neues Feld "zeilen", Berechnung unverändert
const mitName = b.angebot({
  positionen: [{ name: "  Bildschirm ", menge: "2", einzelpreis: "150,00" }, { menge: "", einzelpreis: "" }, { menge: "1", einzelpreis: "10,00" }],
  handlungskostenSatz: "0", gewinnSatz: "0"
});
assert.equal(mitName.ok, true);
assert.equal(mitName.zeilen.length, 2, "leere Zeilen erscheinen nicht");
assert.equal(mitName.zeilen[0].name, "Bildschirm");
assert.equal(mitName.zeilen[1].name, "", "Name bleibt freiwillig");
assert.equal(mitName.zeilen[0].betrag, "300,00");
assert.equal(mitName.positionssumme, 31000);
const ohneName = b.angebot({ positionen: [{ menge: "2", einzelpreis: "150,00" }], handlungskostenSatz: "0", gewinnSatz: "0" });
assert.equal(ohneName.positionssumme, 30000, "Name ändert die Rechnung nicht");
assert.equal(b.angebot({ positionen: [{ name: "x", menge: "", einzelpreis: "" }], handlungskostenSatz: "0", gewinnSatz: "0" }).ok, false, "nur ein Name ist keine Position");

// Lernaufgaben: drei Aufgaben, je genau drei Phasen
assert.equal(b.lernAufgaben.length, 3);
const soll = [
  { pos: 285000, hk: 19950, sk: 304950, gw: 15248, netto: 320198 },
  { pos: 26900, hk: 1614, sk: 28514, gw: 2281, netto: 30795 }
];
for (let i = 0; i < 3; i++) {
  const l = b.lernLoesung(i);
  assert.equal(l.phasen.length, 3, "Aufgabe " + (i + 1) + " hat drei Phasen");
  l.phasen.forEach(p => assert(p.titel && p.anweisung && p.tipp && p.weg.length && p.felder.length, "Phase vollständig"));
}
for (let i = 0; i < 2; i++) {
  const p = b.lernLoesung(i).phasen;
  const f = k => { for (const ph of p) for (const x of ph.felder) if (x.key === k) return x.cents; };
  assert.equal(f("positionssumme"), soll[i].pos);
  assert.equal(f("handlungskosten"), soll[i].hk);
  assert.equal(f("selbstkosten"), soll[i].sk);
  assert.equal(f("gewinn"), soll[i].gw);
  assert.equal(f("netto"), soll[i].netto);
}
assert.equal(b.lernLoesung(0).phasen[0].felder.length, 7, "sechs Positionen plus Summe");
const a3 = b.lernLoesung(2).phasen.map(p => p.felder[0].cents);
assert.equal(JSON.stringify(a3), JSON.stringify([42000, 4200, 37800]));

// Aufgabe 1 entspricht dem LF2-Referenzfall
assert.equal(b.lernLoesung(0).phasen[2].felder[1].cents, ref.netto);

// Prüfung: richtig, falsch, Formatfehler
assert.equal(b.lernPruefe(0, 1, { handlungskosten: "199,50", selbstkosten: "3.049,50" }).ok, true);
assert.equal(b.lernPruefe(0, 1, { handlungskosten: "199,50 €", selbstkosten: "3049,50" }).ok, true, "Euro-Zeichen wird toleriert");
const falsch = b.lernPruefe(0, 1, { handlungskosten: "200,00", selbstkosten: "3.049,50" });
assert.equal(falsch.ok, false);
assert.equal(JSON.stringify(falsch.felder.map(x => x.art)), JSON.stringify(["wert", "ok"]));
assert(!/199,50|3\.049,50/.test(falsch.felder[0].meldung), "falsche Antwort verrät die Lösung nicht");
const format = b.lernPruefe(0, 1, { handlungskosten: "199.50", selbstkosten: "" });
assert.equal(JSON.stringify(format.felder.map(x => x.art)), JSON.stringify(["format", "format"]));
assert(format.felder.every(x => x.meldung.length > 10));
assert.equal(b.lernPruefe(2, 0, { warenwert: "420,00" }).ok, true);
assert.equal(b.lernPruefe(2, 2, { ergebnis: "42,00" }).ok, false);
assert.equal(b.lernPruefe(0, 0, {}).ok, false, "leere Antwort ist nicht richtig");

// Rundung: Halbcent aufgerundet, gleiche Regel wie freier Rechner
assert.equal(b.lernPruefe(0, 2, { gewinn: "152,48", netto: "3.201,98" }).ok, true);
assert.equal(b.lernPruefe(0, 2, { gewinn: "152,47", netto: "3.201,97" }).ok, false);

// Kein zweiter Rechenkern: Lernlogik ruft nur angebot()/rabatt()
const lernTeil = js.slice(js.indexOf("function lernLoesung"), js.indexOf("function lernPruefe"));
assert(lernTeil.includes("angebot(") && lernTeil.includes("rabatt("));
assert(!/percentFein\(|percent\(|\* 100|\/ 100/.test(lernTeil), "keine eigene Prozentformel im Lernteil");
assert(!/https?:\/\//.test(js) && !/https?:\/\//.test(html), "keine externen Dienste");

// HTML: Moduswahl, Status, Tabelle, Fokus
assert(html.includes('data-bwl-modus="frei"') && html.includes('data-bwl-modus="lern"'));
assert(html.includes("Freier Rechner") && html.includes("Lernmodus"));
assert(html.includes('aria-pressed="true"') && html.includes('role="status"'));
assert(html.includes("fachlich noch nicht geprüft und nicht freigegeben"), "Entwurfsstatus sichtbar");
assert.equal((html.match(/data-name/g) || []).length, 6, "sechs Artikelfelder");
for (let n = 1; n <= 6; n++) assert(html.includes('for="p' + n + '-name"'), "Label Artikel " + n);
assert.equal((html.match(/data-position/g) || []).length, 6);
assert(html.includes('id="panel-steuer"') && html.includes('id="bwl-lern-aufgabe"'));
assert.equal((html.match(/<div/g) || []).length, (html.match(/<\/div>/g) || []).length, "div ausgeglichen");
assert(js.includes('"caption"') || js.includes('createElement("caption")'), "Tabelle mit Beschriftung");
assert(js.includes('"col"') && js.includes('"row"'), "Tabellenköpfe mit scope");
assert(css.includes("focus-visible") && css.includes("@media (max-width: 640px)"));
assert(!/animation|transition/.test(css), "keine Animationen");
assert(!/#[0-9a-f]{3,6}\b/i.test(css), "nur gemeinsame Farbvariablen");

// js/lf2-angebot.js bleibt ohne Werkstatt-Bezug
assert(!fs.readFileSync(path.join(root, "js/lf2-angebot.js"), "utf8").includes("bwl-werkstatt"));

console.log("bwl-lernmodus.test.js: all assertions passed");
