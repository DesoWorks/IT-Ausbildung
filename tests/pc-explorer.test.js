"use strict";
const assert = require("node:assert/strict"), fs = require("node:fs"), path = require("node:path"), vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const js = fs.readFileSync(path.join(root, "js/pc-explorer.js"), "utf8");
const html = fs.readFileSync(path.join(root, "module/pc-explorer.html"), "utf8");
const css = fs.readFileSync(path.join(root, "css/pc-explorer.css"), "utf8");
const ctx = { module: { exports: {} } }; ctx.globalThis = ctx; vm.runInNewContext(js, ctx);
const e = ctx.module.exports, D = e.DATEN;

// Pflichtinhalt dieser Runde
const teile = ["cpu", "cool", "ram", "gpu", "ssd", "hdd", "psu", "board"];
// Arrays aus dem vm-Kontext haben einen anderen Prototyp, daher Vergleich über JSON.
const gleich = (a, b) => assert.equal(JSON.stringify(a), JSON.stringify(b));
gleich(D.teile.map(t => t.id), teile);
gleich(D.sockel.map(s => s.id), ["pga", "lga", "bga"]);
gleich(D.formen.map(f => f.id), ["atx", "microatx", "miniitx"]);

// Jeder Eintrag erklärt Funktion, Einbauort und Zusammenarbeit
[].concat(D.teile, D.sockel, D.formen).forEach(x => {
  ["name", "glossar"].forEach(k => assert(typeof x[k] === "string" && x[k].length >= 3, x.id + " fehlt " + k));
  ["funktion", "ort", "zusammen", "merk"].forEach(k => assert(typeof x[k] === "string" && x[k].length > 10, x.id + " fehlt " + k));
});

// Quellenbindung: jede Quellen-ID existiert, belegte Fakten haben mindestens eine Quelle
[].concat(D.teile, D.sockel, D.formen).forEach(x => x.q.forEach(q => { assert(D.quellen[q], x.id + " verweist auf unbekannte Quelle " + q); }));
D.teile.concat(D.sockel, D.formen).forEach(x => { if (x.fakt) assert(x.q.length > 0, x.id + ": Fakt ohne Quelle"); });
Object.values(D.quellen).forEach(q => { assert.match(q.url, /^https:\/\//); assert(q.abruf); });
["sockel", "formen"].forEach(k => D[k].forEach(x => assert(x.q.length > 0, x.id + " ohne Quelle")));

// Maße nur dort, wo sie belegt sind: nur ATX, microATX, Mini-ITX dürfen Zahlen mit Einheit enthalten
const einheit = /\d\s*(mm|cm|Zoll|MHz|GHz|W\b|Watt|GB|TB|Gbit)/;
D.teile.concat(D.sockel).forEach(x => ["funktion", "ort", "zusammen", "merk", "fakt"].forEach(k => assert(!einheit.test(x[k] || ""), x.id + "." + k + " enthält ein unbelegtes Maß")));
D.formen.forEach(x => assert(x.q.length > 0));
assert(D.formen[1].ort.includes("9,6 × 9,6 Zoll") && D.formen[1].ort.includes("Dezember 1997"));
assert(D.formen[2].ort.includes("170 × 170 mm") && D.formen[2].ort.includes("2001"));
assert(D.formen[0].ort.includes("12 × 9,6 Zoll"));

// Tastaturlogik (Pfeile, Rundlauf, Home/End)
assert.equal(e.naechsterIndex(0, "ArrowRight", 3), 1);
assert.equal(e.naechsterIndex(2, "ArrowRight", 3), 0);
assert.equal(e.naechsterIndex(0, "ArrowLeft", 3), 2);
assert.equal(e.naechsterIndex(1, "Home", 3), 0);
assert.equal(e.naechsterIndex(1, "End", 3), 2);
assert.equal(e.naechsterIndex(1, "a", 3), -1);
assert.equal(e.naechsterIndex(0, "ArrowDown", 0), -1);
assert.equal(e.finde(D.teile, "ssd").glossar, "SSD");
assert.equal(e.finde(D.teile, "x"), null);

// Seite: Container, die das Skript erwartet, Zugänglichkeit, kein Einhängen in Katalog
["pe-svg", "pe-teile", "pe-detail", "pe-sockel-wahl", "pe-sockel-detail", "pe-form-wahl", "pe-form-detail", "pe-quellenliste"].forEach(id => assert(html.includes('id="' + id + '"'), "HTML ohne " + id));
assert(html.includes('lang="de"') && html.includes("skip-link") && html.includes('aria-live="polite"'));
assert(html.includes('class="pe-zeichnung" aria-hidden="true"'), "Zeichnung ist nur Zusatz, Bedienung läuft über die Liste");
assert(html.includes("../js/pc-explorer.js") && html.includes("../css/pc-explorer.css"));
assert(css.includes(":focus-visible") && css.includes("min-height"));
for (const f of ["js/module-daten.js", "index.html"]) {
  const p = path.join(root, f);
  if (fs.existsSync(p)) assert(!fs.readFileSync(p, "utf8").includes("pc-explorer"), "PC-Explorer ist in " + f + " eingehängt");
}
console.log("pc-explorer: alle Prüfungen bestanden");
