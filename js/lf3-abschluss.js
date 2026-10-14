/* Integrierte Selbstprüfung Lernfeld 3. Alle Szenarien sind fiktiv. */
(function (g) {
  "use strict";
  var ID = "lf3-abschluss";
  var KEY = "it-ausbildung.lf3-abschluss.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", correct: "oktett", prompt: "Die Anzeige von Mira-01 zeigt 192.168.10.25. Was beschreibt diese Angabe?", options: [
      { id: "oktett", label: "Eine IPv4-Adresse aus vier Zahlen, jeweils von 0 bis 255.", feedback: "Richtig. Genau so ist eine IPv4-Adresse aufgebaut. Die Anzeige allein sagt noch nicht, ob die Adresse passt." },
      { id: "name", label: "Einen Rechnernamen, den der Namensdienst in eine Adresse übersetzt.", feedback: "Nein. 192.168.10.25 ist eine Adresse. Ein Name wäre zum Beispiel wiki.lernnetz.test." },
      { id: "maske", label: "Eine Netzmaske, die Netzanteil und Geräteanteil trennt.", feedback: "Nein. Eine Netzmaske sähe hier wie 255.255.255.0 aus. Die gezeigte Angabe ist die Adresse selbst." }
    ]},
    { id: "q2", correct: "passt", prompt: "Die Testnetz-Karte nennt 192.168.10.0/24. Die Anzeige zeigt 192.168.10.25 und die Maske 255.255.255.0. Was folgt daraus?", options: [
      { id: "fremd", label: "Die Adresse liegt in einem anderen Netz, weil die Maske vier Zahlen hat.", feedback: "Nein. 255.255.255.0 ist genau die Maske zu /24. Die ersten drei Zahlen stimmen mit der Karte überein." },
      { id: "gateway", label: "Die Adresse ist das Gateway, weil sie auf 25 endet.", feedback: "Nein. Das Gateway der Karte ist 192.168.10.1. Die Endung 25 macht die Adresse nicht zum Gateway." },
      { id: "passt", label: "Adresse und Maske passen: 192.168.10 ist das Netz, 25 das Gerät.", feedback: "Richtig. Bei /24 gehören die ersten drei Zahlen zum Netz und die letzte zum Gerät." }
    ]},
    { id: "q3", correct: "dienst", prompt: "Im Ablaufbild vergibt ein Dienst die Adresse, die Maske, das Gateway und den Namensserver. Was beschreibt das?", options: [
      { id: "dienst", label: "Eine vereinfachte, fiktive DHCP-Vergabe, keine echte Konfiguration.", feedback: "Richtig. DHCP kann genau diese Angaben automatisch vergeben. Die Seite zeigt nur eine Simulation." },
      { id: "hand", label: "Eine feste, von Hand eingetragene Konfiguration, die sich nie ändert.", feedback: "Nein. Von Hand eintragen ist der andere Weg. Hier vergibt ein Dienst die Angaben." },
      { id: "name", label: "Eine Namensauflösung, die aus einem Namen eine Adresse macht.", feedback: "Nein. Eine Namensauflösung ordnet einem Namen einen Wert zu. Sie vergibt keine Maske und kein Gateway." }
    ]},
    { id: "q4", correct: "zuordnung", prompt: "Die Übungstabelle ordnet wiki.lernnetz.test dem Wert 192.168.10.40 zu. Was darfst du daraus schließen?", options: [
      { id: "erreichbar", label: "Die Adresse ist erreichbar, sonst stünde sie nicht in der Tabelle.", feedback: "Nein. Eine Zuordnung in einer Übungstabelle beweist keine Erreichbarkeit." },
      { id: "zuordnung", label: "Nur, dass die Tabelle diesem Namen diesen Antwortwert zuordnet.", feedback: "Richtig. Die Tabelle zeigt eine Zuordnung. Ob die Adresse erreichbar ist, sagt sie nicht." },
      { id: "oeffentlich", label: "Der Name ist eine öffentliche Adresse im Internet und darf so verwendet werden.", feedback: "Nein. wiki.lernnetz.test ist ein erfundener Übungsname. Die Lektion nutzt keine öffentliche Domain." }
    ]},
    { id: "q5", correct: "naechste", prompt: "Mira-01 meldet „kein Netzwerk“. Die Anzeige zeigt eine Adresse, der Namensaufruf liefert keine Antwort. Was ist der nächste sinnvolle Schritt?", options: [
      { id: "ursache", label: "Sofort festhalten, dass der Namensdienst die Ursache ist.", feedback: "Nein. Das wäre eine Vermutung. Sie muss als Vermutung erkennbar bleiben, nicht als Ursache." },
      { id: "naechste", label: "Die nächste Beobachtung wählen und sie von der Vermutung trennen.", feedback: "Richtig. Zuerst kommt die nächste prüfbare Beobachtung. Die Ursache bleibt offen, bis sie geprüft ist." },
      { id: "echt", label: "Die Anzeige an einem echten Gerät nachstellen und die Konfiguration ändern.", feedback: "Nein. Die Übung arbeitet nur mit vorgegebenen, fiktiven Angaben. Nichts wird an einem Gerät geändert." }
    ]},
    { id: "q6", correct: "getrennt", prompt: "Du übergibst den Fall. Welche Angabe gehört in das Protokoll?", options: [
      { id: "frist", label: "Eine Zusage, bis wann der Fehler behoben sein wird, und wer ihn übernimmt.", feedback: "Nein. Das Protokoll hält den Stand fest. Es macht keine Zusage über Fristen." },
      { id: "schuld", label: "Ein Hinweis, wer den Fehler verursacht haben soll, damit die Ursache feststeht.", feedback: "Nein. Schuldzuweisungen gehören nicht in das Protokoll. Es hält fest, was beobachtet und getestet wurde." },
      { id: "getrennt", label: "Beobachtung, Schritt, Ergebnis und offene Punkte getrennt.", feedback: "Richtig. So sieht die nächste Person, was beobachtet, was getestet und was noch offen ist." }
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

  function progress(s) {
    s = s || {};
    return Math.round(((s.checked ? evaluate(s.answers).correct : 0) + (s.finish ? 1 : 0)) / (Q.length + 1) * 100);
  }

  function progressText(s) {
    s = s || {};
    var done = (s.checked ? evaluate(s.answers).correct : 0) + (s.finish ? 1 : 0);
    return "Fortschritt: " + done + " von " + (Q.length + 1) + " Schritten · Abschluss " + (s.finish ? "geöffnet" : "noch nicht geöffnet");
  }

  var api = { ID: ID, KEY: KEY, STEPS: STEPS, QUESTIONS: Q, evaluate: evaluate, progress: progress, progressText: progressText };
  g.LF3_ABSCHLUSS = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!g.document) return;

  var d = g.document, s = { answers: {}, checked: false, finish: false };
  var EMPTY = "Noch nicht beantwortet. Wähle eine Antwort und prüfe erneut.";
  function $(id) { return d.getElementById(id); }
  function load() { try { var x = JSON.parse(g.localStorage.getItem(KEY) || "null"); if (x) s = x; } catch (e) { /* Speicher kann gesperrt sein. */ } }
  function save() { try { g.localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* Lektion bleibt ohne Speicherung bedienbar. */ } if (g.LERNFORTSCHRITT) g.LERNFORTSCHRITT.benachrichtigen(); }
  function update() { var n = progress(s); $("bar").style.width = n + "%"; $("pct").textContent = progressText(s); }
  function go(id) {
    STEPS.forEach(function (x) { $(x).hidden = x !== id; });
    d.querySelectorAll("[data-step]").forEach(function (b) { if (b.dataset.step === id) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current"); });
    if (id === "finish") {
      s.finish = true; save();
      $("done").textContent = s.checked && evaluate(s.answers).allCorrect ? "Selbstprüfung abgeschlossen. Du kannst sie jederzeit wiederholen." : "Du kannst die Lektionen erneut ansehen und die Selbstprüfung später fortsetzen.";
    }
    update(); $("main").focus(); g.scrollTo(0, 0);
  }
  function clear() { var b = $("result"); b.hidden = true; b.textContent = ""; Q.forEach(function (q) { var f = $("fb-" + q.id); if (f) { f.hidden = true; f.textContent = ""; } }); }
  function build() {
    Q.forEach(function (q, index) {
      var field = d.createElement("fieldset"), legend = d.createElement("legend"), group = d.createElement("div"), feedback = d.createElement("p");
      field.className = "question"; legend.textContent = (index + 1) + ". " + q.prompt; field.appendChild(legend); group.className = "opts";
      q.options.forEach(function (o) {
        var label = d.createElement("label"), input = d.createElement("input"), span = d.createElement("span");
        input.type = "radio"; input.name = q.id; input.value = o.id; span.textContent = o.label; label.className = "opt"; label.append(input, span);
        input.addEventListener("change", function () { s.answers[q.id] = o.id; s.checked = false; clear(); save(); update(); });
        group.appendChild(label);
      });
      field.appendChild(group); feedback.id = "fb-" + q.id; feedback.hidden = true; feedback.setAttribute("aria-live", "polite"); field.appendChild(feedback); $("questions").appendChild(field);
    });
  }
  function render() {
    var ev = evaluate(s.answers), box = $("result"), heading = d.createElement("h3");
    box.textContent = "";
    heading.textContent = ev.allCorrect ? "Alle Antworten richtig" : ev.correct ? "Teilweise richtig" : ev.empty === Q.length ? "Noch keine Antwort gewählt" : "Noch nicht richtig";
    box.appendChild(heading);
    ev.results.forEach(function (r, index) {
      var q = Q[index], option = q.options.find(function (x) { return x.id === r.optionId; }), p = d.createElement("p");
      p.textContent = (r.status === "correct" ? "✓ Richtig: " : r.status === "wrong" ? "✗ Noch nicht richtig: " : "○ Nicht beantwortet: ") + "Aufgabe " + (index + 1) + " – " + q.prompt + " " + (option ? "Deine Antwort: " + option.label + " " : "") + (option ? option.feedback : EMPTY);
      box.appendChild(p);
      var fb = $("fb-" + q.id); fb.textContent = option ? option.feedback : EMPTY; fb.hidden = false;
    });
    var summary = d.createElement("p");
    summary.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast Adresse, Zuordnung, Beobachtung und Protokoll schlüssig verbunden." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck.";
    box.appendChild(summary); box.hidden = false;
  }
  function check() {
    s.answers = {};
    Q.forEach(function (q) { var input = d.querySelector('input[name="' + q.id + '"]:checked'); if (input) s.answers[q.id] = input.value; });
    s.checked = true; render(); save(); update();
  }
  function reset() { s = { answers: {}, checked: false, finish: false }; d.querySelectorAll('#questions input[type="radio"]').forEach(function (i) { i.checked = false; }); clear(); $("done").textContent = ""; save(); update(); }
  d.querySelectorAll("[data-step]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.step); }); });
  d.querySelectorAll("[data-next]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.next); }); });
  $("check").addEventListener("click", check);
  $("reset").addEventListener("click", reset);
  $("reset-all").addEventListener("click", function () { if (g.confirm("Gespeicherten Lernfortschritt dieser Lektion zurücksetzen?")) { reset(); go("start"); } });
  load(); build();
  Q.forEach(function (q) { var option = q.options.find(function (x) { return x.id === s.answers[q.id]; }); if (option) { var input = d.querySelector('input[name="' + q.id + '"][value="' + option.id + '"]'); if (input) input.checked = true; } });
  if (s.checked) render();
  update();
})(typeof window !== "undefined" ? window : globalThis);
