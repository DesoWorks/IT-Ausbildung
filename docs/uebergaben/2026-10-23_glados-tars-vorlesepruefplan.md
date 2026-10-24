# Prüfplan: TARS-Vorleseprototyp

**Projekt:** IT-Ausbildung · BWL-Werkstatt  
**Prüfung:** unabhängige Qualitätssicherung durch GLaDOS  
**Status:** Prüfplan erstellt; Prüfung noch nicht ausgeführt.  
**Arbeitsgrenzen:** TARS-Dateien nur lesend untersuchen und vorhandene Tests ausführen, erst nachdem TARS den Prototyp ausdrücklich als fertig gemeldet hat. Keine Änderungen, Commits oder Deployments.

## Zweck und Prüfgrundlage

Geprüft wird der isolierte Vorleseprototyp, nicht die spätere Integration in die BWL-Werkstatt. Zu Beginn der tatsächlichen Prüfung werden Fertigmeldung, konkreter Prototyp-Pfad, Browser-/Startverfahren, verwendete Version bzw. Arbeitsstand und vorhandene Tests festgehalten. Nur bereitgestellte isolierte Prototypdateien werden gelesen. Keine Installation und keine Änderung an Projekt-, TARS-, StarNetOS-, GalaxynetOS- oder Ollama-Dateien.

Echte Browser- und Hörprüfungen erfolgen nur, wenn der Prototyp ohne Änderungen in der verfügbaren Testumgebung gestartet und sicher bedient werden kann. Fehlende Systemstimmen, Browser-APIs oder Audioausgabe werden als Umgebungsgrenze dokumentiert, nicht als Anwendungsfehler.

## Prüfphasen – getrennt ausweisen

### A. Codeprüfung (lesend)

- Architektur und verwendete Vorlese-Schnittstelle nachvollziehen.
- Prüfen, wie deutsche Stimmen ermittelt und ausgewählt werden und wie mit verspätet geladenen Stimmen umgegangen wird.
- Start, Pause, Fortsetzen, Stopp, Tempoänderung sowie Mehrfachstart/Abbruch im Codepfad nachvollziehen.
- Fallbacks und Fehlermeldungen bei fehlender oder nicht verfügbarer Sprachunterstützung identifizieren.
- Netzwerkzugriffe des eigenen Anwendungscodes (z. B. fetch/XHR, WebSocket, externe Skripte oder Audio-Endpunkte) statisch suchen und Herkunft/Zweck festhalten. Codebefund ist kein Beleg für tatsächliches Netzwerkverhalten.
- Nur vorhandene Projekttests lesen und deren Bezug zu den Kriterien benennen.

### B. Automatisierte Tests (nur vorhandene Tests)

- Vorhandene Tests im isolierten Prototyp mit dokumentiertem Befehl ausführen; keine neuen Tests oder Abhängigkeiten installieren.
- Tatsächlichen Befehl, Ergebnis, relevante Ausgabe und nicht abgedeckte Kriterien festhalten.
- Ein grüner Testlauf belegt nur die im Test abgedeckten Abläufe; er ersetzt weder Bedienung noch Hör- oder Netzwerkkontrolle.

### C. Echte Browser-, Bedien- und Hörtests

- Im Browser sichtbare Zustände vor und nach jeder Aktion lesen und protokollieren.
- Mit einer verfügbaren deutschen Stimme hörbar prüfen. Stimme, Browser/Version soweit sichtbar, Betriebssystem-/Stimmenumgebung und auffällige Aussprache notieren.
- Tastaturabläufe und sichtbaren Fokus tatsächlich bedienen. Screenreader-Ergebnisse nur nennen, falls ein Screenreader-Test wirklich durchgeführt wurde.
- Tatsächliche Netzwerkanfragen während repräsentativer Bedienung mit verfügbarer Netzwerkkontrolle beobachten. Statische Codeprüfung nicht als Ersatz ausgeben.

## Fälle

### TTS-01 – Start
**Schritte:** Prototyp öffnen, einen vorgesehenen Textabschnitt auswählen und Vorlesen starten.  
**Erwartet:** Ausgabe beginnt einmalig mit dem ausgewählten Abschnitt; sichtbarer Zustand zeigt eindeutig, dass vorgelesen wird. Kein falscher oder zusätzlicher Abschnitt wird gesprochen.

### TTS-02 – Pause und Fortsetzen
**Schritte:** Während der Ausgabe pausieren, kurz warten und fortsetzen.  
**Erwartet:** Pause beendet die aktuelle Ausgabe vorübergehend; Fortsetzen führt sie nachvollziehbar fort und startet nicht zusätzlich von vorn. Status und Bedienelemente entsprechen dem tatsächlichen Zustand.

### TTS-03 – Stopp
**Schritte:** Während der Ausgabe stoppen; danach erneut einen Abschnitt starten.  
**Erwartet:** Ausgabe endet zeitnah und bleibt beendet. Ein späterer Start funktioniert ohne hängen gebliebenen Zustand oder alte Ausgabe.

### TTS-04 – Deutsche Stimmen auswählen
**Schritte:** Stimmenauswahl öffnen, verfügbare deutsche Stimmen identifizieren und nacheinander auswählen. Auswahl ändern, während nicht gesprochen wird; falls vorgesehen, auch während aktiver Ausgabe.  
**Erwartet:** Sprache/Name der Auswahl ist verständlich erkennbar. Die tatsächlich verwendete Stimme entspricht der ausgewählten verfügbaren deutschen Stimme. Fehlende deutsche Stimmen werden nicht als vorhanden dargestellt. Änderung während aktiver Ausgabe verhält sich klar und konsistent.

### TTS-05 – Geschwindigkeit
**Schritte:** Langsame, mittlere und schnelle verfügbare Einstellung wählen und denselben kurzen Abschnitt vergleichen.  
**Erwartet:** Der Wert ist wahrnehmbar und konsistent angepasst, bleibt innerhalb unterstützter Grenzen und verursacht keine unbeabsichtigte zusätzliche Ausgabe. Bedienung und aktuelle Einstellung sind verständlich erkennbar.

### TTS-06 – Fehlende Sprachunterstützung
**Schritte:** Soweit ohne Veränderung der Testumgebung sicher möglich, eine Umgebung ohne unterstützte Vorlesefunktion oder ohne deutsche Stimme verwenden; andernfalls den Fallback-Code lesend beurteilen.  
**Erwartet:** Anwendung stürzt nicht ab. Eine verständliche Meldung beschreibt die Einschränkung und, falls bekannt, eine sinnvolle nächste Möglichkeit. Nicht verfügbare Optionen sind deaktiviert oder als nicht verfügbar kenntlich. Keine unbestätigte Erfolgsmeldung.

### TTS-07 – Mehrfach starten und abbrechen
**Schritte:** Während laufender Ausgabe Start wiederholt betätigen; anschließend schnell stoppen bzw. abbrechen und danach erneut starten. Wiederholen, sofern kein Daten- oder Umgebungsrisiko entsteht.  
**Erwartet:** Es entstehen keine überlagerten, doppelten oder veralteten Sprachwarteschlangen. Abbruch beendet die Ausgabe; der Zustand bleibt bedienbar. Häufigkeit und sichere Wiederholbarkeit festhalten.

### TTS-08 – Tastatur und sichtbarer Fokus
**Schritte:** Ohne Maus mit Tabulator zu allen Vorlesesteuerungen navigieren; Aktionen mit den vorgesehenen Tasten auslösen; Fokus durch Start, Pause und Stopp beobachten.  
**Erwartet:** Alle wesentlichen Funktionen sind per Tastatur erreichbar; Fokus ist jederzeit sichtbar und geht nicht verloren. Reihenfolge ist nachvollziehbar, Bedienelemente haben verständliche Beschriftungen und keine Aktion wird versehentlich mehrfach ausgelöst.

### TTS-09 – Fehlermeldungen und Zustandsverständlichkeit
**Schritte:** Unterstützungsfehler oder sonstige sicher erreichbare Fehler-/Leerlaufzustände auslösen; Meldung und Wiederherstellungsweg prüfen. Erfolgs-, Pause-, Stopp- und Abschlusszustand vergleichen.  
**Erwartet:** Meldung nennt in einfacher Sprache das Problem und den möglichen nächsten Schritt. Sie ist nicht allein durch Farbe verständlich; Zustandswechsel sind sichtbar und programmatisch zugänglich, soweit am Prototyp prüfbar. Keine technische Fehlermeldung ohne nutzerverständliche Erklärung.

### TTS-10 – Unbeabsichtigte externe Anfragen
**Schritte:** Vor Bedienung vorhandene Quellen/Herkunft der Skripte und Ressourcen notieren. Dann Netzwerkverkehr während Laden, Stimme auswählen und Vorlesen/Stoppen beobachten. Eigene, vom Anwendungscode ausgelöste externe Anfragen von Browser-/Betriebssystemverkehr unterscheiden, soweit die verfügbaren Belege das erlauben.  
**Erwartet:** Kein unerwarteter externer Aufruf durch den Anwendungscode. Jeder beobachtete externe Endpunkt wird mit Auslöser und sichtbarem Zweck dokumentiert. Wenn Netzwerkkontrolle oder sichere Abgrenzung nicht möglich ist, lautet das Ergebnis „nicht geprüft“ bzw. „nicht eindeutig zuordenbar“, nicht „keine Anfragen“.

## Befundregeln und Abschlussprotokoll

Für jeden Fall Status **bestanden**, **Fehler**, **Auffälligkeit** oder **nicht geprüft** mit Beleg angeben. Bei Fehlern: nummerierte Schritte, Ausgangslage, Soll und Ist, Nutzerauswirkung, Häufigkeit/Reproduktion und Beleg dokumentieren. Einmalige Beobachtungen ausdrücklich als solche kennzeichnen. Codevermutungen getrennt von reproduzierbaren Browserfehlern aufführen.

Abschlussbericht in drei getrennten Abschnitten: **Codeprüfung**, **automatisierte Tests**, **echte Browser-/Hörtests**. Dazu geprüfter Stand und Umgebung, wichtigste Befunde, nicht geprüfte Kriterien und konkrete Blocker nennen. Keine pauschale Aussage „fehlerfrei“.

## Aktueller Stand und Blocker

Der Auftrag sieht die Ausführung erst nach TARS' ausdrücklicher Fertigmeldung vor. Im bei Erstellung geprüften Projektordner lag kein erkennbares isoliertes TARS-Prototypdokument bzw. keine entsprechend benannte Datei vor; eine explizite Fertigmeldung war im bereitgestellten Gesprächskontext nicht enthalten. Daher wurden weder Prototypdateien untersucht noch Tests, Browserbedienung, Hörtests oder Netzwerkkontrollen ausgeführt.
