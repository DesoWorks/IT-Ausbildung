# Lernzielkontrolle zurücksetzen · 16.10.2026

- Stand am Abend des 16.10.2026: Die fünf Abschlussseiten `module/lf1-abschluss.html` bis `module/lf5-abschluss.html` und ihre Skripte sind gelöscht. Sie stehen nicht mehr im Katalog. Diese Notiz beschreibt den früheren Reset dieser Seiten und ist keine aktuelle Bedienungsanleitung.
- Der Knopf „Fortschritt zurücksetzen“ (`reset-all`) fragt das Projektpasswort ab. Der Wortlaut liegt beim Commander und steht hier nicht.
- Der SHA-256-Hash steht in `js/lernziel-reset.js`. Der Browser vergleicht die Eingabe über `crypto.subtle`. Groß- und Kleinschreibung zählt. Leer, falsch, Abbrechen oder fehlende Kryptografie lässt den Stand stehen.
- Ein richtiges Passwort lässt nur den bestehenden Reset dieser einen Abschlussseite laufen. Andere Lektionen werden nicht geleert.
- Der Knopf „Auswahl zurücksetzen“ und alle Einzeltests bleiben ohne Passwort.
- Grenze: Das ist ein lokaler Bedienungsschutz. Wer den Browserspeicher von Hand löscht, umgeht ihn. `crypto.subtle` braucht einen sicheren Kontext, zum Beispiel localhost.
- Kein Commit, kein Push. Version unverändert bei `0.16.2-alpha.1`, weil der IT-Ausbau pausiert ist und diese eine freigegebene Änderung keine neue Lehrversion braucht.
