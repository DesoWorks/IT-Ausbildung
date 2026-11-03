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
gleich(D.formen.map(f => f.id), ["atx", "microatx", "miniitx", "eatx", "btx"]);

// Ansichten: Aliase zeigen auf dieselben Arrays, Notebook-IDs, Server nur als leerer Slot
assert(D.ansichten.desktop.teile === D.teile && D.ansichten.desktop.sockel === D.sockel && D.ansichten.desktop.formen === D.formen, "Aliase sind Referenzen auf Desktop-Daten");
gleich(D.ansichten.notebook.teile.map(t => t.id), ["board", "cpu", "cool", "ram", "gpu", "ssd", "akku", "netzteil", "gehaeuse"]);
gleich(D.ansichten.notebook.sockel, []);
gleich(D.ansichten.notebook.formen, []);
assert.equal(D.ansichten.server, null);
gleich(Object.keys(D.ansichten), ["desktop", "notebook", "rueckseite", "mainboard", "historisch", "server"]);

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
  assert(t.layout[0] + t.layout[2] <= 780 && t.layout[1] + t.layout[3] <= 480, t.id + " liegt außerhalb der Zeichnung");
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
D.teile.concat(D.sockel, D.ansichten.notebook.teile).forEach(x => lernfelder.forEach(k => {
  if (x.id === "ssd" && k === "fakt") return;
  const text = (x[k] || "").replaceAll("2,5-Zoll", "");
  assert(!einheit.test(text), x.id + "." + k + " enthält ein unbelegtes Maß: " + text);
}));
assert(e.finde(D.teile, "ssd").fakt.includes("22 mm") && e.finde(D.teile, "ssd").fakt.includes("Vorläufig"));
D.formen.forEach(x => ["funktion", "zusammen", "bauformen", "praxis", "merk", "fakt"].forEach(k => assert(!einheit.test(x[k] || ""), x.id + "." + k + " enthält ein Maß")));
D.formen.forEach(x => assert(x.q.length > 0));
assert(D.formen[1].ort.includes("244 × 244 mm") && D.formen[1].ort.includes("Dezember 1997"));
assert(D.formen[2].ort.includes("170 × 170 mm") && D.formen[2].ort.includes("2001"));
assert(D.formen[0].ort.includes("305 × 244 mm") && !/Zoll/.test(D.formen[0].ort));
assert(e.finde(D.formen, "eatx").ort.includes("nicht für jedes Board"));
assert(e.finde(D.formen, "btx").funktion.includes("2006") && e.finde(D.formen, "btx").merk.includes("historisch"));
assert.equal(e.finde(D.teile, "psu").name, "Netzteil (PSU)");
assert.equal(e.finde(D.ansichten.notebook.teile, "netzteil").name, "Externes Netzteil");
assert(!/Systemplatine/.test(js));

// Verbotene Angaben: Steckerhöhen der JEDEC-Pressemitteilung, IBM-Maße, Wattzahlen, Pinzahlen
const alleTexte = JSON.stringify(D.ansichten) + JSON.stringify(D.quellen);
["2,85 mm", "7,5 mm", "133,35", "67,6", "2.85", "7.5 mm"].forEach(s => assert(!alleTexte.includes(s), "verbotene Angabe: " + s));
// Erlaubt sind Pinzahlen nur in den Namen von atx24 und eps (Bezeichnung des Steckers), nirgends sonst.
const ohneErlaubteNamen = alleTexte.replace('"name":"24-Pin-ATX"', '"name":"ATX"').replace('"name":"4-/8-Pin-EPS"', '"name":"EPS"');
assert(!/\d+\s*-?\s*(Pin|Pins|polig)\b/i.test(ohneErlaubteNamen), "Pinzahl im Lerntext");
assert(alleTexte.includes('"name":"24-Pin-ATX"') && alleTexte.includes('"name":"4-/8-Pin-EPS"'), "Namen atx24 und eps tragen die Pinbezeichnung");
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

// Seite: Container, die das Skript erwartet, Zugänglichkeit, Einhängen nur über den Werkzeugkatalog
["pe-svg", "pe-teile", "pe-detail", "pe-sockel-wahl", "pe-sockel-detail", "pe-form-wahl", "pe-form-detail", "pe-quellenliste",
  "pe-ansichten", "pe-titel", "pe-einleitung", "pe-abschnitt-sockel", "pe-abschnitt-form"].forEach(id => assert(html.includes('id="' + id + '"'), "HTML ohne " + id));
assert(html.includes('lang="de"') && html.includes("skip-link") && html.includes('aria-live="polite"'));
assert(html.includes('id="pe-teile"') && html.includes('id="pe-svg"') && html.includes('id="pe-detail"'), "Liste, Abbildung und Erklärung bleiben nebeneinander");
assert(!html.includes('aria-hidden="true"><svg id="pe-svg"'), "Abbildung ist bedienbar, nicht versteckt");
assert(js.includes('role: "button"'), "Bauteile in der Abbildung sind Schaltflächen");
assert(html.includes('id="pe-abschnitt-sockel" class="abschnitt" hidden'));
assert(html.includes('id="pe-abschnitt-form" class="abschnitt" hidden'));
assert(html.includes('id="pe-abschnitt-rueck"') && html.includes("kein Formfaktor") && html.includes("Project Zero"));
assert(html.includes('id="pe-kuehler"'));
assert(html.includes("../js/pc-explorer.js") && html.includes("../css/pc-explorer.css"));
// Ansichtsbuttons: Desktop und Notebook, genau einer gedrückt, kein Server-Button
assert(html.includes('data-ansicht="desktop" aria-pressed="true"') && html.includes('data-ansicht="notebook" aria-pressed="false"'));
assert.equal((html.match(/data-ansicht="/g) || []).length, 5);
["rueckseite", "mainboard", "historisch"].forEach(k => assert(html.includes('data-ansicht="' + k + '" aria-pressed="false"'), "Knopf " + k));
assert.equal((html.match(/aria-pressed="true"/g) || []).length, 1, "Nur der Desktop-Knopf ist anfangs gedrückt");
assert(!/data-ansicht="server"/i.test(html) && !/<button[^>]*>\s*Server/i.test(html), "Kein Server-Button");
assert(/<script src="\.\.\/js\/glossar-daten\.js"><\/script>[\s\S]*pc-explorer\.js/.test(html), "Glossar wird vor dem Explorer geladen");
assert(css.includes(":focus-visible") && css.includes("min-height"));
assert(!/animation|transition|@keyframes/.test(css), "Keine Animationen");
assert(!/https?:\/\//.test(js.replace(/(?:url|lizenzUrl|commonsUrl): "https:\/\/[^"]+"/g, "").replace('var NS = "http://www.w3.org/2000/svg";', "")), "Keine Laufzeit-Abfrage externer Adressen (SVG-Namespace-Kennung ausgenommen)");
assert(!/fetch\(|XMLHttpRequest|import\(/.test(js), "Läuft offline");
const katalog = fs.readFileSync(path.join(root, "js/module-daten.js"), "utf8");
assert(katalog.includes('id: "pc-explorer"') && katalog.includes('page: "pc-explorer"') && katalog.includes("module/pc-explorer.html"), "PC-Explorer ist im Werkzeugkatalog");
assert.equal((katalog.match(/id: "pc-explorer"/g) || []).length, 1, "PC-Explorer genau einmal im Katalog");
assert(!fs.readFileSync(path.join(root, "index.html"), "utf8").includes("pc-explorer"), "Startseite hängt den Explorer nicht fest ein");

// Echte Commons-Fotos: unveränderte Dateien, Pflichtangaben in den Daten, sichtbar gerendert
const crypto = require("node:crypto");
const FOTOS = {
  pga: { sha1: "00d6c8a69c0f158069f20b50a70c0ff72b6b3435", datei: "Pentium_4_Underside_Demonstrating_PGA_Socket.JPG", urheber: "Liam McSherry", lizenz: "CC BY-SA 3.0", liz: "https://creativecommons.org/licenses/by-sa/3.0", satz: "Echtes Foto der Unterseite eines Pentium 4 von 2001" },
  lga: { sha1: "3778212eeefb306283b8ee64769d2beb2d0b5e86", datei: "LGA_1155_socket-6510.jpg", urheber: "Raimond Spekking", lizenz: "CC BY-SA 4.0", liz: "https://creativecommons.org/licenses/by-sa/4.0", satz: "Echtes Foto eines konkreten LGA-1155-Sockels" },
  bga: { sha1: "b72874d4e9ab150756fb52fa2e123625a21b461c", datei: "Solder_ball_grid.jpg", urheber: "Janke", lizenz: "CC BY-SA 3.0", liz: "https://creativecommons.org/licenses/by-sa/3.0", satz: "nicht die Unterseite einer vollständigen CPU" }
};
Object.keys(FOTOS).forEach(id => {
  const w = FOTOS[id], f = e.finde(D.sockel, id).foto;
  assert(f, id + " ohne foto");
  const abs = path.resolve(root, "module", f.pfad);
  assert(fs.existsSync(abs), id + ": Foto fehlt");
  assert.equal(crypto.createHash("sha1").update(fs.readFileSync(abs)).digest("hex"), w.sha1, id + ": Foto verändert");
  assert.equal(path.basename(abs), w.datei);
  assert.equal(f.urheber, w.urheber); assert.equal(f.lizenz, w.lizenz); assert.equal(f.lizenzUrl, w.liz);
  assert.equal(f.commonsUrl, "https://commons.wikimedia.org/wiki/File:" + w.datei);
  assert(f.alt.length > 10, id + ": Alt-Text");
  assert(f.unterschrift.includes(w.satz), id + ": Pflichtsatz");
  assert(f.unterschrift.includes(w.urheber) && f.unterschrift.includes(w.lizenz), id + ": Namensnennung in Unterschrift");
});
assert(e.finde(D.sockel, "lga").foto.unterschrift.includes("©"));
D.ansichten.notebook.teile.forEach(t => assert(!t.foto, "Notebook hat kein freigegebenes Bild"));
assert(/baueFoto/.test(js) && /figcaption/.test(js) && /pe-bildhinweis/.test(html));
assert(/object-fit:\s*contain/.test(css) && /max-width:\s*100%/.test(css));
assert(!/konzept|hardware-konzept/i.test(js + html), "Konzeptgrafik nicht eingebunden");
// Zeichnung: Kabel sind nur Deko (versteckt, nicht fokussierbar, nicht anklickbar); Auswahl ist ohne Farbe als Umrandung erkennbar
assert(/pe-kabelschicht", "aria-hidden": "true"/.test(js), "Kabelschicht ist aria-hidden");
assert(/\.pe-kabelschicht[^{]*\{\s*pointer-events:\s*none/.test(css), "Kabel nicht anklickbar");
assert(/\.pe-rahmen\.pe-aktiv\s*\{[^}]*stroke-dasharray/.test(css), "Auswahlrahmen gestrichelt, nicht nur Farbe");
assert(/\.pe-etikett\.pe-aktiv \.pe-label-platte\s*\{[^}]*stroke-width:\s*4/.test(css), "Aktives Etikett mit dickerem Rahmen");
assert(!/<img[^>]*pe-svg|background-image/.test(html + css), "Kein Hintergrundbild unter der Zeichnung");
// Zusatzinfo-Zustand: je Ansicht und Bauteil gemerkt, nur der genannte Schlüssel wird umgeschaltet
{
  const sp = {};
  assert.equal(e.fachOffen(sp, "desktop", "cpu", "pe-abschnitt-sockel"), false, "fehlend = zu");
  assert.equal(e.fachUmschalten(sp, "desktop", "cpu", "pe-abschnitt-sockel"), true);
  assert.equal(e.fachOffen(sp, "desktop", "cpu", "pe-abschnitt-sockel"), true);
  assert.equal(e.fachOffen(sp, "desktop", "board", "pe-abschnitt-sockel"), false, "anderes Bauteil bleibt zu");
  assert.equal(e.fachOffen(sp, "notebook", "cpu", "pe-abschnitt-sockel"), false, "andere Ansicht bleibt zu");
  assert.equal(e.fachOffen(sp, "desktop", "cpu", "pe-abschnitt-form"), false, "anderer Abschnitt bleibt zu");
  assert.equal(e.fachUmschalten(sp, "desktop", "board", "pe-abschnitt-form"), true);
  assert.equal(e.fachOffen(sp, "desktop", "cpu", "pe-abschnitt-sockel"), true, "CPU-Zustand bleibt beim Wechsel erhalten");
  assert.equal(e.fachOffen(sp, "desktop", "cpu", "pe-abschnitt-form"), false, "CPU öffnet keine Formfaktoren");
  assert.equal(e.fachUmschalten(sp, "desktop", "cpu", "pe-abschnitt-sockel"), false, "zweites Umschalten schließt");
  assert.equal(e.fachOffen(sp, "desktop", "board", "pe-abschnitt-form"), true, "Board-Zustand unberührt");
  assert.equal(e.fachBeschriftung("Formfaktoren anzeigen", false), "Formfaktoren anzeigen");
  assert.equal(e.fachBeschriftung("Formfaktoren anzeigen", true), "Formfaktoren ausblenden");
  assert.equal(e.fachBeschriftung("anzeigen anzeigen", true), "anzeigen ausblenden", "nur das Wort am Ende wechselt");
  assert.equal(e.fachBeschriftung("Text ohne Endung", true), "Text ohne Endung");
}
assert(/fachUmschalten\(/.test(js) && /aria-expanded/.test(js) && /aria-controls/.test(js), "Knopf nutzt Zustand und ARIA");
assert(/Anschlüsse auf der Rückseite anzeigen/.test(js) && /Formfaktoren anzeigen/.test(js) && /CPU-Bauformen anzeigen/.test(js));

// Notebook-Fachtexte
const nbFelder = id => lernfelder.map(k => nb(id)[k]).join(" ");
assert(nb("cpu").bauformen.includes("BGA") && nb("cpu").bauformen.includes("Ausnahme"), "Notebook-CPU: BGA und Ausnahme");
assert(!nbFelder("cpu").includes("typische Notebook-Sockel"), "Desktop-Sockel nicht als Notebook-Sockel");
assert(nb("gpu").bauformen.includes("Integrierte Grafik") && nb("gpu").bauformen.includes("separate Grafiklösung"), "Notebook-GPU: integriert und separat");
assert(!/LPCAMM2/.test(js), "LPCAMM2 ist nicht belegt");
const rl = nb("ram").layout;
assert(rl[2] / rl[3] >= 1.8 && rl[2] / rl[3] <= 2.6, "Notebook-RAM-Layout: Breite zu Höhe zwischen 1,8 und 2,6");
const ngh = e.finde(D.ansichten.notebook.teile, "gehaeuse").layout;
const nbb = nb("board").layout;
assert(rl[0] >= nbb[0] && rl[1] >= nbb[1] && rl[0] + rl[2] <= nbb[0] + nbb[2] && rl[1] + rl[3] <= nbb[1] + nbb[3], "Notebook-RAM liegt auf dem Mainboard");
assert(nb("cpu").layout[0] >= ngh[0] && nb("cool").layout[0] + nb("cool").layout[2] <= ngh[0] + ngh[2], "Notebook-Kühlung liegt im Gehäuse");

// Desktop-Anordnung: HDD im Laufwerkskäfig unter der Grafikkarte, Netzteil unten im Gehäuse
{
  const hd = e.finde(D.teile, "hdd"), gp = e.finde(D.teile, "gpu"), ps = e.finde(D.teile, "psu");
  const innen = (l, o) => l[0] >= o[0] && l[1] >= o[1] && l[0] + l[2] <= o[0] + o[2] && l[1] + l[3] <= o[1] + o[3];
  assert(innen(hd.layout, gh) && innen(ps.layout, gh), "HDD und Netzteil liegen im Gehäuse");
  assert(hd.layout[1] >= gp.layout[1] + gp.layout[3], "HDD liegt unter der Grafikkarte");
  assert(ps.layout[1] > bd[1] + bd[3] && hd.layout[0] > ps.layout[0], "Netzteil unten im Gehäuse, HDD weiter hinten als das Netzteil");
  assert(hd.bauformen.includes("Laufwerksschacht") && hd.bauformen.includes("Konkrete Maße stehen hier nicht"));
}

// Seite und Stil
assert(!html.includes("im Auftrag") && !html.includes("nicht lesbar"), "Kein Auftragsvermerk und keine Zugriffsnotiz im Lerntext");
assert(!/ASUS|Gigabyte/.test(html), "ASUS und Gigabyte nicht als geprüfte Produkte genannt");
assert(/<div class="pe-erklaerung">[\s\S]*id="pe-detail"[\s\S]*id="pe-abschnitt-sockel"[\s\S]*id="pe-abschnitt-form"[\s\S]*id="pe-abschnitt-rueck"/.test(html), "Erklärung samt Vertiefungen im Erklärungsbereich");
assert(css.includes("grid-area: erklaerung"), "Erklärung über die volle Breite");
assert(/\.pe-abdeckung\s*\{[^}]*pointer-events:\s*none/.test(css), "Kühlabdeckung fängt keine Klicks ab");
assert(/\.pe-kuehler-offen \.pe-abdeckung\s*\{[^}]*opacity/.test(css), "Abdeckung wird mit der Kühlung durchsichtig");
assert(/@media \(max-width: 600px\)[^}]*\{\s*\.pe-etiketten\s*\{\s*display:\s*none/.test(css), "Etiketten unter 600px ausgeblendet");
assert(/@media \(max-width: 600px\)\s*\{\s*\.pe-breit \.pe-etiketten\s*\{\s*display:\s*(inline|block|initial)/.test(css), "Mainboard/Rückseite (pe-breit): nummerierte Marken bleiben unter 600px sichtbar");
assert(js.includes("pe-kaefig") && js.includes("pe-abdeckung"), "Käfig und Kühlabdeckung in der Zeichnung");

// Anschlussansichten: Rückseite, Mainboard, historische Technik
{
  const A = D.ansichten, R = A.rueckseite.teile, M = A.mainboard.teile, H = A.historisch.teile;
  gleich(R.map(t => t.id), ["usb-a", "usb-c", "usb2", "usb3", "usb4", "rj45", "audio", "hdmi-mb", "dp-mb", "ps2", "wlan", "hdmi-gpu", "dp-gpu"]);
  gleich(M.map(t => t.id), ["atx24", "eps", "pcie-lang", "pcie-kurz", "m2", "sata", "ramslot", "cpu-fan", "sys-fan", "aio", "usb-header", "frontpanel", "front-audio", "rgb", "argb"]);
  gleich(H.map(t => t.id), ["ide", "pci", "agp"]);
  H.forEach(t => assert.equal(t.gruppe, "historisch", t.id));
  ["hdmi-gpu", "dp-gpu"].forEach(id => assert.equal(e.finde(R, id).gruppe, "erweiterungskarte", id));
  assert.equal(e.finde(R, "usb-a").gruppe, "mainboard-io");
  [R, M].forEach(l => l.forEach(t => assert(!H.some(h => h.id === t.id), t.id + " ist historisch und gehört nicht in aktuelle Ansichten")));
  [R, M].forEach(l => l.forEach(t => assert.notEqual(t.gruppe, "historisch", t.id)));
  ["rueckseite", "mainboard", "historisch"].forEach(k => {
    const a = A[k];
    ["name", "titel", "gruppe", "einleitung"].forEach(f => assert(typeof a[f] === "string" && a[f].length > 3, k + "." + f));
    gleich(a.sockel, []); gleich(a.formen, []);
    assert.equal(new Set(ids(a.teile)).size, a.teile.length, k + " IDs eindeutig");
    a.teile.forEach(x => {
      ["name", "kurz", "glossar"].forEach(f => assert(typeof x[f] === "string" && x[f].length >= 2, x.id + " fehlt " + f));
      ["funktion", "ort", "zusammen", "bauformen", "praxis", "merk"].forEach(f => assert(typeof x[f] === "string" && x[f].length > 10, x.id + " fehlt " + f));
      assert.equal(typeof x.fakt, "string");
      assert(Array.isArray(x.q) || JSON.stringify(x.q)[0] === "[", x.id + ": q ist ein Array");
      x.q.forEach(q => assert(D.quellen[q], x.id + " verweist auf unbekannte Quelle " + q));
      if (x.fakt) assert(x.q.length > 0, x.id + ": Fakt ohne Quelle");
      assert.equal(x.layout.length, 4, x.id);
      x.layout.forEach(n => assert(Number.isFinite(n), x.id));
      assert(x.layout[2] > 0 && x.layout[3] > 0 && x.layout[0] >= 0 && x.layout[1] >= 0, x.id + " Layout");
      assert(x.layout[0] + x.layout[2] <= 780 && x.layout[1] + x.layout[3] <= 480, x.id + " liegt außerhalb der Zeichnung");
    });
  });
  assert(/Beispiel/.test(A.rueckseite.einleitung) && /nicht jeder PC/i.test(A.rueckseite.einleitung), "Rückseite: Beispiel-Hinweis");
  assert(/nicht zur typischen Ausstattung aktueller Mainboards/.test(A.historisch.einleitung), "Historisch: Abgrenzung");
  ["Anschluss", "Steckplatz", "Schnittstelle", "Protokoll", "Bauform"].forEach(w => assert(A.mainboard.einleitung.includes(w), "Mainboard-Einleitung ohne " + w));
  // Pinzahlen nur in den Namen von atx24 und eps, keine Voltwerte
  const neuTexte = JSON.stringify(R.concat(M, H).map(t => { const c = Object.assign({}, t); if (t.id === "atx24" || t.id === "eps") delete c.name; return c; }));
  assert(!/\d+\s*(?:-|\/)?\s*\d*\s*-?\s*(Pin|Pins|polig)\b/i.test(neuTexte), "Pinzahl außerhalb von atx24/eps-Namen");
  assert(!/\d+([.,]\d+)?\s*(V|Volt)\b/.test(neuTexte), "Voltwert im Lerntext");
  assert(!/passt immer|ist kompatibel|immer kompatibel|garantiert/i.test(neuTexte), "Kompatibilitätszusage");
  // Verdrahtung in der Darstellung
  assert(js.includes("zeichneAnschlussTeil") && js.includes("istAnschlussAnsicht"), "Anschlussteile werden eigens gezeichnet");
  assert(js.includes("a.teile[0].id") && !js.includes('gruppeTeile.waehle("cpu")'), "Erste Auswahl nicht fest cpu");
  ["pe-io-mb", "pe-io-karte", "pe-io-intern", "pe-io-alt"].forEach(k => assert(css.includes(k), "CSS " + k));
  assert(/pe-io-mb\s*\{[^}]*stroke-width:\s*2/.test(css), "2px Kontur");
  ["function buchseUsbA", "function buchseUsbC", "function buchseRj45", "function buchseKlinke", "function buchseHdmi", "function buchseDisplayPort", "function buchsePs2", "function buchseAntenne", "function steckplatzPcie", "function leisteIde", "function kopfZweireihig"].forEach(fn => assert(js.includes(fn), fn));
  assert(js.includes("didaktische Näherung"), "Näherung ist im Modul benannt");
  assert(/USB-A und USB-C sind Steckerformen/.test(D.ansichten.rueckseite.einleitung));
  assert(/keine eigenen Buchsenformen/.test(D.ansichten.rueckseite.einleitung));
  assert(/didaktische Konvention, keine belegte Normfarbe/.test(D.ansichten.historisch.einleitung));
  assert(!/function zeichneAnschlussTeil[\s\S]{0,400}svgRect\(g, x, y, w, h, "pe-haupt/.test(js), "Anschlussteile sind keine Einheitsrechtecke mehr");
}

// Grafikphase 3: ATX-Maß, Anschlusslage, Überlappungsfreiheit (Daten und Quelltext, ohne Browser)
{
  const sch = (a, b) => a[0] < b[0] + b[2] && b[0] < a[0] + a[2] && a[1] < b[1] + b[3] && b[1] < a[1] + a[3];
  assert(/var MB = \{ x0: 60, y0: 48, k: 1\.25 \}/.test(js), "Mainboard-Maßstab 1,25 px je mm");
  assert(/r\(0, 0, 244, 305, "pe-platine"/.test(js), "Platine im ATX-Höchstmaß: 244 mm breit, 305 mm hoch (I/O links, Hochformat)");
  assert(!/r\(0, 0, 305, 244, "pe-platine"/.test(js), "keine Querformat-Platine mehr");
  assert(/Platine im Maß 244 × 305 mm/.test(js) && js.includes("Kühlkörper, Batterie und Chips sind Dekoration"), "Maß und Dekoration sind benannt");
  const board = [60, 48, 244 * 1.25, 305 * 1.25];
  assert(board[3] / board[2] > 1.24 && board[3] / board[2] < 1.26, "Platine ist hoch: Höhe/Breite = 305/244");
  assert(board[1] + board[3] < 480, "Platine passt in die viewBox");
  const mt = D.ansichten.mainboard.teile;
  mt.forEach(t => {
    assert(t.layout[0] >= board[0] && t.layout[1] >= board[1] && t.layout[0] + t.layout[2] <= board[0] + board[2] && t.layout[1] + t.layout[3] <= board[1] + board[3], t.id + " liegt auf der Platine");
  });
  for (let i = 0; i < mt.length; i++) for (let j = i + 1; j < mt.length; j++) assert(!sch(mt[i].layout, mt[j].layout), "Mainboard-Teile überlappen: " + mt[i].id + "/" + mt[j].id);
  const lx = id => e.finde(mt, id).layout;
  assert(lx("eps")[1] < lx("ramslot")[1] + 20 && lx("eps")[0] < lx("ramslot")[0], "EPS oben links neben dem Sockel");
  assert(lx("atx24")[0] > lx("ramslot")[0] + lx("ramslot")[2], "ATX24 rechts von den RAM-Steckplätzen");
  assert(lx("atx24")[1] + lx("atx24")[3] < board[1] + board[3] * 0.75, "ATX24 nicht am unteren Rand");
  assert(lx("pcie-lang")[1] > lx("pcie-kurz")[1], "langer PCIe-Slot liegt unterhalb des kurzen");
  assert(/oberhalb des langen/.test(e.finde(mt, "pcie-kurz").ort) && !/Unter dem langen/.test(e.finde(mt, "pcie-kurz").ort), "ort-Text passt zur Lage");
  assert(lx("ramslot")[3] > lx("ramslot")[2] * 3, "RAM-Steckplätze stehen senkrecht");
  assert(lx("pcie-lang")[2] > lx("pcie-lang")[3] * 4, "PCIe-Steckplätze liegen waagerecht");
  assert(lx("pcie-lang")[2] > lx("pcie-kurz")[2], "x16-Slot länger als x1-Slot");
  assert(lx("sata")[1] > lx("atx24")[1] + lx("atx24")[3], "SATA unten rechts");
  ["front-audio", "usb-header", "frontpanel"].forEach(id => assert(lx(id)[1] > board[1] + board[3] * 0.85, id + " am Unterrand"));
  // Rückseite: Buchsen überlappen weder untereinander noch mit der Beschriftung der anderen
  const rt = D.ansichten.rueckseite.teile;
  const beschr = t => [t.layout[0] - 4, t.layout[1] + t.layout[3] + 6, t.layout[2] + 8, 22];
  rt.forEach(a => rt.forEach(b => {
    if (a === b) return;
    assert(!sch(a.layout, b.layout), "Rückseite: " + a.id + " überlappt " + b.id);
    assert(!sch(beschr(a), b.layout), "Rückseite: Beschriftung von " + a.id + " liegt auf " + b.id);
  }));
  ["usb-a", "usb-c", "hdmi-mb", "dp-mb", "rj45", "audio", "ps2"].forEach(id => assert(e.finde(rt, id), "Rückblende enthält " + id));
  // Farben: nur Herstellerbeispiel, keine Norm; USB-Farbe sagt nichts über den Standard
  assert(/ASUS-Handbuch/.test(e.finde(rt, "ps2").bauformen) && /keine allgemeine Norm|eine allgemeine Norm folgt daraus nicht/.test(e.finde(rt, "ps2").bauformen), "PS/2-Farben als Herstellerkonvention");
  assert(/keine allgemeine Norm/.test(e.finde(rt, "audio").bauformen), "Audiofarben als Herstellerbeispiel");
  assert(/Farbe der Zunge[^.]*nicht verlässlich/.test(e.finde(rt, "usb-a").bauformen), "USB-Farbe sagt nichts über den Standard");
  assert(D.quellen["asus-d840"] && /^https:\/\//.test(D.quellen["asus-d840"].url), "ASUS-Quelle vorhanden");
  assert(!/pe-c-(blau|rot)/.test(css) && !/USB 3\.[0-9]\s*=\s*blau/i.test(js), "keine feste Zuordnung USB-Standard = Farbe");
  assert(/\.pe-etikett\.pe-aktiv \.pe-badge/.test(css) && js.includes("zeichneMainboardLegende"), "Mainboard nutzt Marken mit Legende statt Linien quer über die Platine");
}

// Layout Mainboard/Rückseite: Auswahl als Legende unter der Zeichnung, volle Breite, keine zweite rechte Liste
assert(/\.pe-arbeitsflaeche\.pe-breit\s*\{[^}]*grid-template-areas:\s*"bild" "liste" "erklaerung"/.test(css), "pe-breit stapelt Zeichnung, Legende, Erklärung");
assert(/\.pe-breit #pe-teile\s*\{[^}]*display:\s*grid/.test(css), "Legende bleibt ein sichtbares Raster");
assert(!/\.pe-breit[^{]*\{[^}]*display:\s*none/.test(css), "Legende wird nie ausgeblendet");
assert(js.includes('key === "mainboard" || key === "rueckseite"') && js.includes('classList.toggle("pe-breit"'), "nur Mainboard und Rückseite sind breit");
assert(js.includes('"0 0 420 480"') && !/x: 548, y: py/.test(js), "Mainboard-Zeichnung ohne SVG-Seitenlegende zugeschnitten");
assert(/\(i \+ 1\) \+ ". " \+ a\.teile\[i\]\.name/.test(js), "Mainboard-Legende trägt dieselben Nummern wie die Marken");
assert(/aria-label", breit \? "Legende: "/.test(js), "Legende ist beschriftet");

console.log("pc-explorer: alle Prüfungen bestanden");

// ---- Phase 1 (2026-11-03): ansichtsspezifischer Bildtext, USB-Steckerform vs. Standard ----
{
  const BT = e.BILDTEXT, V = ["desktop", "notebook", "rueckseite", "mainboard", "historisch"];
  gleich(Object.keys(BT), V);
  V.forEach(k => assert(typeof BT[k] === "string" && BT[k].length > 40, "Bildtext " + k));
  // Der Hinweis auf die durchsichtige Kühlung gehört ausschließlich zu Desktop und Notebook.
  ["desktop", "notebook"].forEach(k => assert(/Kühlung durchsichtig/.test(BT[k]), k + " nennt den Kühlungsknopf"));
  ["rueckseite", "mainboard", "historisch"].forEach(k => assert(!/durchsichtig|Kühlung|Prozessor/i.test(BT[k]), k + " ohne Kühlungshinweis"));
  assert(/USB-Standardnamen/.test(BT.rueckseite) && /keine Buchse/.test(BT.rueckseite), "Rückseitentext trennt Steckerform und Standard");
  assert(/Nummer/.test(BT.mainboard) && /Legende/.test(BT.mainboard), "Mainboardtext erklärt Nummern und Legende");
  assert(/älter/i.test(BT.historisch) && /neben oder unter/.test(BT.historisch), "Text der älteren Anschlüsse passt zum Layout");
  // HTML: Absatz hat eine ID und trägt keinen festen Kühlungstext mehr; Knopf bleibt, nur bei Desktop/Notebook sichtbar.
  const m = html.match(/<p id="pe-bildtext"[^>]*>([\s\S]*?)<\/p>/);
  assert(m && !/durchsichtig|Kühlung/.test(m[1]), "statischer Bildtext ohne Kühlungshinweis");
  assert(/id="pe-kuehler"/.test(html) && js.includes("kuehlerKnopf.hidden = istAnschlussAnsicht(key)"), "Kühlungsknopf bleibt, nur bei Desktop/Notebook sichtbar");
  assert(js.includes('getElementById("pe-bildtext")') && js.includes("BILDTEXT[key]"), "Bildtext wird je Ansicht gesetzt");

  // USB: Steckerformen A/C getrennt von Standards 2.0/3.2/4; IDs und Layouts unverändert.
  const rt = D.ansichten.rueckseite.teile, f = id => e.finde(rt, id);
  gleich(["usb-a", "usb-c", "usb2", "usb3", "usb4"].map(id => f(id).layout), [[152, 80, 96, 46], [260, 80, 48, 46], [64, 252, 100, 34], [180, 252, 100, 34], [296, 252, 100, 34]]);
  assert(/Steckerform/.test(f("usb-a").bauformen) && /Steckerform/.test(f("usb-c").bauformen), "A und C sind Steckerformen");
  assert(/USB4 verwendet diese Steckerform/.test(f("usb-c").bauformen) && /nicht jeder USB-C-Anschluss unterstützt USB4/.test(f("usb-c").bauformen), "USB-C: USB4 nutzt C, nicht jedes C ist USB4");
  assert(/keine eigene Steckerform/.test(f("usb4").bauformen) && /nicht jeder USB-C-Anschluss USB4/.test(f("usb4").bauformen), "USB4 hat keine eigene Steckerform");
  assert(/Farbe[^.]*beweist keine Geschwindigkeit/.test(f("usb-c").bauformen) && /nicht an Form oder Farbe/.test(f("usb4").bauformen), "Farbe ist kein Geschwindigkeitsbeweis");
  assert(/Farbe einer Buchse beweist keine Geschwindigkeit/.test(D.ansichten.rueckseite.einleitung), "Einleitung der Rückseite nennt die Farbregel");
  ["usb2", "usb3", "usb4"].forEach(id => assert(/Standardname/.test(f(id).name) && /nicht für eine bestimmte Buchse/.test(f(id).ort), id + " bleibt Standardname/Plakette"));
  assert(D.quellen["usb-if-usb4"] && D.quellen["usb-if-usb4"].url === "https://www.usb.org/usb4" && f("usb4").q.includes("usb-if-usb4"), "USB4-Aussage hat eine Quelle");
  // Grafik: Plaketten haben eigene gestrichelte Klasse und liegen im beschrifteten Standardbereich; Buchsen ragen nicht hinein.
  assert(/function plaketteStandard[\s\S]{0,200}"pe-haupt pe-io-std"/.test(js), "Plaketten tragen pe-io-std");
  assert(/rect\.pe-io-std\s*\{[^}]*stroke-dasharray/.test(css) && /\.pe-bereich-std\s*\{[^}]*stroke-dasharray/.test(css), "Standardbereich und Plaketten sind gestrichelt (nicht nur Farbe)");
  assert(/USB-Standardnamen \(keine Steckerformen\)/.test(js) && /keine eigene Buchse/.test(js), "Standardbereich ist beschriftet");
  const bandOben = 232, bandUnten = 334;
  rt.filter(t => t.gruppe === "mainboard-io").forEach(t => {
    const unten = t.layout[1] + t.layout[3];
    if (["usb2", "usb3", "usb4"].includes(t.id)) assert(t.layout[1] > bandOben + 12 && unten < bandUnten - 40, t.id + " liegt im Standardbereich über den Hinweisen");
    else assert(unten + 20 < bandOben + 4, t.id + " liegt samt Beschriftung oberhalb des Standardbereichs");
  });
  assert(js.includes('if (id === "usb2" || id === "usb3" || id === "usb4") {') && /id === "usb-a"\) buchseUsbA/.test(js) && /id === "usb-c"\) buchseUsbC/.test(js), "nur A und C haben Buchsenformen");
}
console.log("pc-explorer: Phase-1-Prüfungen bestanden");
