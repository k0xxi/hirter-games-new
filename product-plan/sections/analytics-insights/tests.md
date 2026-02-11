# Test Instructions: Analytics Insights

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, etc.).

## Overview

Analytics Insights is an admin dashboard for analyzing contest data, participant behavior, and receipt information for a selected contest. Admins first choose a contest, then view statistics, analyze receipts, examine participants, and select winners automatically or manually.

**Key Flows:**
1. Select contest from dropdown/list
2. View dashboard with key metrics and charts
3. Search and filter receipts
4. View participant details and activity
5. Generate and confirm winners automatically

## User Flow Tests

### Flow 1: Contest Selection and Dashboard View (Happy Path)

**Prerequisites:**
- Admin is logged in
- Multiple contests exist (active, ended, archived)
- User is on Analytics Insights section

**Steps and Expected Results:**

1. **Analytics Page Loads**
   - Page title: "Analytics & Insights"
   - Subtext: "Analyze contest data and select winners"
   - Design uses Hirter colors (primary #253081, secondary #D5B376)
   - Dark mode: all text readable

2. **Contest Selector Visible**
   - Prominent dropdown/selector at top of page: "Select a Contest"
   - Contest selector shows placeholder: "Choose a contest..."
   - Filter tabs below selector: "Active", "Ended", "Archived"
   - "Active" filter selected by default

3. **Filter by Contest Status**
   - User clicks "Ended" tab
   - Dropdown list updates to show only ended contests
   - Count indicator: "Ended (3)"

4. **Select Contest**
   - User clicks contest dropdown
   - List displays:
     - "Spring Giveaway" (Active - green badge)
     - "Winter Sale" (Ended - blue badge)
     - "Summer Prize Draw" (Archived - gray badge)
   - User selects: "Spring Giveaway"
   - Dropdown shows selected: "Spring Giveaway ✓"

5. **Dashboard Loads for Selected Contest**
   - Page updates with dashboard for "Spring Giveaway"
   - Section title: "Spring Giveaway Analytics"
   - Status badge shows: "Active" (green)

6. **Key Metrics Cards Display**
   - Metrics section at top with statistics:
     - Card 1: "Total Participants" with number "47"
     - Card 2: "Total Receipts" with number "89"
     - Card 3: "Average Purchase Amount" with "€52.30"
     - Card 4: "Submission Rate" with percentage "85%"
   - Each card displays metric name and value clearly
   - Dark mode: text readable, cards visible

7. **Charts and Visualizations Visible**
   - Chart 1: "Submissions Over Time" (line chart)
     - X-axis: date range (Feb 1 - Feb 28)
     - Y-axis: number of submissions
     - Shows trend of receipts submitted daily
   - Chart 2: "Top Product Categories" (bar chart)
     - Horizontal bars showing most purchased categories
     - Labels: "Groceries (32)", "Electronics (15)", "Home (12)"
   - Chart 3: "Participant Demographics" (pie chart, optional)
     - Shows data consent breakdown: "Consent Yes (85%)", "Consent No (15%)"

8. **Switch to Different Contest**
   - User clicks contest selector again
   - User selects: "Winter Sale" (Ended)
   - Dashboard updates with data for Winter Sale
   - All metrics and charts refresh with new contest data

**Assertions:**
- Contest selector displays correct contests
- Dashboard updates when contest selected
- All metrics calculate and display correctly
- Charts render with accurate data
- Dark mode readable throughout
- Contest status filter works as expected

---

### Flow 2: Browse Archived Contest Analytics

**Prerequisites:**
- Archived contests exist with historical data
- User is on Analytics Insights section

**Steps and Expected Results:**

1. **Click "Archived" Filter Tab**
   - User clicks "Archived" tab on contest selector
   - Filter shows archived contests only

2. **Select Archived Contest**
   - User selects: "Last Summer Giveaway" (archived)
   - Dashboard loads with historical data

3. **Archived Contest Banner Displays**
   - Blue banner at top: "This contest is archived and read-only"
   - Subtext: "Only view permissions available. No modifications can be made."
   - Status badge shows: "Archived" (dark gray)

4. **View Historical Analytics**
   - Key metrics show final statistics:
     - "Total Participants: 234"
     - "Total Receipts: 456"
     - "Final Submission Count: 456"
   - Charts show complete data (not live updates)
   - Charts have labels indicating: "Final Data"

5. **Winner Selection Disabled**
   - "Select Winners" section visible but disabled
   - Button grayed out with message: "Winner selection not available for archived contests"
   - Info text: "Winners were already selected and are final"

**Assertions:**
- Archived contests load with read-only state
- All historical data displays
- Winner selection is disabled
- Clear indication that contest is archived and read-only

---

### Flow 3: Search and Filter Receipts

**Prerequisites:**
- Contest is selected with multiple receipts
- User is on Analytics Insights section

**Steps and Expected Results:**

1. **View Receipts Section**
   - Scrolling down or clicking "Receipts" tab shows receipt list
   - Section title: "Receipts"
   - Subtext: Shows count "89 receipts from 47 participants"

2. **Receipt List Displays**
   - Table layout with columns:
     - Participant Name: "John Smith", "Maria Garcia"
     - Store Name: "REWE", "EDEKA"
     - Purchase Date: "Feb 10, 2026"
     - Receipt Total: "€45.99"
     - Status: "Valid", "Pending Review"
   - Each row clickable to view receipt details
   - Pagination controls if > 10 receipts

3. **Search for Receipt by Store Name**
   - Search box available: "Search receipts..."
   - User types: "REWE"
   - List filters to show only REWE receipts: 23 results
   - "Clear search" button appears

4. **Filter by Date Range**
   - Filter option: "Date Range"
   - Date picker shows: "From" and "To" fields
   - User selects: "Feb 10, 2026" to "Feb 20, 2026"
   - List updates to show only receipts from that period

5. **Filter by Participant**
   - User clicks "Filter by Participant"
   - Dropdown shows list of participants
   - User selects: "John Smith"
   - List shows only John's receipts: 2 results

6. **Combine Filters**
   - User has filters active: Store = "REWE", Participant = "John Smith", Date = Feb 10-20
   - List shows 1 result: John's receipt from REWE on Feb 15
   - "Clear all filters" button available

7. **Click on Receipt**
   - User clicks receipt row
   - Receipt detail page/modal opens

**Assertions:**
- Search filters by store name
- Date range filter works correctly
- Participant filter shows correct receipts
- Filters can be combined
- All receipts display with accurate data

---

### Flow 4: View Receipt Details

**Prerequisites:**
- Receipt is selected from list
- User has viewing permissions

**Steps and Expected Results:**

1. **Receipt Detail View Opens**
   - Modal or detail page appears
   - Receipt header shows: "Receipt from REWE, Feb 15, 2026"
   - Close button (X) available to return to list

2. **Extracted Receipt Data Displays**
   - Store Information:
     - Store Name: "REWE Market Munich"
     - Address: "123 Main St, Munich"
     - Purchase Date: "Feb 15, 2026"
     - Purchase Time: "2:45 PM"
   - Receipt Totals:
     - Subtotal: "€38.50"
     - Tax: "€7.49"
     - Total: "€45.99"

3. **Product Items Listed**
   - Product list shows:
     - "Apple" - Quantity: 3, Unit Price: €1.50, Total: €4.50
     - "Bread" - Quantity: 1, Unit Price: €2.99, Total: €2.99
     - "Milk 1L" - Quantity: 2, Unit Price: €1.99, Total: €3.98
     - "Cheese" - Quantity: 1, Unit Price: €5.99, Total: €5.99
   - Each product shows category (Groceries, Dairy, etc.)

4. **Receipt Image Displayed**
   - Original receipt image shown (if uploaded)
   - Image can be enlarged on click
   - Image is clear and readable

5. **Participant Information**
   - Participant name: "John Smith"
   - Email: "john@example.com"
   - Submission date/time: "Feb 15, 2026 at 2:50 PM"
   - Number of total entries by this participant: "2 receipts"

6. **Receipt Status**
   - Status badge: "Valid" (green) or "Pending" (yellow)
   - Validation notes (if applicable): "All products eligible"

7. **Close and Return**
   - User clicks close button or "Back"
   - Returns to receipts list
   - Filter and search state preserved

**Assertions:**
- All receipt data displays accurately
- Product items listed with quantities and prices
- Participant info shown correctly
- Receipt image visible and readable
- Dark mode readable throughout

---

### Flow 5: View Participant Details and Activity

**Prerequisites:**
- Receipts are loaded for selected contest
- User selects a specific participant

**Steps and Expected Results:**

1. **Access Participant List**
   - On Analytics page, click "Participants" tab or section
   - List shows all participants: "47 participants"
   - Table columns: Name, Email, Submission Count, Data Consent, Eligible

2. **Search for Participant**
   - User clicks participant "John Smith"
   - Or user searches: "john" in search box
   - List filters to participant

3. **Participant Detail View Opens**
   - Page title: "John Smith"
   - Email: "john@example.com"
   - Phone: "+49123456789"
   - Address: "123 Main St, Munich"

4. **Participant Activity History**
   - Section: "Submissions"
   - Count: "2 receipts submitted"
   - Timeline or list showing:
     - Submission 1: "Feb 10, 2026 at 3:15 PM" - Receipt from REWE
     - Submission 2: "Feb 15, 2026 at 2:50 PM" - Receipt from EDEKA

5. **Each Submission Shows Details**
   - Click on submission: shows receipt details (as in Flow 4)
   - Receipt total, items, image all visible
   - Status of each receipt shown

6. **Data Consent Information**
   - Data Consent Status: "Yes ✓"
   - Date Consented: "Feb 10, 2026"
   - Consent text: "Participant consented to data processing"

7. **Participant Eligibility**
   - Eligibility Status: "Eligible for Prize" (green) or "Not Eligible" (red)
   - Reason: "Meets all contest requirements"

8. **Back to List**
   - User clicks "Back to Participants"
   - Returns to participant list
   - List state preserved

**Assertions:**
- Participant info displays completely
- All submissions listed chronologically
- Each submission links to receipt details
- Consent status clear
- Eligibility determination shown

---

### Flow 6: Generate Winners (Automatic Selection)

**Prerequisites:**
- Contest is "Active" or "Ended" (not Archived)
- Contest has participants and receipts
- User has permissions to select winners

**Steps and Expected Results:**

1. **View Winner Selection Section**
   - Scrolling down or clicking "Winners" tab
   - Section title: "Select Winners"
   - Subtext: "Contest: Spring Giveaway (5 winners needed)"

2. **Click "Generate Winner Candidates" Button**
   - Button visible and enabled (for active/ended contests)
   - User clicks button

3. **System Generates Candidates**
   - Loading state: "Generating winners..."
   - Backend randomly selects eligible participants
   - Process considers:
     - All eligible receipts/participants
     - No duplicates (same participant can win once)
     - Fairness algorithm

4. **Winner Candidates Display**
   - List shows 5 generated candidates:
     - Rank 1: "John Smith" (REWE receipt, Feb 15) - €45.99
     - Rank 2: "Maria Garcia" (EDEKA receipt, Feb 12) - €62.50
     - Rank 3: "Sarah Mueller" (Kaufland receipt, Feb 20) - €38.75
     - Rank 4: "Peter Schmidt" (REWE receipt, Feb 18) - €55.00
     - Rank 5: "Anna Weber" (EDEKA receipt, Feb 25) - €71.99
   - Each winner row shows: name, store, date, receipt amount
   - Checkbox next to each to confirm/reject
   - "Regenerate" button to generate new candidates

5. **Review Winner Candidates**
   - Admin reviews all 5 candidates
   - Admin can uncheck any candidate to reject
   - Admin can click on name to see full receipt details

6. **Confirm Winners**
   - User clicks "Confirm Winners" button
   - Confirmation dialog: "Confirm these 5 winners?"
   - Message: "Winners will be notified and prizes awarded"
   - "Cancel" button
   - "Confirm" button

7. **Winners Confirmed**
   - Success message: "5 winners selected successfully!"
   - Winner list shows confirmed winners
   - Status changes to "Winners Selected"
   - Winner notification emails sent to selected participants
   - Each winner receives email: "Congratulations! You won [Prize]!"

8. **Regenerate and Confirm Again**
   - User can click "Regenerate" to select different winners
   - Previous winners are replaced with new candidates
   - Same confirmation process

**Assertions:**
- Random selection algorithm works fairly
- Candidates display with required information
- Confirmation dialog prevents accidental selection
- Notification emails sent to winners
- Winner count matches contest requirements
- Archived contests cannot generate winners

---

### Flow 7: Manually Confirm Winners

**Prerequisites:**
- Winner candidates have been generated
- User wants to manually adjust winner selection

**Steps and Expected Results:**

1. **Generated Candidates Displayed (from Flow 6)**
   - 5 candidates shown with checkboxes

2. **Uncheck Unwanted Candidate**
   - Admin unchecks: "Peter Schmidt"
   - Checkbox becomes empty

3. **Manual Participant Selection**
   - User clicks "Add Participant" button
   - Search/list of all eligible participants opens
   - User searches: "Thomas"
   - User selects: "Thomas Hoffmann"
   - Thomas appears in winner list

4. **New Winner List**
   - Rank 1: "John Smith" ✓
   - Rank 2: "Maria Garcia" ✓
   - Rank 3: "Sarah Mueller" ✓
   - Rank 4: "Thomas Hoffmann" ✓ (manually added)
   - Rank 5: "Anna Weber" ✓

5. **Confirm Final Winners**
   - User clicks "Confirm Winners"
   - Confirmation dialog appears
   - User confirms selection
   - Winners locked in and notified

**Assertions:**
- Manual winner selection works
- Can replace auto-generated candidates
- Final list reflects manual adjustments
- All winners notified via email
- Winner selection is locked after confirmation

---

## Empty State Tests

### Empty State 1: No Contest Selected

**Scenario:** User first arrives at Analytics page

**Expected:**
- Contest selector shows: "Select a contest..."
- Dashboard area is empty/grayed out
- Message: "Select a contest to view analytics"
- No charts or metrics displayed
- No participants or receipts shown

---

### Empty State 2: Selected Contest Has No Receipts

**Scenario:** Newly created active contest with no submissions

**Expected:**
- Contest is selected
- Key metrics show: "0" participants, "0" receipts
- Charts display empty state: "No data available yet"
- Receipts section: "No receipts submitted yet"
- Message: "Participants will appear here after they submit receipts"

---

### Empty State 3: No Participants Match Filter

**Scenario:** Search for non-existent participant

**Expected:**
- List clears
- Message: "No participants found matching 'xyz'"
- "Clear search" button available

---

### Empty State 4: No Receipts Match Filters

**Scenario:** Search receipts with criteria that matches nothing

**Expected:**
- Message: "No receipts match your search"
- Subtext: "Try adjusting your filters or date range"
- "Clear filters" button available

---

### Empty State 5: No Winners Available (Not Enough Participants)

**Scenario:** Contest needs 5 winners but only 2 eligible participants

**Expected:**
- "Select Winners" section shows warning
- Message: "Not enough eligible participants (Need 5, Have 2)"
- "Generate Winners" button disabled
- Explanation: "All participants must be eligible to generate winners"

---

## Component Interaction Tests

### Contest Selector Component Tests

**Test: Dropdown Functionality**
- Click dropdown: list of contests appears
- Filter tabs (Active/Ended/Archived) narrow results
- Contest count updates for each filter
- Selected contest highlighted in list
- Click to select: dropdown closes, selected contest shows

**Test: Status Badges**
- Active contests show green badge
- Ended contests show blue badge
- Archived contests show gray badge
- Status visible in dropdown and selector header

---

### Metrics Cards Component Tests

**Test: Metric Display**
- Each card shows metric name and value
- Values are accurate and update when contest changes
- Cards are responsive (stack on mobile, side-by-side on desktop)
- Dark mode: cards visible with readable text

**Test: Metric Tooltips (Optional)**
- Hover on metric: tooltip explains calculation
- Example: "Average Purchase Amount: Sum of all receipts / Number of receipts"

---

### Charts and Visualizations Tests

**Test: Line Chart (Submissions Over Time)**
- X-axis shows correct date range
- Y-axis shows submission counts
- Data points accurately reflect submissions
- Chart updates when contest changes
- Tooltip on hover shows date and count

**Test: Bar Chart (Top Categories)**
- Horizontal bars show categories
- Length of bars proportional to frequency
- Labels show category names and counts
- Sorted by frequency (highest to lowest)

**Test: Pie Chart (Data Consent)**
- Pie segments show correct proportions
- Labels show category and percentage
- Colors distinct for each segment
- Dark mode: segments visible and distinguishable

---

### Receipt List Component Tests

**Test: Search Functionality**
- Type store name: list filters in real-time
- Search case-insensitive: "rewe" matches "REWE"
- Clear button appears while typing
- Click clear: search resets, all receipts shown

**Test: Date Range Filter**
- Click "Date Range" filter
- Date picker shows "From" and "To" fields
- Select dates: list updates immediately
- Can adjust dates multiple times

**Test: Participant Filter**
- Click participant filter
- Dropdown shows list of participants
- Select participant: list shows their receipts only
- Can change selection

---

### Participant Details Component Tests

**Test: Participant Information Display**
- Name, email, phone, address all shown
- Data consent status clear
- Eligibility status clear
- Last submission date shown

**Test: Submission Timeline**
- All submissions listed chronologically
- Most recent first
- Each submission clickable to view receipt details
- Submission count accurate

---

### Winner Selection Component Tests

**Test: Generate Winners Button**
- Enabled for active/ended contests
- Disabled for archived contests
- Click triggers generation process
- Loading state shows during generation

**Test: Winner Candidates Display**
- 5 candidates shown (or contest-required number)
- Each shows name, store, date, receipt amount
- Checkboxes allow selection/deselection
- "Regenerate" button available

**Test: Manual Winner Addition**
- "Add Participant" button opens participant list
- Can search and select participant
- Selected participant added to winner list
- Can remove manually added participant

**Test: Confirm Winners**
- Confirmation dialog appears
- Shows winner names and count
- Click confirm: winners locked in
- Email notifications sent

---

## Edge Cases

### Edge Case 1: Contest Name with Special Characters
- Contest: "Spring 2026 @ Hirter (Limited Edition)"
- Expected: Name displays correctly in selector and dashboard

### Edge Case 2: Very Large Participant Count
- Contest has 50,000+ participants
- Expected: Pagination implemented, search/filter available
- Charts still render efficiently (aggregate data if needed)

### Edge Case 3: High-Frequency Submissions
- Multiple receipts submitted in same minute
- Expected: Timeline and charts display correctly
- Timestamps accurate to second

### Edge Case 4: Receipt with Extreme Values
- Receipt total: "€9,999.99" (very high)
- Expected: Displays correctly, doesn't break UI
- Average calculation handles outliers

### Edge Case 5: Participant with No Email
- Participant submitted receipt but no email in system
- Expected: Graceful handling, empty email field shown
- Cannot send winner notification (warning in UI)

### Edge Case 6: Concurrent Winner Selection
- Two admins try to generate/confirm winners simultaneously
- Expected: First request succeeds, second request shows "Winners already selected"

### Edge Case 7: Switch Contests During Data Load
- Admin selects contest, data loading, admin clicks another contest
- Expected: Previous load cancelled, new contest data loads
- No duplicate data or UI errors

### Edge Case 8: Timezone Display in Timestamps
- Receipts submitted by users in different timezones
- Expected: All times display in admin's local timezone
- Or clear indication of timezone

### Edge Case 9: Network Error During Winner Generation
- System generating winners, network drops
- Expected: Error message shown, can retry generation
- Previous state preserved

### Edge Case 10: Rapid Filter Changes
- Admin rapidly changes date range, participant, store filters
- Expected: UI updates smoothly, no lag
- Final state accurately reflects last selected filters

### Edge Case 11: Archived Contest with Incomplete Data
- Archived contest missing some receipt images
- Expected: Shows "Image not available" gracefully
- Other data still accessible

### Edge Case 12: Very Long Participant Name or Store Name
- Participant: "Muhammad Abdulrahman Muhammad Hassan Ahmad" (100+ chars)
- Store: "This is a store with an extremely long name" (80+ chars)
- Expected: Text wraps or truncates with ellipsis
- Full text accessible on hover or detail view

### Edge Case 13: Mobile View of Charts
- User views analytics on mobile phone
- Expected: Charts adapt to narrow screen
- Chart labels and values readable
- Interactive elements remain usable

### Edge Case 14: Participant Not Eligible
- Participant submitted but doesn't meet contest requirements
- Expected: "Not Eligible for Prize" status clear
- Cannot be selected as winner
- Reason for ineligibility shown (optional)

---

## Accessibility Checks

### Keyboard Navigation
- [ ] Tab through contest selector, filters, and buttons
- [ ] Enter key selects contest from dropdown
- [ ] Tab through filter buttons
- [ ] Enter/Space activates buttons (Generate Winners, Confirm, etc.)
- [ ] Escape closes modals and dropdowns
- [ ] Arrow keys navigate dropdown (optional)

### Screen Reader (ARIA)
- [ ] Contest selector: `aria-label="Select a contest"`
- [ ] Filter tabs: `role="tablist"` with `role="tab"` for each filter
- [ ] Metrics cards: `aria-label="Total Participants: 47"`
- [ ] Charts: `role="img"` with `aria-label` describing chart
- [ ] Receipt table: `role="table"` with proper headers
- [ ] Winner list: `role="list"` with `role="listitem"` for each
- [ ] Buttons labeled clearly: "Generate Winners for Spring Giveaway"
- [ ] Status badges read as text, not just color

### Color Contrast
- [ ] Button text on background: 4.5:1 contrast
- [ ] Metric card values: readable, adequate contrast
- [ ] Chart colors distinguishable for colorblind users
- [ ] Status badges (green/blue/gray) not color-only (include pattern or text)
- [ ] Dark mode: all text meets 4.5:1 on dark backgrounds
- [ ] Table text readable: adequate contrast

### Mobile Accessibility
- [ ] Buttons/touch targets: minimum 44px × 44px
- [ ] Form inputs: minimum 44px × 44px height
- [ ] Adequate spacing between elements (minimum 8px)
- [ ] Font size minimum 16px (prevents auto-zoom)
- [ ] Charts scale properly on mobile screens
- [ ] Dropdown and filter controls usable on touch
- [ ] Scrollable tables/lists on narrow screens

### Focus Indicators
- [ ] Visible focus ring on dropdown
- [ ] Visible focus ring on all buttons
- [ ] Visible focus ring on filter controls
- [ ] Focus ring not obscured by other elements
- [ ] Focus ring high contrast in both light and dark modes
- [ ] Focus ring appears on keyboard navigation

### Dark Mode
- [ ] All text readable on dark background (4.5:1 contrast)
- [ ] Metrics cards visible with borders in dark mode
- [ ] Chart colors visible and distinguishable in dark mode
- [ ] Table/receipt list readable in dark mode
- [ ] Modal dialogs visible in dark mode
- [ ] Buttons and focus indicators visible in dark mode

---

## Sample Test Data

### Contest Data for Analytics
```json
{
  "contests": [
    {
      "id": "contest-001",
      "name": "Spring Giveaway",
      "status": "active",
      "participantCount": 47,
      "receiptCount": 89,
      "averagePurchaseAmount": 52.30,
      "submissionRate": 85,
      "dataConsentYes": 40,
      "dataConsentNo": 7,
      "startDate": "2026-02-01T00:00:00Z",
      "endDate": "2026-02-28T23:59:59Z"
    }
  ]
}
```

### Receipt Data
```json
{
  "receipts": [
    {
      "id": "receipt-001",
      "participantId": "participant-001",
      "participantName": "John Smith",
      "storeName": "REWE Market",
      "purchaseDate": "2026-02-15T14:45:00Z",
      "submissionDate": "2026-02-15T14:50:00Z",
      "receiptTotal": 45.99,
      "status": "Valid",
      "products": [
        {
          "name": "Apple",
          "quantity": 3,
          "unitPrice": 1.50,
          "total": 4.50,
          "category": "Groceries"
        }
      ]
    }
  ]
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
      "dataConsent": true,
      "eligible": true,
      "submissions": [
        {
          "receiptId": "receipt-001",
          "date": "2026-02-15T14:50:00Z"
        }
      ]
    }
  ]
}
```

### Winner Selection Data
```json
{
  "winnerGeneration": {
    "contestId": "contest-001",
    "winnersNeeded": 5,
    "eligibleParticipants": 45,
    "candidates": [
      {
        "rank": 1,
        "participantId": "participant-001",
        "name": "John Smith",
        "storeName": "REWE",
        "purchaseDate": "2026-02-15",
        "receiptAmount": 45.99,
        "selected": true
      }
    ],
    "selectionTime": "2026-02-11T15:30:00Z",
    "selectedBy": "admin-001"
  }
}
```

### Metrics Data
```json
{
  "metrics": {
    "totalParticipants": 47,
    "totalReceipts": 89,
    "averagePurchaseAmount": 52.30,
    "submissionRate": 85,
    "topCategories": [
      { "name": "Groceries", "count": 45 },
      { "name": "Electronics", "count": 18 },
      { "name": "Home & Garden", "count": 12 }
    ],
    "submissionsByDay": [
      { "date": "2026-02-01", "count": 5 },
      { "date": "2026-02-02", "count": 8 },
      { "date": "2026-02-03", "count": 6 }
    ]
  }
}
```

### Error Scenarios
```json
{
  "errorScenarios": [
    {
      "type": "no_contest_selected",
      "message": "Select a contest to view analytics"
    },
    {
      "type": "no_eligible_winners",
      "message": "Not enough eligible participants (Need 5, Have 2)"
    },
    {
      "type": "network_error",
      "message": "Connection lost. Please check your internet and try again."
    },
    {
      "type": "winners_already_selected",
      "message": "Winners for this contest have already been selected"
    },
    {
      "type": "concurrent_selection",
      "message": "Another admin is selecting winners. Please try again in a moment."
    },
    {
      "type": "invalid_date_range",
      "message": "End date must be after start date"
    }
  ]
}
```

---

## Test Execution Checklist

- [ ] Contest selector displays all contests with correct status
- [ ] Status filters (Active/Ended/Archived) work correctly
- [ ] Dashboard updates when contest selected
- [ ] All metrics calculate accurately
- [ ] Charts render with correct data
- [ ] Receipts list displays with participant, store, date, total
- [ ] Search filters receipts by store name
- [ ] Date range filter works correctly
- [ ] Participant filter narrows receipt list
- [ ] Filters can be combined
- [ ] Receipt details display completely with items and image
- [ ] Participant details show all information
- [ ] Submission timeline is chronological
- [ ] Winner generation creates fair random selection
- [ ] Confirmation dialog prevents accidental selection
- [ ] Manual winner adjustment works
- [ ] Winner emails sent to selected participants
- [ ] Archived contests are read-only
- [ ] Winner selection disabled for archived contests
- [ ] Dark mode fully functional and readable
- [ ] Accessibility requirements met (keyboard nav, screen readers, contrast)
- [ ] All error messages clear and actionable
- [ ] Mobile responsive design works properly
- [ ] Charts and tables adapt to mobile screens

