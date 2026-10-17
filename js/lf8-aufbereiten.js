/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf8-lektion.js") : g.LF8_LEKTION;
  var api = engine.create({
    id: "lf8-aufbereiten", title: "Daten für die Übersicht aufbereiten, ohne sie zu verfälschen",
    goals: ["Aufbereiten von Verfälschen unterscheiden.", "Fehlende Werte sichtbar lassen."],
    theory: [
      ["Beispieldaten", "Kassenliste (Datum; Tagesumsatz in Euro): 12.10.2026; 1234,5 · 13.10.2026; 0 · 14.10.2026; (leer) · 15.10.2026; 987,25. Schichttabelle (Datum; Schicht; eingeplante Personen): 12.10.2026; Früh; 2 · 12.10.2026; Spät; 1 · 13.10.2026; Früh; 1 · 14.10.2026; Früh; 2 · 14.10.2026; Spät; 2 · 15.10.2026; Spät; 1. Alle Zeilen sind erfunden. Pro Datum kann es mehrere Schichtzeilen geben."],
      ["Erlaubt", "Samira darf den Umsatz 1234,5 vom 12.10.2026 als 1.234,50 Euro schreiben, wenn die Quelle Euro belegt. Das ist nur Formatierung: Der Wert bleibt gleich, es werden zwei Nachkommastellen gezeigt. Gerundet würde erst, wenn Stellen wegfallen, etwa 987,254 auf 987,25. Dann ändert sich der Wert, und die Rundungsregel muss genannt sein. Auch das Datum darf sie lesbar schreiben."],
      ["Nicht erlaubt", "Der 14.10.2026 hat in der Kassenliste keinen Wert. Samira setzt dort keine Null ein: Am 13.10.2026 steht 0, das ist eine Angabe der Kasse. Am 14.10.2026 steht nichts, das ist keine Angabe. Das Feld bleibt leer und wird als fehlend markiert. Schätzen aus dem Vortag ist ebenfalls keine Quelle."],
      ["Zusammenführen", "Zum selben Datum stehen Umsatz in Euro und die Schichtzeilen nebeneinander. Am 14.10.2026 gehören zwei Schichtzeilen zu einem fehlenden Umsatzfeld. Samira überschreibt keine der beiden Zeilen und addiert nicht Euro und Personen, weil die Einheiten nicht zusammenpassen. Eine Summe braucht eine benannte Regel und gleiche Einheiten, zum Beispiel eingeplante Personen-Schichten je Tag (14.10.2026: 4)."],
    ],
    questions: [
      { id: "q1", prompt: "Welche Aufbereitung bleibt zulässig?", correct: "format", options: [
        { id: "format", label: "1234,5 EUR als 1.234,50 EUR anzeigen, ohne den Wert zu ändern.", feedback: "Richtig. Zwei Nachkommastellen anzuzeigen ist hier Formatierung, keine Änderung des belegten Betrags." },
        { id: "null", label: "Leere Umsatzfelder mit 0,00 EUR für eine vollständige Anzeige füllen.", feedback: "Ein leeres Feld belegt keinen Nullumsatz. Eine 0 würde eine nicht gelieferte Angabe erfinden." },
        { id: "doppelt", label: "1234,5 EUR für die Tagesübersicht auf volle Euro vereinheitlichen.", feedback: "Das wäre eine Wertänderung durch Rundung. Ohne vereinbarte Rundungsregel ist sie nicht zulässig." },
      ] },
      { id: "q2", prompt: "Was passiert mit einem fehlenden Tag?", correct: "leer", options: [
        { id: "schaetzen", label: "Der Vortageswert wird als Ersatzwert ohne Zusatz übernommen.", feedback: "Ein Ersatzwert ohne Kennzeichnung sähe wie eine Messung aus. Er ist kein belegter Tagesumsatz." },
        { id: "leer", label: "Der Tag bleibt enthalten, der Umsatz wird als fehlend markiert.", feedback: "Richtig. Das erhält den Tag und unterscheidet fehlende Angaben von einem ausdrücklich belegten Nullwert." },
        { id: "loeschen", label: "Der betroffene Tag wird aus der gemeinsamen Übersicht entfernt.", feedback: "So gingen auch vorhandene Schichtdaten verloren. Der Tag bleibt erhalten und seine Umsatzlücke sichtbar." },
      ] },
      { id: "q3", prompt: "Wie stehen Umsatz und Schicht auf der Übersicht?", correct: "neben", options: [
        { id: "summe", label: "Als Umsatz je Schicht; alle Zeilen werden später zum Tagesumsatz addiert.", feedback: "Den Tagesumsatz pro Schicht zu wiederholen und dann zu summieren würde ihn mehrfach zählen." },
        { id: "ersetzen", label: "Als Tagesumsatz mit nur der ersten gefundenen Schichtzeile.", feedback: "Ein Datum kann mehrere Schichten haben. Nur die erste zu verwenden würde weitere Einsätze verlieren." },
        { id: "neben", label: "Als Tagesumsatz mit allen zugehörigen Schichten zum gleichen Datum.", feedback: "Richtig. Ein Umsatz je Datum bleibt neben sämtlichen Schichten erhalten, ohne Mehrfachzählung." },
      ] },
      { id: "q4", prompt: "Wann wäre eine Summe erlaubt?", correct: "regel", options: [
        { id: "regel", label: "Wenn die Rechenregel feststeht und belegte Werte mit passender Einheit vorliegen.", feedback: "Richtig. Eine ausgewiesene Summe braucht einen definierten Sinn und darf fehlende Werte nicht erfinden." },
        { id: "huebsch", label: "Wenn alle sichtbaren Zahlen im Bericht in eine Summenzeile übernommen werden.", feedback: "Sichtbare Zahlen können verschiedene Einheiten haben. Eine Summenzeile begründet die Addition nicht." },
        { id: "immer", label: "Wenn fehlende Beträge vorher als Nullwerte in die Tagesliste übernommen werden.", feedback: "Ein fehlender Betrag ist keine Null. Eine Summe darf ihre Ausgangsdaten nicht still vervollständigen." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
