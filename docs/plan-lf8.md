# Lernfeld 8 – Daten systemübergreifend bereitstellen

Stand: 17.10.2026. Einstiegslernfeld, noch nicht im Katalog freigeschaltet.

## Grundlage

Direkt mit dem KMK-Rahmenlehrplan vom 13.12.2019, Seite 19, abgeglichen: „Daten systemübergreifend bereitstellen“, 2. Ausbildungsjahr, Zeitrichtwert 80 Stunden. Quelle und Originalauszug: [kmk-lf8-lf9-auszug-2026-10-17.md](kmk-lf8-lf9-auszug-2026-10-17.md). Die ursprüngliche Planung verwendete nur eine sekundäre Lernfeldübersicht. Diese Einstiegsseiten sind kein 80-Stunden-Unterricht und keine vollständige Umsetzung des Lernfelds.

## Beispiel

Samira bei Nordlicht IT-Service. Fiktives Hafenblick Café. Tagesumsätze aus einer erfundenen Kasse und Schichten aus einer erfundenen Tabelle. Keine echten Personen, keine Zugangsdaten, kein Produktivnetz.

## Stand der Dateien

Acht Lektionen und LF8 Lernzielkontrolle liegen unter module/ und js/. Die technische Browserprüfung aller neun Seiten ist in [uebernahme-terminus-2026-10-17.md](uebernahme-terminus-2026-10-17.md) dokumentiert; sie wurde beim fachlichen Abgleich nicht wiederholt. Zurücksetzen der Lernzielkontrolle nur mit dem Passwort-Hash, kein Klartext.

## Offene Arbeit und Freigabe

Dennis hat entschieden: gesperrt lassen; zuerst KMK-Abgleich und fachliche Prüfung. Deren Ergebnis steht in [pruefung-lf8-lf9-fachlich-2026-10-17.md](pruefung-lf8-lf9-fachlich-2026-10-17.md). F1 und die konkreten Daten-/Formatierungsfehler F6 sind korrigiert. Die Datenwerkstatt in `lf8-aufbereiten.html` ergänzt eine tatsächliche, begrenzte Browserimplementierung: CSV und JSON lesen, Datumsfelder zuordnen, mehrere Schichten verlustfrei je Tag verbinden, Null/fehlend und Einheiten prüfen, CSV bereitstellen. DE/EN-Handhabung, arbeitsteilige Rollen, Prüftage und eine gespeicherte Reflexions-/Übergabenotiz sind eingebaut. Keine echten Datenquellen oder allgemeinen CSV-Importe; Rollenarbeit und Dokumentationsqualität benötigen menschliche Beurteilung. F5 (Antwortqualität und sichtbare Reihenfolge) ist in Paket 3 umgesetzt; die Speicherwerte bleiben unverändert. Nachweise und Grenzen: [korrektur-lf8-lf9-2026-10-17.md](korrektur-lf8-lf9-2026-10-17.md). Die technische Prüfung ist keine fachliche Abnahme. Feldstatus bleibt `kommt-bald`; keine automatische Freigabe nach Abschluss eines Tests.

## Paket 3 (2026-10-17): Antwortreihenfolge
Die sichtbare Antwortreihenfolge wird je Seitenbesuch gemischt. Speicher (Options-ID bzw. a/b/c), Array-Reihenfolge und Fortschrittslogik bleiben unverändert. Nachweis: `tests/lf8-lf9-reihenfolge.test.js`, `tests/lf8-lf9-reihenfolge-browser.test.js`. Details in `docs/korrektur-lf8-lf9-2026-10-17.md`.
