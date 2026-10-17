/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf8-lektion.js") : g.LF8_LEKTION;
  var api = engine.create({
    id: "lf8-konzept", title: "Ein Bereitstellungskonzept mit Schutzbedarf skizzieren",
    goals: ["Empfänger, Inhalt und Schutzbedarf in einem Konzept nennen.", "Ein Konzept von einer fertigen Einrichtung unterscheiden."],
    theory: [
      ["Was das Konzept sagt", "Samiras Papierkonzept nennt Empfänger, Inhalt, Quelle, Aktualisierung und Schutzbedarf. Empfänger ist die Caféleitung. Inhalt sind Tagesumsatz und geplante Schichten. Die Aktualisierung ist einmal am Tagesende, nicht live. Das ist eine Skizze, keine eingerichtete Seite."],
      ["Schutzbedarf", "Umsätze sollen vertraulich bleiben und unverändert ankommen. Die Übersicht soll an Werktagen für die Leitung verfügbar sein. Vertraulichkeit, Integrität und Verfügbarkeit werden getrennt notiert, nicht als ein Wort abgehakt."],
      ["Nicht einrichten", "Samira richtet kein Konto ein, vergibt kein Passwort und schaltet keine Freigabe. Wer das Konzept später umsetzt, braucht eine eigene Freigabe. Diese Lektion endet bei der Skizze."],
    ],
    questions: [
      { id: "q1", prompt: "Wer ist der Empfänger im Papierkonzept?", correct: "leitung", options: [
        { id: "leitung", label: "Die Caféleitung für ihre interne Tagesübersicht.", feedback: "Richtig. Das Konzept nennt diese interne Zielgruppe, nicht alle Beschäftigten oder Besucher." },
        { id: "alle", label: "Alle Beschäftigten für ihre eigene Schichtauswertung.", feedback: "Das wäre ein erweiterter Empfängerkreis. Beauftragt ist hier die Tagesübersicht für die Leitung." },
        { id: "gaeste", label: "Die Gäste für eine öffentlich lesbare Tagesstatistik.", feedback: "Eine öffentliche Tagesstatistik ist nicht vereinbart und entspricht nicht dem genannten Schutzbedarf." },
      ] },
      { id: "q2", prompt: "Wie oft soll die Übersicht im Konzept aktualisiert werden?", correct: "ende", options: [
        { id: "live", label: "Nach jedem neuen Kassenumsatz.", feedback: "Echtzeitaktualisierung wäre eine zusätzliche Anforderung und nicht der vereinbarte Tagesendstand." },
        { id: "ende", label: "Täglich nach Ende des Geschäftstags.", feedback: "Richtig. Das Konzept sieht einen Tagesendstand vor, keine dauerhafte Live-Verbindung." },
        { id: "nie", label: "Einmalig beim Erstellen der Übersicht.", feedback: "Eine einmalige Aktualisierung würde spätere Tage nicht abbilden und verfehlt den vorgesehenen Takt." },
      ] },
      { id: "q3", prompt: "Welche Schutzziele notiert Samira getrennt?", correct: "drei", options: [
        { id: "farbe", label: "Authentisierung, Verschlüsselung und Datensicherung.", feedback: "Das sind mögliche Maßnahmen. Gefragt sind die Ziele, denen die Maßnahmen dienen sollen." },
        { id: "einwort", label: "Benutzerfreundlichkeit, Tempo und geringer Speicherbedarf.", feedback: "Das sind Qualitätsaspekte, aber nicht die drei hier getrennt betrachteten Informationsschutzziele." },
        { id: "drei", label: "Vertraulichkeit, Integrität und Verfügbarkeit der Daten.", feedback: "Richtig. Nur die Leitung soll lesen, Werte sollen unverändert und im vereinbarten Zeitraum verfügbar sein." },
      ] },
      { id: "q4", prompt: "Was ist das Konzept in dieser Lektion nicht?", correct: "live", options: [
        { id: "live", label: "Eine bereits eingerichtete produktive Übersichtsseite.", feedback: "Richtig. Das Konzept beschreibt den Sollzustand, ohne dessen Umsetzung oder Freigabe nachzuweisen." },
        { id: "skizze", label: "Eine Skizze der vorgesehenen Datenanzeige.", feedback: "Die Skizze ist ein zulässiges Konzeptprodukt; sie beschreibt, was später dargestellt werden soll." },
        { id: "notiz", label: "Eine Beschreibung der Empfänger und Schutzziele.", feedback: "Empfänger und Schutzziele gehören zum Konzept und sind noch kein Nachweis eines laufenden Systems." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
