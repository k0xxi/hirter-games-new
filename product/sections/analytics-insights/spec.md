# Analytics Insights Specification

## Overview
Admin-Dashboard zur Analyse von Contest-Daten, Teilnehmerverhalten und Receipt-Informationen **für einen ausgewählten Contest**. Admins wählen zuerst einen Contest, dann können sie Statistiken einsehen, Kassenbons überprüfen und Gewinner automatisch auswählen lassen oder manuell bestätigen.

## User Flows
- **Contest wählen**: Admin öffnet Analytics-Seite und wählt einen Contest aus Dropdown/Liste (mit Filter für Aktiv/Beendet/Archiviert)
- **Dashboard ansehen**: Admin sieht Key Metrics des gewählten Contests (Teilnehmerzahl, Receipt-Anzahl, Trends) in Statistik-Karten und Charts
- **Archivierte Contests analysieren**: Admin wechselt Filter auf "Archiviert", wählt archivierten Contest und sieht historische Daten und finale Statistiken
- **Receipts durchsuchen**: Admin sieht Receipt-Liste für den gewählten Contest, filtert und sucht nach bestimmten Kassenbons, sieht Details zu jedem Receipt
- **Teilnehmer analysieren**: Admin wählt Teilnehmer aus Liste, sieht Einzelansicht mit allen Aktivitäten und eingereichten Receipts für diesen Contest
- **Gewinner auswählen**: Admin klickt auf Gewinner-Auswahl, System generiert zufällige Gewinner-Vorschläge für den aktuellen Contest, Admin überprüft und bestätigt Gewinner manuell (nur für active/ended Contests, nicht für archivierte)
- **Daten filtern**: Admin verwendet Filter- und Suchfunktionen um spezifische Daten innerhalb des gewählten Contests zu finden (nach Zeitraum, Status, etc.)

## UI Requirements
- **Design System**: Hirter Farben (Primary #253081, Secondary #D5B376, Neutral stone), Apercu Pro Typografie, keine abgerundeten Ecken
- **Light & Dark Mode**: Alle UI-Elemente mit dark: Varianten
- **Contest-Selector**: Prominent platziertes Dropdown zur Contest-Auswahl (oben auf der Seite), zeigt Name und Status des aktuell gewählten Contests
- **Status-Filter im Selector**: Filter-Tabs oder Toggle für "Aktiv", "Beendet", "Archiviert" direkt beim Contest-Selector (Standard: zeigt nur aktive Contests)
- **Archiv-Hinweis**: Visueller Hinweis wenn archivierter Contest ausgewählt ist (Banner oder Badge), erklärt dass nur Lesezugriff verfügbar ist
- **Dashboard/Übersicht**: Statistik-Karten mit Key Metrics für den gewählten Contest, Charts/Diagramme für Trends und Visualisierung
- **Receipt-Liste**: Tabellenansicht aller eingereichten Kassenbons für den gewählten Contest mit Filter- und Suchfunktionen, Details zu Store, Datum, Betrag, Status
- **Gewinner-Auswahl-View**: Interface zur automatischen Generierung von Gewinner-Vorschlägen mit manueller Bestätigung für den aktuell gewählten Contest (deaktiviert für archivierte Contests mit Info-Text)
- **Teilnehmer-Details**: Einzelansicht für Teilnehmer mit allen eingereichten Receipts und Aktivitätshistorie für den gewählten Contest
- **Filter & Suche**: Umfassende Filter- und Suchoptionen für alle Datenansichten (innerhalb des gewählten Contests)
- **Touch Targets**: Mindestens 44px für mobile Optimierung
- **Out of Scope**: Keine Contest-Verwaltung (gehört zu Contest Management), kein Receipt-Upload durch Kunden (gehört zu Contest Participation), keine Contest-übergreifende Gesamtstatistik

## Configuration
- shell: true
