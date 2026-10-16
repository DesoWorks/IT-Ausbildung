/* Lernfeld 3: fiktive Client-Anbindung anhand einer Verbindungsskizze lesen. */
(function (g) {
  "use strict";
  var ID = "lf3-client-anbindung";
  var KEY = "it-ausbildung.lf3-client-anbindung.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Welches Element ist in der Skizze der Client, der die Verbindung nutzt?", correct: "mira", options: [
      { id: "mira", label: "Der Übungs-Laptop Mira-01.", feedback: "Richtig. Mira-01 ist das Endgerät und damit der Client in diesem Beispiel." },
      { id: "dose", label: "Die Netzwerkdose im Raum.", feedback: "Die Netzwerkdose ist ein Anschluss auf dem Verbindungsweg, aber nicht das Endgerät, das die Verbindung nutzt." },
      { id: "netz", label: "Das fiktive Testnetz Lernnetz.", feedback: "Das Lernnetz ist das Ziel der dargestellten Verbindung, nicht der Client." }
    ] },
    { id: "q2", prompt: "Was verbindet laut Skizze Geräte im lokalen Netz?", correct: "switch", options: [
      { id: "kabel", label: "Das Netzwerkkabel allein.", feedback: "Das Kabel überträgt die Verbindung zwischen Anschlusspunkten. Die Skizze ordnet dem Switch die Verbindung von Geräten im lokalen Netz zu." },
      { id: "switch", label: "Der Switch.", feedback: "Richtig. In dieser vereinfachten Skizze verbindet der Switch Geräte im lokalen Netz." },
      { id: "laptop", label: "Der Laptop Mira-01.", feedback: "Mira-01 nutzt die Verbindung. Die Aufgabe, Geräte im lokalen Netz zu verbinden, ist in der Skizze dem Switch zugeordnet." }
    ] },
    { id: "q3", prompt: "Welche Reihenfolge entspricht dem bereitgestellten Weg vom Client zum Testnetz?", correct: "folge", options: [
      { id: "folge", label: "Mira-01 → Netzwerkkabel → Netzwerkdose → Switch → Lernnetz.", feedback: "Richtig. Das ist die vereinfachte Reihenfolge aus der Übungsskizze." },
      { id: "umkehr", label: "Mira-01 → Lernnetz → Netzwerkdose → Switch.", feedback: "Die Skizze zeigt den Weg über Kabel, Dose und Switch zum Lernnetz; das Netz steht nicht direkt hinter dem Client." },
      { id: "wlan", label: "Mira-01 → WLAN-Zugangsdaten → Lernnetz.", feedback: "Die Skizze zeigt eine kabelgebundene Übungsdarstellung. WLAN-Konfiguration und Zugangsdaten gehören ausdrücklich nicht zu dieser Aufgabe." }
    ] },
    { id: "q4", prompt: "Was bedeutet „Lernnetz“ in dieser Lektion?", correct: "fiktiv", options: [
      { id: "fiktiv", label: "Ein fiktives, isoliertes Testnetz im Übungsfall.", feedback: "Richtig. Das Lernnetz ist ein erfundenes Übungsziel und keine Anleitung zur Verbindung mit einem echten Netz." },
      { id: "betrieb", label: "Das produktive Netz der eigenen Ausbildungsstelle.", feedback: "Nein. Es geht nur um ein fiktives Testnetz. An produktiven Netzen wird nichts eingerichtet oder verändert." },
      { id: "zugang", label: "Ein Hinweis, dass Zugangsdaten eingegeben werden müssen.", feedback: "Nein. Die Übung verlangt keine Zugangsdaten. Solche Daten werden hier weder benötigt noch eingegeben." }
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
  function progress(s) { s = s || {}; return Math.round(((s.checked ? evaluate(s.answers).correct : 0) + (s.finish ? 1 : 0)) / (Q.length + 1) * 100); }
  function progressText(s) {
    s = s || {};
    var done = (s.checked ? evaluate(s.answers).correct : 0) + (s.finish ? 1 : 0);
    return "Fortschritt: " + progress(s) + " %";
  }
  var api = { ID: ID, KEY: KEY, STEPS: STEPS, QUESTIONS: Q, evaluate: evaluate, progress: progress, progressText: progressText };
  g.LF3_CLIENT_ANBINDUNG = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!g.document) return;
  var d = g.document, s = { answers: {}, checked: false, finish: false };
  function $(id) { return d.getElementById(id); }
  function load() { try { var x = JSON.parse(g.localStorage.getItem(KEY) || "null"); if (x) s = x; } catch (e) { /* Speicher kann gesperrt sein. */ } }
  function save() { try { g.localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* Lektion bleibt ohne Speicherung bedienbar. */ } if (g.LERNFORTSCHRITT) g.LERNFORTSCHRITT.benachrichtigen(); }
  function update() { var n = progress(s); $("bar").style.width = n + "%"; $("pct").textContent = progressText(s); }
  function go(id) {
    STEPS.forEach(function (x) { $(x).hidden = x !== id; });
    d.querySelectorAll("[data-step]").forEach(function (b) { if (b.dataset.step === id) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current"); });
    if (id === "finish") { s.finish = true; save(); $("done").textContent = s.checked && evaluate(s.answers).allCorrect ? "Lektion abgeschlossen. Du kannst sie jederzeit wiederholen." : "Du kannst die Skizze erneut ansehen und die Übung später bearbeiten."; }
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
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast die Verbindungsskizze passend gelesen." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
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
