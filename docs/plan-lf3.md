# Arbeits- und Zuordnungsplan Lernfeld 3

**Projekt:** IT-Ausbildung · Fachinformatiker/-in Systemintegration  
**Katalogstatus:** Lernfeld 3 „Netzwerkgrundlagen und Client-Anbindung“ ist laut `js/module-daten.js` `kommt-bald`; die drei vorhandenen Lektionen sind jeweils `verfuegbar`.  
**Quellenhinweis:** Rahmenlehrplan in diesem Lauf nicht gegen das Original gelesen. Diese Gliederung ist eine Arbeitsplanung, keine behauptete vollständige oder verbindliche KMK-Zuordnung. Keine KMK-Zitate, Paragraphen oder Stundenangaben werden beansprucht.  
**Sicherheitsrahmen:** Fallnamen, Adressen und Beobachtungen sind fiktive Übungsdaten. Keine produktiven Änderungen an Netzen und keine echten Zugangsdaten.

## LF3 – Netzwerkgrundlagen und Client-Anbindung

### Belegter Ist-Stand

`js/module-daten.js` führt diese drei Lektionen innerhalb von LF3 als `verfuegbar`:

| Eintrag | Beschreibung laut Katalog | Datei |
|---|---|---|
| `lf3-ipv4` · IPv4 | IPv4-Adresse und vier Oktette | `module/netzwerkgrundlagen.html` |
| `lf3-netzmaske` · Netzmaske und Netz-/Geräteanteil | Beispiel `192.168.1.20/24` | `module/netzmaske.html` |
| `lf3-subnetting` · Subnetting: `/24` in zwei `/25`-Netze teilen | Zwei gleich große Teilnetze Schritt für Schritt | `module/subnetting.html` |

Drei weitere verfügbare Werkzeuge stehen in `MODULE_TOOLS` derselben Datei:

| Werkzeug | Beschreibung laut Katalog | Datei |
|---|---|---|
| Zahlensystemrechner | Binär, Dezimal und Hexadezimal umrechnen, mit Stellenwerten und Rechenweg | `module/zahlensysteme.html` |
| Bit-/Byte- und Einheitenrechner | Bit, Byte, GB und GiB umrechnen, mit nachvollziehbarem Rechenweg | `module/einheiten.html` |
| IPv4-Subnetzrechner | Präfix oder Netzmaske, Adressgrenzen und Rechenweg nachvollziehen | `module/ipv4-rechner.html` |

Diese Angaben belegen die Katalogeinträge und vorhandenen Dateien, nicht deren fachliche Abnahme, Vollständigkeit, Unterrichtswirksamkeit oder Bedienbarkeit. Der gemischte Produktstatus (LF3 `kommt-bald`, Lektionen `verfuegbar`) ist vor einer späteren Freigabe gesondert zu prüfen, nicht stillschweigend zu ändern.

### Vorgeschlagene nächste kleine Lektionsscheiben

Die sechs Scheiben sind Vorschläge für eine etappenweise Fortsetzung, keine verbindliche oder verifizierte KMK-Zuordnung. Jede Scheibe soll separat geplant, umgesetzt und abgenommen werden.

| Reihenfolge / Lektion | Ziel | Fiktives Beispiel | Bewusst draußen |
|---|---|---|---|
| 1. **Client-Anbindung: vom Anschluss bis zur Verbindung** | Bausteine einer einfachen Client-Anbindung benennen und eine bereitgestellte Verbindungsskizze lesen. | Übungs-Laptop „Mira-01“ soll im fiktiven Schulungsraum mit einem Testnetz verbunden werden; Geräte- und Verbindungskarten werden zugeordnet. | Echte Installation, produktiver Switchport, WLAN-Konfiguration, Zugangsdaten und konkrete Betriebsstandards. |
| 2. **IPv4-Konfiguration eines Clients lesen** | Eine vorgegebene IPv4-Adresse, Präfix/Netzmaske und Gateway-Angabe identifizieren und mit den vorhandenen IPv4-/Netzmaskenlektionen verknüpfen. | Fiktiver Client `192.168.10.25/24` wird mit einer bereitgestellten Testnetz-Karte verglichen. | Neue Subnetting-Einführung, Änderungen an realen Systemen, vollständige IPv6-Abdeckung oder Empfehlung eines realen Adressplans. |
| 3. **DHCP: automatische Konfiguration nachvollziehen** | Zweck von DHCP und eine vereinfachte fiktive Adressvergabe in einem Ablaufbild wiedergeben. | „Mira-01“ erhält laut Simulation im isolierten Übungsnetz Adresse, Präfix, Gateway und DNS-Server. | DHCP-Server-Installation, Options-/Relay-Konfiguration, Sicherheitsbewertung und echte Reservierungen. |
| 4. **DNS: Namen und IP-Adressen unterscheiden** | Eine bereitgestellte Namensauflösung erklären und eine einfache Anfrage-/Antwortdarstellung lesen. | `wiki.lernnetz.test` wird in einer vorbereiteten Übungstabelle einem Antwortwert zugeordnet. | Öffentliche Domains, echte DNS-Änderungen, Resolver-Konfiguration, DNSSEC-/Angriffsanalyse und die Behauptung, dass Auflösung Erreichbarkeit beweist. |
| 5. **Verbindung systematisch eingrenzen** | Vorgegebene Beobachtungen in risikoarme Prüfschritte ordnen und die nächste sinnvolle Beobachtung auswählen. | Ein Client erreicht eine Testadresse, aber `wiki.lernnetz.test` liefert in der Simulation keine Antwort; Lernende unterscheiden Namensauflösung von IP-Erreichbarkeit. | Befehle an reale Geräte, produktives Troubleshooting, pauschale Firewall-Aussagen und Konfigurationsänderungen. |
| 6. **Typische Client-Fehlerbilder dokumentieren und übergeben** | Beobachtung, getesteten Schritt und Ergebnis in einem fiktiven Supportprotokoll trennen und geordnet übergeben. | „Mira-01“ meldet „kein Netzwerk“; bereitgestellt sind Link-Status, simulierte IP-Anzeige und ein fehlgeschlagener Namensaufruf. | Reale Nutzer-/Gerätedaten, Passwörter oder Tokens, Schuldzuweisung, Supportfristen und verbindliche Betriebszusagen. |

**Durchgehender Übungsrahmen:** ein isoliertes, fiktives „Lernnetz“; alle Adressen, Namen, Messwerte und Beobachtungen sind sichtbar Übungsdaten. Keine Übung setzt echte Netzwerkverbindungen oder Änderungen voraus.


### Prüf- und Abnahmegrenzen

- **Rahmenlehrplan in diesem Lauf nicht gegen das Original gelesen.** Es werden daher keine erfundene KMK-Zuordnung, kein wörtliches Zitat, keine Stundenangabe und keine Paragraphenangabe gemacht. Vor der endgültigen LF3-Zuordnung das amtliche Original tatsächlich beschaffen und gegenlesen.
- `docs/plan-lf1-lf2.md` enthält den Arbeitsstand zu LF1/LF2, belegt aber keine vollständige LF3-Gliederung. Die dortige Struktur ersetzt keinen Abgleich des Originals.
- **Browserprüfung offen:** Für die drei vorhandenen Lektionen und Werkzeuge wurde in diesem Planungslauf kein interaktiver Browsernachweis erhoben. Feedbackdarstellung, Tastaturbedienung, Navigation, Reset und responsive Ansichten nicht als bestanden werten.
- **`file://` offen:** Der vorgesehene lokale Datei-Start wurde in diesem Lauf nicht geprüft. Lokale Zugriffe und Speicherung können je Browser unterschiedlich funktionieren; keine Umgehung von Schutzfunktionen empfehlen. Einen konkreten Blocker dokumentieren und eine technische Lösung separat bewerten.
- Der gespeicherte Katalogstatus (`kommt-bald` fürs Lernfeld, `verfuegbar` für Einheiten) ist kein Beleg fachlicher oder didaktischer Freigabe.
- Vor jeder Umsetzung eine einzelne Scheibe eingrenzen, Quellenbedarf prüfen, bestehende Modul-/Fortschritts-IDs erhalten und sichtbare Bedienwege im Browser prüfen. Werkzeuge ersetzen keine fachliche Abnahme.

## Vorgeschlagene Umsetzungs- und Qualitätsregeln

- Vor einer Implementierung das Original des Rahmenlehrplans und passende technische Primärquellen lesen; nur belegte Zuordnungen und technische Aussagen übernehmen und Quellen/Prüfdatum dokumentieren.
- Je Auftrag nur eine kleine, eigenständig testbare Lektion umsetzen; vorhandene LF3-IDs und Werkzeuge nicht duplizieren.
- Beispiele fiktiv und risikoarm halten; keine realen Zugangsdaten, produktiven Netze oder Änderungen verlangen.
- Übungsfragen ohne vorausgewählte Antworten, mit stabilen IDs und verständlichem Feedback für richtige, falsche und unbeantwortete Antworten gestalten.
- Automatisierte Tests, Syntax-/Diff-Prüfungen und Browser-/`file://`-Grenzen getrennt dokumentieren; Code-Tests nicht als Ersatz für Sichtprüfung ausgeben.
- LF3 erst dann als fachlich abgenommen oder vollständig bezeichnen, wenn Zuordnung am Original und geplante Inhalte/Bedienwege tatsächlich geprüft wurden.
