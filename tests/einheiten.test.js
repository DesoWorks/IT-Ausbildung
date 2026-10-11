"use strict";
const assert = require("node:assert/strict"), fs = require("node:fs"), path = require("node:path"), vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const js = fs.readFileSync(path.join(root, "js/einheiten.js"), "utf8");
const html = fs.readFileSync(path.join(root, "module/einheiten.html"), "utf8");
const css = fs.readFileSync(path.join(root, "css/einheiten.css"), "utf8");
const ctx = { window: {}, module: { exports: {} }, document: undefined }; vm.runInNewContext(js, ctx);
const e = ctx.module.exports;
const c = (t, a, b) => e.convert(t, a, b);

// Grundumrechnungen, exakt
assert.equal(c("1", "B", "bit").result.text, "8");
assert.equal(c("8", "bit", "B").result.text, "1");
assert.equal(c("1", "GB", "MB").result.text, "1.000");
assert.equal(c("1", "GiB", "MiB").result.text, "1.024");
assert.equal(c("1500", "kbit", "Mbit").result.text, "1,5");
assert.equal(c("100", "Mbit", "MB").result.text, "12,5");
assert.equal(c("1", "kbit", "B").result.text, "125");
assert.equal(c("1", "KiB", "B").result.text, "1.024");
assert.equal(c("1", "kB", "B").result.text, "1.000");
assert.equal(c("1,5", "GB", "MB").result.text, "1.500");
assert.equal(c("1.5", "GB", "MB").result.text, "1.500");
assert.equal(c("0,1", "B", "bit").result.text, "0,8");
assert.equal(c("1", "TiB", "GiB").result.text, "1.024");
// GB gegen GiB
const g = c("1", "GiB", "GB");
assert.equal(g.result.text, "1,073742"); assert.equal(g.result.exact, false); assert(g.line.includes("≈"));
const t = c("1", "TB", "GiB");
assert.equal(t.result.text, "931,322575"); assert.equal(t.result.exact, false);
assert(g.comparison.includes("7,374182 %") && g.comparison.includes("1.073.741.824 B") && g.comparison.includes("1.000.000.000 B"), g.comparison);
assert(c("1", "GB", "GiB").comparison.includes("GiB ist daher um"), "Vergleich auch in Gegenrichtung");
assert.equal(c("1", "MB", "kbit").comparison, null, "kein Vergleich ohne Dezimal/Binär-Paar");
assert.equal(c("5", "GB", "GB").result.text, "5"); assert(c("5", "GB", "GB").steps.some(s => s.includes("gleich")));
// Rechenweg
const w = c("5", "GB", "GiB").steps.join("\n");
assert(w.includes("5 × 8.000.000.000 = 40.000.000.000 bit") && w.includes("8.589.934.592") && w.includes("4,656613 GiB"), w);
// kleine Werte
assert.equal(c("1", "bit", "TiB").result.tiny, true);
assert.equal(c("0", "GB", "MB").result.text, "0");
// Validierung
for (const bad of ["", "   ", "abc", "-5", "+5", "1e3", "1,2,3", "1.2.3", ",5", "5,", "1234567890123456"]) {
  const x = c(bad, "GB", "MB"); assert.equal(x.ok, false, JSON.stringify(bad)); assert(x.error && x.error.length > 5);
}
assert.equal(c("1", "XB", "MB").ok, false); assert.equal(c("1", "GB", "").ok, false);
assert.equal(c("007", "B", "bit").result.text, "56", "führende Nullen");
assert.equal(c("1 000", "B", "bit").result.text, "8.000", "Leerzeichen als Gruppierung");
// Einheitentabelle
assert.equal(e.units.length, 13);
for (const u of e.units) assert(u.bits > 0n && u.name);
assert.equal(e.unit("GiB").bits, 8n * 1073741824n);
// Seite, Navigation, Anzeigeoptionen
for (const s of ["navigation.js", "anzeige-glossar.js", "glossar-daten.js", "einheiten.js", "module-daten.js"]) assert(html.includes(s), s);
assert(html.includes('data-page="einheiten"') && html.includes("skip-link") && html.includes('lang="de"'));
assert(html.includes('for="eh-eingabe"') && html.includes('for="eh-von"') && html.includes('for="eh-nach"') && html.includes('role="alert"') && html.includes('aria-live="polite"'));
assert(js.includes('addEventListener("input", clearResult)') && js.includes('addEventListener("change", clearResult)'), "stale result wird gelöscht");
assert(css.includes("var(--farbe-") && !/#[0-9a-f]{3,6}\b/i.test(css), "nur gemeinsame Farbvariablen");
const data = fs.readFileSync(path.join(root, "js/module-daten.js"), "utf8");
assert(data.includes('page: "einheiten"') && data.includes("module/einheiten.html"));
const gl = fs.readFileSync(path.join(root, "js/glossar-daten.js"), "utf8");
for (const term of ["Byte", "Gibibyte (GiB)", "Gigabyte (GB)"]) assert(gl.includes('begriff: "' + term + '"'), term);
console.log("einheiten.test.js: all assertions passed");
