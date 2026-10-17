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
        { id: "format", label: "1.234,50 Euro, nur anders geschrieben.", feedback: "Richtig. 1234,5 als 1.234,50 Euro ist nur Formatierung. Der Wert bleibt gleich. Gerundet würde erst, wenn Stellen wegfallen, und das müsste als Regel genannt sein." },
        { id: "null", label: "Einen fehlenden Tag als 0 Euro einsetzen, damit die Übersicht keine Lücken mehr zeigt.", feedback: "Null ist eine neue Aussage. Ein fehlender Wert bleibt fehlend und wird nicht erfunden." },
        { id: "doppelt", label: "Den Umsatz verdoppeln, weil eine Übersicht grundsätzlich gerundete Schätzungen zeigen muss.", feedback: "Eine Schätzung ohne Quelle verfälscht den Tagesumsatz. Der Betrag bleibt der belegte Wert." },
      ] },
      { id: "q2", prompt: "Was passiert mit einem fehlenden Tag?", correct: "leer", options: [
        { id: "schaetzen", label: "Samira schätzt den Umsatz aus dem Vortag, weil eine Lücke die Übersicht unbrauchbar macht.", feedback: "Eine Schätzung ist keine Quelle. Der fehlende Tag darf nicht wie ein gemessener Umsatz aussehen." },
        { id: "leer", label: "Das Feld bleibt leer und fehlend.", feedback: "Richtig. Der 14.10.2026 bleibt leer und wird als fehlend markiert. Eine 0 wäre eine Aussage der Kasse, wie sie am 13.10.2026 vorliegt." },
        { id: "loeschen", label: "Sie löscht alle anderen Tage, weil ein fehlender Wert die ganze Liste ungültig macht.", feedback: "Die vorhandenen Tage bleiben gültig. Nur der fehlende Tag wird markiert." },
      ] },
      { id: "q3", prompt: "Wie stehen Umsatz und Schicht auf der Übersicht?", correct: "neben", options: [
        { id: "summe", label: "Als eine Summe aus Euro und Schichtname, weil jede Übersicht genau eine Kennzahl haben muss.", feedback: "Euro und Schichtname lassen sich nicht sinnvoll addieren, die Einheiten passen nicht. Eine unerklärte Summe verfälscht beide Quellen." },
        { id: "ersetzen", label: "Die Schicht ersetzt den Umsatz, sobald beide am selben Datum stehen.", feedback: "Keine Quelle ersetzt die andere. Der Auftrag will beide nebeneinander, auch wenn ein Datum mehrere Schichtzeilen hat." },
        { id: "neben", label: "Nebeneinander zum selben Datum.", feedback: "Richtig. Gleiches Datum, getrennte Felder, alle Schichtzeilen des Tages bleiben sichtbar. Keine vermischte Kennzahl ohne benannte Regel." },
      ] },
      { id: "q4", prompt: "Wann wäre eine Summe erlaubt?", correct: "regel", options: [
        { id: "regel", label: "Bei benannter Regel und gleicher Einheit.", feedback: "Richtig. Eine Summe braucht eine benannte Regel, belegte Werte und passende Einheiten, etwa Personen-Schichten je Tag. Sonst ist sie eine Verfälschung." },
        { id: "huebsch", label: "Sobald die Seite sonst zu lang wirkt, auch ohne zu sagen, was addiert wird.", feedback: "Optik ist kein Rechengrund. Unerklärte Summen bleiben draußen." },
        { id: "immer", label: "Immer, weil Zusammenführen automatisch jede Rechnung erlaubt.", feedback: "Zusammenführen heißt hier nebeneinanderstellen. Rechnen ist ein eigener, begründeter Schritt." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
