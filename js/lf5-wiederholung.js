/* Lernfeld 5: Eine Wiederholung an drei fiktiven Gerätekarten erkennen. */
(function (g) {
  "use strict";
  var ID = "lf5-wiederholung";
  var KEY = "it-ausbildung.lf5-wiederholung.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Was wiederholt sich auf dem Zettel?", correct: "gleiche", options: [
      { id: "verschieden", label: "Drei verschiedene Prüfungen, jede mit einem eigenen Ziel und einer eigenen Reihenfolge.", feedback: "Der Zettel verlangt nicht drei verschiedene Aufgaben, sondern dieselbe Prüfung bei jeder Karte." },
      { id: "gleiche", label: "Dieselbe Prüfung für jede Karte.", feedback: "Richtig. Eine Wiederholung führt dieselbe Prüfung mehrfach aus, hier einmal für jede Karte." },
      { id: "name", label: "Nur der Gerätename, der auf jeder Karte neu aufgeschrieben und gelesen werden muss.", feedback: "Der Name unterscheidet die Karten, er wiederholt sich nicht. Wiederholt wird die Prüfung." }
    ] },
    { id: "q2", prompt: "Wie oft wird die Prüfung ausgeführt?", correct: "anzahl", options: [
      { id: "einmal", label: "Einmal, weil alle drei Karten zusammen in einem Schritt geprüft werden können.", feedback: "Es gibt drei Karten, also drei Durchgänge. Die Prüfung läuft einmal je Karte." },
      { id: "viermal", label: "Viermal, weil Samira zur Sicherheit noch eine zusätzliche Karte dazuerfindet.", feedback: "Eine vierte Karte steht nicht auf dem Zettel. Samira erfindet keine Karte dazu, es bleibt bei dreimal." },
      { id: "anzahl", label: "Dreimal, einmal je Karte.", feedback: "Richtig. Drei Karten bedeuten drei Durchgänge derselben Prüfung, nacheinander und Karte für Karte." }
    ] },
    { id: "q3", prompt: "Was ist keine Wiederholung?", correct: "nichtmischen", options: [
      { id: "nichtmischen", label: "Drei verschiedene Aufgaben in einen Schritt zu schreiben.", feedback: "Richtig. Eine Wiederholung hat immer dieselbe Aufgabe. Drei verschiedene Aufgaben gehören in drei eigene Schritte." },
      { id: "karteweise", label: "Dieselbe Prüfung nacheinander bei Mira-01, Mira-02 und Mira-03 auszuführen, Karte für Karte.", feedback: "Genau das ist eine Wiederholung: dieselbe Prüfung, Karte für Karte nacheinander." },
      { id: "ende", label: "Nach der dritten Karte aufzuhören, weil der Zettel nur drei Karten nennt und nichts mehr verlangt.", feedback: "Das Ende nach der dritten Karte gehört zur Wiederholung dazu. Sie hat eine feste Anzahl von Durchgängen." }
    ] },
    { id: "q4", prompt: "Was tut Samira bei Unklarheit?", correct: "nachfragen", options: [
      { id: "erfinden", label: "Sie erfindet eine vierte Karte, damit die Anzahl der Durchgänge sicher ausreicht und nichts fehlt.", feedback: "Karten werden nicht erfunden. Bei Unklarheit fragt Samira zuerst nach." },
      { id: "nachfragen", label: "Sie fragt, bevor sie eine vierte Karte erfindet.", feedback: "Richtig. Bei Unklarheit wird nachgefragt. Samira erfindet keine Karte, nur um die Wiederholung zu füllen." },
      { id: "laenger", label: "Sie wiederholt die Prüfung so lange, bis die Unklarheit von selbst verschwunden ist.", feedback: "Mehr Durchgänge klären nichts. Unklarheit wird durch Nachfragen gelöst, nicht durch Wiederholen." }
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
  g.LF5_WIEDERHOLUNG = api;
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
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast die Wiederholung auf dem Zettel richtig erkannt." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
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
