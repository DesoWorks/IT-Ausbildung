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
        { id: "erheben", label: "Welche Daten einschließlich IP-Adressen und Protokollen fallen an?", feedback: "Richtig. Auch ohne Namensliste sind technisch anfallende Daten und mögliche Personenbezüge zu prüfen." },
        { id: "farbe", label: "Welche Verschlüsselung schützt den Funkzugang vor Mitlesen?", feedback: "Das ist zunächst eine Sicherheitsmaßnahme. Die Datenarten und Zwecke der Verarbeitung bleiben zu klären." },
        { id: "marke", label: "Welche Firewallregel sperrt die Kasse aus dem Gästenetz?", feedback: "Die Regel betrifft Zugriffsschutz. Sie beantwortet nicht, welche personenbezogenen Daten verarbeitet werden." },
      ] },
      { id: "q2", prompt: "Was legt Samira für den Gästezugang nicht an?", correct: "liste", options: [
        { id: "grenze", label: "Die geplante Zugriffsgrenze zum Kassensystem.", feedback: "Diese Grenze bleibt erforderlich. Verzicht auf Namenslisten hebt nötige Schutzmaßnahmen nicht auf." },
        { id: "liste", label: "Eine zusätzliche Liste der Gästenamen ohne benötigten Zweck.", feedback: "Richtig. Für den Auftrag wird keine Namensliste benötigt; technische Daten sind gesondert zu prüfen." },
        { id: "notiz", label: "Eine Notiz zu anfallenden technischen Daten und offenen Fragen.", feedback: "Diese Dokumentation ist sinnvoll und keine unnötige Gästeliste. Die offenen Datenschutzfragen bleiben sichtbar." },
      ] },
      { id: "q3", prompt: "Wann besteht der Gästezugang den Schutz nicht?", correct: "sichtbar", options: [
        { id: "papier", label: "Wenn der Entwurf die Trennung beschreibt, aber noch nicht installiert ist.", feedback: "Ein Plan ist noch kein Installationsnachweis. Sein Schutzkriterium ist dadurch aber nicht schon verletzt." },
        { id: "zehn", label: "Wenn der Pool mehr als zehn gleichzeitige Endgeräte zulässt.", feedback: "Zehn ist eine Mindestkapazität, keine harte Obergrenze. Mehr Kapazität beweist keinen Schutzfehler." },
        { id: "sichtbar", label: "Wenn Gäste das Kassensystem trotz funktionierender Verbindung erreichen.", feedback: "Richtig. Die Gästeverbindung muss funktionieren und zugleich die vereinbarte Zugriffsgrenze einhalten." },
      ] },
      { id: "q4", prompt: "Was tut Samira, wenn eine Rechtsgrundlage fehlt?", correct: "nicht", options: [
        { id: "nicht", label: "Sie lässt die Grundlage vor der betroffenen Verarbeitung klären.", feedback: "Richtig. Eine offene rechtliche Voraussetzung bleibt ein offener Punkt und wird nicht erfunden." },
        { id: "erfinden", label: "Sie übernimmt die Standardklausel eines anderen Gästeportals.", feedback: "Eine fremde Standardklausel belegt keine passende Rechtsgrundlage für den eigenen Verarbeitungszweck." },
        { id: "liste", label: "Sie erhebt zunächst nur Namen und prüft die Grundlage später.", feedback: "Auch eine kleine Namensliste ist Verarbeitung. Weniger Daten ersetzen keine notwendige Grundlage." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
