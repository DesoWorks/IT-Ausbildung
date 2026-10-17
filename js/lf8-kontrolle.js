/* Aufbau nach LF7-Lernzielkontrolle: 24 Fragen, Abgabe sperrt den Versuch.
 * Zurücksetzen nur mit dem Passwort der Lernzielkontrolle. Hier steht nur der SHA-256-Hash. */
(function (g) {
  "use strict";
  var KEY = "it-ausbildung.lf8-kontrolle.v1";
  var HASH = "15fb2a9581621437953d399ad3e4eb44e51c9df2d10c19b9754dba7d432fcd84";
  var FRAGEN = [
    { quelle: "lf8-quellen", text: "Welche Quelle liefert im Beispiel die Tagesumsätze?", optionen: ["Die fiktive Kasse.", "Die Schichttabelle, weil jede Tabelle im Betrieb automatisch auch die Tagesumsätze enthält.", "Die noch nicht gebaute Übersichtsseite, die Umsätze schon erzeugt, bevor eine Quelle gewählt ist."], richtig: "a", hinweis: "Die Kasse ist die Umsatzquelle. Die Schichttabelle enthält Schichten, die Seite zeigt nur an." },
    { quelle: "lf8-quellen", text: "Wofür braucht der Auftrag beide Quellen?", optionen: ["Damit jede vorhandene Datei ungeprüft auf der Übersicht erscheint, auch ohne genannten Zweck.", "Umsatz und Schichten nebeneinander.", "Damit die Schichttabelle die Kasse ersetzt und keine Umsatzquelle mehr nötig ist."], richtig: "b", hinweis: "Der Auftrag will Tagesumsatz und geplante Schichten nebeneinander, nur für die Caféleitung." },
    { quelle: "lf8-quellen", text: "Was tut Samira in dieser Lektion mit den Quellen?", optionen: ["Sie legt ein echtes Benutzerkonto an, damit die Übung echte Umsätze aus einem Produktivsystem laden kann.", "Sie kopiert echte Tagesumsätze in eine Produktivdatenbank, weil eine Beschreibung ohne Kopie wertlos ist.", "Sie beschreibt sie."], richtig: "c", hinweis: "Samira benennt Quelle und Zweck. Sie verbindet nichts und kopiert keine echten Daten." },
    { quelle: "lf8-struktur", text: "Was beschreibt die Struktur der Kassenliste?", optionen: ["Datum und Umsatz.", "Nur, wer die Liste öffnen darf, ohne die Felder selbst zu benennen oder zu prüfen.", "Die Farbe der Kasse, weil das Gehäuse die Bedeutung von Datum und Umsatz festlegt."], richtig: "a", hinweis: "Struktur nennt die Felder. Wer öffnen darf, ist der Zugriff, nicht die Struktur." },
    { quelle: "lf8-struktur", text: "Welches Format hat die Kassenliste im Beispiel?", optionen: ["Ein Foto der Theke, weil jedes Bild automatisch Datum und Umsatz als Felder enthält.", "Eine kommagetrennte Liste.", "Die Übersichtsseite selbst, obwohl sie die Liste erst anzeigen und nicht erzeugen soll."], richtig: "b", hinweis: "Datum und Umsatz stehen als kommagetrennte Liste. Die Seite ist das Anzeigeziel, nicht das Format." },
    { quelle: "lf8-struktur", text: "Was tut Samira, wenn die Währung fehlt?", optionen: ["Sie setzt Euro ein, weil jede Kasse in diesem Lernmodell automatisch Euro führen muss.", "Sie löscht die ganze Liste, weil eine fehlende Angabe alle anderen Felder ungültig macht.", "Sie notiert die Lücke."], richtig: "c", hinweis: "Eine fehlende Angabe bleibt sichtbar. Samira erfindet keine Währung." },
    { quelle: "lf8-recht", text: "Wer darf die Umsätze im Beispiel sehen?", optionen: ["Die Caféleitung.", "Jede Person, die die Datei technisch öffnen könnte, weil Erreichbarkeit die Erlaubnis ersetzt.", "Die Gäste an der Theke, weil ein Umsatz ohne weitere Prüfung öffentlich zur Speisekarte gehört."], richtig: "a", hinweis: "Der Auftrag nennt die Caféleitung. Erreichbar ist nicht erlaubt." },
    { quelle: "lf8-recht", text: "Warum sind Namen in der Schichttabelle heikel?", optionen: ["Weil eine Zahl in der Tabelle automatisch ein Personenbezug ist und ein Name keiner.", "Ein Name weist auf eine Person hin.", "Weil ein Tabellenblatt grundsätzlich verboten ist, unabhängig davon, welche Spalten es enthält."], richtig: "b", hinweis: "Auch erfundene Namen stehen für Personen. Sie gehören nicht in eine öffentliche Ansicht." },
    { quelle: "lf8-recht", text: "Was tut Samira, wenn die Rechtsgrundlage fehlt?", optionen: ["Sie schreibt eine beliebige Rechtsgrundlage in die Notiz, damit die Übersicht vollständig aussieht.", "Sie gibt die Umsätze trotzdem an alle weiter, weil eine offene Frage die Weitergabe nicht aufhält.", "Sie fragt und erfindet keine."], richtig: "c", hinweis: "Eine fehlende Grundlage bleibt offen. Samira füllt die Übersicht nicht mit einer erfundenen Erlaubnis." },
    { quelle: "lf8-auswahl", text: "Warum fällt die Lieferantenliste heraus?", optionen: ["Der Auftrag verlangt sie nicht.", "Weil jede Liste, die nicht die Kasse ist, technisch unlesbar sein muss.", "Weil eine Lieferantenliste immer personenbezogen ist und deshalb nie beschrieben werden darf."], richtig: "a", hinweis: "Gewohnheit ist kein Auswahlgrund. Der Auftrag nennt die Lieferantenliste nicht." },
    { quelle: "lf8-auswahl", text: "Wann passt eine Quelle zu diesem Auftrag?", optionen: ["Sobald sie im Ordner liegt, unabhängig von Feld, Format und erlaubtem Zugriff.", "Feld, Format und Zugriff passen.", "Nur wenn sie neu gekauft wurde, auch wenn die vorhandenen Quellen die Felder schon liefern."], richtig: "b", hinweis: "Alle drei müssen zum Auftrag passen. Fehlt eines, ist die Quelle nicht gewählt." },
    { quelle: "lf8-auswahl", text: "Was gehört zur abgelehnten Lieferantenliste?", optionen: ["Gar nichts, weil eine nicht gewählte Quelle in der Notiz unsichtbar bleiben muss.", "Eine vollständige Kopie aller Lieferdaten, obwohl die Liste nicht gewählt wird.", "Der Ablehnungsgrund."], richtig: "c", hinweis: "Ohne Grund wirkt die Ablehnung später wie ein Versehen. Die Daten selbst werden nicht kopiert." },
    { quelle: "lf8-konzept", text: "Wer ist der Empfänger im Papierkonzept?", optionen: ["Die Caféleitung.", "Alle Personen mit Internetzugang, weil eine Übersicht grundsätzlich öffentlich sein muss.", "Die Gäste, weil Umsatzzahlen zur Bewirtung automatisch mit ausgehängt werden."], richtig: "a", hinweis: "Das Konzept nennt die Caféleitung. Öffentlichkeit widerspricht dem Schutzbedarf." },
    { quelle: "lf8-konzept", text: "Wie oft soll die Übersicht im Konzept aktualisiert werden?", optionen: ["Ständig und live, obwohl der Auftrag nur den Stand am Tagesende verlangt.", "Einmal am Tagesende.", "Nie, weil eine einmal gezeichnete Skizze alle späteren Tage automatisch enthält."], richtig: "b", hinweis: "Das Konzept sieht eine Aktualisierung am Tagesende vor, nicht eine dauerhafte Verbindung." },
    { quelle: "lf8-konzept", text: "Was ist das Konzept in dieser Lektion nicht?", optionen: ["Eine Skizze auf Papier, obwohl genau das der vereinbarte Arbeitsstand ist.", "Eine Notiz zu Empfänger und Schutzbedarf, weil solche Angaben in einem Konzept verboten sind.", "Eine eingerichtete Seite."], richtig: "c", hinweis: "Die Skizze richtet nichts ein. Kein Konto, kein Passwort, keine Freigabe." },
    { quelle: "lf8-aufbereiten", text: "Welche Aufbereitung bleibt zulässig?", optionen: ["1.234,50 Euro, Regel genannt.", "Einen fehlenden Tag als 0 Euro einsetzen, damit die Übersicht keine Lücken mehr zeigt.", "Den Umsatz verdoppeln, weil eine Übersicht grundsätzlich gerundete Schätzungen zeigen muss."], richtig: "a", hinweis: "Die Schreibweise ändert den belegten Betrag nicht, wenn Währung und Rundung genannt sind." },
    { quelle: "lf8-aufbereiten", text: "Was passiert mit einem fehlenden Tag?", optionen: ["Samira schätzt den Umsatz aus dem Vortag, weil eine Lücke die Übersicht unbrauchbar macht.", "Das Feld bleibt leer und fehlend.", "Sie löscht alle anderen Tage, weil ein fehlender Wert die ganze Liste ungültig macht."], richtig: "b", hinweis: "Leer und als fehlend markiert ist ehrlich. Null wäre eine falsche Aussage." },
    { quelle: "lf8-aufbereiten", text: "Wie stehen Umsatz und Schicht auf der Übersicht?", optionen: ["Als eine Summe aus Euro und Schichtname, weil jede Übersicht genau eine Kennzahl haben muss.", "Die Schicht ersetzt den Umsatz, sobald beide am selben Datum stehen.", "Nebeneinander zum selben Datum."], richtig: "c", hinweis: "Gleiches Datum, getrennte Felder. Eine unerklärte Summe verfälscht beide Quellen." },
    { quelle: "lf8-uebergabe", text: "Was übergibt Samira in dieser Lektion?", optionen: ["Die nachvollziehbare Notiz.", "Eine bereits freigegebene Produktivseite, weil eine Notiz ohne Live-System keine Übergabe ist.", "Ein Passwort für die Kasse, damit die nächste Person sofort echte Umsätze laden kann."], richtig: "a", hinweis: "Quellen, Zweck, Regeln und Lücken stehen in der Notiz. Eine echte Seite wird nicht übergeben." },
    { quelle: "lf8-uebergabe", text: "Welche Grenze muss die Notiz nennen?", optionen: ["Dass der Betrieb die Übersicht bereits nutzt, auch wenn nichts eingerichtet wurde.", "Nichts eingerichtet, keine Freigabe.", "Dass offene Fragen absichtlich verschwiegen werden, damit die Übergabe kürzer wirkt."], richtig: "b", hinweis: "Stand und Grenze gehören in die Notiz, sonst wirkt die Skizze wie ein laufender Betrieb." },
    { quelle: "lf8-uebergabe", text: "Wann setzt Samira kein Erledigt?", optionen: ["Niemals, auch wenn jede offene Frage beantwortet und die Notiz geprüft ist.", "Nur wenn die Seite schon öffentlich ist, unabhängig von offenen Fragen in der Notiz.", "Solange eine Frage offen ist."], richtig: "c", hinweis: "Die fehlende Währung bleibt offen. Erledigt wäre eine falsche Aussage." },
    { quelle: "lf8-reflexion", text: "Welches Werkzeug passt zu dieser Skizze?", optionen: ["Papier und die Beispieldateien.", "Ein Datenbankserver, weil jede Datenaufgabe unabhängig vom Umfang einen Server braucht.", "Ein echtes Kassenkonto, weil ohne Anmeldung keine Übung möglich ist."], richtig: "a", hinweis: "Die Aufgabe ist eine nachvollziehbare Skizze. Ein Server würde eine Einrichtung vortäuschen." },
    { quelle: "lf8-reflexion", text: "Woran erkennt Samira eine brauchbare Notiz?", optionen: ["An der Schriftfarbe, weil eine lesbare Farbe jede fehlende Quelle ersetzt.", "Eine andere Person versteht sie.", "Daran, dass sie nur das Wort fertig enthält und deshalb keine Rückfrage erzeugt."], richtig: "b", hinweis: "Quelle, Stand, Regel und offene Frage müssen ohne mündliche Nachfrage klar sein." },
    { quelle: "lf8-reflexion", text: "Was ist diese Reflexion nicht?", optionen: ["Ein Blick auf die eigene Notiz, obwohl genau das der Zweck dieser Lektion ist.", "Das Sichtbarmachen einer Lücke, weil Lücken in einer Reflexion verboten sind.", "Eine Freigabe des Lernfelds."], richtig: "c", hinweis: "Die Reflexion bewertet die eigene Notiz. Das Feld bleibt auf In Kürze, bis es geprüft ist." },
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
  var api = { ID: "lf8-kontrolle", KEY: KEY, FRAGEN: FRAGEN, evaluate: evaluate, normalize: normalize };
  g.LF8_KONTROLLE = api;
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