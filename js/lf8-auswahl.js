/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf8-lektion.js") : g.LF8_LEKTION;
  var api = engine.create({
    id: "lf8-auswahl", title: "Quellen nach Auftrag auswählen, nicht nach Gewohnheit",
    goals: ["Quellen am Auftrag messen, nicht an Gewohnheit.", "Eine abgelehnte Quelle mit Grund notieren."],
    theory: [
      ["Drei Kandidaten", "Neben Kasse und Schichttabelle liegt eine fiktive Lieferantenliste. Sie ist gewohnt und leicht zu öffnen. Der Auftrag nennt sie nicht. Samira nimmt sie nicht auf, nur weil sie da ist."],
      ["Passung prüfen", "Eine Quelle passt, wenn sie ein gefordertes Feld liefert, im vereinbarten Format lesbar ist und der Zugriff zum Zweck passt. Fehlt eines davon, ist sie für diesen Auftrag nicht gewählt."],
      ["Ablehnung begründen", "Samira schreibt: Lieferantenliste abgelehnt, weil der Auftrag keine Lieferdaten verlangt. Eine Ablehnung ohne Grund sieht später aus wie ein Versehen."],
    ],
    questions: [
      { id: "q1", prompt: "Warum fällt die Lieferantenliste heraus?", correct: "auftrag", options: [
        { id: "auftrag", label: "Lieferdaten beantworten keine Frage dieses Übersichtsauftrags.", feedback: "Richtig. Die Quelle ist nicht wegen ihrer Technik, sondern wegen des fehlenden Zwecks ausgeschlossen." },
        { id: "kaputt", label: "Eine dritte Datenquelle würde das Zusammenführen verhindern.", feedback: "Mehrere Quellen sind technisch möglich. Entscheidend ist ihr Bezug zum konkreten Auftrag." },
        { id: "namen", label: "Eine Liste mit Firmenkontakten darf nie als Quelle dienen.", feedback: "Kontaktlisten sind nicht grundsätzlich ausgeschlossen. Zweck, Berechtigung und Rechtslage entscheiden." },
      ] },
      { id: "q2", prompt: "Wann passt eine Quelle zu diesem Auftrag?", correct: "drei", options: [
        { id: "da", label: "Die Felder passen, und die Datei lässt sich technisch öffnen.", feedback: "Technische Öffnung belegt keine erlaubte Nutzung. Format und Zugriffszweck müssen ebenfalls passen." },
        { id: "drei", label: "Benötigte Felder, nutzbares Format und erlaubter Zugriff passen.", feedback: "Richtig. Fachlicher Inhalt, technische Nutzbarkeit und erlaubter Zweck werden gemeinsam geprüft." },
        { id: "neu", label: "Das Format passt, und der Export ist der neueste im Ordner.", feedback: "Ein aktuelles Datum reicht nicht: Die geforderten Felder und die Nutzungserlaubnis fehlen als Prüfung." },
      ] },
      { id: "q3", prompt: "Was gehört zur abgelehnten Lieferantenliste?", correct: "grund", options: [
        { id: "leer", label: "Nur ihr Dateiname in der Liste der geprüften Quellen.", feedback: "Der Dateiname zeigt nicht, warum die Quelle abgelehnt wurde. Der fachliche Grund gehört dazu." },
        { id: "kopie", label: "Ein Datenexport als Beleg für die erfolgte Sichtung.", feedback: "Eine Datenkopie ist für diese Ablehnung unnötig. Die Entscheidung wird mit dem Grund dokumentiert." },
        { id: "grund", label: "Die Entscheidung mit dem fehlenden Bezug zum Auftrag.", feedback: "Richtig. Eine andere Person kann nachvollziehen, warum die vorhandene Quelle nicht verwendet wird." },
      ] },
      { id: "q4", prompt: "Was ist kein Auswahlgrund?", correct: "gewohnt", options: [
        { id: "gewohnt", label: "Die Datei wurde im letzten Projekt ebenfalls benutzt.", feedback: "Richtig. Frühere Verwendung belegt nicht ihre Eignung für die Anforderungen dieses Projekts." },
        { id: "feld", label: "Die Quelle enthält das geforderte Tagesumsatzfeld.", feedback: "Ein tatsächlich benötigtes Feld ist ein fachlicher Auswahlgrund; Gewohnheit dagegen nicht." },
        { id: "zugriff", label: "Die erlaubte Nutzung entspricht dem vereinbarten Zweck.", feedback: "Der passende Zugriffszweck ist ein echtes Kriterium und muss neben Inhalt und Format geprüft werden." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
