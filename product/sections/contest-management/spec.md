# Contest Management Specification

## Overview
Admin-Dashboard zur Erstellung und Verwaltung mehrerer unabhängiger Contests. Admins können Contests über einen Multi-Step-Wizard erstellen, bearbeiten, löschen und aus Vorlagen duplizieren.

## User Flows
- **Contest erstellen**: Admin startet Multi-Step-Wizard (Basis → Zeitraum → Regeln/Preise → Teilnahmebedingungen → Review) und speichert neuen Contest
- **Contest bearbeiten**: Admin wählt Contest aus Liste, bearbeitet Details in Einzelansicht, speichert Änderungen (nur möglich für draft/active/ended Status, nicht für archivierte Contests)
- **Contest löschen**: Admin wählt Contest aus Liste und löscht ihn (mit Bestätigung, nur für draft Status)
- **Contest archivieren**: Admin wählt beendeten Contest und archiviert ihn zur dauerhaften Aufbewahrung (archivierte Contests sind schreibgeschützt)
- **Contests filtern**: Admin filtert Contest-Liste nach Status (Aktiv, Beendet, Archiviert, Alle) um relevante Contests schnell zu finden
- **Vorlage verwenden**: Admin wählt System-Vorlage oder eigene gespeicherte Vorlage, Wizard wird mit vorausgefüllten Daten gestartet
- **Contest als Vorlage speichern**: Admin speichert bestehenden Contest als wiederverwendbare Vorlage
- **Contest duplizieren**: Admin erstellt Kopie eines bestehenden Contests zur schnellen Erstellung ähnlicher Contests (auch aus Archiv möglich)
- **Teilnehmer-Übersicht anzeigen**: Admin klickt auf Contest und sieht Liste aller Teilnehmer mit Status und Consent-Informationen
- **Teilnehmer-Details anzeigen**: Admin klickt auf Teilnehmer und sieht vollständige Details inkl. Rechnung, Consent-Status, Zeitstempel

## UI Requirements
- **Design System**: Hirter Farben (Primary #253081, Secondary #D5B376, Neutral stone), Apercu Pro Typografie, keine abgerundeten Ecken
- **Light & Dark Mode**: Alle UI-Elemente mit dark: Varianten
- **Contest-Übersicht**: Tabellen-/Listenansicht aller Contests mit Status, Zeitraum, Teilnehmerzahl
- **Status-Filter**: Tabs oder Dropdown-Filter für "Aktiv", "Beendet", "Archiviert", "Alle" zur schnellen Filterung der Contest-Liste
- **Status-Badges**: Visuelle Kennzeichnung des Contest-Status (Draft, Aktiv, Beendet, Archiviert) mit farbigen Badges in Liste und Detailansicht
- **Contest-Details/Bearbeitungsseite**: Einzelansicht zum Anzeigen und Bearbeiten aller Contest-Eigenschaften (archivierte Contests nur lesbar mit Info-Banner)
- **Archivierungs-Aktion**: Button "Archivieren" für beendete Contests mit Bestätigungsdialog (erklärt, dass archivierte Contests schreibgeschützt sind)
- **Automatische Status-Aktualisierung**: System ändert Status automatisch von "Aktiv" zu "Beendet" wenn Enddatum erreicht (visueller Hinweis für Admin)
- **Multi-Step-Wizard**: 4-5 Schritte für Contest-Erstellung (Basis, Zeitraum, Regeln/Preise, Teilnahmebedingungen, Review) mit Fortschrittsanzeige
- **Vorlagen-System**: Zugriff auf System-Vorlagen und eigene gespeicherte Vorlagen
- **Contest-Datenfelder**: Titel, Zeitraum (Start/Ende), Status (draft/active/ended/archived), Regeln, Preise, Teilnahmebedingungen
- **Teilnehmer-Übersicht**: Tabellen-/Listenansicht aller Teilnehmer eines Contests mit Name, E-Mail, Teilnahmedatum, Consent-Status
- **Teilnehmer-Details**: Einzelansicht mit vollständigen Teilnehmerdaten (Kontaktdaten, hochgeladene Rechnung, Consent-Details, Zeitstempel)
- **Touch Targets**: Mindestens 44px für mobile Optimierung
- **Out of Scope**: Keine Analytics/Auswertungen (gehört zu Analytics Insights), keine Teilnahme-Funktionalität (gehört zu Contest Participation)

## Configuration
- shell: true
