/* Fiktives Lernbeispiel, keine reale Anlage und kein Produktivsystem. */
(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf8-lektion.js") : g.LF8_LEKTION;
  var api = engine.create({
    id: "lf8-struktur", title: "Struktur, Format und Zugriff einer Quelle beschreiben",
    goals: ["Struktur, Format und Zugriff getrennt benennen.", "Eine fehlende Angabe als Lücke stehen lassen."],
    theory: [
      ["Drei Angaben", "Die fiktive Kasse liefert je Tag ein Datum und einen Umsatz in Euro, als kommagetrennte Liste. Der Zugriff ist im Papierplan nur lesend und nur für die Caféleitung vorgesehen. Struktur sagt, welche Felder es gibt. Format sagt, wie sie geschrieben sind. Zugriff sagt, wer sie lesen darf."],
      ["Die Tabelle", "Die fiktive Schichttabelle hat die Spalten Datum, Name und Schicht. Sie liegt als Tabellenblatt vor. Ein Name in der Tabelle ist eine erfundene Rolle, keine echte Person. Samira notiert das, statt einen echten Namen einzusetzen."],
      ["Lücke stehen lassen", "Wenn die Kasse die Währung nicht nennt, erfindet Samira kein Eurozeichen. Sie schreibt die Lücke auf. Eine hübsche Übersicht repariert eine fehlende Angabe nicht."],
    ],
    questions: [
      { id: "q1", prompt: "Was beschreibt die Struktur der Kassenliste?", correct: "felder", options: [
        { id: "farbe", label: "Kommas und Zeilenumbrüche der Datei.", feedback: "Das beschreibt die Serialisierung bzw. das Format, nicht die inhaltlichen Felder der Struktur." },
        { id: "felder", label: "Felder wie Datum und Tagesumsatz.", feedback: "Richtig. Die Struktur benennt die Datenfelder; Format und Zugriffsrecht sind getrennte Angaben." },
        { id: "recht", label: "Leseberechtigung der Caféleitung.", feedback: "Die Leseberechtigung beschreibt Zugriff, nicht die Felder, die eine Zeile der Quelle enthält." },
      ] },
      { id: "q2", prompt: "Welches Format hat die Kassenliste im Beispiel?", correct: "liste", options: [
        { id: "bild", label: "Ein JSON-Array mit benannten Feldern.", feedback: "JSON wird im Labor für die Schichten verwendet. Die Kassenliste ist im Beispiel CSV." },
        { id: "seite", label: "Eine HTML-Tabelle mit Tageszeilen.", feedback: "HTML kann das Anzeigeziel darstellen, ist hier aber nicht das Format der Kassenquelle." },
        { id: "liste", label: "Eine CSV-Datei mit kommagetrennten Feldern.", feedback: "Richtig. Die Kassenquelle ist kommagetrennt; Struktur, Format und Anzeigeziel sind zu unterscheiden." },
      ] },
      { id: "q3", prompt: "Welcher Zugriff ist im Papierplan vorgesehen?", correct: "lesen", options: [
        { id: "schreiben", label: "Die Leitung darf Umsatzwerte in der Quelle berichtigen.", feedback: "Eine Schreibberechtigung ist nicht vorgesehen. Der Papierplan nennt nur lesenden Zugriff." },
        { id: "lesen", label: "Die Caféleitung erhält ausschließlich lesenden Zugriff.", feedback: "Richtig. Das ist die geplante Leseregel, noch keine tatsächlich eingerichtete Berechtigung." },
        { id: "offen", label: "Alle Beschäftigten erhalten lesenden Zugriff auf die Liste.", feedback: "Lesen allein reicht als Einschränkung nicht: Als Empfänger ist nur die Caféleitung festgelegt." },
      ] },
      { id: "q4", prompt: "Was tut Samira, wenn die Währung fehlt?", correct: "luecke", options: [
        { id: "luecke", label: "Sie markiert die fehlende Einheit und klärt sie vor Nutzung.", feedback: "Richtig. Ohne belegte Währung darf der Zahlenwert nicht still als Euro interpretiert werden." },
        { id: "euro", label: "Sie übernimmt EUR aus den Spracheinstellungen des Rechners.", feedback: "Die Rechnersprache belegt keine Währung der Quelldaten. Die Einheit muss geklärt werden." },
        { id: "loeschen", label: "Sie entfernt die Einheit und zeigt den Betrag ohne Hinweis.", feedback: "Dadurch verschwindet die Lücke nur optisch. Die Einheit und die offene Frage bleiben nötig." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
