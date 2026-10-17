/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf8-lektion.js") : g.LF8_LEKTION;
  var api = engine.create({
    id: "lf8-recht", title: "Rechtliche Grenze und Zugriffszweck klären",
    goals: ["Zugriffszweck und rechtliche Grenze vor der Nutzung klären.", "Personenbezogene Angaben nicht ohne Zweck auf die Übersicht nehmen."],
    theory: [
      ["Zweck bindet", "Die Caféleitung darf die fiktiven Umsätze sehen, weil der Auftrag genau das verlangt. Ein Kollege ohne diesen Auftrag darf sie nicht sehen, nur weil die Datei erreichbar wäre. Erreichbar ist nicht erlaubt."],
      ["Namen sind Personen", "Die Schichttabelle enthält erfundene Namen. Ein Name weist auf eine Person hin, auch im Lernmodell. Samira nimmt Namen nur auf, wenn der Auftrag die Schichtplanung zeigen soll, und nicht in eine öffentliche Gästeansicht."],
      ["Grenze notieren", "Samira schreibt den Zweck, die Empfänger und die Grenze auf. Fehlt eine Rechtsgrundlage im Beispiel, erfindet sie keine. Sie fragt die Ausbildungsperson, statt die Übersicht trotzdem zu füllen."],
    ],
    questions: [
      { id: "q1", prompt: "Wer darf die Umsätze im Beispiel sehen?", correct: "leitung", options: [
        { id: "leitung", label: "Die Caféleitung.", feedback: "Richtig. Der Auftrag nennt die Caféleitung als Empfänger. Andere Personen bekommen die Umsätze nicht nur wegen Erreichbarkeit." },
        { id: "alle", label: "Jede Person, die die Datei technisch öffnen könnte, weil Erreichbarkeit schon die Erlaubnis ersetzt.", feedback: "Erreichbar ist nicht erlaubt. Der Zugriffszweck bleibt auf die Caféleitung begrenzt." },
        { id: "gaeste", label: "Die Gäste an der Theke, weil ein Umsatz ohne weitere Prüfung öffentlich zur Speisekarte gehört.", feedback: "Gäste sind nicht die Empfänger des Auftrags. Umsätze gehören nicht in eine öffentliche Ansicht." },
      ] },
      { id: "q2", prompt: "Warum sind Namen in der Schichttabelle heikel?", correct: "person", options: [
        { id: "zahl", label: "Weil eine Zahl in der Tabelle automatisch ein Personenbezug ist und ein Name keiner.", feedback: "Eine Zahl ohne Personenbezug ist nicht dasselbe. Hier macht der Name den Personenbezug." },
        { id: "person", label: "Ein Name weist auf eine Person hin.", feedback: "Richtig. Auch erfundene Namen im Lernmodell stehen für Personen. Sie gehören nicht in eine öffentliche Ansicht." },
        { id: "format", label: "Weil ein Tabellenblatt grundsätzlich verboten ist, unabhängig davon, welche Spalten es enthält.", feedback: "Das Format allein ist nicht das Problem. Der Personenbezug der Namensspalte ist die Grenze." },
      ] },
      { id: "q3", prompt: "Wohin gehören die Namen im Beispiel nicht?", correct: "gaeste", options: [
        { id: "plan", label: "In die interne Schichtplanung, obwohl der Auftrag genau diese Planung für die Leitung vorsieht.", feedback: "Die interne Planung ist der genannte Zweck. Die Grenze betrifft die öffentliche Ansicht." },
        { id: "notiz", label: "In Samiras interne Notiz zum Zweck, solange die Notiz nicht zur Gästeansicht wird.", feedback: "Eine interne Notiz zum Zweck ist erlaubt. Öffentlich werden die Namen dadurch nicht." },
        { id: "gaeste", label: "In eine öffentliche Gästeansicht.", feedback: "Richtig. Namen aus der Schichtplanung gehören nicht auf eine Seite, die Gäste sehen." },
      ] },
      { id: "q4", prompt: "Was tut Samira, wenn die Rechtsgrundlage fehlt?", correct: "fragen", options: [
        { id: "fragen", label: "Sie fragt und erfindet keine.", feedback: "Richtig. Eine fehlende Grundlage bleibt offen. Samira füllt die Übersicht nicht mit einer erfundenen Erlaubnis." },
        { id: "erfinden", label: "Sie schreibt eine beliebige Rechtsgrundlage in die Notiz, damit die Übersicht vollständig aussieht.", feedback: "Eine erfundene Grundlage wäre eine falsche Angabe. Die Lücke bleibt sichtbar." },
        { id: "teilen", label: "Sie gibt die Umsätze trotzdem an alle weiter, weil eine offene Frage die Weitergabe nicht aufhält.", feedback: "Ohne geklärten Zweck und ohne Empfänger gibt es keine Weitergabe. Die Frage stoppt diesen Schritt." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
