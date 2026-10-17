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
        { id: "kasse", label: "Die fiktive Kasse.", feedback: "Richtig. Die Kasse ist im Beispiel die Quelle für Tagesumsätze. Die Schichttabelle enthält keine Umsätze." },
        { id: "tabelle", label: "Die Schichttabelle, weil jede Tabelle im Betrieb automatisch auch die Tagesumsätze enthält.", feedback: "Die Schichttabelle nennt geplante Schichten. Umsätze kommen im Beispiel aus der Kasse, nicht aus der Tabelle." },
        { id: "seite", label: "Die noch nicht gebaute Übersichtsseite, weil eine leere Seite die Umsätze schon erzeugt.", feedback: "Eine Übersichtsseite zeigt Daten. Sie ist im Beispiel nicht die Quelle der Umsätze." },
      ] },
      { id: "q2", prompt: "Wofür braucht der Auftrag beide Quellen?", correct: "neben", options: [
        { id: "alles", label: "Damit jede vorhandene Datei im Café ungeprüft auf der Übersicht erscheint.", feedback: "Vorhanden sein reicht nicht. Der Auftrag nennt Tagesumsatz und geplante Schichten, nicht jede Datei." },
        { id: "neben", label: "Umsatz und Schichten nebeneinander.", feedback: "Richtig. Der Auftrag will beides nebeneinander sehen, nur für die Caféleitung." },
        { id: "ersetzen", label: "Damit die Schichttabelle die Kasse ersetzt und keine Umsatzquelle mehr nötig ist.", feedback: "Die Tabelle ersetzt die Kasse nicht. Beide Quellen haben im Auftrag einen eigenen Zweck." },
      ] },
      { id: "q3", prompt: "Was tut Samira in dieser Lektion mit den Quellen?", correct: "beschreiben", options: [
        { id: "konto", label: "Sie legt ein echtes Benutzerkonto an der Kasse an, damit die Übung echte Umsätze laden kann.", feedback: "Ein echtes Konto gehört nicht zur Übung. Es gibt keine Zugangsdaten und kein Produktivsystem." },
        { id: "kopie", label: "Sie kopiert echte Tagesumsätze in eine Produktivdatenbank, weil eine Beschreibung ohne Kopie wertlos ist.", feedback: "Echte Daten und eine Produktivdatenbank sind außerhalb des Beispiels. Samira arbeitet nur mit dem erfundenen Modell." },
        { id: "beschreiben", label: "Sie beschreibt sie.", feedback: "Richtig. Samira benennt Quelle und Zweck auf Papier. Sie verbindet nichts und kopiert keine echten Daten." },
      ] },
      { id: "q4", prompt: "Welche Quelle gehört nicht auf die Übersicht?", correct: "ohne", options: [
        { id: "ohne", label: "Eine Quelle ohne Zweck.", feedback: "Richtig. Nur was der Auftrag braucht, kommt auf die Übersicht. Eine Quelle ohne Zweck bleibt draußen." },
        { id: "kasse", label: "Die Kasse, obwohl der Auftrag ausdrücklich die Tagesumsätze daraus sehen will.", feedback: "Die Kasse hat einen genannten Zweck. Sie bleibt die Umsatzquelle und fällt nicht weg." },
        { id: "beide", label: "Beide beauftragten Quellen, weil eine Übersicht grundsätzlich nur eine einzige Quelle haben darf.", feedback: "Der Auftrag nennt zwei Quellen. Eine künstliche Ein-Quellen-Regel widerspricht dem Beispiel." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
