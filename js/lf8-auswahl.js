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
        { id: "auftrag", label: "Der Auftrag verlangt sie nicht.", feedback: "Richtig. Gewohnheit und leichte Öffnung sind kein Auswahlgrund. Der Auftrag nennt sie nicht." },
        { id: "kaputt", label: "Weil jede Liste, die nicht die Kasse ist, technisch unlesbar sein muss.", feedback: "Die Liste wäre lesbar. Sie fällt wegen des fehlenden Auftragsteils heraus, nicht wegen der Technik." },
        { id: "namen", label: "Weil eine Lieferantenliste immer personenbezogen ist und deshalb nie beschrieben werden darf.", feedback: "Personenbezug wäre eine eigene Prüfung. Hier fehlt schon der Zweck im Auftrag." },
      ] },
      { id: "q2", prompt: "Wann passt eine Quelle zu diesem Auftrag?", correct: "drei", options: [
        { id: "da", label: "Sobald sie im Ordner liegt, unabhängig von Feld, Format und erlaubtem Zugriff.", feedback: "Vorhandensein ist kein Passungskriterium. Feld, Format und Zugriff müssen zum Auftrag passen." },
        { id: "drei", label: "Feld, Format und Zugriff passen.", feedback: "Richtig. Alle drei müssen zum Auftrag passen. Fehlt eines, ist die Quelle für diesen Auftrag nicht gewählt." },
        { id: "neu", label: "Nur wenn sie neu gekauft wurde, auch wenn die vorhandenen Quellen die Felder schon liefern.", feedback: "Ein Kauf gehört nicht zur Übung. Vorhandene passende Quellen werden nicht durch Neuanschaffung ersetzt." },
      ] },
      { id: "q3", prompt: "Was gehört zur abgelehnten Lieferantenliste?", correct: "grund", options: [
        { id: "leer", label: "Gar nichts, weil eine nicht gewählte Quelle in der Notiz unsichtbar bleiben muss.", feedback: "Ohne Notiz wirkt die Ablehnung später wie ein Versehen. Der Grund gehört dazu." },
        { id: "kopie", label: "Eine vollständige Kopie aller Lieferdaten, obwohl die Liste nicht gewählt wird.", feedback: "Nicht gewählte Daten werden nicht kopiert. Notiert wird nur die Ablehnung mit Grund." },
        { id: "grund", label: "Der Ablehnungsgrund.", feedback: "Richtig. Samira notiert, dass der Auftrag keine Lieferdaten verlangt. So bleibt die Entscheidung nachvollziehbar." },
      ] },
      { id: "q4", prompt: "Was ist kein Auswahlgrund?", correct: "gewohnt", options: [
        { id: "gewohnt", label: "Dass die Datei gewohnt ist.", feedback: "Richtig. Gewohnheit ersetzt den Auftrag nicht. Die Lieferantenliste bleibt draußen." },
        { id: "feld", label: "Dass die Quelle ein im Auftrag gefordertes Feld wirklich liefert.", feedback: "Ein gefordertes Feld ist ein echter Passungsgrund. Gewohnheit ist es nicht." },
        { id: "zugriff", label: "Dass der vorgesehene Zugriff zum genannten Zweck passt.", feedback: "Passender Zugriff gehört zur Auswahl. Er ist kein Ersatz für den Auftrag, aber auch kein Scheingrund." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
