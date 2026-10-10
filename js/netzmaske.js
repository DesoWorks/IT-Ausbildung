/* Lektion 2: Netzmaske und Netz-/Geräteanteil, Beispiel /24. */
(function (global) {
  "use strict";
  var KEY = "it-ausbildung.netzmaske.v1";
  var QUESTIONS = [
    { text: "/24 bedeutet 24 Geräte.", correct: false, why: "Die 24 zählt die Bits im Netzanteil. Sie ist keine Geräteanzahl." },
    { text: "Die Maske 255.255.255.0 entspricht /24.", correct: true, why: "Richtig. Die ersten 24 Bits der Maske sind 1 und bilden den Netzanteil." },
    { text: "192.168.1.20 ist bei /24 die Netzadresse.", correct: false, why: "Das ist eine Geräteadresse. Die Netzadresse lautet 192.168.1.0." }
  ];
  var state = load();
  function load() {
    try { return Object.assign({ answers: {}, network: false, broadcast: false, finish: false }, JSON.parse(global.localStorage.getItem(KEY) || "{}")); }
    catch (e) { return { answers: {}, network: false, broadcast: false, finish: false }; }
  }
  function save() { try { global.localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* Nutzung ohne Speicherung bleibt möglich. */ } }
  function el(id) { return global.document.getElementById(id); }
  function make(tag, cls, text) { var n = global.document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function isComplete() { return QUESTIONS.every(function (q, i) { return state.answers[i] === true; }) && state.network && state.broadcast && state.finish; }
  function progress() { var done = QUESTIONS.filter(function (q, i) { return state.answers[i] === true; }).length + (state.network ? 1 : 0) + (state.broadcast ? 1 : 0) + (state.finish ? 1 : 0); return Math.round(done / (QUESTIONS.length + 3) * 100); }
  function informProgress() { if (global.LERNFORTSCHRITT) global.LERNFORTSCHRITT.benachrichtigen(); }
  function update() {
    var pct = progress(); el("fortschritt-balken").style.width = pct + "%"; el("fortschritt-text").textContent = "Fortschritt: " + pct + " %";
    el("abschluss-status").textContent = isComplete() ? "Thema abgeschlossen. Du kannst die Lektion jederzeit wiederholen." : "Fortschritt: " + pct + " %. Du kannst später weitermachen oder Antworten ändern.";
  }
  function renderQuestions() {
    var host = el("quiz-optionen"); host.textContent = "";
    QUESTIONS.forEach(function (q, i) {
      var row = make("div", "netz-aussage"); row.appendChild(make("p", "", q.text));
      [true, false].forEach(function (value) {
        var label = make("label", "quiz-option"); var input = make("input"); input.type = "radio"; input.name = "netzmaske-q-" + i; input.checked = state.answers[i] === value;
        input.addEventListener("change", function () { state.answers[i] = value === q.correct; save(); var f = el("quiz-feedback"); f.textContent = (value === q.correct ? "Richtig. " : "Noch nicht. ") + q.why; f.hidden = false; update(); informProgress(); });
        label.append(input, make("span", "option-text", value ? "Richtig" : "Falsch")); row.appendChild(label);
      });
      host.appendChild(row);
    });
  }
  function checkValues(event) {
    event.preventDefault();
    var n = el("netz-eingabe").value.trim(), b = el("broadcast-eingabe").value.trim();
    state.network = n === "192.168.1.0"; state.broadcast = b === "192.168.1.255"; save();
    var messages = [];
    messages.push(state.network ? "Netzadresse richtig." : "Netzadresse noch nicht richtig. Bei /24 bleiben 192.168.1 als Netzanteil; im Geräteanteil stehen für die Netzadresse Nullen: 192.168.1.0.");
    messages.push(state.broadcast ? "Broadcastadresse richtig." : "Broadcastadresse noch nicht richtig. Für die Broadcastadresse stehen im Geräteanteil Einsen: 192.168.1.255.");
    if (n === "192.168.1.20") messages.push("192.168.1.20 ist die Adresse des Geräts, nicht die Netzadresse.");
    if (b === "192.168.1.1") messages.push(".1 ist eine nutzbare Geräteadresse, nicht die Broadcastadresse.");
    var box = el("werte-feedback");
    box.textContent = "";
    var right = Number(state.network) + Number(state.broadcast);
    var title = make("h3", "", right === 2 ? "✓ Alles richtig" : right === 1 ? "◐ Teilweise richtig" : "✗ Noch nicht richtig");
    box.appendChild(title);
    [
      { label: "Netzadresse", value: n, ok: state.network, correct: "192.168.1.0", why: "Bei /24 bleiben die ersten drei Oktette gleich; für die Netzadresse wird das Geräte-Oktett 0." },
      { label: "Broadcastadresse", value: b, ok: state.broadcast, correct: "192.168.1.255", why: "Bei /24 werden für die Broadcastadresse alle Geräte-Bits auf 1 gesetzt." }
    ].forEach(function (answer) {
      var p = make("p", answer.ok ? "feedback-richtig" : "feedback-falsch");
      p.setAttribute("aria-label", answer.ok ? "Richtig" : "Nicht richtig");
      p.textContent = (answer.ok ? "✓ Richtig: " : "✗ " + (answer.value ? "Nicht richtig: " : "Unbeantwortet: ")) + answer.label + ". " + (answer.ok ? "" : answer.why + " Richtige Antwort: " + answer.correct + ".");
      box.appendChild(p);
    });
    box.hidden = false; update(); informProgress();
  }
  function invalidateValueResult() {
    var box = el("werte-feedback"); box.hidden = true; box.textContent = "";
  }
  function step(id) {
    ["erklaerung", "schaubild", "uebung", "abschluss"].forEach(function (x) { el(x).hidden = x !== id; });
    global.document.querySelectorAll(".schritt-knopf").forEach(function (b) { if (b.dataset.ziel === id) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current"); });
    if (id === "abschluss" && !state.finish) { state.finish = true; save(); informProgress(); }
    update(); el("hauptinhalt").focus(); if (global.scrollTo) global.scrollTo(0, 0);
  }
  function glossary() {
    var host = el("fachwoerter-liste"); var terms = ["Netzmaske", "Präfixlänge", "Netzanteil", "Geräteanteil", "Netzadresse", "Broadcastadresse"];
    terms.forEach(function (term) { var data = (global.GLOSSAR || []).find(function (x) { return x.begriff === term; }); if (!data) return; var d = make("details", "fachwort-hinweis"); d.appendChild(make("summary", "", data.begriff)); d.appendChild(make("p", "", data.erklaerung)); host.appendChild(d); });
  }
  function reset() {
    state = { answers: {}, network: false, broadcast: false, finish: false };
    try { global.localStorage.removeItem(KEY); } catch (e) { /* ignorieren */ }
    el("netz-eingabe").value = ""; el("broadcast-eingabe").value = ""; el("quiz-feedback").hidden = true; el("werte-feedback").textContent = ""; el("werte-feedback").hidden = true; renderQuestions(); update(); informProgress(); step("erklaerung");
  }
  function init() {
    glossary(); renderQuestions();
    global.document.querySelectorAll("[data-weiter], .schritt-knopf").forEach(function (b) { b.addEventListener("click", function () { step(b.dataset.weiter || b.dataset.ziel); }); });
    el("werte-form").addEventListener("submit", checkValues); el("werte-form").addEventListener("input", invalidateValueResult); el("werte-form").addEventListener("change", invalidateValueResult); el("uebung-reset").addEventListener("click", reset);
    el("reset-alles").addEventListener("click", function () { if (global.confirm("Möchtest du den Lernfortschritt dieser Lektion zurücksetzen?")) reset(); });
    if (state.network) el("netz-eingabe").value = "192.168.1.0"; if (state.broadcast) el("broadcast-eingabe").value = "192.168.1.255";
    step("erklaerung");
  }
  global.NETZMASKE = { questions: QUESTIONS, progress: progress, isComplete: isComplete, key: KEY };
  if (typeof global.document !== "undefined") { if (global.document.readyState === "loading") global.document.addEventListener("DOMContentLoaded", init); else init(); }
  if (typeof module !== "undefined" && module.exports) module.exports = global.NETZMASKE;
})(typeof window !== "undefined" ? window : globalThis);
