"use strict";
const assert = require("node:assert/strict"), fs = require("node:fs"), path = require("node:path"), vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const js = fs.readFileSync(path.join(root, "js/zahlensysteme.js"), "utf8");
const html = fs.readFileSync(path.join(root, "module/zahlensysteme.html"), "utf8");
const css = fs.readFileSync(path.join(root, "css/zahlensysteme.css"), "utf8");
const ctx = { window: {}, module: { exports: {} }, document: undefined }; vm.runInNewContext(js, ctx);
const z = ctx.module.exports;

// Umrechnung
const r = z.convert("192", 10);
assert.equal(r.bitSum, "128 + 64 = 192");
assert.equal(r.ok, true); assert.equal(r.results.dec, "192"); assert.equal(r.results.bin, "1100 0000"); assert.equal(r.results.hex, "0xC0");
assert.equal(z.convert("1100 0000", 2).value, 192); assert.equal(z.convert("0b11000000", 2).value, 192);
assert.equal(z.convert("c0", 16).value, 192); assert.equal(z.convert("0xFF", 16).value, 255); assert.equal(z.convert("0", 10).results.bin, "0000 0000");
assert.equal(z.convert("0", 10).bitSum, "Kein Bit gesetzt; Summe: 0");
assert.equal(z.convert("256", 10).bitSum, "256 = 256");
assert.equal(z.convert("4294967295", 10).results.hex, "0xFFFFFFFF"); assert.equal(z.convert("256", 10).results.bin, "0000 0001 0000 0000");
// Validierung
for (const [t, b] of [["", 10], ["  ", 2], ["12", 2], ["xyz", 16], ["-5", 10], ["1.5", 10], ["4294967296", 10], ["1" + "0".repeat(32), 2], ["FFFFFFFFF", 16], ["0x", 16], ["2", 2], ["G", 16]]) {
  const x = z.convert(t, b); assert.equal(x.ok, false, JSON.stringify([t, b])); assert(x.error && x.error.length > 5);
}
assert.equal(z.convert("0000000000000000000000000000000000001", 2).ok, true, "führende Nullen zählen nicht");
// Stellenwerte
const t = z.placeTable(192); assert.equal(t.length, 8); assert.equal(t[0].weight, 128); assert.equal(t[0].bit, "1"); assert.equal(t[7].weight, 1);
assert.equal(z.placeTable(256).length, 16);
// Rechenweg
assert(z.steps(192, 2).some(l => l.includes("128 + 64 = 192")));
assert(z.steps(192, 10).some(l => l.includes("Reste von unten nach oben gelesen: 11000000")));
assert(z.steps(192, 16).some(l => l.includes("C (= 12) × 16 = 192")));
assert(z.steps(5, 10).some(l => l.includes("0101 = 5")), "4-Bit-Gruppen sind nachvollziehbar abgebildet");
assert(z.steps(256, 10).some(l => l.includes("0001 = 1; 0000 = 0; 0000 = 0")), "führende Nullen der Hex-Gruppen sind erklärt");
assert(z.steps(0, 10)[0].includes("0 : 2 = 0 Rest 0"));
// Seite, Navigation, Anzeigeoptionen, Stale-Handling
for (const s of ["navigation.js", "anzeige-glossar.js", "glossar-daten.js", "zahlensysteme.js", "module-daten.js"]) assert(html.includes(s), s);
assert(html.includes('data-page="zahlensysteme"') && html.includes("skip-link") && html.includes('lang="de"'));
assert(html.includes('for="zs-eingabe"') && html.includes('for="zs-system"') && html.includes('role="alert"') && html.includes('aria-live="polite"'));
assert(js.includes("0b kennzeichnet eine Binärzahl; 0x kennzeichnet eine Hexadezimalzahl."), "Vorsilben erklärt");
assert(js.includes('addEventListener("input", clearResult)') && js.includes('addEventListener("change", clearResult)'), "stale result wird gelöscht");
assert(css.includes("var(--farbe-") && !/#[0-9a-f]{3,6}\b/i.test(css), "nur gemeinsame Farbvariablen");
const data = fs.readFileSync(path.join(root, "js/module-daten.js"), "utf8");
assert(data.includes('page: "zahlensysteme"') && data.includes("module/zahlensysteme.html"));
const gl = fs.readFileSync(path.join(root, "js/glossar-daten.js"), "utf8");
for (const term of ["Binärsystem", "Dezimalsystem", "Hexadezimal", "Stellenwert"]) assert(gl.includes('begriff: "' + term + '"'), term);
console.log("zahlensysteme.test.js: all assertions passed");
