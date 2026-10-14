/* Lernfeld 5: Ein Datenformat an einem fiktiven Beispiel wählen (Text, Zahl, Tabelle, keine Datenbank). */
(function (g) {
  "use strict";
  var ID = "lf5-format";
  var KEY = "it-ausbildung.lf5-format.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Was soll festgehalten werden?", correct: "felder", options: [
      { id: "nurtext", label: "Nur der Gerätename Mira-01, weil die Raumnummer schon in der Überschrift steht und nicht extra festgehalten werden muss.", feedback: "Beide Werte gehören auf die Übungskarte: der Name als Text und die Raumnummer als ganze Zahl." },
      { id: "felder", label: "Der Gerätename als Text und die Raumnummer als ganze Zahl.", feedback: "Richtig. Mira-01 ist ein Text, die Raumnummer 12 ist eine ganze Zahl. Beide werden festgehalten." },
      { id: "bank", label: "Eine ganze Datenbank mit allen Geräten des Betriebs, damit die eine Karte später nicht zu klein wird.", feedback: "Für diese eine Übungskarte reicht das nicht. Festgehalten werden nur Name und Raumnummer." }
    ] },
    { id: "q2", prompt: "Welche Form passt für die Übungskarte?", correct: "tabelle", options: [
      { id: "fliess", label: "Ein langer Fließtext, in dem Name und Raumnummer irgendwo im Satz vorkommen und später gesucht werden.", feedback: "Im Fließtext vermischen sich die Werte. Eine kleine Tabelle mit zwei benannten Feldern hält sie getrennt." },
      { id: "bank", label: "Eine Datenbank mit vielen Tabellen, Benutzern und Rechten, weil jede Karte so professionell wie möglich sein soll.", feedback: "Eine Datenbank ist für diese eine Übungskarte nicht nötig. Eine kleine Tabelle mit zwei Feldern reicht." },
      { id: "tabelle", label: "Eine kleine Tabelle mit zwei benannten Feldern.", feedback: "Richtig. Zwei benannte Felder halten den Text und die Zahl getrennt. Das passt zur Übungskarte." }
    ] },
    { id: "q3", prompt: "Warum nicht ein langer Fließtext?", correct: "getrennt", options: [
      { id: "getrennt", label: "Dann lassen sich Name und Zahl nicht sicher trennen.", feedback: "Richtig. Im Fließtext stehen Name und Zahl im selben Satz. Benannte Felder halten sie auseinander." },
      { id: "lang", label: "Weil ein langer Text immer falsch ist und in einer Übungskarte grundsätzlich nicht vorkommen darf, auch nicht als Erklärung.", feedback: "Ein Text kann eine Erklärung sein. Hier geht es darum, dass Name und Zahl im Fließtext nicht sicher getrennt bleiben." },
      { id: "bank", label: "Weil nur eine Datenbank Text und Zahlen speichern kann und eine Tabelle das grundsätzlich nicht schafft.", feedback: "Eine kleine Tabelle kann Text und Zahl in getrennten Feldern halten. Eine Datenbank ist dafür nicht nötig." }
    ] },
    { id: "q4", prompt: "Was gilt für eine Datenbank in diesem Beispiel?", correct: "keinebank", options: [
      { id: "pflicht", label: "Sie ist Pflicht, sobald ein Name und eine Zahl zusammen gespeichert werden, sonst gilt die Karte nicht.", feedback: "Name und Zahl passen in zwei Felder. Für eine Übungskarte ist eine Datenbank nicht nötig." },
      { id: "keinebank", label: "Für eine Übungskarte ist sie nicht nötig.", feedback: "Richtig. Eine kleine Tabelle mit zwei Feldern reicht. Eine Datenbank wäre für diese eine Karte zu viel." },
      { id: "verboten", label: "Sie ist immer verboten, auch später, wenn viele Geräte und mehrere Personen dieselben Werte brauchen.", feedback: "In diesem Beispiel ist sie nicht nötig. Das heißt nicht, dass eine Datenbank später grundsätzlich verboten wäre." }
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
  g.LF5_FORMAT = api;
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
    if (id === "finish") { s.finish = true; save(); $("done").textContent = s.checked && evaluate(s.answers).allCorrect ? "Lektion abgeschlossen. Du kannst sie jederzeit wiederholen." : "Du kannst das Beispiel noch einmal ansehen und die Übung später bearbeiten."; }
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
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast Text, Zahl, Tabelle und den Verzicht auf eine Datenbank richtig eingeordnet." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
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
