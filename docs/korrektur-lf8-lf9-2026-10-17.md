# LF8/LF9: Korrekturauftrag, Paketnachweis

Stand: 17.10.2026. Branch `lehrjahr-2/serviceanfragen`, Ausgangs-HEAD `26769f7`. LF8/LF9 bleiben gesperrt (`kommt-bald`). Jahr 1, gemeinsame LF1–7-Engines und Katalogstatus sind unverändert. Geprüfte Pakete werden ausschließlich lokal durch Terminus committet, kein Push oder Deployment.

## Paket 1: fachliche Korrekturen

| Befund | Umsetzung | Dateien |
| --- | --- | --- |
| F1 Auftrag, Berechtigung, Rechtsgrundlage | Die Caféleitung als Empfänger ist ausdrücklich eine Modellannahme. „Erreichbar ist nicht berechtigt.“ Der Kundenauftrag ersetzt die rechtliche Prüfung nicht. Frage q1 fragt jetzt nach dem festgelegten Empfänger statt nach „darf sehen“. | `lf8-recht.js`, `lf8-kontrolle.js` |
| F2 Dienst ist nicht Zugriff | Neuer Theorieabsatz „Dienst ist nicht Zugriff“. Die Unerreichbarkeit der Kasse ist eine eigene Anforderung (Trennung, Zugriffsregeln). Die Begründung „kein Dienst, also unerreichbar“ ist entfernt. | `lf9-dienste.js`, `lf9-kontrolle.js` |
| F3 Keine Namensliste ≠ kein Personenbezug | Pauschale Aussage „keine Personendaten erhoben“ entfällt. Technisch anfallende Daten (IP-Adressen, Protokolle) sind vor der Umsetzung zu prüfen (DSGVO Art. 4 Nr. 1, Erwägungsgrund 30). Kein Rechtsrat. Namen im Beispiel: „Im echten Betrieb wären sie personenbezogen.“ | `lf9-schutz.js`, `lf8-recht.js`, beide Kontrollen |
| F4 Kundenregel ≠ technischer Standard | Die Trennungsregel ist Kundenanforderung und Abnahmekriterium. Ein Standard ist eine öffentlich beschriebene Spezifikation, konkret DHCP nach RFC 2131, mit prüfbarer Eigenschaft. Die Option `regel` bleibt als ID erhalten, ihr Text ist fachlich korrigiert. | `lf9-standard.js`, `lf9-kontrolle.js` |
| F6 Datenzeilen, Formatierung vs. Rundung | Beispieldatensätze sind in der Lektion hinterlegt: Kassenliste 12.–15.10.2026 mit Wert 0 am 13.10. und fehlendem Wert am 14.10., Schichttabelle mit mehreren Schichten pro Tag, Einheiten Euro und Personen. 1234,5 → 1.234,50 ist Formatierung, Rundung erst beim Wegfall von Stellen. „Acht erfundene Zeilen“ und die Verweise auf „Beispieldateien“ sind entfernt. Die interaktive Umsetzung folgt in Paket 2. | `lf8-aufbereiten.js`, `lf8-reflexion.js`, `lf8-kontrolle.js` |
| F7 Kapazität | „Höchstens zehn Gäste“ wird zu „mindestens zehn gleichzeitige Endgeräte“ als Planungskapazität, ohne harte Sperre. Das Gästenetz wird im Besprechungsraum genutzt, eine raumgenaue Funkgrenze wird nicht behauptet. Variante B wird als „ohne Zugriffsschutz für die Kasse“ begründet, nicht als „Kasse erreichbar“. | `lf9-anforderung.js`, `lf9-eignung.js`, `lf9-standard.js`, `lf9-zukunft.js`, `lf9-schutz.js`, `lf9-kontrolle.js` |

Alle Modul-, Frage- und Options-IDs, alle richtigen Options-IDs, die Speicherschlüssel sowie Antwortreihenfolge und `richtig`-Buchstaben der Kontrollen sind unverändert. Nur Texte wurden geändert.

## Tests

- `tests/lf8-inhalte.test.js`: Die veraltete Assertion `/keine echte Datenbank/` auf `docs/plan-lf8.md` schlug schon im Ausgangsstand HEAD fehl, weil der Plan diesen Satz nicht mehr enthält. Sie wurde durch `/noch nicht im Katalog freigeschaltet/` ersetzt. Texte wurden dafür nicht gekürzt. Neu: Assertions für F1 und F6.
- `tests/lf9-inhalte.test.js`: neue Assertions für F3, F4 und F7.
- Ergebnis: `node --check` für alle `js/lf8-*.js`, `js/lf9-*.js` und beide Tests ohne Fehler. `node tests/lf8-inhalte.test.js` und `node tests/lf9-inhalte.test.js` bestanden. `git diff --check` ohne Befund.
- Zusätzlich nach der letzten Textänderung gelaufen: `node tests/lf8-lf9-browser.test.js`. Ergebnis: „LF8/LF9 Browser: 18 Seiten und Katalog bestanden.“ Die Prüfung der IDs, richtigen Options-IDs und `richtig`-Buchstaben im Diff ergab keine ungepaarte Änderung.

## Speicherbefund (Grundlage für Paket 3)

Terminus hat die fachlichen Diffs und Speicherpfade selbst gelesen sowie beide Inhaltstests und `tests/fortschritt.test.js` erfolgreich ausgeführt. Bei der Nachprüfung ergänzt: Verzicht auf Namenslisten schließt Authentisierung und Verschlüsselung nicht aus; der Kontrollhinweis zur Variante B benennt den fehlenden Zugriffsschutz statt allein das gemeinsame Netz. Anschließend beide betroffenen Inhaltstests und `git diff --check` erneut erfolgreich. Der vollständige Browserdurchlauf von Jarvis wird nicht als unabhängige GLaDOS-Prüfung ausgegeben und hier nicht grundlos wiederholt.

- **Lektionen** (`lf8-lektion.js`, `lf9-lektion.js`): Schlüssel `it-ausbildung.<id>.v1`. Antworten liegen als Frage-ID → Options-ID (`q1` → `leitung`). `normalize` verwirft Antworten, deren Options-ID nicht mehr existiert. Das ist positionsunabhängig und sicher gegenüber Umsortieren, solange IDs bleiben. Der Fortschritt in `fortschritt.js` prüft feste Options-IDs je Lektion.
- **Kontrollen** (`lf8-kontrolle.js`, `lf9-kontrolle.js`): Schlüssel `it-ausbildung.lf8-kontrolle.v1` bzw. `lf9-kontrolle.v1`. Antworten liegen als **numerischer Frageindex → Buchstabe a/b/c**, also gebunden an Array-Position von Frage und Option. `fortschritt.js` enthält zusätzlich eine feste Lösungsliste (`sollMap`, Muster a/b/c wiederholt). Fragen oder Optionen umzusortieren würde gespeicherte Stände falsch auswerten oder die Fortschrittsanzeige verfälschen.
- **Legacy-Risiko**: Jede Änderung der Reihenfolge ohne Entkopplung kippt gespeicherte Kontrollstände und die Fortschrittsableitung.
- **Test-Risiko**: Die Inhaltstests erzwingen aktuell das Muster `richtig = a/b/c nach i % 3` und „richtige Antwort ist nicht die längste“. Diese Assertions müssen in Paket 3 fachlich ersetzt werden.
- **Vorschlag für Paket 3** (mit Terminus' Lesebefund abgeglichen): Frageindizes und ursprüngliche Buchstaben als stabile Option-IDs beibehalten, die Anzeigereihenfolge davon entkoppeln, `sollMap` unverändert lassen. Eine Migration gespeicherter Stände ist dann nicht nötig.

## Offen

- Paket 2: praktische, interaktive Lernaktivitäten, insbesondere die Datenzeilen aus F6.
- Paket 3: erratbare Antwortmuster, Anzeigereihenfolge, Ersatz der Test-Assertions.
- Nutzerprüfung durch GLaDOS nach Paket 3.
- Freigabe und Katalogstatus bleiben bei Dennis.

## Paket 2: praktische Lernaktivitäten (Terminus)

Jarvis hatte in diesem Paket nach zwei Leseaufrufen ein erschöpftes Werkzeugbudget gemeldet und keine Änderungen vorgenommen. Terminus hat das unveränderte Paket direkt übernommen; keine konkurrierenden Schreibvorgänge. Paket 1 ist lokal als `734027a` gesichert.

| Ziel/Fundstelle | Konkrete Aktivität / überprüfbares Produkt | Grenze |
| --- | --- | --- |
| LF8 Quellen, Struktur, heterogene Formate | Sichtbare, editierbare CSV-Kasse und JSON-Schichten; Feldmapping Datum→tag; Validierung von Datum, Einheiten, Zahlen und Dubletten | Bewusst eingeschränkter CSV-Dialekt, 100 Zeilen/Quelle, nur EUR; keine Verbindung zu echter Kasse |
| LF8 Aufbereitung/Bereitstellung | Ausführung der Transformation im Browser, eine Ergebniszeile je Tag, alle Schichten erhalten; Null/fehlend unterscheiden; tatsächlicher CSV-Blob-Download und kopierbare Ausgabe | Keine Datenbank/Server-API, keine erfundenen Summen oder Nullwerte, keine allgemeine Datenintegration |
| LF8 Arbeitsteilung, Handhabung, Reflexion/Fremdsprache | Rollen A/B (auch nacheinander), DE/EN-Handhabung und offline RFC-4180-Auszug, Übergabenotiz und Peer-Kontrolle der Tage 13./14.10.; Reflexions-/Übergabeseiten verlinken Labor | Rollenleistung, freie Notiz und Sprachverständnis benötigen menschliche Beurteilung; Export allein enthält Notiz nicht |
| LF9 Konfiguration/Dienstimplementierung | /24-Modellnetze, DHCP an/aus, Pool, Gateway und Sperrregel veränderbar; ausdrückliches Anwenden, danach Modelltests | Vereinfachte Browserimplementierung, kein DHCP-Nachrichtenaustausch und keine reale Geräteinstallation |
| LF9 Standard/Prüfung/Fehlerbehebung | RFC-2131-Originalauszug mit DE-Auftrag; reproduzierbare Modellfehler (fehlender DHCP-Dienst, kleiner Pool, gleiche Netze, fehlende Sperre); Protokoll pro Endgerät mit DHCP/Gateway/Kasse | Keine Pakete/Scans, kein WLAN-/Internet-/Durchsatztest. Ohne Lease ist Kassensperre nicht prüfbar. Keine vollständige RFC-Konformität |
| LF9 Wirtschaftlichkeit/Nachhaltigkeit/Zukunft | Berechenbare fiktive Varianten Kauf+Strom über Nutzungsdauer, offene Wartung/Entsorgung, Test 10→15 Endgeräte, begründete Übergabenotiz | Keine Preisangebote oder Ökobilanz, keine echte Kundenabnahme, billige aber unsichere Variante bleibt unzulässig |

Neue isolierte Speicherung: `it-ausbildung.lf8-praxis.v1` und `it-ausbildung.lf9-praxis.v1`. Eingaben/Notizen werden gespeichert, Ergebnisse nach Änderungen oder Reload verworfen und erst nach erneutem Ausführen als aktuell gezeigt. Keine Änderung bestehender Antworten, Speicherschlüssel, Abschlüsse oder Fortschrittslogik; Wissensfragen-Abschlüsse sind ausdrücklich kein Praxisnachweis. Keine neue Lektion und keine Katalogfreigabe.

### Prüfbelege Paket 2

- `node --check js/lf8-praxis.js`, `node --check js/lf9-praxis.js`: bestanden.
- `node tests/lf8-lf9-praxis.test.js`: echte Funktionen geprüft, Standarddaten, Null/fehlend, Mehrfachschichten, fehlende Schichten, Dubletten, ungültiges Datum/JSON/Einheit/Zahl, Mappingfehler, DHCP/Schutz-/Kapazitätsfehler, Kostenmodell bestanden.
- `node tests/lf8-inhalte.test.js` und `node tests/lf9-inhalte.test.js`: bestanden. Der lokale Linkcheck überspringt nun ausdrücklich https-Quellenlinks statt sie als lokale Dateien aufzulösen.
- `node tests/lf8-lf9-praxis-browser.test.js`: bestanden. Leere/falsche/richtige Eingaben, Änderung→Ergebnis veraltet, Browser-Zurück, Reload/Eingabenerhalt, CSV-Blob-Inhalt/Markieren, Modellkonfiguration anwenden, DHCP aus/Pool klein/Sperre fehlt, 10→15 Endgeräte/Poolkorrektur, Kostenanzeige, keine Browser-Ausnahmen oder fehlenden Ressourcen, 320/390px ohne Überbreite.
- Erster Browser-Testlauf scheiterte an Top-level-await in der CDP-Prüfexpression (nicht am Labor). Implementation und Test gelesen; Expression als async-IIFE repariert, exakt denselben Test erfolgreich wiederholt.
- Screenshots `.output/lf89-praxis/lf8-datenwerkstatt-{320,390}.png` und `lf9-netzlabor-{320,390}.png`. Terminus hat die 320px-LF8- und 390px-LF9-Aufnahmen direkt angesehen: lesbare, einspaltige Abschnitte ohne horizontales Abschneiden. GLaDOS-Nutzerprüfung folgt erst nach Paket 3.
