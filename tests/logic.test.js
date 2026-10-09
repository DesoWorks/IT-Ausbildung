/* Logiktest für die Lerneinheit "Den Computer kennenlernen".
 *
 * Lädt js/app.js in einem schlanken, selbstgebauten DOM-Mock (ohne externe
 * Bibliotheken) und prüft das echte App-Verhalten über simulierte Klicks:
 * Lernkarten lesen, Zuordnungsübung, Quiz, Fortschrittsberechnung und Reset.
 *
 * Hinweis: Dies ist ein Logiktest gegen einen Mock des Browsers, kein
 * Test im echten Browser. Er sichert die Ablauflogik ab; Layout, Fokus und
 * tatsächliche Darstellung muss zusätzlich im Browser geprüft werden.
 *
 * Aufruf:  node tests/logic.test.js
 */
"use strict";
const fs = require("fs");
const path = require("path");

/* ---------- Mini-DOM ---------- */
function camel(name) { return name.replace(/^data-/, "").replace(/-([a-z])/g, (m, c) => c.toUpperCase()); }

class ClassList {
  constructor(el) { this.el = el; this.set = new Set(); }
  add(...n) { n.forEach(x => this.set.add(x)); }
  remove(...n) { n.forEach(x => this.set.delete(x)); }
  contains(n) { return this.set.has(n); }
  toggle(n, force) {
    if (force === undefined) { if (this.set.has(n)) this.set.delete(n); else this.set.add(n); }
    else if (force) this.set.add(n); else this.set.delete(n);
  }
  get value() { return Array.from(this.set).join(" "); }
}

class El {
  constructor(tag) {
    this.tagName = String(tag).toUpperCase();
    this.childNodes = [];
    this.attributes = {};
    this.classList = new ClassList(this);
    this.style = {};
    this._text = null;
    this.hidden = false;
    this.parentNode = null;
    this._listeners = {};
    this.checked = false;
    this.value = "";
  }
  set className(v) { this.classList.set = new Set(String(v).split(/\s+/).filter(Boolean)); }
  get className() { return this.classList.value; }
  get dataset() {
    const d = {};
    for (const k in this.attributes) if (k.startsWith("data-")) d[camel(k)] = this.attributes[k];
    return d;
  }
  setAttribute(n, v) {
    this.attributes[n] = v;
    if (n === "hidden") this.hidden = true;
    if (n === "class") this.className = v;
    if (n === "value") this.value = v;
  }
  getAttribute(n) { return this.attributes[n]; }
  removeAttribute(n) { delete this.attributes[n]; if (n === "hidden") this.hidden = false; }
  set textContent(v) { this._text = String(v); this.childNodes = []; }
  get textContent() {
    if (this._text !== null) return this._text;
    return this.childNodes.map(c => c.nodeType === 3 ? c.textContent : c.textContent).join("");
  }
  set innerHTML(v) { if (!v) this.childNodes = []; }
  appendChild(c) { c.parentNode = this; this.childNodes.push(c); return c; }
  focus() { doc.activeElement = this; }
  addEventListener(t, fn) { (this._listeners[t] = this._listeners[t] || []).push(fn); }
  _fire(t) { (this._listeners[t] || []).forEach(fn => fn({ target: this, key: undefined })); }
  _matches(sel) {
    if (sel.startsWith(".")) return this.classList.contains(sel.slice(1));
    if (sel.startsWith("[")) return sel.slice(1, -1) in this.attributes;
    return this.tagName === sel.toUpperCase();
  }
  _walk(acc) { for (const c of this.childNodes) if (c instanceof El) { acc.push(c); c._walk(acc); } }
  querySelectorAll(sel) { const all = []; this._walk(all); const r = all.filter(e => e._matches(sel)); r.forEach = Array.prototype.forEach.bind(r); return r; }
  querySelector(sel) { return this.querySelectorAll(sel)[0] || null; }
}

const registry = {};
const doc = {
  body: new El("body"),
  activeElement: null,
  readyState: "complete",
  _listeners: {},
  createElement: (t) => new El(t),
  createTextNode: (t) => ({ nodeType: 3, textContent: String(t) }),
  getElementById: (id) => registry[id] || null,
  addEventListener: (t, fn) => { (doc._listeners[t] = doc._listeners[t] || []).push(fn); },
  querySelectorAll: (sel) => doc.body.querySelectorAll(sel),
  querySelector: (sel) => doc.body.querySelector(sel)
};
doc.activeElement = doc.body;

function fixture(tag, id, attrs) {
  const e = new El(tag);
  if (id) { e.setAttribute("id", id); registry[id] = e; }
  if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]);
  doc.body.appendChild(e);
  return e;
}

/* feste Elemente aus index.html, die app.js benötigt */
["start", "karten", "uebung", "quiz", "abschluss"].forEach(id => fixture("section", id));
fixture("div", "karten-raster");
fixture("div", "uebung-liste");
fixture("p", "uebung-ergebnis");
fixture("div", "quiz-liste");
fixture("p", "quiz-ergebnis");
fixture("div", "fortschritt-balken");
fixture("p", "fortschritt-text");
fixture("p", "abschluss-status");
fixture("button", "uebung-reset");
fixture("button", "quiz-reset");
fixture("button", "reset-alles");
fixture("div", "hauptinhalt");
["start", "karten", "uebung", "quiz", "abschluss"].forEach(z => fixture("button", null, { "class": "schritt-knopf", "data-ziel": z }));

/* localStorage-Mock */
const store = {};
const localStorage = {
  getItem: (k) => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: (k) => { delete store[k]; }
};

/* window-Mock */
const win = {
  localStorage,
  confirm: () => true,
  scrollTo: () => {},
  addEventListener: () => {}
};

/* Globals bereitstellen und app.js ausführen */
globalThis.document = doc;
globalThis.window = win;
globalThis.localStorage = localStorage;
const code = fs.readFileSync(path.join(__dirname, "..", "js", "app.js"), "utf8");
eval(code);

/* ---------- Testhilfen ---------- */
let bestanden = 0, fehlgeschlagen = 0;
function pruefe(name, bedingung) {
  if (bedingung) { bestanden++; console.log("  OK   " + name); }
  else { fehlgeschlagen++; console.log("  FAIL " + name); }
}
function prozent() { return registry["fortschritt-text"].textContent; }

/* ---------- Ausgangszustand ---------- */
pruefe("Start: Fortschritt 0 %", prozent() === "Fortschritt: 0 %");

/* ---------- Lernkarten lesen ---------- */
const karten = registry["karten-raster"].querySelectorAll(".lernkarte");
pruefe("Fünf Lernkarten erzeugt", karten.length === 5);
karten.forEach(k => k._fire("click"));
const gelesen = registry["karten-raster"].querySelectorAll(".lernkarte").filter(k => k.classList.contains("gelesen"));
pruefe("Alle fünf Karten als gelesen markiert", gelesen.length === 5);

/* ---------- Zuordnungsübung (korrekt beantworten) ---------- */
const richtigeOption = [0, 1, 2, 0, 1]; // Eingabe/Ausgabe/Verarbeitung je Zeile
const zeilen = registry["uebung-liste"].querySelectorAll(".uebung-zeile");
pruefe("Fünf Übungszeilen erzeugt", zeilen.length === 5);
zeilen.forEach((z, i) => {
  const opts = z.querySelectorAll(".option-knopf");
  opts[richtigeOption[i]]._fire("click");
});
pruefe("Übung: Rückmeldung meldet alle richtig",
  /alle 5 richtig/i.test(registry["uebung-ergebnis"].textContent));

/* ---------- Quiz (korrekt beantworten) ---------- */
const richtigeAntwort = [1, 0, 1, 0, 1];
const fragen = registry["quiz-liste"].querySelectorAll(".quiz-frage");
pruefe("Fünf Quizfragen erzeugt", fragen.length === 5);
fragen.forEach((f, i) => {
  const inputs = f.querySelectorAll("input");
  const gewaehlt = inputs[richtigeAntwort[i]];
  gewaehlt.checked = true;
  gewaehlt._fire("change");
});
pruefe("Quiz: Rückmeldung meldet alle richtig",
  /alle 5 fragen richtig/i.test(registry["quiz-ergebnis"].textContent));

/* eine Quizantwort bewusst falsch -> Erklärung sichtbar, dann korrigieren */
const f1 = fragen[0];
const falsch = f1.querySelectorAll("input")[0];
falsch.checked = true; falsch._fire("change");
pruefe("Quiz: falsche Antwort zeigt Erklärung",
  f1.querySelector(".quiz-erklaerung").hidden === false &&
  f1.querySelector(".quiz-erklaerung").textContent.length > 0);
const wieder = f1.querySelectorAll("input")[1];
wieder.checked = true; wieder._fire("change"); // wieder richtig

/* ---------- Abschluss aufrufen -> Fortschritt 100 % ---------- */
doc.querySelectorAll(".schritt-knopf").filter(k => k.dataset.ziel === "abschluss")[0]._fire("click");
pruefe("Nach Abschluss: Fortschritt 100 %", prozent() === "Fortschritt: 100 %");
pruefe("Fortschritt wurde in localStorage gespeichert",
  typeof store["it-ausbildung.computer-grundlagen.v1"] === "string");

/* ---------- Zurücksetzen ---------- */
registry["reset-alles"]._fire("click");
pruefe("Nach Reset: Fortschritt 0 %", prozent() === "Fortschritt: 0 %");
pruefe("Nach Reset: localStorage geleert",
  !("it-ausbildung.computer-grundlagen.v1" in store));
const nachReset = registry["karten-raster"].querySelectorAll(".lernkarte").filter(k => k.classList.contains("gelesen"));
pruefe("Nach Reset: keine Karte mehr als gelesen markiert", nachReset.length === 0);

/* ---------- Ergebnis ---------- */
console.log("\nErgebnis: " + bestanden + " bestanden, " + fehlgeschlagen + " fehlgeschlagen.");
process.exit(fehlgeschlagen === 0 ? 0 : 1);
