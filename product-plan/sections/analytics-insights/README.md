# Analytics Insights

## Overview

Admin-Dashboard zur Analyse von Contest-Daten, Teilnehmerverhalten und Receipt-Informationen **für einen ausgewählten Contest**. Admins wählen zuerst einen Contest, dann können sie Statistiken einsehen, Kassenbons überprüfen und Gewinner auswählen.

## User Flows

### Flow 1: Select Contest
1. Admin öffnet Analytics-Seite
2. Contest-Selector zeigt alle verfügbaren Contests
3. Admin filtert nach Status (Aktiv, Beendet, Archiviert)
4. Admin wählt Contest aus Dropdown

### Flow 2: View Analytics Dashboard
1. Nach Contest-Auswahl sieht Admin Key Metrics:
   - Anzahl Teilnehmer
   - Anzahl eingereichte Receipts
   - Durchschnittlicher Einkaufswert
   - Trend-Charts und Top Stores
2. Admin kann Zeitraum-Filter anwenden
3. Charts visualisieren Daten des gewählten Contests

### Flow 3: Browse Receipts
1. Admin wechselt zu Receipt-Liste
2. Alle Receipts für den gewählten Contest werden angezeigt
3. Admin kann filtern (Status, Datum, Store) und suchen
4. Admin kann Receipt-Details ansehen (Bild, extrahierte Daten)

### Flow 4: Analyze Participants
1. Admin wechselt zu Teilnehmer-Ansicht
2. Liste zeigt alle Teilnehmer des gewählten Contests
3. Admin wählt Teilnehmer aus
4. Detailansicht zeigt alle eingereichten Receipts und Aktivitätshistorie für diesen Contest

### Flow 5: Select Winners
1. Admin klickt auf "Gewinner auswählen" (nur für active/ended Contests)
2. System generiert zufällige Gewinner-Vorschläge für den aktuellen Contest
3. Admin überprüft Vorschläge
4. Admin bestätigt Gewinner manuell
5. Gewinner werden gespeichert und Benachrichtigungen gesendet

### Flow 6: View Archived Contest Data
1. Admin wechselt Filter auf "Archiviert"
2. Admin wählt archivierten Contest
3. Info-Banner zeigt "Read-only" Status
4. Admin sieht historische Daten und finale Statistiken
5. Gewinner-Auswahl ist deaktiviert mit Info-Text

## Design Decisions

- **Contest-scoped analytics** — Alle Daten sind contest-spezifisch
- **Status-aware interface** — Archivierte Contests sind read-only
- **Visual data representation** — Charts für Trends und Top Stores
- **Winner selection workflow** — Auto-generate + manual review for fairness
- **Hirter design** — #253081 blue, #D5B376 gold, stone neutral

## Data Used

**Entities:**
- Contest
- Receipt
- Participant
- Winner

**From global model:**
- Contest with all participants and receipts
- Receipt with AI-extracted purchase data
- Participant with behavior tracking
- Winner for selected participants

## Visual Reference

Screenshots are not yet available for this section. The design follows the same Hirter brand guidelines as other sections.

## Components Provided

### ContestSelector
Dropdown for selecting contest with status filter.

**Props:**
- `contests` — Array of all contests
- `selectedContestId` — Currently selected contest ID
- `onSelectContest` — Callback with (contestId) when selection changes
- `statusFilter` — Current status filter (all, active, ended, archived)
- `onFilterChange` — Callback with (status) when filter changes

### AnalyticsDashboard
Key metrics and charts for selected contest.

**Props:**
- `contestId` — ID of selected contest
- `metrics` — Object with participant count, receipt count, avg purchase value
- `trendData` — Array of data points for trend chart
- `topStores` — Array of store names and counts
- `isArchived` — Boolean indicating if contest is archived

### ReceiptList
List of all receipts for selected contest.

**Props:**
- `contestId` — ID of selected contest
- `receipts` — Array of receipt objects
- `onViewDetails` — Callback with (receiptId) when user clicks on receipt
- `onFilter` — Callback with (filters) when filters change

### ParticipantDetails
Detail view for participant showing all receipts for selected contest.

**Props:**
- `participant` — Participant object
- `contestId` — ID of selected contest
- `receipts` — Array of receipts for this participant in this contest
- `onBack` — Callback to return to participant list

### WinnerSelection
Interface for generating and confirming winners.

**Props:**
- `contestId` — ID of selected contest
- `prizes` — Array of prize objects
- `onGenerateWinners` — Callback to generate random winner suggestions
- `suggestedWinners` — Array of suggested winner objects
- `onConfirmWinners` — Callback with (winners) when admin confirms selection
- `isArchived` — Boolean to disable for archived contests

### Supporting Components
- **MetricCard** / **StatCard** — Display key metrics
- **ReceiptStatusBadge** — Visual badge for receipt status
- **ReceiptRow** — Single receipt in list
- **ReceiptTrendChart** — Line chart for receipt trends
- **TopStoresChart** — Bar chart for top stores
- **WinnerCard** — Display winner information

## Callback Props

| Callback | Description |
|----------|-------------|
| `onSelectContest` | Called with (contestId) when user selects a contest |
| `onFilterChange` | Called with (status) when user changes status filter |
| `onViewDetails` | Called with (receiptId) when user clicks on receipt |
| `onFilter` | Called with (filters) when user applies receipt filters |
| `onGenerateWinners` | Called to generate random winner suggestions |
| `onConfirmWinners` | Called with (winners) when admin confirms winner selection |

## Implementation Notes

- All analytics are scoped to the selected contest
- Archived contests should be read-only (no winner selection)
- Winner selection should be random but verifiable
- Receipt validation ensures qualifying products
- Charts should update based on selected contest
- Status filter helps admins focus on relevant contests
- Consider implementing data export (CSV, PDF) for reporting
