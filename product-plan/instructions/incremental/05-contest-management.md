# Milestone 5: Contest Management

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Contest Management feature — admin dashboard for creating and managing multiple independent contests with a multi-step wizard, status lifecycle, and participant tracking.

## Overview

This section enables admins to create, edit, and manage sweepstakes contests. Includes a multi-step wizard for contest creation, status lifecycle management (Draft → Active → Ended → Archived), participant viewing, and contest templates/duplication.

**Key Functionality:**
- View list of all contests with status, dates, and participant counts
- Filter contests by status (All, Active, Ended, Archived)
- Create new contests via multi-step wizard
- Edit contest details (with restrictions based on status)
- Archive ended contests for compliance
- Delete draft contests
- Duplicate contests for quick setup
- View participants and their details for each contest

## Recommended Approach: Test-Driven Development

See `product-plan/sections/contest-management/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/contest-management/components/`:

- `ContestList.tsx` — List of all contests with filtering
- `ContestWizard.tsx` — Multi-step contest creation wizard
- `ContestDetails.tsx` — Contest detail/edit view
- `ParticipantList.tsx` — List of participants for a contest
- `ParticipantDetails.tsx` — Participant detail view
- `StatusBadge.tsx`, `ContestRow.tsx`, `PrizeCard.tsx` — Supporting components

### Data Layer

**Contest:**
```typescript
interface Contest {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  status: 'draft' | 'active' | 'ended' | 'archived'
  rules: string
  prizes: Prize[]
  termsAndConditions: string
}
```

You'll need to:
- Create API endpoint for contest list (GET `/api/admin/contests`)
- Create API endpoint for contest details (GET `/api/admin/contests/:id`)
- Create API endpoint for creating contest (POST `/api/admin/contests`)
- Create API endpoint for updating contest (PATCH `/api/admin/contests/:id`)
- Create API endpoint for deleting contest (DELETE `/api/admin/contests/:id`)
- Create API endpoint for archiving contest (POST `/api/admin/contests/:id/archive`)
- Create API endpoint for participant list (GET `/api/admin/contests/:id/participants`)
- Implement status lifecycle logic

### Callbacks

- `onCreate()` — Open contest creation wizard
- `onViewDetails(contestId)` — Navigate to contest details
- `onSave(contestId, updates)` — Save contest changes
- `onDelete(contestId)` — Delete draft contest
- `onArchive(contestId)` — Archive ended contest
- `onDuplicate(contestId)` — Create copy of contest
- `onViewParticipants(contestId)` — View participant list

### Empty States

**No Contests Yet:**
- Show "Noch keine Contests" with "Neuer Contest" button

**No Participants:**
- In participant list, show "Noch keine Teilnehmer" when contest has no entries

## Files to Reference

- `product-plan/sections/contest-management/README.md` — Feature overview
- `product-plan/sections/contest-management/tests.md` — Test-writing instructions
- `product-plan/sections/contest-management/components/` — React components
- `product-plan/sections/contest-management/types.ts` — TypeScript interfaces
- `product-plan/sections/contest-management/sample-data.json` — Test data
- Screenshots: `ContestListView.png`, `ContestWizardView.png`, `ContestDetailsView.png`

## Expected User Flows

### Flow 1: View Contest List

1. Admin navigates to `/admin/contests`
2. Admin sees list of all contests with status badges
3. Admin can filter by status (All, Active, Ended, Archived)
4. **Outcome:** Contests displayed with current information

### Flow 2: Create New Contest

1. Admin clicks "Neuer Contest" button
2. Multi-step wizard opens:
   - **Step 1: Basis** — Title, description
   - **Step 2: Zeitraum** — Start/end dates
   - **Step 3: Preise** — Add prizes with descriptions
   - **Step 4: Regeln** — Terms and rules
   - **Step 5: Review** — Summary of all details
3. Admin completes all steps
4. Admin clicks "Contest erstellen"
5. **Outcome:** Contest created with status "draft", appears in list

### Flow 3: Edit Contest Details

1. Admin clicks on contest in list
2. Detail view opens with all contest information
3. Admin edits title or prizes
4. Admin clicks "Speichern"
5. **Outcome:** Contest updated in database

### Flow 4: Archive Ended Contest

1. Admin views ended contest
2. Admin clicks "Archivieren" button
3. Confirmation dialog warns that archived contests are read-only
4. Admin confirms
5. **Outcome:** Contest status changed to "archived", now read-only

### Flow 5: View Participants

1. Admin opens contest details
2. Admin clicks "Teilnehmer" tab
3. List shows all participants with entry dates
4. Admin clicks on participant
5. **Outcome:** Participant details shown with receipts and consent status

### Flow 6: Duplicate Contest

1. Admin selects contest (can be archived)
2. Admin clicks "Duplizieren"
3. **Outcome:** New draft contest created with copied data, new dates set to future

## Done When

- [ ] Tests written for all contest management flows
- [ ] All tests pass
- [ ] Contest list displays correctly with status filters
- [ ] Empty state shows when no contests exist
- [ ] Multi-step wizard creates contests successfully
- [ ] Contest details editable (with status restrictions)
- [ ] Draft contests can be deleted
- [ ] Ended contests can be archived
- [ ] Archived contests are read-only with visual indicator
- [ ] Status transitions work correctly (Draft → Active → Ended → Archived)
- [ ] System auto-updates status from Active to Ended when endDate reached
- [ ] Participant list shows all entries for contest
- [ ] Participant details show receipts and consent
- [ ] Duplicate creates new contest with copied data
- [ ] All forms validate input properly
- [ ] Responsive on mobile and desktop

## Technical Notes

**Status Lifecycle:**
- **Draft:** Being created, not visible to public
- **Active:** Currently running, accepting entries
- **Ended:** End date reached, no new entries
- **Archived:** Permanently read-only for compliance

**Auto Status Update:**
- Implement cron job or scheduled task to check endDate
- Update contests from "active" to "ended" when endDate passes
- Consider grace period for final review before archiving

**Archiving:**
- Archived contests cannot be edited or deleted
- Useful for legal/compliance requirements
- Show clear read-only indicator in UI

**Participant Consent:**
- Track consent checkbox and timestamp
- Store consent details for GDPR compliance
- Show consent status in participant details

**Deletion:**
- Only draft contests can be deleted
- Confirmation dialog required
- Consider soft delete for audit trail
