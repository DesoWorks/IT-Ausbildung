/* Lernfeld 6: Den Status einer fiktiven Serviceanfrage unterscheiden. Kein echtes Ticketsystem. */
(function (g) {
  "use strict";
  var ID = "lf6-status";
  var KEY = "it-ausbildung.lf6-status.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Die Anfrage von Herrn Berger ist notiert, aber noch niemand bearbeitet sie. Welcher Status passt?", correct: "neu", options: [
      { id: "erledigt", label: "Erledigt, weil eine notierte Anfrage automatisch schon behoben und damit aus der Liste genommen ist.", feedback: "Notieren heißt nicht behoben. Der Fall ist neu. Samira setzt ihn nicht auf erledigt, nur weil die Notiz existiert." },
      { id: "warten", label: "Wartet auf Rückmeldung, obwohl noch niemand Herrn Berger oder eine andere Person um eine Antwort gebeten hat.", feedback: "Warten passt erst, wenn wirklich auf eine Rückmeldung gewartet wird. Hier hat die Bearbeitung noch nicht begonnen." },
      { id: "neu", label: "Neu.", feedback: "Richtig. Die Anfrage ist aufgenommen und noch nicht in Bearbeitung. Neu beschreibt genau diesen Stand." }
    ] },
    { id: "q2", prompt: "Samira prüft die Notiz und grenzt die Störung am Empfang ein. Welchen Status setzt sie?", correct: "arbeit", options: [
      { id: "arbeit", label: "In Bearbeitung.", feedback: "Richtig. Samira arbeitet gerade an der Anfrage. Der Status folgt diesem Schritt und nicht einer Vermutung." },
      { id: "erledigt", label: "Erledigt, weil das Eingrenzen schon beweist, dass der Monitor wieder geht und der Fall geschlossen ist.", feedback: "Eingrenzen ist noch keine Behebung. Erledigt wäre hier zu früh und würde den offenen Fall falsch darstellen." },
      { id: "neu", label: "Weiter neu, obwohl sie die Notiz schon prüft und die Störung gerade aktiv eingrenzt.", feedback: "Neu passt nur vor dem ersten Bearbeitungsschritt. Sobald Samira eingrenzt, ist die Anfrage in Bearbeitung." }
    ] },
    { id: "q3", prompt: "Samira hat Herrn Berger um eine Angabe gebeten und wartet auf seine Antwort. Welcher Status ist richtig?", correct: "warten", options: [
      { id: "erledigt", label: "Erledigt, weil eine offene Frage an die Kundin den Fall bereits abschließt und keine weitere Notiz braucht.", feedback: "Eine Anfrage, die auf die Kundin wartet, ist nicht erledigt. Der Fall bleibt offen, bis die Antwort da ist und der nächste Schritt feststeht." },
      { id: "warten", label: "Wartet auf Rückmeldung.", feedback: "Richtig. Herr Berger ist um eine Angabe gebeten. Der Fall bleibt offen und sichtbar, solange seine Antwort fehlt." },
      { id: "neu", label: "Wieder neu, weil jede Rückfrage die bisherige Bearbeitung löscht und die Anfrage unsichtbar macht.", feedback: "Die bisherige Arbeit bleibt erhalten. Neu wäre falsch. Der passende Status ist: wartet auf Rückmeldung." }
    ] },
    { id: "q4", prompt: "Der Monitor geht wieder, Herr Berger hat das bestätigt, und die Lösung ist notiert. Was gilt für den Status?", correct: "sichtbar", options: [
      { id: "loeschen", label: "Samira löscht die Anfrage, damit ein erledigter Fall in der Liste nicht mehr nachvollziehbar ist.", feedback: "Erledigt heißt nicht unsichtbar. Die Notiz bleibt, damit später erkennbar ist, was geprüft und behoben wurde." },
      { id: "warten", label: "Der Fall wartet weiter auf Rückmeldung, obwohl Herr Berger die Lösung schon bestätigt hat.", feedback: "Die Bestätigung ist da. Weiter auf Rückmeldung warten würde einen abgeschlossenen Schritt verdecken." },
      { id: "sichtbar", label: "Erledigt, und die Notiz bleibt sichtbar.", feedback: "Richtig. Der Schritt ist passiert und bestätigt. Erledigt bleibt nachvollziehbar und wird nicht gelöscht." }
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
  g.LF6_STATUS = api;
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
    if (fromHistory) {
      update();
      var zurueck = $(id);
      if (zurueck && zurueck.focus) zurueck.focus();
      return;
    }
    s.step = id;
    if (id === "finish" && !s.finish) {
      s.finish = true;
      save();
      $("done").textContent = s.checked && evaluate(s.answers).allCorrect ? "Lektion abgeschlossen. Du kannst sie jederzeit wiederholen." : "Du kannst das Beispiel noch einmal ansehen und die Übung später bearbeiten.";
    }
    if (id !== "start" || s.checked || s.finish) save();
    update();
    if (g.history && g.history.pushState) g.history.pushState({ lf6Step: id }, "", "");
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
  function render() {
    var ev = evaluate(s.answers), box = $("result"), heading = d.createElement("h3"); box.textContent = "";
    heading.textContent = ev.allCorrect ? "Alle Antworten richtig" : ev.correct ? "Teilweise richtig" : ev.empty === Q.length ? "Noch keine Antwort gewählt" : "Noch nicht richtig"; box.appendChild(heading);
    ev.results.forEach(function (r, index) {
      var q = Q[index], option = q.options.find(function (x) { return x.id === r.optionId; }), p = d.createElement("p");
      p.textContent = (r.status === "correct" ? "✓ Richtig: " : r.status === "wrong" ? "✗ Noch nicht richtig: " : "○ Nicht beantwortet: ") + "Aufgabe " + (index + 1) + " – " + q.prompt + " " + (option ? "Deine Antwort: " + option.label + " " : "") + (option ? option.feedback : "Noch nicht beantwortet. Wähle eine Antwort und prüfe erneut."); box.appendChild(p);
      var fb = $("fb-" + q.id); fb.textContent = option ? option.feedback : "Noch nicht beantwortet. Wähle eine Antwort und prüfe erneut."; fb.hidden = false;
    });
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast den Status nur gesetzt, wenn der Schritt wirklich passiert ist. Ein wartender Fall bleibt offen und sichtbar." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
  }
  function check() {
    s.answers = {};
    Q.forEach(function (q) { var input = d.querySelector('input[name="' + q.id + '"]:checked'); if (input) s.answers[q.id] = input.value; });
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
  if (s.finish) $("done").textContent = s.checked && evaluate(s.answers).allCorrect ? "Lektion abgeschlossen. Du kannst sie jederzeit wiederholen." : "Du kannst das Beispiel noch einmal ansehen und die Übung später bearbeiten.";
  go(s.step, true);
  if (g.history && g.history.replaceState) g.history.replaceState({ lf6Step: s.step }, "", "");
})(typeof window !== "undefined" ? window : globalThis);
