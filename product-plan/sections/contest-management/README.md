# Contest Management

## Overview

Admin-Dashboard zur Erstellung und Verwaltung mehrerer unabhängiger Contests. Admins können Contests über einen Multi-Step-Wizard erstellen, bearbeiten, löschen, archivieren und aus Vorlagen duplizieren.

## User Flows

### Flow 1: View Contest List
1. Admin sieht Liste aller Contests
2. Contests zeigen Status (Draft, Aktiv, Beendet, Archiviert), Zeitraum, Teilnehmerzahl
3. Admin kann nach Status filtern (Alle, Aktiv, Beendet, Archiviert)
4. Admin kann Contests durchsuchen

### Flow 2: Create New Contest
1. Admin klickt "Neuer Contest"
2. Multi-Step-Wizard startet:
   - **Schritt 1: Basis** — Titel, Beschreibung
   - **Schritt 2: Zeitraum** — Start-/Enddatum
   - **Schritt 3: Preise** — Preise mit Beschreibung und Anzahl
   - **Schritt 4: Regeln** — Teilnahmebedingungen und Regeln
   - **Schritt 5: Review** — Zusammenfassung aller Details
3. Admin speichert Contest (Status: Draft)
4. Bestätigungsnachricht wird angezeigt

### Flow 3: Edit Contest
1. Admin wählt Contest aus Liste
2. Detailansicht mit allen Contest-Daten öffnet sich
3. Admin kann Details bearbeiten (nur für Draft/Active/Ended, nicht Archived)
4. Admin speichert Änderungen
5. Bei archivierten Contests: Read-only Ansicht mit Info-Banner

### Flow 4: Archive Contest
1. Admin wählt beendeten Contest
2. Admin klickt "Archivieren"
3. Bestätigungsdialog erklärt, dass archivierte Contests schreibgeschützt sind
4. Admin bestätigt
5. Contest wird archiviert (permanente Aufbewahrung, read-only)

### Flow 5: View Participants
1. Admin öffnet Contest-Details
2. Admin sieht Tab "Teilnehmer"
3. Liste zeigt alle Teilnehmer mit Name, E-Mail, Teilnahmedatum, Consent-Status
4. Admin kann Teilnehmer-Details ansehen

### Flow 6: Delete/Duplicate Contest
- **Delete**: Nur Draft-Contests können gelöscht werden (mit Bestätigung)
- **Duplicate**: Erstellt Kopie eines Contests (auch aus Archiv möglich)

## Design Decisions

- **Status lifecycle** — Draft → Active → Ended → Archived
- **Automatic status updates** — System ändert "Active" zu "Ended" when Enddatum erreicht
- **Multi-step wizard** — Klare Struktur für Contest-Erstellung
- **Archive for compliance** — Archivierte Contests für gesetzliche Aufbewahrungspflicht
- **Participant view** — Integrierte Teilnehmerliste für jeden Contest
- **Hirter design** — #253081 blue, #D5B376 gold, stone neutral, Apercu Pro fonts

## Data Used

**Entities:**
- Contest
- Prize
- Participant
- Receipt

**From global model:**
- Contest with status, rules, prizes
- Participant with consent tracking
- Receipt for entry verification

## Visual Reference

See screenshots:
- `ContestListView.png` — Contest list with status filters
- `ContestWizardView.png` — Multi-step contest creation wizard
- `ContestDetailsView.png` — Contest detail/edit view

## Components Provided

### ContestList
Table/cards view of all contests with filtering and actions.

**Props:**
- `contests` — Array of contest objects
- `onViewDetails` — Callback with (contestId) when user clicks on contest
- `onCreate` — Callback when user clicks "Neuer Contest"
- `onDelete` — Callback with (contestId) to delete draft contest
- `onArchive` — Callback with (contestId) to archive ended contest
- `onDuplicate` — Callback with (contestId) to duplicate contest

### ContestWizard
Multi-step wizard for creating new contests.

**Props:**
- `onSave` — Callback with (contestData) when user completes wizard
- `onCancel` — Callback when user cancels wizard
- `initialData` — Optional initial data (for duplicating/templates)

### ContestDetails
Detail view with editable fields for contest (read-only for archived).

**Props:**
- `contest` — Contest object with all details
- `onSave` — Callback with (contestId, updates) when user saves changes
- `onArchive` — Callback with (contestId) to archive contest
- `onDelete` — Callback with (contestId) to delete contest (draft only)
- `onViewParticipants` — Callback with (contestId) to view participant list
- `onBack` — Callback to return to list

### ParticipantList
List of participants for a specific contest.

**Props:**
- `contestId` — ID of the contest
- `participants` — Array of participant objects
- `onViewDetails` — Callback with (participantId) when user clicks on participant

### ParticipantDetails
Detail view for a specific participant within a contest.

**Props:**
- `participant` — Participant object
- `receipts` — Array of receipts submitted by this participant for this contest
- `consent` — Consent status and timestamp
- `onBack` — Callback to return to participant list

### Supporting Components
- **StatusBadge** — Visual badge for contest status
- **ContestRow** — Single contest row/card in list
- **PrizeCard** — Prize display card

## Callback Props

| Callback | Description |
|----------|-------------|
| `onCreate` | Called when user clicks "Neuer Contest" |
| `onViewDetails` | Called with (contestId) when user clicks on contest |
| `onSave` | Called with (contestId, updates) to save contest changes |
| `onDelete` | Called with (contestId) to delete draft contest (with confirmation) |
| `onArchive` | Called with (contestId) to archive ended contest (with confirmation) |
| `onDuplicate` | Called with (contestId) to create copy of contest |
| `onViewParticipants` | Called with (contestId) to view participant list |

## Implementation Notes

- Status transitions are controlled: Draft → Active → Ended → Archived
- System should auto-update status from Active to Ended when endDate is reached
- Archived contests are permanently read-only (for compliance/audit)
- Only draft contests can be deleted
- Participant consent tracking is crucial for GDPR compliance
- Duplicate feature useful for creating similar contests quickly
