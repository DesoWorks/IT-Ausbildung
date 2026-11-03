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
    }
  };
}

function historyFor(host) {
  const stack = [{ lf5Step: "start" }];
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

function boot(id, html, storage, confirm) {
  const host = {
    localStorage: storage,
    document: page(html),
    confirm: confirm,
    scrollTo() {},
    listeners: {},
    addEventListener(type, handler) {
      host.listeners[type] = host.listeners[type] || [];
      host.listeners[type].push(handler);
    },
    LERNFORTSCHRITT: { benachrichtigen() { host.notified = (host.notified || 0) + 1; } }
  };
  host.history = historyFor(host);
  host.window = host;
  vm.runInNewContext(fs.readFileSync(path.join(root, "js", id + ".js"), "utf8"), host, { filename: id + ".js" });
  return host;
}

function stored(storage, key) {
  return JSON.parse(storage.getItem(key));
}

function visibleStep(doc) {
  return ["start", "case", "exercise", "finish"].find((id) => doc.getElementById(id).hidden === false);
}

function currentMarker(doc) {
  const marked = doc.querySelectorAll("[data-step]").filter((button) => button.getAttribute("aria-current") === "step");
  assert.equal(marked.length, 1, "exactly one step marker stays current");
  return marked[0].dataset.step;
}

for (const id of lessons) {
  const lesson = require(path.join(root, "js", id + ".js"));
  const html = fs.readFileSync(path.join(root, "module", id + ".html"), "utf8");
  const source = fs.readFileSync(path.join(root, "js", id + ".js"), "utf8");
  const total = lesson.QUESTIONS.length + 1;
  const answers = Object.fromEntries(lesson.QUESTIONS.map((question) => [question.id, question.correct]));
  const start = "Fortschritt: 0 von " + total + " Schritten · Abschluss noch nicht geöffnet";
  const checkedText = "Fortschritt: " + lesson.QUESTIONS.length + " von " + total + " Schritten · Abschluss noch nicht geöffnet";
  const done = "Fortschritt: " + total + " von " + total + " Schritten · Abschluss geöffnet";
  assert.equal(lesson.progress({ checked: true, answers, finish: true, step: "start" }), total, id + " counts answers and finish, not the visible step");
  assert(source.includes('addEventListener("popstate"'), id + " restores the visible step from the browser back button");
  assert(html.includes('data-next="start"') && html.includes("Zurück"), id + " still offers its own back button inside the lesson");

  const storage = {
    getItem(key) { return Object.prototype.hasOwnProperty.call(storage.values, key) ? storage.values[key] : null; },
    setItem(key, value) { storage.writes = (storage.writes || 0) + 1; storage.values[key] = String(value); },
    values: {}
  };
  const first = boot(id, html, storage, () => { throw new Error(id + " must not confirm during ordinary navigation"); });
  const doc = first.document;
  assert.equal(visibleStep(doc), "start", id + " starts on the overview");
  assert.equal(currentMarker(doc), "start", id + " marks the overview as the current step");
  assert.equal(doc.getElementById("pct").textContent, start, id + " shows zero steps before the first answer");
  assert.equal(storage.getItem(lesson.KEY), null, id + " does not store a step before the learner changes anything");

  doc.querySelectorAll("[data-next]").find((button) => button.dataset.next === "case").click();
  assert.equal(visibleStep(doc), "case", id + " opens the case after the learner continues");
  assert.equal(currentMarker(doc), "case", id + " moves the current marker with the lesson");
  assert.equal(doc.getElementById("pct").textContent, start, id + " does not count opening the case as progress");
  assert.equal(storage.getItem(lesson.KEY), null, id + " does not store progress just for opening the case");
  assert.equal(first.history.depth(), 2, id + " records the case so the browser back button can return");

  assert.equal(first.history.back(), true, id + " can leave the case with the browser back button");
  assert.equal(visibleStep(doc), "start", id + " returns to the overview after the browser back button");
  assert.equal(currentMarker(doc), "start", id + " restores the overview marker after the browser back button");
  assert.equal(doc.getElementById("pct").textContent, start, id + " keeps zero steps after backing out of the case");
  assert.equal(storage.getItem(lesson.KEY), null, id + " still stores nothing after backing out of the case");
  assert.equal(first.notified || 0, 0, id + " does not notify the overview when backing out of the case");

  doc.querySelectorAll("[data-next]").find((button) => button.dataset.next === "case").click();
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
  });
  const beforeCheck = storage.writes;
  doc.getElementById("check").click();
  assert.equal(doc.getElementById("pct").textContent, checkedText, id + " counts each checked answer once");
  assert.equal(stored(storage, lesson.KEY).checked, true, id + " stores the checked answers before the finish step");
  assert.equal(stored(storage, lesson.KEY).finish, false, id + " has not opened the finish step yet");
  assert.equal(stored(storage, lesson.KEY).step, "exercise", id + " remembers the exercise as the current step");
  const writesAfterCheck = storage.writes;
  assert(writesAfterCheck > beforeCheck, id + " writes the checked answers once");

  const saved = storage.getItem(lesson.KEY);
  assert.equal(first.history.back(), true, id + " can leave the exercise with the browser back button");
  assert.equal(visibleStep(doc), "case", id + " returns to the case after backing out of the exercise");
  assert.equal(currentMarker(doc), "case", id + " marks the case after backing out of the exercise");
  assert.equal(doc.getElementById("exercise").hidden, true, id + " hides the exercise after the browser back button");
  assert.equal(doc.getElementById("pct").textContent, checkedText, id + " keeps the checked step count after backing out");
  assert.equal(storage.getItem(lesson.KEY), saved, id + " does not rewrite or double-count progress on the browser back button");
  assert.equal(stored(storage, lesson.KEY).step, "exercise", id + " keeps the stored exercise when the browser only changes the visible step");
  values.set(lesson.KEY, storage.getItem(lesson.KEY));
  assert.equal(completion.abgeschlossen(id), false, id + " stays unmarked while the finish step is still closed");
  values.delete(lesson.KEY);

  doc.querySelectorAll("[data-next]").find((button) => button.dataset.next === "exercise").click();
  assert.equal(visibleStep(doc), "exercise", id + " returns to the exercise without repeating the check");
  assert.equal(storage.writes, writesAfterCheck, id + " does not store the same answers again when returning to the exercise");
  lesson.QUESTIONS.forEach((question) => {
    const selected = doc.querySelector('input[name="' + question.id + '"]:checked');
    assert.equal(selected && selected.value, question.correct, id + " keeps the selected answer after leaving and returning");
  });

  doc.querySelectorAll("[data-step]").find((button) => button.dataset.step === "finish").click();
  assert.equal(visibleStep(doc), "finish", id + " opens the finish step from the exercise");
  assert.equal(doc.getElementById("pct").textContent, done, id + " counts the finish step once");
  assert.equal(stored(storage, lesson.KEY).finish, true, id + " stores the opened finish step");
  const writesAfterFinish = storage.writes;
  const finished = storage.getItem(lesson.KEY);
  values.set(lesson.KEY, finished);
  assert.equal(completion.abgeschlossen(id), true, id + " marks completion from the stored answers");
  values.delete(lesson.KEY);

  assert.equal(first.history.back(), true, id + " can leave the finish step with the browser back button");
  assert.equal(visibleStep(doc), "exercise", id + " returns to the exercise after backing out of the finish step");
  assert.equal(doc.getElementById("finish").hidden, true, id + " hides the finish step after the browser back button");
  assert.equal(doc.getElementById("pct").textContent, done, id + " keeps the finished step count after backing out");
  assert.equal(storage.getItem(lesson.KEY), finished, id + " does not store the finish step a second time when backing out");
  assert.equal(storage.writes, writesAfterFinish, id + " does not write again when the browser back button leaves the finish step");
  values.set(lesson.KEY, storage.getItem(lesson.KEY));
  assert.equal(completion.abgeschlossen(id), true, id + " keeps the overview mark after backing out of the finish step");
  values.delete(lesson.KEY);

  doc.querySelectorAll("[data-step]").find((button) => button.dataset.step === "finish").click();
  assert.equal(storage.writes, writesAfterFinish, id + " does not count a repeated opening of the finish step");
  assert.equal(stored(storage, lesson.KEY).finish, true, id + " keeps the finish step stored after opening it again");
  assert.equal(doc.getElementById("pct").textContent, done, id + " keeps the same finished step count");

  const reloaded = boot(id, html, storage, () => false);
  assert.equal(visibleStep(reloaded.document), "finish", id + " restores the finish step after a refresh");
  assert.equal(reloaded.document.getElementById("pct").textContent, done, id + " restores the finished step count after a refresh");
  assert.equal(reloaded.history.back(), false, id + " has no earlier lesson step after a fresh page load");
  assert.equal(visibleStep(reloaded.document), "finish", id + " stays on the restored step when the browser history is empty");
  assert.equal(storage.getItem(lesson.KEY), finished, id + " does not rewrite progress when an empty browser history cannot go back");

  reloaded.document.getElementById("reset").click();
  assert.equal(Object.keys(stored(storage, lesson.KEY).answers).length, 0, id + " clears the answers on reset");
  assert.equal(stored(storage, lesson.KEY).finish, false, id + " clears the finish mark on reset");
  assert.equal(stored(storage, lesson.KEY).step, "finish", id + " keeps the visible step when the lesson reset clears only the answers");
  assert.equal(visibleStep(reloaded.document), "finish", id + " does not jump away when the lesson reset button is used");
  assert.equal(reloaded.document.getElementById("pct").textContent, start, id + " returns the step count to zero after reset");
}

{
  const id = "lf5-lernziel";
  const key = "it-ausbildung.lf5-lernziel.v1";
  const html = fs.readFileSync(path.join(root, "module", id + ".html"), "utf8");
  const source = fs.readFileSync(path.join(root, "js", id + "-rest.js"), "utf8");
  const fragenHost = { window: {}, document: undefined };
  fragenHost.window = fragenHost;
  vm.runInNewContext(fs.readFileSync(path.join(root, "js", id + ".js"), "utf8"), fragenHost, { filename: id + ".js" });
  assert.equal(fragenHost.__LF5_FRAGEN.length, 24, id + " keeps the twenty-four question self-check");
  assert(source.includes('addEventListener("pageshow"'), id + " restores the self-check when the browser returns");
  assert(!source.includes("lf5-abschluss"), id + " does not rebuild the removed summary page");
  const partial = { answers: { 0: "b" }, finish: false };
  const storage = {
    getItem(itemKey) { return Object.prototype.hasOwnProperty.call(storage.values, itemKey) ? storage.values[itemKey] : null; },
    setItem(itemKey, value) { storage.writes = (storage.writes || 0) + 1; storage.values[itemKey] = String(value); },
    removeItem(itemKey) { delete storage.values[itemKey]; },
    values: { [key]: JSON.stringify(partial) }
  };
  const saved = storage.getItem(key);
  const host = {
    localStorage: storage,
    document: {
      getElementById(elementId) {
        if (elementId === "lernziel-form") return { addEventListener() {}, querySelectorAll() { return []; } };
        if (elementId === "lernziel-fragen") return { textContent: "", appendChild() {} };
        if (elementId === "reset-dialog") return { close() {} };
        if (elementId === "lernziel-status") return { textContent: "", focus() {} };
        return { textContent: "", hidden: false, value: "", focus() {}, addEventListener() {} };
      },
      createElement() {
        return { setAttribute() {}, appendChild() {}, addEventListener() {}, className: "" };
      },
      createTextNode() { return { textContent: "" }; }
    },
    crypto: { subtle: { digest() { return Promise.resolve(new Uint8Array(32).buffer); } } },
    TextEncoder: class { encode(value) { return Buffer.from(String(value)); } },
    listeners: {},
    addEventListener(type, handler) {
      host.listeners[type] = host.listeners[type] || [];
      host.listeners[type].push(handler);
    },
    LERNFORTSCHRITT: { benachrichtigen() { host.notified = (host.notified || 0) + 1; } }
  };
  host.window = host;
  vm.runInNewContext(fs.readFileSync(path.join(root, "js", id + ".js"), "utf8"), host, { filename: id + ".js" });
  vm.runInNewContext(fs.readFileSync(path.join(root, "js", id + "-rest.js"), "utf8"), host, { filename: id + "-rest.js" });
  assert.equal(storage.getItem(key), saved, id + " does not rewrite the stored answer while restoring");
  assert.equal(storage.writes || 0, 0, id + " does not count the restored answer a second time");
  assert.equal(host.notified || 0, 0, id + " does not notify the overview while restoring");
  assert.equal(JSON.parse(storage.getItem(key)).answers[0], "b", id + " keeps the one stored answer");
  assert.equal(JSON.parse(storage.getItem(key)).finish, false, id + " stays unfinished while partly answered");
  const shown = host.document.getElementById("lernziel-status").textContent;
  (host.listeners.pageshow || []).forEach((handler) => handler({ persisted: false }));
  assert.equal(storage.getItem(key), saved, id + " leaves storage alone when the page is not restored from cache");
  (host.listeners.pageshow || []).forEach((handler) => handler({ persisted: true }));
  assert.equal(storage.getItem(key), saved, id + " does not store the same answer again on browser back");
  assert.equal(storage.writes || 0, 0, id + " does not write progress on browser back");
  assert.equal(host.notified || 0, 0, id + " does not mark the overview again after browser back");
  assert.equal(host.document.getElementById("lernziel-status").textContent, shown, id + " keeps the same open-answer count");
  assert.equal(html.includes("Lernzielkontrolle abgeben"), true, id + " still submits only through its own button");
  values.set(key, storage.getItem(key));
  assert.equal(completion.abgeschlossen(id), false, id + " stays unmarked after returning to a partial self-check");
  values.delete(key);
}
console.log("lf5-fortschritt-zurueck.test.js: PASS");
