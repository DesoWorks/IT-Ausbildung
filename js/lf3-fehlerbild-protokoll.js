/* Lernfeld 3: fiktives Supportprotokoll zu einem Client-Fehlerbild ordnen und übergeben. */
(function (g) {
  "use strict";
  var ID = "lf3-fehlerbild-protokoll";
  var KEY = "it-ausbildung.lf3-fehlerbild-protokoll.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Welcher Eintrag im Protokoll von Mira-01 ist eine Beobachtung?", correct: "link", options: [
      { id: "ursache", label: "Der Fehler liegt vermutlich am Namensdienst, weil der Aufruf scheitert.", feedback: "Nein. Das ist eine Vermutung über die Ursache. Eine Beobachtung hält nur fest, was angezeigt wurde." },
      { id: "link", label: "Der Link-Status wird in der Anzeige als aktiv angezeigt.", feedback: "Richtig. Das ist eine Beobachtung: Sie nennt nur, was die vorgegebene Anzeige zeigt, ohne Deutung." },
      { id: "geloest", label: "Das Problem ist damit behoben und die Meldung kann geschlossen werden.", feedback: "Nein. Das wäre eine Aussage über das Ergebnis, und sie stimmt hier nicht: Der Namensaufruf liefert weiterhin keine Antwort." }
    ]},
    { id: "q2", prompt: "Was gehört in die Spalte „Getesteter Schritt“?", correct: "schritt", options: [
      { id: "beob", label: "Mira-01 meldet „kein Netzwerk“, sobald man den Laptop startet.", feedback: "Nein. Das ist die Meldung, also der Ausgangspunkt. Ein getesteter Schritt beschreibt, was danach geprüft wurde." },
      { id: "gateway", label: "Vermutlich ist das Gateway defekt und muss ausgetauscht werden.", feedback: "Nein. Das ist eine Vermutung ohne Prüfung. Sie gehört höchstens in einen Vorschlag, nicht in die Spalte der Schritte." },
      { id: "schritt", label: "Der Namensaufruf wurde in der Simulation wiederholt.", feedback: "Richtig. Das ist ein Schritt: Er sagt, was getan wurde. Das Ergebnis des Schritts steht in einer eigenen Spalte." }
    ]},
    { id: "q3", prompt: "Was gehört in eine geordnete Übergabe?", correct: "getrennt", options: [
      { id: "getrennt", label: "Beobachtung, Schritt, Ergebnis und offene Punkte getrennt.", feedback: "Richtig. Wer das Protokoll übernimmt, sieht so sofort, was beobachtet, was getestet und was noch offen ist." },
      { id: "tatsache", label: "Eine Vermutung über die Ursache als gesicherte Tatsache formuliert.", feedback: "Nein. Eine Vermutung muss als Vermutung erkennbar bleiben, sonst verlässt sich die nächste Person auf etwas, das nicht geprüft ist." },
      { id: "schuld", label: "Ein Hinweis darauf, wer den Fehler verursacht haben soll und warum.", feedback: "Nein. Ein Protokoll hält fest, was beobachtet und getestet wurde. Schuldzuweisungen helfen bei der Übergabe nicht." }
    ]},
    { id: "q4", prompt: "Welche Angabe gehört nicht in dieses fiktive Protokoll?", correct: "frist", options: [
      { id: "offen", label: "Der Hinweis, dass die Übungstabelle noch nicht angesehen wurde.", feedback: "Doch, das gehört hinein. Ein offener Punkt zeigt der nächsten Person, womit sie weitermachen kann." },
      { id: "frist", label: "Eine Zusage, bis wann der Fehler behoben sein wird.", feedback: "Richtig. Das Protokoll hält den Stand fest und macht keine Zusage über Fristen oder Betriebsabläufe." },
      { id: "adresse", label: "Die angezeigte Adresse 192.168.10.25 aus der Simulation.", feedback: "Doch, das gehört hinein. Die angezeigte Adresse ist eine Beobachtung und hilft beim Nachvollziehen." }
    ]}
  ];
  function evaluate(answers) {
    answers = answers || {};
    var results = Q.map(function (q) {
      var option = q.options.find(function (o) { return o.id === answers[q.id]; });
      return { id: q.id, status: !option ? "empty" : (option.id === q.correct ? "correct" : "wrong"), optionId: option ? option.id : "", feedback: option ? option.feedback : "" };
    });
    var correct = results.filter(function (r) { return r.status === "correct"; }).length;
    var empty = results.filter(function (r) { return r.status === "empty"; }).length;
    return { results: results, correct: correct, wrong: results.length - correct - empty, empty: empty, allCorrect: correct === Q.length };
  }
  function progress(s) { s = s || {}; return Math.round(((s.checked ? evaluate(s.answers).correct : 0) + (s.finish ? 1 : 0)) / (Q.length + 1) * 100); }
  function progressText(s) { return "Fortschritt: " + progress(s) + " %"; }
  var api = { ID: ID, KEY: KEY, STEPS: STEPS, QUESTIONS: Q, evaluate: evaluate, progress: progress, progressText: progressText };
  g.LF3_FEHLERBILD_PROTOKOLL = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!g.document) return;
  var d = g.document, s = { answers: {}, checked: false, finish: false };
  function $(id) { return d.getElementById(id); }
  function load() { try { var x = JSON.parse(g.localStorage.getItem(KEY) || "null"); if (x) s = x; } catch (e) { /* Speicher kann gesperrt sein. */ } }
  function save() { try { g.localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* Lektion bleibt ohne Speicherung bedienbar. */ } if (g.LERNFORTSCHRITT) g.LERNFORTSCHRITT.benachrichtigen(); }
  function update() { var n = progress(s); $("bar").style.width = n + "%"; $("pct").textContent = progressText(s); }
  function go(id) {
    STEPS.forEach(function (x) { $(x).hidden = x !== id; });
    d.querySelectorAll("[data-step]").forEach(function (b) { if (b.dataset.step === id) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current"); });
    if (id === "finish") { s.finish = true; save(); $("done").textContent = s.checked && evaluate(s.answers).allCorrect ? "Lektion abgeschlossen. Du kannst sie jederzeit wiederholen." : "Du kannst das Protokoll erneut ansehen und die Übung später bearbeiten."; }
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
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast Beobachtung, Schritt und Ergebnis im Protokoll sauber getrennt." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
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
