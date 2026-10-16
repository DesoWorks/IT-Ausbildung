/* Lernfeld 3: fiktive IPv4-Konfiguration eines Clients lesen und mit einer Testnetz-Karte vergleichen. */
(function (g) {
  "use strict";
  var ID = "lf3-ipv4-konfiguration";
  var KEY = "it-ausbildung.lf3-ipv4-konfiguration.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Welche Angabe ist in der Client-Anzeige von Mira-01 die IPv4-Adresse?", correct: "adresse", options: [
      { id: "maske", label: "255.255.255.0", feedback: "Das ist die Netzmaske. Sie sagt, welcher Teil der Adresse zum Netz gehört, und ist nicht die Adresse des Clients." },
      { id: "adresse", label: "192.168.10.25", feedback: "Richtig. Das ist die IPv4-Adresse des Clients Mira-01 in diesem fiktiven Beispiel." },
      { id: "gateway", label: "192.168.10.1", feedback: "Das ist die Gateway-Angabe, also der Übergang in andere Netze, nicht die Adresse des Clients selbst." }
    ] },
    { id: "q2", prompt: "Was sagt die Angabe „/24“ hinter der Adresse aus?", correct: "praefix", options: [
      { id: "geraete", label: "Im Netz gibt es genau 24 Geräte, die gleichzeitig Verbindungen aufbauen dürfen.", feedback: "Nein. Die Zahl nach dem Schrägstrich zählt Bits, keine Geräte." },
      { id: "oktett", label: "Die Adresse hat 24 Oktette, von denen die ersten drei zum Netz gehören.", feedback: "Nein. Eine IPv4-Adresse hat vier Oktette. Die 24 zählt Bits des Netzanteils." },
      { id: "praefix", label: "Die ersten 24 Bit sind der Netzanteil (255.255.255.0).", feedback: "Richtig. /24 ist die Präfixlänge und bedeutet dasselbe wie die Netzmaske 255.255.255.0." }
    ] },
    { id: "q3", prompt: "Welche Angabe ist in der Anzeige das Gateway?", correct: "gateway", options: [
      { id: "gateway", label: "192.168.10.1 – die Adresse, über die Verbindungen in andere Netze laufen.", feedback: "Richtig. In dieser Anzeige ist 192.168.10.1 als Gateway angegeben. Hier wird sie nur gelesen, nicht eingerichtet." },
      { id: "adresse", label: "192.168.10.25", feedback: "Das ist die Adresse von Mira-01 selbst, nicht die Gateway-Angabe." },
      { id: "praefix", label: "/24", feedback: "Das ist die Präfixlänge. Sie beschreibt die Größe des Netzanteils, nicht das Gateway." }
    ] },
    { id: "q4", prompt: "Die Testnetz-Karte nennt das Netz 192.168.10.0/24. Wie passt die Anzeige von Mira-01 dazu?", correct: "passt", options: [
      { id: "praefix", label: "Gar nicht, weil die Adresse mit .25 endet und das Netz mit .0.", feedback: "Nein. Die letzte Zahl gehört zum Geräteanteil und darf sich vom Netz 192.168.10.0 unterscheiden." },
      { id: "netz", label: "Nur die Maske stimmt, die Adresse liegt aber im Nachbarnetz 192.168.11.0/24.", feedback: "Nein. Die ersten drei Oktette 192.168.10 stimmen überein, die Adresse liegt im Netz der Karte." },
      { id: "passt", label: "Sie passt: gleiche ersten drei Oktette, gleicher Präfix /24.", feedback: "Richtig. 192.168.10.25/24 liegt im Netz 192.168.10.0/24 der Testnetz-Karte." }
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
  function doneSteps(s) { s = s || {}; return (s.checked ? evaluate(s.answers).correct : 0) + (s.finish ? 1 : 0); }
  function progress(s) { return Math.round(doneSteps(s) / (Q.length + 1) * 100); }
  function progressText(s) {
    s = s || {};
    return "Fortschritt: " + progress(s) + " %";
  }
  var api = { ID: ID, KEY: KEY, STEPS: STEPS, QUESTIONS: Q, evaluate: evaluate, progress: progress, progressText: progressText };
  g.LF3_IPV4_KONFIGURATION = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!g.document) return;
  var d = g.document, s = { answers: {}, checked: false, finish: false };
  function $(id) { return d.getElementById(id); }
  function load() { try { var x = JSON.parse(g.localStorage.getItem(KEY) || "null"); if (x) s = x; } catch (e) { /* Speicher kann gesperrt sein. */ } }
  function save() { try { g.localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* Lektion bleibt ohne Speicherung bedienbar. */ } if (g.LERNFORTSCHRITT) g.LERNFORTSCHRITT.benachrichtigen(); }
  function update() { $("bar").style.width = progress(s) + "%"; $("pct").textContent = progressText(s); }
  function go(id) {
    STEPS.forEach(function (x) { $(x).hidden = x !== id; });
    d.querySelectorAll("[data-step]").forEach(function (b) { if (b.dataset.step === id) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current"); });
    if (id === "finish") { s.finish = true; save(); $("done").textContent = s.checked && evaluate(s.answers).allCorrect ? "Lektion abgeschlossen. Du kannst sie jederzeit wiederholen." : "Du kannst die Anzeige erneut ansehen und die Übung später bearbeiten."; }
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
      var q = Q[index], option = q.options.find(function (x) { return x.id === r.optionId; }), p = d.createElement("p"), fb = $("fb-" + q.id);
      p.textContent = (r.status === "correct" ? "✓ Richtig: " : r.status === "wrong" ? "✗ Noch nicht richtig: " : "○ Nicht beantwortet: ") + "Aufgabe " + (index + 1) + " – " + q.prompt + " " + (option ? "Deine Antwort: " + option.label + " " : "") + (option ? option.feedback : "Noch nicht beantwortet. Wähle eine Antwort und prüfe erneut."); box.appendChild(p);
      fb.textContent = option ? option.feedback : "Noch nicht beantwortet. Wähle eine Antwort und prüfe erneut."; fb.hidden = false;
    });
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast die Client-Anzeige passend gelesen." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
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
