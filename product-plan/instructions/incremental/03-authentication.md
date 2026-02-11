# Milestone 3: Authentication

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

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
