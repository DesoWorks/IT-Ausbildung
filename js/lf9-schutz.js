/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf9-lektion.js") : g.LF9_LEKTION;
  var api = engine.create({
    id: "lf9-schutz", title: "Datenschutz und Datensicherheit am geplanten Dienst beurteilen",
    goals: ["Datenschutz und Datensicherheit am Gästedienst unterscheiden.", "Keine Zugangsdaten und keine personenbezogenen Gästelisten anlegen."],
    theory: [
      ["Zwei Fragen", "Datensicherheit fragt: bleibt die Kasse unerreichbar, und bleibt der Gästezugang von der Kasse getrennt? Datenschutz fragt: werden personenbezogene Angaben von Gästen überhaupt erhoben? Im Beispiel lautet die Antwort nein."],
      ["Was nicht angelegt wird", "Samira legt keine Gästeliste mit Namen, keine Kennung und kein Passwort an. Ein Zugang ohne erhobene Personendaten ist hier die schlankere Planung. Fehlt eine nötige Rechtsgrundlage, erfindet sie keine."],
      ["Grenze bleibt", "Ein funktionierender Gästezugang besteht den Schutz nicht, wenn er die Kasse sichtbar macht. Schutz ist hier die Grenze plus der Verzicht auf unnötige Personendaten, nicht ein Sammelwort."],
    ],
    questions: [
      { id: "q1", prompt: "Welche Datenschutzfrage stellt Samira?", correct: "erheben", options: [
        { id: "erheben", label: "Werden Personendaten erhoben?", feedback: "Richtig. Im Beispiel werden keine Gästenamen, Kennungen oder Passwörter angelegt. Die Frage bleibt trotzdem stehen." },
        { id: "farbe", label: "Welche Farbe das Gästenetz hat, weil die Farbe über den Personenbezug entscheidet.", feedback: "Die Farbe sagt nichts über personenbezogene Angaben. Die Frage zielt auf Erhebung, nicht auf Gestaltung." },
        { id: "marke", label: "Welche Routermarke den Datenschutz automatisch erfüllt, ohne die Erhebung zu prüfen.", feedback: "Eine Marke ersetzt die Prüfung nicht. Entscheidend ist, ob Personendaten erhoben werden." },
      ] },
      { id: "q2", prompt: "Was legt Samira für den Gästezugang nicht an?", correct: "liste", options: [
        { id: "grenze", label: "Die Grenze zur Kasse, obwohl die Trennung zum Schutz gehört.", feedback: "Die Grenze bleibt. Nicht angelegt werden Namen, Kennungen und Passwörter." },
        { id: "liste", label: "Eine Namensliste der Gäste.", feedback: "Richtig. Eine Gästeliste wäre eine unnötige Erhebung. Der Auftrag verlangt sie nicht." },
        { id: "notiz", label: "Die Notiz, dass keine Personendaten erhoben werden.", feedback: "Genau diese Notiz gehört dazu. Sie ist keine Gästeliste und kein Passwort." },
      ] },
      { id: "q3", prompt: "Wann besteht der Gästezugang den Schutz nicht?", correct: "sichtbar", options: [
        { id: "papier", label: "Sobald er nur auf Papier beschrieben ist, weil Schutz eine Installation voraussetzt.", feedback: "Die Beschreibung ist der Arbeitsstand. Nicht bestanden ist eine Planung, die die Kasse sichtbar macht." },
        { id: "zehn", label: "Sobald höchstens zehn Gäste genannt sind, weil eine Zahl den Schutz automatisch verletzt.", feedback: "Die Gästezahl ist eine Anforderung, keine Verletzung. Die Verletzung wäre ein Weg zur Kasse." },
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
