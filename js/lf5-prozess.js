/* Lernfeld 5: Den Arbeitsprozess bewerten (geplant, geprüft, offen) an einem fiktiven Zettel. */
(function (g) {
  "use strict";
  var ID = "lf5-prozess";
  var KEY = "it-ausbildung.lf5-prozess.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Was war geplant?", correct: "geplant", options: [
      { id: "offen", label: "Die Freigabe durch die ausbildende Person, weil sie am Ende noch fehlte und deshalb der eigentliche Plan gewesen sein muss.", feedback: "Die Freigabe ist der offene Punkt. Geplant war, den Namen Mira-01 auf der Übungskarte festzuhalten." },
      { id: "geplant", label: "Den Namen Mira-01 auf der Übungskarte festhalten.", feedback: "Richtig. Der Plan war, den Gerätenamen Mira-01 auf der Übungskarte festzuhalten." },
      { id: "geprueft", label: "Dass die Karte schon geprüft wurde, bevor Samira überhaupt angefangen hat, etwas einzutragen.", feedback: "Die Prüfung kommt nach dem Eintragen. Geplant war zuerst das Festhalten des Namens Mira-01." }
    ] },
    { id: "q2", prompt: "Was wurde geprüft?", correct: "geprueft", options: [
      { id: "geplant", label: "Ob der Plan schön formuliert ist und die ausbildende Person den Zettel ohne Nachfragen lesen kann.", feedback: "Schön formuliert ist kein Prüfergebnis. Geprüft wurde, ob die Karte genau Mira-01 anzeigt." },
      { id: "offen", label: "Ob die Freigabe schon da ist, weil ohne Freigabe keine Prüfung zählt und der Zettel ungültig bleibt.", feedback: "Die Freigabe ist noch offen. Geprüft wurde die Anzeige: Die Karte zeigt genau Mira-01." },
      { id: "geprueft", label: "Ob die Karte genau Mira-01 anzeigt.", feedback: "Richtig. Geprüft wurde die Anzeige. Die Karte zeigt genau den geplanten Namen Mira-01." }
    ] },
    { id: "q3", prompt: "Was bleibt offen?", correct: "offen", options: [
      { id: "offen", label: "Die Freigabe durch die ausbildende Person.", feedback: "Richtig. Der Name ist festgehalten und die Anzeige ist geprüft. Offen bleibt die Freigabe." },
      { id: "name", label: "Der Gerätename, weil Mira-01 nur ein Beispiel ist und Samira ihn noch durch einen echten Namen ersetzen muss.", feedback: "Mira-01 ist der geplante und geprüfte Name dieser Übung. Offen ist die Freigabe, nicht der Name." },
      { id: "anzeige", label: "Die Anzeige der Karte, weil Samira sie nur geplant, aber noch nicht angeschaut hat.", feedback: "Die Anzeige wurde geprüft. Offen bleibt die Freigabe durch die ausbildende Person." }
    ] },
    { id: "q4", prompt: "Wie bewertet Samira den Prozess ehrlich?", correct: "ehrlich", options: [
      { id: "fertig", label: "Als fertig, weil die Anzeige stimmt und die fehlende Freigabe für eine Übungskarte keine Rolle spielt.", feedback: "Die Anzeige stimmt, aber die Freigabe fehlt. Eine ehrliche Bewertung nennt den offenen Punkt." },
      { id: "ehrlich", label: "Geplant und geprüft, aber noch nicht freigegeben.", feedback: "Richtig. Der Prozess ist teilweise erledigt. Die Freigabe bleibt offen und wird nicht verschwiegen." },
      { id: "gescheitert", label: "Als gescheitert, weil ohne Freigabe der ganze Plan und die Prüfung nichts wert sind und neu begonnen werden muss.", feedback: "Plan und Prüfung sind erledigt. Offen ist nur die Freigabe. Das ist nicht dasselbe wie gescheitert." }
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
  g.LF5_PROZESS = api;
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
    if (id === "finish") { s.finish = true; save(); $("done").textContent = s.checked && evaluate(s.answers).allCorrect ? "Lektion abgeschlossen. Du kannst sie jederzeit wiederholen." : "Du kannst den Zettel noch einmal ansehen und die Übung später bearbeiten."; }
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
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast geplant, geprüft und offen sauber getrennt." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
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
