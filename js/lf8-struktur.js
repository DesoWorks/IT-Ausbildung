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
        { id: "farbe", label: "Die Farbe der Kasse, weil das Gehäuse die Bedeutung von Datum und Umsatz festlegt.", feedback: "Die Gehäusefarbe sagt nichts über Felder. Struktur meint hier Datum und Umsatz." },
        { id: "felder", label: "Datum und Umsatz.", feedback: "Richtig. Die Struktur nennt die Felder der Liste. Format und Zugriff sind davon getrennt." },
        { id: "recht", label: "Nur, wer die Liste öffnen darf, ohne die Felder selbst zu benennen.", feedback: "Wer öffnen darf, ist der Zugriff. Die Struktur benennt die Felder." },
      ] },
      { id: "q2", prompt: "Welches Format hat die Kassenliste im Beispiel?", correct: "liste", options: [
        { id: "bild", label: "Ein Foto der Theke, weil jedes Bild automatisch Datum und Umsatz als Felder enthält.", feedback: "Ein Foto ist kein Datenformat für Datum und Umsatz. Im Beispiel ist es eine kommagetrennte Liste." },
        { id: "seite", label: "Die Übersichtsseite selbst, obwohl sie die Liste erst anzeigen und nicht erzeugen soll.", feedback: "Die Seite ist das Ziel der Anzeige. Das Format der Quelle ist die kommagetrennte Liste." },
        { id: "liste", label: "Eine kommagetrennte Liste.", feedback: "Richtig. Datum und Umsatz stehen im Beispiel als kommagetrennte Liste, nicht als Bild und nicht als Seite." },
      ] },
      { id: "q3", prompt: "Welcher Zugriff ist im Papierplan vorgesehen?", correct: "lesen", options: [
        { id: "schreiben", label: "Jede Person im Café darf die Umsatzliste ändern, weil Lesen und Schreiben dasselbe sind.", feedback: "Ändern ist nicht vorgesehen. Der Plan erlaubt nur lesenden Zugriff für die Caféleitung." },
        { id: "lesen", label: "Nur lesen, nur die Caféleitung.", feedback: "Richtig. Der Papierplan sieht lesenden Zugriff nur für die Caféleitung vor. Das ist noch keine echte Freigabe." },
        { id: "offen", label: "Die Liste liegt ohne jede Einschränkung offen, weil ein Papierplan keinen Zugriff beschreiben kann.", feedback: "Der Plan beschreibt den Zugriff ausdrücklich. Offen für alle ist nicht die vorgesehene Regel." },
      ] },
      { id: "q4", prompt: "Was tut Samira, wenn die Währung fehlt?", correct: "luecke", options: [
        { id: "luecke", label: "Sie notiert die Lücke.", feedback: "Richtig. Eine fehlende Angabe bleibt sichtbar. Samira erfindet keine Währung, damit die Liste vollständig wirkt." },
        { id: "euro", label: "Sie setzt Euro ein, weil jede Kasse in diesem Lernmodell automatisch Euro führen muss.", feedback: "Die Währung ist nicht belegt. Sie zu erfinden würde die Quelle verfälschen." },
        { id: "loeschen", label: "Sie löscht die ganze Liste, weil eine einzige fehlende Angabe alle anderen Felder ungültig macht.", feedback: "Die übrigen Felder bleiben beschreibbar. Nur die fehlende Angabe wird als Lücke markiert." },
      ] },
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
