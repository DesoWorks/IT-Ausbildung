(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf7-lektion.js") : g.LF7_LEKTION;
  var api = engine.create({
    id: "lf7-zusammenfuehren", title: "Komponenten funktional zusammenführen",
    goals: ["Quelle, Ziel und Aufgabe jeder Verbindung im Funktionsplan benennen.", "Eine Datenlücke erkennen, ohne echte Komponenten anzuschließen."],
    theory: [
      ["Ein Funktionsplan statt eines Anschlussplans", "Samira bei Nordlicht IT-Service führt die Teile der erfundenen Raumklima-Station ausschließlich funktional zusammen. Sensor → Steuerung: Temperaturwert mit Einheit. Steuerung → Hinweisleuchte: ein oder aus. Steuerung → Übersichtsseite: Station, Temperatur und Zeitpunkt alle 60 Sekunden. Versorgung → Komponenten: benötigte Energie. Die Pfeile beschreiben Aufgaben, keine Klemmen oder Leitungen."],
      ["Wer entscheidet?", "Die Steuerung vergleicht einen gültigen Messwert mit der Regel: oberhalb von 26 °C Leuchte an, sonst aus. Die Übersichtsseite stellt die Daten dar; sie ist im Plan nicht die Instanz für den Grenzvergleich. Sender und Empfänger müssen das vereinbarte Protokoll sowie die Felder und Einheiten verstehen."],
      ["Fehlerfall ebenfalls planen", "Fehlt ein gültiger Sensorwert, ist die Temperatur unbekannt. Der Plan sieht eine Störungsmeldung und einen als veraltet gekennzeichneten letzten Wert vor. Der Zustand der Leuchte darf dann nicht als Beweis für eine unbedenkliche Raumtemperatur gelten. Samira markiert offene Schnittstellenfragen. Es werden keine realen Anschlüsse, Gerätezugriffe oder Änderungen durchgeführt."]
    ],
    questions: [
      { id: "q1", prompt: "Welcher Pfeil bringt den Messwert zur Entscheidung?", correct: "sensor", options: [
        { id: "seite", label: "Überschrift → Raumluft, weil ein Seitentitel ohne Sensor eine aktuelle Temperatur bereitstellt.", feedback: "Ein Seitentitel misst keine Temperatur. Der Sensor liefert den Wert an die entscheidende Steuerung." },
        { id: "sensor", label: "Sensor → Steuerung.", feedback: "Richtig. Die Steuerung erhält vom Sensor den Messwert und kann ihn mit der Grenze vergleichen." },
        { id: "leuchte", label: "Hinweisleuchte → Versorgung, weil die Leuchte den Messwert als Energiequelle erzeugt.", feedback: "Die Leuchte erzeugt keinen Temperaturmesswert. Sie setzt eine Entscheidung der Steuerung sichtbar um." }
      ] },
      { id: "q2", prompt: "Wer sendet den Ein-/Aus-Zustand an die Leuchte?", correct: "steuerung", options: [
        { id: "steuerung", label: "Die Steuerung.", feedback: "Richtig. Im Funktionsplan entscheidet die Steuerung und gibt den passenden Zustand an die Hinweisleuchte weiter." },
        { id: "papier", label: "Der gedruckte Raumname, weil jeder Text im Plan selbstständig einen Aktor ansteuern kann.", feedback: "Ein Raumname ist Kontext, keine aktive Komponente. Der Steuerpfeil führt von der Steuerung zur Leuchte." },
        { id: "netz", label: "Das Netzwerk allein, das ohne Steuerung und ohne Messwert die Raumtemperatur beurteilt.", feedback: "Das Netzwerk transportiert Daten. Die Entscheidung anhand des Messwerts bleibt Aufgabe der Steuerung." }
      ] },
      { id: "q3", prompt: "Was folgt aus einem fehlenden gültigen Sensorwert?", correct: "stoerung", options: [
        { id: "ok", label: "Der Raum ist sicher unbedenklich, weil eine fehlende Temperatur automatisch eine niedrige Temperatur ist.", feedback: "Fehlende Daten sagen nichts über eine niedrige Temperatur. Die Störung und die unbekannte Temperatur müssen erkennbar sein." },
        { id: "raten", label: "Samira erfindet einen frischen Wert und entfernt jede Kennzeichnung, damit die Seite ruhig aussieht.", feedback: "Ein erfundener Wert wäre irreführend. Der letzte Stand bleibt als veraltet markiert und die Störung wird gemeldet." },
        { id: "stoerung", label: "Störung kennzeichnen; Temperatur unbekannt.", feedback: "Richtig. Ohne gültigen Messwert ist keine aktuelle Temperatur belegt; eine Leuchte ersetzt diesen Beleg nicht." }
      ] },
      { id: "q4", prompt: "Was entsteht in dieser Lektion?", correct: "funktionsplan", options: [
        { id: "funktionsplan", label: "Ein Funktionsplan mit gerichteten Pfeilen.", feedback: "Richtig. Die Pfeile erklären, welche Komponente welche Daten oder Wirkung von welcher anderen erhält." },
        { id: "anschluss", label: "Eine tatsächlich angeschlossene Anlage mit realer elektrischer Verbindung im Gebäude des Betriebs.", feedback: "Die Übung bleibt bei Funktionen auf dem Papier. Ein echter Anschluss und eine Inbetriebnahme werden nicht durchgeführt." },
        { id: "umbau", label: "Ein Umbau der realen Gebäudetechnik, obwohl der fiktive Auftrag nur Anzeige und Hinweis umfasst.", feedback: "Gebäudetechnik gehört nicht zur Übung. Samira führt nur die erfundenen Komponenten funktional zusammen." }
      ] }
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);