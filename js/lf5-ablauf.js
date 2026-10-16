/* Lernfeld 5: Reihenfolge und Entscheidung auf einem fiktiven Ablaufzettel lesen. */
(function (g) {
  "use strict";
  var ID = "lf5-ablauf";
  var KEY = "it-ausbildung.lf5-ablauf.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Was kommt auf dem Ablaufzettel zuerst?", correct: "reihenfolge", options: [
      { id: "bildschirm", label: "Prüfen, ob der Bildschirm gesperrt ist, weil das die wichtigste Frage auf dem Zettel ist.", feedback: "Die Prüfung des Bildschirms ist der zweite Schritt. Zuerst steht auf dem Zettel das Lesen des Gerätenamens." },
      { id: "fragen", label: "Die ausbildende Person fragen, damit sie den Zettel vor dem Start freigibt.", feedback: "Das Fragen kommt nur vor, wenn die Antwort Nein lautet. Am Anfang steht das Lesen des Gerätenamens." },
      { id: "reihenfolge", label: "Den Gerätenamen lesen.", feedback: "Richtig. Die Reihenfolge auf dem Zettel gilt: zuerst den Gerätenamen lesen, danach den Bildschirm prüfen." }
    ] },
    { id: "q2", prompt: "Was ist die Entscheidung auf dem Zettel?", correct: "entscheidung", options: [
      { id: "entscheidung", label: "Ob der Bildschirm gesperrt ist.", feedback: "Richtig. Die Entscheidung ist eine Frage mit Ja oder Nein: Ist der Bildschirm gesperrt? Davon hängt der nächste Schritt ab." },
      { id: "name", label: "Welchen Gerätenamen Samira heute am schönsten findet, bevor sie weiterliest.", feedback: "Der Gerätename wird nur gelesen, nicht gewählt. Die Entscheidung hängt davon ab, ob der Bildschirm gesperrt ist." },
      { id: "zeit", label: "Ob Samira den Zettel lieber heute oder erst morgen weitergibt, wenn mehr Zeit bleibt.", feedback: "Der Zettel nennt keine Zeitwahl. Entschieden wird nur danach, ob der Bildschirm gesperrt ist." }
    ] },
    { id: "q3", prompt: "Was gilt, wenn die Antwort Ja ist?", correct: "stoppen", options: [
      { id: "entsperren", label: "Samira entsperrt den Bildschirm selbst und macht danach mit dem Zettel weiter.", feedback: "Bei Ja gilt Stopp. Samira ändert nichts und entsperrt nichts, auch nicht, um schneller fertig zu werden." },
      { id: "stoppen", label: "Samira stoppt und ändert nichts.", feedback: "Richtig. Bei Ja endet der Ablauf für Samira. Sie stoppt und ändert nichts am Gerät." },
      { id: "weiterlesen", label: "Samira liest den Gerätenamen noch einmal und prüft dann ein zweites Mal weiter.", feedback: "Bei Ja wird nicht weitergeprüft. Der Zettel verlangt, dass Samira stoppt und nichts ändert." }
    ] },
    { id: "q4", prompt: "Was gilt, wenn etwas unklar bleibt?", correct: "nachfragen", options: [
      { id: "raten", label: "Sie rät, welcher Schritt gemeint ist, und gibt den Zettel trotzdem schon an die Kollegen weiter.", feedback: "Raten ist keine gute Grundlage. Bei Unklarheit fragt Samira zuerst nach, bevor der Zettel weitergeht." },
      { id: "ergaenzen", label: "Sie ergänzt den Zettel mit eigenen Schritten, damit nichts Unklares mehr darauf steht, und gibt ihn weiter.", feedback: "Eigene Schritte ändern den Zettel, ohne dass jemand zugestimmt hat. Samira fragt lieber nach." },
      { id: "nachfragen", label: "Sie fragt die ausbildende Person, bevor sie den Zettel weitergibt.", feedback: "Richtig. Bei Unklarheit wird zuerst nachgefragt. Erst danach gibt Samira den Zettel weiter." }
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
  g.LF5_ABLAUF = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!g.document) return;
  var d = g.document, s = { answers: {}, checked: false, finish: false, step: "start" };
  function $(id) { return d.getElementById(id); }
  function load() { try { var x = JSON.parse(g.localStorage.getItem(KEY) || "null"); if (x) s = x; } catch (e) { /* Speicher kann gesperrt sein. */ } }
  function save() { try { g.localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* Lektion bleibt ohne Speicherung bedienbar. */ } if (g.LERNFORTSCHRITT) g.LERNFORTSCHRITT.benachrichtigen(); }
  function update() { $("bar").style.width = barWidth(s) + "%"; $("pct").textContent = progressText(s); }
  function go(id, fromHistory) {
    if (STEPS.indexOf(id) < 0) id = "start";
    STEPS.forEach(function (x) { $(x).hidden = x !== id; });
    d.querySelectorAll("[data-step]").forEach(function (b) { if (b.dataset.step === id) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current"); });
    s.step = id;
    if (!fromHistory && g.history && g.history.pushState) g.history.pushState({ lf5Step: id }, "", "");
    if (id === "finish" && !s.finish) { s.finish = true; save(); $("done").textContent = s.checked && evaluate(s.answers).allCorrect ? "Lektion abgeschlossen. Du kannst sie jederzeit wiederholen." : "Du kannst den Zettel noch einmal ansehen und die Übung später bearbeiten."; }
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
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast Reihenfolge und Entscheidung auf dem Zettel richtig gelesen." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
  }
  function check() {
    s.answers = {};
    Q.forEach(function (q) { var input = d.querySelector('input[name="' + q.id + '"]:checked'); if (input) s.answers[q.id] = input.value; });
    s.checked = true; render(); save(); update();
  }
  function reset() {
    s = { answers: {}, checked: false, finish: false, step: s.step || "start" }; d.querySelectorAll('#questions input[type="radio"]').forEach(function (input) { input.checked = false; }); hide();
    Q.forEach(function (q) { $("fb-" + q.id).hidden = true; $("fb-" + q.id).textContent = ""; }); $("done").textContent = ""; save(); update();
  }
  d.querySelectorAll("[data-step]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.step); }); });
  d.querySelectorAll("[data-next]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.next); }); });
  if (g.addEventListener) g.addEventListener("popstate", function (event) {
    var back = event && event.state ? event.state.lf5Step : "start";
    go(back, true);
  });
  $("check").addEventListener("click", check); $("reset").addEventListener("click", reset);
  $("reset-all").addEventListener("click", function () { if (g.confirm("Gespeicherten Lernfortschritt dieser Lektion zurücksetzen?")) { reset(); go("start"); } });
  load(); build();
  if (STEPS.indexOf(s.step) < 0) s.step = "start";
  Q.forEach(function (q) { var option = q.options.find(function (o) { return o.id === s.answers[q.id]; }); if (option) { var input = d.querySelector('input[name="' + q.id + '"][value="' + option.id + '"]'); if (input) input.checked = true; } });
  if (s.checked) render();
  go(s.step, true);
  if (g.history && g.history.replaceState) g.history.replaceState({ lf5Step: s.step }, "", "");
})(typeof window !== "undefined" ? window : globalThis);
