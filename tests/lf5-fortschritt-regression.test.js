"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const lessons = [
  "lf5-anweisung",
  "lf5-werte",
  "lf5-ablauf",
  "lf5-wiederholung",
  "lf5-ablage",
  "lf5-einordnen",
  "lf5-testfall",
  "lf5-doku",
  "lf5-format",
  "lf5-prozess"
];
const values = new Map();
const window = {
  localStorage: { getItem(key) { return values.has(key) ? values.get(key) : null; } },
  document: { createElement() { return { setAttribute() {} }; } }
};
const context = { window, document: window.document, globalThis: window };
vm.runInNewContext(fs.readFileSync(path.join(root, "js/fortschritt.js"), "utf8"), context);
const completion = window.LERNFORTSCHRITT;

function element(id) {
  const el = {
    id: id,
    hidden: false,
    textContent: "",
    style: {},
    dataset: {},
    checked: false,
    value: "",
    name: "",
    type: "",
    listeners: {},
    children: [],
    setAttribute(name, value) { this.attrs[name] = value; },
    removeAttribute(name) { delete this.attrs[name]; },
    getAttribute(name) { return Object.prototype.hasOwnProperty.call(this.attrs, name) ? this.attrs[name] : null; },
    appendChild(child) { this.children.push(child); return child; },
    append() { for (const child of arguments) this.children.push(child); },
    focus() {},
    addEventListener(type, handler) {
      this.listeners[type] = this.listeners[type] || [];
      this.listeners[type].push(handler);
    },
    click() { (this.listeners.click || []).forEach((handler) => handler.call(this)); },
    change() { (this.listeners.change || []).forEach((handler) => handler.call(this)); }
  };
  el.attrs = {};
  return el;
}

function page(html) {
  const nodes = [element("bar"), element("pct"), element("main"), element("result"), element("done"), element("questions"), element("check"), element("reset"), element("reset-all")];
  const byId = Object.fromEntries(nodes.map((node) => [node.id, node]));
  const start = html.match(/<p id="pct"[^>]*>([^<]+)<\/p>/);
  byId.pct.textContent = start ? start[1] : "";
  byId.result.hidden = true;
  ["start", "case", "exercise", "finish"].forEach((id) => {
    const section = element(id);
    section.hidden = id !== "start";
    nodes.push(section);
    byId[id] = section;
  });
  const controls = [];
  html.replace(/<button\b([^>]*)>([^<]*)<\/button>/g, (_, attrs, label) => {
    const button = element("");
    button.textContent = label;
    const step = attrs.match(/data-step="([^"]+)"/);
    const next = attrs.match(/data-next="([^"]+)"/);
    const id = attrs.match(/\bid="([^"]+)"/);
    if (step) { button.dataset.step = step[1]; controls.push(button); }
    if (next) { button.dataset.next = next[1]; controls.push(button); }
    if (id) { button.id = id[1]; byId[id[1]] = button; }
    if (/aria-current/.test(attrs)) button.setAttribute("aria-current", "step");
    nodes.push(button);
  });
  return {
    getElementById(id) {
      const walk = (node) => {
        if (node.id === id) return node;
        for (const child of node.children || []) {
          const found = walk(child);
          if (found) return found;
        }
        return null;
      };
      return byId[id] || nodes.map(walk).find(Boolean) || null;
    },
    createElement(tag) {
      const node = element("");
      node.tagName = tag;
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
      const named = selector.match(/input\[name="([^"]+)"\]\[value="([^"]+)"\]/);
      const matches = named ? all.filter((node) => node.name === named[1] && node.value === named[2]) : [];
      return { forEach(fn) { matches.forEach(fn); }, length: matches.length, 0: matches[0] };
    },
    nodes: nodes
  };
}

function boot(id, html, storage, confirm) {
  const host = {
    localStorage: storage,
    document: page(html),
    confirm: confirm,
    scrollTo() {},
    LERNFORTSCHRITT: { benachrichtigen() { host.notified = (host.notified || 0) + 1; } }
  };
  host.window = host;
  vm.runInNewContext(fs.readFileSync(path.join(root, "js", id + ".js"), "utf8"), host, { filename: id + ".js" });
  return host;
}

function stored(storage, key) {
  return JSON.parse(storage.getItem(key));
}

for (const id of lessons) {
  const lesson = require(path.join(root, "js", id + ".js"));
  const html = fs.readFileSync(path.join(root, "module", id + ".html"), "utf8");
  const source = fs.readFileSync(path.join(root, "js", id + ".js"), "utf8");
  const total = lesson.QUESTIONS.length + 1;
  const answers = Object.fromEntries(lesson.QUESTIONS.map((question) => [question.id, question.correct]));
  const start = "Fortschritt: 0 von " + total + " Schritten · Abschluss noch nicht geöffnet";
  const done = "Fortschritt: " + total + " von " + total + " Schritten · Abschluss geöffnet";
  assert.equal(lesson.ID, id, id + " keeps its existing lesson id");
  assert(html.includes('id="bar"'), id + " renders a progress bar");
  assert(html.includes('id="pct"') && html.includes(start), id + " renders its step progress text");
  assert.equal(lesson.progressText({}), start, id + " starts at zero steps");
  assert.equal(lesson.progress({ checked: true, answers, finish: true }), total, id + " counts every checked answer and the finish step");
  assert.equal(lesson.progressText({ checked: true, answers, finish: true }), done, id + " opens the finish step only after every answer");
  values.set(lesson.KEY, JSON.stringify({ checked: true, answers, finish: true }));
  assert.equal(completion.abgeschlossen(id), true, id + " receives the overview completion mark");
  answers[lesson.QUESTIONS[0].id] = "falsche-antwort";
  values.set(lesson.KEY, JSON.stringify({ checked: true, answers, finish: true }));
  assert.equal(completion.abgeschlossen(id), false, id + " stays unmarked when one checked answer is wrong");
  values.delete(lesson.KEY);
  assert.equal(completion.abgeschlossen(id), false, id + " loses its mark after progress reset");

  assert.equal(source.includes("addEventListener(\"click\""), true, id + " binds progress actions to one click listener");
  assert.equal(source.includes("dblclick") || source.includes("dblClick"), false, id + " has no separate double-click action");
  assert(source.includes("localStorage.getItem(KEY)") && source.includes("localStorage.setItem(KEY"), id + " reloads the same stored progress");

  const storage = {
    getItem(key) { return Object.prototype.hasOwnProperty.call(storage.values, key) ? storage.values[key] : null; },
    setItem(key, value) { storage.values[key] = String(value); },
    values: {}
  };
  const first = boot(id, html, storage, () => { throw new Error(id + " must not confirm during ordinary clicks"); });
  const doc = first.document;
  assert.equal(doc.getElementById("pct").textContent, start, id + " shows zero steps before the first click");
  assert.equal(doc.getElementById("finish").hidden, true, id + " keeps the finish step closed before it is opened");

  doc.querySelectorAll("[data-next]").find((button) => button.dataset.next === "case").click();
  doc.querySelectorAll("[data-next]").find((button) => button.dataset.next === "case").click();
  assert.equal(doc.getElementById("case").hidden, false, id + " stays on the same step after a second click");
  assert.equal(doc.getElementById("pct").textContent, start, id + " does not count a repeated navigation click as progress");
  assert.equal(storage.getItem(lesson.KEY), null, id + " does not store progress from a repeated navigation click");

  doc.querySelectorAll("[data-next]").find((button) => button.dataset.next === "exercise").click();
  lesson.QUESTIONS.forEach((question) => {
    const choice = doc.getElementById("questions").children
      .flatMap((field) => field.children)
      .filter((node) => node.className === "opts")
      .flatMap((group) => group.children)
      .flatMap((label) => label.children)
      .find((input) => input.name === question.id && input.value === question.correct);
    assert(choice, id + " renders the correct answer as a selectable choice");
    choice.checked = true;
    choice.change();
    choice.change();
  });
  const partial = "Fortschritt: 0 von " + total + " Schritten · Abschluss noch nicht geöffnet";
  assert.equal(doc.getElementById("pct").textContent, partial, id + " keeps an unchecked answer out of the step count");
  assert.equal(stored(storage, lesson.KEY).checked, false, id + " stores the answer without counting it before checking");

  const check = doc.getElementById("check");
  check.click();
  check.click();
  const checkedText = "Fortschritt: " + lesson.QUESTIONS.length + " von " + total + " Schritten · Abschluss noch nicht geöffnet";
  assert.equal(doc.getElementById("pct").textContent, checkedText, id + " counts each checked answer once");
  assert.equal(stored(storage, lesson.KEY).checked, true, id + " stores the checked answers before the finish step");
  assert.equal(completionFrom(storage, lesson.KEY, id), false, id + " stays unmarked before the finish step is opened");

  const beforeRefresh = storage.getItem(lesson.KEY);
  const reloaded = boot(id, html, storage, () => false);
  assert.equal(storage.getItem(lesson.KEY), beforeRefresh, id + " keeps the same stored progress across a refresh");
  assert.equal(reloaded.document.getElementById("pct").textContent, checkedText, id + " restores the step count after a refresh");
  assert.equal(reloaded.document.getElementById("finish").hidden, true, id + " keeps the finish step closed after a refresh");
  lesson.QUESTIONS.forEach((question) => {
    const selected = reloaded.document.querySelector('input[name="' + question.id + '"]:checked');
    assert.equal(selected && selected.value, question.correct, id + " restores the selected answer after a refresh");
  });

  reloaded.document.querySelectorAll("[data-step]").find((button) => button.dataset.step === "finish").click();
  reloaded.document.querySelectorAll("[data-step]").find((button) => button.dataset.step === "finish").click();
  assert.equal(reloaded.document.getElementById("pct").textContent, done, id + " opens the finish step once after a repeated click");
  assert.equal(reloaded.document.getElementById("finish").hidden, false, id + " shows the finish step after the repeated click");
  assert.equal(stored(storage, lesson.KEY).finish, true, id + " stores the opened finish step");
  values.set(lesson.KEY, storage.getItem(lesson.KEY));
  assert.equal(completion.abgeschlossen(id), true, id + " marks completion from the progress stored by the clicks");
  values.delete(lesson.KEY);

  const saved = storage.getItem(lesson.KEY);
  const declined = boot(id, html, storage, () => false);
  declined.document.getElementById("reset-all").click();
  declined.document.getElementById("reset-all").click();
  assert.equal(storage.getItem(lesson.KEY), saved, id + " keeps stored progress when reset is declined twice");
  assert.equal(declined.document.getElementById("pct").textContent, done, id + " keeps the visible step count when reset is declined");

  const accepted = boot(id, html, storage, () => true);
  accepted.document.getElementById("reset-all").click();
  assert.equal(stored(storage, lesson.KEY).finish, false, id + " clears the finish step when reset is confirmed");
  assert.equal(accepted.document.getElementById("pct").textContent, start, id + " returns to zero steps after a confirmed reset");
  values.set(lesson.KEY, storage.getItem(lesson.KEY));
  assert.equal(completion.abgeschlossen(id), false, id + " removes the overview mark after the confirmed reset");
  values.delete(lesson.KEY);
}

function completionFrom(storage, key, id) {
  values.set(key, storage.getItem(key));
  const marked = completion.abgeschlossen(id);
  values.delete(key);
  return marked;
}

assert.equal(completion.abgeschlossen("lf5"), false, "one completed lesson never marks the whole learning field complete");
console.log("lf5-fortschritt-regression.test.js: PASS — Schrittanzeige, Abschlussstatus, Refresh und Doppelklick der vorhandenen Lernfeld-5-Lektionen");
