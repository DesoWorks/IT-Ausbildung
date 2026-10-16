/* Lernfeld 5: Anweisung und Daten an einem fiktiven Ablaufzettel unterscheiden. */
(function (g) {
  "use strict";
  var ID = "lf5-anweisung";
  var KEY = "it-ausbildung.lf5-anweisung.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Was ist auf dem Zettel die Anweisung?", correct: "anweisung", options: [
      { id: "zahl", label: "Die Zahl 12, weil sie als Erstes auf dem Zettel steht und deshalb alles Weitere bestimmt.", feedback: "Die Zahl 12 ist ein Wert auf dem Zettel. Sie sagt nicht, was getan werden soll, und ist deshalb keine Anweisung." },
      { id: "anweisung", label: "Der Satz „Zeige die Zahl.“", feedback: "Richtig. „Zeige die Zahl.“ sagt, was getan werden soll. Das ist die Anweisung auf dem Zettel." },
      { id: "kopf", label: "Die Überschrift „Ablaufzettel“, weil sie dem Zettel seinen Namen gibt und ganz oben steht.", feedback: "Eine Überschrift benennt den Zettel, sagt aber nicht, was zu tun ist. Die Anweisung ist der Satz „Zeige die Zahl.“" }
    ] },
    { id: "q2", prompt: "Was sind auf dem Zettel die Daten?", correct: "daten", options: [
      { id: "befehl", label: "Der Satz „Zeige die Zahl.“, weil er sagt, was mit dem Zettel geschehen soll und was dort steht.", feedback: "Der Satz „Zeige die Zahl.“ ist die Anweisung, nicht die Daten. Die Daten sind der Wert, mit dem die Anweisung arbeitet." },
      { id: "name", label: "Der Name Samira, weil er unten auf der Übungskarte als Absender vermerkt ist.", feedback: "Der Name gehört zur Übungskarte, nicht zu dem, womit die Anweisung arbeitet. Die Daten sind hier die Zahl 12." },
      { id: "daten", label: "Die Zahl 12 auf dem Zettel.", feedback: "Richtig. Die Zahl 12 ist der Wert, mit dem die Anweisung arbeitet. Das sind hier die Daten." }
    ] },
    { id: "q3", prompt: "Was vermischt Anweisung und Daten?", correct: "nichtmischen", options: [
      { id: "nichtmischen", label: "Die Zahl als Befehl zu lesen.", feedback: "Richtig. Wer die Zahl 12 als Befehl liest, behandelt Daten wie eine Anweisung. Beides muss getrennt bleiben." },
      { id: "trennen", label: "Die Zahl 12 und die Anweisung getrennt zu lesen und jeweils einzeln einzuordnen.", feedback: "Getrennt zu lesen vermischt nichts, im Gegenteil: So bleiben Anweisung und Daten auseinander." },
      { id: "abschreiben", label: "Den Zettel sauber abzuschreiben und dabei die Zahl 12 unverändert zu lassen.", feedback: "Abschreiben mit unveränderter Zahl vermischt nichts. Die Zahl bleibt ein Wert, die Anweisung bleibt eine Anweisung." }
    ] },
    { id: "q4", prompt: "Was tut Samira bei Unklarheit?", correct: "nachfragen", options: [
      { id: "raten", label: "Sie rät, was gemeint ist, und gibt den Zettel sofort als Arbeitsanweisung an die Gruppe weiter.", feedback: "Raten kann die Gruppe in die falsche Richtung schicken. Bei Unklarheit wird zuerst nachgefragt." },
      { id: "nachfragen", label: "Sie fragt die ausbildende Person, bevor sie den Zettel als Arbeitsanweisung weitergibt.", feedback: "Richtig. Bei Unklarheit fragt Samira nach, bevor etwas weitergegeben wird. So entsteht kein vermeidbarer Fehler." },
      { id: "aendern", label: "Sie ändert die Zahl 12 auf dem Zettel nach eigenem Gefühl, damit alles besser passt.", feedback: "Daten auf dem Zettel nach Gefühl zu ändern verfälscht ihn. Samira fragt nach, statt etwas zurechtzurücken." }
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
  g.LF5_ANWEISUNG = api;
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
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast Anweisung und Daten auf dem Zettel sauber getrennt." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
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
