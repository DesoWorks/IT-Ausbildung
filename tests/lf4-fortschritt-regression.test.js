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
  "lf4-vorfall"
];
const values = new Map();
const window = {
  localStorage: {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); }
  },
  document: { createElement() { return { setAttribute() {} }; } },
  confirm() { return false; },
  scrollTo() {}
};
const context = { window, document: window.document, globalThis: window };
vm.runInNewContext(fs.readFileSync(path.join(root, "js/fortschritt.js"), "utf8"), context);
const completion = window.LERNFORTSCHRITT;

function replay(source, lesson, state) {
  const nodes = new Map();
  const clicks = [];
  lesson.STEPS.forEach((id) => nodes.set(id, { id, hidden: id !== "start", textContent: "", style: {}, children: [], focus() {}, setAttribute() {}, addEventListener() {}, appendChild(child) { this.children.push(child); return child; }, append() {} }));
  function element(id) {
    if (!nodes.has(id)) nodes.set(id, { id, hidden: id !== "start", textContent: "", style: {}, children: [], focus() {}, setAttribute() {}, addEventListener() {}, appendChild(child) { this.children.push(child); return child; }, append() {} });
    return nodes.get(id);
  }
  const finish = { dataset: { step: "finish", next: "finish" }, setAttribute() {}, removeAttribute() {}, addEventListener(type, handler) { if (type === "click") clicks.push(handler); } };
  const sandbox = {
    g: {
      localStorage: window.localStorage,
      document: {
        getElementById: element,
        createElement() { return { hidden: false, textContent: "", className: "", style: {}, children: [], setAttribute() {}, appendChild(child) { this.children.push(child); return child; }, append() {}, addEventListener() {} }; },
        querySelector() { return null; },
        querySelectorAll(selector) {
          if (selector === "[data-step]" || selector === "[data-next]") return [finish];
          return [];
        }
      },
      LERNFORTSCHRITT: completion,
      confirm() { return false; },
      scrollTo() {}
    },
    KEY: lesson.KEY,
    Q: lesson.QUESTIONS,
    STEPS: lesson.STEPS,
    evaluate: lesson.evaluate,
    progress: lesson.progress,
    progressText: lesson.progressText,
    s: state
  };
  vm.runInNewContext(
    "(function (g) {\n" + source + "\n})(g);",
    sandbox,
    { filename: lesson.ID + "-replay.js" }
  );
  return { nodes, clicks, state: sandbox.s };
}

for (const id of lessons) {
  const lesson = require(path.join(root, "js", id + ".js"));
  const source = fs.readFileSync(path.join(root, "js", id + ".js"), "utf8");
  const marker = "if (!g.document) return;";
  const helpers = source.slice(0, source.indexOf(marker)).split("\n").filter((line) => /^\s*function (percent|barWidth|total)\(/.test(line)).join("\n");
  const browser = helpers + "\n" + source.slice(source.indexOf(marker) + marker.length, source.lastIndexOf("})("));
  const html = fs.readFileSync(path.join(root, "module", id + ".html"), "utf8");
  const total = lesson.QUESTIONS.length + 1;
  const answers = Object.fromEntries(lesson.QUESTIONS.map((question) => [question.id, question.correct]));
  const start = "Fortschritt: 0 von " + total + " Schritten · Abschluss noch nicht geöffnet";
  const halfwayText = "Fortschritt: " + (total - 1) + " von " + total + " Schritten · Abschluss noch nicht geöffnet";
  const done = "Fortschritt: " + total + " von " + total + " Schritten · Abschluss geöffnet";
  assert.equal(lesson.ID, id, id + " keeps its existing lesson id");
  assert(browser.includes('if (id === "finish")') && browser.includes("s.finish = true"), id + " still opens completion from the existing finish step");
  assert(html.includes('id="bar"') && html.includes('id="check"'), id + " renders the existing progress and check controls");
  assert(html.includes('data-step="finish"') && html.includes('data-next="finish"'), id + " keeps both existing completion controls");
  assert(html.includes('id="pct"') && html.includes(start), id + " renders its step progress text");
  assert.equal(lesson.progressText({}), start, id + " starts at zero steps");
  assert.equal(lesson.progress({ checked: true, answers, finish: true }), total, id + " counts every checked answer and the finish step");
  assert.equal(lesson.progressText({ checked: true, answers, finish: true }), done, id + " opens the finish step only after every answer");

  values.set(lesson.KEY, JSON.stringify({ checked: true, answers, finish: false }));
  const refreshed = replay(browser, lesson, { answers: {}, checked: false, finish: false });
  assert.equal(refreshed.nodes.get("pct").textContent, halfwayText, id + " restores the saved step text after a refresh halfway");
  assert.equal(refreshed.nodes.get("finish").hidden, true, id + " stays before the finish section after a refresh halfway");
  assert.equal(completion.abgeschlossen(id), false, id + " stays unmarked after a refresh before the finish step");
  assert.deepEqual(JSON.parse(values.get(lesson.KEY)).answers, answers, id + " keeps the saved answers across the refresh");

  values.set(lesson.KEY, JSON.stringify({ checked: true, answers, finish: false }));
  const doubled = replay(browser, lesson, { answers: {}, checked: false, finish: false });
  assert.equal(doubled.clicks.length, 2, id + " binds the step control and the completion button once each");
  doubled.clicks.forEach((handler) => handler());
  const saved = JSON.parse(values.get(lesson.KEY));
  assert.equal(saved.finish, true, id + " records the finish step on the first completion click");
  assert.equal(saved.checked, true, id + " keeps the checked answers when completion is double-clicked");
  assert.deepEqual(saved.answers, answers, id + " does not duplicate or drop answers on a double completion click");
  assert.equal(doubled.nodes.get("pct").textContent, done, id + " shows the opened finish step after a double completion click");
  assert.equal(doubled.nodes.get("finish").hidden, false, id + " shows the finish section after a double completion click");
  assert.equal(completion.abgeschlossen(id), true, id + " receives the overview completion mark once");
  doubled.clicks.forEach((handler) => handler());
  assert.equal(values.get(lesson.KEY), JSON.stringify(saved), id + " keeps the same stored progress when completion is clicked again");

  const wrong = Object.assign({}, answers, { [lesson.QUESTIONS[0].id]: "falsche-antwort" });
  values.set(lesson.KEY, JSON.stringify({ checked: true, answers: wrong, finish: true }));
  assert.equal(completion.abgeschlossen(id), false, id + " stays unmarked when one checked answer is wrong");
  values.delete(lesson.KEY);
  assert.equal(completion.abgeschlossen(id), false, id + " loses its mark after progress reset");
}

assert.equal(completion.abgeschlossen("lf4"), false, "one completed lesson never marks the whole learning field complete");
console.log("lf4-fortschritt-regression.test.js: PASS — Schrittanzeige, Refresh und Doppelklick der vorhandenen Lernfeld-4-Lektionen");
