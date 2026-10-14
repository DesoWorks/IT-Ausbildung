/* LF2.9 – Beschaffung und Wareneingang planen. Vollständig fiktiver, nicht ausgeführter Ablauf. Keine echte Bestellung, keine Rechtsaussagen. */
(function (g) {
  "use strict";
  var ID = "lf2-beschaffung";
  var KEY = "it-ausbildung.lf2-beschaffung.v1";
  var STEPS = ["start", "case", "order", "receipt", "exercise", "finish"];

  // Fiktive Wochentage für die Lieferzeitrechnung: Werktage sind hier Montag bis Freitag, Feiertage werden ignoriert.
  var DAYS = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];

  // Fiktiver Wareneingang: bestellt, laut Lieferschein, tatsächlich im Karton, sichtbar beschädigt.
  var RECEIPT = [
    { id: "rechner", label: "Arbeitsplatzrechner Terra Modular", ordered: 3, note: 3, received: 3, damaged: 0 },
    { id: "bildschirm", label: "Bildschirm", ordered: 3, note: 3, received: 3, damaged: 1 },
    { id: "filter", label: "Blickschutzfilter", ordered: 3, note: 3, received: 2, damaged: 0 },
    { id: "tastatur", label: "Tastatur und Maus", ordered: 3, note: 3, received: 3, damaged: 0 }
  ];

  // Liefertag nach n Werktagen ab einem Starttag (Index 0 = Montag bis 4 = Freitag). Das Wochenende wird übersprungen.
  function deliveryDay(startIndex, workdays) {
    var idx = startIndex, wraps = 0, i;
    for (i = 0; i < workdays; i++) {
      idx += 1;
      if (idx === 5) { idx = 0; wraps += 1; }
    }
    return { index: idx, day: DAYS[idx], nextWeek: wraps > 0, weeks: wraps };
  }

  // Abweichungen: Menge laut Lieferschein oder Bestellung ungleich der gelieferten Menge, oder sichtbarer Schaden.
  function deviations() {
    var out = [];
    RECEIPT.forEach(function (r) {
      if (r.received !== r.ordered || r.received !== r.note) out.push({ id: r.id, kind: "menge", diff: r.received - r.ordered });
      if (r.damaged > 0) out.push({ id: r.id, kind: "schaden", count: r.damaged });
    });
    return out;
  }

  var Q = [
    { id: "q1", correct: "ablegen",
      prompt: "Die Praxis am Park schreibt (fiktive Nachricht): „Wir nehmen Ihr Angebot an.“ Was tust du als Nächstes im Ablauf?",
      options: [
        { id: "sofort", label: "Sofort alle Waren beim Lieferanten bestellen, damit keine Zeit verloren geht und die Lieferung früher kommt.", feedback: "Zu früh. Vor der Bestellung kommt noch die interne Freigabe. Erst wenn eine zuständige Person Positionen, Mengen und Preise geprüft hat, wird bestellt." },
        { id: "ablegen", label: "Die Nachricht mit Datum und Bezug ablegen und die Bestellung vorbereiten, noch nicht abschicken.", feedback: "Richtig. Die Annahme wird nachvollziehbar festgehalten: wer, wann, auf welches Angebot. Danach wird die Bestellung vorbereitet und zur Freigabe vorgelegt." },
        { id: "merken", label: "Nichts ablegen. Alle im Team wissen ja, dass die Praxis zugesagt hat, das genügt als Beleg.", feedback: "Gemeinsames Wissen im Kopf reicht nicht. Wenn später jemand nachfragt, braucht das Team einen Beleg mit Datum und Bezug zum Angebot." }
      ] },
    { id: "q2", correct: "abgleich",
      prompt: "Die Bestellung ist vorbereitet: je 3 Rechner, Bildschirme, Filter und Tastatur-Maus-Sets. Was prüft die Freigabe durch die Teamleitung (fiktiv: Frau Brandt)?",
      options: [
        { id: "sympathie", label: "Ob der Lieferant im Vergleich einen guten Eindruck gemacht hat.", feedback: "Das kann beim Vergleich eine Rolle gespielt haben. Die Freigabe prüft aber die Bestellung selbst, nicht die Sympathie." },
        { id: "nurpreis", label: "Nur, ob der Gesamtpreis der Bestellung niedrig genug aussieht.", feedback: "Der Preis ist wichtig, aber nicht allein. Auch Mengen, Typen und Lieferzeit müssen stimmen, sonst wird das Falsche günstig bestellt." },
        { id: "abgleich", label: "Ob Positionen, Mengen und Preise zu Angebot und Budget passen.", feedback: "Richtig. Die Freigabe ist ein zweiter Blick vor dem Abschicken. Sie vergleicht die Bestellung mit dem Angebot und dem vorgegebenen Budget." }
      ] },
    { id: "q3", correct: "mittwoch",
      prompt: "Die Bestellung wird am Mittwoch abgeschickt (Tag 0, fiktiv). Laut Auftragsbestätigung beträgt die Lieferzeit 5 Werktage. Werktage sind hier Montag bis Freitag, Feiertage werden ignoriert. Wann ist die Lieferung zugesagt?",
      options: [
        { id: "mittwoch", label: "Mittwoch der nächsten Woche", feedback: "Richtig. Donnerstag ist Werktag 1, Freitag 2, Montag 3, Dienstag 4, Mittwoch 5. Das Wochenende zählt nicht mit." },
        { id: "montag", label: "Montag der nächsten Woche", feedback: "Hier wurden fünf Kalendertage gezählt, also auch Samstag und Sonntag. Die Lieferzeit ist aber in Werktagen angegeben. Montag wäre erst Werktag 3." },
        { id: "donnerstag", label: "Donnerstag der nächsten Woche", feedback: "Das ist ein Tag zu spät. Der Bestelltag selbst zählt nicht mit, das Zählen beginnt am Tag danach, und der fünfte Werktag ist der Mittwoch." }
      ] },
    { id: "q4", correct: "fehlt",
      prompt: "Wareneingang: Bestellung und Lieferschein nennen je 3 Blickschutzfilter. Im Karton liegen 2. Was stellst du fest?",
      options: [
        { id: "passt", label: "Alles in Ordnung, der Lieferschein stimmt ja mit der Bestellung überein.", feedback: "Das stimmt, reicht aber nicht. Beim Wareneingang wird auch der echte Inhalt gezählt. Bestellung und Lieferschein stimmen überein, der Karton nicht." },
        { id: "fehlt", label: "Es fehlt 1 Filter: Bestellung und Lieferschein nennen 3, geliefert wurden 2.", feedback: "Richtig. Du vergleichst drei Dinge: Bestellung, Lieferschein und Inhalt. Die Abweichung ist eine Fehlmenge von 1 Filter und wird dokumentiert." },
        { id: "lieferschein", label: "Der Fehler liegt sicher beim Lieferschein, deshalb ist nichts weiter zu tun.", feedback: "Das ist eine ungeprüfte Vermutung. Woran es liegt, weißt du nicht. Festgestellt ist nur: 3 bestellt, 3 laut Lieferschein, 2 im Karton." }
      ] },
    { id: "q5", correct: "sachlich",
      prompt: "Ein Bildschirm hat einen Kratzer am Gehäuse. Welcher Eintrag im Mängelbericht ist sachlich und brauchbar?",
      options: [
        { id: "vorwurf", label: "Der Lieferant hat wieder schlampig gepackt. Der Bildschirm ist Schrott, bitte sofort Ersatz oder Geld zurück.", feedback: "Das ist eine Wertung und eine Forderung, keine Beschreibung. Ein Mängelbericht hält fest, was zu sehen ist, und überlässt Entscheidungen der zuständigen Person." },
        { id: "defekt", label: "Bildschirm 2 ist defekt, das Gehäuse ist beschädigt und der Bildschirm muss ausgetauscht werden.", feedback: "Ob der Bildschirm defekt ist, weißt du nicht, sichtbar ist ein Kratzer. Außerdem fehlen Ort, Zeitpunkt und Beleg. Der Austausch ist eine Entscheidung für später." },
        { id: "sachlich", label: "Bildschirm 2 von 3, SN-F-0452 (fiktiv): Kratzer, etwa 8 cm, rechter Gehäuserand, beim Auspacken entdeckt, Foto 1.", feedback: "Richtig. Der Eintrag nennt, was genau, wo, wann und mit welchem Beleg. Er enthält keine Schuldzuweisung und keine Forderung." }
      ] },
    { id: "q6", correct: "melden",
      prompt: "Der Mängelbericht ist fertig. Was passiert als Nächstes?",
      options: [
        { id: "melden", label: "Den Bericht an die Teamleitung geben und die betroffene Ware getrennt, unverändert aufbewahren.", feedback: "Richtig. Die zuständige Person entscheidet, wie es weitergeht. Die Ware bleibt unverändert, damit der Zustand nachvollziehbar bleibt." },
        { id: "selbst", label: "Selbst beim Lieferanten Forderungen stellen und Fristen setzen, damit es schneller geht.", feedback: "Das gehört nicht in deine Rolle. Welche Schritte möglich und sinnvoll sind, hängt von Regeln ab, die hier nicht behandelt werden. Das entscheidet die zuständige Person im Betrieb." },
        { id: "verschweigen", label: "Den Bildschirm trotzdem einbauen und den Kratzer nicht erwähnen, damit es keinen Ärger gibt.", feedback: "Verschweigen ist keine Lösung. Wird der Mangel erst später entdeckt, ist unklar, wann und wodurch er entstanden ist. Zeitnah melden schützt alle Beteiligten." }
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

  var api = { ID: ID, KEY: KEY, STEPS: STEPS, DAYS: DAYS, RECEIPT: RECEIPT, QUESTIONS: Q, deliveryDay: deliveryDay, deviations: deviations, evaluate: evaluate, progress: progress, progressText: progressText };
  g.LF2_BESCHAFFUNG = api;
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
        : "Du kannst den Ablauf erneut ansehen und die Übung später bearbeiten.";
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
    p.textContent = ev.empty ? ev.empty + " Aufgabe(n) sind unbeantwortet." : ev.allCorrect ? "Du hast den fiktiven Ablauf von der Annahme bis zum Mängelbericht nachvollziehbar dokumentiert." : "Lies die Erklärungen und versuche es erneut. Kein Zeitdruck.";
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
