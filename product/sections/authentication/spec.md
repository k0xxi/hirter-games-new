# Authentication Specification

## Overview
Authentifizierungssystem für Admin-Benutzer mit E-Mail/Passwort-Login und Passwort-Wiederherstellung per E-Mail. Alle Views sind standalone und werden vor der Anmeldung angezeigt.

## User Flows
- Admin gibt E-Mail und Passwort ein, um sich anzumelden
- Admin fordert Passwort-Reset per E-Mail an
- Admin erhält E-Mail mit Reset-Link
- Admin klickt auf Link und setzt neues Passwort

## UI Requirements
- Login-Seite: E-Mail/Passwort-Formular mit "Passwort vergessen"-Link (standalone, außerhalb der Admin-Shell)
- Passwort-Reset-Anforderung: E-Mail-Eingabe-Formular (standalone)
- Passwort-Reset-Bestätigung: Formular zum Setzen des neuen Passworts (standalone)

## Configuration
- shell: false
