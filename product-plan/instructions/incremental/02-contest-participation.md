# Milestone 2: Contest Participation

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Contest Participation feature — a mobile-first receipt upload flow where customers participate in contests by photographing their receipts with AI OCR processing and verification.

## Overview

This section enables customers to enter contests by simply uploading a receipt photo. The AI processes the image through multiple stages (reading, extracting, verifying), then customers review and correct the extracted data before final submission. No account creation required — frictionless participation.

**Key Functionality:**
- View contest details, rules, and prize information
- Upload receipt photo via mobile camera or desktop file picker
- AI processes receipt with visible progress feedback
- Review and edit AI-extracted data (store, date, total, products)
- Submit entry with name, email, and optional contact details
- Receive confirmation after successful submission

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/contest-participation/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

The test instructions are framework-agnostic — adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, RSpec, Minitest, PHPUnit, etc.).

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/contest-participation/components/`:

- `ContestParticipationWizard.tsx` — Main wizard component
- `WizardProgress.tsx` — Progress indicator
- `ContestInfoStep.tsx` — Contest details and rules
- `UploadStep.tsx` — Receipt upload with camera/file picker
- `ProcessingStep.tsx` — AI processing with staged progress
- `ReviewStep.tsx` — Review and edit extracted data
- `SuccessStep.tsx` — Confirmation screen
- `ErrorStep.tsx` — Error handling

### Data Layer

The components expect these data shapes:

**Contest:**
```typescript
interface Contest {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  rules: string
  prizes: Prize[]
  termsAndConditions: string
}
```

**Receipt (submission):**
```typescript
interface ReceiptSubmission {
  contestId: string
  imageFile: File
  storeName: string
  purchaseDate: string
  totalAmount: number
  products: string
}
```

**Participant (submission):**
```typescript
interface ParticipantSubmission {
  email: string
  firstName: string
  lastName: string
  address?: string
  phone?: string
  consent: boolean
}
```

You'll need to:
- Create API endpoint for contest details (GET `/api/contests/:id`)
- Create API endpoint for receipt upload and OCR processing (POST `/api/receipts/upload`)
- Create API endpoint for participation submission (POST `/api/contests/:id/participate`)
- Integrate with OCR service for receipt processing
- Connect real data to the components

### Callbacks

Wire up these user actions:

- `onSubmit(receipt, participant)` — Save receipt and participant data, send confirmation email
- `onCancel()` — Handle user exiting the wizard
- OCR processing triggered on image upload
- Validation for qualifying products and duplicate detection

### Empty States

Not applicable for this section — wizard always starts with contest info.

## Files to Reference

- `product-plan/sections/contest-participation/README.md` — Feature overview
- `product-plan/sections/contest-participation/tests.md` — Test-writing instructions (use for TDD)
- `product-plan/sections/contest-participation/components/` — React components
- `product-plan/sections/contest-participation/types.ts` — TypeScript interfaces
- `product-plan/sections/contest-participation/sample-data.json` — Test data
- `product-plan/sections/contest-participation/ContestParticipation.png` — Visual reference

## Expected User Flows

### Flow 1: Successful Contest Entry

1. User lands on `/contest` (or contest-specific URL)
2. User sees contest title, description, rules, and prizes
3. User clicks "Teilnehmen" (participate) button
4. **Upload Step:** User uploads receipt photo (camera on mobile, file picker on desktop)
5. **Processing Step:** AI shows staged progress: "Reading receipt" → "Extracting items" → "Verifying products"
6. **Review Step:** User sees extracted data (store name, date, total, products) in editable fields
7. User corrects any mistakes in extracted data
8. User enters personal details (email, name, optional address/phone)
9. User checks consent checkbox
10. User clicks "Teilnahme bestätigen" (confirm participation)
11. **Success Step:** User sees confirmation message with contest details
12. **Outcome:** Receipt and participant data saved, confirmation email sent

### Flow 2: Invalid Receipt Image

1. User uploads blurry or non-receipt image
2. Processing fails
3. **Error Step:** User sees message "Ungültiges Bild. Bitte ein klares Foto Ihres Kassenbons hochladen."
4. User clicks "Erneut versuchen" (try again)
5. **Outcome:** User returns to upload step to retry

### Flow 3: Non-Qualifying Products

1. User uploads receipt successfully
2. AI extracts data but finds no qualifying Hirter products
3. **Error Step:** User sees message "Keine qualifizierenden Produkte gefunden. Bitte einen Kassenbon mit Hirter Bier-Produkten hochladen."
4. **Outcome:** User can retry with different receipt

### Flow 4: Duplicate Submission

1. User who already entered this contest tries to participate again with same email
2. System detects duplicate
3. **Error Step:** User sees message "Sie haben bereits an diesem Gewinnspiel teilgenommen."
4. **Outcome:** User cannot submit duplicate entry

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Contest details display correctly from real data
- [ ] Receipt upload works (camera on mobile, file picker on desktop)
- [ ] OCR processing extracts receipt data accurately
- [ ] Staged processing feedback shows progress to user
- [ ] Extracted data is editable in review step
- [ ] Participant submission saves to database
- [ ] Duplicate detection prevents re-entry
- [ ] Confirmation email sent after successful submission
- [ ] Error states handle invalid images and non-qualifying products
- [ ] Wizard is responsive on mobile and desktop
- [ ] All UI matches the visual design

## Technical Notes

**OCR Integration:**
- Consider using Google Cloud Vision API, Tesseract, or specialized receipt OCR services
- Extract: store name, purchase date, total amount, product list
- Validate extracted data before showing to user

**Qualifying Products:**
- Define which products qualify (e.g., "Hirter" in product name)
- Check extracted products against qualification rules
- Reject receipts with no qualifying products

**Duplicate Detection:**
- Check email + contestId combination
- Consider checking receipt image hash for duplicate uploads
- Provide clear messaging if user already entered

**Storage:**
- Store receipt images in blob storage (Supabase Storage, S3, etc.)
- Keep reference to image URL in receipt record
- Consider image compression for storage efficiency

**Email Confirmation:**
- Send confirmation email with contest details
- Include link to terms and conditions
- Consider including receipt for user's records
