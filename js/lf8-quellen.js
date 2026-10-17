/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf8-lektion.js") : g.LF8_LEKTION;
  var api = engine.create({
    id: "lf8-quellen", title: "Datenquellen und ihren Zweck unterscheiden",
    goals: ["Eine Datenquelle vom Verwendungszweck unterscheiden.", "Nur Quellen nennen, die der Auftrag wirklich braucht."],
    theory: [
      ["Zwei Quellen, ein Zweck", "Samira bei Nordlicht IT-Service soll für das erfundene Hafenblick Café eine Übersichtsseite skizzieren. Die fiktive Kasse liefert Tagesumsätze. Die fiktive Schichttabelle liefert, wer an welchem Tag eingeplant ist. Beide Quellen bleiben getrennt, bis der Auftrag sagt, wofür sie gebraucht werden."],
      ["Zweck vor Technik", "Der Auftrag lautet: Tagesumsatz und geplante Schichten nebeneinander sehen, nur für die Caféleitung. Eine Quelle ist nicht schon deshalb richtig, weil sie vorhanden ist. Eine Quelle ohne Zweck gehört nicht auf die Übersicht."],
      ["Grenze des Beispiels", "Samira beschreibt die Quellen auf Papier. Sie verbindet nichts, sie kopiert keine echten Daten und sie legt kein Konto an. Das Café, die Kasse und die Tabelle sind erfunden."],
    ],
    questions: [
      { id: "q1", prompt: "Welche Quelle liefert im Beispiel die Tagesumsätze?", correct: "kasse", options: [
        { id: "kasse", label: "Der Tagesexport der Kasse.", feedback: "Richtig. Die Kasse liefert die Tagesumsätze; ihr Export ist hier die passende Ursprungsquelle." },
        { id: "tabelle", label: "Die Planung der Schichten.", feedback: "Die Schichtplanung enthält Einsatzzeiten, aber keine belegten Tagesumsätze aus der Kasse." },
        { id: "seite", label: "Die geplante Tagesübersicht.", feedback: "Die Tagesübersicht ist das Ausgabeziel. Sie benötigt die Umsatzdaten erst aus einer Quelle." },
      ] },
      { id: "q2", prompt: "Wofür braucht der Auftrag beide Quellen?", correct: "neben", options: [
        { id: "alles", label: "Um Lieferkosten und Umsätze täglich zu verrechnen.", feedback: "Eine Kostenrechnung wäre eine andere Aufgabe. Der Auftrag nennt Umsätze und geplante Schichten." },
        { id: "neben", label: "Um Tagesumsatz und geplante Schichten gemeinsam anzuzeigen.", feedback: "Richtig. Beide Quellen liefern unterschiedliche Angaben für dieselbe Tagesübersicht der Leitung." },
        { id: "ersetzen", label: "Um aus der Personalplanung die Umsätze zu schätzen.", feedback: "Die Schichtplanung ersetzt keine Messung der Umsätze. Dafür bleibt die Kasse die Quelle." },
      ] },
      { id: "q3", prompt: "Was tut Samira in dieser Lektion mit den Quellen?", correct: "beschreiben", options: [
        { id: "konto", label: "Sie richtet bereits den lesenden Kassenzugang ein.", feedback: "Die Zugriffsplanung ist noch keine Kontoeinrichtung. Hier werden Quelle und Zweck beschrieben." },
        { id: "kopie", label: "Sie importiert schon einen vollständigen Umsatzexport.", feedback: "Ein Import ist ein späterer Umsetzungsschritt. Diese Lektion dient zunächst der Quellenbeschreibung." },
        { id: "beschreiben", label: "Sie hält Quelle, Inhalt und Verwendungszweck fest.", feedback: "Richtig. Die Quellen werden beschrieben, bevor eine Verbindung oder ein Import geplant wird." },
      ] },
      { id: "q4", prompt: "Welche Quelle gehört nicht auf die Übersicht?", correct: "ohne", options: [
        { id: "ohne", label: "Die Lieferantenliste ohne Bezug zum Übersichtsauftrag.", feedback: "Richtig. Lieferdaten werden nicht benötigt. Vorhandensein allein rechtfertigt ihre Übernahme nicht." },
        { id: "kasse", label: "Der Tagesexport mit den geforderten Umsatzwerten.", feedback: "Der Tagesexport ist gerade für den geforderten Umsatz vorgesehen und gehört zur Auswahl." },
        { id: "beide", label: "Die Schichtquelle mit den geplanten Einsätzen.", feedback: "Die geplanten Einsätze gehören laut Auftrag neben die Umsätze; diese Quelle wird benötigt." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
