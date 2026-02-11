# Test Instructions: Contest Participation

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, etc.).

## Overview

Contest Participation is a mobile-first receipt upload flow where customers participate in contests by photographing receipts. The system guides users through a step-by-step wizard that validates receipt images through AI processing, allows manual correction of extracted data, and finally confirms their entry.

**Key Flows:**
1. Contest details review and receipt requirement verification
2. Receipt upload (via camera or file picker)
3. AI processing with visible progress stages
4. Data review and manual correction
5. Entry confirmation and success feedback

## User Flow Tests

### Flow 1: Successful Receipt Upload and Entry (Happy Path)

**Prerequisites:**
- User is on a contest detail page
- Contest is active and accepting entries
- User has a valid receipt image

**Steps and Expected Results:**

1. **View Contest Details Screen**
   - Verify page displays: contest title, description, rules section, prize information
   - Verify receipt requirement information is visible (e.g., "Receipt must show store name, date, and total amount")
   - Verify "Upload Receipt" button is clickable (prominent CTA)
   - Verify dark mode: text readable, buttons visible

2. **Click "Upload Receipt" Button**
   - On mobile: Camera upload option appears as primary choice
   - On desktop: Drag-and-drop zone is visible with "Choose File" button
   - Drag-and-drop zone has clear instructions: "Drag your receipt here or click to select"

3. **Upload Receipt Image**
   - **Mobile camera path**: Camera opens, user captures receipt photo
   - **File picker path**: User selects receipt image from device storage
   - Image appears in preview before processing starts

4. **Processing Stage 1: "Reading Receipt"**
   - Progress bar shows 33% completion
   - Loading spinner visible with text: "Reading receipt..."
   - User cannot interact with form during this stage
   - Status remains visible for minimum 1 second before advancing

5. **Processing Stage 2: "Extracting Items"**
   - Progress bar shows 66% completion
   - Text updates to: "Extracting items..."
   - User cannot click back or cancel during extraction

6. **Processing Stage 3: "Verifying Products"**
   - Progress bar shows 99% completion
   - Text updates to: "Verifying products..."
   - Final verification completes

7. **Review Screen Appears with Extracted Data**
   - Store details section displays:
     - "Store Name" field: editable, pre-filled with extracted value (e.g., "REWE Market")
     - "Date of Purchase" field: editable, pre-filled with extracted date
     - "Total Amount" field: editable, pre-filled with extracted amount (e.g., "€45.99")
   - Product items list displays below with:
     - Product name (editable)
     - Quantity (editable)
     - "Remove Item" button for each product
   - "Add Item" button is clickable at bottom of product list
   - "Back to Camera" button allows re-upload
   - "Submit Entry" button (primary action) is highlighted

8. **Manual Data Correction (Optional)**
   - User can edit store name: field clears on focus, accepts any text input
   - User can edit date: field accepts date picker or text input (MM/DD/YYYY)
   - User can edit total: field accepts numeric input with optional decimal places
   - User can edit product items: click on item name/qty to edit inline
   - User can remove a product: click "Remove Item" button, item disappears from list
   - User can add new item: click "Add Item", new row appears with empty fields, user fills and confirms
   - Changes are visible immediately in the form

9. **Click "Submit Entry" Button**
   - Loading state visible: "Submitting your entry..."
   - Button becomes disabled to prevent double submission
   - Form validation runs: all fields with values pass validation
   - Success notification appears: "Your entry was submitted successfully! Good luck!"
   - Confirmation screen displays:
     - Checkmark icon (visual confirmation)
     - Contest name and submission date/time
     - Participant email address
     - Number of entries for this contest (e.g., "Entry 1 of 2")
   - "View My Entries" button navigates to entries list
   - "Browse Other Contests" button returns to contests view

**Assertions:**
- Receipt image successfully processed through all 3 stages
- All extracted data is visible and editable
- Entry submission completes without errors
- Confirmation feedback is clear and actionable
- Dark mode readable throughout all steps

---

### Flow 2: Validation Error - Invalid Image

**Prerequisites:**
- User uploads a non-receipt image or corrupted file

**Steps and Expected Results:**

1. **User Uploads Invalid Image**
   - Image file selected (e.g., logo, screenshot, corrupted JPG)

2. **Processing Begins**
   - Progress through reading stage shows: "Reading receipt..."

3. **Processing Fails**
   - Error message appears: "Could not read this image. Please ensure your receipt is clear and legible."
   - Secondary text: "Try adjusting lighting or taking a new photo."
   - Error state displayed with red/warning styling (maintains dark mode contrast)
   - "Try Again" button appears to restart upload
   - "Back to Contest" button allows user to return without uploading

**Assertions:**
- Invalid image is rejected before extraction stage
- Error message is user-friendly and actionable
- User can retry without losing form context

---

### Flow 3: Validation Error - Non-Qualifying Products

**Prerequisites:**
- Receipt image is valid but contains non-qualifying products only

**Steps and Expected Results:**

1. **Processing Completes with Extracted Data**
   - All 3 processing stages complete successfully
   - Review screen shows extracted products

2. **System Detects Non-Qualifying Products**
   - Warning message appears: "This receipt doesn't seem to qualify. We didn't recognize any eligible products."
   - Product items display with warning badges (if any products were detected)
   - "Submit Entry" button is disabled (grayed out)
   - Message suggests: "Please check our rules or try a different receipt."

3. **User Options**
   - "Back to Camera" button allows re-upload
   - User can manually add products by clicking "Add Item"
   - If user manually adds valid items, "Submit Entry" button becomes enabled

**Assertions:**
- Non-qualifying products are flagged before submission
- User is informed why entry cannot be submitted
- User has path to correct or try again

---

### Flow 4: Validation Error - Duplicate Submission

**Prerequisites:**
- User has already submitted an entry for the same receipt
- Same receipt (same store, date, and amount) is uploaded again

**Steps and Expected Results:**

1. **Processing Completes**
   - AI successfully reads and extracts data

2. **System Detects Duplicate**
   - Error message appears: "You've already submitted an entry for this receipt."
   - Secondary text: "Each receipt can only be submitted once per contest."
   - Store details and extracted items are displayed for reference
   - "Back to Camera" button allows user to upload different receipt
   - "View Previous Entry" button shows the original submission details

**Assertions:**
- Duplicate submission is detected during processing
- User is informed with clear message
- User can choose to upload different receipt or review original entry

---

### Flow 5: Data Correction and Modification

**Prerequisites:**
- Receipt is processed and user is on review screen
- Extracted data contains errors or needs adjustment

**Steps and Expected Results:**

1. **Edit Store Name**
   - User clicks on "Store Name" field
   - Field becomes focused (border highlighted)
   - User clears existing text and types correct name: "EDEKA Plus"
   - Change is immediately visible

2. **Edit Purchase Date**
   - User clicks on "Date of Purchase" field
   - Date picker appears or field accepts text input
   - User selects/enters new date
   - Field updates with selected date

3. **Edit Total Amount**
   - User clicks on "Total Amount" field
   - Field becomes focused
   - User enters new amount: "52.75"
   - Field accepts numbers and decimal point only

4. **Edit Product Items**
   - User sees product list with: "Apple", "1x", "Bread", "1x", "Milk", "2x"
   - User clicks on "Bread" to edit quantity
   - Field becomes editable, user changes to "2"
   - User removes "Apple" by clicking "Remove Item"
   - Apple disappears from list
   - User clicks "Add Item"
   - New empty row appears with "Product Name" and "Quantity" fields
   - User enters: "Cheese" and "1"
   - New item appears in list

5. **Submit Corrected Entry**
   - User clicks "Submit Entry"
   - All corrected data is submitted
   - Confirmation shows updated values

**Assertions:**
- All fields accept and display user edits
- Product list updates correctly when items added/removed
- Edited data is submitted correctly

---

### Flow 6: Receipt Re-upload (Wizard Back Button)

**Prerequisites:**
- User is on review screen with extracted data

**Steps and Expected Results:**

1. **User Clicks "Back to Camera" Button**
   - Review screen closes
   - Camera/upload interface appears again
   - Previous upload is cleared
   - User can select new receipt image

2. **Upload Different Receipt**
   - New image is selected
   - Processing begins for new receipt
   - Previous data is completely replaced

**Assertions:**
- Back button returns to upload step without losing context
- New upload overwrites previous data
- No data from previous attempt remains

---

## Empty State Tests

### Empty Contest List (Before Any Contests Exist)

**Scenario:** User visits contests page with no active contests

**Expected:**
- Empty state message: "No contests available at the moment."
- Subtext: "Check back soon for exciting sweepstakes!"
- No upload button or form visible (only on active contests)
- Dark mode: background and text readable

---

### Empty Receipt History

**Scenario:** User has not uploaded any receipts yet

**Expected:**
- After successful first upload, participant can view "My Entries"
- For new participant with no entries: "You haven't entered any contests yet."
- Subtext: "Upload your first receipt to participate!"
- Call-to-action: "Browse Contests" button

---

### Empty Product List During Manual Add

**Scenario:** User clicks "Add Item" before any products are extracted

**Expected:**
- New row appears with empty "Product Name" and "Quantity" fields
- Placeholder text visible: "Enter product name..." and "Enter quantity..."
- User must fill both fields before item can be added
- "Add Item" button remains active for adding multiple items

---

## Component Interaction Tests

### Receipt Upload Component Tests

**Test: Camera Upload on Mobile**
- User taps "Upload Receipt" on mobile device
- Camera permission request appears (system-level)
- After permission, camera opens with viewfinder
- User captures photo
- Preview shows captured image before processing
- User can retake if needed
- Selected image size: verify it's reasonable (not > 10MB)

**Test: File Picker on Desktop**
- User clicks "Choose File" button
- File browser dialog opens
- Only image files are selectable (jpg, png, gif, webp)
- User selects valid receipt image
- File name displays below button
- File preview shows before processing

**Test: Drag-and-Drop Upload**
- User drags receipt image over drop zone
- Drop zone highlights (visual feedback)
- On drop, file is accepted and preview shows
- Processing begins automatically
- Same validation rules apply as file picker

---

### Data Extraction Review Component Tests

**Test: Store Details Editing**
- Store Name field accepts text, emoji stripped if included
- Date field accepts various date formats (shows validation on blur)
- Amount field only accepts numbers and one decimal point
- All fields support undo/clear functionality
- Changes persist until form is submitted or abandoned

**Test: Product List Interaction**
- Each product row displays name and quantity
- Click product name: field becomes editable
- Click quantity: spinner or text field appears
- Minimum quantity: 1
- Maximum quantity: user can enter up to 999
- Remove button appears on hover/focus on each row
- Add Item creates new empty row at bottom of list
- Product names can be very long (test with 100+ characters)

**Test: Form Validation**
- Cannot submit with empty store name
- Cannot submit with future purchase date
- Cannot submit with zero or negative amount
- Cannot submit with zero products
- Each field shows error message on invalid input
- Error messages disappear when corrected

---

### Progress Indicator Component Tests

**Test: Three-Stage Progress Bar**
- Stage 1 (Reading): Progress bar at 33%, spinner active, text: "Reading receipt..."
- Stage 2 (Extracting): Progress bar at 66%, spinner active, text: "Extracting items..."
- Stage 3 (Verifying): Progress bar at 99%, spinner active, text: "Verifying products..."
- Completion: Bar reaches 100%, spinner stops, data displays
- Each stage lasts minimum 1 second for visibility
- User cannot interact with form during any stage
- Progress is smooth and continuous (no jumps)

---

### Success Confirmation Component Tests

**Test: Confirmation Screen Display**
- Checkmark icon displays (animates on entry if framework supports)
- Contest name is displayed prominently
- Submission date and time displayed: "Submitted on Feb 11, 2026 at 2:45 PM"
- Participant email shown: "you@example.com"
- Entry count shown: "Entry 1 of 1" (or higher if multiple)
- Action buttons visible: "View My Entries", "Browse Other Contests"
- Dark mode: all text and icons readable

**Test: Navigation from Confirmation**
- "View My Entries" button navigates to entries list for this contest
- "Browse Other Contests" button returns to contests browsing view
- User can use browser back button (should show confirmation again, not upload)

---

## Edge Cases

### Edge Case 1: Very Long Store Name
- Input: "This Is An Extremely Long Store Name That Exceeds Normal Length" (80+ chars)
- Expected: Field accepts full input, text wraps or truncates with ellipsis in display, full text editable

### Edge Case 2: Special Characters in Store Name
- Input: "Café du Münchën & Co."
- Expected: Special characters (ä, ü, ö, &, accents) are preserved and displayed correctly

### Edge Case 3: Decimal Precision in Amount
- Input: "45.999" (3 decimal places)
- Expected: Field accepts input, warning shown "amounts typically use 2 decimals", user can correct

### Edge Case 4: Future Purchase Date
- Input: Tomorrow's date or date 1 month in future
- Expected: Validation error shown "Purchase date cannot be in the future"

### Edge Case 5: Zero Products After Extraction
- Scenario: Receipt image has no readable products
- Expected: Review screen shows "No products detected" message, user must manually add items via "Add Item"

### Edge Case 6: Receipt Processing Timeout
- Scenario: AI processing takes > 30 seconds
- Expected: Timeout error message: "Processing took too long. Please try again or contact support."

### Edge Case 7: Network Error During Submission
- Scenario: Submit button clicked but network connection drops
- Expected: Error message: "Connection lost. Please check your internet and try again."
- Form data persists on page, user can retry after connection restored

### Edge Case 8: Mobile Orientation Change During Upload
- Scenario: User rotates device while camera is open or during processing
- Expected: Camera adjusts to new orientation, processing continues uninterrupted

### Edge Case 9: Very Large Image File
- Input: 15MB receipt image
- Expected: Error message "Image file too large. Please use a file under 10MB."

### Edge Case 10: Rapid Multiple Submissions
- Scenario: User clicks "Submit Entry" button multiple times quickly
- Expected: Button is disabled after first click, only one submission processed

### Edge Case 11: Editing Item Quantity to 0
- Scenario: User changes product quantity to "0"
- Expected: Field validation triggers, minimum 1 required message shown

### Edge Case 12: Adding Duplicate Products
- Scenario: User manually adds product "Milk" when "Milk" already exists in list
- Expected: System allows duplicate entries (real receipts can have multiples), both appear in list

---

## Accessibility Checks

### Keyboard Navigation
- [ ] Tab order is logical: Upload button → File input → Store name field → Date field → Amount field → Product items → Submit button
- [ ] Enter key submits form when in valid state
- [ ] Escape key closes camera picker (mobile) without losing state
- [ ] All buttons accessible via keyboard

### Screen Reader (ARIA)
- [ ] Upload zone labeled: `role="region"` with `aria-label="Receipt upload area"`
- [ ] Progress bar: `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- [ ] Form fields have associated labels: `<label for="storeName">Store Name</label>`
- [ ] Error messages linked to fields: `aria-describedby="error-storeName"`
- [ ] Product list: `role="list"` with each item as `role="listitem"`
- [ ] Buttons have descriptive text: not just "Delete" but "Remove Milk from product list"

### Color Contrast
- [ ] Error messages: red text on white/light background meets 4.5:1 contrast
- [ ] Success message: green text on white/light background meets 4.5:1 contrast
- [ ] Progress bar colors distinguishable for colorblind users (not red/green only)
- [ ] Dark mode: all text meets 4.5:1 contrast on dark backgrounds

### Mobile Accessibility
- [ ] Buttons/touch targets minimum 44px × 44px
- [ ] Form fields minimum 44px × 44px height
- [ ] Adequate spacing between interactive elements (minimum 8px)
- [ ] Camera permissions request is clear and accessible
- [ ] Camera interface has readable preview and controls

### Focus Indicators
- [ ] Visible focus ring on all interactive elements
- [ ] Focus ring not obscured by other elements
- [ ] Focus ring high contrast (visible in both light and dark mode)

---

## Sample Test Data

### Valid Receipt Images (Simulate with Mock Data)
```json
{
  "validReceipts": [
    {
      "id": "receipt-001",
      "image": "base64_encoded_image_data",
      "extractedData": {
        "storeName": "REWE Market",
        "date": "2026-02-10",
        "total": "45.99",
        "products": [
          { "name": "Apple", "quantity": 3 },
          { "name": "Bread", "quantity": 1 },
          { "name": "Milk 1L", "quantity": 2 }
        ]
      }
    },
    {
      "id": "receipt-002",
      "image": "base64_encoded_image_data",
      "extractedData": {
        "storeName": "EDEKA Plus",
        "date": "2026-02-09",
        "total": "62.50",
        "products": [
          { "name": "Cheese", "quantity": 1 },
          { "name": "Wine", "quantity": 2 },
          { "name": "Chocolate", "quantity": 4 }
        ]
      }
    }
  ]
}
```

### Invalid Receipt Images
```json
{
  "invalidReceipts": [
    {
      "id": "invalid-001",
      "reason": "not_a_receipt",
      "image": "base64_of_random_logo"
    },
    {
      "id": "invalid-002",
      "reason": "blurry_image",
      "image": "base64_of_blurry_receipt"
    },
    {
      "id": "invalid-003",
      "reason": "corrupted_file",
      "fileSize": "1500000",
      "fileName": "receipt.jpg"
    }
  ]
}
```

### Contest Data
```json
{
  "contests": [
    {
      "id": "contest-001",
      "title": "Winter Shopping Sweepstakes",
      "description": "Win a €500 voucher by uploading your winter receipts!",
      "rules": "Purchase must be at participating retailers. Receipt must show store name, date, and total amount.",
      "startDate": "2026-02-01",
      "endDate": "2026-02-28",
      "prizes": "1st: €500, 2nd: €250, 3rd: €100",
      "status": "active"
    }
  ]
}
```

### Participant Test Data
```json
{
  "participants": [
    {
      "id": "participant-001",
      "email": "john@example.com",
      "name": "John Smith",
      "entries": 3,
      "receipts": [
        {
          "id": "receipt-001",
          "contestId": "contest-001",
          "storeName": "REWE Market",
          "date": "2026-02-10",
          "total": "45.99"
        }
      ]
    }
  ]
}
```

### Error Scenarios
```json
{
  "errorScenarios": [
    {
      "type": "network_timeout",
      "message": "Processing took too long. Please try again or contact support."
    },
    {
      "type": "duplicate_submission",
      "message": "You've already submitted an entry for this receipt."
    },
    {
      "type": "non_qualifying_products",
      "message": "This receipt doesn't seem to qualify. We didn't recognize any eligible products."
    },
    {
      "type": "invalid_image",
      "message": "Could not read this image. Please ensure your receipt is clear and legible."
    },
    {
      "type": "file_too_large",
      "message": "Image file too large. Please use a file under 10MB."
    }
  ]
}
```

---

## Test Execution Checklist

- [ ] All user flows complete without errors
- [ ] Validation errors display correctly and prevent submission
- [ ] Empty states show appropriate messaging
- [ ] Component interactions are smooth (no lag, debouncing works)
- [ ] Dark mode is fully functional and readable
- [ ] Accessibility requirements met (keyboard nav, screen readers, contrast)
- [ ] Mobile responsiveness verified (portrait and landscape)
- [ ] Error recovery paths allow user to retry or go back
- [ ] Data persistence works (form data survives navigation)
- [ ] Network errors handled gracefully with retry options
- [ ] Success confirmation is clear and actionable
- [ ] All button labels and error messages are clear and grammatically correct

