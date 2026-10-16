/* Lernfeld 4: Sichere und unsichere Handlungen unterscheiden. */
(function (g) {
  "use strict";
  var ID = "lf4-handlungen";
  var KEY = "it-ausbildung.lf4-handlungen.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Was ist hier die sichere Handlung?", correct: "sperren", options: [
      { id: "offen", label: "Samira lässt den Bildschirm offen, weil sie nur kurz zum Drucker geht und gleich zurück ist.", feedback: "Auch ein kurzer Weg ist ein Risiko. Auf einem offenen Bildschirm können andere Personen mitlesen, während Samira nicht am Platz ist." },
      { id: "sperren", label: "Samira sperrt den Bildschirm, bevor sie den Platz verlässt.", feedback: "Richtig. Ein gesperrter Bildschirm zeigt nichts mehr an. So kann niemand mitlesen, solange Samira nicht am Platz ist." },
      { id: "aufpassen", label: "Samira bittet einen Besucher, auf den offenen Bildschirm aufzupassen, bis sie wieder da ist.", feedback: "Ein Besucher ist keine Absicherung. Der Bildschirm bleibt lesbar. Sicher ist nur, ihn vor dem Weggehen zu sperren." }
    ] },
    { id: "q2", prompt: "Was ist hier unsicher?", correct: "liegenlassen", options: [
      { id: "gesperrt", label: "Ein Bildschirm wird beim Verlassen des Platzes gesperrt, sodass niemand mitlesen kann.", feedback: "Das ist eine sichere Handlung. Der gesperrte Bildschirm schützt die Inhalte, solange niemand am Platz sitzt." },
      { id: "abgesprochen", label: "Eine Datei wird vor dem Weitergeben mit der ausbildenden Person abgesprochen und dann gesendet.", feedback: "Das ist eine sichere Handlung. Durch die Absprache wird vor dem Weitergeben geklärt, ob die Datei gesendet werden darf." },
      { id: "liegenlassen", label: "Eine Kundenliste bleibt auf dem unbeaufsichtigten Bildschirm offen.", feedback: "Richtig. Die Kundenliste enthält personenbezogene Daten. Auf einem unbeaufsichtigten Bildschirm kann sie jede vorbeikommende Person lesen." }
    ] },
    { id: "q3", prompt: "Was tut Samira, wenn eine Handlung nicht klar ist?", correct: "fragen", options: [
      { id: "weitergeben", label: "Sie gibt die Datei erst einmal weiter und wartet ab, ob sich jemand beschwert.", feedback: "Abwarten ist riskant. Eine weitergegebene Datei lässt sich oft nicht zurückholen. Bei Unsicherheit wird vorher nachgefragt." },
      { id: "fragen", label: "Sie fragt die ausbildende Person, bevor sie die Datei weitergibt.", feedback: "Richtig. Bei Unsicherheit fragt Samira nach, bevor die Datei weitergegeben wird. So entsteht kein vermeidbarer Schaden." },
      { id: "raten", label: "Sie rät, was erlaubt ist, und handelt nach ihrem Gefühl, ohne jemanden zu informieren.", feedback: "Ein Bauchgefühl ersetzt keine Absprache. Wenn etwas unklar ist, gehört die Frage an die ausbildende Person vor die Handlung." }
    ] },
    { id: "q4", prompt: "Welche Handlung passt nicht?", correct: "nichttesten", options: [
      { id: "nichttesten", label: "Einen fremden Zugang ausprobieren, um zu sehen, ob er funktioniert.", feedback: "Richtig, das passt nicht. Ein fremder Zugang gehört der anderen Person. Ihn auszuprobieren ist keine sichere Handlung, auch nicht aus Neugier." },
      { id: "sperrenkurz", label: "Den Bildschirm sperren, bevor der Platz verlassen wird, auch bei kurzen Wegen.", feedback: "Diese Handlung passt zu sicherem Verhalten. Das Sperren dauert nur einen Moment und schützt die Inhalte auf dem Bildschirm." },
      { id: "nachfragen", label: "Bei Unsicherheit die ausbildende Person fragen, bevor etwas weitergegeben wird.", feedback: "Diese Handlung passt zu sicherem Verhalten. Nachfragen vor dem Weitergeben verhindert Fehler, die sich später nicht mehr korrigieren lassen." }
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
  g.LF4_HANDLUNGEN = api;
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
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast sichere und unsichere Handlungen im Übungsfall passend unterschieden." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
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
