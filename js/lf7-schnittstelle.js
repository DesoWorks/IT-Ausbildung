(function (g) {
  "use strict";
  var engine = typeof module !== "undefined" && module.exports ? require("./lf7-lektion.js") : g.LF7_LEKTION;
  var api = engine.create({
    id: "lf7-schnittstelle", title: "Den Datenfluss an der Schnittstelle beschreiben",
    goals: ["Messwert, Einheit, Zeitpunkt und Kennung gemeinsam beschreiben.", "Eine vorgesehene Netzwerkverbindung von einer echten Verbindung unterscheiden."],
    theory: [
      ["Von der Luft zum Datensatz", "Samira beschreibt für Nordlicht IT-Service die erfundene Raumklima-Station: Lufttemperatur → Sensor → digitaler Messwert → Steuerung → Übersichtsseite. Die physisch-digitale Schnittstelle ist der Übergang von der gemessenen Größe zum digitalen Wert. Ein Beispiel-Datensatz lautet: Station R1, Temperatur 27,0 °C, Zeitpunkt 10:00. Einheit und Zeitpunkt verhindern Fehlinterpretationen."],
      ["Kommunikation im bestehenden Netzwerk", "Im reinen Papierplan sendet die Steuerung alle 60 Sekunden einen Datensatz über eine vorgesehene, bereits freigegebene lokale Netzwerkverbindung an die Übersichtsseite. Beide Seiten müssen dieselben Feldnamen, Einheiten und ein gemeinsam unterstütztes Nachrichtenprotokoll verstehen. Ein Protokoll regelt den Austausch von Nachrichten. Wir richten kein Netzwerk ein und verbinden uns mit keinem Gerät."],
      ["Fehlende und alte Daten", "Die Übersichtsseite kennzeichnet einen fehlenden neuen Wert als veraltet, statt den letzten Wert als frisch auszugeben. Die Steuerung entscheidet über den Leuchthinweis; die Übersichtsseite stellt die empfangenen Daten dar. Samira notiert Quelle, Ziel, Richtung und Takt des Datenflusses."]
    ],
    questions: [
      { id: "q1", prompt: "Welche Beschreibung macht den Wert 27,0 verständlich?", correct: "kontext", options: [
        { id: "zahl", label: "Nur die Zahl ohne Einheit oder Zeitpunkt, weil alle Empfänger automatisch dieselbe Deutung kennen.", feedback: "Eine nackte Zahl kann falsch gedeutet werden. Einheit, Station und Zeitpunkt liefern den benötigten Kontext." },
        { id: "kontext", label: "R1, 27,0 °C, 10:00.", feedback: "Richtig. Kennung, Einheit und Zeitpunkt machen Quelle, Bedeutung und Alter des Messwerts erkennbar." },
        { id: "farbe", label: "Nur eine beliebige Hintergrundfarbe der Übersichtsseite ohne Aussage zur gemessenen Größe.", feedback: "Eine beliebige Farbe ersetzt weder Messwert noch Einheit oder Zeitpunkt. Der Datensatz muss verständlich bleiben." }
      ] },
      { id: "q2", prompt: "Wo liegt der physisch-digitale Übergang?", correct: "uebergang", options: [
        { id: "uebergang", label: "Von der Temperatur zum digitalen Messwert.", feedback: "Richtig. Der Sensor überführt die physische Größe in einen Wert, den die Steuerung verarbeiten kann." },
        { id: "seite", label: "Beim Umbenennen einer Überschrift, weil dadurch ohne Sensor neue Temperaturdaten entstehen.", feedback: "Eine Überschrift verändert die Darstellung. Der physisch-digitale Übergang entsteht bei der Erfassung der Temperatur." },
        { id: "raum", label: "Bei der Auswahl des Raumnamens im Plan, unabhängig von jeder Erfassung einer physischen Größe.", feedback: "Der Raumname ist Kontext. Der Übergang erfordert die Erfassung der physischen Größe als digitalen Wert." }
      ] },
      { id: "q3", prompt: "Worauf müssen sich Sender und Empfänger verständigen?", correct: "format", options: [
        { id: "farbe", label: "Nur auf dieselbe Gehäusefarbe, dann werden Nachrichten in jedem beliebigen Format verstanden.", feedback: "Die Gehäusefarbe bestimmt keine Verständigung. Beide Seiten brauchen passende Datenfelder und ein unterstütztes Protokoll." },
        { id: "werbung", label: "Nur auf eine gemeinsame Werbeüberschrift, weil technische Regeln den Austausch nicht beeinflussen.", feedback: "Eine Überschrift ist keine Austauschregel. Protokoll, Datenfelder und Einheiten müssen zueinander passen." },
        { id: "format", label: "Protokoll, Datenfelder und Einheiten.", feedback: "Richtig. Das Protokoll regelt Nachrichten; gemeinsame Felder und Einheiten sichern deren verständliche Bedeutung." }
      ] },
      { id: "q4", prompt: "Was zeigt die Seite, wenn kein neuer Wert eintrifft?", correct: "alt", options: [
        { id: "frisch", label: "Den letzten Wert als frisch, damit das Fehlen neuer Nachrichten niemandem auffallen kann.", feedback: "Ein alter Wert darf nicht als aktuelle Messung erscheinen. Sein veralteter Zustand muss sichtbar sein." },
        { id: "alt", label: "Den Stand als veraltet.", feedback: "Richtig. Die Kennzeichnung verhindert, dass Samira einen alten Messwert für eine aktuelle Messung hält." },
        { id: "null", label: "Immer null Grad als neu gemessene Temperatur, auch wenn tatsächlich keine Messung vorliegt.", feedback: "Fehlende Daten sind keine Messung von null Grad. Die Anzeige muss die fehlende Aktualisierung benennen." }
      ] }
    ]
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);