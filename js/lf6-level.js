/* Lernfeld 6: Das Support-Level einer fiktiven Serviceanfrage einordnen. Kein echtes Ticketsystem. */
(function (g) {
  "use strict";
  var ID = "lf6-level";
  var KEY = "it-ausbildung.lf6-level.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Herr Berger meldet den schwarzen Monitor. Wer nimmt die Anfrage zuerst auf?", correct: "first", options: [
      { id: "second", label: "Sofort Second-Level, weil jede neue Anfrage ohne Aufnahme direkt an die nächste Stufe gehen muss.", feedback: "Second-Level kommt erst, wenn First-Level den Fall nicht lösen kann. Die Aufnahme beginnt eine Stufe davor." },
      { id: "vorort", label: "Ein Vor-Ort-Einsatz, weil ein schwarzer Monitor immer einen heimlichen Technikereinsatz auslöst.", feedback: "Ein höheres Level ist kein Vor-Ort-Einsatz. Samira nimmt die Anfrage zuerst im First-Level auf." },
      { id: "first", label: "First-Level.", feedback: "Richtig. First-Level nimmt die Anfrage auf. Die nächste Stufe folgt erst, wenn diese Stufe nicht weiterkommt." }
    ] },
    { id: "q2", prompt: "Samira kennt die Meldung, aber noch nicht den Beginn. Was tut First-Level?", correct: "fragen", options: [
      { id: "fragen", label: "Mit Rückfragen eingrenzen.", feedback: "Richtig. First-Level grenzt mit Rückfragen ein. Das ist noch keine Weitergabe und keine Reparatur." },
      { id: "strafe", label: "Den Fall als Strafe an ein höheres Level geben, weil Herr Berger schon einmal angerufen hat.", feedback: "Ein höheres Level ist keine Strafe. First-Level bleibt bei der Eingrenzung, solange Rückfragen den Fall klären können." },
      { id: "loesen", label: "Second-Level sofort beauftragen, obwohl die Eingrenzung noch gar nicht begonnen hat.", feedback: "Ohne Eingrenzung fehlt die Grundlage für die nächste Stufe. First-Level fragt zuerst nach." }
    ] },
    { id: "q3", prompt: "First-Level kann den schwarzen Monitor mit den vorhandenen Angaben nicht lösen. Was folgt?", correct: "second", options: [
      { id: "schliessen", label: "Die Anfrage schließen, weil First-Level nicht weiterkommt und ein offener Fall nicht weitergegeben werden darf.", feedback: "Nicht lösen heißt nicht schließen. Der Fall bleibt offen und geht an die Stufe, die ihn weiterbearbeiten kann." },
      { id: "second", label: "Second-Level.", feedback: "Richtig. Second-Level bearbeitet den Fall, wenn First-Level ihn nicht lösen kann. Die Weitergabe ist der normale nächste Schritt." },
      { id: "vorort", label: "Heimlich einen Vor-Ort-Einsatz ansetzen, ohne die Weitergabe und den offenen Stand zu notieren.", feedback: "Ein höheres Level ist kein heimlicher Vor-Ort-Einsatz. Second-Level übernimmt den offenen Fall nachvollziehbar." }
    ] },
    { id: "q4", prompt: "Was bedeutet ein höheres Support-Level in diesem Fall nicht?", correct: "keine-strafe", options: [
      { id: "keine-strafe", label: "Keine Strafe.", feedback: "Richtig. Ein höheres Level ist keine Strafe. Es beschreibt nur, welche Stufe den Fall weiterbearbeitet." },
      { id: "weitergabe", label: "Eine nachvollziehbare Weitergabe, weil First-Level den Fall mit den vorhandenen Angaben nicht lösen konnte.", feedback: "Die Weitergabe ist genau die Bedeutung der nächsten Stufe. Sie ist keine verdeckte Maßnahme und keine Strafe." },
      { id: "offen", label: "Dass der Fall offen bleibt, bis die zuständige Stufe ihn bearbeitet und den Stand nachvollziehbar notiert.", feedback: "Offen bleiben ist richtig. Ein höheres Level schließt den Fall nicht und macht ihn nicht unsichtbar." }
    ] }
  ];
  function evaluate(a) {
    a = a || {};
    var results = Q.map(function (q) {
      var o = q.options.find(function (x) { return x.id === a[q.id]; });
      return { id: q.id, status: !o ? "empty" : o.id === q.correct ? "correct" : "wrong", optionId: o ? o.id : "", feedback: o ? o.feedback : "" };
    });
    return {
      results: results,
      correct: results.filter(function (x) { return x.status === "correct"; }).length,
      wrong: results.filter(function (x) { return x.status === "wrong"; }).length,
      empty: results.filter(function (x) { return x.status === "empty"; }).length,
      allCorrect: results.every(function (x) { return x.status === "correct"; })
    };
  }
  function total() { return Q.length + 1; }
  function progress(s) { s = s || {}; return (s.checked ? evaluate(s.answers).correct : 0) + (s.finish ? 1 : 0); }
  function barWidth(s) { return Math.round(progress(s) / total() * 100); }
  function progressText(s) { s = s || {}; return "Fortschritt: " + progress(s) + " von " + total() + " Schritten · Abschluss " + (s.finish ? "geöffnet" : "noch nicht geöffnet"); }
  var api = { ID: ID, KEY: KEY, STEPS: STEPS, QUESTIONS: Q, evaluate: evaluate, progress: progress, barWidth: barWidth, progressText: progressText };
  g.LF6_LEVEL = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!g.document) return;
  var d = g.document, s = { answers: {}, checked: false, finish: false, step: "start" };
  function $(id) { return d.getElementById(id); }
  function load() { try { var x = JSON.parse(g.localStorage.getItem(KEY) || "null"); if (x) s = x; } catch (e) { /* Speicher kann gesperrt sein. */ } }
  function save() { try { g.localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* Lektion bleibt ohne Speicherung bedienbar. */ } if (g.LERNFORTSCHRITT) g.LERNFORTSCHRITT.benachrichtigen(); }
  function update() { $("bar").style.width = barWidth(s) + "%"; $("pct").textContent = progressText(s); }
  function go(id, fromHistory) {
    if (STEPS.indexOf(id) < 0) id = "start";
    STEPS.forEach(function (x) { $(x).hidden = x !== id; });
    d.querySelectorAll("[data-step]").forEach(function (b) { if (b.dataset.step === id) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current"); });
    s.step = id;
    if (id === "finish" && !s.finish) { s.finish = true; save(); }
    update();
    if (!fromHistory && g.history && g.history.pushState) g.history.pushState({ lf6Step: id }, "", "");
    var ziel = $(id);
    if (ziel && ziel.focus) ziel.focus();
  }
  function hide() { var box = $("result"); if (box) { box.hidden = true; box.textContent = ""; } }
  function build() {
    Q.forEach(function (q, index) {
      var field = d.createElement("fieldset"), legend = d.createElement("legend"), group = d.createElement("div"), feedback = d.createElement("p");
      field.className = "frage"; legend.textContent = (index + 1) + ". " + q.prompt; field.appendChild(legend); group.className = "opts";
      q.options.forEach(function (o) {
        var label = d.createElement("label"), input = d.createElement("input");
        label.className = "opt"; input.type = "radio"; input.name = q.id; input.value = o.id; label.appendChild(input); label.appendChild(d.createTextNode(" " + o.label));
        input.addEventListener("change", function () { s.answers[q.id] = o.id; s.checked = false; hide(); save(); update(); }); group.appendChild(label);
      });
      field.appendChild(group); feedback.id = "fb-" + q.id; feedback.hidden = true; feedback.setAttribute("aria-live", "polite"); field.appendChild(feedback); $("questions").appendChild(field);
    });
  }
  function render(answers) {
    var ev = evaluate(answers === undefined ? s.answers : answers), box = $("result"), heading = d.createElement("h3"); box.textContent = ""; box.children = [];
    heading.textContent = ev.allCorrect ? "Alle Antworten richtig" : ev.correct ? "Teilweise richtig" : ev.empty === Q.length ? "Noch keine Antwort gewählt" : "Noch nicht richtig"; box.appendChild(heading);
    ev.results.forEach(function (r, index) {
      var q = Q[index], option = q.options.find(function (x) { return x.id === r.optionId; }), p = d.createElement("p");
      p.textContent = (r.status === "correct" ? "✓ Richtig: " : r.status === "wrong" ? "✗ Noch nicht richtig: " : "○ Nicht beantwortet: ") + "Aufgabe " + (index + 1) + " – " + q.prompt + " " + (option ? "Deine Antwort: " + option.label + " " : "") + (option ? option.feedback : "Noch nicht beantwortet. Wähle eine Antwort und prüfe erneut."); box.appendChild(p);
      var fb = $("fb-" + q.id); fb.textContent = option ? option.feedback : "Noch nicht beantwortet. Wähle eine Antwort und prüfe erneut."; fb.hidden = false;
    });
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast das Support-Level nur nach dem Bearbeitungsschritt gesetzt. Ein höheres Level ist keine Strafe und kein Vor-Ort-Einsatz." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
  }
  function selectedAnswers() {
    var answers = {};
    Q.forEach(function (q) { var input = d.querySelector('input[name="' + q.id + '"]:checked'); if (input) answers[q.id] = input.value; });
    return answers;
  }
  function check() {
    var answers = selectedAnswers();
    if (!Object.keys(answers).length) {
      render({});
      return;
    }
    s.answers = answers;
    s.checked = true; render(); save(); update();
  }
  function reset() {
    s = { answers: {}, checked: false, finish: false, step: s.step || "start" }; d.querySelectorAll('#questions input[type="radio"]').forEach(function (input) { input.checked = false; }); hide();
    Q.forEach(function (q) { $("fb-" + q.id).hidden = true; $("fb-" + q.id).textContent = ""; }); $("done").textContent = ""; save(); update();
  }
  d.querySelectorAll("[data-step]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.step); }); });
  d.querySelectorAll("[data-next]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.next); }); });
  if (g.addEventListener) g.addEventListener("popstate", function (event) {
    var back = event && event.state ? event.state.lf6Step : "start";
    go(back, true);
  });
  $("check").addEventListener("click", check); $("reset").addEventListener("click", reset);
  $("reset-all").addEventListener("click", function () { if (g.confirm("Gespeicherten Lernfortschritt dieser Lektion zurücksetzen?")) { reset(); go("start"); } });
  load(); build();
  if (STEPS.indexOf(s.step) < 0) s.step = "start";
  Q.forEach(function (q) { var option = q.options.find(function (o) { return o.id === s.answers[q.id]; }); if (option) { var input = d.querySelector('input[name="' + q.id + '"][value="' + option.id + '"]'); if (input) input.checked = true; } });
  if (s.checked) render();
  go(s.step, true);
  if (g.history && g.history.replaceState) g.history.replaceState({ lf6Step: s.step }, "", "");
})(typeof window !== "undefined" ? window : globalThis);
