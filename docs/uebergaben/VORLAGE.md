# Übergabebericht

Status: VORLAGE. Nicht ausfüllen und nicht als Bericht verwenden.
Diese Datei wird nicht überschrieben und nicht in einen Bericht umbenannt.

## Verwendung

1. Lege für jedes abgeschlossene Arbeitspaket eine **neue** Datei an.
2. Dateiname: `YYYY-MM-DD_<paketkennung>.md`
   Beispiel: `2026-10-22_c3po-notion-probe.md`
3. `paketkennung` ist kurz, kleingeschrieben, mit Bindestrichen und innerhalb des Projekts eindeutig.
4. Eine bestehende Berichtsdatei wird nicht still überschrieben.
5. Eine Korrektur ist eine neue Datei. Sie verweist auf die vorherige Datei und erklärt die Abweichung.
6. Diese Vorlage bleibt unverändert. Pflichtfelder nicht löschen. Fehlende Angaben als `offen` kennzeichnen, nicht erfinden.
7. Keine Schlüssel, Tokens oder Passwörter.

Projektordner in dieser Erprobung: `/home/starnet/projects/IT-Ausbildung`
Andere Projekte nutzen diese Datei noch nicht.

## Pflichtfelder

- Projektkennung:
- Paketkennung:
- Datum:
- Ausführender Agent:
- Ergebnis:
- Betroffene Dateien:
- Branch:
- Commit:
- Arbeitsbaumstatus:
- Teststatus:
- Testnachweis:
- Entscheidungen:
- Urheber der Entscheidungen:
- Offene Fragen:
- Risiken:
- Nächster Schritt:
- Status der Notion-Übernahme:

## Ausfüllhinweise

Projektkennung: Name des Projektordners, hier `IT-Ausbildung`.

Paketkennung: Dieselbe Kennung wie im Dateinamen, ohne Datum. Ein Paket, eine Kennung. Dieselbe Kennung nicht für einen zweiten Sachverhalt wiederverwenden.

Datum: `YYYY-MM-DD`, Stationszeit Europe/Berlin. Keine Uhrzeit erfinden.

Ausführender Agent: Der Agent, der das Paket ausgeführt hat. Wer nur dokumentiert, steht nicht an dieser Stelle, sondern unter dem Notion-Status.

Ergebnis: Was tatsächlich fertig ist. Eine Absicht ist kein Ergebnis. `nicht ausgeführt` ist zulässig.

Betroffene Dateien: Konkrete Pfade. `keine` ist zulässig. Keine Datei nennen, die nicht angefasst oder geprüft wurde.

Branch: Aktueller Branch laut `git status`. Bei mehreren Branches den gelesenen nennen.

Commit: Commit-ID des zugehörigen Standes, oder `nicht committet`. Keine ID schätzen.

Arbeitsbaumstatus: Ausgabe von `git status --short` für die betroffenen Pfade, oder `sauber`. Fremde unversionierte Dateien nennen, nicht als eigene Änderung ausgeben.

Teststatus: `bestanden`, `fehlgeschlagen`, `nicht ausgeführt` oder `nicht zutreffend`.

Testnachweis: Befehl und beobachtetes Ergebnis. Ein Dateiname allein ist kein Nachweis. Nicht ausgeführte Tests nicht als bestanden markieren.

Entscheidungen: Nur wörtlich belegte Entscheidungen, mit Datum und Quelle. Ein Vorschlag bleibt ein Vorschlag. `keine neue Entscheidung` ist zulässig.

Urheber der Entscheidungen: Person oder Agent, der die Entscheidung getroffen hat. Fehlt der Urheber, `offen`, nicht dem Protokollführer zuschreiben.

Offene Fragen: Was den nächsten Schritt ändern würde. `keine` ist zulässig.

Risiken: Konkretes Risiko und Auswirkung. `keins erkannt` ist zulässig, wenn der Paketumfang geprüft wurde.

Nächster Schritt: Ein konkreter Schritt, oder `keiner in diesem Paket`.

Status der Notion-Übernahme: Genau einer dieser Werte:

- `nicht vorgesehen`
- `ausstehend`
- `übernommen` — nur mit Seitenlink und Zeitpunkt der eigenen Lesekontrolle
- `fehlgeschlagen` — mit Fehlermeldung, ohne Umgehung
- `nicht geprüft`

Ein geschriebener Notion-Block ohne anschließende Lesekontrolle bleibt `ausstehend`.

## Mindestbeispiel

Die folgende Zeile ist kein Bericht. Sie zeigt nur die Form.

`2026-10-22_beispielpaket.md` · Projektkennung `IT-Ausbildung` · Paketkennung `beispielpaket` · Notion-Übernahme `nicht vorgesehen`
