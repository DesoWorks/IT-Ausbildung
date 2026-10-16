/* Lernfeld 4: Einfache Risiken an fiktiven Beispielen einordnen. */
(function (g) {
  "use strict";
  var ID = "lf4-risiken";
  var KEY = "it-ausbildung.lf4-risiken.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Was ist in diesem Übungsfall ein erkennbares Risiko?", correct: "offen", options: [
      { id: "offen", label: "Ein unbeaufsichtigter Bildschirm mit einer offenen Kundenliste.", feedback: "Richtig. Jede vorbeikommende Person könnte die Kundenliste sehen. Das ist ein erkennbares Risiko." },
      { id: "gesperrt", label: "Ein gesperrter Bildschirm im leeren Büro, an dem niemand eine Liste sieht.", feedback: "Ein gesperrter Bildschirm zeigt nichts an. Hier ist die Liste geschützt, deshalb ist das kein erkennbares Risiko." },
      { id: "drucker", label: "Ein Drucker ohne Papier.", feedback: "Ein leerer Papierschacht ist lästig, gefährdet aber keine Informationen. Es ist kein Sicherheitsrisiko." }
    ] },
    { id: "q2", prompt: "Was tut Samira zuerst?", correct: "melden", options: [
      { id: "weiterlesen", label: "Sie liest die Liste weiter, um zu prüfen, ob etwas fehlt, und spricht später im Team darüber, wenn es passt.", feedback: "Weiterlesen ist nicht ihre Aufgabe. Sie hat keinen Auftrag für diese Liste und soll zuerst die Ansicht schützen und melden." },
      { id: "ausschalten", label: "Sie zieht den Stecker und geht ohne ein Wort weiter.", feedback: "Ohne Meldung erfährt niemand von dem Vorfall. Außerdem können dabei ungespeicherte Arbeiten verloren gehen." },
      { id: "melden", label: "Sie sperrt die Ansicht, soweit sie das darf, und meldet die Beobachtung der ausbildenden Person.", feedback: "Richtig. Samira schützt die Ansicht im Rahmen ihrer Rechte und gibt die Beobachtung an die ausbildende Person weiter." }
    ] },
    { id: "q3", prompt: "Welcher Fall hat hier das höhere Risiko?", correct: "zettel", options: [
      { id: "raumplan", label: "Ein öffentlicher Raumplan im Eingangsbereich, der für alle Besucher gedacht ist.", feedback: "Der Raumplan ist für alle gedacht und enthält nichts Geheimes. Sein Risiko ist niedrig, nicht höher." },
      { id: "zettel", label: "Ein Zettel mit einem Zugangswort auf dem Tisch.", feedback: "Richtig. Wer den Zettel liest, könnte sich Zugang verschaffen. Das Risiko ist höher als bei einem öffentlichen Raumplan." },
      { id: "block", label: "Ein leerer Notizblock ohne Inhalt neben dem Telefon.", feedback: "Ein leerer Block enthält keine Information, die jemand missbrauchen könnte. Das Risiko ist sehr gering." }
    ] },
    { id: "q4", prompt: "Samira entdeckt einen fremden Zugang. Was ist keine passende Handlung?", correct: "nichtprobieren", options: [
      { id: "nichtprobieren", label: "Den fremden Zugang ausprobieren.", feedback: "Richtig. Die passende Handlung ist nachfragen und nicht selbst prüfen, ob der Zugang funktioniert." },
      { id: "nachfragen", label: "Nachfragen und nicht selbst prüfen, ob der Zugang funktioniert.", feedback: "Das ist die passende Handlung. Samira prüft nichts selbst und lässt die ausbildende Person entscheiden." },
      { id: "fundmelden", label: "Den Fund der ausbildenden Person melden.", feedback: "Melden ist passend. Die zuständige Person kann den Zugang einordnen, ohne dass Samira etwas ausprobiert." }
    ] }
  ];
  function evaluate(a) {
    a = a || {};
    var results = Q.map(function (q) {
      var o = q.options.find(function (x) { return x.id === a[q.id]; });
      return { id: q.id, status: !o ? "empty" : o.id === q.correct ? "correct" : "wrong", optionId: o ? o.id : "", feedback: o ? o.feedback : "" };
    });
    return { results: results, correct: results.filter(function (x) { return x.status === "correct"; }).length, wrong: results.filter(function (x) { return x.status === "wrong"; }).length, empty: results.filter(function (x) { return x.status === "empty"; }).length, allCorrect: results.every(function (x) { return x.status === "correct"; }) };
  }
  function progress(s) { s = s || {}; return (s.checked ? evaluate(s.answers).correct : 0) + (s.finish ? 1 : 0); }
  function percent(s) { return Math.round(progress(s) / (Q.length + 1) * 100); }
  function progressText(s) { s = s || {}; return "Fortschritt: " + progress(s) + " von " + (Q.length + 1) + " Schritten · Abschluss " + (s.finish ? "geöffnet" : "noch nicht geöffnet"); }
  var api = { ID: ID, KEY: KEY, STEPS: STEPS, QUESTIONS: Q, evaluate: evaluate, progress: progress, percent: percent, progressText: progressText };
  g.LF4_RISIKEN = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!g.document) return;
  var d = g.document, s = { answers: {}, checked: false, finish: false };
  function $(id) { return d.getElementById(id); }
  function load() { try { var x = JSON.parse(g.localStorage.getItem(KEY) || "null"); if (x) s = x; } catch (e) { /* Speicher kann gesperrt sein. */ } }
  function save() { try { g.localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* Lektion bleibt ohne Speicherung bedienbar. */ } if (g.LERNFORTSCHRITT) g.LERNFORTSCHRITT.benachrichtigen(); }
  function update() { $("bar").style.width = percent(s) + "%"; $("pct").textContent = progressText(s); }
  function go(id) {
    STEPS.forEach(function (x) { $(x).hidden = x !== id; });
    d.querySelectorAll("[data-step]").forEach(function (b) { if (b.dataset.step === id) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current"); });
    if (id === "finish") { s.finish = true; save(); $("done").textContent = s.checked && evaluate(s.answers).allCorrect ? "Lektion abgeschlossen. Du kannst sie jederzeit wiederholen." : "Du kannst die Beispielkarten erneut ansehen und die Übung später bearbeiten."; }
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
  function render() {
    var ev = evaluate(s.answers), box = $("result"), heading = d.createElement("h3"); box.textContent = "";
    heading.textContent = ev.allCorrect ? "Alle Antworten richtig" : ev.correct ? "Teilweise richtig" : ev.empty === Q.length ? "Noch keine Antwort gewählt" : "Noch nicht richtig"; box.appendChild(heading);
    ev.results.forEach(function (r, index) {
      var q = Q[index], option = q.options.find(function (x) { return x.id === r.optionId; }), p = d.createElement("p");
      p.textContent = (r.status === "correct" ? "✓ Richtig: " : r.status === "wrong" ? "✗ Noch nicht richtig: " : "○ Nicht beantwortet: ") + "Aufgabe " + (index + 1) + " – " + q.prompt + " " + (option ? "Deine Antwort: " + option.label + " " : "") + (option ? option.feedback : "Noch nicht beantwortet. Wähle eine Antwort und prüfe erneut."); box.appendChild(p);
      var fb = $("fb-" + q.id); fb.textContent = option ? option.feedback : "Noch nicht beantwortet. Wähle eine Antwort und prüfe erneut."; fb.hidden = false;
    });
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast die einfachen Risiken der Beispiele passend eingeordnet." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
  }
  function check() {
    s.answers = {};
    Q.forEach(function (q) { var input = d.querySelector('input[name="' + q.id + '"]:checked'); if (input) s.answers[q.id] = input.value; });
    s.checked = true; render(); save(); update();
  }
  function reset() {
    s = { answers: {}, checked: false, finish: false }; d.querySelectorAll('#questions input[type="radio"]').forEach(function (input) { input.checked = false; }); hide();
    Q.forEach(function (q) { $("fb-" + q.id).hidden = true; $("fb-" + q.id).textContent = ""; }); $("done").textContent = ""; save(); update();
  }
  d.querySelectorAll("[data-step]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.step); }); });
  d.querySelectorAll("[data-next]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.next); }); });
  $("check").addEventListener("click", check); $("reset").addEventListener("click", reset);
  $("reset-all").addEventListener("click", function () { if (g.confirm("Gespeicherten Lernfortschritt dieser Lektion zurücksetzen?")) { reset(); go("start"); } });
  load(); build();
  Q.forEach(function (q) { var option = q.options.find(function (o) { return o.id === s.answers[q.id]; }); if (option) { var input = d.querySelector('input[name="' + q.id + '"][value="' + option.id + '"]'); if (input) input.checked = true; } });
  if (s.checked) render(); update();
})(typeof window !== "undefined" ? window : globalThis);
