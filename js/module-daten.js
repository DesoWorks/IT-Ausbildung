/* Datengetriebene Modulübersicht der Startseite.
 * Neue Module werden über Einträge in dieser Liste ergänzt.
 * Lernstruktur nach KMK-Rahmenlehrplan, ergänzt mit betrieblichen Inhalten der FIAusbV.
 * Keine verbindliche betriebliche Monatsplanung.
 */
(function (global) {
  "use strict";

  global.MODULE_TOOLS = [
    { id: "raid-labor", typ: "werkzeug", titel: "RAID-Lernlabor", beschreibung: "Kapazität, Blockverteilung und gruppenabhängige Ausfälle sicher simulieren.", page: "raid-labor", status: "verfuegbar", datei: "module/raid-labor.html" },
    { id: "windows-werkzeugkiste", typ: "werkzeug", titel: "Windows-Werkzeugkiste", beschreibung: "Windows-Tastenkombinationen und Systemwerkzeuge lernen, üben und testen.", page: "windows-werkzeugkiste", status: "verfuegbar", datei: "module/windows-werkzeugkiste.html" },
    { id: "lf3-zahlensysteme", typ: "werkzeug", titel: "Zahlensystemrechner", beschreibung: "Binär, Dezimal und Hexadezimal umrechnen, mit Stellenwerten und Rechenweg.", page: "zahlensysteme", status: "verfuegbar", datei: "module/zahlensysteme.html" },
    { id: "lf3-einheiten", typ: "werkzeug", titel: "Bit-/Byte- und Einheitenrechner", beschreibung: "Bit, Byte, GB und GiB umrechnen, mit nachvollziehbarem Rechenweg.", page: "einheiten", status: "verfuegbar", datei: "module/einheiten.html" },
    { id: "lf3-ipv4-rechner", typ: "werkzeug", titel: "IPv4-Subnetzrechner", beschreibung: "Präfix oder Netzmaske, Adressgrenzen und Rechenweg nachvollziehen.", page: "ipv4-rechner", status: "verfuegbar", datei: "module/ipv4-rechner.html" },
    { id: "bwl-werkstatt", typ: "werkzeug", titel: "BWL-Werkstatt", beschreibung: "Angebot, Gewinn, Rabatt sowie Netto und Brutto centgenau rechnen, mit sichtbarem Rechenweg.", page: "bwl-werkstatt", status: "verfuegbar", datei: "module/bwl-werkstatt.html" },
    { id: "pc-explorer", typ: "werkzeug", titel: "PC-Explorer", beschreibung: "Desktop und Notebook von innen: Bauteile wählen und Funktion, Einbauort und Zusammenspiel nachlesen. Entwurf, nicht fachlich freigegeben.", page: "pc-explorer", status: "verfuegbar", datei: "module/pc-explorer.html" }

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
            { id: "lf1-lernziel", typ: "lernzielkontrolle", titel: "LF1 Lernzielkontrolle", beschreibung: "24 Fragen zu den vorhandenen Lektionen. Nach der Abgabe gesperrt. Zurücksetzen nur mit dem Passwort der Lernzielkontrolle.", page: "lf1-lernziel", status: "verfuegbar", datei: "module/lf1-lernziel.html" }
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
            { id: "lf2-lernziel", typ: "lernzielkontrolle", titel: "LF2 Lernzielkontrolle", beschreibung: "24 Fragen zu den vorhandenen Lektionen. Nach der Abgabe gesperrt. Zurücksetzen nur mit dem Passwort der Lernzielkontrolle.", page: "lf2-lernziel", status: "verfuegbar", datei: "module/lf2-lernziel.html" }
          ] },
        { id: "lf3", lernfeld: "Lernfeld 3", titel: "Netzwerkgrundlagen und Client-Anbindung", status: "verfuegbar",
          unterthemen: [
            { id: "lf3-client-anbindung", typ: "lektion", titel: "Client-Anbindung: vom Anschluss bis zur Verbindung", beschreibung: "Bausteine einer fiktiven Client-Anbindung benennen und eine Verbindungsskizze lesen.", page: "lf3-client-anbindung", status: "verfuegbar", datei: "module/lf3-client-anbindung.html" },
            { id: "lf3-ipv4-konfiguration", typ: "lektion", titel: "IPv4-Konfiguration eines Clients lesen", beschreibung: "Adresse, Präfix/Netzmaske und Gateway einer fiktiven Client-Anzeige lesen und mit einer Testnetz-Karte vergleichen.", page: "lf3-ipv4-konfiguration", status: "verfuegbar", datei: "module/lf3-ipv4-konfiguration.html" },
            { id: "lf3-dhcp", typ: "lektion", titel: "DHCP: automatische Konfiguration nachvollziehen", beschreibung: "Zweck von DHCP und eine vereinfachte fiktive Adressvergabe in einem Ablaufbild lesen.", page: "lf3-dhcp", status: "verfuegbar", datei: "module/lf3-dhcp.html" },
            { id: "lf3-dns", typ: "lektion", titel: "DNS: Namen und IP-Adressen unterscheiden", beschreibung: "Eine fiktive Namensauflösung in einer Übungstabelle lesen und Namen von IP-Adressen unterscheiden.", page: "lf3-dns", status: "verfuegbar", datei: "module/lf3-dns.html" },
            { id: "lf3-verbindung-eingrenzen", typ: "lektion", titel: "Verbindung systematisch eingrenzen", beschreibung: "Vorgegebene Beobachtungen zu einer fiktiven Verbindung ordnen und die nächste sinnvolle Beobachtung auswählen.", page: "lf3-verbindung-eingrenzen", status: "verfuegbar", datei: "module/lf3-verbindung-eingrenzen.html" },
            { id: "lf3-fehlerbild-protokoll", typ: "lektion", titel: "Typische Client-Fehlerbilder dokumentieren und übergeben", beschreibung: "Beobachtung, getesteten Schritt und Ergebnis in einem fiktiven Supportprotokoll trennen und geordnet übergeben.", page: "lf3-fehlerbild-protokoll", status: "verfuegbar", datei: "module/lf3-fehlerbild-protokoll.html" },
            { id: "lf3-ipv4", typ: "lektion", titel: "IPv4", beschreibung: "Lektion 1: IPv4-Adresse und vier Oktette.", page: "netzwerkgrundlagen",
              status: "verfuegbar", datei: "module/netzwerkgrundlagen.html" },
            { id: "lf3-netzmaske", typ: "lektion", titel: "Netzmaske und Netz-/Geräteanteil", beschreibung: "Lektion 2: Beispiel 192.168.1.20/24.",
              status: "verfuegbar", datei: "module/netzmaske.html", page: "netzmaske" },
            { id: "lf3-subnetting", typ: "lektion", titel: "Subnetting: /24 in zwei /25-Netze teilen", beschreibung: "Lektion 3: zwei gleich große Teilnetze Schritt für Schritt.", page: "subnetting", status: "verfuegbar", datei: "module/subnetting.html" },
            { id: "lf3-lernziel", typ: "lernzielkontrolle", titel: "LF3 Lernzielkontrolle", beschreibung: "24 Fragen zu den vorhandenen Lektionen. Nach der Abgabe gesperrt. Zurücksetzen nur mit dem Passwort der Lernzielkontrolle.", page: "lf3-lernziel", status: "verfuegbar", datei: "module/lf3-lernziel.html" },
          ] },
        { id: "lf4", lernfeld: "Lernfeld 4", titel: "Schutzbedarf und Grundlagen der IT-Sicherheit", status: "verfuegbar",
          unterthemen: [
            { id: "lf4-schutzbedarf", typ: "lektion", titel: "Schutzbedarf erkennen", beschreibung: "Hohen, mittleren und niedrigen Schutzbedarf an fiktiven Beispielen unterscheiden.", page: "lf4-schutzbedarf", status: "verfuegbar", datei: "module/lf4-schutzbedarf.html" },
            { id: "lf4-schutzziele", typ: "lektion", titel: "Schutzziele unterscheiden", beschreibung: "Vertraulichkeit, Integrität und Verfügbarkeit an fiktiven Beispielen unterscheiden.", page: "lf4-schutzziele", status: "verfuegbar", datei: "module/lf4-schutzziele.html" },
            { id: "lf4-risiken", typ: "lektion", titel: "Einfache Risiken einordnen", beschreibung: "Erkennbare Risiken in einem fiktiven Arbeitsplatzfall benennen und die passende Meldung wählen.", page: "lf4-risiken", status: "verfuegbar", datei: "module/lf4-risiken.html" },
            { id: "lf4-handlungen", typ: "lektion", titel: "Sichere und unsichere Handlungen unterscheiden", beschreibung: "Sichere und unsichere Handlungen an einem fiktiven Arbeitsplatz unterscheiden und bei Unklarheit nachfragen.", page: "lf4-handlungen", status: "verfuegbar", datei: "module/lf4-handlungen.html" },
            { id: "lf4-zugang", typ: "lektion", titel: "Zugangsgrundlagen ohne echte Zugangswörter", beschreibung: "Eigene Zugänge nutzen, Funde melden und keine Beispielwörter oder fremden Zugänge verwenden.", page: "lf4-zugang", status: "verfuegbar", datei: "module/lf4-zugang.html" },
            { id: "lf4-vorfall", typ: "lektion", titel: "Einen Vorfall beobachten und melden", beschreibung: "Beobachtung, Meldung und offenen Stand trennen, ohne Ursache zu behaupten.", page: "lf4-vorfall", status: "verfuegbar", datei: "module/lf4-vorfall.html" },
            { id: "lf4-lernziel", typ: "lernzielkontrolle", titel: "LF4 Lernzielkontrolle", beschreibung: "24 Fragen zu den vorhandenen Lektionen. Nach der Abgabe gesperrt. Zurücksetzen nur mit dem Passwort der Lernzielkontrolle.", page: "lf4-lernziel", status: "verfuegbar", datei: "module/lf4-lernziel.html" }
          ] },
        { id: "lf5", lernfeld: "Lernfeld 5", titel: "Programmiergrundlagen und Datenverwaltung", status: "verfuegbar",
          unterthemen: [
            { id: "lf5-anweisung", typ: "lektion", titel: "Anweisung und Daten unterscheiden", beschreibung: "An einer fiktiven Übungskarte Anweisung und Daten trennen.", page: "lf5-anweisung", status: "verfuegbar", datei: "module/lf5-anweisung.html" },
            { id: "lf5-werte", typ: "lektion", titel: "Einfache Werte lesen", beschreibung: "Text, ganze Zahl und Ja oder Nein an einer fiktiven Karte unterscheiden.", page: "lf5-werte", status: "verfuegbar", datei: "module/lf5-werte.html" },
            { id: "lf5-ablauf", typ: "lektion", titel: "Reihenfolge und Entscheidung lesen", beschreibung: "Einen fiktiven Ablaufzettel in Reihenfolge und Entscheidung lesen.", page: "lf5-ablauf", status: "verfuegbar", datei: "module/lf5-ablauf.html" },
            { id: "lf5-wiederholung", typ: "lektion", titel: "Eine Wiederholung erkennen", beschreibung: "Dieselbe Prüfung an mehreren fiktiven Karten als Wiederholung erkennen.", page: "lf5-wiederholung", status: "verfuegbar", datei: "module/lf5-wiederholung.html" },
            { id: "lf5-ablage", typ: "lektion", titel: "Daten ablegen und wiederfinden", beschreibung: "Eine fiktive Datei an einem vereinbarten Namen ablegen und wiederfinden.", page: "lf5-ablage", status: "verfuegbar", datei: "module/lf5-ablage.html" },
            { id: "lf5-einordnen", typ: "lektion", titel: "Daten vor dem Speichern einordnen", beschreibung: "Herkunft, Art, Schutz und Speicherbedarf an einem fiktiven Gerätenamen unterscheiden.", page: "lf5-einordnen", status: "verfuegbar", datei: "module/lf5-einordnen.html" },
            { id: "lf5-testfall", typ: "lektion", titel: "Einen Testfall formulieren", beschreibung: "Ausgangslage, Handlung, erwartetes Ergebnis und Abweichung an einer fiktiven Übungskarte trennen.", page: "lf5-testfall", status: "verfuegbar", datei: "module/lf5-testfall.html" },
            { id: "lf5-doku", typ: "lektion", titel: "Eine kurze Dokumentation lesen", beschreibung: "Zweck, Eingabe, Prüfung und offenen Punkt in einer fiktiven Notiz unterscheiden.", page: "lf5-doku", status: "verfuegbar", datei: "module/lf5-doku.html" },
            { id: "lf5-format", typ: "lektion", titel: "Ein Datenformat wählen", beschreibung: "Text, ganze Zahl und eine kleine Tabelle an einer fiktiven Übungskarte unterscheiden.", page: "lf5-format", status: "verfuegbar", datei: "module/lf5-format.html" },
            { id: "lf5-prozess", typ: "lektion", titel: "Den Arbeitsprozess bewerten", beschreibung: "Geplant, geprüft und offen an einem fiktiven Zettel unterscheiden.", page: "lf5-prozess", status: "verfuegbar", datei: "module/lf5-prozess.html" },
            { id: "lf5-lernziel", typ: "lernzielkontrolle", titel: "LF5 Lernzielkontrolle", beschreibung: "24 Fragen zu den vorhandenen Lektionen. Nach der Abgabe gesperrt. Zurücksetzen nur mit dem Passwort der Lernzielkontrolle.", page: "lf5-lernziel", status: "verfuegbar", datei: "module/lf5-lernziel.html" }
          ] }
      ]
    },
    {
      jahr: 2,
      titel: "2. Ausbildungsjahr",
      module: [
        { id: "lf6", lernfeld: "Lernfeld 6", titel: "Support und Bearbeitung von Servicefällen", status: "verfuegbar",
          unterthemen: [
            { id: "lf6-anfrage", typ: "lektion", titel: "Eine Serviceanfrage einordnen", beschreibung: "Eine fiktive Anfrage notieren, ohne die Ursache festzulegen.", page: "lf6-anfrage", status: "verfuegbar", datei: "module/lf6-anfrage.html" },
            { id: "lf6-fragen", typ: "lektion", titel: "Die Störung enger fassen", beschreibung: "Eine fiktive Serviceanfrage durch sichere Rückfragen eingrenzen.", page: "lf6-fragen", status: "verfuegbar", datei: "module/lf6-fragen.html" },
            { id: "lf6-level", typ: "lektion", titel: "Das Support-Level einordnen", beschreibung: "First-Level und Second-Level an einer fiktiven Anfrage unterscheiden.", page: "lf6-level", status: "verfuegbar", datei: "module/lf6-level.html" },
            { id: "lf6-notiz", typ: "lektion", titel: "Den Bearbeitungsstand notieren", beschreibung: "Beobachteten Stand, nächsten Schritt und informierte Person notieren.", page: "lf6-notiz", status: "verfuegbar", datei: "module/lf6-notiz.html" },
            { id: "lf6-sla", typ: "lektion", titel: "Die vertragliche Grundlage prüfen", beschreibung: "An einem fiktiven SLA Reaktionszeit, Leistungsumfang und Ausschlüsse prüfen.", page: "lf6-sla", status: "verfuegbar", datei: "module/lf6-sla.html" },
            { id: "lf6-status", typ: "lektion", titel: "Den Status einer Anfrage unterscheiden", beschreibung: "Neu, in Bearbeitung, wartet auf Rückmeldung und erledigt unterscheiden.", page: "lf6-status", status: "verfuegbar", datei: "module/lf6-status.html" },
            { id: "lf6-kontakt", typ: "lektion", titel: "Direkten und indirekten Kundenkontakt unterscheiden", beschreibung: "Direkten und indirekten Kundenkontakt an fiktiven Serviceanfragen unterscheiden.", page: "lf6-kontakt", status: "verfuegbar", datei: "module/lf6-kontakt.html" },
            { id: "lf6-ursache", typ: "lektion", titel: "Eine Fehlerursache eingrenzen", beschreibung: "Eine Fehlerursache an einem fiktiven Fall eingrenzen und sie erst nennen, wenn die Beobachtung reicht.", page: "lf6-ursache", status: "verfuegbar", datei: "module/lf6-ursache.html" },
            { id: "lf6-loesung", typ: "lektion", titel: "Eine Lösung im eigenen Support-Level wählen", beschreibung: "An einem fiktiven Fall eine Lösung im eigenen Support-Level wählen und weitergehende Arbeit abgeben.", page: "lf6-loesung", status: "verfuegbar", datei: "module/lf6-loesung.html" },
            { id: "lf6-gespraech", typ: "lektion", titel: "Situationsgerecht kommunizieren und deeskalieren", beschreibung: "In einem fiktiven Gespräch ruhig kommunizieren, deeskalieren und einen einfachen englischen Satz erkennen.", page: "lf6-gespraech", status: "verfuegbar", datei: "module/lf6-gespraech.html" },
            { id: "lf6-qualitaet", typ: "lektion", titel: "Den Bearbeitungsprozess reflektieren", beschreibung: "Einen fiktiven Bearbeitungsprozess auswerten und eine prüfbare Maßnahme zur Qualität vorschlagen.", page: "lf6-qualitaet", status: "verfuegbar", datei: "module/lf6-qualitaet.html" },
            { id: "lf6-kontrolle", typ: "lernzielkontrolle", titel: "LF6 Lernzielkontrolle", beschreibung: "24 Fragen zu den vorhandenen Lektionen. Nach der Abgabe gesperrt. Zurücksetzen nur mit dem Passwort der Lernzielkontrolle.", page: "lf6-kontrolle", status: "verfuegbar", datei: "module/lf6-kontrolle.html" }
          ] },
        { id: "lf7", lernfeld: "Lernfeld 7", titel: "Cyber-physische Systeme ergänzen", status: "verfuegbar",
          unterthemen: [
            { id: "lf7-system", typ: "lektion", titel: "Ein cyber-physisches System erkennen", beschreibung: "Kundenauftrag, Sensor, Steuerung, Aktor und IT-System an einer fiktiven Raumklima-Station unterscheiden.", page: "lf7-system", status: "verfuegbar", datei: "module/lf7-system.html" },
            { id: "lf7-schnittstelle", typ: "lektion", titel: "Den Datenfluss an der Schnittstelle beschreiben", beschreibung: "Physische Größe, digitalen Messwert, Einheit, Zeitpunkt und vorgesehenen Nachrichtenaustausch unterscheiden.", page: "lf7-schnittstelle", status: "verfuegbar", datei: "module/lf7-schnittstelle.html" },
            { id: "lf7-fluesse", typ: "lektion", titel: "Energiefluss, Stofffluss und Informationsfluss unterscheiden", beschreibung: "Energie, Materietransport und Information im fiktiven Funktionsplan getrennt betrachten.", page: "lf7-fluesse", status: "verfuegbar", datei: "module/lf7-fluesse.html" },
            { id: "lf7-auswahl", typ: "lektion", titel: "Kriterien für Energieversorgung, Hardware und Software aufstellen", beschreibung: "Versorgung, Sensor, Schnittstellen, Bibliotheken und Protokolle nach belegten Kriterien vergleichen, ohne einen Kauf.", page: "lf7-auswahl", status: "verfuegbar", datei: "module/lf7-auswahl.html" },
            { id: "lf7-unterlage", typ: "lektion", titel: "Eine technische Unterlage lesen und eine fehlende Angabe erkennen", beschreibung: "Fiktiven Auszug lesen, fehlende Genauigkeit erkennen und die eigene technische Notiz nachvollziehbar ergänzen.", page: "lf7-unterlage", status: "verfuegbar", datei: "module/lf7-unterlage.html" },
            { id: "lf7-zusammenfuehren", typ: "lektion", titel: "Komponenten funktional zusammenführen", beschreibung: "Quelle, Ziel und Aufgabe von Funktionspfeilen benennen, ohne echte Komponenten anzuschließen.", page: "lf7-zusammenfuehren", status: "verfuegbar", datei: "module/lf7-zusammenfuehren.html" },
            { id: "lf7-pruefung", typ: "lektion", titel: "Funktion, Messwert und Energiebedarf prüfen", beschreibung: "Fiktive Testfälle, Betriebswerte und Energiebedarf auswerten; Abweichungen und nächste Schritte protokollieren.", page: "lf7-pruefung", status: "verfuegbar", datei: "module/lf7-pruefung.html" },
            { id: "lf7-sicherheit", typ: "lektion", titel: "Betriebssicherheit und Datensicherheit unterscheiden", beschreibung: "Sicheren Betrieb, Vertraulichkeit, Integrität und Verfügbarkeit am Lernmodell abgrenzen.", page: "lf7-sicherheit", status: "verfuegbar", datei: "module/lf7-sicherheit.html" },
            { id: "lf7-kontrolle", typ: "lernzielkontrolle", titel: "LF7 Lernzielkontrolle", beschreibung: "24 Fragen nur zu den acht neuen LF7-Lektionen. Nach der Abgabe gesperrt. Zurücksetzen nur mit dem Passwort der Lernzielkontrolle.", page: "lf7-kontrolle", status: "verfuegbar", datei: "module/lf7-kontrolle.html" }
          ] },
        { id: "lf8", lernfeld: "Lernfeld 8", titel: "Datenaustausch zwischen Systemen", status: "kommt-bald",
          unterthemen: [
            { id: "lf8-quellen", typ: "lektion", titel: "Datenquellen und ihren Zweck unterscheiden", beschreibung: "Kasse und Schichttabelle als Quellen eines fiktiven Auftrags benennen und ihren Zweck beschreiben.", page: "lf8-quellen", status: "verfuegbar", datei: "module/lf8-quellen.html" },
            { id: "lf8-struktur", typ: "lektion", titel: "Struktur, Format und Zugriff einer Quelle beschreiben", beschreibung: "Felder, Format und Zugriff einer fiktiven Quelle beschreiben und fehlende Angaben sichtbar lassen.", page: "lf8-struktur", status: "verfuegbar", datei: "module/lf8-struktur.html" },
            { id: "lf8-recht", typ: "lektion", titel: "Rechtliche Grenze und Zugriffszweck klären", beschreibung: "Zugriffszweck und Personenbezug an einem fiktiven Fall klären; offene Rechtsfragen werden gestellt, nicht erfunden.", page: "lf8-recht", status: "verfuegbar", datei: "module/lf8-recht.html" },
            { id: "lf8-auswahl", typ: "lektion", titel: "Quellen nach Auftrag auswählen, nicht nach Gewohnheit", beschreibung: "Quellen nach Feld, Format und Zugriff zum Auftrag wählen und eine Ablehnung begründen.", page: "lf8-auswahl", status: "verfuegbar", datei: "module/lf8-auswahl.html" },
            { id: "lf8-konzept", typ: "lektion", titel: "Ein Bereitstellungskonzept mit Schutzbedarf skizzieren", beschreibung: "Empfänger, Aktualisierung und Schutzbedarf als Papierskizze festhalten, ohne etwas einzurichten.", page: "lf8-konzept", status: "verfuegbar", datei: "module/lf8-konzept.html" },
            { id: "lf8-aufbereiten", typ: "lektion", titel: "Daten für die Übersicht aufbereiten, ohne sie zu verfälschen", beschreibung: "Schreibweise und Darstellung anpassen, fehlende Werte als fehlend zeigen und Regeln nennen.", page: "lf8-aufbereiten", status: "verfuegbar", datei: "module/lf8-aufbereiten.html" },
            { id: "lf8-uebergabe", typ: "lektion", titel: "Übergabe und Dokumentation vorbereiten", beschreibung: "Quellen, Zweck, Regeln und offene Fragen in einer nachvollziehbaren Notiz übergeben.", page: "lf8-uebergabe", status: "verfuegbar", datei: "module/lf8-uebergabe.html" },
            { id: "lf8-reflexion", typ: "lektion", titel: "Werkzeug und Dokumentationsqualität beurteilen", beschreibung: "Das gewählte Werkzeug und die eigene Notiz an einem fiktiven Fall beurteilen.", page: "lf8-reflexion", status: "verfuegbar", datei: "module/lf8-reflexion.html" },
            { id: "lf8-kontrolle", typ: "lernzielkontrolle", titel: "LF8 Lernzielkontrolle", beschreibung: "24 Fragen zu den acht LF8-Lektionen. Nach der Abgabe gesperrt. Zurücksetzen nur mit dem Passwort der Lernzielkontrolle.", page: "lf8-kontrolle", status: "verfuegbar", datei: "module/lf8-kontrolle.html" }
          ] },
        { id: "lf9", lernfeld: "Lernfeld 9", titel: "Planung und Einrichtung von Netzwerken und Diensten", status: "kommt-bald",
          unterthemen: [
            { id: "lf9-anforderung", typ: "lektion", titel: "Anforderungen an das Netzwerk mit dem Kunden klären", beschreibung: "Anforderungen an das Netzwerk im fiktiven Kundenauftrag klären.", page: "lf9-anforderung", status: "verfuegbar", datei: "module/lf9-anforderung.html" },
            { id: "lf9-ist", typ: "lektion", titel: "Den vorhandenen Zustand beschreiben, ohne ihn zu verändern", beschreibung: "Den vorhandenen Zustand im fiktiven Beispiel beschreiben, ohne ihn zu verändern.", page: "lf9-ist", status: "verfuegbar", datei: "module/lf9-ist.html" },
            { id: "lf9-dienste", typ: "lektion", titel: "Benötigte Dienste vom Kundenauftrag ableiten", beschreibung: "Benötigte Dienste aus dem fiktiven Kundenauftrag ableiten.", page: "lf9-dienste", status: "verfuegbar", datei: "module/lf9-dienste.html" },
            { id: "lf9-infrastruktur", typ: "lektion", titel: "Infrastruktur skizzieren: Trennung, Weg und Grenze", beschreibung: "Trennung, Weg und Grenze der fiktiven Infrastruktur auf Papier skizzieren.", page: "lf9-infrastruktur", status: "verfuegbar", datei: "module/lf9-infrastruktur.html" },
            { id: "lf9-eignung", typ: "lektion", titel: "Technische, wirtschaftliche und nachhaltige Eignung vergleichen", beschreibung: "Die technische, wirtschaftliche und nachhaltige Eignung der fiktiven Planung vergleichen.", page: "lf9-eignung", status: "verfuegbar", datei: "module/lf9-eignung.html" },
            { id: "lf9-standard", typ: "lektion", titel: "Einen Standard und eine Funktionsprüfung festlegen", beschreibung: "Einen Standard und eine Funktionsprüfung für die fiktive Planung festlegen.", page: "lf9-standard", status: "verfuegbar", datei: "module/lf9-standard.html" },
            { id: "lf9-schutz", typ: "lektion", titel: "Datenschutz und Datensicherheit am geplanten Dienst beurteilen", beschreibung: "Datenschutz und Datensicherheit am fiktiv geplanten Dienst beurteilen.", page: "lf9-schutz", status: "verfuegbar", datei: "module/lf9-schutz.html" },
            { id: "lf9-zukunft", typ: "lektion", titel: "Kundenzufriedenheit und Zukunftsfähigkeit der Planung beurteilen", beschreibung: "Kundenzufriedenheit und Zukunftsfähigkeit der fiktiven Planung beurteilen.", page: "lf9-zukunft", status: "verfuegbar", datei: "module/lf9-zukunft.html" },
            { id: "lf9-kontrolle", typ: "lernzielkontrolle", titel: "LF9 Lernzielkontrolle", beschreibung: "24 Fragen zu den acht LF9-Lektionen. Nach der Abgabe gesperrt. Zurücksetzen nur mit dem Passwort der Lernzielkontrolle.", page: "lf9-kontrolle", status: "verfuegbar", datei: "module/lf9-kontrolle.html" }
          ] }
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
