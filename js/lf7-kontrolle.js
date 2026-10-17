/* Aufbau nach LF5-Lernzielkontrolle: 24 Fragen, Abgabe sperrt den Versuch.
 * Zurücksetzen nur mit dem Passwort der Lernzielkontrolle. Hier steht nur der SHA-256-Hash. */
(function (g) {
  "use strict";
  var KEY = "it-ausbildung.lf7-kontrolle.v1";
  var HASH = "15fb2a9581621437953d399ad3e4eb44e51c9df2d10c19b9754dba7d432fcd84";
  var FRAGEN = [
    { quelle: "lf7-system", text: "Welche Komponente erfasst im Lernmodell die physische Größe?", optionen: ["Der Temperatursensor.", "Der schriftliche Auftrag, der ohne Erfassung schon den aktuellen Temperaturwert erzeugt.", "Die Überschrift auf der Übersichtsseite, die beim Lesen die Temperatur des Raums misst."], richtig: "a", hinweis: "Der Sensor erfasst die physische Temperatur. Auftrag und Überschrift beschreiben nur den Zusammenhang." },
    { quelle: "lf7-system", text: "Was verbindet das Beispiel zu einem cyber-physischen System?", optionen: ["Nur die Raumbezeichnung im Titel, unabhängig davon, ob Messung oder Wirkung überhaupt vorgesehen sind.", "Messung, digitale Entscheidung und physische Wirkung.", "Allein die Existenz einer Bildschirmseite ohne Bezug zur gemessenen Größe oder zu einer Wirkung."], richtig: "b", hinweis: "Die Temperatur wird erfasst, digital bewertet und über die Leuchte als physische Wirkung ausgegeben." },
    { quelle: "lf7-system", text: "Welche Erweiterung gehört zum vereinbarten fiktiven Auftrag?", optionen: ["Eine automatische Steuerung der echten Gebäudeheizung, obwohl nur ein Leuchthinweis verlangt wurde.", "Der vollständige Umbau der realen Lüftung ohne Abgrenzung gegenüber dem beschriebenen Lernmodell.", "Anzeige und Leuchthinweis oberhalb von 26 °C."], richtig: "c", hinweis: "Der Auftrag bleibt bei Anzeige und Hinweis. Eine echte Gebäudeanlage ist ausdrücklich nicht Bestandteil." },
    { quelle: "lf7-schnittstelle", text: "Welche Angaben erklären Alter und Bedeutung eines Messwerts?", optionen: ["Station, Temperatur mit Einheit und Zeitpunkt.", "Nur die Zahl ohne jede Kennzeichnung, weil ihre Bedeutung für jeden möglichen Empfänger gleich ist.", "Nur der Seitenname und eine beliebige Farbe ohne Messwert, Einheit oder Zeitpunkt der Erfassung."], richtig: "a", hinweis: "Die Station benennt die Quelle, die Einheit die Bedeutung und der Zeitpunkt das Alter des Werts." },
    { quelle: "lf7-schnittstelle", text: "In welchem Takt soll die Steuerung laut Papierplan Daten senden?", optionen: ["In einem beliebigen Takt, der nirgends festgehalten wird und nach jeder Nachricht unbemerkt wechseln darf.", "Alle 60 Sekunden.", "Nur ein einziges Mal beim Entwurf des Plans, danach gelten alle alten Werte dauerhaft als aktuell."], richtig: "b", hinweis: "Der Papierplan sieht alle 60 Sekunden einen Datensatz vor. Das ist keine bereits eingerichtete Verbindung." },
    { quelle: "lf7-schnittstelle", text: "Was regelt ein Nachrichtenprotokoll?", optionen: ["Die Gehäusefarbe von Sender und Empfänger als Ersatz für alle Felder und Einheiten im Datensatz.", "Die Raumtemperatur ohne jeden Sensor, weil eine Austauschregel automatisch eine Messung vornimmt.", "Den Austausch von Nachrichten."], richtig: "c", hinweis: "Ein Protokoll regelt Nachrichten. Beide Seiten müssen es unterstützen und die Datenfelder verstehen." },
    { quelle: "lf7-fluesse", text: "Welcher Fluss betreibt Sensor, Steuerung und Leuchte?", optionen: ["Der Energiefluss der Versorgung.", "Ein Transport der gesamten Raumluft durch die Übersichtsseite, obwohl kein Ventilator vorhanden ist.", "Die reine Bedeutung einer Temperaturzahl, die jede Versorgung der Komponenten überflüssig macht."], richtig: "a", hinweis: "Die Versorgung liefert Energie. Die Bedeutung der Messdaten ist davon als Informationsfluss zu trennen." },
    { quelle: "lf7-fluesse", text: "Welche Aussage zum Stofffluss bleibt beim tatsächlichen Modell?", optionen: ["Die Temperaturzahl transportiert die gesamte Raumluft zur Übersichtsseite, auch ohne Pumpe oder Ventilator.", "Kein angetriebener Stofftransport vorgesehen.", "Die Hinweisleuchte enthält laut Plan eine Wasserpumpe, obwohl diese in keiner Komponente genannt wird."], richtig: "b", hinweis: "Die Station misst und gibt Licht aus. Sie treibt keinen Stofftransport durch einen Ventilator oder eine Pumpe an." },
    { quelle: "lf7-fluesse", text: "Wie sind Energie und Information auf derselben Verbindung zu betrachten?", optionen: ["Eine der beiden Wirkungen verschweigen, weil eine Verbindung nie mehr als eine Betrachtung zulassen darf.", "Beide ohne Begründung als Raumluftstrom beschreiben, auch wenn keine Materie transportiert wird.", "Als getrennt beschreibbare Flüsse."], richtig: "c", hinweis: "Eine Verbindung kann mehrere Flüsse tragen. Energieversorgung und Informationsübertragung bleiben unterscheidbar." },
    { quelle: "lf7-auswahl", text: "Welche Angabe reicht allein nicht für eine geeignete Versorgung?", optionen: ["Ein äußerlich passender Stecker.", "Dokumentierte passende Spannung und Stromart sowie eine ausreichend belegte Strombelastbarkeit.", "Ein vollständiger Vergleich der Versorgung mit dem erwarteten Leistungsbedarf aller Komponenten samt Reserve."], richtig: "a", hinweis: "Ein passender Stecker beweist keine elektrische Eignung. Spannung, Stromart und Belastbarkeit müssen passen." },
    { quelle: "lf7-auswahl", text: "Was ist eine Bibliothek in diesem Zusammenhang?", optionen: ["Ein Gehäuseteil, das unabhängig von Softwareversionen jede Komponente elektrisch anschließt.", "Wiederverwendbarer Programmcode.", "Die Bezeichnung für die Raumluft, die bei jeder Nachricht zum Empfänger transportiert werden muss."], richtig: "b", hinweis: "Eine Bibliothek ist wiederverwendbarer Code. Ihre dokumentierte Passung zur Steuerung muss geprüft werden." },
    { quelle: "lf7-auswahl", text: "Was muss beim vorgesehenen Nachrichtenaustausch zueinander passen?", optionen: ["Nur die Farbe der Geräte, denn gemeinsame Funktechnik übersetzt sämtliche Formate automatisch.", "Nur der Werbename, während Feldnamen und Einheiten auf beiden Seiten beliebig bleiben können.", "Protokoll und Datenformat beider Seiten."], richtig: "c", hinweis: "Gemeinsame Übertragungstechnik allein genügt nicht. Protokoll, Felder und Einheiten müssen verständlich sein." },
    { quelle: "lf7-unterlage", text: "Welche Aussage zur Genauigkeit ist aus Stand A belegt?", optionen: ["Sie ist nicht angegeben.", "Sie beträgt sicher ±0,1 °C, weil jede Auflösung gleichzeitig die mögliche Messabweichung angibt.", "Sie ist fehlerfrei, weil ein Messbereich von 0 bis 50 °C automatisch jede Abweichung ausschließt."], richtig: "a", hinweis: "Im fiktiven Auszug fehlt die Genauigkeit. Weder Bereich noch Auflösung erlauben diese Angabe zu erfinden." },
    { quelle: "lf7-unterlage", text: "Welche Anforderung deckt der genannte Bereich 0 bis 50 °C ab?", optionen: ["Jede beliebige Temperatur ohne obere oder untere Grenze und ohne weitere technische Bedingung.", "Den geforderten Bereich 15 bis 35 °C.", "Automatisch alle Genauigkeitsanforderungen, selbst wenn keine Genauigkeit dokumentiert wurde."], richtig: "b", hinweis: "15 bis 35 °C liegen innerhalb des Messbereichs. Die gesonderte Genauigkeitsfrage bleibt dabei offen." },
    { quelle: "lf7-unterlage", text: "Was gehört in Samiras Ergänzung zur technischen Notiz?", optionen: ["Eine erfundene Genauigkeitszahl ohne Hinweis auf die Lücke, damit der Auszug vollständig erscheint.", "Eine Bestätigung aller Eigenschaften ohne Quelle, Stand oder Rückfrage an eine verantwortliche Person.", "Quelle, Stand, Bearbeiterin und offene Frage."], richtig: "c", hinweis: "Die Ergänzung bleibt nachvollziehbar. Die Originalangabe und die noch offene Rückfrage werden nicht verdeckt." },
    { quelle: "lf7-zusammenfuehren", text: "Welcher Pfeil gibt die Entscheidung an den Aktor weiter?", optionen: ["Steuerung → Hinweisleuchte.", "Überschrift → Raumluft, weil geschriebene Wörter ohne Komponenten eine Leuchte schalten können.", "Versorgung → Raumname, weil ein Name dadurch zum Empfänger einer Temperaturentscheidung wird."], richtig: "a", hinweis: "Die Steuerung gibt den Ein-/Aus-Zustand an die Leuchte weiter. Das ist eine funktionale Beziehung im Plan." },
    { quelle: "lf7-zusammenfuehren", text: "Was sagen die Pfeile im Funktionsplan aus?", optionen: ["Sie sind eine fertige elektrische Anschlussanweisung für reale Klemmen und Leitungen im Gebäude.", "Welche Komponente mit welcher Funktion spricht.", "Sie beweisen bereits eine erfolgreiche Inbetriebnahme aller realen Komponenten im Besprechungsraum."], richtig: "b", hinweis: "Die Pfeile benennen Quelle, Ziel und Aufgabe. Sie sind keine Anleitung zum realen elektrischen Anschluss." },
    { quelle: "lf7-zusammenfuehren", text: "Was muss bei fehlendem gültigem Messwert sichtbar bleiben?", optionen: ["Eine erfundene frische Temperatur, damit die fehlende Erfassung im dargestellten System verborgen bleibt.", "Eine pauschale Entwarnung, weil eine nicht leuchtende Leuchte jede unbekannte Temperatur ausschließt.", "Störung und veralteter Datenstand."], richtig: "c", hinweis: "Ohne gültigen Messwert ist die aktuelle Temperatur unbekannt. Störung und Datenalter müssen erkennbar sein." },
    { quelle: "lf7-pruefung", text: "Welche Erwartung gilt bei genau 26 °C?", optionen: ["Die Leuchte bleibt aus.", "Die Leuchte muss an sein, weil oberhalb im vereinbarten Auftrag auch genau gleich bedeutet.", "Es darf keine Erwartung notiert werden, weil ein Grenzwert in einem Funktionstest nie geprüft werden kann."], richtig: "a", hinweis: "Die Regel lautet oberhalb von 26 °C. Bei genau 26 °C wird die Grenze nicht überschritten; erwartet ist aus." },
    { quelle: "lf7-pruefung", text: "Was folgt aus konstant 1 W über 10 Stunden?", optionen: ["100 Wh ohne weitere Annahmen, weil bei der Rechnung grundsätzlich ein Faktor zehn hinzugefügt wird.", "10 Wh Energie.", "10 W Energie, weil die Zeitspanne die Einheit der Leistung und Energie nicht unterscheidet."], richtig: "b", hinweis: "Energie ergibt sich hier aus Leistung mal Zeit: 1 W mal 10 h gleich 10 Wh, entsprechend 0,01 kWh." },
    { quelle: "lf7-pruefung", text: "Was folgt auf die beobachtete Abweichung im Funktionstest?", optionen: ["Die gewünschte Wirkung als beobachtet eintragen, damit ein neuer Test auf jeden Fall vermieden wird.", "Eine nicht geprüfte Ursache als sicher erklären und alle weiteren offenen Punkte aus der Notiz entfernen.", "Abweichung notieren und gezielt erneut prüfen."], richtig: "c", hinweis: "Erwartung und Beobachtung bleiben getrennt. Ein klarer nächster Prüfschritt und erneuter Test belegen eine Korrektur." },
    { quelle: "lf7-sicherheit", text: "Welches Ziel schützt Daten vor unbemerkter Veränderung?", optionen: ["Integrität.", "Die äußere Form der Stromversorgung ohne Bezug zu Inhalt, Einheit oder Zeitpunkt übertragener Messwerte.", "Die Auflösung des Sensors, die unabhängig von jeder Veränderung im Nachrichtenweg alle Daten schützt."], richtig: "a", hinweis: "Integrität betrifft die unveränderte Bedeutung der Daten. Einheiten und Zeitpunkte gehören dabei ebenfalls dazu." },
    { quelle: "lf7-sicherheit", text: "Wer darf nach dem Vertraulichkeitsziel die Werte sehen?", optionen: ["Grundsätzlich jede beliebige Person, unabhängig vom vorgesehenen Zweck und von den festgelegten Rollen.", "Nur die vorgesehenen Personen.", "Niemand im vereinbarten Ablauf, obwohl die Übersichtsseite ausdrücklich der vorgesehenen Anzeige dienen soll."], richtig: "b", hinweis: "Vertraulichkeit begrenzt den Zugriff auf die vorgesehenen Personen. Sie ist von Verfügbarkeit und Integrität zu trennen." },
    { quelle: "lf7-sicherheit", text: "Welche Gesamtbewertung ist für diese erste Fassung ehrlich?", optionen: ["Eine funktionierende Anzeige beweist die Freigabe der realen Gebäudetechnik und aller Datenschutzfragen.", "Jede bestandene Wissensfrage ersetzt eine echte Sicherheitsprüfung und fachgerechte Inbetriebnahme.", "Lernmodell, keine echte Sicherheitsfreigabe."], richtig: "c", hinweis: "Die Inhalte behandeln ein fiktives Modell. Sie belegen weder eine reale Inbetriebnahme noch eine Sicherheitsfreigabe." }
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
  var api = { ID: "lf7-kontrolle", KEY: KEY, FRAGEN: FRAGEN, evaluate: evaluate, normalize: normalize };
  g.LF7_KONTROLLE = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (!g.document) return;
  var d = g.document, state = normalize();
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
      q.optionen.forEach(function (option, pos) {
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