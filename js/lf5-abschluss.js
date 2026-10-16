/* Lernfeld 5: Zusammenfassung und unbenotete Abschlussaufgabe an Samiras fiktivem Ablaufzettel. */
(function (g) {
  "use strict";
  var ID = "lf5-abschluss";
  var KEY = "it-ausbildung.lf5-abschluss.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Was ist die Anweisung auf Samiras Ablaufzettel?", correct: "anweisung", options: [
      { id: "zahl", label: "Die Zahl 12, weil sie auf dem Zettel steht und deshalb sagt, was Samira tun soll.", feedback: "Die 12 ist ein Wert, mit dem man zählt. Die Anweisung sagt, was Samira tun soll, und lautet: zeige die Zahl." },
      { id: "name", label: "Der Gerätename Mira-01, weil ein Name auf dem Zettel immer eine Aufgabe beschreibt.", feedback: "Mira-01 ist Text und nennt nur das Gerät. Eine Anweisung beschreibt eine Handlung, hier: zeige die Zahl." },
      { id: "anweisung", label: "Zeige die Zahl.", feedback: "Richtig. Eine Anweisung sagt, was getan werden soll. Auf dem Zettel steht sie als: zeige die Zahl." }
    ] },
    { id: "q2", prompt: "Welcher Wert auf dem Zettel ist die ganze Zahl?", correct: "zahl", options: [
      { id: "zahl", label: "Die 12.", feedback: "Richtig. 12 ist eine ganze Zahl ohne Komma. Man kann damit zählen." },
      { id: "name", label: "Mira-01, weil darin Ziffern vorkommen und man den Namen deshalb zählen kann.", feedback: "Ein Name mit Ziffern bleibt Text. Er wird nicht gezählt, deshalb ist Mira-01 keine ganze Zahl." },
      { id: "janein", label: "Die Entscheidung zum Bildschirm, weil sie als Ergebnis ja liefert und damit eine Menge ist.", feedback: "Ja oder nein sind zwei mögliche Antworten, keine Menge. Die ganze Zahl auf dem Zettel ist die 12." }
    ] },
    { id: "q3", prompt: "Was gilt, wenn der Bildschirm gesperrt ist?", correct: "stoppen", options: [
      { id: "weiter", label: "Samira macht trotzdem weiter und stellt am Gerät schnell selbst etwas um.", feedback: "Bei gesperrtem Bildschirm darf Samira nichts umstellen. Die Entscheidung auf dem Zettel lautet: stoppen." },
      { id: "stoppen", label: "Samira stoppt und ändert nichts.", feedback: "Richtig. Eine Entscheidung wählt je nach Lage den Weg. Ist der Bildschirm gesperrt, stoppt Samira." },
      { id: "neu", label: "Sie legt vorsichtshalber eine neue Datei an und schreibt die Karte dort noch einmal auf.", feedback: "Eine neue Datei löst das nicht. Bei gesperrtem Bildschirm stoppt Samira und ändert nichts." }
    ] },
    { id: "q4", prompt: "Was wiederholt sich auf dem Ablaufzettel?", correct: "gleiche", options: [
      { id: "andere", label: "Jede Karte bekommt eine neue, andere Prüfung, die Samira sich jedes Mal selbst ausdenkt.", feedback: "Bei einer Wiederholung bleibt die Prüfung gleich. Nur die Karte wechselt." },
      { id: "einmal", label: "Die Prüfung wird nur für die erste Karte gemacht und die beiden anderen werden übersprungen.", feedback: "Eine Wiederholung überspringt nichts. Dieselbe Prüfung gilt nacheinander für alle drei Karten." },
      { id: "gleiche", label: "Dieselbe Prüfung für jede der drei Karten.", feedback: "Richtig. Eine Wiederholung führt dieselben Schritte für jede Karte aus, hier für alle drei." }
    ] },
    { id: "q5", prompt: "Woran findet Samira die Datei später wieder?", correct: "name", options: [
      { id: "name", label: "Am vereinbarten Dateinamen geraetekarten.txt.", feedback: "Richtig. Der vereinbarte Dateiname im Ordner Uebung-Nordlicht führt Samira wieder zur Datei." },
      { id: "ordner", label: "Am Ordner Uebung-Nordlicht allein, denn dort liegt immer genau eine Datei, egal wie sie heißt.", feedback: "Der Ordner allein reicht nicht. Erst der vereinbarte Name geraetekarten.txt zeigt, welche Datei gemeint ist." },
      { id: "zahl", label: "An der Zahl 12, weil jede Datei nach der größten Zahl auf dem Zettel benannt wird.", feedback: "Eine Datei trägt den Namen, den man vereinbart hat. Die Zahl 12 ist ein Wert auf dem Zettel, kein Dateiname." }
    ] },
    { id: "q6", prompt: "Was tut Samira, wenn etwas unklar bleibt?", correct: "nachfragen", options: [
      { id: "raten", label: "Sie rät, was gemeint ist, und legt zur Sicherheit gleich eine zweite Datei mit anderem Namen an.", feedback: "Raten führt schnell zu doppelten Dateien. Bleibt etwas unklar, fragt Samira zuerst nach." },
      { id: "nachfragen", label: "Sie fragt die ausbildende Person, bevor sie eine zweite Datei anlegt.", feedback: "Richtig. Nachfragen verhindert Fehler und doppelte Dateien. Erst danach arbeitet Samira weiter." },
      { id: "schweigen", label: "Sie lässt den Zettel liegen und sagt niemandem etwas, bis jemand von selbst danach fragt.", feedback: "Schweigen hilft nicht weiter. Bei Unklarheit geht Samira aktiv auf die ausbildende Person zu." }
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
  g.LF5_ABSCHLUSS = api;
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
    if (id === "finish" && !s.finish) {
      s.finish = true;
      save();
      $("done").textContent = s.checked && evaluate(s.answers).allCorrect ? "Lernfeld 5 ist zusammengefasst. Du kannst die Aufgabe jederzeit wiederholen." : "Du kannst den Zettel noch einmal ansehen und die Aufgabe später bearbeiten.";
    } else if (id === "finish") {
      $("done").textContent = s.checked && evaluate(s.answers).allCorrect ? "Lernfeld 5 ist zusammengefasst. Du kannst die Aufgabe jederzeit wiederholen." : "Du kannst den Zettel noch einmal ansehen und die Aufgabe später bearbeiten.";
    }
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
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast Anweisung, Wert, Entscheidung, Wiederholung und Ablage am Ablaufzettel richtig erkannt." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck, die Aufgabe ist unbenotet."; box.appendChild(summary); box.hidden = false;
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
