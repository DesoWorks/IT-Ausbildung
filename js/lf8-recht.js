/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf8-lektion.js") : g.LF8_LEKTION;
  var api = engine.create({
    id: "lf8-recht", title: "Rechtliche Grenze und Zugriffszweck klären",
    goals: ["Auftrag, Leseberechtigung und rechtliche Prüfung auseinanderhalten.", "Personenbezogene Angaben nicht ohne Zweck auf die Übersicht nehmen."],
    theory: [
      ["Auftrag, Berechtigung, Rechtsgrundlage", "Im Beispiel ist die Caféleitung als Empfänger der fiktiven Umsätze festgelegt, weil der Auftrag das vorsieht. Das ist eine Modellannahme für diese Übung und sagt, wer lesen soll. Ein Kollege ohne diesen Auftrag bekommt die Umsätze nicht, nur weil die Datei erreichbar wäre: Erreichbar ist nicht berechtigt. Ob eine Verarbeitung personenbezogener Daten im echten Betrieb zulässig ist, ist eine eigene rechtliche Prüfung. Ein Kundenauftrag ersetzt sie nicht."],
      ["Namen und Personenbezug", "Die Schichttabelle enthält erfundene Namen. Namen echter Mitarbeitender wären personenbezogene Angaben, weil sie identifizierbare Menschen betreffen (DSGVO Art. 4 Nr. 1). Die Namen im Beispiel gehören zu keiner realen Person. Die Übung behandelt sie trotzdem wie echte Angaben, damit der richtige Umgang geübt wird. Samira nimmt Namen nur auf, wenn der Auftrag die Schichtplanung zeigen soll, und nie in eine öffentliche Gästeansicht."],
      ["Grenze notieren", "Samira schreibt Zweck, Empfänger und Grenze auf und trennt dabei drei Dinge: die Modellannahme des Beispiels, die interne Leseberechtigung und die rechtliche Prüfung. Fehlt im Beispiel eine Rechtsgrundlage, erfindet sie keine und gibt keine Rechtsberatung. Sie fragt die Ausbildungsperson, statt die Übersicht trotzdem zu füllen."],
    ],
    questions: [
      { id: "q1", prompt: "Wer ist im Beispiel als Empfänger der Umsätze festgelegt?", correct: "leitung", options: [
        { id: "leitung", label: "Die Caféleitung.", feedback: "Richtig. Der Auftrag legt die Caféleitung als Empfänger fest. Andere Personen bekommen die Umsätze nicht nur wegen Erreichbarkeit." },
        { id: "alle", label: "Jede Person, die die Datei technisch öffnen könnte, weil Erreichbarkeit schon die Erlaubnis ersetzt.", feedback: "Erreichbar ist nicht berechtigt. Die Leseberechtigung bleibt im Beispiel auf die Caféleitung begrenzt." },
        { id: "gaeste", label: "Die Gäste an der Theke, weil ein Umsatz ohne weitere Prüfung öffentlich zur Speisekarte gehört.", feedback: "Gäste sind nicht die Empfänger des Auftrags. Umsätze gehören nicht in eine öffentliche Ansicht." },
      ] },
      { id: "q2", prompt: "Warum behandelt das Beispiel Namen in der Schichttabelle vorsichtig?", correct: "person", options: [
        { id: "zahl", label: "Weil eine Zahl in der Tabelle automatisch ein Personenbezug ist und ein Name keiner.", feedback: "Eine Zahl ist nicht automatisch personenbezogen, ein Name echter Menschen kann es sein. Die Namensspalte ist der heikle Punkt." },
        { id: "person", label: "Im echten Betrieb wären sie personenbezogen.", feedback: "Richtig. Namen echter Mitarbeitender wären personenbezogene Angaben. Die erfundenen Namen gehören zu keiner realen Person, werden aber wie echte behandelt und nicht öffentlich gezeigt." },
        { id: "format", label: "Weil ein Tabellenblatt grundsätzlich verboten ist, unabhängig davon, welche Spalten es enthält.", feedback: "Das Format allein ist nicht das Problem. Der mögliche Personenbezug der Namensspalte ist die Grenze." },
      ] },
      { id: "q3", prompt: "Wohin gehören die Namen im Beispiel nicht?", correct: "gaeste", options: [
        { id: "plan", label: "In die interne Schichtplanung, obwohl der Auftrag genau diese Planung für die Leitung vorsieht.", feedback: "Die interne Planung ist der genannte Zweck. Die Grenze betrifft die öffentliche Ansicht." },
        { id: "notiz", label: "In Samiras interne Notiz zum Zweck, solange die Notiz nicht zur Gästeansicht wird.", feedback: "Eine interne Notiz zum Zweck ist erlaubt. Öffentlich werden die Namen dadurch nicht." },
        { id: "gaeste", label: "In eine öffentliche Gästeansicht.", feedback: "Richtig. Namen aus der Schichtplanung gehören nicht auf eine Seite, die Gäste sehen." },
      ] },
      { id: "q4", prompt: "Was tut Samira, wenn die Rechtsgrundlage fehlt?", correct: "fragen", options: [
        { id: "fragen", label: "Sie fragt und erfindet keine.", feedback: "Richtig. Eine fehlende Grundlage bleibt offen. Der Auftrag der Caféleitung ersetzt die rechtliche Prüfung nicht, und Samira erfindet keine Erlaubnis." },
        { id: "erfinden", label: "Sie schreibt eine beliebige Rechtsgrundlage in die Notiz, damit die Übersicht vollständig aussieht.", feedback: "Eine erfundene Grundlage wäre eine falsche Angabe. Die Lücke bleibt sichtbar." },
        { id: "teilen", label: "Sie gibt die Umsätze trotzdem an alle weiter, weil eine offene Frage die Weitergabe nicht aufhält.", feedback: "Ohne geklärten Zweck und ohne Empfänger gibt es keine Weitergabe. Die Frage stoppt diesen Schritt." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
