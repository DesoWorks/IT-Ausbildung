# Windows-Werkzeuglabor: Umsetzungs- und Abnahmegrenze

Direkter Commander-Auftrag 03.11.2026. Terminus koordiniert und verantwortet Git, Jarvis implementiert, C3PO liefert Quellen, GLaDOS prüft unabhängig.

## Bestand und Entscheidungen

Worktree `/home/starnet/projects/IT-Ausbildung-werkzeugkiste`, vorhandener eigener Branch `feature/windows-werkzeugkiste`, Ausgang `949cf82325ba93b051bd7b55aa27fd925f3e3774`. Versionierte Dateien bei Übernahme sauber, altes untracked `vorschau/` nicht verändern. Kein neuer Parallelkatalog: die vorhandene Seite wird erweitert, bestehende sieben Tastenkombinationen/neun Ausführen-Werkzeuge und deren Übungen/Tests bleiben nutzbar. IDs/Katalogroute bleiben stabil. Bestehender Node-Modultest: 18 Prüfungen bestanden. Der Branch enthält bereits BWL-/Navigations-Vorfahren, diese werden nicht geändert oder nach dev/main integriert.

## Pflichtumfang

CMD: ping, ipconfig, tracert, nslookup, netstat, arp, route print, hostname, whoami, systeminfo, tasklist, taskkill, sfc /scannow, DISM, chkdsk.
PowerShell: Get-Help, Get-Command, Get-Process, Get-Service, Get-ComputerInfo, Get-NetIPAddress, Test-Connection, Test-NetConnection, Resolve-DnsName, Get-EventLog und Get-WinEvent (Versionsunterschied!), Get-Volume, Get-Disk, Get-PhysicalDisk.

Für jeden Befehl sicht-/auffindbar: Zweck/Einsatz, Syntax/Parameter, sicheres konkretes Praxisbeispiel, ausdrücklich simulierte realistische Ausgabe, Interpretation wichtiger Zeilen, typische Fehler mit Ursachen, Rechte und Sicherheits-/Änderungsrisiken, kleine Frage oder Übung mit Erklärung. Keine echte Befehlsausführung, Netzwerkdiagnose oder Systemänderung durch die App. Diagnose ist nicht pauschal risikolos: Zielberechtigung und sensible Ausgaben beachten. Rechte abhängig von konkreter Aktion erklären; Lesebefehl nicht mit schreibenden Parametern gleichsetzen. Windows PowerShell 5.1/PowerShell7 und Windows-spezifische Module unterscheiden.

## Darstellung und Abnahme

Vorhandene Formsprache beibehalten, kein Redesign der Plattform. Umfangreiche Lerninhalte über verständliche Kategorien und gezielte Auswahl/Suche zugänglich machen, nicht bloß unüberschaubare Textwand. Vollständig per Tastatur, sichtbarer Fokus, verständliche Beschriftungen und Rückmeldungen. Lange Ausgaben dürfen innerhalb ihrer Box scrollbar sein, nicht die gesamte Seite verbreitern. 1440/768/320 CSS-px prüfen. Bestehende Übungs-/Testmodi samt Neustart und Zählung erhalten.

Regression: Pflichtbefehle/Feldvollständigkeit/Quellen, sichere Rendering- und Datenvalidierung, passende Bewertung und Wiederholung; bestehende Tests an Erweiterungen fachlich sinnvoll anpassen, nicht blind exakte Altanzahl erzwingen. Unabhängige GLaDOS-Nutzerprüfung erst nach fertiger Implementierung. Technische Browser-Simulation ist kein echter Windows-Livebefehlstest oder Screenreader-Nachweis.

Optionaler Diagnoseassistent ist nachrangig: erst bei vollständigem Pflichtumfang und ausreichendem Arbeitsrahmen. Fünf Ursachen (Verbindung, DNS, Gateway, Zielserver, lokaler Dienst) als transparente Simulation, keine vorschnellen Beweisbehauptungen etwa „ping scheitert = Server aus“. RAID erst nach erfolgreicher Phase1/2; Phase3 ist Konzept, keine halbe Implementierung.

Kein Merge/Änderung an dev/main/Pages, kein Deployment, keine Versions- oder Fachfreigabe. Nur eigene geprüfte Änderungen gezielt committen/pushen. Kontingente unbekannt, keine künstlichen Prozentwerte oder bezahlten Fallbacks.

Bestands-Browserprobe vor den Codeänderungen (Terminus, echter Headless-Chrome/CDP): Lernkarten/Übung/Test jeweils1440/768/320 =9Kombinationen ohne horizontalen Seitenüberlauf oder Runtime-Ausnahme; leere Antwort zeigt Fehler, gewählte Antwort zeigt Rückmeldung, Weiter führt zu Aufgabe2. Beleg im Terminus-Workspace `pruefung/windows-bestand-browser.cjs` und `pruefung/windows-bestand-evidence.json`. Diese Ausgangsprobe ist keine Abnahme der Erweiterung.
