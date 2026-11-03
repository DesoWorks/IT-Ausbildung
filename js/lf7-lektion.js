/* Gemeinsamer Ablauf ausschließlich für die neuen LF7-Lektionen. */
(function (g) {
  "use strict";
  function create(config) {
    var Q = config.questions, STEPS = ["start", "case", "exercise", "finish"];
    var KEY = "it-ausbildung." + config.id + ".v1";
    function evaluate(answers) {
      answers = answers || {};
      var results = Q.map(function (q) {
        var option = q.options.find(function (o) { return o.id === answers[q.id]; });
        return { id: q.id, status: !option ? "empty" : option.id === q.correct ? "correct" : "wrong", feedback: option ? option.feedback : "Noch nicht beantwortet. Wähle eine Antwort und prüfe erneut." };
      });
      return { results: results, correct: results.filter(function (r) { return r.status === "correct"; }).length, wrong: results.filter(function (r) { return r.status === "wrong"; }).length, empty: results.filter(function (r) { return r.status === "empty"; }).length, allCorrect: results.every(function (r) { return r.status === "correct"; }) };
    }
    function progress(s) { s = s || {}; return (s.checked ? evaluate(s.answers).correct : 0) + (s.finish ? 1 : 0); }
    function barWidth(s) { return Math.round(progress(s) / (Q.length + 1) * 100); }
    function progressText(s) { return "Fortschritt: " + progress(s) + " von " + (Q.length + 1) + " Schritten · Abschluss " + (s && s.finish ? "geöffnet" : "noch nicht geöffnet"); }
    function normalize(raw) {
      var s = { answers: {}, checked: false, finish: false, step: "start" };
      if (!raw || typeof raw !== "object") return s;
      Q.forEach(function (q) { if (raw.answers && q.options.some(function (o) { return o.id === raw.answers[q.id]; })) s.answers[q.id] = raw.answers[q.id]; });
      s.checked = raw.checked === true; s.finish = raw.finish === true;
      if (STEPS.indexOf(raw.step) !== -1) s.step = raw.step;
      return s;
    }
    var api = { ID: config.id, KEY: KEY, STEPS: STEPS, QUESTIONS: Q, CONFIG: config, evaluate: evaluate, progress: progress, barWidth: barWidth, progressText: progressText, normalize: normalize };
    g.LF7_INHALTE = g.LF7_INHALTE || {};
    g.LF7_INHALTE[config.id] = api;
    if (!g.document || g.document.body.dataset.page !== config.id) return api;
    var d = g.document, s = normalize();
    function $(id) { return d.getElementById(id); }
    function text(tag, value, parent) { var element = d.createElement(tag); element.textContent = value; parent.appendChild(element); return element; }
    function notify() { if (g.LERNFORTSCHRITT && g.LERNFORTSCHRITT.benachrichtigen) g.LERNFORTSCHRITT.benachrichtigen(); }
    function save() {
      try { g.localStorage.setItem(KEY, JSON.stringify(s)); $("storage-hint").textContent = ""; }
      catch (e) { $("storage-hint").textContent = "Der Stand kann nicht gespeichert werden. Die Lektion bleibt für diesen Besuch bedienbar."; }
      notify();
    }
    function update() {
      $("bar").style.width = barWidth(s) + "%"; $("pct").textContent = progressText(s);
      $("done").textContent = s.finish ? s.checked && evaluate(s.answers).allCorrect ? "Lektion abgeschlossen. Du kannst sie jederzeit wiederholen." : "Abschluss geöffnet. Für den vollständigen Abschluss müssen noch alle vier Antworten richtig geprüft sein." : "";
    }
    function go(id, fromHistory) {
      if (STEPS.indexOf(id) === -1) id = "start";
      STEPS.forEach(function (step) { $(step).hidden = step !== id; });
      d.querySelectorAll("[data-step]").forEach(function (button) { if (button.dataset.step === id) button.setAttribute("aria-current", "step"); else button.removeAttribute("aria-current"); });
      s.step = id;
      if (!fromHistory) { if (id === "finish") s.finish = true; save(); if (g.history) g.history.pushState({ lf7Step: id }, "", ""); }
      update(); if ($(id).focus) $(id).focus();
    }
    function hideFeedback() {
      $("result").hidden = true; $("result").textContent = "";
      Q.forEach(function (q) { $("fb-" + q.id).hidden = true; $("fb-" + q.id).textContent = ""; });
    }
    function render() {
      var ev = evaluate(s.answers), box = $("result"); box.textContent = "";
      text("h3", ev.allCorrect ? "Alle Antworten richtig" : ev.empty === Q.length ? "Noch keine Antwort gewählt" : "Noch nicht vollständig richtig", box);
      ev.results.forEach(function (r, index) {
        var prefix = r.status === "correct" ? "✓ Richtig: " : r.status === "wrong" ? "✗ Noch nicht richtig: " : "○ Nicht beantwortet: ";
        text("p", prefix + "Aufgabe " + (index + 1) + " – " + r.feedback, box);
        $("fb-" + r.id).textContent = r.feedback; $("fb-" + r.id).hidden = false;
      });
      box.hidden = false;
    }
    config.goals.forEach(function (goal) { text("li", goal, $("goals")); text("li", goal, $("takeaways")); });
    config.theory.forEach(function (part) { text("h3", part[0], $("theory")); text("p", part[1], $("theory")); });
    Q.forEach(function (q, index) {
      var field = text("fieldset", "", $("questions")); field.className = "frage";
      text("legend", (index + 1) + ". " + q.prompt, field);
      var group = text("div", "", field); group.className = "opts";
      q.options.forEach(function (option) {
        var label = text("label", "", group); label.className = "opt";
        var input = d.createElement("input"); input.type = "radio"; input.name = q.id; input.value = option.id;
        label.appendChild(input); label.appendChild(d.createTextNode(" " + option.label));
        input.addEventListener("change", function () { s.answers[q.id] = option.id; s.checked = false; hideFeedback(); save(); update(); });
      });
      var feedback = text("p", "", field); feedback.id = "fb-" + q.id; feedback.hidden = true; feedback.setAttribute("aria-live", "polite");
    });
    try { s = normalize(JSON.parse(g.localStorage.getItem(KEY) || "null")); } catch (e) { $("storage-hint").textContent = "Der gespeicherte Stand ließ sich nicht lesen. Die Lektion beginnt ohne diesen Stand."; }
    Q.forEach(function (q) { d.querySelectorAll('input[name="' + q.id + '"]').forEach(function (input) { input.checked = input.value === s.answers[q.id]; }); });
    d.querySelectorAll("[data-step], [data-next]").forEach(function (button) { button.addEventListener("click", function () { go(button.dataset.step || button.dataset.next); }); });
    $("check").addEventListener("click", function () { s.checked = true; render(); save(); update(); });
    function reset() {
      s = normalize({ step: s.step }); d.querySelectorAll('#questions input').forEach(function (input) { input.checked = false; }); hideFeedback(); save(); update();
    }
    $("reset").addEventListener("click", reset);
    $("reset-all").addEventListener("click", function () { if (g.confirm("Nur den gespeicherten Fortschritt dieser Lektion zurücksetzen?")) { reset(); go("start"); } });
    g.addEventListener("popstate", function (event) { go(event.state && event.state.lf7Step || "start", true); });
    if (s.checked) render(); go(s.step, true);
    if (g.history) g.history.replaceState({ lf7Step: s.step }, "", "");
    return api;
  }
  g.LF7_LEKTION = { create: create };
  if (typeof module !== "undefined" && module.exports) module.exports = g.LF7_LEKTION;
})(typeof window !== "undefined" ? window : globalThis);