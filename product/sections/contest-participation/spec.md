# Contest Participation Specification

## Overview
A mobile-first receipt upload flow where customers participate in contests by photographing their receipts. The AI processes the image through multiple stages (reading, extracting, verifying), then customers review and correct the extracted store details and product items before final submission.

## User Flows
- Customer views contest details, rules, and receipt requirements
- Customer uploads receipt photo via mobile camera or file picker
- AI processes receipt with visible progress stages (reading receipt → extracting items → verifying products)
- Customer reviews and edits extracted data (store name, date, total, product items)
- Customer submits verified entry and receives confirmation
- System validates for invalid images, non-qualifying products, and duplicate submissions

## UI Requirements
- Step-by-step wizard with progress indicator
- Mobile-first camera upload with instant capture
- Drag-and-drop upload zone for desktop users
- Staged processing feedback showing AI progress
- Editable fields for store details (name, date, total)
- Editable product item list (add, remove, modify items)
- Clear error states for invalid images, non-qualifying products, and duplicates
- Success confirmation screen after submission

## Configuration
- shell: true
- shellType: public
