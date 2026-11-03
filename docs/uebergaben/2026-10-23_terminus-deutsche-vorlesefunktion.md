# Entscheidungsvorlage: Deutsche Vorlesefunktion für die BWL-Werkstatt

**Projekt:** IT-Ausbildung · **Adressat:** Dennis / Jarvis  
**Status:** Technische Recherche und Empfehlung; keine Installation, Codeänderung oder Integration.  
**Umfang:** Browser- und Windows-Möglichkeiten für spätere Vorlesefunktion.

## Kurzentscheidung

Für den ersten Integrationsschritt empfiehlt sich die **Web Speech API (`speechSynthesis`) als optionale, lokale-zu-bevorzugende Browserfunktion**. Die Anwendung soll verfügbare deutsche Stimmen zur Laufzeit anzeigen, statt bestimmte Stimmenamen vorauszusetzen. Ist keine passende Stimme oder API verfügbar, bleiben die Inhalte vollständig lesbar; die Vorlesesteuerung wird verständlich als nicht verfügbar gekennzeichnet.

Die API ist der kleinste, installationsfreie Weg und bietet Start, Pause, Fortsetzen, Abbruch sowie Stimme und Tempo. Sie garantiert jedoch weder eine bestimmte deutsche Stimme noch eine gleichbleibende Qualität oder lokale Verarbeitung. Deshalb darf die Oberfläche keine konkrete Stimme oder Datenschutzgarantie versprechen, bevor sie das tatsächliche Voice-Merkmal geprüft hat.

**Piper** ist eine mögliche spätere Offline-Alternative, aber keine gleichwertig einfache Browser-Option: Laufzeit, Modellbereitstellung, Lizenzprüfung und Integration wären zusätzliche Betriebs- und Wartungslast. Für die erste BWL-Werkstatt-Version nicht als Voraussetzung einplanen.

## 1. Web Speech API und deutsche Stimmen

- `window.speechSynthesis` und `SpeechSynthesisUtterance` ermöglichen Textausgabe sowie `speak()`, `pause()`, `resume()` und `cancel()`. Ein Utterance-Objekt kann Sprache (`lang`), Stimme (`voice`), Tempo (`rate`), Tonhöhe und Lautstärke setzen.
- `speechSynthesis.getVoices()` liefert die auf diesem Gerät bzw. über den Sprachdienst verfügbaren Stimmen. Die Liste kann anfangs leer sein und später über `voiceschanged` aktualisiert werden; die UI muss deshalb asynchron laden und eine leere Liste korrekt behandeln.
- Stimmen können nach Sprachcode wie `de-DE`, `de-AT` oder `de-CH` gefiltert und in einem beschrifteten Auswahlfeld angeboten werden. Namen und tatsächlich vorhandene Varianten unterscheiden sich zwischen Betriebssystemen und Browsern.
- Windows bietet deutsche TTS-Stimmen. Microsoft dokumentiert unter anderem die deutschen Stimmen Stefan, Hedda und Katja für Deutschland sowie Michael (Österreich) und Karsten (Schweiz); verfügbare Pakete und natürliche Stimmen hängen von Windows-Version und installierter Sprachunterstützung ab. Für die Anwendung sind dies Beispiele, keine garantierten Namen.
- `SpeechSynthesisVoice.localService` kennzeichnet, ob die Stimme laut Browser-Schnittstelle von einem lokalen oder entfernten Synthesizerdienst bereitgestellt wird. `false` bedeutet Remote-Service. Diese Eigenschaft ist ein nützlicher Hinweis, aber kein vollständiger Netzwerk- oder Datenschutz-Audit.

## 2. Bessere Stimmen auswählen

1. Stimmenliste nach erfolgreichem Laden nach deutschem Sprachcode filtern; wenn keine deutsche Stimme existiert, nicht stillschweigend eine beliebige Sprache als „Deutsch“ ausgeben.
2. Eine neutrale Standardwahl anbieten und alle erkannten deutschen Stimmen im Dropdown mit Name, Sprache und – soweit verfügbar – Kennzeichnung „lokal“/„entfernt“ anzeigen.
3. Auswahl nur für die aktuelle Sitzung speichern, sofern kein später ausdrücklich beschlossener Persistenzbedarf besteht. Bei nicht mehr vorhandener Stimme auf eine verfügbare deutsche Stimme oder den Systemstandard zurückfallen und den Wechsel kenntlich machen.
4. Eine kurze Hörprobe ermöglichen, damit Lernende Verständlichkeit und Aussprache selbst beurteilen können. Die BWL-Begriffe und Zahlen müssen mit realen deutschen Stimmen geprüft werden.
5. Keine bestimmte Stimme als „beste“ fest verdrahten: Verständlichkeit, Natürlichkeit und installierte Stimmen sind geräteabhängig. Ein Cloud-Dienst kann bessere Qualität liefern, wäre aber eine eigene Produkt- und Datenschutzentscheidung.

## 3. Datenschutzgrenzen und externe Dienste

- Die Web-Speech-Schnittstelle selbst legt nicht fest, ob die Synthese lokal oder remote ausgeführt wird. Browser und Betriebssystem stellen den Dienst bereit; das Merkmal `localService` kann die Herkunft einer Stimme anzeigen.
- Daher gilt: Bei `localService === true` spricht die API für einen lokalen Synthesizer. Bei `false` muss mit Übertragung des Vorlesetextes an einen entfernten Dienst gerechnet werden. Wenn die Eigenschaft fehlt oder nicht zuverlässig auswertbar ist, darf die Anwendung keine lokale Verarbeitung behaupten.
- Die Webanwendung sollte selbst keine Audiodateien oder Texte an einen Server senden. Vorlesetext ausschließlich aus dem bereits angezeigten Lerninhalt zusammensetzen; keine Antworten, Eingaben, Namen oder Fortschrittsdaten vorlesen oder übertragen, sofern dies nicht ausdrücklich benötigt wird.
- Optionale externe TTS-Anbieter können oft mehr Stimmen und kontrollierbare Qualität bieten. Sie erfordern jedoch eine bewusste Übertragung des Textes, Prüfung von Anbieterbedingungen, Aufbewahrung, Datenregion, Kosten, Einwilligungs-/Informationspflichten und Ausfallverhalten. API-Schlüssel gehören nicht in das statische Frontend; ein Server-Proxy erhöht den Betriebsumfang.
- Ohne explizite Produktentscheidung: keine Cloud-TTS-Anfrage und kein automatischer Fallback auf einen entfernten Dienst. Fehlende lokale Unterstützung führt zu lesbarem Text und einer klaren Meldung, nicht zu unbemerkter Datenübermittlung.

## 4. Optionale lokale Alternative: Piper

Das aktuelle Piper-Projekt wird unter `OHF-Voice/piper1-gpl` weitergeführt. Es beschreibt sich als schnelles, lokales neuronales Text-zu-Sprache-System und stellt unter anderem CLI-, Webserver- sowie Python- und C/C++-Schnittstellen bereit. Das frühere `rhasspy/piper`-Repository ist archiviert und verweist auf dieses Folgeprojekt.

**Vorteile:** Synthese kann lokal betrieben werden; Qualität und ausgewählte Stimme lassen sich kontrollierter bündeln als bei beliebigen Systemstimmen; kein Text muss für die Synthese an einen externen Sprachdienst gesendet werden, wenn Modell und Laufzeit lokal ausgeführt werden.

**Nachteile / Prüfbedarf:** zusätzliche Laufzeit und Modellressourcen, Bereitstellung und Aktualisierung von Stimmen, Performance auf Zielgeräten, mögliche Server-/Prozessarchitektur und Lizenzpflichten. Das aktuelle Piper-Repository ist GPL-3.0; die Lizenz des konkreten Stimmenmodells und seiner Trainingsdaten ist gesondert zu prüfen. Eine Integration in eine statische/offlinefähige Lernseite wäre damit nicht automatisch gegeben.

**Einordnung:** Piper nur als spätere Option evaluieren, falls die Systemstimmen in echten Hörtests nicht genügen und Offlinebetrieb wichtiger ist als Installationsfreiheit. Vor jeder Nutzung Lizenz und konkrete deutsche Stimme rechtlich/technisch prüfen. Keine Installation oder Evaluierung wurde im Rahmen dieser Vorlage ausgeführt.

## 5. Integrationsanforderungen für Jarvis

- **Progressive enhancement:** Lesen, Rechnen und Lernen funktionieren unverändert ohne TTS. Vorlesefunktion ist Zusatzsteuerung, nicht Voraussetzung für Aufgabenabschluss.
- **Gemeinsame Inhalte:** Vorlesen aus denselben sichtbaren Abschnittsdaten; sinnvolle, kurze Segmente wie Ausgangslage, Frage, aktueller Rechenschritt und Feedback einzeln abspielbar. Keine zweite abweichende Textfassung als alleinige Quelle.
- **Steuerung:** klar beschriftete Start-/Pause-/Fortsetzen-/Stopp-Buttons; Zustand sichtbar und programmatisch verfügbar. Wiederholtes Starten darf keine parallelen Stimmen erzeugen. Beim Wechsel des Segments, Moduswechsels und Verlassen der Seite laufende Ausgabe gezielt stoppen oder definierte Fortsetzung anbieten.
- **Sprach- und Stimmeinstellung:** `lang="de-DE"` am Inhalt und `utterance.lang` setzen; Stimmenliste nach `voiceschanged` neu aufbauen; nur passende Stimmen vorschlagen; keine Verfügbarkeit anhand eines hardcodierten Namens annehmen.
- **Tempo:** verständlicher Schieberegler oder Auswahl mit lesbarem Wert und sinnvollem Standard; Änderung auf weitere Utterances anwenden. Keine Aussage, dass jedes Gerät jede Rate gleich umsetzt.
- **Fehler und Abwesenheit:** API nicht vorhanden, keine deutsche Stimme oder Synthese-Fehler klar und kurz melden. Der Text bleibt sichtbar und die übrigen Funktionen bedienbar. Keine ungefangenen Exceptions und kein stiller Remote-Fallback.
- **Barrierefreiheit:** native Buttons/Selects, Tastaturbedienung und sichtbarer Fokus; `aria-live` sparsam für Status/Fehler, nicht für den gesamten gesprochenen Text. Nutzer müssen jederzeit stoppen können. TTS ersetzt weder korrekte Überschriften/Labels noch Screenreader-Kompatibilität.
- **Datenschutz und Netz:** keine vom Anwendungscode ausgelösten externen Requests für den Standardpfad. Falls später ein Anbieter ergänzt wird, eigener Opt-in/Transparenztext und prüfbare Netzwerkanfragen; API-Geheimnisse nicht clientseitig ablegen.
- **Qualitätssicherung:** automatisiert API-Abwesenheit, leere/verspätete Stimmenliste, Sprachefilter, Statuswechsel, doppelten Start, Abbruch und Fehlerzustände testen. Separat echte Browser- und Hörtests auf unterstützten Windows-/Browserkombinationen durchführen; Aussprache von Eurobeträgen, Dezimalkomma, Prozenten und Abkürzungen prüfen.

## Empfehlung / Entscheidungspunkte

1. **Jetzt:** Web Speech API als optionale erste Variante; ausschließlich verfügbare deutsche Stimmen, local/remote-Status soweit ermittelbar, kein Cloud-Fallback.
2. **Vor Abnahme:** konkrete Browser-/Windows-Kombinationen und echte Aussprachequalität testen; lokale Stimmeninstallation ist eine Voraussetzung, die je Zielgerät dokumentiert werden muss.
3. **Später nur bei Bedarf:** Piper-Prototyp als separate lokale Alternative evaluieren, mit Lizenzprüfung pro Modell und Bewertung von Download-/Speicher-/CPU-Aufwand.
4. **Explizite Produktentscheidung erforderlich**, falls externe TTS-Dienste, serverseitige Verarbeitung oder dauerhaft gespeicherte Stimmeinstellungen gewünscht werden.

## Quellen

- MDN, `SpeechSynthesis.getVoices()` – verfügbare Stimmen, asynchrones Laden und `voiceschanged`: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices
- MDN, `SpeechSynthesisUtterance` – Stimme, Sprache, Tempo und Ereignisse: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
- MDN, `SpeechSynthesisVoice.localService` – lokal oder remote bereitgestellter Synthesizer: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice/localService
- Microsoft Support, unterstützte Narrator-Sprachen und Stimmen (Windows 10/11): https://support.microsoft.com/en-us/accessibility/windows/narrator/appendix-a-supported-languages-and-voices
- OHF-Voice Piper-Projekt (README und angegebene Projektlizenz): https://github.com/OHF-Voice/piper1-gpl
- Archivhinweis und Projektwechsel des früheren Piper-Repositories: https://github.com/rhasspy/piper

## Offene Punkte / Prüfgrenzen

- Im Projekt wurden keine separaten TTS-Architekturdokumente oder früheren TTS-Entscheidungsvorlagen gefunden. Berücksichtigt wurden die vorhandene Offline-HTML/CSS/JS-Architektur (laut `docs/plan-lf1-lf2.md`), die BWL-Technikspezifikation sowie die aktuelle Codebasis nur lesend.
- Die konkrete Laufzeitumgebung der Lernplattform, Zielbrowser und installierten Stimmen wurden nicht auf einem Windows-Gerät praktisch geprüft.
- Es wurden keine Hör-, Browser-, Screenreader- oder Netzwerkprüfungen ausgeführt. Die Empfehlung ist daher eine technische Vorentscheidung, keine Abnahme.
- Cloud-Anbieter und deren konkrete Vertrags-/Datenschutzbedingungen wurden nicht einzeln verglichen; für einen solchen Dienst ist eine separate Auswahl und Prüfung nötig.
