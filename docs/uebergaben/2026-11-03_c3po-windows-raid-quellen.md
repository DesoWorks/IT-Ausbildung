# Quellen- und Fachprüfung: Windows-Werkzeuglabor und RAID-Modell

**Datum:** 03.11.2026  
**Projekt:** `/home/starnet/projects/IT-Ausbildung-werkzeugkiste`  
**Umfang:** gezielte Quellen-/Fachprüfung; keine Implementierung, UI, Git-Aktion, Providerwechsel oder Delegation. Quellen sind offizielle Microsoft-/OpenBSD-/Linux-Dokumentation und gelesene Projektdateien. Simulierte Beispiele sind keine Messwerte.

## Kurzfazit

Microsoft Learn bestätigt: `shutdown /t` mit positivem Wert impliziert `/f`; `/a` bricht einen laufenden Timeout nur innerhalb der Frist ab und ist ein separater Aufruf. OpenSSH trennt normale Anmeldung von `-L`-Portweiterleitung; `-p` wählt den Port, `-i` die Identitätsdatei. DiskPart-Befehle wirken auf den ausgewählten Fokus; `clean` entfernt Partitions-/Volumeformatierung dieses Datenträgers, `clean all` setzt alle Sektoren auf null.

Das RAID-Modell ist eine bewusst vereinfachte Lehrregel, keine allgemeine Controller-Spezifikation. Im RAID-Worktree wurde der Testlauf tatsächlich ausgeführt: 790 Assertions bestanden. Dies ist kein unabhängiger Fachreview oder UI-Test.

## Quellen- und Bestandsprüfung RAID

Vollständig gelesen: `docs/planung/2026-11-03_raid-labor-fortsetzung.md` sowie `/home/starnet/projects/IT-Ausbildung-raid/docs/planung/2026-11-03_raid-modell.md`. In der Bestandsuche des RAID-Worktrees fanden sich keine bestehenden RAID-Lektionen oder Menüinhalte. Windows-Storage-Lektionen erklären Inventar, weisen aber ausdrücklich darauf hin, dass ein Volume-/Datenträgerinventar keine RAID-Topologie belegt; diese Begriffe können verlinkt, aber nicht als RAID-Konzept wiederholt werden.

| Level | Lehrmodell: Mindestplatten und Gruppen | Kapazität bei globaler kleinster Mitgliedergröße | Ausfallregel innerhalb der expliziten Topologie |
|---|---|---|---|
| 0 | 2; ein Stripe | N × kleinste Größe | jeder Ausfall macht Array im Modell nicht rekonstruierbar |
| 1 | 2; ausdrücklich N-Wege-Vollspiegel | eine kleinste Plattengröße nutzbar | bis N−1 Ausfälle, solange vollständige Kopie verbleibt |
| 5 | 3; eine Parität je Stripe | (N−1) × kleinste Größe | höchstens 1 pro Verbund |
| 6 | 4; zwei Paritäten je Stripe | (N−2) × kleinste Größe | höchstens 2 pro Verbund |
| 10 | 4; mindestens zwei ausdrücklich zugeordnete Zweier-Spiegelgruppen, darüber Stripe | Gruppenanzahl × kleinste Größe | pro Paar höchstens ein Ausfall; zwei Ausfälle in verschiedenen Paaren können toleriert werden, beide im selben Paar nicht |
| 50 | 6; mindestens zwei gleich große Gruppen, je mindestens 3 RAID-5-Mitglieder, darüber Stripe | Gruppenanzahl × (Mitglieder je Gruppe−1) × kleinste Größe | pro Gruppe höchstens ein Ausfall; Überschreitung einer Gruppe lässt Gesamtarray im Modell nicht vollständig rekonstruieren |
| 60 | 8; mindestens zwei gleich große Gruppen, je mindestens 4 RAID-6-Mitglieder, darüber Stripe | Gruppenanzahl × (Mitglieder je Gruppe−2) × kleinste Größe | pro Gruppe höchstens zwei Ausfälle; gruppenweise zulässige Ausfälle können gleichzeitig auftreten |

Diese sind Regeln des vorliegenden Modells. RAID 1 N-Wege-Spiegel, RAID 10 Zweier-Paare und RAID 50/60 gleich große Gruppen mit globaler Mindestgröße sind ausdrücklich so festgelegt. Keine pauschale Aussage über alle Controller. Der Kern weist bei gemischten Größen den Anteil oberhalb der kleinsten Mitgliedergröße als ungenutzt aus; unterschiedliche Größen sind also nicht grundsätzlich unmöglich. Andere Implementierungen können pro Gruppe anders dimensionieren; konkrete Controllerregeln bleiben hersteller-/modellabhängig.

Nicht modelliert: Spares, Metadaten, Dateisystemkosten, Rebuild-Zeit/-Risiken, zusätzliche Lesefehler, Controller-/Clusterfehler und gemeinsame Ausfallursachen. „Nicht vollständig rekonstruierbar“ ist keine Aussage, dass garantiert jedes Byte verloren ist. RAID ersetzt kein Backup. RAID 01 bleibt optional und fehlt in diesem Modellstand.

Im separaten Worktree `/home/starnet/projects/IT-Ausbildung-raid`, Branch `feature/raid-lernlabor`, liegen Modellbrief, Kern und Tests neu/ungetrackt. `node tests/raid-kern.test.js` wurde ausgeführt und meldete: `raid-kern: 790 Assertions inkl. vollständiger Ausfallkombinationen an Mindesttopologien bestanden.` Das belegt nur diese Tests; keine UI, Barrierefreiheit, Controllerkompatibilität oder unabhängige Kernprüfung.

Linux-Quellen belegen nur Linux MD-Funktionalität, nicht alle Controller oder RAID-50/60-Varianten: [Linux mdadm(8)](https://man7.org/linux/man-pages/man8/mdadm.8.html) · [Linux-Kernel RAID arrays](https://docs.kernel.org/admin-guide/md.html). Die spezifischen RAID-50/60-Gruppen-Minima bleiben Modellfestlegung, nicht in dieser Recherche herstellerübergreifend verifiziert.

## Windows-Fachquellen

### `shutdown`
Microsoft definiert `/s` Herunterfahren, `/r` Neustart, `/t xxx` Timeout und `/a` Abbruch. Bei Timeout > 0 wird `/f` impliziert; `/f` schließt Anwendungen ohne Warnung, wodurch ungespeicherte Daten verloren gehen können. `/a` muss separat während der Timeoutfrist ausgeführt werden. Das erforderliche Recht ist „Shut down the system“.

Quelle: [Microsoft Learn – shutdown](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/shutdown)

### OpenSSH `ssh`
Microsoft beschreibt OpenSSH als verschlüsselte Remote-Anmeldung und weist auf die Windows-Feature-/Versionsvoraussetzungen hin. [OpenBSD ssh(1)](https://man.openbsd.org/ssh.1) belegt `ssh [user@]hostname`, `-p port`, `-i identity_file`, und `-L` als lokale TCP-Portweiterleitung durch den SSH-Kanal. `-L` ist also nicht bloß eine Anmeldung, sondern richtet einen lokalen Listener ein.

Host-Key/Fingerprint beim erstmaligen Kontakt unabhängig über einen vertrauenswürdigen Kanal mit Administrator oder gesicherter Inventarquelle vergleichen; eine bloße Dialogbestätigung verifiziert die Serveridentität nicht. Unerwartete Änderungen eines bekannten Host-Keys nicht blind akzeptieren. Dies ist die sicherheitsbezogene Schlussfolgerung für die Lehre, nicht eine Behauptung, der SSH-Dialog führe die unabhängige Prüfung automatisch aus.

Quelle für Windows: [Microsoft Learn – OpenSSH erster Einsatz](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse)

### DiskPart
DiskPart verlangt zuerst Auflisten und Selektieren; Befehle gelten für den fokussierten Datenträger/Volume/Partition-Kontext. `list disk` zeigt u.a. Größe/freien Platz und Partitionsstil; `list volume` listet Volumes; `detail disk` zeigt Eigenschaften des ausgewählten Datenträgers und seiner Volumes. Disknummern können neu zugeordnet werden; nicht blind `select disk 0` als Systemlaufwerk annehmen. `clean` entfernt Formatierung/Partitionsinformationen des fokussierten Datenträgers, `clean all` setzt alle Sektoren auf null. DiskPart braucht lokale Administratorrechte oder gleichwertig. Partitionierung, Formatierung, `clean` sind destruktiv: ausschließlich simulierte Ausgaben und Übungen.

Quellen: [diskpart](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/diskpart) · [list](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/list) · [select disk](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/select-disk) · [detail](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/detail) · [clean](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/clean)

## Grenzen und offene Punkte

- RAID-50/60-Minima und Gruppengleichheit gelten hier nur innerhalb des Lehrmodells; konkrete Hardwarecontrollergrenzen wurden nicht recherchiert.
- RAID 01 ist im Brief optional, aber im aktuellen Kern nicht enthalten; Entscheidung für später offen.
- Keine Windows-Befehle ausgeführt, keine Windows-Runtime, UI oder Regression getestet. Keine Quellenprüfung jeder möglichen Übungsausgabe.
- 790 Assertions sind ein belegter Lauf des vorhandenen Kern-Testskripts, keine unabhängige Abnahme.
