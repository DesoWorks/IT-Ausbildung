# Prüfung: Markdown-Zeilenumbrüche und Git-Whitespace

## Ergebnis und Zählkorrektur

Alle beanstandeten Zeilen sind absichtliche Markdown-Zeilenumbrüche: exakt zwei ASCII-Leerzeichen vor dem Zeilenende, unmittelbar gefolgt von einer weiteren nicht leeren Zeile desselben Absatzes. Die Leerzeichen bleiben unverändert. Dadurch bleibt die Hard-Break-Darstellung in üblichen CommonMark-/GitHub-Markdown-Renderern erhalten.

Die Übergabe nennt 18 Zeilen und fünf Dateien. Die tatsächlich aufgeführten Fundstellen und der erneut ausgeführte Befehl `git diff --check e3b9e02..dev` ergeben jedoch **20 Zeilen in sechs Dateien** (Exit 2). Alle 20 Fundstellen wurden im Kontext gelesen und ihre Endzeichen zusätzlich per Python geprüft:

| Datei unter `docs/uebergaben/` | Zeilen | Bedeutung |
|---|---|---|
| `2026-11-01_c3po-windows-ergaenzung.md` | 3 | Datum vor Zielgruppe |
| `2026-11-01_c3po-windows-werkzeugkiste.md` | 3 | Datum vor Zielgruppe |
| `2026-11-01_glados-windows-dev-qa.md` | 3, 4 | Datum und Prüfobjekt vor Branch/Stand |
| `2026-11-01_glados-windows-ergaenzung-qa.md` | 3, 4, 5 | Datum, Projekt/Branch und Ausgangs-HEAD vor Änderungsangabe |
| `2026-11-01_glados-windows-qa.md` | 3, 4, 5 | Datum, Prüfobjekt und Branch/HEAD vor Änderungsangabe |
| `2026-11-01_glados-windows-testplan.md` | 3, 4 | Stand und Prüfumfang vor Arbeitsstand |
| `2026-11-01_glados-windows-testplan.md` | 15, 22, 29, 36, 43, 50, 57, 64 | Bestanden-Kriterium vor Nicht-bestanden-Kriterium |

## Empfohlene Änderung durch den Git-Verantwortlichen

Eine neue `.gitattributes` im Projektwurzelverzeichnis mit folgendem Inhalt aufnehmen:

```gitattributes
# Markdown-Hard-Breaks in Uebergaben erhalten; sonstige Whitespace-Pruefungen bleiben aktiv.
docs/uebergaben/*.md whitespace=-blank-at-eol
```

Die Regel ist auf Markdown-Dateien unmittelbar in `docs/uebergaben/` begrenzt. Sie schaltet ausschließlich `blank-at-eol` für diese Dateien ab, nicht alle Whitespace-Prüfungen und nicht die Prüfung des übrigen Projekts. Sie verändert weder Dateiinhalte noch Markdown-Darstellung und greift auch beim Vergleich des bestehenden Commit-Bereichs im Worktree.

Die Regel ist hier **nur empfohlen**, noch nicht als `.gitattributes` angelegt, nicht gestagt und nicht committed. Das entspricht dem dokumentierenden Teilauftrag ohne Git-Schreiboperationen. Diese Berichtsdatei ist die einzige von Terminus angelegte Datei.

## Tatsächlich durchgeführte Verifikation

- `git diff --check e3b9e02..dev`: Exit 2, genau 20 `trailing whitespace`-Meldungen an den oben genannten Stellen.
- Python-Prüfung jeder gemeldeten Zeile: exakt `'  '` als abschließende Zeichen; jeweils nicht leere Folgezeile; 20 geprüfte Fundstellen.
- Die vorgeschlagene Regel wurde ohne Datei- oder Git-Konfigurationsänderung über einen temporären Eingabedateideskriptor getestet:

```sh
git -c core.attributesFile=/dev/fd/3 diff --check e3b9e02..dev 3<<'EOF'
docs/uebergaben/*.md whitespace=-blank-at-eol
EOF
```

Ergebnis: **Exit 0**, keine Meldungen.

- Mit derselben temporären Regel meldet `git check-attr whitespace` für `docs/uebergaben/2026-11-01_glados-windows-testplan.md` den Wert `-blank-at-eol`. Für `README.md`, `js/module-daten.js` und den reinen Prüfpfad `docs/inhalte/test.md` lautet der Wert `unspecified`. Es wurde keine Datei am Prüfpfad erstellt.
- Kein Browser-Rendering ausgeführt. Die Darstellung bleibt durch unveränderte Quelldateien erhalten; die Bedeutung der zwei Leerzeichen wurde anhand von Syntax und Absatzkontext bewertet.
- Anwendungstests sind für diesen dokumentierenden Teilauftrag nicht ausgeführt; Favicon, vollständige Suite und unabhängige Browser-QA liegen bei Rick beziehungsweise GLaDOS.

## Verworfene Alternativen und Restrisiko

Blindes Entfernen der Leerzeichen würde die expliziten Umbrüche zu weichen Umbrüchen machen und kann Metadaten beziehungsweise Prüfkriterien in einer Zeile zusammenziehen. Deshalb verworfen. Explizite Backslash-Umbrüche wären für CommonMark möglich, verändern aber alle betroffenen historischen Texte und sind über Markdown-Dialekte weniger universell als die bestehende Zwei-Leerzeichen-Schreibweise. Globales Abschalten von Whitespace-Prüfungen oder eine lokale dauerhafte `core.whitespace`-Änderung wäre zu breit und nicht als Projektregel reproduzierbar.

Restrisiko: Git kann mit `blank-at-eol` innerhalb dieser eng begrenzten Dokumentationsgruppe nicht zwischen absichtlichen Zwei-Leerzeichen-Umbrüchen und versehentlichen abschließenden Leerzeichen unterscheiden. Diese Stellen benötigen dort weiterhin inhaltliche Diff-Prüfung. Andere aktivierte Whitespace-Prüfungen und andere Projektpfade bleiben unberührt.

Nach Übernahme der `.gitattributes` durch Rick den normalen Befehl `git diff --check e3b9e02..dev` sowie den Arbeitsbaum-/Index-Diff erneut ohne temporäre Konfigurationsoption prüfen. Bis zur Übernahme ist die dauerhafte Korrektur offen. Keine Änderungen an Feature-Linie, anderem Checkout, Favicon oder `vorschau/`; kein Commit, Push, Merge oder Deployment durch Terminus.
