# Test Instructions: Contest Management

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, etc.).

## Overview

Contest Management is an admin dashboard for creating, editing, managing, and archiving contests. Admins use a multi-step wizard to define contests with rules, prizes, and entry requirements, then manage the contest lifecycle (draft → active → ended → archived). The system supports templates, duplication, and filtering by status.

**Key Flows:**
1. View contests with status filtering
2. Create new contest via multi-step wizard
3. Edit existing contest
4. Archive ended contests
5. Delete draft contests
6. Duplicate existing contests
7. View contest participants and details

## User Flow Tests

### Flow 1: View Contest List (Happy Path)

**Prerequisites:**
- Admin is logged in
- Multiple contests exist with various statuses (draft, active, ended, archived)
- User is on Contest Management section

**Steps and Expected Results:**

1. **Contest List Page Loads**
   - Page title: "Contests"
   - Subtext: "Create and manage all contests"
   - Design uses Hirter colors (primary #253081, secondary #D5B376)
   - Dark mode: all text readable

2. **Status Filter Tabs Visible**
   - Filter tabs at top: "All", "Active", "Ended", "Archived", "Draft"
   - "All" tab is selected by default
   - Each tab shows count: "All (8)", "Active (2)", "Ended (3)", "Archived (2)", "Draft (1)"

3. **Contest List Displays**
   - Table or card layout showing all contests with:
     - Contest Name: "Spring Giveaway", "Summer Sale Sweepstakes"
     - Status Badge: Draft (gray), Active (green), Ended (blue), Archived (dark gray)
     - Date Range: "Feb 1 - Feb 28, 2026"
     - Participant Count: "47 participants"
     - Actions menu: "View", "Edit", "More..." (or direct buttons)
   - Contests sorted by date (most recent first)

4. **Filter by Status**
   - User clicks "Active" tab
   - List updates to show only active contests (green badges)
   - Count updates: "Active (2)"
   - List shows: "Spring Giveaway", "Winter Sale"

5. **Click on Contest**
   - User clicks contest name or "View" button
   - Detail page loads with contest information

6. **Search Contests**
   - Search box visible at top of list
   - User types "Spring"
   - List filters to show "Spring Giveaway" only
   - Search is case-insensitive

**Assertions:**
- All contests display with correct name, status, dates, participant count
- Status filters work correctly
- Search filters by contest name
- Dark mode readable throughout
- Contests appear in logical order

---

### Flow 2: Create New Contest via Multi-Step Wizard (Happy Path)

**Prerequisites:**
- Admin is logged in
- Admin is on Contest Management page

**Steps and Expected Results:**

#### Step 1: Basic Information

1. **Click "Create Contest" Button**
   - Prominent button visible on contest list page
   - User clicks "Create Contest"
   - Wizard starts with Step 1/5 indicator

2. **Wizard Step 1: Basic Information Loads**
   - Form title: "Basic Information"
   - Progress indicator shows: "Step 1 of 5"
   - Back button is disabled (first step)
   - Next button is enabled (becomes enabled when form valid)
   - Fields displayed:
     - "Contest Name" (required) - text input
     - "Description" (required) - text area
     - "Promotion Type" (required) - dropdown

3. **Fill Contest Name**
   - User clicks "Contest Name" field
   - User types: "Summer Prize Draw 2026"
   - Field accepts text up to 100 characters

4. **Fill Description**
   - User clicks "Description" field
   - User types: "Win amazing prizes by shopping at our partners!"
   - Text area accepts up to 500 characters
   - Character count displayed: "47/500"

5. **Select Promotion Type**
   - User clicks "Promotion Type" dropdown
   - Options available: "Sweepstakes", "Contest", "Giveaway", "Loyalty Program"
   - User selects: "Sweepstakes"

6. **Click "Next" Button**
   - All required fields filled
   - "Next" button is enabled and clickable
   - User clicks "Next"

#### Step 2: Date & Time Settings

7. **Wizard Step 2: Date & Time Loads**
   - Progress indicator shows: "Step 2 of 5"
   - "Back" button now enabled
   - Fields displayed:
     - "Start Date" (required) - date picker
     - "Start Time" (required) - time picker
     - "End Date" (required) - date picker
     - "End Time" (required) - time picker

8. **Set Start Date**
   - User clicks "Start Date" field
   - Date picker appears
   - User selects: "March 1, 2026"
   - Field shows "03/01/2026" or "2026-03-01"

9. **Set Start Time**
   - User clicks "Start Time" field
   - Time picker appears (or text input)
   - User selects: "12:00 PM"
   - Field shows "12:00 PM"

10. **Set End Date**
    - User clicks "End Date" field
    - Date picker appears
    - User selects: "March 31, 2026" (after start date)
    - Field shows "03/31/2026"

11. **Set End Time**
    - User clicks "End Time" field
    - User selects: "11:59 PM"
    - System validates: end date/time is after start date/time

12. **Click "Next"**
    - User clicks "Next" button

#### Step 3: Rules & Prizes

13. **Wizard Step 3: Rules & Prizes Loads**
    - Progress indicator shows: "Step 3 of 5"
    - Fields displayed:
      - "Rules" (required) - text area
      - "Prize Description" (required) - text area
      - "Prize Value" (optional) - text input
      - "Number of Winners" (required) - number input

14. **Fill Rules**
    - User clicks "Rules" field
    - User types: "Must be 18+, purchase must be €25 or more, one receipt per entry..."
    - Character count shown

15. **Fill Prize Description**
    - User types: "€500 gift card"

16. **Fill Prize Value**
    - User types: "500"

17. **Set Number of Winners**
    - User clicks field, enters: "5"
    - Field accepts 1-100 (or per spec)

18. **Click "Next"**
    - User clicks "Next"

#### Step 4: Entry Requirements

19. **Wizard Step 4: Entry Requirements Loads**
    - Progress indicator shows: "Step 4 of 5"
    - Fields displayed:
      - "Minimum Purchase Amount" (optional) - currency input
      - "Allowed Product Categories" (optional) - multi-select checkboxes
      - "Eligible Stores" (optional) - text area or multi-select
      - "Data Consent Required" (required) - toggle/checkbox

20. **Set Minimum Purchase Amount**
    - User enters: "25.00" (€25)

21. **Select Product Categories**
    - Checkboxes shown: "Groceries", "Electronics", "Home & Garden", "Other"
    - User checks: "Groceries" and "Home & Garden"

22. **Set Data Consent**
    - Toggle switch visible: "Require participants to consent to data processing"
    - User clicks toggle to enable
    - Toggle shows "On" state

23. **Click "Next"**
    - User clicks "Next"

#### Step 5: Review

24. **Wizard Step 5: Review Loads**
    - Progress indicator shows: "Step 5 of 5"
    - All entered information displayed in summary format:
      - Contest Name: "Summer Prize Draw 2026"
      - Description: "Win amazing prizes..."
      - Start: "March 1, 2026 at 12:00 PM"
      - End: "March 31, 2026 at 11:59 PM"
      - Rules: "Must be 18+..."
      - Prize: "€500 gift card (5 winners)"
      - Minimum Purchase: "€25.00"
      - Categories: "Groceries, Home & Garden"
    - Information is organized in readable sections
    - "Edit" button available next to each section (optional - allows jumping back)
    - "Back" button available
    - "Create Contest" button (primary action)

25. **Click "Create Contest"**
    - Button shows loading state: "Creating contest..."
    - Button disabled
    - Wizard form becomes read-only

26. **Contest Created**
    - Success message: "Contest created successfully!"
    - Contest appears in list with status "Draft"
    - User is redirected to contest list or new contest detail page
    - New contest shows all information entered

**Assertions:**
- All wizard steps validate required fields
- User can navigate back through steps
- All data persists when navigating
- New contest is created with correct status (Draft)
- Contest appears in list and can be accessed
- Dark mode readable throughout wizard

---

### Flow 3: Edit Contest Details

**Prerequisites:**
- Admin is logged in
- Contest exists with status "Draft" or "Active"
- User is on Contest Management page

**Steps and Expected Results:**

1. **Click on Contest to Edit**
   - User clicks contest name: "Spring Giveaway"
   - Contest detail page loads

2. **Contest Details Display**
   - Page shows all contest information:
     - Name: "Spring Giveaway"
     - Description: "Win prizes..."
     - Status Badge: "Draft" or "Active" (green)
     - Date Range: "Feb 1 - Feb 28, 2026"
     - All rules and prize information
   - If archived: Blue banner at top: "This contest is archived and read-only."

3. **Click "Edit" Button**
   - "Edit" button visible and clickable (not visible if archived)
   - User clicks "Edit"

4. **Contest Details Become Editable**
   - Fields transform to input fields
   - "Edit" button changes to "Cancel" and "Save" buttons
   - All fields are now editable except date/time fields (may vary by spec)

5. **Make Changes**
   - User modifies contest name: "Spring Giveaway 2026"
   - User modifies description: "Updated description"
   - User modifies prize value: "750" (instead of "500")

6. **Click "Save"**
   - User clicks "Save" button
   - Button shows loading state: "Saving..."
   - Button disabled during save

7. **Changes Saved**
   - Success message: "Contest updated successfully"
   - Fields return to read-only mode
   - "Edit" button reappears
   - Changes are persisted in list view

**Assertions:**
- Edit mode allows field modification
- All changes are saved correctly
- Archived contests are read-only
- Changes appear in list immediately

---

### Flow 4: Archive Ended Contest

**Prerequisites:**
- Contest status is "Ended" (end date has passed)
- User is on Contest Management page

**Steps and Expected Results:**

1. **Select Ended Contest**
   - User clicks "Ended" filter tab
   - List shows only ended contests: "Winter Sale", "Spring Giveaway"

2. **Open Contest Detail**
   - User clicks "Winter Sale" contest
   - Detail page loads with status "Ended" (blue badge)

3. **Click "Archive" Button**
   - "Archive" button is visible and clickable
   - Button color: secondary or warning style
   - User clicks "Archive"

4. **Confirmation Dialog**
   - Dialog title: "Archive Contest?"
   - Message: "This contest will be moved to archive. Archived contests are read-only and cannot be edited."
   - "Cancel" button (secondary)
   - "Archive" button (primary)

5. **Confirm Archival**
   - User clicks "Archive" button
   - Dialog shows loading state

6. **Contest Archived**
   - Success message: "Contest archived successfully"
   - Status changes to "Archived" (dark gray badge)
   - Contest moves to "Archived" filter when refreshed
   - Blue banner appears: "This contest is archived and read-only."
   - "Edit" button no longer visible
   - All participant data is preserved

**Assertions:**
- Archival requires confirmation
- Status changes to "Archived"
- Contest becomes read-only
- Data is preserved
- Contest appears in archived filter

---

### Flow 5: Delete Draft Contest

**Prerequisites:**
- Contest status is "Draft"
- User is on Contest Management page

**Steps and Expected Results:**

1. **Select Draft Contest**
   - User clicks "Draft" filter tab
   - List shows only draft contests: "Summer Prize Draw 2026"

2. **Open Contest Detail or Action Menu**
   - User clicks contest or "..." menu button
   - "Delete" option appears (red color)

3. **Click "Delete"**
   - User clicks "Delete"

4. **Confirmation Dialog**
   - Dialog title: "Delete Contest?"
   - Message: "This action cannot be undone. All associated data will be deleted."
   - Warning: "This is permanent."
   - "Cancel" button
   - "Delete" button (red/danger)

5. **Confirm Deletion**
   - User clicks "Delete" button
   - Dialog shows loading state

6. **Contest Deleted**
   - Success message: "Contest deleted successfully"
   - Contest removed from list
   - User redirected to contest list
   - Draft count decreases by 1

**Assertions:**
- Delete only available for Draft status
- Confirmation dialog shows clear warning
- Contest is completely removed
- Count updates immediately

---

### Flow 6: Duplicate Contest

**Prerequisites:**
- Contest exists in any status (Draft, Active, Ended, Archived)
- User is on Contest Management page

**Steps and Expected Results:**

1. **Open Contest**
   - User clicks on contest or opens "..." menu

2. **Click "Duplicate" Option**
   - "Duplicate" button visible
   - User clicks "Duplicate"

3. **Confirmation Dialog**
   - Dialog: "Duplicate this contest?"
   - Message: "A new draft copy will be created with the same details."
   - "Cancel" button
   - "Duplicate" button

4. **Confirm Duplication**
   - User clicks "Duplicate"
   - Dialog shows loading state

5. **New Contest Created**
   - New contest appears in Draft filter
   - Name: "Summer Prize Draw 2026 - Copy" (or similar)
   - All details copied: rules, prizes, settings
   - Status: "Draft" (always starts as draft)
   - Success message: "Contest duplicated successfully"

6. **Edit Duplicated Contest**
   - User can edit new contest before activation
   - Original contest remains unchanged

**Assertions:**
- Duplication creates exact copy with new name
- New contest starts as Draft
- Original contest unchanged
- Duplicated contest can be edited and activated

---

### Flow 7: View Contest Participants

**Prerequisites:**
- Contest exists with participants
- User is on Contest Management page

**Steps and Expected Results:**

1. **Open Contest**
   - User clicks contest: "Spring Giveaway"
   - Detail page loads

2. **Click "Participants" Tab or Section**
   - Participants tab or "View Participants" button visible
   - User clicks to view participants list

3. **Participants List Displays**
   - Table shows all participants:
     - Name: "John Smith", "Maria Garcia"
     - Email: "john@example.com", "maria@example.com"
     - Participation Date: "Feb 10, 2026"
     - Submission Count: "2 receipts", "1 receipt"
     - Data Consent: "Yes", "No"
   - List shows pagination (if > 10 participants)

4. **Search/Filter Participants**
   - Search box available to find by name or email
   - Filter options: "Data Consent Yes/No"

5. **Click on Participant**
   - User clicks "John Smith"
   - Participant detail page loads with:
     - Full name, email, phone, address
     - All submitted receipts with AI extraction details
     - Data consent status
     - Submission timestamps
     - Status (eligible for prize, etc.)

**Assertions:**
- All participants display correctly
- Participant details show all receipts
- Search and filter work as expected
- Dark mode readable throughout

---

## Empty State Tests

### Empty State 1: No Contests

**Scenario:** New system with no contests created

**Expected:**
- Empty state message: "No contests yet"
- Subtext: "Create your first contest to get started"
- "Create Contest" button is prominent
- Illustration or icon visible
- No table shown

---

### Empty State 2: Filter Returns No Results

**Scenario:** User clicks "Archived" filter but no contests archived

**Expected:**
- Message: "No archived contests found"
- Subtext: "Contests will appear here once archived"
- "Create Contest" button available to create new

---

### Empty State 3: Contest with No Participants

**Scenario:** New active contest with no submissions yet

**Expected:**
- On participant list: "No participants yet"
- Subtext: "Participants will appear here after they submit receipts"
- Participant count shows "0"

---

### Empty State 4: No Search Results

**Scenario:** Search for contest that doesn't exist

**Expected:**
- Message: "No contests match 'xyz'"
- "Clear search" button available
- All contests shown again after clearing

---

## Component Interaction Tests

### Contest List Component Tests

**Test: Filter Tabs**
- Clicking each tab filters list correctly
- Count updates for each filter
- Selected tab is highlighted
- List updates in real-time

**Test: Contest Cards/Rows**
- Each contest displays: name, status badge, date range, participant count
- Status badges use correct colors (draft gray, active green, etc.)
- Click on row opens detail page
- Hover state shows actions (optional)

**Test: Search Functionality**
- Type in search box filters contests by name
- Search is case-insensitive
- Partial matches work ("Spring" finds "Spring Giveaway")
- Clear button appears when typing
- Click clear empties search and shows all

---

### Wizard Form Component Tests

**Test: Step Navigation**
- Back button disabled on first step
- Next button disabled until all required fields filled
- Can navigate back to previous steps
- Data persists when navigating

**Test: Form Validation**
- Required fields cannot be left empty
- Error messages appear on field blur or submit
- Date validation: end date must be after start date
- Min purchase amount: must be positive number
- Form cannot be submitted until all valid

**Test: Progress Indicator**
- Shows correct step number (1 of 5, 2 of 5, etc.)
- Visual progress bar updates with each step
- Current step highlighted

**Test: Review Screen**
- All entered data displayed accurately
- Data is summarized clearly
- User can see all fields before final submission
- Edit buttons available to jump back (if applicable)

---

### Contest Details Component Tests

**Test: Edit Mode Toggle**
- "Edit" button switches to "Save" + "Cancel" buttons
- Fields become editable in edit mode
- Cancel button reverts all changes
- Save button updates and exits edit mode

**Test: Read-Only Archived View**
- Archived contests show blue banner
- No "Edit" button visible
- All fields are read-only
- Archive button not visible

**Test: Date/Time Display**
- Dates formatted consistently: "March 1, 2026"
- Times shown in 12-hour format (or 24-hour, per spec)
- Date range shown clearly: "Feb 1 - Feb 28, 2026"

---

## Edge Cases

### Edge Case 1: Contest Name with Special Characters
- Input: "Spring 2026 @ Hirter (Limited Edition)"
- Expected: Special characters preserved and displayed correctly

### Edge Case 2: Very Long Description
- Input: 500+ character description
- Expected: Character count enforced, text wraps in display

### Edge Case 3: Create Contest Starting Tomorrow (Not Today)
- Start date set to tomorrow
- Expected: Allowed (spec may vary on backdating)
- Status shows "Draft" until start time is reached

### Edge Case 4: Edit Contest While Active
- Contest status is "Active"
- Admin edits some fields (e.g., description, prize value)
- Expected: Editable fields are updated (dates/status may be read-only per spec)

### Edge Case 5: Contest End Date Reached During Operation
- Contest was "Active", current time reaches end date
- Admin is viewing contest
- Expected: Status automatically updates to "Ended"
- Visual indicator/notification shown to admin

### Edge Case 6: Very Large Participant List
- Contest has 10,000+ participants
- User tries to load all at once
- Expected: Pagination implemented, loads efficiently
- Search/filter available to narrow results

### Edge Case 7: Duplicate Contest Multiple Times
- User duplicates same contest 5 times rapidly
- Expected: All 5 copies created with unique names
- Timestamps/sequence numbers distinguish copies

### Edge Case 8: Timezone Differences in Date/Time
- Admin in UTC sets contest start time
- Admin in PST views same contest
- Expected: Times display in admin's local timezone
- Or system uses universal time with timezone indicator

### Edge Case 9: Network Error During Contest Creation
- Admin submitting multi-step wizard form
- Network drops mid-submission on step 3 of 5
- Expected: Form data is cached, user can resume or restart

### Edge Case 10: Rapid Status Transitions
- Contest transitions from Draft → Active → Ended
- Happens within seconds
- Expected: All status updates reflected correctly
- No race conditions in UI

### Edge Case 11: Archive Contest with Pending Winners
- Contest is ended with winners partially selected
- Admin archives contest
- Expected: Winners data is preserved and read-only
- Cannot modify winner selections in archived contest

### Edge Case 12: Delete and Recreate Contest with Same Name
- User deletes contest "Summer Prize Draw"
- User creates new contest with same name
- Expected: New contest has fresh ID, no data from deleted contest
- No conflicts or duplications

### Edge Case 13: Mobile Responsive Wizard
- User starts wizard on desktop, switches to mobile mid-way
- Expected: Wizard adapts to mobile layout
- All fields remain accessible and usable
- Form state persists across device switch

### Edge Case 14: Very Long Store Name in Eligible Stores Field
- Input: "This is a store with an extremely long name" (100+ chars)
- Expected: Text wraps or scrolls in field
- Full text stored and displayed

---

## Accessibility Checks

### Keyboard Navigation
- [ ] Tab through all form fields in logical order
- [ ] Enter key submits form when valid
- [ ] Escape closes modals and dialogs
- [ ] Arrow keys navigate filter tabs (optional)
- [ ] All buttons and links keyboard accessible
- [ ] Tab order makes sense (left to right, top to bottom)

### Screen Reader (ARIA)
- [ ] Form sections labeled clearly: `aria-label="Basic Information"`
- [ ] Wizard steps labeled: "Step 1 of 5: Basic Information"
- [ ] Required fields marked: `aria-required="true"`
- [ ] Form fields have associated labels
- [ ] Error messages linked to fields: `aria-describedby="error-id"`
- [ ] Date pickers announce selected date
- [ ] Status badges read as "Active" not just color
- [ ] Buttons labeled descriptively: "Archive this contest"

### Color Contrast
- [ ] Button text on background: 4.5:1 contrast
- [ ] Status badges distinguishable: not color alone
- [ ] Error text (red): 4.5:1 on white/light background
- [ ] Dark mode: all text meets 4.5:1 on dark backgrounds
- [ ] Form labels readable: adequate contrast with background

### Mobile Accessibility
- [ ] Buttons/touch targets: minimum 44px × 44px
- [ ] Form inputs: minimum 44px × 44px height
- [ ] Adequate spacing between fields (minimum 8px)
- [ ] Font size minimum 16px (prevents auto-zoom)
- [ ] Date picker usable on mobile
- [ ] Scrollable form if needed on small screens
- [ ] Modal dialogs don't hide critical buttons on mobile

### Focus Indicators
- [ ] Visible focus ring on all interactive elements
- [ ] Focus ring not obscured by other elements
- [ ] Focus ring high contrast in both light and dark modes
- [ ] Focus ring appears on keyboard navigation
- [ ] Focus trap in modal dialogs (Tab cycles through elements)

### Dark Mode
- [ ] All text readable on dark background (4.5:1 contrast)
- [ ] Form input fields have visible borders in dark mode
- [ ] Status badges readable in dark mode
- [ ] Modal dialogs/cards visible in dark mode
- [ ] Focus indicators visible in dark mode

---

## Sample Test Data

### Contest Examples
```json
{
  "contests": [
    {
      "id": "contest-001",
      "name": "Spring Giveaway",
      "description": "Win amazing spring prizes!",
      "status": "active",
      "startDate": "2026-02-01T12:00:00Z",
      "endDate": "2026-02-28T23:59:59Z",
      "rules": "Must be 18+, purchase at participating stores",
      "prizeDescription": "€500 gift card",
      "prizeValue": 500,
      "numberOfWinners": 5,
      "minimumPurchase": 25.00,
      "allowedCategories": ["Groceries", "Home & Garden"],
      "participantCount": 47,
      "receiptCount": 89,
      "createdAt": "2026-01-15T10:00:00Z",
      "createdBy": "admin-001"
    },
    {
      "id": "contest-002",
      "name": "Winter Sale Sweepstakes",
      "description": "Holiday shopping contest",
      "status": "ended",
      "startDate": "2025-12-01T00:00:00Z",
      "endDate": "2025-12-31T23:59:59Z",
      "participantCount": 123,
      "receiptCount": 256,
      "archivedAt": "2026-01-10T10:00:00Z"
    }
  ]
}
```

### Wizard Form Data
```json
{
  "newContest": {
    "basicInfo": {
      "name": "Summer Prize Draw 2026",
      "description": "Win amazing summer prizes",
      "promotionType": "Sweepstakes"
    },
    "dateTime": {
      "startDate": "2026-03-01",
      "startTime": "12:00",
      "endDate": "2026-03-31",
      "endTime": "23:59"
    },
    "rulesAndPrizes": {
      "rules": "Must be 18+, €25 minimum purchase",
      "prizeDescription": "€500 gift card",
      "prizeValue": 500,
      "numberOfWinners": 5
    },
    "entryRequirements": {
      "minimumPurchaseAmount": 25.00,
      "allowedCategories": ["Groceries", "Home & Garden"],
      "eligibleStores": "REWE, EDEKA, Kaufland",
      "dataConsentRequired": true
    }
  }
}
```

### Participant Data
```json
{
  "participants": [
    {
      "id": "participant-001",
      "contestId": "contest-001",
      "name": "John Smith",
      "email": "john@example.com",
      "phone": "+49123456789",
      "address": "123 Main St, Munich",
      "submissionCount": 2,
      "submissionDates": [
        "2026-02-10T14:30:00Z",
        "2026-02-15T10:15:00Z"
      ],
      "dataConsent": true,
      "eligible": true
    }
  ]
}
```

### Error Scenarios
```json
{
  "errorScenarios": [
    {
      "type": "required_field_missing",
      "message": "Contest name is required"
    },
    {
      "type": "invalid_date_range",
      "message": "End date must be after start date"
    },
    {
      "type": "duplicate_name",
      "message": "A contest with this name already exists"
    },
    {
      "type": "invalid_number",
      "message": "Number of winners must be between 1 and 100"
    },
    {
      "type": "network_error",
      "message": "Connection lost. Please check your internet and try again."
    },
    {
      "type": "archive_failed",
      "message": "Could not archive contest. Please try again."
    }
  ]
}
```

---

## Test Execution Checklist

- [ ] Contest list displays with all contests
- [ ] Status filters work correctly
- [ ] Search filters by contest name
- [ ] Multi-step wizard progresses correctly
- [ ] All wizard fields validate properly
- [ ] New contest is created with correct data
- [ ] Contest detail page displays all information
- [ ] Edit mode allows field modification
- [ ] Archived contests are read-only
- [ ] Archive action requires confirmation
- [ ] Delete only available for draft contests
- [ ] Duplication creates accurate copy
- [ ] Participant list displays correctly
- [ ] Dark mode fully functional and readable
- [ ] Accessibility requirements met (keyboard nav, screen readers, contrast)
- [ ] All error messages clear and actionable
- [ ] Form validation prevents invalid submissions
- [ ] Confirmation dialogs prevent accidental actions
- [ ] Status updates automatically when dates reached
- [ ] Mobile responsive design works properly

