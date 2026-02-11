# Milestone 6: Analytics Insights

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) and Milestone 5 (Contest Management) complete

## Goal

Implement the Analytics Insights feature — admin dashboard for analyzing contest data, receipt information, and participant behavior with winner selection capabilities.

## Overview

This section enables admins to analyze contest performance, view receipt data, and select winners. All analytics are scoped to a selected contest. Includes key metrics, trend charts, receipt browsing, and automated winner selection with manual review.

**Key Functionality:**
- Select contest to analyze with status filter
- View key metrics (participants, receipts, average purchase value)
- Analyze trends with charts (receipt submissions over time, top stores)
- Browse and search receipts with filters
- View participant details and their activity
- Generate winner suggestions and confirm selection
- Read-only mode for archived contests

## Recommended Approach: Test-Driven Development

See `product-plan/sections/analytics-insights/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/analytics-insights/components/`:

- `ContestSelector.tsx` — Contest selection dropdown with status filter
- `AnalyticsDashboard.tsx` — Key metrics and charts
- `ReceiptList.tsx` — List of receipts with filtering
- `ParticipantDetails.tsx` — Participant detail view
- `WinnerSelection.tsx` — Winner generation and confirmation
- Supporting components: `MetricCard.tsx`, `StatCard.tsx`, `ReceiptStatusBadge.tsx`, `ReceiptRow.tsx`, `ReceiptTrendChart.tsx`, `TopStoresChart.tsx`, `WinnerCard.tsx`

### Data Layer

**Analytics Metrics:**
```typescript
interface ContestMetrics {
  contestId: string
  participantCount: number
  receiptCount: number
  avgPurchaseValue: number
  trendData: { date: string; count: number }[]
  topStores: { storeName: string; count: number }[]
}
```

You'll need to:
- Create API endpoint for contest metrics (GET `/api/admin/analytics/contests/:id/metrics`)
- Create API endpoint for receipt list (GET `/api/admin/analytics/contests/:id/receipts`)
- Create API endpoint for participant details (GET `/api/admin/analytics/participants/:id`)
- Create API endpoint for winner generation (POST `/api/admin/analytics/contests/:id/winners/generate`)
- Create API endpoint for winner confirmation (POST `/api/admin/analytics/contests/:id/winners/confirm`)
- Implement data aggregation and calculations

### Callbacks

- `onSelectContest(contestId)` — Load analytics for selected contest
- `onFilterChange(status)` — Filter contest list by status
- `onViewDetails(receiptId)` — View receipt details
- `onFilter(filters)` — Apply receipt filters
- `onGenerateWinners()` — Generate random winner suggestions
- `onConfirmWinners(winners)` — Confirm and save winners

### Empty States

**No Contest Selected:**
- Show "Bitte wählen Sie einen Contest aus" before selection

**No Receipts:**
- Show "Noch keine Receipts" when contest has no entries

**No Winners Selected:**
- Show "Noch keine Gewinner ausgewählt" in winner section

## Files to Reference

- `product-plan/sections/analytics-insights/README.md` — Feature overview
- `product-plan/sections/analytics-insights/tests.md` — Test-writing instructions
- `product-plan/sections/analytics-insights/components/` — React components
- `product-plan/sections/analytics-insights/types.ts` — TypeScript interfaces
- `product-plan/sections/analytics-insights/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Select Contest and View Dashboard

1. Admin navigates to `/admin/analytics`
2. Admin sees contest selector at top
3. Admin filters by status (e.g., "Active")
4. Admin selects contest from dropdown
5. Dashboard loads with key metrics and charts
6. **Outcome:** Analytics displayed for selected contest

### Flow 2: Browse Receipts

1. After selecting contest, admin clicks "Receipts" tab
2. List shows all receipts for selected contest
3. Admin applies filters (date range, status, store)
4. Admin clicks on receipt to view details
5. **Outcome:** Receipt details shown with image and extracted data

### Flow 3: Analyze Participant

1. Admin clicks on participant in list
2. Participant details view opens
3. Shows all receipts submitted by this participant for selected contest
4. **Outcome:** Full participant activity visible

### Flow 4: Select Winners

1. Admin selects active or ended contest
2. Admin clicks "Gewinner auswählen" button
3. System generates random winner suggestions based on prizes
4. Admin reviews suggested winners
5. Admin clicks "Gewinner bestätigen"
6. **Outcome:** Winners saved, notification emails sent

### Flow 5: View Archived Contest Analytics

1. Admin changes filter to "Archiviert"
2. Admin selects archived contest
3. Info banner shows "Dieser Contest ist archiviert (nur Lesezugriff)"
4. Admin sees all metrics and historical data
5. Winner selection button is disabled with explanation
6. **Outcome:** Read-only analytics for archived contest

## Done When

- [ ] Tests written for all analytics flows
- [ ] All tests pass
- [ ] Contest selector works with status filtering
- [ ] Dashboard displays accurate metrics for selected contest
- [ ] Charts visualize trends and top stores correctly
- [ ] Receipt list shows all receipts with filtering
- [ ] Empty states display when no contest selected or no data
- [ ] Participant details show full activity for selected contest
- [ ] Winner generation creates random, fair suggestions
- [ ] Winner confirmation saves and sends notifications
- [ ] Archived contests show read-only indicator
- [ ] Winner selection disabled for archived contests
- [ ] All data is contest-scoped (no cross-contest leakage)
- [ ] Responsive on mobile and desktop

## Technical Notes

**Winner Selection Algorithm:**
- Random selection from eligible participants
- Ensure each winner gets only one prize
- Exclude participants who already won
- Consider receipt validity (verified status)
- Provide audit trail for fairness

**Data Aggregation:**
- Calculate metrics efficiently (consider caching)
- Aggregate trend data by day/week
- Count receipts per store for top stores chart
- Calculate average purchase value across all receipts

**Archived Contest Handling:**
- Show clear visual indicator (banner, badge)
- Disable winner selection UI
- Maintain full read access to data
- Consider separate archival storage for old data

**Receipt Validation:**
- Only verified receipts should count in metrics
- Rejected receipts should be visible but marked
- Pending receipts should show processing status

**Performance:**
- Consider pagination for large receipt lists
- Cache metrics calculations
- Lazy load charts when tab is selected
- Optimize database queries for aggregations
