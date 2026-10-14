/* LF2.4 – Technische Daten lesen. Vollständig fiktive Vergleichsdaten, keine echten Produkte, Preise oder Marken. */
(function (g) {
  "use strict";
  var ID = "lf2-technische-daten";
  var KEY = "it-ausbildung.lf2-technische-daten.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", correct: "erweiterbar",
      prompt: "Im Datenblatt von System A (Brisa M5) steht: „Memory: 16 GB, expandable up to 64 GB (1 free slot)“. Was bedeutet das?",
      options: [
        { id: "verbaut", label: "Es sind bereits 64 GB Arbeitsspeicher eingebaut.", feedback: "Eingebaut sind 16 GB. „Up to 64 GB“ nennt nur die Obergrenze, bis zu der man später erweitern könnte." },
        { id: "erweiterbar", label: "Eingebaut sind 16 GB. Der Speicher lässt sich bei einem freien Steckplatz bis auf 64 GB erweitern.", feedback: "Richtig. „Expandable“ heißt erweiterbar, „free slot“ ist ein freier Steckplatz. Die Obergrenze ist kein Lieferumfang." },
        { id: "verloetet", label: "Der Speicher ist fest verlötet und kann nicht erweitert werden.", feedback: "Das wäre die Aussage „not expandable“ wie bei System B. Bei System A steht das Gegenteil." }
      ] },
    { id: "q2", correct: "brisa",
      prompt: "Pflichtkriterien des Empfangsplatzes: mindestens zwei Bildschirmanschlüsse und mindestens 16 GB Arbeitsspeicher. Welches System erfüllt beide?",
      options: [
        { id: "kern", label: "System B (Kern T7), weil es mit 180 W die höchste Spitzenleistung nennt.", feedback: "Die Leistungsaufnahme ist keine Leistungsfähigkeit und gehört nicht zu den Pflichtkriterien. System B hat nur 1 Bildschirmanschluss und 8 GB." },
        { id: "keines", label: "Keines der beiden Systeme.", feedback: "System A nennt 3 Videoausgänge und 16 GB Speicher und erfüllt damit beide Pflichtkriterien." },
        { id: "brisa", label: "System A (Brisa M5): 3 Videoausgänge und 16 GB. System B verfehlt beide Kriterien.", feedback: "Richtig. System B hat nur 1 × HDMI und 8 GB und scheidet bei den Pflichtkriterien aus." }
      ] },
    { id: "q3", correct: "typisch",
      prompt: "Du willst den Stromverbrauch im normalen Büroalltag vergleichen. Welche Angabe im Datenblatt ist dafür am besten geeignet?",
      options: [
        { id: "typisch", label: "Die Angabe „typical office load“: 28 W bei System A, 45 W bei System B.", feedback: "Richtig. Die typische Last beschreibt den Alltag am nächsten. Annahmen wie Nutzungsdauer nennst du beim späteren Energievergleich offen." },
        { id: "peak", label: "Die Angabe „peak“: 95 W bzw. 180 W.", feedback: "Der Spitzenwert tritt nur kurz auf. Er ist wichtig für die Auslegung des Netzteils, nicht für den normalen Verbrauch." },
        { id: "idle", label: "Die Angabe „idle“: 9 W bzw. 15 W.", feedback: "„Idle“ ist der Leerlauf. Im Büroalltag arbeitet das Gerät aber meist mit Last, daher bildet dieser Wert den Alltag nicht ab." }
      ] },
    { id: "q4", correct: "einsenden",
      prompt: "System A nennt „Warranty: 24 months, return to depot“. Was folgt daraus für den Alltag?",
      options: [
        { id: "vorort", label: "Bei einem Defekt kommt innerhalb von 24 Monaten ein Techniker an den Arbeitsplatz.", feedback: "Das wäre „on-site service“ (wie bei System B). „Return to depot“ bedeutet etwas anderes." },
        { id: "einsenden", label: "24 Monate Garantie. Im Garantiefall muss das Gerät zur Reparatur eingeschickt werden.", feedback: "Richtig. „Return to depot“ heißt Rückgabe an eine Servicestelle. Der Arbeitsplatz fällt dabei zeitweise aus, das gehört in die Abwägung." },
        { id: "ersatz", label: "Das Gerät wird nach 24 Monaten kostenlos durch ein neues ersetzt.", feedback: "Eine Garantiezeit sagt nicht, dass ein Ersatzgerät folgt. Sie beschreibt, wie lange der Hersteller Mängel behebt." }
      ] }
  ];

  function evaluate(a) {
    a = a || {};
    var r = Q.map(function (q) {
      var o = q.options.find(function (x) { return x.id === a[q.id]; });
      return { id: q.id, status: !o ? "empty" : o.id === q.correct ? "correct" : "wrong", optionId: o ? o.id : "", feedback: o ? o.feedback : "" };
    });
    return {
      results: r,
      correct: r.filter(function (x) { return x.status === "correct"; }).length,
      wrong: r.filter(function (x) { return x.status === "wrong"; }).length,
      empty: r.filter(function (x) { return x.status === "empty"; }).length,
      allCorrect: r.every(function (x) { return x.status === "correct"; })
    };
  }

  function progress(s) {
    s = s || {};
    return Math.round(((s.checked ? evaluate(s.answers).correct : 0) + (s.finish ? 1 : 0)) / (Q.length + 1) * 100);
  }

  function progressText(s) {
    s = s || {};
    var done = (s.checked ? evaluate(s.answers).correct : 0) + (s.finish ? 1 : 0);
    return "Fortschritt: " + done + " von " + (Q.length + 1) + " Schritten \u00b7 Abschluss " + (s.finish ? "ge\u00f6ffnet" : "noch nicht ge\u00f6ffnet");
  }

  var api = { ID: ID, KEY: KEY, STEPS: STEPS, QUESTIONS: Q, evaluate: evaluate, progress: progress, progressText: progressText };
  g.LF2_TECHNISCHE_DATEN = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!g.document) return;

  var d = g.document;
  var s = { answers: {}, checked: false, finish: false };
  var EMPTY = "Noch nicht beantwortet. Wähle eine Antwort und prüfe erneut.";
  function $(id) { return d.getElementById(id); }
  function load() { try { var x = JSON.parse(g.localStorage.getItem(KEY) || "null"); if (x) s = x; } catch (e) {} }
  function save() { try { g.localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  function update() {
    var n = progress(s);
    $("bar").style.width = n + "%";
    $("pct").textContent = progressText(s);
  }
  function go(id) {
    STEPS.forEach(function (x) { $(x).hidden = x !== id; });
    d.querySelectorAll("[data-step]").forEach(function (b) {
      if (b.dataset.step === id) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current");
    });
    if (id === "finish") {
      s.finish = true; save();
      $("done").textContent = s.checked && evaluate(s.answers).allCorrect
        ? "Lektion abgeschlossen. Du kannst sie jederzeit wiederholen."
        : "Du kannst die Datenblätter erneut ansehen und die Übung später bearbeiten.";
    }
    update();
    $("main").focus();
    g.scrollTo(0, 0);
  }
  function clearFeedback() {
    var b = $("result");
    b.hidden = true; b.textContent = "";
    Q.forEach(function (q) { var fb = $("fb-" + q.id); fb.hidden = true; fb.textContent = ""; });
  }
  function build() {
    Q.forEach(function (q, i) {
      var f = d.createElement("fieldset"), l = d.createElement("legend"), group = d.createElement("div"), fb = d.createElement("p");
      f.className = "question";
      l.textContent = (i + 1) + ". " + q.prompt;
      f.appendChild(l);
      group.className = "opts";
      q.options.forEach(function (o) {
        var label = d.createElement("label"), input = d.createElement("input"), span = d.createElement("span");
        input.type = "radio"; input.name = q.id; input.value = o.id;
        span.textContent = o.label;
        label.className = "opt";
        label.append(input, span);
        input.addEventListener("change", function () { s.answers[q.id] = o.id; s.checked = false; clearFeedback(); save(); update(); });
        group.appendChild(label);
      });
      f.appendChild(group);
      fb.id = "fb-" + q.id; fb.hidden = true; fb.setAttribute("aria-live", "polite");
      f.appendChild(fb);
      $("questions").appendChild(f);
    });
  }
  function render() {
    var ev = evaluate(s.answers), box = $("result"), h = d.createElement("h3");
    box.textContent = "";
    h.textContent = ev.allCorrect ? "Alle Antworten richtig" : ev.correct ? "Teilweise richtig" : ev.empty === Q.length ? "Noch keine Antwort gewählt" : "Noch nicht richtig";
    box.appendChild(h);
    ev.results.forEach(function (r, i) {
      var q = Q[i], o = q.options.find(function (x) { return x.id === r.optionId; }), p = d.createElement("p");
      p.textContent = (r.status === "correct" ? "✓ Richtig: " : r.status === "wrong" ? "✗ Noch nicht richtig: " : "○ Nicht beantwortet: ") +
        "Aufgabe " + (i + 1) + " – " + q.prompt + " " + (o ? "Deine Antwort: " + o.label + " " : "") + (o ? o.feedback : EMPTY);
      box.appendChild(p);
      var fb = $("fb-" + q.id);
      fb.textContent = o ? o.feedback : EMPTY;
      fb.hidden = false;
    });
    var p = d.createElement("p");
    p.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast die Datenblattangaben sicher ausgewertet." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck.";
    box.appendChild(p);
    box.hidden = false;
  }
  function check() {
    s.answers = {};
    Q.forEach(function (q) { var i = d.querySelector('input[name="' + q.id + '"]:checked'); if (i) s.answers[q.id] = i.value; });
    s.checked = true; render(); save(); update();
  }
  function reset() {
    s = { answers: {}, checked: false, finish: false };
    d.querySelectorAll('#questions input[type="radio"]').forEach(function (i) { i.checked = false; });
    clearFeedback();
    $("done").textContent = "";
    save(); update();
  }

  d.querySelectorAll("[data-step]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.step); }); });
  d.querySelectorAll("[data-next]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.next); }); });
  $("check").addEventListener("click", check);
  $("reset").addEventListener("click", reset);
  $("reset-all").addEventListener("click", function () {
    if (g.confirm("Gespeicherten Lernfortschritt dieser Lektion zurücksetzen?")) { reset(); go("start"); }
  });
  load();
  build();
  Q.forEach(function (q) {
    var o = q.options.find(function (x) { return x.id === s.answers[q.id]; });
    if (o) { var i = d.querySelector('input[name="' + q.id + '"][value="' + o.id + '"]'); if (i) i.checked = true; }
  });
  if (s.checked) render();
  update();
})(typeof window !== "undefined" ? window : globalThis);
