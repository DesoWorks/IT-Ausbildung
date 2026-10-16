/* Lernfeld 4: Einen Vorfall beobachten und melden. */
(function (g) {
  "use strict";
  var ID = "lf4-vorfall";
  var KEY = "it-ausbildung.lf4-vorfall.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Was gehört in die Meldung?", correct: "beobachten", options: [
      { id: "beobachten", label: "Die beobachtete offene Kundenliste auf dem unbeaufsichtigten Übungsrechner.", feedback: "Richtig. In die Meldung gehört, was Samira selbst gesehen hat: die offene Kundenliste auf dem unbeaufsichtigten Übungsrechner." },
      { id: "ursache", label: "Die eigene Einschätzung, warum es passiert ist und wer dafür verantwortlich gemacht werden sollte.", feedback: "Eine Ursache oder Schuld ist keine Beobachtung. Samira meldet, was sie gesehen hat, und urteilt nicht über Verantwortung." },
      { id: "zusage", label: "Eine Zusage, bis wann der Betrieb den Vorfall vollständig geklärt und behoben haben wird.", feedback: "Zusagen über Fristen oder Abläufe kann Samira nicht machen. Die Meldung enthält nur Beobachtung, Stand und offene Punkte." }
    ] },
    { id: "q2", prompt: "Was gehört nicht als Tatsache in die Meldung?", correct: "nichtvermuten", options: [
      { id: "ortzeit", label: "Die Uhrzeit und der Ort, an denen Samira die offene Liste auf dem Bildschirm gesehen hat.", feedback: "Uhrzeit und Ort sind beobachtete Angaben. Sie gehören als Tatsache in die Meldung, damit sie nachvollziehbar bleibt." },
      { id: "datei", label: "Die Angabe, welche Datei auf dem Bildschirm sichtbar war und dass niemand am Platz saß.", feedback: "Das hat Samira gesehen. Es gehört als Tatsache in die Meldung und hilft der ausbildenden Person bei der Einschätzung." },
      { id: "nichtvermuten", label: "Die Vermutung, wer den Bildschirm offen gelassen hat.", feedback: "Richtig. Eine Vermutung über eine Person ist keine Tatsache. Sie gehört nicht in die Meldung und kann eine Person zu Unrecht belasten." }
    ] },
    { id: "q3", prompt: "An wen geht die Meldung zuerst?", correct: "melden", options: [
      { id: "oeffentlich", label: "In einen öffentlichen Ordner, den alle Besucher und Mitarbeitenden jederzeit einsehen können.", feedback: "Ein öffentlicher Ordner ist für alle lesbar. Die Meldung würde Angaben zum Vorfall unnötig weit verbreiten." },
      { id: "melden", label: "An die ausbildende Person, nicht in einen öffentlichen Ordner.", feedback: "Richtig. Die ausbildende Person ist die erste Anlaufstelle. Sie entscheidet, wie es weitergeht, und die Meldung bleibt im richtigen Kreis." },
      { id: "nachbar", label: "An die Kollegin am Nachbarplatz, die dann selbst entscheiden soll, was weiter geschieht.", feedback: "Die Kollegin am Nachbarplatz ist nicht die zuständige Stelle. Die Meldung geht zuerst an die ausbildende Person." }
    ] },
    { id: "q4", prompt: "Was tut Samira nicht selbst?", correct: "nichtuntersuchen", options: [
      { id: "nichtuntersuchen", label: "Sie untersucht den Vorfall nicht weiter und ändert nichts an dem Rechner.", feedback: "Richtig. Samira beobachtet und meldet. Sie untersucht nicht weiter und verändert nichts am Rechner, damit der Stand erhalten bleibt." },
      { id: "durchsuchen", label: "Sie durchsucht den Rechner nach weiteren Spuren und öffnet dafür andere Dateien und Programme.", feedback: "Das ist genau das, was Samira nicht tut. Weiteres Öffnen und Suchen verändert den Stand und ist nicht ihre Aufgabe." },
      { id: "aufraeumen", label: "Sie räumt den Rechner auf und löscht Einträge, damit der Vorfall nicht mehr sichtbar ist.", feedback: "Das ist genau das, was Samira nicht tut. Löschen oder Aufräumen verändert den Stand und verdeckt, was gemeldet werden soll." }
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
  function progress(s) { s = s || {}; var done = (s.checked ? evaluate(s.answers).correct : 0) + (s.finish ? 1 : 0); return done; }
  function progressText(s) { s = s || {}; var done = progress(s); var total = Q.length + 1; return "Fortschritt: " + done + " von " + total + " Schritten · Abschluss " + (s.finish ? "geöffnet" : "noch nicht geöffnet"); }
  var api = { ID: ID, KEY: KEY, STEPS: STEPS, QUESTIONS: Q, evaluate: evaluate, progress: progress, progressText: progressText };
  g.LF4_VORFALL = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!g.document) return;
  var d = g.document, s = { answers: {}, checked: false, finish: false };
  function $(id) { return d.getElementById(id); }
  function load() { try { var x = JSON.parse(g.localStorage.getItem(KEY) || "null"); if (x) s = x; } catch (e) { /* Speicher kann gesperrt sein. */ } }
  function save() { try { g.localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* Lektion bleibt ohne Speicherung bedienbar. */ } if (g.LERNFORTSCHRITT) g.LERNFORTSCHRITT.benachrichtigen(); }
  function update() { var n = Math.round(progress(s) / (Q.length + 1) * 100); $("bar").style.width = n + "%"; $("pct").textContent = progressText(s); }
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
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast die Meldung des Vorfalls im Übungsfall passend eingeordnet." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
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
