"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const id = "lf6-qualitaet";

function element() {
  const el = {
    id: "",
    hidden: false,
    textContent: "",
    style: {},
    dataset: {},
    checked: false,
    value: "",
    name: "",
    type: "",
    className: "",
    listeners: {},
    children: [],
    attrs: {},
    setAttribute(name, value) { this.attrs[name] = value; },
    removeAttribute(name) { delete this.attrs[name]; },
    getAttribute(name) { return Object.prototype.hasOwnProperty.call(this.attrs, name) ? this.attrs[name] : null; },
    appendChild(child) { this.children.push(child); return child; },
    focus() {},
    addEventListener(type, handler) {
      this.listeners[type] = this.listeners[type] || [];
      this.listeners[type].push(handler);
    },
    click() { (this.listeners.click || []).forEach((handler) => handler.call(this)); },
    change() { (this.listeners.change || []).forEach((handler) => handler.call(this)); }
  };
  return el;
}

function page(html) {
  const nodes = ["bar", "pct", "main", "result", "done", "questions", "check", "reset", "reset-all"].map((name) => {
    const node = element();
    node.id = name;
    return node;
  });
  const byId = Object.fromEntries(nodes.map((node) => [node.id, node]));
  const start = html.match(/<p id="pct"[^>]*>([^<]+)<\/p>/);
  byId.pct.textContent = start ? start[1] : "";
  byId.result.hidden = true;
  ["start", "case", "exercise", "finish"].forEach((name) => {
    const section = element();
    section.id = name;
    section.hidden = name !== "start";
    nodes.push(section);
    byId[name] = section;
  });
  const controls = [];
  html.replace(/<button\b([^>]*)>([^<]*)<\/button>/g, (_, attrs, label) => {
    const button = element();
    button.textContent = label;
    const step = attrs.match(/data-step="([^"]+)"/);
    const next = attrs.match(/data-next="([^"]+)"/);
    const buttonId = attrs.match(/\bid="([^"]+)"/);
    if (step) { button.dataset.step = step[1]; controls.push(button); }
    if (next) { button.dataset.next = next[1]; controls.push(button); }
    if (buttonId) { button.id = buttonId[1]; byId[buttonId[1]] = button; }
    if (/aria-current/.test(attrs)) button.setAttribute("aria-current", "step");
    nodes.push(button);
  });
  return {
    getElementById(name) {
      if (byId[name]) return byId[name];
      const walk = (node) => {
        if (node.id === name) return node;
        for (const child of node.children || []) {
          const found = walk(child);
          if (found) return found;
        }
        return null;
      };
      return nodes.map(walk).find(Boolean) || null;
    },
    createElement(tag) {
      const node = element();
      node.tagName = tag;
      return node;
    },
    createTextNode(text) {
      const node = element();
      node.textContent = text;
      return node;
    },
    querySelector(selector) {
      const walk = (node, found) => {
        found.push(node);
        for (const child of node.children || []) walk(child, found);
        return found;
      };
      const all = nodes.flatMap((node) => walk(node, []));
      const checked = selector.match(/input\[name="([^"]+)"\]:checked/);
      if (checked) return all.find((node) => node.name === checked[1] && node.checked) || null;
      const named = selector.match(/input\[name="([^"]+)"\]\[value="([^"]+)"\]/);
      if (named) return all.find((node) => node.name === named[1] && node.value === named[2]) || null;
      return null;
    },
    querySelectorAll(selector) {
      if (selector === "[data-step]") return controls.filter((node) => node.dataset.step);
      if (selector === "[data-next]") return controls.filter((node) => node.dataset.next);
      const walk = (node, found) => {
        found.push(node);
        for (const child of node.children || []) walk(child, found);
        return found;
      };
      const all = nodes.flatMap((node) => walk(node, []));
      if (selector === '#questions input[type="radio"]') return all.filter((node) => node.type === "radio");
      return [];
    }
  };
}

function historyFor(host) {
  const stack = [{ lf6Step: "start" }];
  return {
    pushState(state) { stack.push(state); },
    replaceState(state) { stack[stack.length - 1] = state; },
    back() {
      if (stack.length < 2) return false;
      stack.pop();
      const state = stack[stack.length - 1];
      (host.listeners.popstate || []).forEach((handler) => handler({ state: state }));
      return true;
    },
    depth() { return stack.length; }
  };
}

function boot(html, storage) {
  const host = {
    localStorage: storage,
    document: page(html),
    confirm() { throw new Error("Zurück darf keine Bestätigung verlangen"); },
    listeners: {},
    addEventListener(type, handler) {
      host.listeners[type] = host.listeners[type] || [];
      host.listeners[type].push(handler);
    },
    LERNFORTSCHRITT: { benachrichtigen() { host.notified = (host.notified || 0) + 1; } }
  };
  host.history = historyFor(host);
  vm.runInNewContext(fs.readFileSync(path.join(root, "js", id + ".js"), "utf8"), host, { filename: id + ".js" });
  return host;
}

function stored(storage, key) {
  return JSON.parse(storage.getItem(key));
}

function visibleStep(doc) {
  return ["start", "case", "exercise", "finish"].find((name) => doc.getElementById(name).hidden === false);
}

const lesson = require(path.join(root, "js", id + ".js"));
const html = fs.readFileSync(path.join(root, "module", id + ".html"), "utf8");
const source = fs.readFileSync(path.join(root, "js", id + ".js"), "utf8");
const total = lesson.QUESTIONS.length + 1;
const answers = Object.fromEntries(lesson.QUESTIONS.map((question) => [question.id, question.correct]));
const start = "Fortschritt: 0 von " + total + " Schritten · Abschluss noch nicht geöffnet";
const checkedText = "Fortschritt: " + lesson.QUESTIONS.length + " von " + total + " Schritten · Abschluss noch nicht geöffnet";
const done = "Fortschritt: " + total + " von " + total + " Schritten · Abschluss geöffnet";

assert.equal(lesson.progress({ checked: true, answers, finish: true, step: "exercise" }), total, "Antworten und Abschluss zählen, der sichtbare Schritt nicht");
assert.equal(lesson.progress({ checked: true, answers, finish: true, step: "start" }), total, "Zurück auf den Überblick ändert die Zahl nicht");
assert(source.includes('if (id === "finish" && !s.finish)'), "der Abschluss wird nur beim ersten Öffnen gezählt");
assert(source.includes("fromHistory"), "Browser-Zurück wechselt nur die Ansicht");
assert(html.includes('data-next="start"') && html.includes("Zurück"), "die Lektion behält ihren eigenen Zurück-Knopf");

const storage = {
  getItem(key) { return Object.prototype.hasOwnProperty.call(storage.values, key) ? storage.values[key] : null; },
  setItem(key, value) { storage.writes = (storage.writes || 0) + 1; storage.values[key] = String(value); },
  values: {}
};
const first = boot(html, storage);
const doc = first.document;
assert.equal(visibleStep(doc), "start");
assert.equal(doc.getElementById("pct").textContent, start);
assert.equal(storage.getItem(lesson.KEY), null, "der Überblick allein speichert noch nichts");

doc.querySelectorAll("[data-next]").find((button) => button.dataset.next === "case").click();
assert.equal(visibleStep(doc), "case");
assert.equal(doc.getElementById("pct").textContent, start, "das Beispiel zählt nicht als Fortschritt");
assert.equal(first.history.depth(), 2);

assert.equal(first.history.back(), true);
assert.equal(visibleStep(doc), "start", "Zurück aus dem Beispiel zeigt wieder den Überblick");
assert.equal(doc.getElementById("pct").textContent, start, "Zurück aus dem Beispiel bleibt bei null");
assert.equal(stored(storage, lesson.KEY).step, "case", "Zurück lässt den gespeicherten Schritt stehen");
assert.equal(lesson.progress(stored(storage, lesson.KEY)), 0, "der gespeicherte Schritt zählt nicht als Fortschritt");
const writesAfterCase = storage.writes;
const notifiedAfterCase = first.notified || 0;
assert.equal(first.history.back(), false, "ein zweites Zurück hat keinen weiteren Schritt");
assert.equal(storage.writes, writesAfterCase, "Zurück schreibt den Fortschritt nicht noch einmal");
assert.equal(first.notified || 0, notifiedAfterCase, "Zurück meldet keinen neuen Fortschritt");

doc.querySelectorAll("[data-next]").find((button) => button.dataset.next === "case").click();
doc.querySelectorAll("[data-next]").find((button) => button.dataset.next === "exercise").click();
lesson.QUESTIONS.forEach((question) => {
  const choice = doc.getElementById("questions").children
    .flatMap((field) => field.children)
    .filter((node) => node.className === "opts")
    .flatMap((group) => group.children)
    .flatMap((label) => label.children)
    .find((input) => input.name === question.id && input.value === question.correct);
  assert(choice, "die richtige Antwort ist wählbar: " + question.id);
  choice.checked = true;
  choice.change();
});
doc.getElementById("check").click();
assert.equal(doc.getElementById("pct").textContent, checkedText, "jede geprüfte Antwort zählt einmal");
assert.equal(stored(storage, lesson.KEY).finish, false);
const savedExercise = storage.getItem(lesson.KEY);
const writesAfterCheck = storage.writes;

assert.equal(first.history.back(), true, "Zurück mitten in der Übung");
assert.equal(visibleStep(doc), "case");
assert.equal(doc.getElementById("exercise").hidden, true);
assert.equal(doc.getElementById("pct").textContent, checkedText, "Zurück aus der Übung zählt nicht noch einmal");
assert.equal(storage.getItem(lesson.KEY), savedExercise, "Zurück schreibt den Fortschritt nicht neu");
assert.equal(storage.writes, writesAfterCheck, "Zurück erzeugt keinen zweiten Speichervorgang");
assert.equal(stored(storage, lesson.KEY).step, "exercise", "der gespeicherte Schritt bleibt die Übung");

doc.querySelectorAll("[data-next]").find((button) => button.dataset.next === "exercise").click();
assert.equal(visibleStep(doc), "exercise");
assert.equal(storage.writes, writesAfterCheck + 1, "die Rückkehr speichert nur den sichtbaren Schritt");
assert.equal(stored(storage, lesson.KEY).finish, false);
assert.equal(doc.getElementById("pct").textContent, checkedText, "die Rückkehr zur Übung zählt die Antworten nicht doppelt");

doc.querySelectorAll("[data-step]").find((button) => button.dataset.step === "finish").click();
assert.equal(visibleStep(doc), "finish");
assert.equal(doc.getElementById("pct").textContent, done, "der Abschluss zählt einmal");
assert.equal(stored(storage, lesson.KEY).finish, true);
const finished = storage.getItem(lesson.KEY);
const writesAfterFinish = storage.writes;
