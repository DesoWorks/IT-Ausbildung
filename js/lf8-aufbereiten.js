/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf8-lektion.js") : g.LF8_LEKTION;
  var api = engine.create({
    id: "lf8-aufbereiten", title: "Daten für die Übersicht aufbereiten, ohne sie zu verfälschen",
    goals: ["Aufbereiten von Verfälschen unterscheiden.", "Fehlende Werte sichtbar lassen."],
    theory: [
      ["Erlaubt", "Samira darf den fiktiven Umsatz 1234,5 als 1.234,50 Euro schreiben, wenn die Quelle Euro belegt und die Rundung genannt ist. Sie darf das Datum in eine lesbare Form bringen. Bedeutung und Betrag bleiben gleich."],
      ["Nicht erlaubt", "Sie darf keinen fehlenden Tag als Null Umsatz einsetzen. Null wäre eine Aussage, die die Quelle nicht hergibt. Ein leeres Feld bleibt leer und wird als fehlend markiert."],
      ["Zusammenführen", "Umsatz und Schicht stehen nebeneinander zum selben Datum. Samira addiert sie nicht zu einer Kennzahl, die niemand erklärt hat. Eine Summe braucht eine benannte Regel, sonst ist sie eine Verfälschung."],
    ],
    questions: [
      { id: "q1", prompt: "Welche Aufbereitung bleibt zulässig?", correct: "format", options: [
        { id: "format", label: "1.234,50 Euro, Regel genannt.", feedback: "Richtig. Die Schreibweise ändert den belegten Betrag nicht, wenn Währung und Rundung genannt sind." },
        { id: "null", label: "Einen fehlenden Tag als 0 Euro einsetzen, damit die Übersicht keine Lücken mehr zeigt.", feedback: "Null ist eine neue Aussage. Ein fehlender Wert bleibt fehlend und wird nicht erfunden." },
        { id: "doppelt", label: "Den Umsatz verdoppeln, weil eine Übersicht grundsätzlich gerundete Schätzungen zeigen muss.", feedback: "Eine Schätzung ohne Quelle verfälscht den Tagesumsatz. Der Betrag bleibt der belegte Wert." },
      ] },
      { id: "q2", prompt: "Was passiert mit einem fehlenden Tag?", correct: "leer", options: [
        { id: "schaetzen", label: "Samira schätzt den Umsatz aus dem Vortag, weil eine Lücke die Übersicht unbrauchbar macht.", feedback: "Eine Schätzung ist keine Quelle. Der fehlende Tag darf nicht wie ein gemessener Umsatz aussehen." },
        { id: "leer", label: "Das Feld bleibt leer und fehlend.", feedback: "Richtig. Leer und als fehlend markiert ist ehrlich. Null wäre eine falsche Aussage." },
        { id: "loeschen", label: "Sie löscht alle anderen Tage, weil ein fehlender Wert die ganze Liste ungültig macht.", feedback: "Die vorhandenen Tage bleiben gültig. Nur der fehlende Tag wird markiert." },
      ] },
      { id: "q3", prompt: "Wie stehen Umsatz und Schicht auf der Übersicht?", correct: "neben", options: [
        { id: "summe", label: "Als eine Summe aus Euro und Schichtname, weil jede Übersicht genau eine Kennzahl haben muss.", feedback: "Euro und Schichtname lassen sich nicht sinnvoll addieren. Eine unerklärte Summe verfälscht beide Quellen." },
        { id: "ersetzen", label: "Die Schicht ersetzt den Umsatz, sobald beide am selben Datum stehen.", feedback: "Keine Quelle ersetzt die andere. Der Auftrag will beide nebeneinander." },
        { id: "neben", label: "Nebeneinander zum selben Datum.", feedback: "Richtig. Gleiches Datum, getrennte Felder. Keine vermischte Kennzahl ohne benannte Regel." },
      ] },
      { id: "q4", prompt: "Wann wäre eine Summe erlaubt?", correct: "regel", options: [
        { id: "regel", label: "Wenn die Regel benannt ist.", feedback: "Richtig. Eine Summe braucht eine benannte Regel und belegte Werte. Sonst ist sie eine Verfälschung." },
        { id: "huebsch", label: "Sobald die Seite sonst zu lang wirkt, auch ohne zu sagen, was addiert wird.", feedback: "Optik ist kein Rechengrund. Unerklärte Summen bleiben draußen." },
        { id: "immer", label: "Immer, weil Zusammenführen automatisch jede Rechnung erlaubt.", feedback: "Zusammenführen heißt hier nebeneinanderstellen. Rechnen ist ein eigener, begründeter Schritt." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
