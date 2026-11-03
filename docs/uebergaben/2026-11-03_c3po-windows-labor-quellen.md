# Übergabe: Quellen- und Bestandsvorbereitung Windows-Diagnoselabor

**Datum:** 03.11.2026 · **Projekt:** `/home/starnet/projects/IT-Ausbildung-werkzeugkiste`
**Branch/HEAD bei Sichtung:** `feature/windows-werkzeugkiste` / `949cf82` · **Koordination:** Terminus
**Umfang:** Vorbereitung für Phase 2, kein Code und keine Ausführung von Windows-Befehlen. Ausschließlich diese Datei neu erstellt. `vorschau/` war bereits ungetrackt; nicht verändert.

## Ergebnis in Kürze

Die bestehende Windows-Werkzeugkiste umfasst 16 Karten (7 Shortcuts, 9 „Ausführen“-Befehle), 9 Übungen und 12 Quizfragen. Die 18 Node-Prüfungen und das Ergebnis „grün“ sind laut Terminus-Bestandsprüfung gemeldet; ich habe sie in diesem Auftrag nicht erneut ausgeführt. In der gelesenen Laufzeitdatei `js/windows-werkzeugkiste-daten.js` gibt es keinen `ping`-Eintrag. Die bestehenden Inhalte lehren GUI-Einstiege und Shortcuts, nicht CMD-/PowerShell-Diagnose.

Wiederverwendbar sind die getrennten Inhalt-/UI-Daten, Lernkarten-/Übungs-/Quizmuster, sichtbare Sicherheits- und Editionshinweise, Offlinebetrieb, sowie die klare Regel: keine Windows-Befehle aus dem Browser ausführen. Die vorhandenen Netzwerklektionen/-tests können als Querverweise dienen; sie sollen nicht als zweite Kopie der Netzwerkgrundlagen neu entstehen. Für die 29 geforderten Befehle ist kein fertiges Textpaket in dieser Übergabe nötig: Jarvis erstellt es anhand der nachstehenden Microsoft-Quellen und der Lernprofil-Vorgaben.

## Bestands-/Lückenmatrix

| Bestand / Quelle | Bereits vorhanden | Lücke für den Auftrag | Konsequenz für Jarvis |
|---|---|---|---|
| `js/windows-werkzeugkiste-daten.js`, `docs/inhalte/windows-werkzeugkiste.json` | 16 Karten, 9 Übungen, 12 Quizfragen; bestehende Themen Shortcut und Windows-GUI-Werkzeug. | Keine der geforderten CMD-/PowerShell-Diagnosebefehle als Befehlsinhalt. | Neue Befehlsprofile hinzufügen; bestehende Karten/Übungen nicht duplizieren. |
| `js/windows-werkzeugkiste.js` | Datenvalidierung, Anzeige der drei Lernmodi; Textdarstellung statt Ausführung. | Profilfelder für Syntax, simulierte Ausgabe, Interpretation, Fehlerursachen, Rechte/Risiko sind nicht Teil des bestehenden Profils. | Datenvertrag/Ansicht gezielt erweitern; keine Shell-/OS-Brücke und keine echte Befehlsausführung. |
| `tests/windows-werkzeugkiste.test.js` | 18 Node-Prüfungen laut Terminus; Daten-, Aufgaben-, Bewertungs- und statische Sicherheitsverträge. | Keine Prüfung der neuen Pflichtbefehle, Simulationen, Versionshinweise oder Risiko-Klassifikation. | Pflichtlisten-/Vollständigkeitstests und Prüfungen „nur simuliert/keine Ausführung“ ergänzen; bestehende Tests beibehalten. |
| LF3-Netzwerklektionen und Netzwerktests (u.a. IPv4, DHCP, DNS, Verbindung eingrenzen) | Netzwerkgrundlagen und Fallkontext an anderer Stelle im Projekt. | Keine konkrete Windows-CMD-/PowerShell-Kommandopraxis. | Verknüpfen statt Grundlagen nochmals zu erklären; Diagnosefolge über Befehle lehren. |
| `README.md`, `REVIEW-HINWEISE.md` | README: statische Offline-App, Entwickler-Node-Tests; Review-Hinweise beziehen sich auf BWL und dessen Prüfumfang. | Kein Windows-Laborplan; Review-Datei ist kein fachlicher Beleg für die Werkzeugkiste. | Keine Aussagen daraus als Befehlstest/Windows-Abnahme ableiten. |

### Befehlssoll – Vollständigkeits-Check

**CMD (15):** `ping`, `ipconfig`, `tracert`, `nslookup`, `netstat`, `arp`, `route print`, `hostname`, `whoami`, `systeminfo`, `tasklist`, `taskkill`, `sfc /scannow`, `DISM`, `chkdsk`.
**PowerShell (14):** `Get-Help`, `Get-Command`, `Get-Process`, `Get-Service`, `Get-ComputerInfo`, `Get-NetIPAddress`, `Test-Connection`, `Test-NetConnection`, `Resolve-DnsName`, `Get-EventLog`, `Get-WinEvent`, `Get-Volume`, `Get-Disk`, `Get-PhysicalDisk`.

## Didaktische Grundlage für jeden der 29 Einträge

Je Befehl ein knappes, einheitliches Profil statt ausuferndem Referenztext:

1. **Zweck/Einsatzgebiet** und welche Diagnosefrage der Befehl nicht beantwortet.
2. **Syntax** mit wenigen verständlichen Parametern; CMD-Schalter (`/`) und PowerShell-Parameter (`-`) nicht vermischen.
3. **Praxisbeispiel** nur mit fiktivem Ziel/Datensatz.
4. **Simulierte Ausgabe** deutlich als „Beispiel – nicht auf diesem Gerät erhoben“ markieren.
5. **Interpretation** der wichtigsten Spalten/Zeilen plus eine häufige Fehlinterpretation.
6. **Häufige Fehlerursache**, passend zum Befehl (Syntax, DNS, Firewall/ICMP, fehlendes Modul, Rechte, falsche Datenträgerannahme).
7. **Rechte/Sicherheit/Änderungsrisiko** ausdrücklich klassifizieren: lesend, Netzwerkprobe, oder ändernd/reparierend. Keine pauschale Behauptung „Admin erforderlich“ ohne Befehlsspezifik.
8. **Miniübung/Wissensfrage**, die sich anhand der Simulation beantworten lässt; Rückmeldung erklärt den Beleg.

Empfohlener Lernfluss: erst sichere Identitäts-/Hilfebefehle (`hostname`, `whoami`, `Get-Help`, `Get-Command`), dann Netzwerkinventar und Fehlerkette (`ipconfig`/`Get-NetIPAddress` → `ping`/`Test-Connection` → DNS (`nslookup`/`Resolve-DnsName`) → TCP-Port (`Test-NetConnection`) → Route (`tracert`, `route print`)), danach Prozesse, Dienste, Ereignisse und Storage. `taskkill`, `sfc`, `DISM`, `chkdsk` als ausdrücklich risikobehaftete Theorie-/Simulationsfälle; kein echter Reparaturlauf.

In Simulationen gilt: Ping-Erfolg beweist keine Diensterreichbarkeit; Ping-Fehler kann ICMP-Filterung bedeuten. DNS-Auflösung beweist keinen offenen Port. Ein lauschender Port ist nicht allein ein Sicherheitsbefund. Ein Datenträger- oder Volume-Inventar belegt kein RAID-Layout.

## Risikohinweise, die in der Umsetzung sichtbar sein müssen

- `ping`, `tracert`, `Test-Connection`, `Test-NetConnection`, DNS-Abfragen erzeugen Netzwerkverkehr. Nur begrenzte Abfragen an fiktive oder ausdrücklich erlaubte Ziele; keine Endlosschleifen oder Scanneraufgaben.
- `ipconfig` ohne Schalter ist Anzeige; `/release`, `/renew`, `/flushdns` haben Auswirkungen auf IP-Konfiguration bzw. Cache. `arp -d` löscht Einträge; `route add/delete/change` ändert die Routingtabelle. Diese Varianten nicht interaktiv ausführen lassen.
- `tasklist`, `netstat`, `whoami`, `systeminfo`, `arp` und Storage-/Ereignisausgaben können Umgebungsdaten offenlegen. Ausschließlich synthetische Namen, IPs, PIDs und Ereignisse nutzen.
- `taskkill` beendet Prozesse; `/f` erzwingt, `/t` betrifft Kindprozesse. Nur Simulation, keine reale Ausführung.
- Microsoft dokumentiert für `sfc` die Mitgliedschaft in der Administratorengruppe und beschreibt `/scannow` als Scan mit möglicher Reparatur. `chkdsk` ohne Schalter zeigt den Volume-Status; `/f`, `/r`, `/x` oder `/b` können Fehler beheben bzw. Volume-/Neustartfolgen haben und verlangen laut Learn lokale Administratorrechte. `DISM`-Reparaturoptionen können das Windows-Abbild verändern; nur nach exakt passender Microsoft-Syntax erklären.
- PowerShell `Get-*`-Abfragen sind hier als lesend gedacht, doch Zugriff auf bestimmte Ereignislogs oder Geräteinformationen kann Rechte/Provider voraussetzen. Niemals aus einer simulierten „Access denied“-Ausgabe schließen, dass alle Abfragen Adminrechte erfordern.

## Windows-/PowerShell-Versionen ausdrücklich trennen

- **CMD.exe** und PowerShell sind unterschiedliche Shells. CMD-Programme lassen sich teils aus PowerShell starten, sind dadurch aber keine Cmdlets. Syntax und Ausgabeformat nicht gleichsetzen.
- **Windows PowerShell 5.1** (`powershell.exe`) und **PowerShell 7.x** (`pwsh.exe`) können nebeneinander installiert sein. PowerShell 7 ist plattformübergreifend, aber Windows-spezifische Module/Cmdlets sind nicht deshalb überall verfügbar.
- `Get-EventLog` ist laut offizieller Versionsdokumentation in PowerShell 7 entfernt; für aktuelle Windows-Ereignislogs `Get-WinEvent` nutzen. `Get-EventLog` als 5.1-/Kompatibilitätsbeispiel einordnen, nicht als gleichwertig neue Empfehlung. `Get-WinEvent` ist Windows-only; einzelne Logs können Adminrechte erfordern.
- `Get-ComputerInfo` ist laut Microsoft Windows-only und seit Windows PowerShell 5.1 vorhanden.
- `Get-NetIPAddress`, `Resolve-DnsName`, `Get-Volume`, `Get-Disk`, `Get-PhysicalDisk` hängen von Windows-/Modul-/Provider-Verfügbarkeit ab. Vor dem Einsatz eines Cmdlets kann `Get-Command` Verfügbarkeit anzeigen.
- Für Praxisbeispiele Zielsystem und Engine benennen (z.B. Windows 11, Windows PowerShell 5.1 oder PowerShell 7.x). In den gelesenen Projektdateien ist die konkrete Zielversion/Edition der Lern-PCs nicht festgelegt; deshalb hier keine Version als Projektentscheidung festschreiben.

## Gezielte offizielle Quellen (Microsoft Learn)

Die genannten Artikel/Suchergebnisse wurden über den Microsoft-Learn-Connector abgerufen. Bei einigen CMD-Einzelartikeln und einigen PowerShell-Cmdlets ist in diesem Lauf nur der offizielle Index bzw. Suchauszug, nicht der vollständige Einzelartikel geprüft; dies ist vor dem endgültigen Praxisbeispiel abzugleichen.

### Windows-Befehle

- [Windows Commands A–Z](https://learn.microsoft.com/windows-server/administration/windows-commands/windows-commands) – offizieller Befehlsindex; gezielter Einzelartikelabgleich für alle Namen.
- [ping](https://learn.microsoft.com/windows-server/administration/windows-commands/ping) – ICMP, Anzahl/Timeout und Round-trip-Ausgabe.
- [ipconfig](https://learn.microsoft.com/windows-server/administration/windows-commands/ipconfig) – IP-Konfiguration sowie zustandsverändernde Schalter.
- [tracert](https://learn.microsoft.com/windows-server/administration/windows-commands/tracert) – Hop-Zahl, RTT, Timeout `*` und Parameter.
- [nslookup](https://learn.microsoft.com/windows-server/administration/windows-commands/nslookup) – DNS-Diagnose, interaktiver/nichtinteraktiver Modus.
- [netstat](https://learn.microsoft.com/windows-server/administration/windows-commands/netstat) – Verbindungen, Ports, Zustände und PID.
- [tasklist](https://learn.microsoft.com/windows-server/administration/windows-commands/tasklist) – Prozessliste und Filter.
- [taskkill](https://learn.microsoft.com/windows-server/administration/windows-commands/taskkill) – PID/Image, `/f`, `/t`; beendet Prozesse.
- [sfc](https://learn.microsoft.com/windows-server/administration/windows-commands/sfc) – `/scannow`, Reparaturverhalten und Adminanforderung.
- [chkdsk](https://learn.microsoft.com/windows-server/administration/windows-commands/chkdsk) – Status ohne Reparaturschalter versus fehlerändernde Optionen; Adminanforderung.
- [Repair a Windows Image / DISM](https://learn.microsoft.com/windows-hardware/manufacture/desktop/repair-a-windows-image?view=windows-11) – belastbare Quelle für DISM-Reparatursyntax und Abbildkontext.
- `arp`, `route print`, `hostname`, `whoami`, `systeminfo` und DISM-Grundsyntax: konkrete Einzelartikel im A–Z-Index vor Abschluss der Befehlstexte gezielt prüfen. In dieser Vorbereitung nicht als vollständig redaktionell validiert ausgegeben.

### PowerShell

- [Differences between Windows PowerShell 5.1 and PowerShell 7.x](https://learn.microsoft.com/powershell/scripting/whats-new/differences-from-windows-powershell?view=powershell-7.6) – Engines, Plattform-/Modulunterschiede, `powershell.exe`/`pwsh.exe`, entfernte Cmdlets.
- [Discover PowerShell](https://learn.microsoft.com/powershell/scripting/discover-powershell?view=powershell-7.6) – `Get-Help`, `Get-Command` und Verb-Nomen-Konvention.
- [Get-ComputerInfo](https://learn.microsoft.com/powershell/module/microsoft.powershell.management/get-computerinfo?view=powershell-7.6) – Windows-only, Einführung in 5.1.
- [Get-EventLog, Windows PowerShell 5.1](https://learn.microsoft.com/powershell/module/microsoft.powershell.management/get-eventlog?view=powershell-5.1) – klassische Logs, veraltete API, Hinweis auf `Get-WinEvent`.
- [Get-WinEvent](https://learn.microsoft.com/powershell/module/microsoft.powershell.diagnostics/get-winevent?view=powershell-7.6) – Windows-only, Event Log/ETW, Rechte und Ersatzkontext.
- [Get-NetIPAddress](https://learn.microsoft.com/powershell/module/nettcpip/get-netipaddress?view=windowsserver2025-ps) – IPv4/IPv6 und Filterparameter.
- [Test-NetConnection](https://learn.microsoft.com/powershell/module/nettcpip/test-netconnection?view=windowsserver2025-ps) – ICMP-, TCP- und Routen-Diagnose, Ergebnisfelder.
- [Get-Disk](https://learn.microsoft.com/powershell/module/storage/get-disk?view=windowsserver2025-ps) – OS-sichtbare Disk-Objekte, dynamische Disk-/Clustergrenzen.
- Für `Get-Process`, `Get-Service`, `Test-Connection`, `Resolve-DnsName`, `Get-Volume`, `Get-PhysicalDisk` und exakte Storage-/NetTCPIP-Verfügbarkeit jeweils passende Microsoft-Cmdletartikel und Engine-Ansichten beim Erstellen der konkreten Texte nachschlagen.

## Offene Punkte / Übergabe

1. Die konkreten Ziel-Windows-Versionen/Editionen und die bevorzugte PowerShell-Engine für Lernende sind nicht in den gelesenen Projektquellen festgelegt.
2. Einzelquellen für oben explizit genannte, noch nicht einzeln abgeglichene Befehle/Cmdlets nachziehen, bevor exakte Praxisparameter veröffentlicht werden.
3. Terminus/Jarvis entscheiden nach Phase 1, wie die neuen Diagnoseprofile in den bestehenden Datenvertrag passen; die zusätzlichen Profilfelder brauchen passende Tests.
4. Optionaler Diagnoseassistent erst nach vollständigem Katalog und zunächst als Ablauf auf simulierten Fällen. Keine freie Befehlseingabe/Ausführung.
5. RAID bleibt entsprechend der getroffenen Annahme Architektur-/Didaktik-Konzept; keine RAID-Implementierung hier.

**Keine Befehle im Windows-System ausgeführt.** Keine Git-/Codeänderung, kein Providerwechsel. Jarvis erstellt die Inhalte; GLaDOS prüft unabhängig Simulationen, Pflichtabdeckung, Rechte und Sicherheit.


## Ergänzung 03.11.2026 – gezielte Einzelquellen für Jarvis

**Umfang dieser Ergänzung:** nur die zuvor offengebliebenen Einzelquellen und ein verifiziertes Syntaxbeispiel je angefordertem Befehl/Cmdlet. Kein Windows-Befehl wurde ausgeführt. Beispiele stammen aus den Microsoft-Learn-Artikeln bzw. offiziellen Microsoft-Learn-Suchauszügen und sind Syntaxbelege, keine lokal ausgeführten Resultate. Bei Disk-/Storage-Befehlen, Diagnoseabfragen oder Netzwerkproben gilt: nur lesend bzw. gezielte Anfrage; keine Änderung ist Teil der Beispiele.

### CMD – gezielte Artikel

| Befehl | Quelle und verifizierter Syntaxbeleg | Wichtige Grenze / Hinweis |
|---|---|---|
| `arp` | [arp](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/arp): `arp -a` zeigt den ARP-Cache aller Interfaces. | `arp -a` ist Anzeige. `arp -d` löscht Einträge, `arp -s` setzt einen statischen Eintrag; diese mutierenden Varianten nicht als harmlose Diagnose darstellen. Ausgabe gilt für den lokalen Cache/Interfaces, nicht als vollständiges Geräteverzeichnis. |
| `route print` | [route](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/route_ws2008): `route print` gibt die lokale IP-Routingtabelle aus. | `print` liest; `add`, `change`, `delete` und `/f` können Routen löschen/ändern. In der Übung nur `route print` verwenden. Die Microsoft-Seite nennt TCP/IP als Voraussetzung. |
| `hostname` | [hostname](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/hostname): `hostname` gibt den Hostnamen aus. | Zeigt nur den Hostnamenanteil; keine Aussage über DNS-Erreichbarkeit oder Netzwerkverbindung. Microsoft nennt TCP/IP als Voraussetzung; eine gesetzte Cluster-Variable kann die Ausgabe beeinflussen. |
| `whoami` | [whoami](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/whoami): `whoami /user` zeigt angemeldeten Benutzer und SID; `whoami` ohne Optionen zeigt Domäne und Benutzer. | Liefert Sicherheitskontext des aktuellen Tokens, nicht „wer gerade physisch am Gerät sitzt“; `/all` kann Gruppen/Privilegien offenlegen. Ausgabe daher nur synthetisch abbilden. |
| `systeminfo` | [systeminfo](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/systeminfo): `systeminfo /fo LIST` zeigt lokale Konfiguration im Listenformat. | Ausgabe kann Produkt-ID, Sicherheits-, Hardware- und Netzwerkdaten enthalten. `/s` fragt entfernt ab und `/u` authentifiziert; Kennwörter nicht in Beispiele schreiben (die Microsoft-Seite zeigt historisch ein `/p`-Beispiel, das wir bewusst nicht übernehmen). Keine Administratorpflicht für die einfache lokale Anzeige behaupten. |

### PowerShell – gezielte Cmdlet-Artikel

| Cmdlet | Quelle und verifiziertes Syntaxbeispiel | Wichtige Grenze / Hinweis |
|---|---|---|
| `Get-Help` | [Get-Help / Hilfesystem](https://learn.microsoft.com/powershell/scripting/learn/ps101/02-help-system?view=powershell-7.6#get-help): `Get-Help Get-Command -Full` zeigt ausführliche Hilfe; für Online-Hilfe `Get-Help Get-Command -Online`. | Lokale Hilfe kann Aktualisierung benötigen; `-Online` setzt Browser/Netzzugang voraus und ist für About-Artikel nicht unterstützt. Kein Beleg für die Qualität/Version der lokal installierten Hilfedateien. |
| `Get-Command` | [Discover PowerShell](https://learn.microsoft.com/powershell/scripting/discover-powershell?view=powershell-7.6#find-commands-with-get-command): `Get-Command -Name Get-Process` sucht genau dieses Kommando; auch `Get-Command -Name Get-Command -Syntax` ist dokumentiert. | Zeigt, was in der aktuellen Engine/Session verfügbar ist; ein Treffer beweist nicht, dass ein Kommando auf anderen PowerShell-Versionen oder Geräten vorhanden ist. |
| `Get-Process` | [Get-Process](https://learn.microsoft.com/powershell/module/microsoft.powershell.management/get-process?view=powershell-7.6): `Get-Process -Name pwsh` filtert nach Prozessname. | Liefert lokale Prozessobjekte. 32-bit PowerShell kann bei 64-bit-Prozessen `Path`/`MainModule` nicht liefern; Zugriff auf Module bzw. fremde Prozesse kann erhöhte Rechte benötigen. Nur lesen; Prozessbeenden ist ein separates, veränderndes Cmdlet. |
| `Get-Service` | [Get-Service](https://learn.microsoft.com/powershell/module/microsoft.powershell.management/get-service?view=powershell-7.6): `Get-Service -Name "wmi*"` filtert nach Dienstname. | Nur Windows; Ergebnisse unterliegen den Leseberechtigungen des Benutzers. Das Cmdlet liest Dienste, startet/stoppt sie nicht; dafür wären andere Cmdlets nötig. |
| `Test-Connection` | [Test-Connection](https://learn.microsoft.com/powershell/module/microsoft.powershell.management/test-connection?view=powershell-7.6): `Test-Connection -TargetName Server01 -Count 3 -Delay 2` sendet drei ICMP-Anfragen mit 2-Sekunden-Abstand. | Erzeugt echten Netzwerkverkehr und hängt von ICMP/Firewall/Erreichbarkeit ab; Erfolg belegt keine Dienst-/Port-Erreichbarkeit, Timeout nicht zwingend einen Ausfall. Für Übungen nur simuliert, echte Abfrage nur auf erlaubtes Ziel. |
| `Resolve-DnsName` | [Resolve-DnsName](https://learn.microsoft.com/powershell/module/dnsclient/resolve-dnsname?view=windowsserver2025-ps): `Resolve-DnsName -Name www.bing.com -Type A` fragt A-Records ab; `-DnsOnly` beschränkt die Namensauflösung auf DNS. | Sendet DNS-Abfragen; Ergebnis hängt von Resolver, Cache, Netzwerk und Recordtyp ab. Eine erfolgreiche Namensauflösung belegt weder offenen TCP-Port noch erreichbaren Anwendungsdienst. Beispiel bei Umsetzung besser durch fiktive Ausgabe ergänzen, nicht live ausführen. |
| `Get-Volume` | [Get-Volume](https://learn.microsoft.com/powershell/module/storage/get-volume?view=windowsserver2025-ps): `Get-Volume -DriveLetter C` fragt das Volume zu Laufwerk C ab. | Storage-Modul/Provider und Sichtbarkeit des Systems bestimmen die gelieferten Objekte; Ausgabe ist Volume-, nicht automatisch physische Disk-/RAID-Topologie. Bei Failover-Cluster können Storage-Cmdlets auf Clusterebene wirken. |
| `Get-PhysicalDisk` | [Get-PhysicalDisk](https://learn.microsoft.com/powershell/module/storage/get-physicaldisk?view=windowsserver2025-ps): `Get-PhysicalDisk` listet sichtbare PhysicalDisk-Objekte. | Ergebnis umfasst nur Objekte, die verfügbare Storage-Management-Provider sichtbar machen; Controller, Treiber, Virtualisierung oder Cluster können Darstellung/Umfang beeinflussen. Sichtbare PhysicalDisks allein beweisen kein RAID-Level oder dessen Zustand. Im Cluster können Storage-Cmdlets clusterweit arbeiten. |

### Quellenstatus / Abgrenzung

Die vorstehenden Beispiele und Grenzen sind gezielt an den jeweils verlinkten Microsoft-Learn-Quellen gegengeprüft. Für `arp`, `whoami`, `route`, `systeminfo`, `hostname`, `Get-Process`, `Get-Service`, `Test-Connection`, `Resolve-DnsName`, `Get-Volume` und `Get-PhysicalDisk` lagen passende Einzelartikel bzw. Suchauszüge vor; für `Get-Help` und `Get-Command` wurde das offizielle Microsoft-Learn-Hilfesystem/Discover-PowerShell-Kapitel als passende Referenz verwendet. Die Beispiele sind zur Übernahme in simulierte Lernkarten geeignet, nicht als Behauptung einer Ausführung oder gemessenen Ausgabe.
