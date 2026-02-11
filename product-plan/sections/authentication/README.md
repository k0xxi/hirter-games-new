# Authentication

## Overview

Authentifizierungssystem für Admin-Benutzer mit E-Mail/Passwort-Login und Passwort-Wiederherstellung per E-Mail. Alle Views sind standalone und werden vor der Anmeldung angezeigt (keine Shell).

## User Flows

### Flow 1: Login
1. Admin gibt E-Mail und Passwort ein
2. Admin klickt "Anmelden"
3. System validiert Credentials
4. Bei Erfolg: Redirect zu Admin Dashboard
5. Bei Fehler: Fehlermeldung anzeigen

### Flow 2: Password Reset Request
1. Admin klickt "Passwort vergessen" auf Login-Seite
2. Admin gibt E-Mail-Adresse ein
3. Admin klickt "Reset-Link senden"
4. System sendet E-Mail mit Reset-Link
5. Bestätigungsnachricht anzeigen

### Flow 3: Password Reset Confirm
1. Admin klickt auf Link in E-Mail
2. Admin sieht Formular zum Setzen des neuen Passworts
3. Admin gibt neues Passwort ein (zweimal zur Bestätigung)
4. Admin klickt "Passwort setzen"
5. Bei Erfolg: Redirect zu Login mit Erfolgsnachricht

## Design Decisions

- **Standalone pages** without navigation chrome (users aren't authenticated yet)
- **Logo centered at top** for brand consistency
- **Minimal footer** with only essential legal links
- **Clear error messages** for failed login attempts
- **Email-based password reset** (no security questions)

## Data Used

**Entities:**
- Admin User (email, password hash)
- Session (created after successful login)

**From global model:**
- Admin User with email and role
- Session for authentication state

## Visual Reference

See screenshots for the three authentication views:
- `Login.png` — Main login form
- `PasswordResetRequest.png` — Email entry for password reset
- `PasswordResetConfirm.png` — New password form

## Components Provided

### Login
Email/password login form with "Forgot password" link.

**Props:**
- `onLogin` — Callback with (email, password) when user submits
- `error` — Error message to display (optional)
- `onForgotPassword` — Callback when user clicks "Passwort vergessen"

### PasswordResetRequest
Email entry form for initiating password reset.

**Props:**
- `onRequestReset` — Callback with (email) when user submits
- `success` — Boolean to show success message (optional)
- `error` — Error message to display (optional)

### PasswordResetConfirm
New password form for completing password reset.

**Props:**
- `onConfirmReset` — Callback with (newPassword) when user submits
- `error` — Error message to display (optional)
- `token` — Reset token from email link

## Callback Props

| Callback | Description |
|----------|-------------|
| `onLogin` | Called with (email, password) when user attempts login |
| `onForgotPassword` | Called when user clicks "Forgot password" link |
| `onRequestReset` | Called with (email) to send password reset email |
| `onConfirmReset` | Called with (newPassword) to complete password reset |

## Implementation Notes

- Password reset tokens should expire (e.g., 1 hour)
- Password validation should enforce minimum length and complexity
- Rate limiting should prevent brute force attacks
- Sessions should be secure (httpOnly cookies, CSRF protection)
- Consider adding 2FA for enhanced security
