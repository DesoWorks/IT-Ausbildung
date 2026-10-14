"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const css = fs.readFileSync(path.join(root, "css/styles.css"), "utf8");
const display = fs.readFileSync(path.join(root, "js/anzeige-glossar.js"), "utf8");
const script = fs.readFileSync(path.join(root, "js/glossar-seite.js"), "utf8");

// Textgröße: 80 bis 150 in Zehnerschritten, Standard 100, gespeicherte Werte werden gezogen.
assert(display.includes("TEXT_MIN = 80") && display.includes("TEXT_MAX = 150") && display.includes("TEXT_STEP = 10"));
assert(display.includes("size.min = String(TEXT_MIN)") && display.includes("merged.text = clampText(merged.text)"));
assert(display.includes("text: 100"));

// Glossar: Sortierung beim Rendern, Anzahl bleibt erhalten.
const terms = ["Zebra", "Äpfel", "bit", "Abteilung"];
const shown = [];
const list = { textContent: "", appendChild(d) { shown.push(d.children[0].textContent); } };
const el = () => ({ className: "", textContent: "", children: [], appendChild(c) { this.children.push(c); } });
const treffer = { textContent: "" };
const ctx = {
  document: { getElementById: id => id === "glossar-liste" ? list : id === "glossar-treffer" ? treffer : id === "glossar-suche" ? { value: "", addEventListener() {} } : { href: "", textContent: "" }, createElement: el },
  location: { search: "" }, URLSearchParams,
  window: { GLOSSAR: terms.map(t => ({ begriff: t, erklaerung: "x" })) }
};
vm.runInNewContext(script, ctx);
assert.deepEqual(shown, ["Abteilung", "Äpfel", "bit", "Zebra"]);
assert.equal(treffer.textContent, "4 Begriffe gefunden.");
assert.deepEqual(terms, ["Zebra", "Äpfel", "bit", "Abteilung"], "Quelldaten werden nicht umsortiert");

// CSS-Regeln (nur Textprüfung, kein Browserlauf).
assert(css.includes("break-inside: avoid"));
assert(/min-width: 1100px\)\s*\{[\s\S]*?\.glossar-liste \{ columns: 3/.test(css));
assert(/min-width: 1600px\)\s*\{[\s\S]*?\.glossar-liste \{ columns: 4/.test(css));
assert(!/\.glossar-liste \{ columns: 2/.test(css), "Zwei-Spalten-Stufe ist abgelöst");
assert(!/\.glossar \{ max-width: 860px/.test(css), "Glossar nutzt die Inhaltsbreite");
assert(css.includes("#questions > .question") && css.includes("margin: 0 0 1.5rem"));
assert(/\.site-nav \{[^}]*overflow-y: auto[^}]*overflow-x: hidden/.test(css));
assert(!/\.site-nav \{[^}]*scrollbar-width: none/.test(css));
assert(css.includes('content: "öffnen"') && css.includes('content: "schließen"'));
// Langer Lernfeld-Titel steckt in einem eigenen Element, damit "öffnen" nicht abgeschnitten wird.
const nav = fs.readFileSync(path.join(root, "js/navigation.js"), "utf8");
assert(nav.includes('label.className = "nav-learning-field-label"'));
assert(css.includes(".nav-learning-field-label { min-width: 0"));
console.log("sichtfehler-navigation-glossar.test.js: alle Prüfungen bestanden");
