(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf7-lektion.js") : g.LF7_LEKTION;
  var api = engine.create({
    id: "lf7-pruefung", title: "Funktion, Messwert und Energiebedarf prüfen",
    goals: ["Erwartung und Beobachtung in einem fiktiven Prüfprotokoll vergleichen.", "Physikalische Betriebswerte einordnen und Energiebedarf mit P mal t plausibilisieren."],
    theory: [
      ["Prüfen mit Erwartung", "Samira bei Nordlicht IT-Service verwendet nur vorgegebene fiktive Werte der Raumklima-Station. Regel: oberhalb von 26 °C Leuchte an. Test 1: 25 °C, erwartet aus, beobachtet aus. Test 2: 26 °C, erwartet aus, beobachtet aus. Test 3: 27 °C, erwartet an, beobachtet aus: Abweichung, nicht bestanden. Test 4: kein gültiger Messwert, erwartet Störungsmeldung und veraltete Anzeige. Eine erwartete Wirkung ist noch kein beobachtetes Ergebnis."],
      ["Physikalische Betriebswerte", "Das fiktive Messprotokoll nennt 5 V und 0,2 A als konstante Mittelwerte für die gesamte Station im betrachteten Betrieb. Daraus folgt P = U × I = 1 W. Samira liest und bewertet diese Werte; sie misst nicht an einem echten Gerät. Für reale Messungen wären ein geeignetes Verfahren, passende Messmittel und fachliche Zuständigkeit nötig."],
      ["Energie plausibilisieren", "Bei konstant 1 W über 10 Stunden gilt E = P × t = 10 Wh = 0,01 kWh. W beschreibt Leistung, Wh Energie. Ein Plan mit 100 Wh für denselben Betrieb liegt um den Faktor zehn höher und muss überprüft werden. Das ist nur eine Plausibilitätsprüfung der angenommenen Werte, kein Nachweis für alle Betriebszustände oder Versorgungsverluste."],
      ["Protokoll und Verbesserung", "Samira notiert Quelle und Zeitpunkt, Ausgangslage, Eingabe, Erwartung, Beobachtung, Betriebswerte, Rechnung und Abweichung. Bei Test 3 bleibt die Abweichung offen: Im Funktionsplan sind Grenzvergleich und Steuernachricht zu prüfen; eine Ursache ist noch nicht bewiesen. Reflexion heißt hier: Was war geplant, was wurde beobachtet und welchen klaren Schritt prüfe ich als Nächstes? Erst ein erneuter Test kann die Korrektur belegen."]
    ],
    questions: [
      { id: "q1", prompt: "Bei 27 °C bleibt die Leuchte aus. Wie bewertet Samira Test 3?", correct: "abweichung", options: [
        { id: "bestanden", label: "Bestanden, weil bereits eine erwartete Wirkung auf dem Papier jedes beobachtete Ergebnis ersetzt.", feedback: "Die Erwartung war an, die Beobachtung aus. Dieser Unterschied ist eine Abweichung und kein bestandener Test." },
        { id: "egal", label: "Ohne Ergebnis, weil Beobachtungen grundsätzlich nicht in ein technisches Prüfprotokoll gehören.", feedback: "Beobachtungen sind für den Vergleich nötig. Die protokollierte Abweichung darf nicht als belanglos verschwinden." },
        { id: "abweichung", label: "Nicht bestanden; Abweichung protokollieren.", feedback: "Richtig. Die beobachtete Wirkung passt nicht zur Erwartung. Samira hält die Abweichung fest, ohne eine Ursache zu erfinden." }
      ] },
      { id: "q2", prompt: "Welche Leistung folgt im fiktiven Protokoll aus 5 V und 0,2 A?", correct: "ein", options: [
        { id: "ein", label: "1 W.", feedback: "Richtig. Für das vorgegebene Beispiel gilt P = U × I, also 5 V mal 0,2 A gleich 1 W." },
        { id: "zehn", label: "10 W, weil beim Multiplizieren eine zusätzliche Null ohne Begründung angehängt werden muss.", feedback: "5 mal 0,2 ist 1, nicht 10. Die Leistung aus diesen vorgegebenen Werten beträgt 1 W." },
        { id: "wh", label: "1 Wh als Leistung, weil die Betriebszeit beim Produkt von Spannung und Strom schon enthalten ist.", feedback: "Spannung mal Strom ergibt Leistung in W. Die Zeit kommt erst für die Energie in Wh hinzu." }
      ] },
      { id: "q3", prompt: "Wie viel Energie entsprechen konstant 1 W über 10 Stunden?", correct: "zehn", options: [
        { id: "hundert", label: "100 Wh, weil bei jeder Energieprüfung unabhängig von den Werten ein Faktor zehn ergänzt wird.", feedback: "Hier gilt 1 W mal 10 h gleich 10 Wh. 100 Wh wären bei denselben Annahmen um Faktor zehn zu hoch." },
        { id: "zehn", label: "10 Wh beziehungsweise 0,01 kWh.", feedback: "Richtig. Energie ist Leistung mal Zeit. 10 Wh sind 0,01 kWh und gelten nur für die angenommenen konstanten Werte." },
        { id: "watt", label: "10 W als Energie, weil Leistung und Energie ohne Zeitbezug immer dieselbe Einheit haben.", feedback: "W ist die Einheit der Leistung. Die Energie über eine Zeitspanne wird hier in Wh angegeben." }
      ] },
      { id: "q4", prompt: "Was macht die Prüfung nach einer Abweichung nachvollziehbar?", correct: "protokoll", options: [
        { id: "loeschen", label: "Die Beobachtung löschen und nur das gewünschte Ergebnis aufbewahren, damit der Test bestanden aussieht.", feedback: "Das würde die Abweichung verstecken. Erwartung und Beobachtung müssen getrennt erhalten bleiben." },
        { id: "raten", label: "Eine beliebige Ursache als sicher erklären, ohne den Funktionsplan oder einen erneuten Test zu prüfen.", feedback: "Eine Vermutung ist noch kein Beleg. Samira benennt einen nächsten Prüfschritt und bestätigt die Korrektur erst durch erneutes Prüfen." },
        { id: "protokoll", label: "Erwartung, Beobachtung und nächsten Schritt notieren.", feedback: "Richtig. Das Protokoll hält den Unterschied fest und macht die anschließende Prüfung nachvollziehbar." }
      ] }
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);