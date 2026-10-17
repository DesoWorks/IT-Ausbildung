/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf9-lektion.js") : g.LF9_LEKTION;
  var api = engine.create({
    id: "lf9-ist", title: "Den vorhandenen Zustand beschreiben, ohne ihn zu verändern",
    goals: ["Den Ist-Zustand beschreiben, ohne ihn zu ändern.", "Eine unbekannte Angabe als Lücke stehen lassen."],
    theory: [
      ["Was sichtbar ist", "Im fiktiven Café gibt es eine Kasse an der Theke und einen Besprechungsraum ohne eigenen Anschluss. Ob dazwischen schon eine Leitung liegt, ist nicht belegt. Samira schreibt unbekannt, statt eine Leitung zu erfinden."],
      ["Nicht messen", "Sie öffnet keinen Schrank, scannt kein Netz und liest keine echten Adressen ab. Der Ist-Zustand dieser Übung ist die Beschreibung aus dem Auftrag, nicht eine Untersuchung echter Geräte."],
      ["Soll ist nicht Ist", "Die gewünschte Trennung ist der Soll-Zustand. Sie steht nicht schon deshalb im Ist, weil sie gewünscht ist. Samira hält beide Spalten getrennt."],
    ],
    questions: [
      { id: "q1", prompt: "Was ist am Besprechungsraum belegt?", correct: "ohne", options: [
        { id: "ohne", label: "Kein eigener Anschluss belegt.", feedback: "Richtig. Belegt ist nur, dass kein eigener Anschluss beschrieben ist. Eine Leitung dazwischen ist unbekannt." },
        { id: "leitung", label: "Eine fertige Leitung zur Kasse, weil jeder Besprechungsraum eine haben muss.", feedback: "Die Leitung ist nicht belegt. Samira erfindet sie nicht, nur weil der Raum existiert." },
        { id: "wlan", label: "Ein bereits eingerichtetes Gästenetz, weil der Wunsch danach den Ist-Zustand ersetzt.", feedback: "Der Wunsch ist Soll. Im Ist ist kein Gästenetz beschrieben." },
      ] },
      { id: "q2", prompt: "Wie geht Samira mit der unbekannten Leitung um?", correct: "luecke", options: [
        { id: "erfunden", label: "Sie zeichnet die Leitung ein, damit der Plan vollständig aussieht.", feedback: "Eine erfundene Leitung wäre eine falsche Ist-Angabe. Die Lücke bleibt sichtbar." },
        { id: "luecke", label: "Sie schreibt unbekannt.", feedback: "Richtig. Nicht belegt bleibt unbekannt. Der Plan wird dadurch ehrlicher, nicht leerer." },
        { id: "messen", label: "Sie scannt das echte Netz der Theke, weil eine Übung ohne Scan keinen Ist-Zustand hat.", feedback: "Ein Scan echter Geräte ist ausgeschlossen. Der Ist-Zustand kommt aus der Auftragsbeschreibung." },
      ] },
      { id: "q3", prompt: "Was misst Samira in dieser Lektion nicht?", correct: "adresse", options: [
        { id: "spalten", label: "Die Trennung von Ist und Soll, obwohl genau das die Aufgabe der Notiz ist.", feedback: "Die Trennung der Spalten ist die Aufgabe. Gemessen werden keine echten Adressen." },
        { id: "notiz", label: "Die sichtbare Kasse an der Theke, soweit der Auftrag sie beschreibt.", feedback: "Die beschriebene Kasse darf in der Ist-Spalte stehen. Eine Messung am Gerät findet nicht statt." },
        { id: "adresse", label: "Echte Adressen.", feedback: "Richtig. Sie liest keine echten Adressen ab, öffnet keinen Schrank und scannt kein Netz." },
      ] },
      { id: "q4", prompt: "Wohin gehört die gewünschte Trennung?", correct: "soll", options: [
        { id: "soll", label: "In die Soll-Spalte.", feedback: "Richtig. Gewünscht ist nicht vorhanden. Die Trennung bleibt Soll, bis sie belegt wäre." },
        { id: "ist", label: "In die Ist-Spalte, weil ein Kundenwunsch den vorhandenen Zustand automatisch verändert.", feedback: "Ein Wunsch ändert den Ist-Zustand nicht. Beide Spalten bleiben getrennt." },
        { id: "weg", label: "In keine Spalte, weil eine gewünschte Trennung in einer Planung nicht vorkommen darf.", feedback: "Die Trennung ist der Auftrag. Sie gehört in die Soll-Spalte, nicht ins Ist." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
