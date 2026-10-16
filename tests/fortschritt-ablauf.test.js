"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const lessons = [
  "lf3-client-anbindung", "lf3-ipv4-konfiguration", "lf3-dhcp", "lf3-dns",
  "lf3-verbindung-eingrenzen"
];

function makeBrowser(file, storage) {
  const elements = new Map(), inputs = [];
  class Element {
    constructor(tag) {
      this.tagName = tag.toUpperCase(); this.children = []; this.listeners = {};
      this.dataset = {}; this.style = {}; this.attributes = {}; this.hidden = false;
      this.textContent = ""; this.checked = false;
    }
    appendChild(child) { this.children.push(child); return child; }
    append(...children) { children.forEach(child => this.appendChild(child)); }
    setAttribute(name, value) { this.attributes[name] = value; }
    removeAttribute(name) { delete this.attributes[name]; }
    focus() {}
    addEventListener(name, fn) { this.listeners[name] = fn; }
  }
  const get = id => { if (!elements.has(id)) elements.set(id, new Element("div")); return elements.get(id); };
  const steps = ["start", "case", "exercise", "finish"].map(id => {
    const button = new Element("button"); button.dataset.step = id; return button;
  });
  const document = {
    createElement(tag) { const element = new Element(tag); if (tag === "input") inputs.push(element); return element; },
    getElementById: get,
    querySelectorAll(selector) {
      if (selector === "[data-step]") return steps;
      if (selector === "[data-next]") return [];
      if (selector === '#questions input[type="radio"]') return inputs;
      return [];
    },
    querySelector(selector) {
      const match = selector.match(/^input\[name="([^"]+)"\](?:\[value="([^"]+)"\])?(?::checked)?$/);
      if (!match) return null;
      return inputs.find(input => input.name === match[1] && (!match[2] || input.value === match[2]) && (!selector.endsWith(":checked") || input.checked)) || null;
    }
  };
  const window = { document, localStorage: storage, scrollTo() {}, confirm() { return true; }, LERNFORTSCHRITT: { benachrichtigen() {} } };
  const context = { window, document, globalThis: window, module: { exports: {} } };
  vm.runInNewContext(fs.readFileSync(file, "utf8"), context, { filename: file });
  return { document, steps, inputs };
}

for (const id of lessons) {
  const file = path.join(root, "js", id + ".js"), api = require(file);
  const storage = new Map();
  storage.getItem = key => storage.has(key) ? storage.get(key) : null;
  storage.setItem = (key, value) => storage.set(key, value);
  const first = makeBrowser(file, storage);

  for (const q of api.QUESTIONS) {
    const input = first.inputs.find(item => item.name === q.id && item.value === q.correct);
    assert(input, id + ": richtige Antwort ist im Formular");
    input.checked = true;
    input.listeners.change();
  }
  first.document.getElementById("check").listeners.click();
  const checked = JSON.parse(storage.getItem(api.KEY));
  assert.equal(api.progress(checked), 80, id + ": Selbstprüfung speichert 80 Prozent");

  first.steps.find(button => button.dataset.step === "case").listeners.click();
  first.steps.find(button => button.dataset.step === "exercise").listeners.click();
  assert.deepEqual(JSON.parse(storage.getItem(api.KEY)), checked, id + ": Zurücknavigation bewahrt den Checkzustand");

  const reloaded = makeBrowser(file, storage);
  assert.equal(reloaded.document.getElementById("pct").textContent, "Fortschritt: 80 %", id + ": Reload stellt die Anzeige wieder her");
  assert(reloaded.inputs.some(input => input.checked), id + ": Antworten sind nach Reload wieder markiert");
  reloaded.document.getElementById("check").listeners.click();
  reloaded.document.getElementById("check").listeners.click();
  assert.equal(api.progress(JSON.parse(storage.getItem(api.KEY))), 80, id + ": doppelte Selbstprüfung verändert den Fortschritt nicht");

  reloaded.steps.find(button => button.dataset.step === "finish").listeners.click();
  assert.equal(api.progress(JSON.parse(storage.getItem(api.KEY))), 100, id + ": Abschluss zeigt 100 Prozent");
  reloaded.steps.find(button => button.dataset.step === "finish").listeners.click();
  assert.equal(api.progress(JSON.parse(storage.getItem(api.KEY))), 100, id + ": doppelter Abschluss bleibt stabil");
}

console.log("fortschritt-ablauf.test.js: PASS — gespeicherter Fortschritt nach Navigation und Neuladen");
