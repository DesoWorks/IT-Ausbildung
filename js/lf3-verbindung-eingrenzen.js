/* Lernfeld 3: vorgegebene Beobachtungen zu einer fiktiven Verbindung ordnen und eingrenzen. */
(function (g) {
  "use strict";
  var ID = "lf3-verbindung-eingrenzen";
  var KEY = "it-ausbildung.lf3-verbindung-eingrenzen.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", prompt: "Was zeigt die Simulation für Mira-01 bereits?", correct: "adresse", options: [
      { id: "nurname", label: "Der Name wiki.lernnetz.test antwortet, die Testadresse 192.168.10.40 nicht.", feedback: "Nein. Es ist umgekehrt: Die Testadresse antwortet, der Name liefert in der Simulation keine Antwort." },
      { id: "adresse", label: "Die Testadresse 192.168.10.40 antwortet, der Name wiki.lernnetz.test nicht.", feedback: "Richtig. Genau das steht in der Beobachtungsliste: Die Adresse antwortet, der Name liefert keine Antwort." },
      { id: "keins", label: "Weder die Testadresse 192.168.10.40 noch der Name wiki.lernnetz.test antworten.", feedback: "Nein. Die Testadresse antwortet in der Simulation. Nur beim Namen fehlt die Antwort." }
    ]},
    { id: "q2", prompt: "Warum sind Namensauflösung und IP-Erreichbarkeit verschiedene Beobachtungen?", correct: "getrennt", options: [
      { id: "gleich", label: "Sie sind dasselbe: Wenn der Name keine Antwort liefert, ist auch die Adresse nicht erreichbar.", feedback: "Nein. Hier antwortet die Adresse, obwohl der Name keine Antwort liefert. Die beiden Beobachtungen können sich unterscheiden." },
      { id: "kabel", label: "Die Namensauflösung hängt nur vom Netzwerkkabel ab, die Erreichbarkeit nur vom Namen.", feedback: "Nein. So lässt sich das nicht trennen. Entscheidend ist: Die Zuordnung eines Namens ist eine andere Beobachtung als die Antwort einer Adresse." },
      { id: "getrennt", label: "Die Zuordnung von Name zu Antwortwert ist etwas anderes als eine Antwort der Adresse.", feedback: "Richtig. Ob ein Name einen Antwortwert bekommt und ob eine Adresse antwortet, sind zwei getrennte Beobachtungen." }
    ]},
    { id: "q3", prompt: "Welche Beobachtung ist in dieser Übung als Nächstes sinnvoll?", correct: "tabelle", options: [
      { id: "tabelle", label: "Nachsehen, welchen Antwortwert die Übungstabelle dem Namen zuordnet.", feedback: "Richtig. Das verändert nichts und passt zur Lage: Die Adresse antwortet, nur der Name nicht. Der Rückbezug auf die DNS-Lektion liegt nahe." },
      { id: "kabel", label: "Sofort das Netzwerkkabel tauschen, weil der Name nicht antwortet.", feedback: "Nein. Die Adresse antwortet ja. Ein Kabeltausch ist ein Eingriff und passt nicht zu dem, was die Beobachtungen zeigen." },
      { id: "firewall", label: "Annehmen, dass die Firewall schuld ist, und den Fall damit abschließen.", feedback: "Nein. Das ist eine pauschale Vermutung ohne Beobachtung. Erst die vorhandenen Angaben prüfen, dann weiter eingrenzen." }
    ]},
    { id: "q4", prompt: "Was gehört nicht zu dieser Übung?", correct: "echt", options: [
      { id: "ordnen", label: "Eine vorgegebene Beobachtungsliste lesen und in eine Reihenfolge bringen.", feedback: "Doch, das gehört dazu. Genau das übst du hier: Beobachtungen lesen und ordnen." },
      { id: "echt", label: "Befehle an echte Geräte senden oder pauschal die Firewall beschuldigen.", feedback: "Richtig. Die Übung bleibt bei fiktiven Beobachtungen. Befehle an echte Geräte und pauschale Schuldzuweisungen gehören nicht dazu." },
      { id: "trennen", label: "Name und Adresse als getrennte Beobachtungen auseinanderhalten.", feedback: "Doch, das gehört dazu. Name und Adresse zu trennen ist der Kern dieser Lektion." }
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
  g.LF3_VERBINDUNG_EINGRENZEN = api;
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
    if (id === "finish") { s.finish = true; save(); $("done").textContent = s.checked && evaluate(s.answers).allCorrect ? "Lektion abgeschlossen. Du kannst sie jederzeit wiederholen." : "Du kannst die Beobachtungen erneut ansehen und die Übung später bearbeiten."; }
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
    var summary = d.createElement("p"); summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast die Beobachtungen passend geordnet und die nächste sinnvolle Beobachtung gewählt." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck."; box.appendChild(summary); box.hidden = false;
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
