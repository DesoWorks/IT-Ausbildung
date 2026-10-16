/* Lernfeld 4: Zugangsgrundlagen ohne echte Zugangswörter. */
(function (g) {
  "use strict";
  var ID = "lf4-zugang";
  var KEY = "it-ausbildung.lf4-zugang.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Wessen Zugang nutzt Samira?", correct: "eigen", options: [
      { id: "kollegin", label: "Den Zugang einer Kollegin, die gerade Pause macht und deshalb nichts dagegen hätte.", feedback: "Ein fremder Zugang gehört nicht Samira. Auch in der Pause der Kollegin darf sie ihn nicht benutzen." },
      { id: "eigen", label: "Nur ihren eigenen, von der ausbildenden Person freigegebenen Zugang.", feedback: "Richtig. Samira arbeitet nur mit dem Zugang, der ihr persönlich zugeteilt und von der ausbildenden Person freigegeben wurde." },
      { id: "gemeinsam", label: "Einen gemeinsamen Zugang, den alle im Team über einen Zettel am Monitor kennen.", feedback: "Ein gemeinsamer Zugang, der offen bekannt ist, schützt nichts. Man könnte nicht mehr nachvollziehen, wer was getan hat." }
    ] },
    { id: "q2", prompt: "Was tut sie nicht?", correct: "nichtteilen", options: [
      { id: "nichtteilen", label: "Sie gibt ihren Zugang nicht an eine andere Person weiter.", feedback: "Richtig. Der Zugang ist persönlich. Wer ihn weitergibt, macht es möglich, dass andere in Samiras Namen handeln." },
      { id: "kollegin2", label: "Sie gibt ihren Zugang an eine Kollegin weiter, wenn diese gerade viel zu tun hat.", feedback: "Das ist genau das, was Samira nicht tut. Zeitdruck ist kein Grund, einen persönlichen Zugang weiterzugeben." },
      { id: "besucher", label: "Sie nennt ihren Zugang einem Besucher, damit er kurz etwas am Rechner nachsehen kann.", feedback: "Das ist genau das, was Samira nicht tut. Besucher bekommen keinen Zugang, auch nicht für einen kurzen Moment." }
    ] },
    { id: "q3", prompt: "Was ist mit einem Zettel, auf dem ein Zugangswort steht?", correct: "zettelweg", options: [
      { id: "monitor", label: "Sie klebt den Zettel an den Monitor, damit alle im Team den Zugang schnell finden.", feedback: "Ein Zettel am Monitor ist für alle lesbar, die vorbeikommen. Dadurch ist der Zugang nicht mehr geschützt." },
      { id: "wegwerfen", label: "Sie wirft den Zettel unbemerkt weg und sagt niemandem etwas über den Fund.", feedback: "Ohne Meldung erfährt niemand vom Fund. Die zuständige Person kann dann nicht prüfen, ob der Zugang noch sicher ist." },
      { id: "zettelweg", label: "Sie lässt ihn nicht offen liegen und meldet den Fund.", feedback: "Richtig. Der Zettel darf nicht offen liegen bleiben. Samira meldet den Fund, damit die zuständige Person entscheiden kann." }
    ] },
    { id: "q4", prompt: "Was tut sie, wenn ein Zugang fehlt?", correct: "abstimmen", options: [
      { id: "fremd", label: "Sie bittet eine Kollegin um deren Zugang, damit die Arbeit im Übungsfall ohne Pause weitergehen kann.", feedback: "Einen fremden Zugang anzufordern ist nicht erlaubt. Ein fehlender Zugang wird nicht durch den Zugang einer anderen Person ersetzt." },
      { id: "abstimmen", label: "Sie fordert keinen fremden Zugang an, sondern spricht die ausbildende Person an.", feedback: "Richtig. Fehlt ein Zugang, klärt Samira das mit der ausbildenden Person. Diese kann einen passenden Zugang freigeben." },
      { id: "nachbar", label: "Sie wartet nicht und nutzt stattdessen den Zugang, der gerade auf dem Nachbarrechner angemeldet ist.", feedback: "Eine fremde, schon angemeldete Sitzung gehört der anderen Person. Samira darf sie nicht für ihre Arbeit nutzen." }
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
  g.LF4_ZUGANG = api;
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
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast die Zugangsgrundlagen im Übungsfall passend eingeordnet." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
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
