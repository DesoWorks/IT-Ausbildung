/* Lernfeld 3: fiktive DNS-Namensauflösung in einer Übungstabelle lesen. */
(function (g) {
  "use strict";
  var ID = "lf3-dns";
  var KEY = "it-ausbildung.lf3-dns.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Wozu dient DNS in diesem Übungsfall?", correct: "zuordnen", options: [
      { id: "adresse", label: "Es vergibt dem Client automatisch seine IPv4-Adresse.", feedback: "Nein. Die automatische Vergabe von Angaben ist die Aufgabe von DHCP, nicht von DNS." },
      { id: "zuordnen", label: "Es ordnet einem Namen einen Antwortwert zu.", feedback: "Richtig. In der Übungstabelle gehört zu einem Namen ein Antwortwert, hier eine IPv4-Adresse." },
      { id: "kabel", label: "Es ersetzt das Netzwerkkabel zwischen Laptop und Dose.", feedback: "Nein. DNS ist ein Namensdienst, kein Kabel und keine physische Verbindung." }
    ]},
    { id: "q2", prompt: "Welchen Antwortwert nennt die Übungstabelle für wiki.lernnetz.test?", correct: "wert", options: [
      { id: "dns", label: "192.168.10.2", feedback: "Nein. 192.168.10.2 ist der DNS-Server, den die DHCP-Simulation nennt, nicht der Antwortwert für den Namen." },
      { id: "gateway", label: "192.168.10.1", feedback: "Nein. 192.168.10.1 ist das Gateway aus der Client-Anzeige, nicht der Antwortwert für den Namen." },
      { id: "wert", label: "192.168.10.40", feedback: "Richtig. In der Übungstabelle steht für wiki.lernnetz.test der fiktive Antwortwert 192.168.10.40." }
    ]},
    { id: "q3", prompt: "Wer wird in der Simulation nach dem Namen gefragt?", correct: "dnsserver", options: [
      { id: "dnsserver", label: "Der DNS-Server 192.168.10.2.", feedback: "Richtig. Mira-01 fragt in der Simulation den DNS-Server, den die DHCP-Simulation als Angabe geliefert hat." },
      { id: "gateway", label: "Das Gateway 192.168.10.1.", feedback: "Nein. Das Gateway ist der Übergang in andere Netze. Die Namensfrage geht in der Simulation an den DNS-Server." },
      { id: "mira", label: "Der Laptop Mira-01 mit 192.168.10.25.", feedback: "Nein. Mira-01 stellt die Frage, er beantwortet sie nicht. Die Antwort kommt in der Simulation vom DNS-Server." }
    ]},
    { id: "q4", prompt: "Was zeigt die Übungstabelle nicht?", correct: "erreichbar", options: [
      { id: "name", label: "Dass der Name wiki.lernnetz.test einen Antwortwert hat.", feedback: "Doch, genau das zeigt die Tabelle: Zum Namen gehört der fiktive Antwortwert 192.168.10.40." },
      { id: "erreichbar", label: "Dass die Adresse 192.168.10.40 gerade antwortet.", feedback: "Richtig. Eine Zuordnung von Name zu Adresse beweist keine Erreichbarkeit. Ob etwas antwortet, ist eine eigene Beobachtung." },
      { id: "getrennt", label: "Dass Name und Adresse zwei verschiedene Angaben sind.", feedback: "Doch. Der Name wiki.lernnetz.test und die Adresse 192.168.10.40 stehen in der Tabelle als getrennte Angaben." }
    ]}
  ];
  function evaluate(answers) {
    answers = answers || {};
    var results = Q.map(function (q) {
      var option = q.options.find(function (o) { return o.id === answers[q.id]; });
      return { id: q.id, status: !option ? "empty" : (option.id === q.correct ? "correct" : "wrong"), optionId: option ? option.id : "", feedback: option ? option.feedback : "" };
    });
    var correct = results.filter(function (r) { return r.status === "correct"; }).length;
    var empty = results.filter(function (r) { return r.status === "empty"; }).length;
    return { results: results, correct: correct, wrong: results.length - correct - empty, empty: empty, allCorrect: correct === Q.length };
  }
  function progress(s) { s = s || {}; return Math.round(((s.checked ? evaluate(s.answers).correct : 0) + (s.finish ? 1 : 0)) / (Q.length + 1) * 100); }
  function progressText(s) { return "Fortschritt: " + progress(s) + " %"; }
  var api = { ID: ID, KEY: KEY, STEPS: STEPS, QUESTIONS: Q, evaluate: evaluate, progress: progress, progressText: progressText };
  g.LF3_DNS = api;
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
    if (id === "finish") { s.finish = true; save(); $("done").textContent = s.checked && evaluate(s.answers).allCorrect ? "Lektion abgeschlossen. Du kannst sie jederzeit wiederholen." : "Du kannst die Tabelle erneut ansehen und die Übung später bearbeiten."; }
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
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast die Namensauflösung in der Übungstabelle passend gelesen." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
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
