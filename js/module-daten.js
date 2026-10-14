/* Datengetriebene Modulübersicht der Startseite.
 * Neue Module werden über Einträge in dieser Liste ergänzt.
 * Lernstruktur nach KMK-Rahmenlehrplan, ergänzt mit betrieblichen Inhalten der FIAusbV.
 * Keine verbindliche betriebliche Monatsplanung.
 */
(function (global) {
  "use strict";

  global.MODULE_TOOLS = [
    { id: "lf3-zahlensysteme", typ: "werkzeug", titel: "Zahlensystemrechner", beschreibung: "Binär, Dezimal und Hexadezimal umrechnen, mit Stellenwerten und Rechenweg.", page: "zahlensysteme", status: "verfuegbar", datei: "module/zahlensysteme.html" },
    { id: "lf3-einheiten", typ: "werkzeug", titel: "Bit-/Byte- und Einheitenrechner", beschreibung: "Bit, Byte, GB und GiB umrechnen, mit nachvollziehbarem Rechenweg.", page: "einheiten", status: "verfuegbar", datei: "module/einheiten.html" },
    { id: "lf3-ipv4-rechner", typ: "werkzeug", titel: "IPv4-Subnetzrechner", beschreibung: "Präfix oder Netzmaske, Adressgrenzen und Rechenweg nachvollziehen.", page: "ipv4-rechner", status: "verfuegbar", datei: "module/ipv4-rechner.html" }
  ];

  global.MODULE_EINSTIEG = [
    { id: "computer-grundlagen", titel: "Den Computer kennenlernen",
      beschreibung: "Einstieg: Computer, Bildschirm, Tastatur, Maus, Netzwerk. Ca. 10 Minuten.", page: "computer-grundlagen",
      status: "verfuegbar", datei: "module/computer-grundlagen.html" }
  ];

  global.MODULE_DATEN = [
    {
      jahr: 1,
      titel: "1. Ausbildungsjahr",
      module: [
        { id: "lf1", lernfeld: "Lernfeld 1", titel: "Ausbildungsbetrieb und berufliche Rolle", status: "verfuegbar",
          unterthemen: [
            { id: "lf1-betrieb-aufgaben", typ: "lektion", titel: "Dein Ausbildungsbetrieb und deine Aufgaben", beschreibung: "Betrieb, Abteilung und Team unterscheiden; Aufgaben und Ansprechpersonen einordnen.", page: "lf1-ausbildungsbetrieb", status: "verfuegbar", datei: "module/lf1-ausbildungsbetrieb.html" },
            { id: "lf1-leitbild-ziele", typ: "lektion", titel: "Woran orientiert sich ein Betrieb?", beschreibung: "Ökonomische, ökologische und soziale Ziele sowie das Leitbild unterscheiden.", page: "lf1-leitbild", status: "verfuegbar", datei: "module/lf1-leitbild.html" },
            { id: "lf1-markt-kundschaft", typ: "lektion", titel: "Betrieb, Markt und Kundschaft", beschreibung: "Branche, Marktbeziehungen, Kundengruppen, Lieferanten und Wettbewerber im fiktiven Beispiel einordnen.", page: "lf1-markt-kundschaft", status: "verfuegbar", datei: "module/lf1-markt-kundschaft.html" },
            { id: "lf1-wertschoepfung", typ: "lektion", titel: "Von der Anfrage zur IT-Leistung", beschreibung: "Leistungsschritte und Wertbeitrag im fiktiven Kundenauftrag beschreiben.", page: "lf1-wertschoepfung", status: "verfuegbar", datei: "module/lf1-wertschoepfung.html" },
            { id: "lf1-organisation", typ: "lektion", titel: "Wie ein Betrieb organisiert sein kann", beschreibung: "Fiktive Aufbauorganisation und bereitgestellte Rechtsformprofile einordnen.", page: "lf1-organisation", status: "verfuegbar", datei: "module/lf1-organisation.html" },
            { id: "lf1-handlungsspielraum", typ: "lektion", titel: "Was darf ich entscheiden?", beschreibung: "Eigene Aufgaben, Handlungsspielraum und Freigaben anhand sicherer Fälle unterscheiden.", page: "lf1-handlungsspielraum", status: "verfuegbar", datei: "module/lf1-handlungsspielraum.html" },
            { id: "lf1-weiterbildung", typ: "lektion", titel: "Lernen und sich weiterentwickeln", beschreibung: "Passende Lernwege, Feedback und Entwicklung im Beruf einordnen.", page: "lf1-weiterbildung", status: "verfuegbar", datei: "module/lf1-weiterbildung.html" },
            { id: "lf1-praesentation", typ: "lektion", titel: "Arbeitsergebnisse verständlich präsentieren", beschreibung: "Einen fiktiven IT-Arbeitsstand strukturiert und adressatengerecht vorstellen.", page: "lf1-praesentation", status: "verfuegbar", datei: "module/lf1-praesentation.html" },
            { id: "lf1-qualitaet", typ: "lektion", titel: "Qualität prüfen und verbessern", beschreibung: "Eine fiktive Darstellung nach klaren Kriterien prüfen und Verbesserungsvorschläge ableiten.", page: "lf1-qualitaet", status: "verfuegbar", datei: "module/lf1-qualitaet.html" },
            { id: "lf1-reflexion", typ: "lektion", titel: "Rolle und eigenes Handeln reflektieren", beschreibung: "Eine fiktive berufliche Situation auswerten und einen nächsten Entwicklungsschritt benennen.", page: "lf1-reflexion", status: "verfuegbar", datei: "module/lf1-reflexion.html" },
            { id: "lf1-abschluss", typ: "lektion", titel: "Lernfeld 1: Zusammenfassung und Abschlussaufgabe", beschreibung: "Ein fiktives Unternehmen und die eigene berufliche Rolle zusammenhängend darstellen.", page: "lf1-abschluss", status: "verfuegbar", datei: "module/lf1-abschluss.html" }
          ] },
        { id: "lf2", lernfeld: "Lernfeld 2", titel: "Arbeitsplätze nach Kundenwunsch ausstatten", status: "verfuegbar",
          unterthemen: [
            { id: "lf2-kundenbedarf", typ: "lektion", titel: "Kundenbedarf verstehen", beschreibung: "Fiktiven Auftrag in Wünsche, Anforderungen und offene Rückfragen gliedern.", page: "lf2-kundenbedarf", status: "verfuegbar", datei: "module/lf2-kundenbedarf.html" },
            { id: "lf2-kriterien", typ: "lektion", titel: "Anforderungen in Kriterien übersetzen", beschreibung: "Pflicht- und Wunschkriterien aus dem Bedarf ableiten.", page: "lf2-kriterien", status: "verfuegbar", datei: "module/lf2-kriterien.html" },
            { id: "lf2-sichere-auswahl", typ: "lektion", titel: "Sicher auswählen und Kennzeichnungen prüfen", beschreibung: "Sicherheitsinformationen aus bereitgestellten Quellen prüfen.", page: "lf2-sichere-auswahl", status: "verfuegbar", datei: "module/lf2-sichere-auswahl.html" },
            { id: "lf2-technische-daten", typ: "lektion", titel: "Technische Daten lesen", beschreibung: "Fiktive Produktdaten und fremdsprachige Angaben auswerten.", page: "lf2-technische-daten", status: "verfuegbar", datei: "module/lf2-technische-daten.html" },
            { id: "lf2-varianten", typ: "lektion", titel: "Arbeitsplatzvarianten vergleichen", beschreibung: "Technische, wirtschaftliche, ergonomische und ökologische Kriterien abwägen.", page: "lf2-varianten", status: "verfuegbar", datei: "module/lf2-varianten.html" },
            { id: "lf2-energie", typ: "lektion", titel: "Energiebedarf transparent vergleichen", beschreibung: "Energieverbrauch anhand fiktiver Daten berechnen und Annahmen nennen.", page: "lf2-energie", status: "verfuegbar", datei: "module/lf2-energie.html" },
            { id: "lf2-angebote", typ: "lektion", titel: "Angebote und Bezugsquellen vergleichen", beschreibung: "Fiktive Anbieter anhand Preis, Lieferzeit und Service vergleichen.", page: "lf2-angebote", status: "verfuegbar", datei: "module/lf2-angebote.html" },
            { id: "lf2-angebot", typ: "lektion", titel: "Ein nachvollziehbares Angebot erstellen", beschreibung: "Beispielwerte und vorgegebene Zuschläge transparent berechnen.", page: "lf2-angebot", status: "verfuegbar", datei: "module/lf2-angebot.html" },
            { id: "lf2-beschaffung", typ: "lektion", titel: "Beschaffung und Wareneingang planen", beschreibung: "Fiktiven Bestellablauf und Mängelmeldung einordnen.", page: "lf2-beschaffung", status: "verfuegbar", datei: "module/lf2-beschaffung.html" },
            { id: "lf2-einrichten", typ: "lektion", titel: "Arbeitsplatz einrichten und prüfen", beschreibung: "Simulierte, sichere Einrichtung und Prüfung planen.", page: "lf2-einrichten", status: "verfuegbar", datei: "module/lf2-einrichten.html" },
            { id: "lf2-uebergabe", typ: "lektion", titel: "Arbeitsplatz übergeben und dokumentieren", beschreibung: "Prüfergebnisse in einem fiktiven Übergabeprotokoll festhalten.", page: "lf2-uebergabe", status: "verfuegbar", datei: "module/lf2-uebergabe.html" },
            { id: "lf2-auswertung", typ: "lektion", titel: "Auftrag auswerten und verbessern", beschreibung: "Fiktiven Auftrag anhand von Kriterien auswerten und Verbesserungen ableiten.", page: "lf2-auswertung", status: "verfuegbar", datei: "module/lf2-auswertung.html" },
            { id: "lf2-abschluss", typ: "lektion", titel: "Lernfeld 2: Integrierte Abschlussaufgabe", beschreibung: "Einen fiktiven Kundenauftrag vom Bedarf bis zur Auswertung bearbeiten.", page: "lf2-abschluss", status: "verfuegbar", datei: "module/lf2-abschluss.html" }
          ] },
        { id: "lf3", lernfeld: "Lernfeld 3", titel: "Netzwerkgrundlagen und Client-Anbindung", status: "kommt-bald",
          unterthemen: [
            { id: "lf3-client-anbindung", typ: "lektion", titel: "Client-Anbindung: vom Anschluss bis zur Verbindung", beschreibung: "Bausteine einer fiktiven Client-Anbindung benennen und eine Verbindungsskizze lesen.", page: "lf3-client-anbindung", status: "verfuegbar", datei: "module/lf3-client-anbindung.html" },
            { id: "lf3-ipv4-konfiguration", typ: "lektion", titel: "IPv4-Konfiguration eines Clients lesen", beschreibung: "Adresse, Präfix/Netzmaske und Gateway einer fiktiven Client-Anzeige lesen und mit einer Testnetz-Karte vergleichen.", page: "lf3-ipv4-konfiguration", status: "verfuegbar", datei: "module/lf3-ipv4-konfiguration.html" },
            { id: "lf3-dhcp", typ: "lektion", titel: "DHCP: automatische Konfiguration nachvollziehen", beschreibung: "Zweck von DHCP und eine vereinfachte fiktive Adressvergabe in einem Ablaufbild lesen.", page: "lf3-dhcp", status: "verfuegbar", datei: "module/lf3-dhcp.html" },
            { id: "lf3-dns", typ: "lektion", titel: "DNS: Namen und IP-Adressen unterscheiden", beschreibung: "Eine fiktive Namensauflösung in einer Übungstabelle lesen und Namen von IP-Adressen unterscheiden.", page: "lf3-dns", status: "verfuegbar", datei: "module/lf3-dns.html" },
            { id: "lf3-verbindung-eingrenzen", typ: "lektion", titel: "Verbindung systematisch eingrenzen", beschreibung: "Vorgegebene Beobachtungen zu einer fiktiven Verbindung ordnen und die nächste sinnvolle Beobachtung auswählen.", page: "lf3-verbindung-eingrenzen", status: "verfuegbar", datei: "module/lf3-verbindung-eingrenzen.html" },
            { id: "lf3-fehlerbild-protokoll", typ: "lektion", titel: "Typische Client-Fehlerbilder dokumentieren und übergeben", beschreibung: "Beobachtung, getesteten Schritt und Ergebnis in einem fiktiven Supportprotokoll trennen und geordnet übergeben.", page: "lf3-fehlerbild-protokoll", status: "verfuegbar", datei: "module/lf3-fehlerbild-protokoll.html" },
            { id: "lf3-abschluss", typ: "lektion", titel: "Lernfeld 3: Zusammenfassung und Abschlussaufgabe", beschreibung: "Einen fiktiven Client von der Anzeige bis zum Protokoll lesen und die Beobachtungen verbinden.", page: "lf3-abschluss", status: "verfuegbar", datei: "module/lf3-abschluss.html" },
            { id: "lf3-ipv4", typ: "lektion", titel: "IPv4", beschreibung: "Lektion 1: IPv4-Adresse und vier Oktette.", page: "netzwerkgrundlagen",
              status: "verfuegbar", datei: "module/netzwerkgrundlagen.html" },
            { id: "lf3-netzmaske", typ: "lektion", titel: "Netzmaske und Netz-/Geräteanteil", beschreibung: "Lektion 2: Beispiel 192.168.1.20/24.",
              status: "verfuegbar", datei: "module/netzmaske.html", page: "netzmaske" },
            { id: "lf3-subnetting", typ: "lektion", titel: "Subnetting: /24 in zwei /25-Netze teilen", beschreibung: "Lektion 3: zwei gleich große Teilnetze Schritt für Schritt.", page: "subnetting", status: "verfuegbar", datei: "module/subnetting.html" }
          ] },
        { id: "lf4", lernfeld: "Lernfeld 4", titel: "Schutzbedarf und Grundlagen der IT-Sicherheit", status: "kommt-bald" },
        { id: "lf5", lernfeld: "Lernfeld 5", titel: "Programmiergrundlagen und Datenverwaltung", status: "kommt-bald" }
      ]
    },
    {
      jahr: 2,
      titel: "2. Ausbildungsjahr",
      module: [
        { id: "lf6", lernfeld: "Lernfeld 6", titel: "Support und Bearbeitung von Servicefällen", status: "kommt-bald" },
        { id: "lf7", lernfeld: "Lernfeld 7", titel: "Vernetzte Geräte und cyber-physische Systeme", status: "kommt-bald" },
        { id: "lf8", lernfeld: "Lernfeld 8", titel: "Datenaustausch zwischen Systemen", status: "kommt-bald" },
        { id: "lf9", lernfeld: "Lernfeld 9", titel: "Planung und Einrichtung von Netzwerken und Diensten", status: "kommt-bald" }
      ]
    },
    {
      jahr: 3,
      titel: "3. Ausbildungsjahr",
      module: [
        { id: "lf10b", lernfeld: "Lernfeld 10b", titel: "Serveradministration und Automatisierung", status: "kommt-bald" },
        { id: "lf11b", lernfeld: "Lernfeld 11b", titel: "Sicherer Betrieb vernetzter IT-Systeme", status: "kommt-bald" },
        { id: "lf12b", lernfeld: "Lernfeld 12b", titel: "Planung und Umsetzung eines Systemintegrationsprojekts", status: "kommt-bald" }
      ]
    }
  ];
})(typeof window !== "undefined" ? window : globalThis);
