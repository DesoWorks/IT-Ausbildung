# Sichtbare Prüfung Lernfeld 8 und 9

Stand: 17.10.2026. Keine Katalogfreigabe, kein Commit.

## Was geprüft wurde

Lokaler Abruf über `http://127.0.0.1:8773/`. Chromium headless hat vier Seiten als Bild festgehalten. Der Stations-Testbrowser war nicht benutzbar: `browser.test_navigate` lehnte den lokalen Server ab, Glados bekam `Cannot find module './browser-proxy.js'`. Deshalb ist das hier eine Bildprüfung, kein Klickdurchlauf.

Gelesen:

- `module/lf8-quellen.html`: Überschrift „Datenquellen und ihren Zweck unterscheiden“, vier Lernschritte, Fortschritt 0 von 5, kein Passwort im Klartext.
- `module/lf9-anforderung.html`: Überschrift „Anforderungen an das Netzwerk mit dem Kunden klären“, vier Lernschritte, Fortschritt 0 von 5, kein Passwort im Klartext.
- `module/lf8-kontrolle.html`: Kopf „LF8 Lernzielkontrolle“, Fragen mit untereinander stehenden Optionen, kein Passwortwert.
- `module/lf9-kontrolle.html`: Kopf „LF9 Lernzielkontrolle“, Fragen mit untereinander stehenden Optionen, kein Passwortwert.

## Klickdurchlauf 17.10.2026, später

Glados hat die Seiten nicht gesehen. Der Stations-Testbrowser fehlte (`browser-proxy.js`). Rick hat dieselben vier Seiten danach selbst über lokales Chromium mit Remote-Debugging auf `http://127.0.0.1:8774/` gelesen und angeklickt. Server und Browser sind danach beendet. Keine Projektdatei außer dieser Notiz geändert. Kein Commit.

Gesehen:

- LF8-Übung: leere Prüfung setzt nicht auf abgeschlossen. Text beginnt mit „Noch keine Antwort gewählt“, Fortschritt bleibt „0 von 5 Schritten · Abschluss noch nicht geöffnet“.
- Gesetzte Antwort „kasse“ bleibt nach Zurück und nach Neuladen gesetzt.
- LF9-Übung: leere Prüfung setzt nicht auf abgeschlossen. Gesetzte Antwort „trennung“ bleibt nach Zurück gespeichert. Zwölf Antwortfelder, die ersten vier stehen untereinander, je 626 Pixel breit.
- LF8- und LF9-Lernzielkontrolle: leere Abgabe nennt die offenen Fragen 1 bis 24 und schreibt keinen Abschluss. Titel und h1 stimmen. Kein Passwort im Klartext.

## Folge

Beide Felder bleiben im Katalog auf „In Kürze“. Commit und Push warten. Die Bildprüfung allein reicht nicht als Freigabe, der Klickdurchlauf oben ist der aktuelle Nachweis für diese vier Seiten. Die übrigen 14 Lektionen sind so nicht angeklickt.
