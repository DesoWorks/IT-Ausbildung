"use strict";
const assert = require("node:assert/strict"), fs = require("node:fs"), path = require("node:path"), vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const js = fs.readFileSync(path.join(root, "js/pc-explorer.js"), "utf8");
const html = fs.readFileSync(path.join(root, "module/pc-explorer.html"), "utf8");
const css = fs.readFileSync(path.join(root, "css/pc-explorer.css"), "utf8");
const ctx = { module: { exports: {} } }; ctx.globalThis = ctx; vm.runInNewContext(js, ctx);
const e = ctx.module.exports, D = e.DATEN;

// Arrays aus dem vm-Kontext haben einen anderen Prototyp, daher Vergleich über JSON.
const gleich = (a, b) => assert.equal(JSON.stringify(a), JSON.stringify(b));

// Desktop: bisherige IDs plus gehaeuse
gleich(D.teile.map(t => t.id), ["cpu", "cool", "ram", "gpu", "ssd", "hdd", "psu", "board", "gehaeuse"]);
gleich(D.sockel.map(s => s.id), ["pga", "lga", "bga"]);
gleich(D.formen.map(f => f.id), ["atx", "microatx", "miniitx"]);

// Ansichten: Aliase zeigen auf dieselben Arrays, Notebook-IDs, Server nur als leerer Slot
assert(D.ansichten.desktop.teile === D.teile && D.ansichten.desktop.sockel === D.sockel && D.ansichten.desktop.formen === D.formen, "Aliase sind Referenzen auf Desktop-Daten");
gleich(D.ansichten.notebook.teile.map(t => t.id), ["board", "cpu", "cool", "ram", "gpu", "ssd", "akku", "netzteil", "gehaeuse"]);
gleich(D.ansichten.notebook.sockel, []);
gleich(D.ansichten.notebook.formen, []);
assert.equal(D.ansichten.server, null);
gleich(Object.keys(D.ansichten), ["desktop", "notebook", "server"]);

const alle = [].concat(D.ansichten.desktop.teile, D.ansichten.desktop.sockel, D.ansichten.desktop.formen, D.ansichten.notebook.teile);
const ids = l => l.map(x => x.id);
[D.teile, D.sockel, D.formen, D.ansichten.notebook.teile].forEach(l => assert.equal(new Set(ids(l)).size, l.length, "IDs je Liste eindeutig"));

// Pflichtfelder jedes Eintrags
alle.forEach(x => {
  ["name", "glossar"].forEach(k => assert(typeof x[k] === "string" && x[k].length >= 3, x.id + " fehlt " + k));
  ["funktion", "ort", "zusammen", "bauformen", "praxis", "merk"].forEach(k => assert(typeof x[k] === "string" && x[k].length > 10, x.id + " fehlt " + k));
  assert.equal(typeof x.fakt, "string", x.id + ": fakt ist ein String");
  assert(Array.isArray(x.q) || JSON.stringify(x.q)[0] === "[", x.id + ": q ist ein Array");
});

// Layouts der Bauteile: endlich, positiv, im SVG-Viewbox 640 × 400
[D.teile, D.ansichten.notebook.teile].forEach(l => l.forEach(t => {
  assert.equal(t.layout.length, 4, t.id);
  t.layout.forEach(n => assert(Number.isFinite(n), t.id));
  assert(t.layout[2] > 0 && t.layout[3] > 0 && t.layout[0] >= 0 && t.layout[1] >= 0, t.id + " Layout");
  assert(t.layout[0] + t.layout[2] <= 640 && t.layout[1] + t.layout[3] <= 400, t.id + " liegt außerhalb der Zeichnung");
}));

// Zeichenreihenfolge: Gehäuse, dann Mainboard, dann der Rest
gleich(e.zeichenReihenfolge(D.teile).map(t => t.id).slice(0, 2), ["gehaeuse", "board"]);
gleich(e.zeichenReihenfolge(D.ansichten.notebook.teile).map(t => t.id).slice(0, 2), ["gehaeuse", "board"]);
// Das Mainboard liegt im Gehäuse. Die Teile, die darüber gezeichnet werden, sind nicht identisch mit dem Hintergrund.
const gh = e.finde(D.teile, "gehaeuse").layout, bd = e.finde(D.teile, "board").layout;
assert(bd[0] >= gh[0] && bd[1] >= gh[1] && bd[0] + bd[2] <= gh[0] + gh[2] && bd[1] + bd[3] <= gh[1] + gh[3], "Mainboard liegt im Gehäuse");

// Quellenbindung: jede Quellen-ID existiert, belegte Fakten haben mindestens eine Quelle
alle.forEach(x => x.q.forEach(q => { assert(D.quellen[q], x.id + " verweist auf unbekannte Quelle " + q); }));
alle.forEach(x => { if (x.fakt) assert(x.q.length > 0, x.id + ": Fakt ohne Quelle"); });
Object.values(D.quellen).forEach(q => { assert.match(q.url, /^https:\/\//); assert(q.abruf); assert(q.titel); });
["sockel", "formen"].forEach(k => D[k].forEach(x => assert(x.q.length > 0, x.id + " ohne Quelle")));
// Wikipedia ist vorläufig, nicht Norm
Object.values(D.quellen).filter(q => /wikipedia\.org/.test(q.url)).forEach(q => assert.equal(q.vorlaeufig, true, q.url + " muss vorläufig sein"));

// Maße nur dort, wo sie belegt sind: nur ATX, microATX, Mini-ITX dürfen Zahlen mit Einheit in ort enthalten
const einheit = /\d\s*(mm|cm|Zoll|MHz|GHz|W\b|Watt|GB|TB|Gbit)/;
const lernfelder = ["funktion", "ort", "zusammen", "bauformen", "praxis", "merk", "fakt"];
D.teile.concat(D.sockel, D.ansichten.notebook.teile).forEach(x => lernfelder.forEach(k => assert(!einheit.test(x[k] || ""), x.id + "." + k + " enthält ein unbelegtes Maß")));
D.formen.forEach(x => ["funktion", "zusammen", "bauformen", "praxis", "merk", "fakt"].forEach(k => assert(!einheit.test(x[k] || ""), x.id + "." + k + " enthält ein Maß")));
D.formen.forEach(x => assert(x.q.length > 0));
assert(D.formen[1].ort.includes("9,6 × 9,6 Zoll") && D.formen[1].ort.includes("Dezember 1997"));
assert(D.formen[2].ort.includes("170 × 170 mm") && D.formen[2].ort.includes("2001"));
assert(D.formen[0].ort.includes("12 × 9,6 Zoll"));

// Verbotene Angaben: Steckerhöhen der JEDEC-Pressemitteilung, IBM-Maße, Wattzahlen, Pinzahlen
const alleTexte = JSON.stringify(D.ansichten) + JSON.stringify(D.quellen);
["2,85 mm", "7,5 mm", "133,35", "67,6", "2.85", "7.5 mm"].forEach(s => assert(!alleTexte.includes(s), "verbotene Angabe: " + s));
assert(!/\d+\s*-?\s*(Pin|Pins|polig)\b/i.test(alleTexte), "Pinzahl im Lerntext");
assert(!/\d+\s*(W|Watt)\b/.test(alleTexte), "Wattzahl im Lerntext");

// Notebook: Lerntexte
const nb = id => e.finde(D.ansichten.notebook.teile, id);
const nbRam = lernfelder.map(k => nb("ram")[k]).join(" ");
assert(nbRam.includes("JESD318"), "JESD318 im Notebook-RAM-Text");
assert(nbRam.includes("nicht austauschbar"), "„nicht austauschbar“ im Notebook-RAM-Text");
assert(nbRam.includes("Der vollständige Standardtext wurde nicht geöffnet; die Aussage stammt aus der Pressemitteilung."));
assert(nb("ram").fakt.startsWith("JEDEC hat am 5. Dezember 2023 den Standard JESD318 veröffentlicht"));
assert(nb("ram").q.includes("camm2") && nb("ram").q.includes("ibm-dimm"));
assert(/verlötet/i.test(nb("ram").bauformen) && /SO-DIMM/.test(nb("ram").bauformen) && /CAMM2/.test(nb("ram").bauformen));
assert(/modell/i.test(nb("gpu").bauformen) && /modell/i.test(nb("netzteil").bauformen), "GPU und Netzteil sind modellabhängig");
assert(/nicht automatisch SATA oder NVMe/.test(nb("ssd").bauformen) && /nicht automatisch SATA oder NVMe/.test(e.finde(D.teile, "ssd").bauformen));
// Keine Kompatibilitätszusage in neuen Notebook-Texten
D.ansichten.notebook.teile.forEach(x => lernfelder.forEach(k => assert(!/passt immer|ist kompatibel|immer kompatibel|garantiert/i.test(x[k]), x.id + "." + k + " enthält Kompatibilitätszusage")));
// Gehäuse trennt externe und interne Anschlüsse
const geh = e.finde(D.teile, "gehaeuse");
assert(geh.anschluesse.aussen.length >= 4 && geh.anschluesse.innen.length >= 1);
// BGA nicht als „unmöglich“ bezeichnen
assert(!/unmöglich/i.test(JSON.stringify(D.sockel)));

// Tastaturlogik (Pfeile, Rundlauf, Home/End)
assert.equal(e.naechsterIndex(0, "ArrowRight", 3), 1);
assert.equal(e.naechsterIndex(2, "ArrowRight", 3), 0);
assert.equal(e.naechsterIndex(0, "ArrowLeft", 3), 2);
assert.equal(e.naechsterIndex(2, "ArrowDown", 3), 0);
assert.equal(e.naechsterIndex(0, "ArrowUp", 3), 2);
assert.equal(e.naechsterIndex(1, "Home", 3), 0);
assert.equal(e.naechsterIndex(1, "End", 3), 2);
assert.equal(e.naechsterIndex(1, "a", 3), -1);
assert.equal(e.naechsterIndex(0, "ArrowDown", 0), -1);
assert.equal(e.naechsterIndex(0, "ArrowRight", 1), 0);
assert.equal(e.naechsterIndex(0, "End", 1), 0);
assert.equal(e.finde(D.teile, "ssd").glossar, "SSD");
assert.equal(e.finde(D.teile, "x"), null);

// Glossarlink nur bei vorhandenem Begriff
assert.equal(e.glossarVorhanden([{ begriff: "Monitor", erklaerung: "x" }], "Monitor"), true);
assert.equal(e.glossarVorhanden([{ begriff: "Monitor" }], "CPU"), false);
assert.equal(e.glossarVorhanden(undefined, "CPU"), false);
assert.equal(e.glossarVorhanden([], ""), false);
assert.equal(e.glossarVorhanden(null, "CPU"), false);
// Das echte Glossar: Link nur, wenn der Begriff dort wirklich steht (liest die Datei nur)
const gctx = { window: {} }; vm.runInNewContext(fs.readFileSync(path.join(root, "js/glossar-daten.js"), "utf8"), gctx);
const echt = gctx.window.GLOSSAR;
assert(Array.isArray(echt) && echt.length > 0);
alle.forEach(x => assert.equal(e.glossarVorhanden(echt, x.glossar), echt.some(g => g.begriff === x.glossar)));

// Seite: Container, die das Skript erwartet, Zugänglichkeit, kein Einhängen in Katalog
["pe-svg", "pe-teile", "pe-detail", "pe-sockel-wahl", "pe-sockel-detail", "pe-form-wahl", "pe-form-detail", "pe-quellenliste",
  "pe-ansichten", "pe-titel", "pe-einleitung", "pe-abschnitt-sockel", "pe-abschnitt-form"].forEach(id => assert(html.includes('id="' + id + '"'), "HTML ohne " + id));
assert(html.includes('lang="de"') && html.includes("skip-link") && html.includes('aria-live="polite"'));
assert(html.includes('class="pe-zeichnung" aria-hidden="true"'), "Zeichnung ist nur Zusatz, Bedienung läuft über die Liste");
assert(html.includes("../js/pc-explorer.js") && html.includes("../css/pc-explorer.css"));
// Ansichtsbuttons: Desktop und Notebook, genau einer gedrückt, kein Server-Button
assert(html.includes('data-ansicht="desktop" aria-pressed="true"') && html.includes('data-ansicht="notebook" aria-pressed="false"'));
assert.equal((html.match(/data-ansicht="/g) || []).length, 2);
assert(!/data-ansicht="server"/i.test(html) && !/<button[^>]*>\s*Server/i.test(html), "Kein Server-Button");
assert(/<script src="\.\.\/js\/glossar-daten\.js"><\/script>[\s\S]*pc-explorer\.js/.test(html), "Glossar wird vor dem Explorer geladen");
assert(css.includes(":focus-visible") && css.includes("min-height"));
assert(!/animation|transition|@keyframes/.test(css), "Keine Animationen");
assert(!/https?:\/\//.test(js.replace(/url: "https:\/\/[^"]+"/g, "").replace('var NS = "http://www.w3.org/2000/svg";', "")), "Keine Laufzeit-Abfrage externer Adressen (SVG-Namespace-Kennung ausgenommen)");
assert(!/fetch\(|XMLHttpRequest|import\(/.test(js), "Läuft offline");
for (const f of ["js/module-daten.js", "index.html"]) {
  const p = path.join(root, f);
  if (fs.existsSync(p)) assert(!fs.readFileSync(p, "utf8").includes("pc-explorer"), "PC-Explorer ist in " + f + " eingehängt");
}
console.log("pc-explorer: alle Prüfungen bestanden");
