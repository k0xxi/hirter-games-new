# Contest Participation

## Overview

A mobile-first receipt upload flow where customers participate in contests by photographing their receipts. The AI processes the image through multiple stages (reading, extracting, verifying), then customers review and correct the extracted store details and product items before final submission.

## User Flows

### Flow 1: View Contest and Upload Receipt
1. Customer views contest details, rules, and receipt requirements
2. Customer uploads receipt photo via mobile camera or file picker (drag-and-drop on desktop)
3. AI processes receipt with visible progress stages:
   - Reading receipt
   - Extracting items
   - Verifying products
4. Customer reviews and edits extracted data (store name, date, total, product items)
5. Customer submits verified entry and receives confirmation

### Flow 2: Handle Upload Errors
- Invalid image → Show clear error with retry option
- Non-qualifying products → Explain which products don't qualify
- Duplicate submission → Inform user they already entered this contest

## Design Decisions

- **Step-by-step wizard** with progress indicator for clarity
- **Mobile camera integration** for instant capture (no file browsing required on mobile)
- **Staged processing feedback** showing AI progress to set expectations
- **Editable fields** for all extracted data (customers can correct AI mistakes)
- **Success confirmation** screen to close the loop

## Data Used

**Entities:**
- Contest
- Receipt
- Participant

**From global model:**
- Contest with rules and eligibility requirements
- Receipt with AI-extracted fields
- Participant with contact and consent information

## Visual Reference

See `ContestParticipation.png` for the target UI design showing the multi-step wizard.

## Components Provided

### ContestParticipationWizard
Main wizard component that orchestrates all steps.

**Props:**
- `contest` — Contest object with title, rules, prizes
- `onSubmit` — Callback when user completes participation (provides Receipt and Participant data)
- `onCancel` — Callback when user cancels the flow

### Supporting Components
- **WizardProgress** — Progress indicator showing current step
- **ContestInfoStep** — Contest details and rules
- **UploadStep** — Receipt upload with camera/file picker
- **ProcessingStep** — AI processing with staged progress
- **ReviewStep** — Review and edit extracted data
- **SuccessStep** — Confirmation screen after submission
- **ErrorStep** — Error handling for various failure scenarios

## Callback Props

| Callback | Description |
|----------|-------------|
| `onSubmit` | Called when user completes participation with Receipt and Participant data |
| `onCancel` | Called when user exits the wizard |

## Implementation Notes

- The wizard handles all state internally
- AI OCR processing should be triggered when receipt image is uploaded
- Validation should check for qualifying products based on contest rules
- Duplicate detection should check if participant already entered this specific contest
- Success screen should show confirmation details and next steps
