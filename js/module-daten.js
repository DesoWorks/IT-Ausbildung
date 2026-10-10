/* Datengetriebene Modulübersicht der Startseite.
 *
 * Ein Modul ergänzen: In "module" des passenden Jahres einen Eintrag hinzufügen
 * und bei "status" von "kommt-bald" auf "verfuegbar" stellen sowie "datei" setzen.
 * Weitere Dateien oder Code-Änderungen sind dafür nicht nötig.
 * Optional: "unterthemen" (Liste) zeigt graue „In Kürze“-Unterthemen unter einer Karte.
 * Titel sind verständliche Bereichstitel, "lernfeld" trägt die offizielle Nummer.
 *
 * Hinweis: Die Gliederung folgt den Lernfeldern des KMK-Rahmenlehrplans für
 * Fachinformatiker/-in Systemintegration. Sie ist eine Orientierung und KEIN
 * verbindlicher Monatsplan. Titel und Nummern sind noch gegen die Originalquelle
 * zu verifizieren (siehe README, Abschnitt „Quellen“).
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
        { id: "lf1", lernfeld: "LF 1", titel: "Ausbildungsbetrieb und berufliche Rolle", status: "kommt-bald" },
        { id: "lf2", lernfeld: "LF 2", titel: "Hardware, Betriebssysteme und Arbeitsplatzgestaltung", status: "kommt-bald" },
        { id: "lf3", lernfeld: "LF 3", titel: "Netzwerkgrundlagen und Client-Anbindung", status: "kommt-bald",
          unterthemen: [
            { id: "lf3-ipv4", titel: "IPv4", status: "kommt-bald" },
            { id: "lf3-subnetting", titel: "Subnetting", status: "kommt-bald" }
          ] },
        { id: "lf4", lernfeld: "LF 4", titel: "Schutzbedarf und Grundlagen der IT-Sicherheit", status: "kommt-bald" },
        { id: "lf5", lernfeld: "LF 5", titel: "Programmiergrundlagen und Datenverwaltung", status: "kommt-bald" }
      ]
    },
    {
      jahr: 2,
      titel: "2. Ausbildungsjahr",
      module: [
        { id: "lf6", lernfeld: "LF 6", titel: "Serviceanfragen bearbeiten", status: "kommt-bald" },
        { id: "lf7", lernfeld: "LF 7", titel: "Cyber-physische Systeme ergänzen", status: "kommt-bald" },
        { id: "lf8", lernfeld: "LF 8", titel: "Daten systemübergreifend bereitstellen", status: "kommt-bald" },
        { id: "lf9", lernfeld: "LF 9", titel: "Netzwerke und Dienste bereitstellen", status: "kommt-bald" }
      ]
    },
    {
      jahr: 3,
      titel: "3. Ausbildungsjahr",
      module: [
        { id: "lf10b", lernfeld: "LF 10b", titel: "Serverdienste bereitstellen und Administrationsaufgaben automatisieren", status: "kommt-bald" },
        { id: "lf11b", lernfeld: "LF 11b", titel: "Betrieb und Sicherheit vernetzter Systeme gewährleisten", status: "kommt-bald" },
        { id: "lf12b", lernfeld: "LF 12b", titel: "Kundenspezifische Systemintegration durchführen", status: "kommt-bald" }
      ]
    }
  ];
})(typeof window !== "undefined" ? window : globalThis);
