/* Lernfeld 6: Eine fiktive Serviceanfrage aufnehmen und als Störung notieren, ohne die Ursache festzulegen. */
(function (g) {
  "use strict";
  var ID = "lf6-anfrage";
  var KEY = "it-ausbildung.lf6-anfrage.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Herr Berger sagt: Der Monitor am Empfang bleibt schwarz. Was notiert Samira zuerst?", correct: "stoerung", options: [
      { id: "bestellen", label: "Sofort einen neuen Monitor bestellen, weil ein schwarzer Bildschirm immer ein defektes Gerät bedeutet und keine weitere Notiz braucht.", feedback: "Eine Bestellung wäre verfrüht. Samira notiert zuerst, wer fragt, was nicht geht und seit wann." },
      { id: "stoerung", label: "Wer fragt, was nicht geht und seit wann.", feedback: "Richtig. Herr Berger, der schwarze Monitor und der Beginn gehören in die Notiz. Die Ursache bleibt offen." },
      { id: "ignorieren", label: "Nichts notieren, weil Samira Auszubildende ist und Anfragen vom Empfang deshalb nicht zu ihrer Aufgabe gehören.", feedback: "Die Anfrage wird notiert. Dass Samira in der Ausbildung ist, ist kein Grund, Herrn Berger zu übergehen." }
    ] },
    { id: "q2", prompt: "Wie ordnet Samira die Anfrage ein, ohne schon eine Ursache festzulegen?", correct: "arbeitsplatz", options: [
      { id: "netzwerk", label: "Als feststehenden Netzwerkausfall, weil ein schwarzer Monitor nur diese eine Ursache haben kann.", feedback: "Ein schwarzer Monitor belegt keinen Netzwerkausfall. Samira notiert eine Störung am Arbeitsplatz, nicht die Ursache." },
      { id: "ignorieren", label: "Gar nicht einordnen, weil eine Auszubildende eine Anfrage vom Empfang nicht annehmen und auch nicht notieren darf.", feedback: "Samira darf die Anfrage notieren. Weglegen, weil sie in der Ausbildung ist, lässt Herrn Berger ohne Einordnung." },
      { id: "arbeitsplatz", label: "Als Störung am Arbeitsplatz Empfang.", feedback: "Richtig. Der Monitor am Empfang geht nicht. Das ist die Einordnung. Die Ursache steht damit noch nicht fest." }
    ] },
    { id: "q3", prompt: "Was gehört noch in die Notiz, bevor jemand etwas am Gerät ändert?", correct: "dringend", options: [
      { id: "dringend", label: "Ob der Empfang gerade ohne Monitor nicht arbeiten kann.", feedback: "Richtig. Ob es für den Empfang dringend ist, gehört zur Anfrage. Ein echtes System muss dafür nicht geöffnet werden." },
      { id: "passwort", label: "Das Passwort vom Empfang, damit Samira sich sofort anmelden und selbst im System nachsehen kann.", feedback: "Für diese Notiz braucht Samira kein Passwort. Sie hält fest, wer fragt, was nicht geht, seit wann und ob es dringend ist." },
      { id: "bestellen", label: "Die Bestellnummer eines neuen Monitors, weil die Anfrage erst gilt, wenn das Ersatzgerät schon ausgesucht ist.", feedback: "Eine Bestellung legt die Ursache schon fest. Die Notiz hält die Störung fest, ohne etwas zu bestellen." }
    ] },
    { id: "q4", prompt: "Was tut Samira in dieser Lektion nicht?", correct: "keinursache", options: [
      { id: "notiz", label: "Die Anfrage von Herrn Berger notieren, weil eine Notiz die Störung schon als behoben markieren würde.", feedback: "Die Notiz ist genau der erste Schritt. Sie markiert die Störung nicht als behoben und legt keine Ursache fest." },
      { id: "einordnung", label: "Die Anfrage als Störung am Arbeitsplatz einordnen, weil eine Einordnung immer schon die technische Ursache nennt.", feedback: "Die Einordnung nennt hier nur den Ort und die Störung. Die Ursache bleibt offen." },
      { id: "keinursache", label: "Die Ursache festlegen oder ein echtes System öffnen.", feedback: "Richtig. Samira notiert und ordnet ein. Die Ursache bleibt offen, und sie öffnet kein echtes System." }
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
  g.LF5_FORMAT = api;
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
    if (!fromHistory && g.history && g.history.pushState) g.history.pushState({ lf6Step: id }, "", "");
    if (id === "finish" && !s.finish) { s.finish = true; save(); $("done").textContent = s.checked && evaluate(s.answers).allCorrect ? "Lektion abgeschlossen. Du kannst sie jederzeit wiederholen." : "Du kannst das Beispiel noch einmal ansehen und die Übung später bearbeiten."; }
    update(); $("main").focus(); g.scrollTo(0, 0);
  }
  function hide() { var b = $("result"); b.hidden = true; b.textContent = ""; }
  function build() {
    Q.forEach(function (q, index) {
      var field = d.createElement("fieldset"), legend = d.createElement("legend"), group = d.createElement("div"), feedback = d.createElement("p");
      field.className = "question"; legend.textContent = (index + 1) + ". " + q.prompt; field.appendChild(legend); group.className = "opts";
      q.options.forEach(function (o) {
        var label = d.createElement("label"), input = d.createElement("input"), span = d.createElement("span");
        input.type = "radio"; input.name = q.id; input.value = o.id; span.textContent = o.label; label.className = "opt"; label.append(input, span);
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
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast die Anfrage notiert und als Störung eingeordnet, ohne die Ursache festzulegen." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
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
