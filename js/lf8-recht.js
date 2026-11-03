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
        { id: "leitung", label: "Die Caféleitung laut vereinbartem Übersichtsauftrag.", feedback: "Richtig. Das ist der festgelegte Empfänger im Modell, keine allgemeine rechtliche Erlaubnis." },
        { id: "alle", label: "Das Kassenteam mit technischem Zugriff auf den Export.", feedback: "Technischer Zugriff erweitert den Empfängerkreis des Auftrags nicht auf das gesamte Kassenteam." },
        { id: "gaeste", label: "Die Gäste als Empfänger einer anonymen Umsatzstatistik.", feedback: "Eine öffentliche Statistik ist nicht beauftragt. Die Übersicht richtet sich an die Caféleitung." },
      ] },
      { id: "q2", prompt: "Warum behandelt das Beispiel Namen in der Schichttabelle vorsichtig?", correct: "person", options: [
        { id: "zahl", label: "Weil jede Zeile mit einer Personenzahl personenbezogen ist.", feedback: "Eine bloße Anzahl ist nicht automatisch personenbezogen. Die mögliche Identifizierbarkeit ist maßgeblich." },
        { id: "person", label: "Weil echte Mitarbeiternamen Menschen identifizierbar machen.", feedback: "Richtig. Die erfundenen Namen gehören niemandem, werden zum Lernen aber wie echte Angaben behandelt." },
        { id: "format", label: "Weil personenbezogene Angaben nur in Datenbanken erlaubt sind.", feedback: "Dateiformat oder Tabellenblatt entscheiden nicht über die Zulässigkeit personenbezogener Verarbeitung." },
      ] },
      { id: "q3", prompt: "Wohin gehören die Namen im Beispiel nicht?", correct: "gaeste", options: [
        { id: "plan", label: "In die vereinbarte interne Planung für die Leitung.", feedback: "Im Modell ist diese interne Planung der vorgesehene Zweck. Gefragt ist die öffentliche Grenze." },
        { id: "notiz", label: "In die zweckgebundene interne Arbeitsnotiz des Modells.", feedback: "Eine zweckgebundene interne Arbeitsnotiz ist im Modell vorgesehen, keine öffentliche Anzeige." },
        { id: "gaeste", label: "In die öffentlich lesbare Tagesansicht für Cafébesucher.", feedback: "Richtig. Öffentlichkeit ist nicht der vereinbarte Zweck der internen Schichtnamen im Beispiel." },
      ] },
      { id: "q4", prompt: "Was tut Samira, wenn die Rechtsgrundlage fehlt?", correct: "fragen", options: [
        { id: "fragen", label: "Sie hält die Verarbeitung an und lässt die Grundlage klären.", feedback: "Richtig. Auftrag und Berechtigung ersetzen keine fehlende rechtliche Grundlage der Verarbeitung." },
        { id: "erfinden", label: "Sie übernimmt die Rechtsgrundlage eines ähnlichen Projekts.", feedback: "Eine fremde Rechtsgrundlage passt nicht automatisch zum konkreten Zweck und muss geprüft werden." },
        { id: "teilen", label: "Sie startet intern und klärt die Grundlage vor Veröffentlichung.", feedback: "Auch interne personenbezogene Verarbeitung braucht eine geklärte Grundlage, nicht erst Veröffentlichung." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
