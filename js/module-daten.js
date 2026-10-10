/* Datengetriebene Modulübersicht der Startseite.
 * Neue Module werden über Einträge in dieser Liste ergänzt.
 * Lernstruktur nach KMK-Rahmenlehrplan, ergänzt mit betrieblichen Inhalten der FIAusbV.
 * Keine verbindliche betriebliche Monatsplanung.
 */
(function (global) {
  "use strict";

  global.MODULE_DATEN = [
    {
      jahr: 1,
      titel: "1. Ausbildungsjahr",
      module: [
        { id: "computer-grundlagen", titel: "Den Computer kennenlernen",
          beschreibung: "Einstieg: Computer, Bildschirm, Tastatur, Maus, Netzwerk. Ca. 10 Minuten.", page: "computer-grundlagen",
          status: "verfuegbar", datei: "module/computer-grundlagen.html" },
        { id: "lf1", lernfeld: "Lernfeld 1", titel: "Ausbildungsbetrieb und berufliche Rolle", status: "kommt-bald" },
        { id: "lf2", lernfeld: "Lernfeld 2", titel: "Hardware, Betriebssysteme und Arbeitsplatzgestaltung", status: "kommt-bald" },
        { id: "lf3", lernfeld: "Lernfeld 3", titel: "Netzwerkgrundlagen und Client-Anbindung", status: "kommt-bald",
          unterthemen: [
            { id: "lf3-ipv4", titel: "IPv4", beschreibung: "Lektion 1: IPv4-Adresse und vier Oktette.", page: "netzwerkgrundlagen",
              status: "verfuegbar", datei: "module/netzwerkgrundlagen.html", page: "netzwerkgrundlagen" },
            { id: "lf3-netzmaske", titel: "Netzmaske und Netz-/Geräteanteil", beschreibung: "Lektion 2: Beispiel 192.168.1.20/24.",
              status: "verfuegbar", datei: "module/netzmaske.html", page: "netzmaske" },
            { id: "lf3-subnetting", titel: "Subnetting: /24 in zwei /25-Netze teilen", beschreibung: "Lektion 3: zwei gleich große Teilnetze Schritt für Schritt.", page: "subnetting", status: "verfuegbar", datei: "module/subnetting.html" }
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
