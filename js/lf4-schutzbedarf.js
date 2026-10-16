/* Lernfeld 4: Schutzbedarf an fiktiven Beispielen erkennen. */
(function (g) {
  "use strict";
  var ID = "lf4-schutzbedarf";
  var KEY = "it-ausbildung.lf4-schutzbedarf.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Welche Angabe zeigt einen hohen Schutzbedarf?", correct: "hoch", options: [
      { id: "niedrig", label: "Ein öffentlich ausgehängter Raumplan im Eingangsbereich von Nordlicht IT-Service.", feedback: "Ein öffentlich ausgehängter Raumplan enthält keine vertraulichen Angaben. Sein Schutzbedarf ist niedrig, nicht hoch." },
      { id: "hoch", label: "Eine Kundenliste mit Namen und Telefonnummern.", feedback: "Richtig. Namen und Telefonnummern sind personenbezogene Daten. Bei Nordlicht IT-Service gilt dafür ein hoher Schutzbedarf." },
      { id: "egal", label: "Die Farbe der Tastatur am Empfangsrechner im Übungsfall.", feedback: "Die Farbe einer Tastatur sagt nichts über schützenswerte Informationen aus. Sie hat keinen eigenen Schutzbedarf." }
    ] },
    { id: "q2", prompt: "Was ist ein mittlerer Schutzbedarf in diesem Übungsfall?", correct: "mittel", options: [
      { id: "mittel", label: "Ein interner Terminplan ohne Kundendaten.", feedback: "Richtig. Der Terminplan ist nur intern gedacht, enthält aber keine Kundendaten. Das ergibt einen mittleren Schutzbedarf." },
      { id: "hoch2", label: "Die Kundenliste mit Namen und Telefonnummern aus dem Übungsfall.", feedback: "Die Kundenliste enthält personenbezogene Daten. Im Übungsfall gilt sie als hoher, nicht als mittlerer Schutzbedarf." },
      { id: "keiner", label: "Ein leerer Notizzettel ohne jeden Inhalt auf dem Schreibtisch.", feedback: "Ein leerer Zettel enthält nichts, das geschützt werden müsste. Das ist kein Beispiel für einen mittleren Schutzbedarf." }
    ] },
    { id: "q3", prompt: "Was hat hier einen niedrigen Schutzbedarf?", correct: "niedrig", options: [
      { id: "geheim", label: "Ein Passwortzettel, der am Arbeitsplatz von Samira liegt.", feedback: "Ein Passwortzettel schützt den Zugang zu Systemen und hat einen hohen Schutzbedarf. Solche Zettel gehören nicht offen auf den Tisch." },
      { id: "liste", label: "Die Kundenliste mit Namen und Telefonnummern von Nordlicht IT-Service.", feedback: "Die Kundenliste enthält personenbezogene Daten. Ihr Schutzbedarf ist hoch und nicht niedrig." },
      { id: "niedrig", label: "Ein öffentlich aushängender Raumplan ohne personenbezogene Daten.", feedback: "Richtig. Der Raumplan hängt öffentlich aus und enthält keine personenbezogenen Daten. Sein Schutzbedarf ist niedrig." }
    ] },
    { id: "q4", prompt: "Was tut Samira, wenn sie den Schutzbedarf nicht sicher einordnen kann?", correct: "abstimmen", options: [
      { id: "abstimmen", label: "Sie fragt die ausbildende Person, bevor sie die Datei weitergibt.", feedback: "Richtig. Bei Unsicherheit fragt Samira nach, bevor die Datei weitergegeben wird. So entsteht kein vermeidbarer Schaden." },
      { id: "raten", label: "Sie rät den Schutzbedarf und speichert die Datei trotzdem im gemeinsamen Ordner.", feedback: "Raten ist riskant. Eine falsch eingeordnete Datei kann im gemeinsamen Ordner von Personen gesehen werden, die sie nicht sehen sollen." },
      { id: "posten", label: "Sie stellt die Datei zur Sicherheit in einen öffentlichen Ordner für alle Besucher.", feedback: "Ein öffentlicher Ordner schützt nichts. Bei Unsicherheit wird die Datei nicht veröffentlicht, sondern zuerst nachgefragt." }
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
  g.LF4_SCHUTZBEDARF = api;
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
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast den Schutzbedarf der Beispiele passend eingeordnet." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
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
