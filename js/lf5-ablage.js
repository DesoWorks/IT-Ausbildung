/* Lernfeld 5: Daten in einer fiktiven Datei ablegen und über den Namen wiederfinden. */
(function (g) {
  "use strict";
  var ID = "lf5-ablage";
  var KEY = "it-ausbildung.lf5-ablage.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Woran findet Samira die Datei wieder?", correct: "name", options: [
      { id: "gefuehl", label: "An ihrem Gefühl, wo sie die Datei ungefähr abgelegt haben könnte, ohne den Namen zu prüfen.", feedback: "Gefühl ersetzt keinen Namen. Samira findet die Datei an dem vereinbarten Namen geraetekarten.txt." },
      { id: "inhalt", label: "Am Inhalt, den sie dazu erst in jeder Datei des Ordners öffnen und durchsuchen muss.", feedback: "Den Inhalt zu durchsuchen ist der umständliche Weg. Der vereinbarte Dateiname führt direkt zur Datei." },
      { id: "name", label: "Am vereinbarten Dateinamen.", feedback: "Richtig. Ein vereinbarter Name macht die Datei wiederauffindbar. Hier lautet er geraetekarten.txt." }
    ] },
    { id: "q2", prompt: "Was steht in der Datei?", correct: "inhalt", options: [
      { id: "inhalt", label: "Nur der Gerätename Mira-01.", feedback: "Richtig. In der Übungsdatei steht nur der Gerätename Mira-01, sonst nichts." },
      { id: "kunden", label: "Der Gerätename Mira-01 und dazu eine Liste aller zwölf Kunden des Betriebs.", feedback: "Die Datei enthält nur den Gerätenamen Mira-01. Kundenlisten gehören nicht hinein." },
      { id: "notiz", label: "Eine kurze Notiz von Samira, was sie gestern erledigt hat, und der Gerätename Mira-01.", feedback: "Notizen stehen nicht in der Datei. Der Inhalt ist nur der Gerätename Mira-01." }
    ] },
    { id: "q3", prompt: "Was tut Samira nicht?", correct: "nichtloeschen", options: [
      { id: "ablesen", label: "Sie liest den Dateinamen geraetekarten.txt genau ab und prüft die Schreibweise vor dem Ablegen.", feedback: "Den Dateinamen ablesen ist richtig und gehört zu dem, was Samira tut. Gefragt ist, was sie nicht tut." },
      { id: "nichtloeschen", label: "Sie löscht die Datei nicht, um zu sehen, ob sie fehlt.", feedback: "Richtig. Eine Datei wird nicht gelöscht, nur um etwas auszuprobieren. Sie könnte danach wirklich fehlen." },
      { id: "ablegen", label: "Sie legt die Datei im fiktiven Ordner Uebung-Nordlicht ab und merkt sich den vereinbarten Ordner.", feedback: "Das Ablegen im Ordner gehört zur Übung. Nicht tut sie das Löschen, um etwas auszuprobieren." }
    ] },
    { id: "q4", prompt: "Was tut Samira, wenn der Name unklar ist?", correct: "nachfragen", options: [
      { id: "zweite", label: "Sie legt zur Sicherheit eine zweite Datei mit einem selbst gewählten Namen an und hofft, dass es passt.", feedback: "Eine zweite Datei verwirrt mehr, als sie hilft. Bei unklarem Namen fragt Samira zuerst nach." },
      { id: "umbenennen", label: "Sie benennt die vorhandene Datei einfach um, bis der Name für sie selbst gut genug aussieht.", feedback: "Umbenennen auf Verdacht macht die Datei schwerer auffindbar. Samira fragt lieber nach dem vereinbarten Namen." },
      { id: "nachfragen", label: "Sie fragt die ausbildende Person, bevor sie eine zweite Datei anlegt.", feedback: "Richtig. Bei unklarem Namen wird zuerst nachgefragt. Eine zweite Datei legt Samira nicht auf Verdacht an." }
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
  g.LF5_ABLAGE = api;
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
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast die Ablage im fiktiven Ordner richtig verstanden." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
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
