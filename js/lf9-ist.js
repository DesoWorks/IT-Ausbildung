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
        { id: "ohne", label: "Ein eigener Anschluss ist in der Beschreibung nicht belegt.", feedback: "Richtig. Fehlende Beschreibung bedeutet nicht, dass sicher kein Kabel existiert; der Anschluss bleibt ungeklärt." },
        { id: "leitung", label: "Eine nutzbare Leitung zur Theke ist aus dem Grundriss ableitbar.", feedback: "Räumliche Nähe oder ein Grundriss belegen keine nutzbare Leitung; dafür fehlen konkrete Angaben." },
        { id: "wlan", label: "Ein vorhandenes Gästenetz lässt sich aus dem Anschlusswunsch ableiten.", feedback: "Der Wunsch beschreibt den Sollzustand und beweist nicht, dass schon ein Gästenetz vorhanden ist." },
      ] },
      { id: "q2", prompt: "Wie geht Samira mit der unbekannten Leitung um?", correct: "luecke", options: [
        { id: "erfunden", label: "Sie übernimmt die vermutete Verbindung als vorhandene Leitung.", feedback: "Eine plausible Vermutung ist kein Bestandsbeleg. Sie darf nicht ungekennzeichnet ins Ist gelangen." },
        { id: "luecke", label: "Sie kennzeichnet den Leitungsbestand als noch ungeklärt.", feedback: "Richtig. Die Lücke bleibt sichtbar, bis eine passende Erhebung den tatsächlichen Bestand belegt." },
        { id: "messen", label: "Sie prüft ohne weiteren Auftrag das reale Netz per Scan.", feedback: "Die Übung erlaubt keine Prüfung realer Systeme. Zuerst wäre die Erhebung ausdrücklich abzugrenzen." },
      ] },
      { id: "q3", prompt: "Was gehört in dieser Lektion nicht zu Samiras Aufgabe?", correct: "adresse", options: [
        { id: "spalten", label: "Die Zuordnung der beschriebenen Fakten zu Ist oder Soll.", feedback: "Die Zuordnung ist Teil der Dokumentationsarbeit, keine Messung am realen Gerät." },
        { id: "notiz", label: "Den Standort der Kasse anhand der Auftragsbeschreibung.", feedback: "Dieser Standort kann aus der Beschreibung übernommen werden, ohne ein echtes Gerät zu untersuchen." },
        { id: "adresse", label: "Die tatsächlichen IP-Adressen produktiver Endgeräte.", feedback: "Richtig. Hier wird kein reales Netz untersucht; die Angaben stammen nur aus dem fiktiven Auftrag." },
      ] },
      { id: "q4", prompt: "Wohin gehört die gewünschte Trennung?", correct: "soll", options: [
        { id: "soll", label: "Zum Sollzustand mit einem später zu prüfenden Abnahmekriterium.", feedback: "Richtig. Die gewünschte Trennung ist noch kein belegter Bestand, sondern eine Zielanforderung." },
        { id: "ist", label: "Zum Istzustand, sobald die Leitung den Wunsch bestätigt hat.", feedback: "Eine bestätigte Anforderung ist weiterhin Soll. Die Umsetzung muss getrennt nachgewiesen werden." },
        { id: "weg", label: "Nur zur Maßnahmenliste, ohne sie als Zielzustand zu beschreiben.", feedback: "Maßnahmen müssen sich an einem beschriebenen Sollzustand messen lassen. Die Trennung gehört dorthin." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
