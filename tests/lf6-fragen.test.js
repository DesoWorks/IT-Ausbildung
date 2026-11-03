"use strict";
var assert = require("assert");
var fs = require("fs");
var path = require("path");
var L = require("../js/lf6-fragen.js");

var RICHTIG = { q1: "seitwann", q2: "umfang", q3: "lampe", q4: "anzeige" };
var N = 4;

assert.strictEqual(L.ID, "lf6-fragen");
assert.strictEqual(L.KEY, "it-ausbildung.lf6-fragen.v1");
assert.strictEqual(globalThis.LF6_FRAGEN, L);
assert.deepStrictEqual(L.STEPS, ["start", "case", "exercise", "finish"]);
assert.strictEqual(L.QUESTIONS.length, N);
assert.strictEqual(new Set(L.QUESTIONS.map(function (q) { return q.id; })).size, N);

var positionen = [];
L.QUESTIONS.forEach(function (q) {
  assert.strictEqual(RICHTIG[q.id], q.correct, "richtige Antwort " + q.id);
  assert.ok(q.prompt.length > 0, "Fragetext vorhanden: " + q.id);
  assert.strictEqual(q.options.length, 3);
  assert.strictEqual(new Set(q.options.map(function (o) { return o.id; })).size, 3);
  var pos = q.options.findIndex(function (o) { return o.id === q.correct; });
  assert.ok(pos !== -1, "richtige Option vorhanden: " + q.id);
  positionen.push(pos);
  var richtig = q.options[pos].label.length;
  var laengster = Math.max.apply(null, q.options.filter(function (o) { return o.id !== q.correct; }).map(function (o) { return o.label.length; }));
  assert.ok(richtig < laengster, "richtige Antwort ist nie die längste: " + q.id);
  q.options.forEach(function (o) {
    assert.ok(o.feedback.length >= 40, "Feedback mindestens 40 Zeichen: " + q.id + "/" + o.id);
    var antwort = {};
    antwort[q.id] = o.id;
    var result = L.evaluate(antwort).results.find(function (r) { return r.id === q.id; });
    assert.strictEqual(result.status, o.id === q.correct ? "correct" : "wrong");
    assert.strictEqual(result.optionId, o.id);
    assert.strictEqual(result.feedback, o.feedback);
  });
});
assert.strictEqual(new Set(positionen).size, 3, "alle drei Antwortpositionen werden genutzt");
positionen.forEach(function (pos, index) {
  if (index) assert.notStrictEqual(pos, positionen[index - 1], "richtige Position wechselt nach jeder Frage");
});

var leer = L.evaluate({});
assert.strictEqual(leer.empty, N);
assert.strictEqual(leer.correct, 0);
assert.strictEqual(leer.wrong, 0);
assert.strictEqual(leer.allCorrect, false);
assert.strictEqual(L.evaluate().empty, N);
assert.strictEqual(L.evaluate(null).empty, N);
assert.strictEqual(L.evaluate({ q1: "unbekannt" }).empty, N);

var alle = L.evaluate(RICHTIG);
assert.strictEqual(alle.allCorrect, true);
assert.strictEqual(alle.correct, N);
var ev = L.evaluate(Object.assign({}, RICHTIG, { q2: "passwort" }));
assert.strictEqual(ev.wrong, 1);
assert.strictEqual(ev.correct, N - 1);
assert.strictEqual(ev.empty, 0);
assert.strictEqual(ev.allCorrect, false);
assert.strictEqual(L.evaluate({ q1: "bestellen", q2: "festlegen", q3: "zugang", q4: "diagnose" }).wrong, N);

assert.ok(L.progressText({}).indexOf("Fortschritt: 0 von 5 Schritten") === 0);
assert.strictEqual(L.progress(), 0);
assert.strictEqual(L.barWidth(), 0);
assert.strictEqual(L.progress({ answers: RICHTIG, checked: false }), 0, "ungeprüfte Antworten zählen nicht");
assert.strictEqual(L.progress({ answers: RICHTIG, checked: true }), 4);
assert.strictEqual(L.progress({ answers: RICHTIG, checked: true, finish: true }), 5);
assert.strictEqual(L.barWidth({ answers: RICHTIG, checked: true, finish: true }), 100);
assert.strictEqual(L.barWidth({ finish: true }), 20);
assert.strictEqual(L.progress({ answers: { q1: "seitwann", q2: "passwort" }, checked: true }), 1);
assert.strictEqual(L.progressText({ answers: RICHTIG, checked: true, finish: true }), "Fortschritt: 5 von 5 Schritten · Abschluss geöffnet");

// Alle 256 Kombinationen aus drei Optionen und unbeantworteter Frage prüfen.
var kombinationen = 0;
function pruefeKombination(index, answers, correct, wrong, empty) {
  if (index === N) {
    var result = L.evaluate(answers);
    assert.strictEqual(result.correct, correct);
    assert.strictEqual(result.wrong, wrong);
    assert.strictEqual(result.empty, empty);
    assert.strictEqual(result.allCorrect, correct === N);
    assert.strictEqual(L.progress({ answers: answers, checked: true }), correct);
    assert.strictEqual(L.progress({ answers: answers, checked: true, finish: true }), correct + 1);
    kombinationen += 1;
    return;
  }
  var q = L.QUESTIONS[index];
  [null].concat(q.options).forEach(function (o) {
    var next = Object.assign({}, answers);
    if (o) next[q.id] = o.id;
    pruefeKombination(index + 1, next, correct + (o && o.id === q.correct ? 1 : 0), wrong + (o && o.id !== q.correct ? 1 : 0), empty + (!o ? 1 : 0));
  });
}
pruefeKombination(0, {}, 0, 0, 0);
assert.strictEqual(kombinationen, 256);

var html = fs.readFileSync(path.join(__dirname, "..", "module", "lf6-fragen.html"), "utf8");
var js = fs.readFileSync(path.join(__dirname, "..", "js", "lf6-fragen.js"), "utf8");
assert.ok(html.includes("<title>Die Störung enger fassen</title>"));
assert.ok(html.includes("<h1>Die Störung enger fassen</h1>"));
assert.ok(html.includes('data-page="lf6-fragen"'));
assert.ok(html.includes("Fortschritt: 0 von 5 Schritten · Abschluss noch nicht geöffnet"));
assert.ok(!html.includes("Fortschritt: 0 %"));
assert.ok(html.includes('src="../js/lf6-fragen.js"'));
assert.ok(/<footer[^>]*>.*Lernfeld 6 · Serviceanfragen bearbeiten/.test(html));
["Nordlicht IT-Service", "Samira", "Herr Berger", "Empfang", "Monitor bleibt schwarz", "Seite 17", "40 Stunden", "2. Ausbildungsjahr"].forEach(function (text) {
  assert.ok(html.includes(text), "Kontext vorhanden: " + text);
});
L.STEPS.concat(["main", "bar", "pct", "questions", "check", "reset", "reset-all", "result", "done"]).forEach(function (id) {
  assert.strictEqual(html.split('id="' + id + '"').length - 1, 1, "DOM-Ziel genau einmal: " + id);
});
L.STEPS.forEach(function (step) {
  assert.ok(html.includes('data-step="' + step + '"'), "Navigation vorhanden: " + step);
});
Array.from(html.matchAll(/(?:src|href)="([^"#]+)"/g)).forEach(function (match) {
  assert.ok(fs.existsSync(path.resolve(__dirname, "..", "module", match[1])), "lokaler Verweis existiert: " + match[1]);
});
assert.ok(!/lf5|LF5|Datenbank|Übungskarte/.test(html + js), "keine fremden Vorlageninhalte");
assert.ok(js.includes("lf6FragenStep"), "eigener Verlaufsschlüssel");
assert.ok(!js.includes("lf6-anfrage"), "unabhängig von der parallelen Lektion");

var vm = require("vm");

function element(id) {
  var el = {
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
    attrs: {},
    setAttribute: function (name, value) { this.attrs[name] = value; },
    removeAttribute: function (name) { delete this.attrs[name]; },
    appendChild: function (child) { this.children.push(child); return child; },
    append: function () { for (var i = 0; i < arguments.length; i++) this.children.push(arguments[i]); },
    focus: function () {},
    addEventListener: function (type, handler) {
      this.listeners[type] = this.listeners[type] || [];
      this.listeners[type].push(handler);
    },
    click: function () { (this.listeners.click || []).forEach(function (handler) { handler.call(el); }); }
  };
  return el;
}

function page() {
  var nodes = ["bar", "pct", "main", "result", "done", "questions", "check", "reset", "reset-all"].map(element);
  var byId = {};
  nodes.forEach(function (node) { byId[node.id] = node; });
  byId.pct.textContent = "Fortschritt: 0 von 5 Schritten · Abschluss noch nicht geöffnet";
  byId.result.hidden = true;
  ["start", "case", "exercise", "finish"].forEach(function (id) {
    var section = element(id);
    section.hidden = id !== "start";
    nodes.push(section);
    byId[id] = section;
  });
  var controls = [];
  html.replace(/<button\b([^>]*)>([^<]*)<\/button>/g, function (_, attrs, label) {
    var button = element("");
    button.textContent = label;
    var step = attrs.match(/data-step="([^"]+)"/);
    var next = attrs.match(/data-next="([^"]+)"/);
    var id = attrs.match(/\bid="([^"]+)"/);
    if (step) { button.dataset.step = step[1]; controls.push(button); }
    if (next) { button.dataset.next = next[1]; controls.push(button); }
    if (id) { button.id = id[1]; byId[id[1]] = button; }
    nodes.push(button);
  });
  function walk(node, found) {
    found.push(node);
    (node.children || []).forEach(function (child) { walk(child, found); });
    return found;
  }
  return {
    getElementById: function (id) {
      if (byId[id]) return byId[id];
      var found = null;
      nodes.forEach(function (node) {
        if (!found) found = walk(node, []).find(function (item) { return item.id === id; }) || null;
      });
      return found;
    },
    createElement: function (tag) {
      var node = element("");
      node.tagName = tag;
      return node;
    },
    querySelector: function (selector) {
      var all = [];
      nodes.forEach(function (node) { walk(node, all); });
      var checked = selector.match(/input\[name="([^"]+)"\]:checked/);
      if (checked) return all.find(function (node) { return node.type === "radio" && node.name === checked[1] && node.checked; }) || null;
      var named = selector.match(/input\[name="([^"]+)"\]\[value="([^"]+)"\]/);
      if (named) return all.find(function (node) { return node.type === "radio" && node.name === named[1] && node.value === named[2]; }) || null;
      return null;
    },
    querySelectorAll: function (selector) {
      if (selector === "[data-step]") return controls.filter(function (node) { return node.dataset.step; });
      if (selector === "[data-next]") return controls.filter(function (node) { return node.dataset.next; });
      var all = [];
      nodes.forEach(function (node) { walk(node, all); });
      if (selector === '#questions input[type="radio"]') return all.filter(function (node) { return node.type === "radio"; });
      return [];
    }
  };
}

function boot(storage, source) {
  var host = {
    localStorage: storage,
    document: page(),
    confirm: function () { return false; },
    scrollTo: function () {},
    history: { pushState: function () {}, replaceState: function () {} },
    addEventListener: function () {},
    LERNFORTSCHRITT: { benachrichtigen: function () { host.notified = (host.notified || 0) + 1; } }
  };
  host.window = host;
  vm.runInNewContext(source, host, { filename: "lf6-fragen.js" });
  return host;
}

function storageWith(raw) {
  return {
    values: raw ? { "it-ausbildung.lf6-fragen.v1": raw } : {},
    getItem: function (key) { return Object.prototype.hasOwnProperty.call(this.values, key) ? this.values[key] : null; },
    setItem: function (key, value) { this.values[key] = String(value); }
  };
}

var startText = "Fortschritt: 0 von 5 Schritten · Abschluss noch nicht geöffnet";
var baseline = js.replace(/if \(!Object\.keys\(answers\)\.length\) \{\s*render\(\{\}\);\s*return;\s*\}\s*/, "");
assert.ok(baseline.indexOf("Object.keys(answers)") === -1, "unreparierter Stand speichert jede Prüfung");
var baselineHost = boot(storageWith(null), baseline);
baselineHost.document.getElementById("check").click();
assert.strictEqual(JSON.parse(baselineHost.localStorage.getItem(L.KEY)).checked, true, "ohne den Fix gilt die leere Prüfung als geprüft");
assert.strictEqual(baselineHost.document.getElementById("result").children[0].textContent, "Noch keine Antwort gewählt", "ohne den Fix bleibt die Fehlermeldung");

var fresh = storageWith(null);
var freshHost = boot(fresh, js);
freshHost.document.querySelectorAll("[data-next]").find(function (button) { return button.dataset.next === "exercise"; }).click();
assert.strictEqual(fresh.getItem(L.KEY), null, "Übung öffnen speichert nichts");
assert.strictEqual(freshHost.notified, undefined, "Übung öffnen meldet keinen Fortschritt");
freshHost.document.getElementById("check").click();
assert.strictEqual(fresh.getItem(L.KEY), null, "leere Abgabe speichert keinen Stand");
assert.strictEqual(freshHost.notified, undefined, "leere Abgabe meldet keinen Fortschritt");
assert.strictEqual(freshHost.document.getElementById("pct").textContent, startText, "sichtbarer Fortschritt bleibt bei null");
assert.strictEqual(freshHost.document.getElementById("bar").style.width, "0%", "Fortschrittsbalken bleibt bei null");
var result = freshHost.document.getElementById("result");
assert.strictEqual(result.hidden, false, "leere Abgabe zeigt Feedback");
assert.strictEqual(result.children[0].textContent, "Noch keine Antwort gewählt");
assert.strictEqual(result.children.filter(function (node) { return node.textContent.indexOf("○ Nicht beantwortet:") === 0; }).length, N);
assert.ok(result.children[result.children.length - 1].textContent.indexOf("4 Aufgabe(n) sind unbeantwortet.") === 0);
freshHost.document.getElementById("check").click();
assert.strictEqual(fresh.getItem(L.KEY), null, "zweite leere Abgabe speichert weiter nichts");

var doneRaw = JSON.stringify({ answers: RICHTIG, checked: true, finish: true, step: "exercise" });
var kept = storageWith(doneRaw);
var keptHost = boot(kept, js);
keptHost.document.querySelectorAll('#questions input[type="radio"]').forEach(function (input) { input.checked = false; });
keptHost.document.getElementById("check").click();
assert.strictEqual(kept.getItem(L.KEY), doneRaw, "leere Abgabe überschreibt keinen richtigen Stand");
assert.strictEqual(keptHost.notified, undefined, "leere Abgabe nach richtigem Stand meldet nichts");
assert.strictEqual(L.progress(JSON.parse(kept.getItem(L.KEY))), 5, "gespeicherter Fortschritt bleibt vollständig");
assert.strictEqual(keptHost.document.getElementById("pct").textContent.indexOf("5 von 5") !== -1, true, "sichtbarer Fortschritt bleibt vollständig");
assert.strictEqual(keptHost.document.getElementById("result").children[0].textContent, "Noch keine Antwort gewählt");
L.QUESTIONS.forEach(function (question) {
  assert.strictEqual(keptHost.document.querySelector('input[name="' + question.id + '"]:checked'), null, "leere Abgabe wählt keine Antwort: " + question.id);
});

console.log("lf6-fragen: alle Prüfungen bestanden (vier Fragen, 256 Antwortkombinationen, Fortschritt und HTML-Verknüpfung)");
