/* LF2.2 – Anforderungen in Kriterien übersetzen. Fiktiver Übungsfall, keine echten Daten. */
(function (g) {
  "use strict";
  var ID = "lf2-kriterien";
  var KEY = "it-ausbildung.lf2-kriterien.v1";
  var STEPS = ["start", "case", "exercise", "finish"];
  var Q = [
    { id: "q1", correct: "pflicht",
      prompt: "Der Arbeitsplatz muss die Terminverwaltung der Praxis ausführen können. Wie stufst du dieses Kriterium ein?",
      options: [
        { id: "wunsch", label: "Wunschkriterium: nett, aber nicht nötig.", feedback: "Ohne die Terminverwaltung kann der Arbeitsplatz seinen Zweck nicht erfüllen. Ein Kriterium, ohne das eine Lösung ausscheidet, ist ein Pflichtkriterium." },
        { id: "pflicht", label: "Pflichtkriterium: Ohne Erfüllung scheidet die Lösung aus.", feedback: "Richtig. Die Eignung für die Hauptaufgabe ist unverzichtbar und deshalb ein Pflichtkriterium." },
        { id: "irrelevant", label: "Kein Kriterium, weil es keine Zahl enthält.", feedback: "Auch eine Ja/Nein-Aussage kann ein Kriterium sein, wenn man sie prüfen kann." }
      ] },
    { id: "q2", correct: "wunsch",
      prompt: "Die Praxismanagerin würde einen besonders leisen Betrieb begrüßen, hat ihn aber nicht zur Bedingung gemacht. Wie gehst du damit um?",
      options: [
        { id: "pflicht", label: "Als Pflichtkriterium festhalten, damit nichts vergessen wird.", feedback: "Zu viele Pflichtkriterien schränken die Auswahl unnötig ein. Was nicht zwingend ist, gehört in die Wünsche." },
        { id: "wunsch", label: "Als Wunschkriterium festhalten, das bei ähnlich guten Lösungen den Ausschlag geben kann.", feedback: "Richtig. Wünsche verbessern die Passung, führen aber nicht zum Ausschluss." },
        { id: "streichen", label: "Weglassen, weil es nicht zwingend ist.", feedback: "Wünsche gehen nicht verloren. Sie werden notiert und helfen später beim Vergleich." }
      ] },
    { id: "q3", correct: "messbar",
      prompt: "Welche Formulierung ist ein überprüfbares Kriterium?",
      options: [
        { id: "guenstig", label: "Der Arbeitsplatz soll möglichst günstig sein.", feedback: "„Möglichst günstig“ lässt offen, ab wann das Kriterium erfüllt ist. Es fehlt ein prüfbarer Wert." },
        { id: "schick", label: "Der Arbeitsplatz soll modern wirken.", feedback: "„Modern“ ist Geschmackssache. Ohne Maßstab lässt sich nicht entscheiden, ob es erfüllt ist." },
        { id: "messbar", label: "Die Gesamtkosten betragen höchstens 1.200 Euro (fiktives Beispielbudget).", feedback: "Richtig. Der Grenzwert macht das Kriterium eindeutig prüfbar." }
      ] },
    { id: "q4", correct: "ausscheiden",
      prompt: "Eine Lösung erfüllt viele Wünsche, aber ein Pflichtkriterium nicht. Was folgt daraus?",
      options: [
        { id: "ausscheiden", label: "Sie scheidet aus, solange das Pflichtkriterium nicht mit der Kundschaft neu geklärt wird.", feedback: "Richtig. Pflichtkriterien sind Ausschlusskriterien. Nur die Kundschaft kann sie ändern." },
        { id: "behalten", label: "Sie bleibt im Rennen, weil so viele Wünsche erfüllt sind.", feedback: "Wunschkriterien gleichen ein verfehltes Pflichtkriterium nicht aus." },
        { id: "doppelt", label: "Die Wünsche zählen doppelt, bis es ausgeglichen ist.", feedback: "Eine solche Gewichtung ändert nichts am Ausschluss. Gewichten gehört erst zum späteren Vergleich." }
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

  var api = { ID: ID, KEY: KEY, STEPS: STEPS, QUESTIONS: Q, evaluate: evaluate, progress: progress };
  g.LF2_KRITERIEN = api;
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
    $("pct").textContent = "Fortschritt: " + n + " %";
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
        : "Du kannst die Kriterienliste erneut ansehen und die Übung später bearbeiten.";
    }
    update();
    $("main").focus();
    g.scrollTo(0, 0);
  }
  function hide() { var b = $("result"); b.hidden = true; b.textContent = ""; }
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
        input.addEventListener("change", function () { s.answers[q.id] = o.id; s.checked = false; hide(); save(); update(); });
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
    p.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast die Kriterien passend eingeordnet." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck.";
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
    hide();
    Q.forEach(function (q) { $("fb-" + q.id).hidden = true; $("fb-" + q.id).textContent = ""; });
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
