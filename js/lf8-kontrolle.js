/* Aufbau nach LF7-Lernzielkontrolle: 24 Fragen, Abgabe sperrt den Versuch.
 * Zurücksetzen nur mit dem Passwort der Lernzielkontrolle. Hier steht nur der SHA-256-Hash. */
(function (g) {
  "use strict";
  var KEY = "it-ausbildung.lf8-kontrolle.v1";
  var HASH = "15fb2a9581621437953d399ad3e4eb44e51c9df2d10c19b9754dba7d432fcd84";
  var FRAGEN = [
    { quelle: "lf8-quellen", text: "Welche Quelle liefert im Beispiel die Tagesumsätze?", optionen: ["Der Tagesexport der Kasse.", "Die Planung der Schichten.", "Die geplante Tagesübersicht."], richtig: "a", hinweis: "Die Kasse liefert den Umsatz. Die Schichten haben einen anderen Inhalt; die Übersicht ist das Ziel." },
    { quelle: "lf8-quellen", text: "Wofür braucht der Auftrag beide Quellen?", optionen: ["Lieferkosten und Umsätze täglich zu einem Gewinn verrechnen.", "Tagesumsatz und geplante Schichten gemeinsam anzeigen.", "Aus dem Personaleinsatz einen Umsatz schätzen, statt die Kasse zu nutzen."], richtig: "b", hinweis: "Gefordert sind belegte Umsätze neben den geplanten Schichten, nicht eine Kostensumme oder Schätzung." },
    { quelle: "lf8-quellen", text: "Was tut Samira zunächst bei der Quellenklärung?", optionen: ["Einen lesenden Kassenzugang einrichten.", "Einen vollständigen Umsatzexport importieren.", "Quelle, Inhalt und Verwendungszweck beschreiben."], richtig: "c", hinweis: "Quellenklärung beschreibt zuerst den Bedarf. Einrichtung und Import sind eigene Umsetzungsschritte." },
    { quelle: "lf8-struktur", text: "Was beschreibt die Struktur der Kassenliste?", optionen: ["Felder wie Datum und Tagesumsatz.", "Die Leseberechtigung der Leitung.", "Kommas und Zeilenumbrüche der Datei."], richtig: "a", hinweis: "Struktur benennt Felder; Berechtigungen betreffen Zugriff, Trennzeichen die Serialisierung." },
    { quelle: "lf8-struktur", text: "Welches Format hat die Kassenquelle?", optionen: ["Ein JSON-Array mit benannten Feldern.", "Eine CSV-Datei mit kommagetrennten Feldern.", "Eine HTML-Tabelle mit Tageszeilen."], richtig: "b", hinweis: "Die Kassenquelle ist CSV. JSON gehört zur Schichtquelle im Labor; HTML wäre eine mögliche Anzeige." },
    { quelle: "lf8-struktur", text: "Was tut Samira bei fehlender Währung?", optionen: ["EUR aus der Rechnersprache des Geräts ableiten und stillschweigend einsetzen.", "Beträge ohne Einheit anzeigen und den Hinweis auf später verschieben.", "Die fehlende Einheit markieren und vor Nutzung klären."], richtig: "c", hinweis: "Die Einheit muss aus belegten Quellen stammen. Rechnersprache oder bloßes Weglassen lösen die Lücke nicht." },
    { quelle: "lf8-recht", text: "Wer ist als Empfänger der Übersicht festgelegt?", optionen: ["Die Caféleitung laut Übersichtsauftrag.", "Das Kassenteam mit technischem Exportzugriff.", "Die Gäste für eine anonymisierte Statistik."], richtig: "a", hinweis: "Die Modellannahme legt die Leitung fest. Technischer Zugriff oder Anonymisierung ändern nicht den Auftrag." },
    { quelle: "lf8-recht", text: "Warum werden Namen im Modell vorsichtig behandelt?", optionen: ["Jede Zeile mit einer Personenzahl ist schon personenbezogen, auch ohne Namen.", "Echte Mitarbeiternamen würden Menschen identifizierbar machen.", "Namensangaben sind nur in Datenbanken, nicht in Tabellen zulässig."], richtig: "b", hinweis: "Identifizierbarkeit ist entscheidend. Die erfundenen Namen werden zum Lernen wie echte behandelt." },
    { quelle: "lf8-recht", text: "Was passiert bei ungeklärter Rechtsgrundlage?", optionen: ["Die Klausel eines ähnlichen Projekts übernehmen und später anpassen.", "Intern mit der Verarbeitung beginnen und erst vor Veröffentlichung prüfen.", "Die betroffene Verarbeitung anhalten und die Grundlage klären."], richtig: "c", hinweis: "Auch interne Verarbeitung benötigt eine geklärte Grundlage. Eine fremde Klausel ist kein Nachweis." },
    { quelle: "lf8-auswahl", text: "Warum wird die Lieferantenliste ausgeschlossen?", optionen: ["Lieferdaten beantworten keine Frage dieses Auftrags.", "Eine dritte Quelle verhindert das Zusammenführen.", "Firmenkontakte dürfen nie als Datenquelle dienen."], richtig: "a", hinweis: "Der fehlende Zweck ist der Grund. Weder Quellenanzahl noch Datenart begründen ein allgemeines Verbot." },
    { quelle: "lf8-auswahl", text: "Wann passt eine Quelle zu diesem Auftrag?", optionen: ["Die benötigten Felder sind vorhanden und die Datei lässt sich öffnen.", "Benötigte Felder, nutzbares Format und erlaubter Zugriff passen.", "Das Format passt, und der Export ist der aktuellste im Ordner."], richtig: "b", hinweis: "Inhalt, technische Nutzbarkeit und erlaubter Zweck müssen gemeinsam geprüft werden, nicht nur zwei Aspekte." },
    { quelle: "lf8-auswahl", text: "Was wird zur abgelehnten Quelle dokumentiert?", optionen: ["Nur ihr Dateiname in der Quellenliste.", "Ein vollständiger Datenexport als Sichtungsbeleg.", "Die Entscheidung mit ihrem fehlenden Bezug zum Auftrag."], richtig: "c", hinweis: "Die begründete Ablehnung bleibt nachvollziehbar. Eine Datenkopie ist dafür nicht nötig." },
    { quelle: "lf8-konzept", text: "Wer ist die Zielgruppe des Papierkonzepts?", optionen: ["Die Caféleitung für eine interne Tagesübersicht.", "Alle Beschäftigten für ihre Schichtauswertung.", "Die Gäste für eine öffentliche Tagesstatistik."], richtig: "a", hinweis: "Die Zielgruppe ist im Auftrag begrenzt. Weitere Empfänger sind nicht automatisch eingeschlossen." },
    { quelle: "lf8-konzept", text: "Welcher Aktualisierungstakt ist vorgesehen?", optionen: ["Nach jedem neuen Kassenumsatz.", "Täglich nach Ende des Geschäftstags.", "Einmalig beim Erstellen der Übersicht."], richtig: "b", hinweis: "Ein Tagesendstand ist vorgesehen. Echtzeit und einmalige Befüllung wären andere Anforderungen." },
    { quelle: "lf8-konzept", text: "Was ist das Papierkonzept noch nicht?", optionen: ["Eine Skizze der vorgesehenen Datenanzeige.", "Eine Beschreibung von Empfängern und Schutzzielen.", "Eine eingerichtete und freigegebene Produktivseite."], richtig: "c", hinweis: "Ein Konzept beschreibt den Sollzustand, ohne Installation oder Betriebsfreigabe nachzuweisen." },
    { quelle: "lf8-aufbereiten", text: "Welche Aufbereitung bewahrt den belegten Wert?", optionen: ["1234,5 EUR als 1.234,50 EUR anzeigen.", "Fehlende Umsätze als 0,00 EUR ausgeben.", "Alle Umsätze auf volle Euro vereinheitlichen."], richtig: "a", hinweis: "Nur die erste Darstellung formatiert denselben Wert. Nullergänzung erfindet Werte, Rundung ändert sie." },
    { quelle: "lf8-aufbereiten", text: "Wie wird ein fehlender Tagesumsatz behandelt?", optionen: ["Vortageswert ohne Zusatz als Ersatz übernehmen.", "Den Tag erhalten und den Umsatz als fehlend markieren.", "Den Tag aus der gemeinsamen Übersicht entfernen."], richtig: "b", hinweis: "Der Tag samt Schichten bleibt erhalten. Fehlend ist weder Null noch ein geschätzter Vortageswert." },
    { quelle: "lf8-aufbereiten", text: "Wie werden mehrere Schichten einem Tagesumsatz zugeordnet?", optionen: ["Den Umsatz bei jeder Schicht wiederholen und später aufsummieren.", "Den Umsatz nur mit der ersten gefundenen Schicht des Datums verbinden.", "Einen Tagesumsatz mit sämtlichen Schichten desselben Datums verbinden."], richtig: "c", hinweis: "Ein Umsatz je Tag vermeidet Mehrfachzählung; sämtliche Schichten müssen verlustfrei erhalten bleiben." },
    { quelle: "lf8-uebergabe", text: "Was ist das Produkt des Konzept-Übergabeschritts?", optionen: ["Der dokumentierte Konzeptstand mit Quellen, Regeln und Lücken.", "Eine Betriebsfreigabe auf Grundlage der gezeichneten Ansicht.", "Eine Einrichtungsvorgabe ohne die noch offenen Quellenfragen."], richtig: "a", hinweis: "Das Konzept wird nachvollziehbar übergeben. Offene Fragen und die Grenze zum Betrieb bleiben sichtbar." },
    { quelle: "lf8-uebergabe", text: "Welche Grenze benennt die Übergabenotiz?", optionen: ["Der Konzeptstand wurde geprüft, also gilt die Übersicht als betriebsbereit.", "Konzept beschrieben, kein Produktivsystem eingerichtet oder freigegeben.", "Ungeklärte Angaben werden erst nach der Übergabe nachgetragen."], richtig: "b", hinweis: "Die Notiz trennt erreichten Konzeptstand, offene Punkte und fehlende produktive Umsetzung/Freigabe." },
    { quelle: "lf8-uebergabe", text: "Wann ist Erledigt für den gesamten Auftrag unpassend?", optionen: ["Solange noch keine öffentliche Tagesseite verfügbar ist.", "Solange die Notiz weniger als eine volle Seite umfasst.", "Solange eine für die Nutzung nötige Angabe ungeklärt ist."], richtig: "c", hinweis: "Abschluss misst sich an den Anforderungen und offenen Angaben, nicht Öffentlichkeit oder Dokumentlänge." },
    { quelle: "lf8-reflexion", text: "Welches Werkzeug genügt für den reinen Skizzenschritt?", optionen: ["Fiktive Beispielzeilen und eine nachvollziehbare Skizze.", "Eine neue Serverdatenbank mit Importautomatik.", "Ein lesendes Kassenkonto für echte Geschäftsdaten."], richtig: "a", hinweis: "Der Skizzenschritt braucht keine echte Infrastruktur. Das zusätzliche Labor übt die Umsetzung getrennt." },
    { quelle: "lf8-reflexion", text: "Woran zeigt sich eine brauchbare Übergabenotiz?", optionen: ["Sie verwendet durchgehend ein einheitliches Layout und dieselbe Schrift.", "Eine zweite Rolle erklärt Quellen, Regeln und Lücken ohne Rückfrage.", "Sie listet alle Dateinamen auf und schließt mit dem Status fertig."], richtig: "b", hinweis: "Inhaltliche Nachvollziehbarkeit ist entscheidend. Layout, Dateinamen und ein Status beweisen sie nicht." },
    { quelle: "lf8-reflexion", text: "Was ist die Selbstreflexion nicht?", optionen: ["Eine Prüfung der Verständlichkeit der Auswahlbegründung.", "Eine Dokumentation offener Angaben und Verbesserungen.", "Eine Freigabeentscheidung für das gesperrte Lernfeld."], richtig: "c", hinweis: "Reflexion verbessert die eigene Arbeit. Die ausdrückliche Freigabeentscheidung bleibt bei Dennis." },
  ];
  function normalize(raw) {
    var s = { answers: {}, finish: false };
    if (!raw || typeof raw !== "object") return s;
    FRAGEN.forEach(function (_, index) { if (raw.answers && ["a", "b", "c"].indexOf(raw.answers[index]) !== -1) s.answers[index] = raw.answers[index]; });
    s.finish = raw.finish === true; return s;
  }
  function evaluate(answers) {
    answers = answers || {};
    var correct = 0, empty = 0;
    FRAGEN.forEach(function (q, index) { if (["a", "b", "c"].indexOf(answers[index]) === -1) empty++; else if (answers[index] === q.richtig) correct++; });
    return { correct: correct, empty: empty, wrong: FRAGEN.length - correct - empty, allCorrect: correct === FRAGEN.length };
  }
  /* Nur die sichtbare Reihenfolge wird gemischt (Fisher-Yates, einmal je Seitenbesuch).
   * Werte, IDs, Speicher und Arrayreihenfolge bleiben unverändert. */
  function mischen(n, rnd) {
    var order = [], i, j, t, r = rnd || (typeof g.LF8_ZUFALL === "function" ? g.LF8_ZUFALL : Math.random);
    for (i = 0; i < n; i++) order.push(i);
    for (i = n - 1; i > 0; i--) { j = Math.min(i, Math.floor(r() * (i + 1))); t = order[i]; order[i] = order[j]; order[j] = t; }
    return order;
  }
  var api = { mischen: mischen, ID: "lf8-kontrolle", KEY: KEY, FRAGEN: FRAGEN, evaluate: evaluate, normalize: normalize };
  g.LF8_KONTROLLE = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!g.document) return;
  var d = g.document, state = normalize();
  var anordnung = FRAGEN.map(function (q) { return mischen(q.optionen.length); });
  function $(id) { return d.getElementById(id); }
  function notify() { if (g.LERNFORTSCHRITT && g.LERNFORTSCHRITT.benachrichtigen) g.LERNFORTSCHRITT.benachrichtigen(); }
  function save() {
    try { g.localStorage.setItem(KEY, JSON.stringify(state)); $("speicher-hinweis").textContent = ""; }
    catch (e) { $("speicher-hinweis").textContent = "Der Stand kann nicht gespeichert werden. Der Versuch bleibt nur für diesen Besuch erhalten."; }
    notify();
  }
  function load() {
    try { state = normalize(JSON.parse(g.localStorage.getItem(KEY) || "null")); }
    catch (e) { $("speicher-hinweis").textContent = "Der gespeicherte Stand ließ sich nicht lesen. Die Kontrolle beginnt ohne diesen Stand."; }
  }
  function render() {
    var host = $("lernziel-fragen"); host.textContent = "";
    FRAGEN.forEach(function (q, index) {
      var field = d.createElement("fieldset"), legend = d.createElement("legend"); field.className = "frage";
      legend.textContent = (index + 1) + ". " + q.text; field.appendChild(legend);
      anordnung[index].forEach(function (pos) {
        var option = q.optionen[pos];
        var label = d.createElement("label"), input = d.createElement("input"), letter = String.fromCharCode(97 + pos);
        label.className = "quiz-option"; input.type = "radio"; input.name = "f" + index; input.value = letter; input.id = "f" + index + letter;
        label.setAttribute("for", input.id); input.checked = state.answers[index] === letter; input.disabled = state.finish;
        input.addEventListener("change", function () { if (!state.finish) { state.answers[index] = letter; save(); statusText(); } });
        label.appendChild(input); label.appendChild(d.createTextNode(" " + option)); field.appendChild(label);
      });
      if (state.finish) { var feedback = d.createElement("p"); feedback.textContent = (state.answers[index] === q.richtig ? "Richtig. " : "Nicht richtig. ") + q.hinweis; field.appendChild(feedback); }
      host.appendChild(field);
    });
    $("lernziel-abgeben").hidden = state.finish; statusText();
  }
  function statusText() {
    var ev = evaluate(state.answers);
    $("lernziel-status").textContent = !state.finish ? ev.empty ? "Noch " + ev.empty + " von 24 Antworten offen." : "Alle 24 Antworten sind gewählt. Noch nicht abgegeben." : ev.allCorrect ? "Bestanden. Alle 24 Antworten sind richtig. Die Kontrolle bleibt gesperrt, bis sie mit dem Passwort zurückgesetzt wird." : ev.correct + " von 24 richtig. Die Kontrolle ist nicht bestanden und bleibt gesperrt. Ein neuer Versuch braucht das Passwort.";
  }
  $("lernziel-form").addEventListener("submit", function (event) {
    event.preventDefault(); if (state.finish) return;
    var missing = FRAGEN.map(function (_, index) { return state.answers[index] ? null : index + 1; }).filter(Boolean);
    if (missing.length) { $("lernziel-status").textContent = "Noch offen: Frage " + missing.join(", ") + "."; $("lernziel-status").focus(); return; }
    state.finish = true; save(); render(); $("lernziel-status").focus();
  });
  function passwortPasst(wort) {
    if (!g.crypto || !g.crypto.subtle || typeof wort !== "string" || wort.length === 0) return Promise.resolve(false);
    return g.crypto.subtle.digest("SHA-256", new TextEncoder().encode(wort)).then(function (digest) {
      var hex = Array.from(new Uint8Array(digest)).map(function (byte) { return byte.toString(16).padStart(2, "0"); }).join("");
      return hex === HASH;
    });
  }
  var dialog = $("reset-dialog");
  var passwort = $("reset-passwort");
  var resetHinweis = $("reset-hinweis");
  var beschaeftigt = false;
  $("lernziel-reset").addEventListener("click", function () {
    if (resetHinweis) resetHinweis.textContent = "";
    if (passwort) passwort.value = "";
    if (dialog && typeof dialog.showModal === "function") dialog.showModal();
    if (passwort) passwort.focus();
  });
  $("reset-abbrechen").addEventListener("click", function () { dialog.close(); });
  $("reset-form").addEventListener("submit", function (event) {
    event.preventDefault();
    if (beschaeftigt) return;
    var wort = passwort ? passwort.value : "";
    beschaeftigt = true;
    passwortPasst(wort).then(function (ok) {
      beschaeftigt = false;
      if (passwort) passwort.value = "";
      if (!ok) {
        if (resetHinweis) resetHinweis.textContent = wort.length === 0 ? "Kein Passwort eingegeben. Der Stand bleibt erhalten." : "Passwort nicht richtig. Der Stand bleibt erhalten.";
        if (passwort) passwort.focus();
        return;
      }
      state = normalize(); save(); render(); dialog.close(); $("lernziel-status").focus();
    }).catch(function () {
      beschaeftigt = false;
      if (resetHinweis) resetHinweis.textContent = "Prüfung nicht möglich. Der Stand bleibt erhalten.";
    });
  });
  g.addEventListener("pageshow", function (event) { if (event.persisted) { load(); render(); } });
  load(); render();
})(typeof window !== "undefined" ? window : globalThis);