/* Lernfeld 4: Zusammenfassung und unbenotete Abschlussaufgabe an einem fiktiven Fall. */
(function (g) {
  "use strict";
  var ID = "lf4-abschluss";
  var KEY = "it-ausbildung.lf4-abschluss.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Welchen Schutzbedarf hat die offene Kundenliste?", correct: "hoch", options: [
      { id: "hoch", label: "Hoch, weil Namen und Telefonnummern darin stehen.", feedback: "Richtig. Namen und Telefonnummern sind personenbezogene Daten. Darum hat die Kundenliste einen hohen Schutzbedarf." },
      { id: "niedrig", label: "Niedrig, weil die Liste nur kurz auf einem Übungsrechner im Büro von Nordlicht IT-Service zu sehen ist.", feedback: "Wie kurz eine Liste sichtbar ist, ändert ihren Schutzbedarf nicht. Mit Namen und Telefonnummern bleibt er hoch." },
      { id: "mittel", label: "Mittel, weil die Liste intern genutzt wird und deshalb nur wenig geschützt werden muss.", feedback: "Auch interne Listen mit personenbezogenen Daten haben einen hohen Schutzbedarf. Mittel passt eher zu internen Plänen ohne Kundendaten." }
    ] },
    { id: "q2", prompt: "Welche Handlung ist hier sicher?", correct: "sperren", options: [
      { id: "offen", label: "Den Bildschirm offen lassen, weil die Kundenliste ja nur für wenige Minuten sichtbar bleibt.", feedback: "Auch wenige Minuten reichen, damit Unbefugte die Kundenliste sehen. Offen gelassene Bildschirme sind kein sicherer Zustand." },
      { id: "sperren", label: "Den Bildschirm sperren, bevor der Platz verlassen wird.", feedback: "Richtig. Ein gesperrter Bildschirm zeigt die Kundenliste nicht mehr an. Das ist ein einfacher und sicherer Handgriff." },
      { id: "foto", label: "Die Kundenliste fotografieren und das Bild zur Sicherheit an die ganze Gruppe schicken.", feedback: "Ein Foto verteilt die personenbezogenen Daten noch weiter. Das erhöht das Risiko, statt es zu verringern." }
    ] },
    { id: "q3", prompt: "Welches Schutzziel ist hier gemeint?", correct: "vertraulichkeit", options: [
      { id: "integritaet", label: "Integrität, weil die Angaben in der Liste unverändert bleiben müssen und niemand sie ungewollt ändern darf.", feedback: "Integrität meint unveränderte, richtige Daten. Hier geht es darum, wer die Kundenliste sehen darf, nicht darum, ob sie verändert wird." },
      { id: "verfuegbarkeit", label: "Verfügbarkeit, weil die Liste jederzeit erreichbar sein muss, auch für Besucher am Übungsrechner.", feedback: "Verfügbarkeit meint, dass Daten für Befugte nutzbar sind. Die offene Liste betrifft dagegen den Kreis der Personen, die sie sehen." },
      { id: "vertraulichkeit", label: "Vertraulichkeit: Nur befugte Personen sollen die Kundenliste sehen.", feedback: "Richtig. Vertraulichkeit heißt, dass nur befugte Personen Zugriff haben. Das ist bei der offenen Kundenliste verletzt." }
    ] },
    { id: "q4", prompt: "Was gehört in die Meldung an die ausbildende Person?", correct: "melden", options: [
      { id: "schuld", label: "Der Name der Person, die vermutlich die Kundenliste offen gelassen hat, und wer dafür verantwortlich sein soll.", feedback: "Eine Vermutung über Schuld gehört nicht in die Meldung. Samira beschreibt nur, was sie selbst beobachtet hat." },
      { id: "melden", label: "Die beobachtete offene Kundenliste, nicht die Vermutung, wer sie offen gelassen hat.", feedback: "Richtig. Eine gute Meldung nennt das, was beobachtet wurde. Vermutungen über Schuld bleiben draußen." },
      { id: "rat", label: "Ein Vorschlag, welche Strafe die Person bekommen soll, die den Platz zuletzt benutzt hat.", feedback: "Samira entscheidet nicht über Folgen für andere. Sie meldet die Beobachtung, alles Weitere klärt die ausbildende Person." }
    ] },
    { id: "q5", prompt: "Welchen Zugang nutzt Samira für ihre Arbeit?", correct: "eigen", options: [
      { id: "zettel", label: "Das Zugangswort vom Zettel, damit sie die Arbeit sofort fortsetzen kann.", feedback: "Ein fremdes Zugangswort vom Zettel zu nutzen ist nicht erlaubt. Der Zettel selbst ist außerdem ein Sicherheitsproblem, das gemeldet wird." },
      { id: "kollege", label: "Den Zugang einer anderen Person aus dem Team, die gerade nicht am Platz ist.", feedback: "Zugänge sind persönlich. Mit dem Zugang einer anderen Person zu arbeiten ist nicht erlaubt, auch nicht kurz." },
      { id: "eigen", label: "Nur den eigenen, von der ausbildenden Person freigegebenen Zugang.", feedback: "Richtig. Samira arbeitet nur mit ihrem eigenen, freigegebenen Zugang. Fehlt er, fragt sie nach, statt einen fremden zu nehmen." }
    ] },
    { id: "q6", prompt: "Was tut Samira, wenn etwas unklar bleibt?", correct: "nachfragen", options: [
      { id: "nachfragen", label: "Sie fragt die ausbildende Person, bevor sie die Datei weitergibt.", feedback: "Richtig. Bei Unklarheit fragt Samira nach, bevor etwas weitergegeben wird. So entsteht kein vermeidbarer Schaden." },
      { id: "raten", label: "Sie entscheidet selbst und schickt die Datei an einen Kunden, damit die Sache schnell erledigt ist.", feedback: "Selbst zu entscheiden und die Datei zu verschicken kann Daten an die falsche Stelle bringen. Erst nachfragen, dann handeln." },
      { id: "schweigen", label: "Sie sagt nichts und hofft, dass sich die offene Liste von allein erledigt.", feedback: "Schweigen löst das Problem nicht. Die Beobachtung muss gemeldet werden, damit die Liste geschützt werden kann." }
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
  g.LF4_ABSCHLUSS = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!g.document) return;
  var d = g.document, s = { answers: {}, checked: false, finish: false };
  function $(id) { return d.getElementById(id); }
  function load() { try { var x = JSON.parse(g.localStorage.getItem(KEY) || "null"); if (x) s = x; } catch (e) { /* Speicher kann gesperrt sein. */ } }
  function save() { try { g.localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* Lektion bleibt ohne Speicherung bedienbar. */ } if (g.LERNFORTSCHRITT) g.LERNFORTSCHRITT.benachrichtigen(); }
  function update() { $("bar").style.width = barWidth(s) + "%"; $("pct").textContent = progressText(s); }
  function go(id) {
    STEPS.forEach(function (x) { $(x).hidden = x !== id; });
    d.querySelectorAll("[data-step]").forEach(function (b) { if (b.dataset.step === id) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current"); });
    if (id === "finish") { s.finish = true; save(); $("done").textContent = s.checked && evaluate(s.answers).allCorrect ? "Abschlussaufgabe geschafft. Du kannst sie jederzeit wiederholen." : "Du kannst den Fall noch einmal lesen und die Aufgabe später bearbeiten."; }
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
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast den Fall beobachtet, eingeordnet und passend gemeldet." : "Lies die Erklärungen und versuche es erneut. Die Aufgabe ist unbenotet, es gibt keinen Zeitdruck."; box.appendChild(summary); box.hidden = false;
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
