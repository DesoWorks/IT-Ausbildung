# Übergabe: Server-Ansicht PC-Explorer – Plan

Datum: 01.11.2026  
Projekt: `/home/starnet/projects/IT-Ausbildung-pc`  
Status: **Planungsnotiz, keine Implementierung und keine Fachfreigabe.**

## Zielbild

Als späteres Lernbild kann eine typische Rackserver-Ansicht dienen. Als Recherchekandidat wurde Dell PowerEdge R760 geprüft. Die öffentlich zugänglichen Dell-Seiten, die ich in diesem Lauf abrufen konnte, zeigten zwar den Titel des Handbuchs und dessen Inhaltsübersicht, aber keine technischen Detaildaten. Die Produktseite blockierte automatisierten Zugriff. Deshalb werden dem R760 hier keine der gefragten Eigenschaften zugeschrieben.

## Mögliche Inhalte – vor Umsetzung belegen

Die Oberfläche könnte später Bauteile auswählen lassen und kurze Erklärungen mit optionaler Vertiefung zeigen. Folgende Punkte sind **Prüfpunkte**, keine bestätigten Eigenschaften eines bestimmten Systems:

- CPU-Sockel: mehrere Sockel nur darstellen, wenn das konkrete Systemdokument dies ausdrücklich bestätigt.
- Arbeitsspeicher: ECC-RAM nur mit belastbarem Modellbeleg erklären.
- Laufwerke: RAID, Laufwerkseinschübe und deren Bestückung nicht verallgemeinern; Konfiguration und Modellhandbuch prüfen.
- Stromversorgung: redundante Netzteile nur nennen, wenn für das konkrete System belegt.
- Netzwerk: Anschlüsse nach konkreter Ausführung dokumentieren.
- Fernverwaltung: iDRAC und Funktionsumfang nur mit passender offizieller Dokumentation belegen.
- Kühlung und Luftstrom: erst nach Prüfung von Systemübersicht oder Wartungshandbuch beschreiben.

## Quellenlage am 01.11.2026

- Dell PowerEdge R760 Produktseite: https://www.dell.com/en-us/shop/povw/poweredge-r760 — automatisierter Abruf wurde mit HTTP 403 abgelehnt; keine technischen Eigenschaften daraus übernommen.
- Dell PowerEdge R760 Installations- und Wartungshandbuch: https://www.dell.com/support/manuals/en-us/poweredge-r760/per760_ism_pub/technical-specifications?guid=guid- — die Seite war erreichbar, aber der Abschnitt zeigte „Les données de cette rubrique ne sont pas disponibles“; keine technischen Eigenschaften daraus übernommen.
- Dell Support-Seite zur Systemübersicht desselben Handbuchs: https://www.dell.com/support/manuals/en-us/poweredge-r760/per760_ism_pub/system-overview?guid=guid- — gleiche Einschränkung: Inhaltsnavigation sichtbar, Abschnittsdaten nicht verfügbar.

## Nächster sinnvoller Schritt

Vor der Umsetzung eine lesbare offizielle Dell-Datenquelle oder ein vollständig abrufbares R760-Handbuch beschaffen und jeden geplanten Eintrag einzeln gegen diese Quelle prüfen. Bis dahin Serveransicht als offen kennzeichnen; keine konkrete Bauteilkonfiguration behaupten.
