# User Management Specification

## Overview
Rollenbasiertes Admin-Benutzerverwaltungssystem mit zwei Rollen (Super-Admin und Contest-Manager). Umfasst Benutzerverwaltung, Einladungssystem per E-Mail und Passwort-Änderung. Alle Views werden innerhalb der Admin-Shell angezeigt.

## User Flows
- Super-Admin sieht Liste aller Admins mit Rolle, Status und Aktionen
- Super-Admin lädt neuen Admin ein: Formular ausfüllen, Rolle wählen, E-Mail-Einladung wird versendet
- Super-Admin kann Admin-Details ansehen und Rolle bearbeiten
- Super-Admin kann Admins deaktivieren oder löschen
- Eingeloggter Admin kann sein eigenes Passwort ändern

## UI Requirements
- Admin-Übersicht: Tabelle oder Cards mit allen Admin-Benutzern, zeigt Name, E-Mail, Rolle, Status und Aktionen
- Admin einladen: Formular mit Feldern für E-Mail, Name und Rollenauswahl (Super-Admin/Contest-Manager)
- Admin-Detail: Detailansicht eines Admin-Benutzers mit bearbeitbaren Feldern (Name, E-Mail, Rolle) und Session-Management
- Passwort ändern: Formular mit Feldern für aktuelles Passwort, neues Passwort und Bestätigung

## Configuration
- shell: true
