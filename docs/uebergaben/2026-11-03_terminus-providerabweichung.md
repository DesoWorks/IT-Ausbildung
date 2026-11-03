# Providerabweichung und gesicherte Fortsetzung

03.11.2026, Phase2. Jarvis' Backgroundlauf `e3d58e1b-a098-4e8e-bb5e-5b984ff01483`, runId `f931ff68-eb58-4528-9e14-501bc1f1e556`, war mit ausdrücklichem Verbot kostenpflichtiger Providerfallbacks beauftragt. Startmodell laut Runprotokoll claude-sonnet-5-5; station_settings bestätigt weiterhin Provider claude-cli. Spätere tatsächliche agent.cost-Ereignisse zeigen `~anthropic/claude-sonnet-latest` mit nichtnull USD-Buchungen. Ein exakter Konto-/Rechnungsbetrag oder Ursache dieses Wechsels ist damit nicht belegt; Terminus hat keinen Provider-/Stationseinstellungswechsel veranlasst.

Nach Entdeckung Lauf unmittelbar mit team_interrupt gestoppt und Commander informiert. Kein erneuter Jarvis-Aufruf und kein Versuch, diesen Weg zu entsperren. Die Konfiguration bleibt unangetastet, Untersuchung des Harness-/Providerwechsels ist nicht Teil des Projektauftrags.

Gesicherter Zwischenstand: `js/windows-labor-daten.js`, 29Profile15CMD14PS, node--check Exit0, SHA256 ebe40e8f05c611990879a1729a474b82f56e9ea2ed003c4efdf264a96d5497f8. Kopie im Terminus-Workspace `pruefung/windows-labor-daten-jarvis-sicherung.js`, Prüfsumme identisch. Zu diesem Zeitpunkt keine versionierten Codeänderungen, keine UI-Anbindung/Tests des neuen Labors. Datei daher noch nicht als geprüfte Phase2 committet oder gepusht.

Ersatz gemäß Commander-Erlaubnis organisiert: temporärer Implementierungsarbeiter auf Terminus' bestehendem Codex-Zugang, Background-ID b1346feb-18da-4cdb-ac73-141eef6e8edc. Ausdrückliches Verbot Providerwechsel/Delegation/Installationen/Git; enger Auftrag vorhandene Daten fachlich korrigieren und UI/Tests vervollständigen. Terminus bleibt Koordination/Review/Git, GLaDOS unabhängige QA, C3PO Quellen. Kein zusätzlicher benannter Agent erstellt.

## Tatsächliche Ersatzumsetzung

Der Ersatzlauf wurde ohne Änderungen beendet: „path is outside the agent workspace and no project root grant covers it … an autonomous run cannot bless a new folder“. Keine erneuten gleichartigen Delegationen. Terminus hat nach dieser belegten Zugriffssperre die verbleibende UI-/Testimplementierung selbst übernommen (vom Commander nur bei begründetem Bedarf erlaubt). C3PO blieb unabhängiger Fachreview/Quellenarbeiter, GLaDOS unabhängige QA. Kein Wiederanlauf des bezahlten Wegs und keine Stationseinstellung geändert.
