"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const lessons = [
  "lf4-schutzbedarf",
  "lf4-schutzziele",
  "lf4-risiken",
  "lf4-handlungen",
  "lf4-zugang",
  "lf4-vorfall",
  "lf4-abschluss"
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

function boot(id, html, storage) {
  const host = {
    localStorage: storage,
    document: page(html),
    confirm() { return false; },
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

function completionFrom(storage, key, id) {
  values.set(key, storage.getItem(key));
  const marked = completion.abgeschlossen(id);
  values.delete(key);
  return marked;
}

function barWidth(lesson, state) {
  if (typeof lesson.barWidth === "function") return lesson.barWidth(state);
  if (typeof lesson.percent === "function") return lesson.percent(state);
  return Math.round(lesson.progress(state) / (lesson.QUESTIONS.length + 1) * 100);
}

for (const id of lessons) {
  const lesson = require(path.join(root, "js", id + ".js"));
  const html = fs.readFileSync(path.join(root, "module", id + ".html"), "utf8");
  const total = lesson.QUESTIONS.length + 1;
  const start = "Fortschritt: 0 von " + total + " Schritten · Abschluss noch nicht geöffnet";
  const emptyResult = lesson.evaluate({});
  assert.equal(emptyResult.empty, lesson.QUESTIONS.length, id + " treats an unanswered exercise as empty");
  assert.equal(emptyResult.correct, 0, id + " scores no correct answer on an empty submit");
  assert.equal(emptyResult.allCorrect, false, id + " does not accept an empty submit as complete");
  assert.equal(lesson.progress({ checked: true, answers: {}, finish: false }), 0, id + " stores no step progress for an empty checked submit");
  assert.equal(lesson.progressText({ checked: true, answers: {}, finish: false }), start, id + " keeps the zero-step text after an empty submit");
  assert.equal(barWidth(lesson, { checked: true, answers: {}, finish: false }), 0, id + " keeps the progress bar at zero after an empty submit");
  values.set(lesson.KEY, JSON.stringify({ checked: true, answers: {}, finish: false }));
  assert.equal(completion.abgeschlossen(id), false, id + " stays unmarked when only an empty submit is stored");
  values.set(lesson.KEY, JSON.stringify({ checked: true, answers: {}, finish: true }));
  assert.equal(completion.abgeschlossen(id), false, id + " stays unmarked when the finish step is opened after an empty submit");
  values.delete(lesson.KEY);

  const storage = {
    getItem(key) { return Object.prototype.hasOwnProperty.call(storage.values, key) ? storage.values[key] : null; },
    setItem(key, value) { storage.values[key] = String(value); },
    values: {}
  };
  const host = boot(id, html, storage);
  const doc = host.document;
  assert.equal(storage.getItem(lesson.KEY), null, id + " stores nothing before the empty submit");
  doc.querySelectorAll("[data-next]").find((button) => button.dataset.next === "exercise").click();
  assert.equal(doc.getElementById("exercise").hidden, false, id + " opens the exercise before the empty submit");
  assert.equal(storage.getItem(lesson.KEY), null, id + " does not store progress just by opening the exercise");

  const check = doc.getElementById("check");
  check.click();
  const saved = stored(storage, lesson.KEY);
  assert.equal(saved.checked, true, id + " records that the empty exercise was checked");
  assert.deepEqual(saved.answers, {}, id + " stores no selected answer from the empty submit");
  assert.equal(saved.finish, false, id + " does not open the finish step from the empty submit");
  assert.equal(lesson.progress(saved), 0, id + " derives zero steps from the stored empty submit");
  assert.equal(doc.getElementById("pct").textContent, start, id + " keeps the visible step count at zero after the empty submit");
  assert.equal(doc.getElementById("bar").style.width, "0%", id + " keeps the visible progress bar at zero after the empty submit");
  const result = doc.getElementById("result");
  assert.equal(result.hidden, false, id + " shows feedback after the empty submit");
  assert.equal(result.children[0] && result.children[0].textContent, "Noch keine Antwort gewählt", id + " names the empty submit instead of a completed exercise");
  assert.equal(result.children.filter((node) => node.textContent && node.textContent.indexOf("○ Nicht beantwortet:") === 0).length, lesson.QUESTIONS.length, id + " marks every unanswered question");
  check.click();
  assert.equal(lesson.progress(stored(storage, lesson.KEY)), 0, id + " still stores no step progress after a second empty submit");
  assert.equal(doc.getElementById("pct").textContent, start, id + " keeps zero steps after a second empty submit");
  assert.equal(completionFrom(storage, lesson.KEY, id), false, id + " does not mark the overview complete after the empty submit");

  const beforeRefresh = storage.getItem(lesson.KEY);
  const reloaded = boot(id, html, storage);
  assert.equal(storage.getItem(lesson.KEY), beforeRefresh, id + " does not turn the empty submit into stored progress on refresh");
  assert.equal(reloaded.document.getElementById("pct").textContent, start, id + " restores zero steps after refreshing an empty submit");
  assert.equal(reloaded.document.getElementById("finish").hidden, true, id + " keeps the finish step closed after refreshing an empty submit");
  lesson.QUESTIONS.forEach((question) => {
    const selected = reloaded.document.querySelector('input[name="' + question.id + '"]:checked');
    assert.equal(selected, null, id + " restores no selected answer after an empty submit");
  });
  assert.equal(completionFrom(storage, lesson.KEY, id), false, id + " stays unmarked after the empty submit is reloaded");
}

assert.equal(completion.abgeschlossen("lf4"), false, "an empty Lernfeld 4 submit never marks the whole learning field complete");
console.log("lf4-fortschritt-leere-abgabe.test.js: PASS — leere Abgabe speichert keinen Lernfeld-4-Fortschritt");
