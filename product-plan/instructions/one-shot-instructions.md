# Hirter Gewinnspiele — Product Overview

## Summary

A contest platform for Hirter beer that removes registration friction by letting customers participate simply by uploading their beer purchase receipts. AI-powered OCR instantly verifies receipts and extracts valuable purchase data, while a multi-contest admin system enables running multiple independent sweepstakes with rich insights into customer behavior.

## Planned Sections

1. **Contest Participation** — Customer receipt upload flow with AI OCR processing and verification
2. **Authentication** — Login and password reset for admin users
3. **User Management** — Admin user management, invitations, and role-based access control
4. **Contest Management** — Admin dashboard for creating and managing multiple independent contests
5. **Analytics Insights** — Receipt data analysis, customer behavior tracking, and winner selection

## Data Model

**Core Entities:**
- Contest — A sweepstakes campaign with its own rules, start/end dates, and prize information
- Participant — A customer who entered a contest by uploading a receipt
- Receipt — An uploaded receipt image with AI-extracted data
- Admin User — Staff member with access to the admin dashboard
- Role — Permission level that defines what actions an admin can perform
- Session — Active login session for an admin user
- Winner — A participant selected as winner for a specific contest

**Key Relationships:**
- Admin User has one Role
- Admin User can have many Sessions
- Participant can enter many Contests (many-to-many)
- Participant can upload many Receipts
- Receipt belongs to one Participant and one Contest
- Winner belongs to one Participant and one Contest
- Contest has many Participants, Receipts, and Winners

## Design System

**Colors:**
- Primary: #253081 (Hirter Blue)
- Secondary: #D5B376 (Hirter Gold)
- Neutral: stone (Tailwind stone palette)

**Typography:**
- Heading: Apercu Pro
- Body: Apercu Pro
- Mono: Apercu Mono Pro

**Note:** Apercu Pro is a commercial font. In your implementation, you may need to substitute with a similar font or purchase a license.

## Implementation Sequence

Build this product in milestones:

1. **Foundation** — Set up design tokens, data model types, and application shell (includes both Public Shell and Admin Shell)
2. **Contest Participation** — Customer-facing receipt upload and verification flow
3. **Authentication** — Admin login and password reset system
4. **User Management** — Admin user management with role-based access
5. **Contest Management** — Contest creation and management dashboard
6. **Analytics Insights** — Analytics dashboard with receipt data and winner selection

Each milestone has a dedicated instruction document in `instructions/incremental/`.


---


# Milestone 1: Foundation

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** None

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Set up the foundational elements: design tokens, data model types, routing structure, and application shell (both Public and Admin shells).

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

**Colors:**
- Primary: #253081 (Hirter Blue) — For buttons, links, key accents
- Secondary: #D5B376 (Hirter Gold) — For highlights, badges
- Neutral: stone (Tailwind stone palette) — For backgrounds, text, borders

**Typography:**
- Heading: Apercu Pro
- Body: Apercu Pro
- Mono: Apercu Mono Pro

**Note:** Apercu Pro is a commercial font. See `design-system/fonts.md` for licensing info or free alternatives (Inter, DM Sans, Work Sans).

**Setup:**
- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind v4 configuration
- See `product-plan/design-system/fonts.md` for font setup

**Tailwind CSS v4:**
- Use Tailwind CSS v4 (not v3)
- No `tailwind.config.js` file needed
- Configure via `@theme` in your CSS

### 2. Data Model Types

Create TypeScript interfaces for your core entities:

**Entities:**
- Contest — Sweepstakes campaigns with rules, dates, prizes
- Participant — Customers who enter contests
- Receipt — Uploaded receipt images with AI-extracted data
- Admin User — Staff with dashboard access
- Role — Permission levels (super_admin, contest_manager, analytics_viewer)
- Session — Active admin login sessions
- Winner — Selected winners for contests

**Setup:**
- See `product-plan/data-model/types.ts` for interface definitions
- See `product-plan/data-model/README.md` for entity relationships
- See `product-plan/data-model/sample-data.json` for example data

**Implementation Notes:**
- Add database-specific fields (id, created_at, updated_at)
- Implement proper foreign key constraints
- Consider using Supabase for backend + storage
- Receipt images should use blob/file storage
- Implement soft deletes for audit trails

### 3. Routing Structure

Create placeholder routes for each section:

**Public Routes:**
- `/` or `/contest` — Contest participation (public-facing)
- `/terms` — Teilnahmebedingungen / AGB
- `/privacy` — Datenschutz
- `/imprint` — Impressum

**Authentication Routes (no shell):**
- `/login` — Admin login
- `/reset-password` — Password reset request
- `/reset-password/confirm` — Password reset confirmation

**Admin Routes (authenticated):**
- `/admin/contests` — Contest management
- `/admin/contests/:id` — Contest details
- `/admin/contests/new` — Create new contest
- `/admin/analytics` — Analytics & Insights dashboard
- `/admin/users` — User management (Super-Admin only)
- `/admin/users/invite` — Invite new admin
- `/admin/users/:id` — Admin user details
- `/admin/profile/password` — Change own password

### 4. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

**Public Shell Components:**
- `PublicShell.tsx` — Top navigation layout for customer-facing pages
- `PublicHeader.tsx` — Header with logo and hamburger menu
- `MobileMenu.tsx` — Full-screen overlay menu

**Admin Shell Components:**
- `AdminShell.tsx` — Sidebar/bottom navigation layout for admin pages
- `Sidebar.tsx` — Desktop sidebar navigation
- `BottomNav.tsx` — Mobile bottom navigation bar
- `UserMenu.tsx` — User dropdown menu

**AppShell.tsx:**
Main wrapper that renders the appropriate shell based on section type

**Wire Up Navigation:**

Public Shell navigation items:
- Contest Teilnahme → `/contest`
- Hirter Bier Website → `https://hirterbier.at` (external)
- Teilnahmebedingungen / AGB → `/terms`
- Impressum → `/imprint`
- Datenschutz → `/privacy`
- Admin Login → `/login`

Admin Shell navigation items:
- Contest Management → `/admin/contests`
- Analytics & Insights → `/admin/analytics`

**User Menu:**

The admin user menu expects:
- User name
- User email
- Avatar URL (optional — defaults to initials)
- Logout callback

**Responsive Behavior:**

Public Shell:
- All screens: Top header with hamburger menu
- Mobile: Full-screen overlay menu

Admin Shell:
- Desktop (≥768px): Sidebar left (272px), user menu top right
- Mobile (<768px): Bottom navigation bar with profile button

### 5. Authentication Setup

While not a full section, set up basic authentication infrastructure:

- Session management (secure httpOnly cookies)
- CSRF protection
- Role-based access control (Super-Admin, Contest-Manager, Analytics-Viewer)
- Protected route wrapper for admin routes

This will be fully implemented in Milestone 3 (Authentication section).

## Files to Reference

- `product-plan/design-system/` — Design tokens and configuration
- `product-plan/data-model/` — Type definitions and relationships
- `product-plan/shell/README.md` — Shell design intent and usage
- `product-plan/shell/components/` — Shell React components

## Done When

- [ ] Design tokens are configured (colors, fonts)
- [ ] Data model types are defined in your codebase
- [ ] Routes exist for all sections (can be placeholder pages)
- [ ] Public Shell renders with navigation
- [ ] Admin Shell renders with navigation and user menu
- [ ] Navigation links to correct routes
- [ ] Responsive behavior works on mobile and desktop
- [ ] Light and dark mode work correctly
- [ ] Authentication infrastructure is in place (session handling, protected routes)

## Next Steps

After completing the foundation, proceed to implement the sections in this order:

1. **Milestone 2: Contest Participation** — Customer-facing receipt upload flow
2. **Milestone 3: Authentication** — Admin login and password reset
3. **Milestone 4: User Management** — Admin user management
4. **Milestone 5: Contest Management** — Contest creation and management
5. **Milestone 6: Analytics Insights** — Analytics dashboard and winner selection

Each milestone builds on the foundation and can be implemented incrementally.


---



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


---



## Goal

Implement the Authentication feature — admin login and password reset system with email-based password recovery.

## Overview

This section provides secure authentication for admin users accessing the dashboard. Includes email/password login and a password reset flow via email. All views are standalone (no shell) for focused user experience.

**Key Functionality:**
- Admin login with email and password
- "Forgot password" link to request password reset
- Email-based password reset with temporary token
- New password confirmation form
- Secure session management

## Recommended Approach: Test-Driven Development

See `product-plan/sections/authentication/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/authentication/components/`:

- `Login.tsx` — Email/password login form
- `PasswordResetRequest.tsx` — Email entry for password reset
- `PasswordResetConfirm.tsx` — New password form

### Data Layer

**AdminUser:**
```typescript
interface AdminUser {
  id: string
  email: string
  role: 'super_admin' | 'contest_manager' | 'analytics_viewer'
}
```

You'll need to:
- Create API endpoint for login (POST `/api/auth/login`)
- Create API endpoint for password reset request (POST `/api/auth/reset-password`)
- Create API endpoint for password reset confirm (POST `/api/auth/reset-password/confirm`)
- Create session management (secure httpOnly cookies)
- Implement password hashing (bcrypt, argon2)
- Generate and validate password reset tokens

### Callbacks

- `onLogin(email, password)` — Authenticate user, create session
- `onForgotPassword()` — Navigate to password reset request
- `onRequestReset(email)` — Send password reset email
- `onConfirmReset(token, newPassword)` — Update password, invalidate token

### Empty States

Not applicable for authentication flows.

## Files to Reference

- `product-plan/sections/authentication/README.md` — Feature overview
- `product-plan/sections/authentication/tests.md` — Test-writing instructions
- `product-plan/sections/authentication/components/` — React components
- `product-plan/sections/authentication/types.ts` — TypeScript interfaces
- `product-plan/sections/authentication/sample-data.json` — Test data
- Screenshots: `Login.png`, `PasswordResetRequest.png`, `PasswordResetConfirm.png`

## Expected User Flows

### Flow 1: Successful Login

1. Admin navigates to `/login`
2. Admin sees login form with email and password fields
3. Admin enters valid credentials
4. Admin clicks "Anmelden" button
5. System validates credentials
6. **Outcome:** Session created, redirect to `/admin/contests`

### Flow 2: Failed Login

1. Admin enters invalid credentials
2. Admin clicks "Anmelden"
3. **Outcome:** Error message "Ungültige E-Mail oder Passwort" appears, form stays populated

### Flow 3: Password Reset Request

1. Admin clicks "Passwort vergessen" on login page
2. Admin navigates to `/reset-password`
3. Admin enters email address
4. Admin clicks "Reset-Link senden"
5. **Outcome:** Email sent with reset link, success message shown

### Flow 4: Password Reset Confirm

1. Admin clicks link in reset email
2. Admin navigates to `/reset-password/confirm?token=...`
3. Admin sees new password form
4. Admin enters new password (twice for confirmation)
5. Admin clicks "Passwort setzen"
6. **Outcome:** Password updated, redirect to login with success message

### Flow 5: Expired Reset Token

1. Admin clicks old/expired reset link
2. **Outcome:** Error message "Reset-Link ist abgelaufen. Bitte einen neuen Link anfordern."

## Done When

- [ ] Tests written for all authentication flows
- [ ] All tests pass
- [ ] Login authenticates users correctly
- [ ] Failed logins show error messages
- [ ] Sessions are created securely (httpOnly cookies)
- [ ] Password reset emails are sent
- [ ] Reset tokens expire (e.g., 1 hour)
- [ ] New passwords are hashed securely
- [ ] CSRF protection is implemented
- [ ] Rate limiting prevents brute force attacks
- [ ] All forms validate input properly
- [ ] Responsive on mobile and desktop

## Technical Notes

**Security:**
- Use bcrypt or argon2 for password hashing
- Session tokens in httpOnly cookies
- CSRF tokens for form submissions
- Rate limiting on login attempts (e.g., 5 failed attempts = 15 min lockout)
- Password complexity requirements (min 8 chars, mix of upper/lower/numbers)

**Password Reset:**
- Generate secure random tokens (crypto.randomBytes)
- Store token hash in database
- Set expiration (e.g., 1 hour)
- Invalidate token after use

**Email:**
- Send password reset email with link containing token
- Email template should be branded (Hirter colors, logo)
- Include security note about not sharing the link


---



## Goal

Implement the User Management feature — role-based admin user management with email invitations and password self-service.

## Overview

This section enables Super-Admins to manage other admin users, invite new admins with specific roles, and allows all admins to change their own passwords. Implements role-based access control with three roles: Super-Admin, Contest-Manager, and Analytics-Viewer.

**Key Functionality:**
- View list of all admin users with roles and status
- Invite new admins via email with role assignment
- View and edit admin user details
- Deactivate or delete admin users
- Change own password (all admins)
- View active sessions for security auditing

## Recommended Approach: Test-Driven Development

See `product-plan/sections/user-management/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/user-management/components/`:

- `AdminList.tsx` — List of all admin users
- `AdminInvite.tsx` — Invite new admin form
- `AdminDetail.tsx` — Admin detail/edit view
- `PasswordChange.tsx` — Password change form

### Data Layer

**AdminUser:**
```typescript
interface AdminUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'super_admin' | 'contest_manager' | 'analytics_viewer'
  isActive: boolean
  invitedAt?: string
  lastLoginAt?: string
}
```

You'll need to:
- Create API endpoint for admin list (GET `/api/admin/users`)
- Create API endpoint for inviting admin (POST `/api/admin/users/invite`)
- Create API endpoint for admin details (GET `/api/admin/users/:id`)
- Create API endpoint for updating admin (PATCH `/api/admin/users/:id`)
- Create API endpoint for deleting admin (DELETE `/api/admin/users/:id`)
- Create API endpoint for password change (POST `/api/admin/profile/password`)
- Implement role-based permissions

### Callbacks

- `onViewDetails(adminId)` — Navigate to admin detail view
- `onInviteAdmin()` — Open invite form
- `onInvite(email, name, role)` — Send invitation email
- `onSave(adminId, updates)` — Save admin changes
- `onDeactivate(adminId)` — Deactivate admin
- `onDelete(adminId)` — Delete admin (with confirmation)
- `onChangePassword(currentPassword, newPassword)` — Update password

### Empty States

**No Admins Yet:**
- First-time setup should show "Noch keine Admins" with "Admin einladen" button

## Files to Reference

- `product-plan/sections/user-management/README.md` — Feature overview
- `product-plan/sections/user-management/tests.md` — Test-writing instructions
- `product-plan/sections/user-management/components/` — React components
- `product-plan/sections/user-management/types.ts` — TypeScript interfaces
- `product-plan/sections/user-management/sample-data.json` — Test data
- Screenshots: `AdminList.png`, `AdminInvite.png`, `AdminDetail.png`, `PasswordChange.png`

## Expected User Flows

### Flow 1: View Admin List

1. Super-Admin navigates to `/admin/users`
2. Admin sees list of all users with name, email, role, status
3. Admin can search and filter the list
4. **Outcome:** Full admin list displayed

### Flow 2: Invite New Admin

1. Super-Admin clicks "Admin einladen" button
2. Invite form opens with fields for email, name, role
3. Super-Admin fills in details and selects role
4. Super-Admin clicks "Einladung senden"
5. **Outcome:** Invitation email sent, new admin appears in list with "pending" status

### Flow 3: Edit Admin Details

1. Super-Admin clicks on admin in list
2. Detail view opens with editable fields
3. Super-Admin changes name or role
4. Super-Admin clicks "Speichern"
5. **Outcome:** Admin details updated in database

### Flow 4: Deactivate Admin

1. Super-Admin views admin details
2. Super-Admin clicks "Deaktivieren"
3. Confirmation dialog appears
4. Super-Admin confirms
5. **Outcome:** Admin marked as inactive, cannot log in

### Flow 5: Change Own Password

1. Any admin navigates to `/admin/profile/password`
2. Admin enters current password
3. Admin enters new password (twice for confirmation)
4. Admin clicks "Passwort ändern"
5. **Outcome:** Password updated, success message shown

### Flow 6: Permission Denied

1. Contest-Manager tries to access `/admin/users`
2. **Outcome:** Error message "Keine Berechtigung" or redirect

## Done When

- [ ] Tests written for all user management flows
- [ ] All tests pass
- [ ] Admin list displays all users correctly
- [ ] Empty state shows when no admins exist
- [ ] Invite sends email and creates pending admin
- [ ] Only Super-Admins can access user management
- [ ] Admin details are editable with proper validation
- [ ] Role changes update permissions correctly
- [ ] Deactivated admins cannot log in
- [ ] Delete requires confirmation and works correctly
- [ ] Password change validates current password
- [ ] New passwords meet complexity requirements
- [ ] All admins can change their own password
- [ ] Session list shows active logins
- [ ] Responsive on mobile and desktop

## Technical Notes

**Permissions:**
- Only Super-Admins can access user management
- Contest-Managers and Analytics-Viewers get 403 Forbidden
- Implement middleware to check role before allowing actions

**Invitation Flow:**
- Generate temporary invitation token
- Send email with invitation link containing token
- Link should redirect to password setup page
- Invitation tokens expire (e.g., 7 days)

**Deletion:**
- Admins cannot delete themselves
- Confirmation dialog required
- Consider soft delete for audit trail
- Cascade delete or handle related sessions

**Session Management:**
- Show list of active sessions for admin
- Allow admin to revoke specific sessions
- Track device/browser info and login time


---



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


---



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
