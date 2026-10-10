/* Test für Netzwerkgrundlagen, Lektion 1 (IPv4-Adresse und vier Oktette).
 *
 * Prüft die Prüflogik (js/netzwerk-lektion1.js), die Fragen, die Verknüpfung
 * zwischen Skript und HTML (IDs), Glossar-Einbindung und Textalternative.
 * Kein Test im echten Browser: Tastatur, Darstellung und Screenreader
 * müssen zusätzlich manuell geprüft werden.
 *
 * Aufruf:  node tests/netzwerk-lektion1.test.js
 */
"use strict";
const fs = require("fs");
const path = require("path");
const assert = require("assert");

const wurzel = path.join(__dirname, "..");
global.window = global;
require(path.join(wurzel, "js", "glossar-daten.js"));
const L1 = require(path.join(wurzel, "js", "netzwerk-lektion1.js"));

let ok = 0;
function t(name, fn) { fn(); ok++; console.log("  OK   " + name); }

/* ---------- Prüflogik ---------- */
t("gültige Adressen", () => {
  ["192.168.1.20", "0.0.0.0", "255.255.255.255", "10.20.30.40", " 10.0.0.1 "].forEach(a => {
    const r = L1.pruefeIPv4(a);
    assert.strictEqual(r.gueltig, true, a);
    assert.strictEqual(r.oktette.length, 4);
  });
  assert.deepStrictEqual(L1.pruefeIPv4("192.168.1.20").oktette, [192, 168, 1, 20]);
});

t("ungültige Adressen mit passendem Code und verständlichem Hinweis", () => {
  const faelle = [
    ["", "leer"], ["   ", "leer"], [null, "leer"],
    ["10.20.30", "anzahl"], ["1.2.3.4.5", "anzahl"], ["192", "anzahl"],
    ["10..30.40", "leeres-oktett"], ["10.20.30.", "leeres-oktett"],
    ["10.abc.30.40", "zeichen"], ["10.-1.30.40", "zeichen"], ["10.2 0.30.40", "zeichen"], ["10.20.30.4x", "zeichen"],
    ["010.20.30.40", "fuehrende-null"], ["10.20.30.007", "fuehrende-null"],
    ["10.20.30.256", "zu-gross"], ["10.20.30.400", "zu-gross"], ["999.1.1.1", "zu-gross"]
  ];
  faelle.forEach(([eingabe, code]) => {
    const r = L1.pruefeIPv4(eingabe);
    assert.strictEqual(r.gueltig, false, String(eingabe));
    assert.strictEqual(r.code, code, String(eingabe) + " -> " + r.code);
    assert(r.hinweis.length > 20, "Hinweis fehlt: " + eingabe);
  });
});

t("Hinweis nennt die Nummer des fehlerhaften Oktetts", () => {
  assert(/Oktett 4/.test(L1.pruefeIPv4("10.20.30.400").hinweis));
  assert(/Oktett 2/.test(L1.pruefeIPv4("10.x.30.40").hinweis));
});

t("Binärdarstellung mit 8 Stellen", () => {
  assert.strictEqual(L1.zuBinaer8(0), "00000000");
  assert.strictEqual(L1.zuBinaer8(1), "00000001");
  assert.strictEqual(L1.zuBinaer8(20), "00010100");
  assert.strictEqual(L1.zuBinaer8(192), "11000000");
  assert.strictEqual(L1.zuBinaer8(255), "11111111");
});

/* ---------- Fragen ---------- */
t("Fragen: je genau eine richtige Antwort, jede Antwort erklärt", () => {
  assert(L1.FRAGEN.length >= 3);
  const ids = new Set();
  L1.FRAGEN.forEach(f => {
    assert(!ids.has(f.id), "doppelte ID " + f.id); ids.add(f.id);
    assert.strictEqual(f.antworten.filter(a => a.richtig).length, 1, f.id);
    f.antworten.forEach(a => assert(a.erklaerung && a.erklaerung.length > 15, f.id + ": Erklärung fehlt"));
  });
});

t("Frage zu 256 und zur gültigen Adresse stimmen fachlich", () => {
  const w = L1.FRAGEN.find(f => f.id === "wertebereich");
  assert.strictEqual(w.antworten.find(a => a.richtig).text, "256");
  const g = L1.FRAGEN.find(f => f.id === "gueltig");
  const richtigeAdresse = g.antworten.find(a => a.richtig).text;
  assert.strictEqual(L1.pruefeIPv4(richtigeAdresse).gueltig, true);
  g.antworten.filter(a => !a.richtig).forEach(a => assert.strictEqual(L1.pruefeIPv4(a.text).gueltig, false, a.text));
  const n = L1.FRAGEN.find(f => f.id === "anzahl");
  assert.strictEqual(n.antworten.find(a => a.richtig).text, "Aus vier Oktetten");
});

/* ---------- Fortschritt ---------- */
t("Fortschritt 0 / Teil / 100 Prozent", () => {
  const leer = { antworten: {}, eigeneGueltig: false, abschlussGesehen: false };
  assert.strictEqual(L1.berechneFortschritt(leer), 0);
  const richtig = {};
  L1.FRAGEN.forEach(f => { richtig[f.id] = f.antworten.findIndex(a => a.richtig); });
  const teil = L1.berechneFortschritt({ antworten: richtig, eigeneGueltig: false, abschlussGesehen: false });
  assert(teil > 0 && teil < 100);
  assert.strictEqual(L1.berechneFortschritt({ antworten: richtig, eigeneGueltig: true, abschlussGesehen: true }), 100);
  const falsch = {};
  L1.FRAGEN.forEach(f => { falsch[f.id] = f.antworten.findIndex(a => !a.richtig); });
  assert.strictEqual(L1.berechneFortschritt({ antworten: falsch, eigeneGueltig: false, abschlussGesehen: false }), 0, "falsche Antworten zählen nicht");
});

/* ---------- Glossar ---------- */
t("Fachwörter existieren im zentralen Glossar", () => {
  const begriffe = global.GLOSSAR.map(g => g.begriff);
  L1.FACHWOERTER.forEach(w => assert(begriffe.includes(w), "Glossar fehlt: " + w));
  assert.strictEqual(new Set(begriffe).size, begriffe.length, "doppelte Glossarbegriffe");
  const oktett = global.GLOSSAR.find(g => g.begriff === "Oktett").erklaerung;
  assert(/8 Bit/.test(oktett) && /255/.test(oktett));
});

/* ---------- HTML-Verknüpfung ---------- */
const html = fs.readFileSync(path.join(wurzel, "module", "netzwerkgrundlagen.html"), "utf8");
const js = fs.readFileSync(path.join(wurzel, "js", "netzwerk-lektion1.js"), "utf8");
const htmlIds = new Set(Array.from(html.matchAll(/\sid="([^"]+)"/g)).map(m => m[1]));

t("alle im Skript benutzten IDs gibt es im HTML", () => {
  const benutzt = new Set(Array.from(js.matchAll(/\bel\("([^"]+)"\)/g)).map(m => m[1]));
  assert(benutzt.size >= 8);
  benutzt.forEach(id => assert(htmlIds.has(id), "ID fehlt im HTML: " + id));
});

t("Schritte, Weiter-Knöpfe und Schrittknöpfe passen zusammen", () => {
  L1.SCHRITTE.forEach(s => assert(htmlIds.has(s), "Abschnitt fehlt: " + s));
  Array.from(html.matchAll(/data-weiter="([^"]+)"/g)).forEach(m => assert(L1.SCHRITTE.includes(m[1]), m[1]));
  const ziele = Array.from(html.matchAll(/data-ziel="([^"]+)"/g)).map(m => m[1]);
  assert.deepStrictEqual(ziele, L1.SCHRITTE);
});

t("Einbindung: Glossar, Anzeigeoptionen, Version, Rücklink, Sprunglink", () => {
  ["../js/glossar-daten.js", "../js/anzeige-glossar.js", "../js/version.js", "../js/netzwerk-lektion1.js",
   "../css/styles.css", "../css/netzwerk.css", "../index.html", "#hauptinhalt"].forEach(p =>
    assert(html.includes(p), "fehlt: " + p));
  assert(html.indexOf("glossar-daten.js") < html.indexOf("anzeige-glossar.js"), "Reihenfolge Glossar vor Anzeige");
  ["../js/glossar-daten.js", "../js/anzeige-glossar.js", "../js/version.js", "../js/netzwerk-lektion1.js",
   "../css/styles.css", "../css/netzwerk.css"].forEach(p =>
    assert(fs.existsSync(path.join(wurzel, "module", p)), "Datei fehlt: " + p));
});

t("Schaubild mit Titel, Beschreibung und Textalternative", () => {
  assert(/<svg[^>]*role="img"[^>]*aria-labelledby="svg-titel svg-beschr"/.test(html));
  assert(htmlIds.has("svg-titel") && htmlIds.has("svg-beschr"));
  assert(/<figcaption>/.test(html));
  assert(/Textalternative zum Schaubild/.test(html));
  assert(/<table[\s\S]*<caption>[\s\S]*scope="col"[\s\S]*scope="row"/.test(html));
  ["192", "168", "20"].forEach(w => assert(html.includes(w)));
});

t("Übung: beschriftetes Eingabefeld, Live-Rückmeldung, kein Zeitdruck, kein Subnetting-Inhalt", () => {
  assert(/<label for="eigene-eingabe">/.test(html));
  assert(/id="eigene-ergebnis"[^>]*aria-live="polite"/.test(html));
  assert(/kein Zeitdruck|keinen Zeitdruck/i.test(html));
  assert(/type="submit"/.test(html), "Prüfen per Enter/Tastatur über Formular");
  assert(!/<h[23][^>]*>[^<]*Subnetting/i.test(html), "keine Subnetting-Lektion");
});

t("Startseite verlinkt IPv4 und lässt Subnetting gesperrt", () => {
  global.MODULE_DATEN = undefined;
  require(path.join(wurzel, "js", "module-daten.js"));
  const lf3 = global.MODULE_DATEN[0].module.find(m => m.id === "lf3");
  assert.strictEqual(lf3.unterthemen.find(u => u.id === "lf3-ipv4").datei, "module/netzwerkgrundlagen.html");
  assert(!lf3.unterthemen.find(u => u.id === "lf3-subnetting").datei);
});

console.log("\nnetzwerk-lektion1.test.js: " + ok + " Prüfungen bestanden");
