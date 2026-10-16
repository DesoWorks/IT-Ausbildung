/* Lektion 3: Einstieg Subnetting, ein /24 wird in zwei /25-Netze geteilt. */
(function (global) {
  "use strict";
  var KEY = "it-ausbildung.subnetting.v1";
  var QUESTIONS = [
    { id: "q1", correct: "true", text: "Die Maske /25 lautet 255.255.255.128.", why: "Ein /25 hat 25 Netzbits. Im letzten Oktett ist das erste Bit 1, daher 128." },
    { id: "q2", correct: "true", text: "Die zweite /25-Netzadresse lautet 192.168.1.128.", why: "Die beiden Bereiche beginnen bei .0 und .128." }
  ];
  var ITEMS = [
    { id: "net1", label: "Broadcastadresse des ersten Teilnetzes", answer: "192.168.1.127", why: "Das erste /25 reicht von .0 bis .127; .127 ist die Broadcastadresse." },
    { id: "net2", label: "Erste nutzbare Adresse des zweiten Teilnetzes", answer: "192.168.1.129", why: "Das zweite Netz beginnt bei .128. Diese Netzadresse ist nicht einem Gerät zugeteilt; die erste nutzbare Adresse ist .129." }
  ];
  var state = load();
  function load() { try { return Object.assign({ answers: {}, finish: false }, JSON.parse(global.localStorage.getItem(KEY) || "{}")); } catch (e) { return { answers: {}, finish: false }; } }
  function save() { try { global.localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  function el(id) { return global.document.getElementById(id); }
  function correctCount() { var n = 0; QUESTIONS.concat(ITEMS).forEach(function (q) { var answer = state.answers[q.id], expected = q.correct || q.answer; if (answer !== "" && answer != null && answer === expected) n++; }); return n; }
  function complete() { return correctCount() === QUESTIONS.length + ITEMS.length && state.finish; }
  function progress() { return Math.round((correctCount() + (state.finish ? 1 : 0)) / (QUESTIONS.length + ITEMS.length + 1) * 100); }
  function notify() { if (global.LERNFORTSCHRITT) global.LERNFORTSCHRITT.benachrichtigen(); }
  function update() { var p = progress(); el("fortschritt-balken").style.width = p + "%"; el("fortschritt-text").textContent = "Fortschritt: " + p + " %"; el("subnet-finish").textContent = complete() ? "Lektion abgeschlossen. Du kannst sie jederzeit wiederholen." : "Fortschritt: " + p + " %. Du kannst Antworten ändern und später weitermachen."; }
  function inputValue(id) { return el(id).value.trim(); }
  function checked(name) { var selected = global.document.querySelector('input[name="' + name + '"]:checked'); return selected ? selected.value : ""; }
  function promptOf(q) { return String(q.text || q.label || q.id).replace(/[.\s]+$/, ""); }
  function displayValue(q, v) { if (v === "" || v == null) return "keine Eingabe"; if (q.correct) return v === "true" ? "Richtig" : "Falsch"; return String(v); }
  function resultRow(prompt, shown, status, explanation) {
    var p = global.document.createElement("p");
    p.className = status === "richtig" ? "feedback-richtig" : "feedback-falsch";
    var head = status === "richtig" ? "✓ Richtig" : status === "leer" ? "– Nicht beantwortet" : "✗ Noch nicht richtig";
    p.textContent = head + ": " + prompt + ". Deine Eingabe: " + shown + ". " + explanation;
    return p;
  }
  function check(event) {
    event.preventDefault();
    var submitted = { q1: checked("q1"), q2: checked("q2"), net1: inputValue("net1"), net2: inputValue("net2") };
    QUESTIONS.concat(ITEMS).forEach(function (q) { state.answers[q.id] = submitted[q.id]; }); save();
    var results = QUESTIONS.concat(ITEMS).map(function (q) {
      var value = submitted[q.id], expected = q.correct || q.answer;
      var ok = value !== "" && value === expected;
      var isChoice = !!q.correct;
      var hint = isChoice ? (expected === "true" ? "Die Aussage stimmt." : "Die Aussage stimmt nicht.") : "Richtiger Wert: " + expected + ".";
      var explanation = value === "" ? (isChoice ? "Wähle Richtig oder Falsch. " : "Trage einen Wert ein. ") + hint + " " + q.why : ok ? q.why : hint + " " + q.why;
      return { ok: ok, element: resultRow(promptOf(q), displayValue(q, value), value === "" ? "leer" : ok ? "richtig" : "falsch", explanation) };
    });
    var box = el("subnet-result"); box.textContent = "";
    var right = results.filter(function (r) { return r.ok; }).length;
    var title = global.document.createElement("h3"); title.textContent = right === results.length ? "✓ Alles richtig" : right > 0 ? "◐ Teilweise richtig" : "✗ Noch nicht richtig"; box.appendChild(title);
    var list = global.document.createElement("ul"); results.forEach(function (r) { var li = global.document.createElement("li"); li.appendChild(r.element); list.appendChild(li); }); box.appendChild(list);
    box.hidden = false; box.classList.add("is-visible"); update(); notify();
  }
  function changed(event) {
    var box = el("subnet-result"); box.hidden = true; box.textContent = ""; box.classList.remove("is-visible");
    if (!event || !event.target || !event.target.name && !event.target.id) return;
    var key = event.target.name || event.target.id;
    if (Object.prototype.hasOwnProperty.call(state.answers, key)) {
      state.answers[key] = ""; save(); update(); notify();
    }
  }
  function step(id) { ["erklaerung", "schritte", "uebung", "abschluss"].forEach(function (x) { el(x).hidden = x !== id; }); global.document.querySelectorAll(".schritt-knopf").forEach(function (b) { if (b.dataset.ziel === id) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current"); }); if (id === "abschluss" && !state.finish) { state.finish = true; save(); notify(); } update(); el("hauptinhalt").focus(); global.scrollTo && global.scrollTo(0, 0); }
  function reset(keepFinish) { state = { answers: {}, finish: keepFinish ? state.finish : false }; try { global.localStorage.removeItem(KEY); } catch (e) {} el("subnet-form").reset(); changed(); save(); update(); notify(); if (!keepFinish) step("erklaerung"); }
  function buildTerms() { var terms = ["Subnetting", "Präfixlänge", "Netzmaske", "Netzadresse", "Broadcastadresse", "Teilnetz"]; var host = el("fachwoerter-liste"); terms.forEach(function (word) { var entry = (global.GLOSSAR || []).find(function (g) { return g.begriff === word; }); if (!entry) return; var d = global.document.createElement("details"); d.className = "fachwort-hinweis"; var s = global.document.createElement("summary"); s.textContent = word; var p = global.document.createElement("p"); p.textContent = entry.erklaerung; d.append(s, p); host.appendChild(d); }); }
  function init() { buildTerms(); global.document.querySelectorAll("[data-weiter], .schritt-knopf").forEach(function (b) { b.addEventListener("click", function () { step(b.dataset.weiter || b.dataset.ziel); }); }); el("subnet-form").addEventListener("submit", check); el("subnet-form").addEventListener("input", changed); el("subnet-form").addEventListener("change", changed); el("subnet-reset").addEventListener("click", function () { reset(true); }); el("subnet-reset-progress").addEventListener("click", function () { if (global.confirm("Lernfortschritt dieser Lektion zurücksetzen?")) reset(false); }); update(); step("erklaerung"); }
  global.SUBNETTING = { questions: QUESTIONS, items: ITEMS, complete: complete, progress: progress, key: KEY };
  if (typeof global.document !== "undefined") { if (global.document.readyState === "loading") global.document.addEventListener("DOMContentLoaded", init); else init(); }
  if (typeof module !== "undefined" && module.exports) module.exports = global.SUBNETTING;
})(typeof window !== "undefined" ? window : globalThis);
