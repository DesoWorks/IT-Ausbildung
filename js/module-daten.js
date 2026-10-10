/* Datengetriebene Modulübersicht der Startseite.
 * Neue Module werden über Einträge in dieser Liste ergänzt.
 * Optional: "unterthemen" (Liste von Objekten) zeigt graue „In Kürze“-Unterthemen
 * innerhalb einer Karte. Titel sind verständliche Bereichstitel, "lernfeld" trägt
 * die offizielle Nummer.
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
          beschreibung: "Einstieg: Computer, Bildschirm, Tastatur, Maus, Netzwerk. Ca. 10 Minuten.",
          status: "verfuegbar", datei: "module/computer-grundlagen.html" },
        { id: "lf1", lernfeld: "Lernfeld 1", titel: "Ausbildungsbetrieb und berufliche Rolle", status: "kommt-bald" },
        { id: "lf2", lernfeld: "Lernfeld 2", titel: "Hardware, Betriebssysteme und Arbeitsplatzgestaltung", status: "kommt-bald" },
        { id: "lf3", lernfeld: "Lernfeld 3", titel: "Netzwerkgrundlagen und Client-Anbindung", status: "kommt-bald",
          unterthemen: [
            { id: "lf3-ipv4", titel: "IPv4", status: "kommt-bald" },
            { id: "lf3-subnetting", titel: "Subnetting", status: "kommt-bald" }
          ] },
        { id: "lf4", lernfeld: "Lernfeld 4", titel: "Schutzbedarf und Grundlagen der IT-Sicherheit", status: "kommt-bald" },
        { id: "lf5", lernfeld: "Lernfeld 5", titel: "Programmiergrundlagen und Datenverwaltung", status: "kommt-bald" }
      ]
    },
    {
      jahr: 2,
      titel: "2. Ausbildungsjahr",
      module: [
        { id: "lf6", lernfeld: "Lernfeld 6", titel: "Serviceanfragen bearbeiten", status: "kommt-bald" },
        { id: "lf7", lernfeld: "Lernfeld 7", titel: "Cyber-physische Systeme ergänzen", status: "kommt-bald" },
        { id: "lf8", lernfeld: "Lernfeld 8", titel: "Daten systemübergreifend bereitstellen", status: "kommt-bald" },
        { id: "lf9", lernfeld: "Lernfeld 9", titel: "Netzwerke und Dienste bereitstellen", status: "kommt-bald" }
      ]
    },
    {
      jahr: 3,
      titel: "3. Ausbildungsjahr",
      module: [
        { id: "lf10b", lernfeld: "Lernfeld 10b", titel: "Serverdienste bereitstellen und Administrationsaufgaben automatisieren", status: "kommt-bald" },
        { id: "lf11b", lernfeld: "Lernfeld 11b", titel: "Betrieb und Sicherheit vernetzter Systeme gewährleisten", status: "kommt-bald" },
        { id: "lf12b", lernfeld: "Lernfeld 12b", titel: "Kundenspezifische Systemintegration durchführen", status: "kommt-bald" }
      ]
    }
  ];
})(typeof window !== "undefined" ? window : globalThis);
