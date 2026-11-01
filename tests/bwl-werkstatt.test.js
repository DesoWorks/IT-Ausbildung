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

const ref = b.lf2Referenz();
assert.equal(ref.ok, true);
assert.equal(ref.positionssumme, 285000);
assert.equal(ref.handlungskosten, 19950);
assert.equal(ref.selbstkosten, 304950);
assert.equal(ref.gewinn, 15248);
assert.equal(ref.netto, 320198);
assert.equal(b.percent(285000, 7), 19950, "gleiche Cent-Regel wie LF2.8");
assert.equal(b.percent(304950, 5), 15248, "halber Cent wird aufgerundet");
assert.equal(b.fmt(320198), "3.201,98");

const frei = b.angebot({
  positionen: [{ menge: "2", einzelpreis: "12,50" }],
  handlungskostenSatz: "0",
  gewinnSatz: "0"
});
assert.equal(frei.ok, true);
assert.equal(frei.positionssumme, 2500);
assert.equal(frei.netto, 2500);
assert.notEqual(frei.netto, ref.netto, "freie Eingabe rechnet nicht auf die LF2-Referenz");

const eineZeile = b.angebot({
  positionen: [
    { menge: "1", einzelpreis: "10,00" },
    { menge: "", einzelpreis: "" },
    { menge: "  ", einzelpreis: "" }
  ],
  handlungskostenSatz: "0",
  gewinnSatz: "0"
});
assert.equal(eineZeile.ok, true, "leere Angebotszeilen zählen nicht als Position");
assert.equal(eineZeile.positionssumme, 1000);
assert.equal(b.angebot({
  positionen: [{ menge: "1", einzelpreis: "" }],
  handlungskostenSatz: "0",
  gewinnSatz: "0"
}).ok, false, "halb gefüllte Zeile bleibt ein Fehler");

assert.equal(b.money("12,50").cents, 1250);
assert.equal(b.money("1.250,50").cents, 125050);
assert.equal(b.money("0").cents, 0);
assert.equal(b.money("0,00").cents, 0);
assert.equal(b.money("").ok, false);
assert.equal(b.money("abc").ok, false);
assert.equal(b.money("-1,00").ok, false);
assert.equal(b.money("12.50").ok, false, "Punkt ist kein stiller Dezimaltrenner");
assert.equal(b.money("12,505").ok, false);

const nullGewinn = b.gewinn({ weg: "zuschlag", basis: "0,00", satz: "5" });
assert.equal(nullGewinn.ok, true);
assert.equal(nullGewinn.gewinn, 0);
const diff = b.gewinn({ weg: "differenz", erloes: "10,00", kosten: "10,00" });
assert.equal(diff.gewinn, 0);
const verlust = b.gewinn({ weg: "differenz", erloes: "1,00", kosten: "2,50" });
assert.equal(verlust.gewinn, -150);
assert.equal(b.fmt(verlust.gewinn), "-1,50");

const rabatt = b.rabatt({ basis: "80,00", art: "prozent", satz: "12,50" });
assert.equal(rabatt.ok, true);
assert.equal(rabatt.rabatt, 1000);
assert.equal(rabatt.ergebnis, 7000);
assert.equal(b.rabatt({ basis: "10,00", art: "betrag", betrag: "12,00" }).ok, false);
assert.equal(b.rabatt({ basis: "", art: "prozent", satz: "10" }).ok, false);

const brutto = b.steuer({ betrag: "100,00", satz: "19", richtung: "netto-zu-brutto" });
assert.equal(brutto.netto, 10000);
assert.equal(brutto.steuer, 1900);
assert.equal(brutto.brutto, 11900);
const zurueck = b.steuer({ betrag: "119,00", satz: "19", richtung: "brutto-zu-netto" });
assert.equal(zurueck.netto, 10000);
assert.equal(zurueck.steuer, 1900);
assert.equal(zurueck.brutto, 11900);
const nullSteuer = b.steuer({ betrag: "12,50", satz: "0", richtung: "netto-zu-brutto" });
assert.equal(nullSteuer.steuer, 0);
assert.equal(nullSteuer.brutto, 1250);
assert.equal(b.steuer({ betrag: "10,00", satz: "101", richtung: "netto-zu-brutto" }).ok, false);
assert.equal(b.steuer({ betrag: "10,00", satz: "", richtung: "netto-zu-brutto" }).ok, false);

assert(ref.steps.every(step => /Euro/.test(step)), "Rechenweg nennt Euro");
assert(brutto.steps.some(step => step.includes("19,00 %")), "Steuersatz bleibt sichtbar");
assert(js.includes("floor((cents * rate + 50) / 100)"), "Rundungsregel steht im Kern");
assert(!/require\(|import /.test(js), "Kern importiert keine andere Datei");
assert(!/https?:\/\//.test(js) && !/https?:\/\//.test(html), "keine externen Dienste");

for (const s of ["navigation.js", "anzeige-glossar.js", "glossar-daten.js", "bwl-werkstatt.js", "module-daten.js"]) {
  assert(html.includes(s), s);
}
assert(html.includes('lang="de"') && html.includes("skip-link") && html.includes('data-page="bwl-werkstatt"'));
assert(html.includes('for="p1-menge"') && html.includes('for="st-satz"') && html.includes('role="alert"') && html.includes('aria-live="polite"'));
assert(html.includes('role="tablist"') && html.includes("Übungsannahme"));
assert.equal((html.match(/data-position/g) || []).length, 6, "genau sechs Angebotszeilen");
assert(html.includes("Du kannst bis zu 6 Artikel hinzufügen."), "kurzer Hinweis zur Sechs-Artikel-Grenze");
assert(html.includes('href="../assets/desoworks/favicon.svg"'));
assert(css.includes("var(--farbe-") && !/#[0-9a-f]{3,6}\b/i.test(css), "nur gemeinsame Farbvariablen");
assert(css.includes("focus-visible"));
assert(css.includes("grid-template-columns: minmax(0, 1fr) minmax(0, 1fr)"), "Positionsfelder nutzen zwei begrenzte Spalten");
assert(css.includes("grid-template-rows: auto auto"), "Positionslabels stehen oberhalb ihrer Eingabefelder");
assert(css.includes("@media (max-width: 640px)"), "schmale Ansicht wird unterstützt");
assert(css.includes("overflow-wrap: normal"), "Labels werden nicht mitten im Wort gebrochen");
assert(css.includes(".bwl-panel > label { display: block") && css.includes(".bwl-panel > input { display: block"), "Zuschlagslabels und Eingaben stehen jeweils auf eigener Zeile");
const data = fs.readFileSync(path.join(root, "js/module-daten.js"), "utf8");
assert(data.includes('page: "bwl-werkstatt"') && data.includes("module/bwl-werkstatt.html"));
const lf2 = fs.readFileSync(path.join(root, "js/lf2-angebot.js"), "utf8");
assert(!lf2.includes("bwl-werkstatt"), "LF2.8-Datei bleibt ohne Verweis auf die Werkstatt");

console.log("bwl-werkstatt.test.js: all assertions passed");
