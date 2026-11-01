/* Datentest für die modulare Startseite (js/module-daten.js).
 *
 * Prüft Daten und Werkzeugdarstellung mit einem minimalen DOM, nicht das Browserlayout.
 * Aufruf:  node tests/startseite.test.js
 */
"use strict";
const fs = require("fs");
const path = require("path");
const assert = require("assert");
const vm = require("vm");

const wurzel = path.join(__dirname, "..");
global.window = global;
require(path.join(wurzel, "js", "module-daten.js"));
const daten = global.MODULE_DATEN;
const einstieg = global.MODULE_EINSTIEG;

const erwartetJahr1 = [
  ["Lernfeld 1", "Ausbildungsbetrieb und berufliche Rolle"],
  ["Lernfeld 2", "Arbeitsplätze nach Kundenwunsch ausstatten"],
  ["Lernfeld 3", "Netzwerkgrundlagen und Client-Anbindung"],
  ["Lernfeld 4", "Schutzbedarf und Grundlagen der IT-Sicherheit"],
  ["Lernfeld 5", "Programmiergrundlagen und Datenverwaltung"]
];

assert.strictEqual(daten.length, 3, "drei Ausbildungsjahre");

const j1 = daten[0].module;
assert.strictEqual(einstieg.length, 1, "eigener Einstiegsbereich");
assert.strictEqual(einstieg[0].id, "computer-grundlagen", "Computer-Grundlagen bleibt eigener Einstieg");
assert(!daten.some(j => j.module.some(m => m.id === "computer-grundlagen")), "Einstieg nicht im Ausbildungsjahr doppelt");
assert(fs.readFileSync(path.join(wurzel, "js/startseite.js"), "utf8").includes('erzeuge("section", "overview-entry")'), "Startseite rendert Einstieg zuerst");
const startseitenScript = fs.readFileSync(path.join(wurzel, "js/startseite.js"), "utf8");
assert(startseitenScript.includes('field.typ !== "werkzeug"'), "Startseite schließt typisierte Werkzeuge defensiv aus");
const lernfelder = j1.filter(m => m.lernfeld);
assert.deepStrictEqual(lernfelder.map(m => [m.lernfeld, m.titel]), erwartetJahr1, "Jahr-1-Titel wörtlich");
lernfelder.forEach((lernfeld, index) => {
  const nummer = index + 1;
  const themen = lernfeld.unterthemen;
  assert(!themen.some(u => u.id === `lf${nummer}-abschluss` || u.page === `lf${nummer}-abschluss` || u.datei === `module/lf${nummer}-abschluss.html`), `LF${nummer}: alte Abschlussseite nicht mehr im Katalog`);
  const kontrollen = themen.filter(u => u.typ === "lernzielkontrolle");
  assert.strictEqual(kontrollen.length, 1, `LF${nummer}: genau eine Lernzielkontrolle`);
  assert.strictEqual(kontrollen[0].titel, `LF${nummer} Lernzielkontrolle`, `LF${nummer}: einheitlicher Kontrolltitel`);
  assert.strictEqual(themen[themen.length - 1], kontrollen[0], `LF${nummer}: Lernzielkontrolle steht am Ende`);
});
const lf1 = j1.find(m => m.id === "lf1");
assert.equal(lf1.unterthemen.length, 11, "elf katalogisierte LF1-Themen, einschließlich Lernzielkontrolle und ohne alte Abschlussaufgabe");
assert.equal(lf1.unterthemen[0].page, "lf1-ausbildungsbetrieb");
assert(fs.existsSync(path.join(wurzel, lf1.unterthemen[0].datei)), "LF1-Lektion verlinkt auf vorhandene Datei");
assert.strictEqual(daten[1].module.length, 4, "Jahr 2: vier Bereiche");
assert.strictEqual(daten[2].module.length, 3, "Jahr 3: drei Bereiche");

const lf3 = j1.find(m => m.id === "lf3");
assert.deepStrictEqual(lf3.unterthemen.map(u => u.titel), [
  "Client-Anbindung: vom Anschluss bis zur Verbindung",
  "IPv4-Konfiguration eines Clients lesen",
  "DHCP: automatische Konfiguration nachvollziehen",
  "DNS: Namen und IP-Adressen unterscheiden",
  "Verbindung systematisch eingrenzen",
  "Typische Client-Fehlerbilder dokumentieren und übergeben",
  "IPv4",
  "Netzmaske und Netz-/Geräteanteil",
  "Subnetting: /24 in zwei /25-Netze teilen",
  "LF3 Lernzielkontrolle"
]);
const zahlensysteme = global.MODULE_TOOLS.find(u => u.id === "lf3-zahlensysteme");
assert(zahlensysteme.status === "verfuegbar" && zahlensysteme.datei === "module/zahlensysteme.html", "Zahlensystemrechner: verfügbar mit Moduldatei");
assert(fs.existsSync(path.join(wurzel, zahlensysteme.datei)), "Zahlensystem-Moduldatei existiert");
const ipv4 = lf3.unterthemen.find(u => u.id === "lf3-ipv4");
const netzmaske = lf3.unterthemen.find(u => u.id === "lf3-netzmaske");
const subnetting = lf3.unterthemen.find(u => u.id === "lf3-subnetting");
assert(ipv4.status === "verfuegbar" && ipv4.datei === "module/netzwerkgrundlagen.html", "IPv4: verfügbar mit Moduldatei");
assert(fs.existsSync(path.join(wurzel, ipv4.datei)), "IPv4-Moduldatei existiert");
assert(netzmaske.status === "verfuegbar" && netzmaske.datei === "module/netzmaske.html", "Netzmaske: verfügbar mit Moduldatei");
assert(fs.existsSync(path.join(wurzel, netzmaske.datei)), "Netzmasken-Moduldatei existiert");
assert(subnetting.status === "verfuegbar" && subnetting.datei === "module/subnetting.html", "Subnetting: neue verfügbare Lektion");
assert(fs.existsSync(path.join(wurzel, subnetting.datei)), "Subnetting-Moduldatei existiert");

const alle = daten.flatMap(j => j.module);
assert.equal(global.MODULE_TOOLS.length, 4, "vier Werkzeuge: die drei der Basis plus Windows-Werkzeugkiste");
const windowsTools = global.MODULE_TOOLS.filter(u => u.id === "windows-werkzeugkiste");
assert.strictEqual(windowsTools.length, 1, "Windows-Werkzeugkiste genau einmal im Werkzeugkatalog");
assert.deepStrictEqual(windowsTools[0], {
  id: "windows-werkzeugkiste", typ: "werkzeug", titel: "Windows-Werkzeugkiste",
  beschreibung: "Windows-Tastenkombinationen und Systemwerkzeuge lernen, üben und testen.",
  page: "windows-werkzeugkiste", status: "verfuegbar", datei: "module/windows-werkzeugkiste.html"
});
assert(fs.existsSync(path.join(wurzel, windowsTools[0].datei)), "Windows-Werkzeugkiste-Datei existiert");
assert(!alle.concat(alle.flatMap(m => m.unterthemen || []), einstieg).some(m => m.id === "windows-werkzeugkiste"), "Windows-Werkzeugkiste nicht als Lektion oder Einstieg dupliziert");
assert(!global.MODULE_TOOLS.some(t => t.id === "bwl-werkstatt"), "BWL-Werkstatt gehört nicht zu dieser Basis");
assert(global.MODULE_TOOLS.every(t => t.typ === "werkzeug" && t.datei), "Tools typisiert und mit Zielseiten");
assert(!lf3.unterthemen.some(u => global.MODULE_TOOLS.some(t => t.id === u.id)), "Werkzeuge erscheinen nicht in den Lernlektionen");
const alleVerfuegbar = alle.concat(einstieg);
assert(alleVerfuegbar.some(m => m.id === "computer-grundlagen"), "vorhandenes Modul bleibt im Einstieg verfügbar");
assert(!alle.some(m => /^ipv4|^subnet/i.test(m.titel)), "IPv4/Subnetting keine eigene Lernfeldkarte");

const verfuegbar = alle.filter(m => m.status === "verfuegbar");
verfuegbar.forEach(m => {
  if (m.datei) assert(fs.existsSync(path.join(wurzel, m.datei)), "Datei fehlt: " + m.datei);
  (m.unterthemen || []).filter(u => u.status === "verfuegbar").forEach(u =>
    assert(fs.existsSync(path.join(wurzel, u.datei)), "Lektionsdatei fehlt: " + u.datei));
});
alle.filter(m => m.status !== "verfuegbar").forEach(m => assert(!m.datei, m.id + " ohne Datei"));

function element(tag) {
  return {
    tagName: tag, children: [], dataset: {}, attributes: {}, textContent: "",
    classList: { add() {} },
    appendChild(child) { this.children.push(child); return child; },
    setAttribute(name, value) { this.attributes[name] = value; },
    addEventListener() {},
    querySelector() { return null; }
  };
}
function renderStartseite(tools) {
  const target = element("div");
  const window = { MODULE_DATEN: daten, MODULE_EINSTIEG: einstieg };
  if (tools !== undefined) window.MODULE_TOOLS = tools;
  const storage = { getItem() { return null; }, setItem() {}, removeItem() {} };
  vm.runInNewContext(startseitenScript, {
    window, localStorage: storage, sessionStorage: storage,
    document: { readyState: "complete", createElement: element, getElementById(id) { return id === "jahre" ? target : null; } }
  });
  return target;
}
const rendered = renderStartseite(global.MODULE_TOOLS);
assert.strictEqual(rendered.children.length, 5, "Einstieg, drei Ausbildungsjahre und Werkzeugsektion");
assert.deepStrictEqual(rendered.children.slice(1, 4).map(e => e.dataset.yearId), ["1", "2", "3"], "Ausbildungsjahre bleiben vor den Werkzeugen");
const toolsSection = rendered.children[4];
assert.strictEqual(toolsSection.tagName, "section");
assert.strictEqual(toolsSection.attributes["aria-labelledby"], "tools-titel", "Werkzeugsektion ist beschriftet");
assert.strictEqual(toolsSection.children[0].id, "tools-titel");
assert.strictEqual(toolsSection.children[0].textContent, "Tools & Nachschlagen");
const toolCards = toolsSection.children[1];
assert.strictEqual(toolCards.tagName, "ul");
assert.strictEqual(toolCards.children.length, 4, "die vier Werkzeuge dieser Basis sind gerendert");
toolCards.children.forEach((card, index) => {
  const tool = global.MODULE_TOOLS[index];
  assert.strictEqual(card.className, "modul modul-verfuegbar", "vorhandenes Kartenmuster");
  assert.strictEqual(card.children[0].href, tool.datei, "Werkzeugkarte verlinkt Katalogziel");
  assert.strictEqual(card.children[0].children[0].textContent, tool.titel, "Werkzeugtitel aus dem Katalog");
  assert.strictEqual(card.children[0].children[1].textContent, tool.beschreibung, "Beschreibung aus dem Katalog");
});
assert.strictEqual(renderStartseite().children.length, 4, "fehlender Werkzeugkatalog bleibt fehlerfrei");
assert.strictEqual(renderStartseite([]).children.length, 4, "leerer Werkzeugkatalog erzeugt keine leere Sektion");

console.log("startseite.test.js: alle Prüfungen bestanden");
