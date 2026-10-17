/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf8-lektion.js") : g.LF8_LEKTION;
  var api = engine.create({
    id: "lf8-reflexion", title: "Werkzeug und Dokumentationsqualität beurteilen",
    goals: ["Ein Werkzeug an der Aufgabe messen, nicht an der Gewohnheit.", "Eine Notiz auf Nachvollziehbarkeit prüfen."],
    theory: [
      ["Werkzeug", "Für diese Skizze reichen Papier und die erfundenen Beispielzeilen aus der Lektion zum Aufbereiten. Ein Datenbankserver wäre für diese wenigen Zeilen unnötig und würde eine Einrichtung vortäuschen. Samira begründet die Wahl mit der Aufgabe, nicht mit dem, was sie zuletzt benutzt hat."],
      ["Qualität der Notiz", "Eine gute Notiz nennt Quelle, Stand, Regel und offene Frage. Eine schlechte Notiz sagt nur fertig oder sieht gut aus. Samira prüft, ob eine andere Person die Ablehnung der Lieferantenliste ohne Nachfrage versteht."],
      ["Was die Reflexion nicht ist", "Die Reflexion ist keine Abnahme des Felds und keine Freigabe. Sie zeigt, was an der eigenen Notiz noch fehlt. Lernfeld 8 bleibt im Katalog auf In Kürze, bis das ganze Feld geprüft ist."],
    ],
    questions: [
      { id: "q1", prompt: "Welches Werkzeug passt zu dieser Skizze?", correct: "papier", options: [
        { id: "papier", label: "Die fiktiven Beispielzeilen und eine nachvollziehbare Skizze.", feedback: "Richtig. Für den Konzeptschritt reichen diese Mittel. Das zusätzliche Labor setzt die Bereitstellung separat um." },
        { id: "server", label: "Eine neue Serverdatenbank mit eingerichteter Importautomatik.", feedback: "Für die reine Skizze wäre diese Einrichtung unnötig und würde den vorgesehenen Arbeitsschritt überschreiten." },
        { id: "konto", label: "Ein lesendes Kassenkonto zum Abgleich echter Geschäftsdaten.", feedback: "Echte Geschäftsdaten sind nicht erforderlich. Die Skizze soll mit den fiktiven Beispielzeilen entstehen." },
      ] },
      { id: "q2", prompt: "Woran erkennt Samira eine brauchbare Notiz?", correct: "andere", options: [
        { id: "huebsch", label: "Die Notiz verwendet ein einheitliches Layout und dieselbe Schrift.", feedback: "Layout hilft beim Lesen, beweist aber nicht, dass eine andere Person Quellen, Regeln und Lücken versteht." },
        { id: "andere", label: "Eine zweite Rolle kann Quellen, Regeln und Lücken ohne Rückfrage erklären.", feedback: "Richtig. Das prüft tatsächliche Nachvollziehbarkeit statt nur die äußere Form der Dokumentation." },
        { id: "kurz", label: "Die Notiz enthält alle Dateinamen und einen abschließenden Status.", feedback: "Dateinamen und Status allein erklären keine Auswahl- oder Aufbereitungsregeln und reichen nicht aus." },
      ] },
      { id: "q3", prompt: "Was prüft die Reflexion an der Lieferantenliste?", correct: "grund", options: [
        { id: "kauf", label: "Ob sich die Lieferantenliste mit weniger Aufwand importieren ließe.", feedback: "Technisch leichterer Import ändert nichts am fehlenden Auftrag. Hier wird die Auswahlbegründung geprüft." },
        { id: "namen", label: "Ob alle Datensätze der abgelehnten Liste in der Anlage stehen.", feedback: "Eine vollständige Datenkopie ist für die begründete Ablehnung nicht erforderlich und nicht beauftragt." },
        { id: "grund", label: "Ob der fehlende Bezug zum Auftrag nachvollziehbar begründet wurde.", feedback: "Richtig. Eine zweite Person muss verstehen, warum die verfügbare Quelle bewusst ausgeschlossen wurde." },
      ] },
      { id: "q4", prompt: "Was ist diese Reflexion nicht?", correct: "abnahme", options: [
        { id: "abnahme", label: "Eine Entscheidung, das gesperrte Lernfeld im Katalog freizugeben.", feedback: "Richtig. Selbstreflexion ersetzt Dennis' ausdrückliche Freigabeentscheidung nicht." },
        { id: "blick", label: "Eine Prüfung, ob die eigene Auswahlbegründung verständlich ist.", feedback: "Das gehört genau zur Reflexion und ist noch keine Freigabe des gesamten Lernfelds." },
        { id: "luecke", label: "Eine Dokumentation der noch offenen Angaben und Verbesserungen.", feedback: "Offene Angaben sichtbar zu machen ist ein sinnvoller Teil der Reflexion, kein Freigabeschritt." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
