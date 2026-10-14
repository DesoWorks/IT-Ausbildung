/* Lernfeld 4: Schutzziele an fiktiven Beispielen unterscheiden. */
(function (g) {
  "use strict";
  var ID = "lf4-schutzziele";
  var KEY = "it-ausbildung.lf4-schutzziele.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Welche Angabe beschreibt Vertraulichkeit?", correct: "vertraulichkeit", options: [
      { id: "erreichbar", label: "Die Kundenliste ist während der Öffnungszeiten immer erreichbar.", feedback: "Das beschreibt Verfügbarkeit: Die Liste ist erreichbar, wenn man sie braucht. Vertraulichkeit meint, wer sie sehen darf." },
      { id: "vertraulichkeit", label: "Nur befugte Personen sehen die Kundenliste.", feedback: "Richtig. Vertraulichkeit heißt: Nur wer dazu befugt ist, darf die Kundenliste von Nordlicht IT-Service sehen." },
      { id: "aenderung", label: "Die Kundenliste wurde nicht unbemerkt verändert.", feedback: "Das beschreibt Integrität: Die Liste ist unverändert und vollständig. Vertraulichkeit fragt dagegen, wer sie lesen darf." }
    ] },
    { id: "q2", prompt: "Welche Angabe beschreibt Integrität?", correct: "integritaet", options: [
      { id: "geheim", label: "Nur befugte Personen sehen die Kundenliste.", feedback: "Das beschreibt Vertraulichkeit: Es geht darum, wer lesen darf. Bei Integrität geht es um unbemerkte Veränderungen." },
      { id: "zeit", label: "Die berechtigte Person kommt zur vereinbarten Zeit an die Kundenliste.", feedback: "Das beschreibt Verfügbarkeit: Die Daten sind rechtzeitig erreichbar. Integrität meint, dass sie unverändert bleiben." },
      { id: "integritaet", label: "Die Kundenliste wurde nicht unbemerkt verändert.", feedback: "Richtig. Integrität heißt: Die Kundenliste ist richtig und vollständig, und Änderungen fallen auf." }
    ] },
    { id: "q3", prompt: "Welche Angabe beschreibt Verfügbarkeit?", correct: "verfuegbarkeit", options: [
      { id: "verfuegbarkeit", label: "Die berechtigte Person kommt zur vereinbarten Zeit an die Datei.", feedback: "Richtig. Verfügbarkeit heißt: Wer berechtigt ist, kommt zur vereinbarten Zeit an die Datei." },
      { id: "zugriff", label: "Nur befugte Personen sehen die Datei, und alle anderen bleiben ausgesperrt.", feedback: "Das beschreibt Vertraulichkeit: Es geht darum, wer lesen darf. Verfügbarkeit fragt, ob die Datei rechtzeitig erreichbar ist." },
      { id: "aenderung", label: "Die Datei wurde nicht unbemerkt verändert.", feedback: "Das beschreibt Integrität: Die Datei ist unverändert. Verfügbarkeit meint den rechtzeitigen Zugang für Berechtigte." }
    ] },
    { id: "q4", prompt: "Was tut Samira, wenn sie das Schutzziel nicht sicher zuordnen kann?", correct: "abstimmen", options: [
      { id: "raten", label: "Sie ordnet die Datei nach Gefühl einem Schutzziel zu und arbeitet weiter.", feedback: "Raten ist riskant. Eine falsche Zuordnung kann dazu führen, dass die Datei nicht passend geschützt wird." },
      { id: "abstimmen", label: "Sie fragt die ausbildende Person.", feedback: "Richtig. Bei Unsicherheit fragt Samira nach, bevor sie weiterarbeitet. So entsteht kein vermeidbarer Schaden." },
      { id: "liegen", label: "Sie lässt die Aufgabe einfach unbearbeitet liegen.", feedback: "Liegenlassen löst die Frage nicht. Besser ist es, kurz bei der ausbildenden Person nachzufragen." }
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
  g.LF4_SCHUTZZIELE = api;
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
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast die Schutzziele an den Beispielen passend unterschieden." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
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
