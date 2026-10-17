/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf9-lektion.js") : g.LF9_LEKTION;
  var api = engine.create({
    id: "lf9-schutz", title: "Datenschutz und Datensicherheit am geplanten Dienst beurteilen",
    goals: ["Datenschutz und Datensicherheit am Gästedienst unterscheiden.", "Unnötige Namenslisten von nötigen Schutzmaßnahmen unterscheiden."],
    theory: [
      ["Zwei Fragen", "Datensicherheit fragt: bleibt die Kasse unerreichbar, und bleibt der Gästezugang von der Kasse getrennt? Datenschutz fragt: welche personenbezogenen Angaben fallen an? Im Beispiel ist keine Namensliste geplant. Technisch anfallende Daten wie IP-Adressen oder Protokolle können im echten Betrieb trotzdem Personenbezug haben (DSGVO Art. 4 Nr. 1, Erwägungsgrund 30). Sie und ihre Speicherfristen sind vor der Umsetzung zu prüfen. Das ist keine Rechtsberatung."],
      ["Was nicht angelegt wird", "Samira legt in dieser Übung keine echten Konten oder Passwörter und keine Gästeliste mit Namen an. Der Verzicht auf eine zusätzliche Namensliste bedeutet nicht, dass Authentisierung oder Verschlüsselung unerwünscht sind. Solche Schutzmaßnahmen sind für den späteren Betrieb gesondert zu planen. Fehlt eine nötige Rechtsgrundlage, erfindet sie keine."],
      ["Grenze bleibt", "Ein funktionierender Gästezugang besteht den Schutz nicht, wenn er die Kasse sichtbar macht. Schutz ist hier die Grenze plus der Verzicht auf unnötige Personendaten und die Prüfung technisch anfallender Daten, nicht ein Sammelwort."],
    ],
    questions: [
      { id: "q1", prompt: "Welche Datenschutzfrage stellt Samira?", correct: "erheben", options: [
        { id: "erheben", label: "Welche personenbezogenen Angaben fallen an?", feedback: "Richtig. Im Beispiel ist keine Namensliste geplant. Technisch anfallende Daten wie IP-Adressen oder Protokolle sind vor der Umsetzung trotzdem zu prüfen." },
        { id: "farbe", label: "Welche Farbe das Gästenetz hat, weil die Farbe über den Personenbezug entscheidet.", feedback: "Die Farbe sagt nichts über personenbezogene Angaben. Die Frage zielt auf Erhebung, nicht auf Gestaltung." },
        { id: "marke", label: "Welche Routermarke den Datenschutz automatisch erfüllt, ohne die Erhebung zu prüfen.", feedback: "Eine Marke ersetzt die Prüfung nicht. Entscheidend ist, ob Personendaten erhoben werden." },
      ] },
      { id: "q2", prompt: "Was legt Samira für den Gästezugang nicht an?", correct: "liste", options: [
        { id: "grenze", label: "Die Grenze zur Kasse, obwohl die Trennung zum Schutz gehört.", feedback: "Die Grenze bleibt. Eine unnötige Namensliste entfällt; Authentisierung und Verschlüsselung werden dadurch nicht ausgeschlossen." },
        { id: "liste", label: "Eine Namensliste der Gäste.", feedback: "Richtig. Eine Gästeliste wäre eine unnötige Erhebung. Der Auftrag verlangt sie nicht." },
        { id: "notiz", label: "Die Notiz, dass keine Namensliste geplant ist.", feedback: "Genau diese Notiz gehört dazu. Sie ist keine Gästeliste und kein Passwort." },
      ] },
      { id: "q3", prompt: "Wann besteht der Gästezugang den Schutz nicht?", correct: "sichtbar", options: [
        { id: "papier", label: "Sobald er nur auf Papier beschrieben ist, weil Schutz eine Installation voraussetzt.", feedback: "Die Beschreibung ist der Arbeitsstand. Nicht bestanden ist eine Planung, die die Kasse sichtbar macht." },
        { id: "zehn", label: "Sobald zehn gleichzeitige Endgeräte genannt sind, weil eine Zahl den Schutz automatisch verletzt.", feedback: "Die Mindestkapazität ist eine Anforderung, keine Verletzung. Die Verletzung wäre ein Weg zur Kasse." },
        { id: "sichtbar", label: "Wenn er die Kasse sichtbar macht.", feedback: "Richtig. Funktion für Gäste ersetzt die Grenze nicht. Sichtbare Kasse bedeutet nicht bestanden." },
      ] },
      { id: "q4", prompt: "Was tut Samira, wenn eine Rechtsgrundlage fehlt?", correct: "nicht", options: [
        { id: "nicht", label: "Sie erfindet keine.", feedback: "Richtig. Eine fehlende Grundlage bleibt offen. Samira schreibt keine erfundene Erlaubnis in die Notiz." },
        { id: "erfinden", label: "Sie setzt eine beliebige Grundlage ein, damit die Schutzseite vollständig aussieht.", feedback: "Eine erfundene Grundlage wäre eine falsche Angabe. Die Lücke bleibt sichtbar." },
        { id: "liste", label: "Sie legt vorsorglich eine Gästeliste an, weil fehlende Grundlagen durch mehr Daten geheilt werden.", feedback: "Mehr Daten heilen keine fehlende Grundlage. Die Liste wird nicht angelegt." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
