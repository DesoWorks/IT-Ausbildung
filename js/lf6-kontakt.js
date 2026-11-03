/* Lernfeld 6: Direkten und indirekten Kundenkontakt unterscheiden. Kein echtes Ticketsystem. */
(function (g) {
  "use strict";
  var ID = "lf6-kontakt";
  var KEY = "it-ausbildung.lf6-kontakt.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Frau Koch ruft bei Nordlicht IT-Service an und schildert, dass ihr Monitor schwarz bleibt. Samira kann sofort nachfragen. Welcher Kontakt ist das?", correct: "direkt", options: [
      { id: "schriftlich", label: "Indirekter Kundenkontakt, weil ein Telefonat grundsätzlich nur zeitversetzt eine Antwort liefern kann.", feedback: "Beim Anruf antwortet die Person sofort. Zeitversetzt wäre eine Nachricht, die erst später gelesen wird." },
      { id: "direkt", label: "Direkter Kundenkontakt.", feedback: "Richtig. Es ist ein Gespräch in Echtzeit, Samira bekommt Antworten sofort. Das ist direkter Kontakt." },
      { id: "keiner", label: "Gar kein Kundenkontakt, solange Samira dazu noch kein Ticket im Ticketsystem angelegt hat.", feedback: "Auch ohne Ticket besteht Kontakt. Ob direkt oder indirekt, hängt vom Zeitpunkt der Antwort ab, nicht vom Ticket." }
    ] },
    { id: "q2", prompt: "Um 7 Uhr füllt jemand das Webformular aus. Samira liest die Meldung um 9 Uhr. Welcher Kontakt ist das?", correct: "zeitversetzt", options: [
      { id: "zeitversetzt", label: "Indirekter Kundenkontakt.", feedback: "Richtig. Die Meldung kommt zeitversetzt an, eine Rückfrage muss warten. Das ist indirekter Kontakt." },
      { id: "echtzeit", label: "Direkter Kundenkontakt, weil die Meldung ja von einer echten Person geschrieben wurde.", feedback: "Dass eine Person schreibt, macht es nicht direkt. Direkt heißt: Die Antwort kommt sofort im Gespräch." },
      { id: "spaeter", label: "Weder direkt noch indirekt, solange Samira die Meldung nicht selbst beantwortet hat.", feedback: "Die Art des Kontakts steht mit dem Eingang der Meldung fest. Eine zeitversetzte Meldung ist indirekt." }
    ] },
    { id: "q3", prompt: "Die Meldung kam per Formular. Samira braucht noch eine Angabe. Was ist bei indirektem Kontakt besonders sinnvoll?", correct: "gesammelt", options: [
      { id: "einzeln", label: "Jede Frage einzeln und möglichst spät nacheinander schicken, damit die Nachrichten übersichtlich bleiben.", feedback: "Einzelne Fragen mit langer Wartezeit dazwischen verlängern die Bearbeitung. Besser ist eine gesammelte Nachricht." },
      { id: "raten", label: "Auf die Rückfrage verzichten und die fehlende Angabe so ergänzen, wie sie am wahrscheinlichsten ist.", feedback: "Fehlende Angaben werden nicht erraten. Das würde eine Vermutung als Tatsache in die Notiz schreiben." },
      { id: "gesammelt", label: "Die offenen Fragen gesammelt in einer klaren Nachricht stellen.", feedback: "Richtig. Jede Rückfrage kostet Wartezeit. Eine klare, gesammelte Nachricht spart Hin und Her." }
    ] },
    { id: "q4", prompt: "Herr Berger steht am Empfang vor Samira und beschreibt den schwarzen Monitor. Was tut Samira zusätzlich zum Gespräch?", correct: "notieren", options: [
      { id: "merken", label: "Nichts notieren, weil ein Gespräch ohnehin im Kopf bleibt und später jeder alles genau weiß.", feedback: "Gespräche werden schnell ungenau erinnert. Eine kurze Notiz hält fest, was Herr Berger tatsächlich gesagt hat." },
      { id: "notieren", label: "Das Gesagte in der Notiz festhalten.", feedback: "Richtig. Auch ein direktes Gespräch gehört in die Notiz, damit später nachvollziehbar bleibt, was gesagt wurde." },
      { id: "wegschicken", label: "Herrn Berger bitten, die Meldung noch einmal als Formular einzureichen, bevor sie weitermacht.", feedback: "Wer schon vor ihr steht, wird nicht in ein anderes Verfahren geschickt. Das Gespräch wird direkt aufgenommen und notiert." }
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
  g.LF6_KONTAKT = api;
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
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast den Kontakt nach dem Zeitpunkt der Antwort unterschieden und Rückfragen klar gestellt. Auch ein Gespräch gehört in die Notiz." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
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
