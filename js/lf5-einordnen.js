/* Lernfeld 5: Daten vor dem Speichern einordnen (Herkunft, Art, Schutz, Speicherbedarf) an einer fiktiven Karte. */
(function (g) {
  "use strict";
  var ID = "lf5-einordnen";
  var KEY = "it-ausbildung.lf5-einordnen.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Woher kommt die Angabe Mira-01?", correct: "herkunft", options: [
      { id: "kunde", label: "Von einer Kundin, die den Namen am Telefon durchgegeben hat und deshalb für die Ablage verantwortlich ist.", feedback: "Auf der Übungskarte steht kein Kundenkontakt. Die Angabe kommt von der ausbildenden Person." },
      { id: "herkunft", label: "Von der ausbildenden Person.", feedback: "Richtig. Die ausbildende Person hat den Gerätenamen genannt. Wer die Quelle ist, gehört zur Einordnung vor dem Speichern." },
      { id: "internet", label: "Aus dem Internet, weil Gerätenamen dort öffentlich gesammelt werden und Samira ihn einfach übernimmt.", feedback: "Samira übernimmt nichts aus dem Internet. Auf der Karte steht, dass die ausbildende Person den Namen genannt hat." }
    ] },
    { id: "q2", prompt: "Welche Art ist der Gerätename?", correct: "text", options: [
      { id: "text", label: "Ein Text, keine ganze Zahl.", feedback: "Richtig. Ein Name besteht aus Zeichen und ist Text, auch wenn er Ziffern enthält. Er wird nicht gerechnet." },
      { id: "zahl", label: "Eine ganze Zahl, weil im Namen die Ziffern 01 vorkommen und man damit zählen kann.", feedback: "Ziffern im Namen machen ihn nicht zur Zahl. Mira-01 wird nicht gezählt oder gerechnet, er bleibt Text." },
      { id: "janein", label: "Ein Ja/Nein-Wert, weil die Angabe entweder vorhanden ist oder nicht vorhanden ist.", feedback: "Ein Ja/Nein-Wert hat nur zwei mögliche Antworten. Der Name Mira-01 ist dagegen frei gewählter Text." }
    ] },
    { id: "q3", prompt: "Was gilt für Datenschutz und Datensicherheit in diesem Beispiel?", correct: "schutz", options: [
      { id: "personen", label: "Der Name ist personenbezogen, weil jeder Gerätename automatisch eine Person verrät und besonders geschützt werden muss.", feedback: "Mira-01 benennt ein Übungsgerät und keine Person. Es gibt hier keinen Personenbezug." },
      { id: "frei", label: "Der Name ist völlig frei, weil er ohne Personenbezug an alle weitergegeben werden darf, auch an Fremde.", feedback: "Kein Personenbezug heißt nicht, dass jeder die Angabe bekommt. Sie bleibt im Übungsordner und geht nicht an Fremde." },
      { id: "schutz", label: "Kein Personenbezug, trotzdem nicht an Fremde weitergeben.", feedback: "Richtig. Der Name nennt keine Person, gehört aber trotzdem nur in den Übungsordner und nicht an Fremde." }
    ] },
    { id: "q4", prompt: "Was gilt für den Speicherbedarf?", correct: "speicher", options: [
      { id: "gross", label: "Der Name braucht viel Platz, deshalb muss eine große Datei oder ein eigener Speicher angelegt werden.", feedback: "Mira-01 hat nur wenige Zeichen. Dafür braucht Samira keinen großen Speicher." },
      { id: "speicher", label: "Der Name ist sehr kurz und passt in die kleine Übungsdatei.", feedback: "Richtig. Wenige Zeichen brauchen sehr wenig Platz. Die kleine Übungsdatei reicht für diese Angabe." },
      { id: "unklar", label: "Das lässt sich nicht beurteilen, solange der Name nicht gespeichert und der Platz nicht nachgemessen wurde.", feedback: "Man kann den Bedarf vorher grob einschätzen: Ein sehr kurzer Name braucht sehr wenig Platz." }
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
  g.LF5_EINORDNEN = api;
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
    if (id === "finish" && !s.finish) { s.finish = true; save(); $("done").textContent = s.checked && evaluate(s.answers).allCorrect ? "Lektion abgeschlossen. Du kannst sie jederzeit wiederholen." : "Du kannst die Karte noch einmal ansehen und die Übung später bearbeiten."; }
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
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast Herkunft, Art, Schutz und Speicherbedarf der Angabe richtig eingeordnet." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
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
