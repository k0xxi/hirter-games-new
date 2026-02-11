# Test Instructions: Authentication

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, etc.).

## Overview

Authentication provides a secure admin login system with email/password authentication and password recovery via email. All authentication views are standalone and displayed before admin login. The system handles user credential validation, session creation, and password reset workflows.

**Key Flows:**
1. Admin login with email and password
2. Password reset request via email
3. Password reset confirmation and new password setting
4. Session management and security

## User Flow Tests

### Flow 1: Successful Admin Login (Happy Path)

**Prerequisites:**
- User is on the login page
- Admin account exists with email "admin@hirter.com" and password "SecurePass123!"
- User is not currently logged in

**Steps and Expected Results:**

1. **View Login Page**
   - Page title displayed: "Admin Login"
   - Two form fields visible:
     - Email input field with placeholder: "Enter your email address"
     - Password input field with placeholder: "Enter your password"
   - "Login" button is visible and enabled
   - "Forgot password?" link is visible below password field
   - Design uses Hirter colors (#253081 primary, #D5B376 secondary)
   - Dark mode: all text readable, buttons visible

2. **Enter Valid Email Address**
   - User clicks email field
   - Field gains focus (border highlighted)
   - User types: "admin@hirter.com"
   - No validation error appears (valid email format)
   - Email value persists in field

3. **Enter Valid Password**
   - User clicks password field
   - Field gains focus
   - User types: "SecurePass123!"
   - Password is masked as dots/asterisks
   - Text is not readable to others viewing screen
   - Field accepts special characters

4. **Click "Login" Button**
   - Button click is registered
   - Loading state appears: button text changes to "Logging in..." or spinner displays
   - Button becomes disabled to prevent double submission
   - Form fields become read-only during submission

5. **Backend Validates Credentials**
   - Email and password combination is verified against admin database
   - No error occurs
   - Admin user record is found with role "Super-Admin" or "Contest-Manager"

6. **Session Created and User Redirected**
   - Admin session is created and stored securely
   - Browser redirects to admin dashboard (e.g., `/admin/dashboard`)
   - Login page is no longer accessible without logout
   - Session cookie/token is set with httpOnly flag (security best practice)

7. **Admin Dashboard Displays**
   - Admin name or email visible in header
   - Navigation menu shows available sections based on admin role
   - Timestamp of login displayed (optional)

**Assertions:**
- Valid credentials result in successful login
- Session is created and persists across page refreshes
- User is redirected to dashboard
- Login page is not accessible after login
- Dark mode readable throughout

---

### Flow 2: Login Failure - Invalid Email

**Prerequisites:**
- User is on login page
- No admin account exists with entered email

**Steps and Expected Results:**

1. **Enter Non-Existent Email**
   - User types: "nonexistent@example.com"
   - User enters any password

2. **Click "Login" Button**
   - Button shows loading state

3. **Validation Fails**
   - Error message appears: "Invalid email or password."
   - Error text is displayed in red/warning color
   - Button re-enables for another attempt
   - Form fields remain filled with user input

**Assertions:**
- Invalid email is caught and user is informed
- Generic error message used (doesn't reveal if email exists in database)
- User can retry without page reload
- Form state is preserved

---

### Flow 3: Login Failure - Invalid Password

**Prerequisites:**
- Admin account exists with email "admin@hirter.com"
- User enters correct email but wrong password

**Steps and Expected Results:**

1. **Enter Valid Email and Wrong Password**
   - Email: "admin@hirter.com"
   - Password: "WrongPassword123"

2. **Click "Login" Button**
   - Loading state displays

3. **Password Validation Fails**
   - Error message: "Invalid email or password."
   - Same generic error message as Flow 2 (security best practice)
   - No indication that email exists but password wrong
   - Button re-enables
   - Fields remain populated

4. **Retry with Correct Password**
   - User clears password field and enters correct password
   - User clicks "Login" button
   - Login succeeds (verify with Flow 1)

**Assertions:**
- Wrong password is rejected
- Generic error message doesn't leak email existence
- User can retry immediately
- Correct password then works

---

### Flow 4: Login Failure - Multiple Incorrect Attempts

**Prerequisites:**
- User attempts to login multiple times with wrong password

**Steps and Expected Results:**

1. **First Failed Attempt**
   - User enters wrong password and clicks "Login"
   - Error message appears: "Invalid email or password."

2. **Second Failed Attempt**
   - User tries again with different wrong password
   - Error message appears again

3. **Third Failed Attempt**
   - After 3 or more failed attempts (system-dependent), one of these occurs:
     - Option A: Account temporarily locked message: "Too many failed login attempts. Please try again in 15 minutes."
     - Option B: CAPTCHA challenge appears to verify human
   - Login button becomes disabled temporarily

4. **Account Recovery**
   - User waits 15 minutes (or completes CAPTCHA)
   - Login becomes available again
   - User can retry with correct credentials

**Assertions:**
- Brute force protection is in place
- Clear message informs user of lockout and when account unlocks
- After timeout, login succeeds with correct credentials

---

### Flow 5: Successful Password Reset Request (Forgot Password)

**Prerequisites:**
- Admin account exists with email "admin@hirter.com"
- User can receive emails at that address

**Steps and Expected Results:**

1. **User on Login Page**
   - User views login form
   - "Forgot password?" link is visible and clickable

2. **Click "Forgot password?" Link**
   - Login form disappears (or page navigates)
   - Password reset request form appears
   - Form title: "Reset Your Password"
   - Single input field: "Email Address"
   - Input placeholder: "Enter your email address"
   - "Send Reset Link" button visible and enabled
   - "Back to Login" link visible

3. **Enter Email Address**
   - User clicks email field
   - User types: "admin@hirter.com"
   - Field validates email format on blur
   - If invalid format: error message "Please enter a valid email address"
   - If valid format: no error

4. **Click "Send Reset Link" Button**
   - Button shows loading state: "Sending..."
   - Button becomes disabled
   - User cannot click again during submission

5. **Email Delivery**
   - Backend searches for admin account with email "admin@hirter.com"
   - Account is found
   - Reset email is generated and sent to inbox
   - Email includes:
     - Subject: "Reset Your Hirter Admin Password"
     - Greeting: "Hello Admin Name,"
     - Body: "You requested to reset your password. Click the link below to set a new password."
     - Reset link with unique token: "https://admin.hirter.com/reset-password?token=abc123xyz"
     - Expiration notice: "This link expires in 1 hour."
     - Warning: "If you didn't request this, ignore this email."

6. **Confirmation Message Displays**
   - Page displays success message: "Check your email for password reset instructions."
   - Subtext: "We've sent a reset link to admin@hirter.com. Click the link to set a new password."
   - "Back to Login" button appears
   - User can click back to login page

**Assertions:**
- Reset request email is sent to correct address
- Email contains valid reset token and link
- User receives confirmation message
- Reset link is unique and time-limited

---

### Flow 6: Password Reset via Email Link (Failure - Invalid Token)

**Prerequisites:**
- User receives reset email but token is invalid or expired

**Steps and Expected Results:**

1. **User Clicks Reset Link from Email**
   - User clicks link: "https://admin.hirter.com/reset-password?token=expired_or_invalid"
   - Page attempts to load reset form

2. **Token Validation Fails**
   - Error message displays: "Reset link is invalid or has expired."
   - Subtext: "Please request a new password reset link."
   - "Request New Reset Link" button appears
   - No password form fields are displayed

3. **User Requests New Link**
   - User clicks "Request New Reset Link"
   - Redirects back to password reset request form (Flow 5)
   - User can enter email again and receive new link

**Assertions:**
- Invalid tokens are rejected
- User is informed clearly
- User has path to request new reset link

---

### Flow 7: Successful Password Reset - New Password Set

**Prerequisites:**
- User received valid reset email with valid token
- Token has not expired
- User clicks valid reset link from email

**Steps and Expected Results:**

1. **Reset Password Form Loads**
   - Page title: "Set Your New Password"
   - Email field displays pre-filled (read-only): "admin@hirter.com"
   - Two password input fields:
     - "New Password" field with placeholder "Enter new password"
     - "Confirm Password" field with placeholder "Re-enter password"
   - Password requirements displayed below fields:
     - "Minimum 8 characters"
     - "Must include uppercase letter (A-Z)"
     - "Must include lowercase letter (a-z)"
     - "Must include number (0-9)"
     - "Must include special character (!@#$%^&*)"
   - "Reset Password" button is visible

2. **Enter New Password**
   - User clicks "New Password" field
   - User types: "NewSecure123!Pass"
   - As user types, password requirements update:
     - ✓ Minimum 8 characters (checked)
     - ✓ Uppercase (checked)
     - ✓ Lowercase (checked)
     - ✓ Number (checked)
     - ✓ Special character (checked)
   - All requirements turn green as they're satisfied

3. **Enter Password Confirmation**
   - User clicks "Confirm Password" field
   - User types same password: "NewSecure123!Pass"
   - Field validates on blur that both passwords match

4. **Password Mismatch Validation (If passwords don't match)**
   - If user enters different password in confirm field
   - Error message appears: "Passwords do not match."
   - "Reset Password" button remains disabled

5. **Click "Reset Password" Button**
   - Button shows loading state: "Resetting..."
   - Form fields become read-only
   - Button is disabled

6. **Backend Updates Password**
   - Old password is invalidated
   - New password is securely hashed and stored
   - Reset token is invalidated (can only be used once)
   - All existing sessions for this admin are terminated (forces re-login on all devices)

7. **Success Confirmation**
   - Success message displays: "Your password has been reset successfully!"
   - Subtext: "You can now login with your new password."
   - "Go to Login" button appears
   - User is redirected to login page after 3 seconds (or on button click)

8. **User Logs In with New Password**
   - User enters email: "admin@hirter.com"
   - User enters new password: "NewSecure123!Pass"
   - Login succeeds (verify with Flow 1)
   - User accesses admin dashboard

**Assertions:**
- New password meets all requirements
- Confirmation password validation works
- Old password no longer works
- New password grants successful login
- Reset token becomes invalid after use

---

### Flow 8: Password Reset Failure - Password Doesn't Meet Requirements

**Prerequisites:**
- User is on reset password form with valid token
- User enters password that doesn't meet requirements

**Steps and Expected Results:**

1. **Enter Weak Password**
   - User types in "New Password" field: "pass123"
   - Requirements shown in real-time:
     - ✗ Minimum 8 characters (not met - shows red)
     - ✓ Lowercase (met)
     - ✗ Uppercase (not met - shows red)
     - ✓ Number (met)
     - ✗ Special character (not met - shows red)

2. **Attempt to Submit**
   - "Reset Password" button remains disabled (grayed out)
   - Button is not clickable
   - Tooltip on button: "Password does not meet all requirements"

3. **User Corrects Password**
   - User clears field and enters: "NewSecure123!Pass"
   - All requirements turn green
   - "Reset Password" button becomes enabled

4. **Submit Valid Password**
   - User clicks "Reset Password"
   - Password is reset successfully (as in Flow 7)

**Assertions:**
- Weak passwords are not accepted
- Requirements are displayed clearly
- Button is disabled until all requirements met
- User can correct and resubmit

---

### Flow 9: Multiple Email Addresses - Correct Account Selected

**Prerequisites:**
- System has multiple admin accounts
- User enters email of one specific admin

**Steps and Expected Results:**

1. **Login Attempt with Account 1**
   - User enters: "manager1@hirter.com" and correct password
   - Login succeeds for manager1 account

2. **Logout and Switch Account**
   - Manager 1 logs out
   - Login page displays

3. **Login Attempt with Account 2**
   - User enters: "manager2@hirter.com" and correct password
   - Login succeeds for manager2 account
   - Dashboard shows manager2's name and role

**Assertions:**
- Multiple admin accounts are supported
- System correctly distinguishes between accounts
- Each account logs in independently
- No cross-account data leakage

---

## Empty State Tests

### Empty State 1: First-Time Login Page Visit

**Scenario:** User first arrives at login page

**Expected:**
- Clean, empty form with no previous data
- Email field is empty and focused (or first focusable element)
- Password field is empty
- "Login" button is enabled and clickable
- No error messages displayed
- "Forgot password?" link is visible but grayed out initially (or enabled)

---

### Empty State 2: Password Reset - Email Not Found

**Scenario:** Admin enters email that doesn't exist in system

**Steps:**
- User enters: "notanadmin@example.com"
- User clicks "Send Reset Link"

**Expected:**
- Success message still displays (for security): "Check your email for password reset instructions."
- No indication that email doesn't exist (prevents account enumeration)
- Email is not sent (backend silently ignores)
- User cannot tell if email was found or not

---

### Empty State 3: After Successful Login

**Scenario:** User logs in and views dashboard

**Expected:**
- Login page is completely replaced by dashboard
- All login form elements removed
- Session is active and visible (optional: logout button in header)

---

## Component Interaction Tests

### Login Form Component Tests

**Test: Email Field Validation**
- Valid emails pass: "admin@hirter.com", "admin+test@hirter.co.uk"
- Invalid emails show error: "", "admin@", "admin.com", "admin @hirter.com"
- Error message appears on blur if invalid
- Error disappears when corrected
- Field accepts copy-paste input

**Test: Password Field Security**
- Password input type is "password" (not text)
- Characters display as dots/asterisks, not readable
- Password cannot be copied from field (security consideration)
- Field accepts all ASCII characters and emojis
- Special characters preserved: !@#$%^&*()-_=+[]{}|;:'",.<>?/\

**Test: Login Button States**
- Initially enabled and clickable
- After click, shows loading state (spinner or text change)
- Disabled during submission
- Re-enables after response (success or error)
- Clicking while disabled has no effect

**Test: Remember Me / Auto-fill (If Applicable)**
- Browser auto-fill suggestions appear in email field
- User can accept browser suggestion
- Form accepts and processes auto-filled data

---

### Password Reset Request Form Tests

**Test: Email Field in Reset Form**
- Field is clearable and editable
- On blur, email format validation runs
- Invalid format shows: "Please enter a valid email address"
- Valid format shows no error
- Field is focused automatically when form loads

**Test: Send Reset Link Button**
- Disabled until email field has valid format
- Click shows loading state: "Sending..."
- After success or error, button re-enables
- Success shows email confirmation message
- Error shows: "Unable to send reset link. Please try again or contact support."

---

### Password Reset Confirmation Form Tests

**Test: Password Visibility Toggle**
- Icon next to password fields (eye icon or similar)
- Click icon to show/hide password
- Text shows as plain text or masked based on toggle state
- Both new and confirm password can toggle independently

**Test: Password Strength Indicator**
- Requirements listed clearly and update in real-time
- Each met requirement shows checkmark in green
- Each unmet requirement shows X in red
- Password strength meter shows: weak/fair/good/strong (color-coded)

**Test: Confirm Password Matching**
- If passwords match, no error message
- If passwords don't match on blur, error: "Passwords do not match."
- Error persists until passwords match
- Button disabled while error exists

**Test: Reset Button State**
- Disabled until all requirements met and passwords match
- Shows loading state: "Resetting..." on click
- Disabled during submission
- Re-enables only if error occurs (success redirects)

---

## Edge Cases

### Edge Case 1: Email with International Characters
- Input: "admin@münchën.de" (with umlauts)
- Expected: Email validation passes if system supports IDN (Internationalized Domain Names)
- Or validation fails with clear message if not supported

### Edge Case 2: Very Long Email Address
- Input: "a.very.long.email.address.with.many.dots@subdomain.example.co.uk" (100+ chars)
- Expected: Field accepts full input, email validation works correctly

### Edge Case 3: Password with Emojis or Special Unicode
- Input: "Pass@123😀" or "Pass@123中文"
- Expected: Either accepted if supported, or clear error message

### Edge Case 4: Copy-Paste Password with Spaces
- Input: User copies password with leading/trailing spaces: "  MyPassword123!  "
- Expected: Spaces preserved or trimmed consistently (specify behavior)

### Edge Case 5: Reset Link Clicked Multiple Times
- Scenario: User receives reset email, clicks link, sees form, navigates back, clicks link again
- Expected: Same reset form loads (link still valid), user can reset password normally

### Edge Case 6: Reset Link Expires During Form Completion
- Scenario: User receives reset email, waits 59 minutes, clicks link, starts filling form at 1 hour mark, clicks submit at 61 minutes
- Expected: Token validation fails with message: "Reset link has expired. Please request a new one."

### Edge Case 7: Network Error During Login
- Scenario: User enters credentials and clicks Login, network connection drops mid-request
- Expected: Error message: "Connection lost. Please check your internet and try again."
- Form data persists, user can retry

### Edge Case 8: Session Timeout While Filling Reset Form
- Scenario: User clicks reset link, form loads, waits 1 hour, then clicks submit
- Expected: Either link expires (as Case 6) or new reset link required with message

### Edge Case 9: Browser Auto-fill Fills Old Password
- Scenario: Browser offers to fill login with old password after reset
- Expected: User must manually clear and enter new password
- Or system prevents auto-fill from being accepted (developer setting)

### Edge Case 10: User Clicks "Back to Login" During Password Reset
- Scenario: User on reset password form, clicks "Back to Login" button
- Expected: Form data is cleared, login page displays, token becomes invalid if left unused

### Edge Case 11: Case Sensitivity of Email
- Input: "Admin@Hirter.com" vs "admin@hirter.com"
- Expected: Both recognized as same account (email is case-insensitive)
- Database query uses case-insensitive matching

### Edge Case 12: Password with Only Numbers and Special Chars (Missing Letters)
- Input: "12345678!@#" (no letters)
- Expected: Requirements validation shows missing uppercase and lowercase
- Button remains disabled

### Edge Case 13: Rapid Form Submissions
- Scenario: User clicks "Send Reset Link" button multiple times rapidly
- Expected: First request processes, subsequent clicks ignored
- Only one reset email sent to user

### Edge Case 14: URL Manipulation of Reset Token
- Scenario: User tries to modify token in URL: `?token=valid_token_123abc`
- Expected: Invalid token shows error: "Reset link is invalid or has expired."
- Attacker cannot bypass token validation

---

## Accessibility Checks

### Keyboard Navigation
- [ ] Tab order is logical: Email field → Password field → Login button → Forgot password link
- [ ] Enter key submits login form (when form valid)
- [ ] Shift+Tab navigates backwards through fields
- [ ] All buttons accessible via Tab and activatable via Enter or Space
- [ ] All links navigable via Tab and activatable via Enter
- [ ] Focus trap: none (users can Tab away from form if needed)

### Screen Reader (ARIA)
- [ ] Form labeled: `<form aria-label="Admin Login">`
- [ ] Email field: `<input type="email" aria-label="Email address" required />`
- [ ] Password field: `<input type="password" aria-label="Password" required />`
- [ ] Error messages: `aria-live="polite"` and `aria-describedby="error-id"`
- [ ] Buttons have descriptive text: not just "Submit" but "Login with email and password"
- [ ] Links have descriptive text: "Forgot your password?" not just "Click here"
- [ ] Password requirements list: `role="list"` with requirement items as `role="listitem"`

### Color Contrast
- [ ] Button text on background: 4.5:1 contrast ratio
- [ ] Error text (red) on white background: 4.5:1 contrast
- [ ] Success text (green) on white background: 4.5:1 contrast
- [ ] Dark mode: all text meets 4.5:1 on dark backgrounds
- [ ] Focus indicators: high contrast outline or underline

### Mobile Accessibility
- [ ] Buttons/touch targets minimum 44px × 44px
- [ ] Form inputs minimum 44px × 44px
- [ ] Adequate spacing between form fields (minimum 8px)
- [ ] Font size minimum 16px (prevents auto-zoom on iOS)
- [ ] Input type correct: `type="email"` for email (triggers email keyboard on mobile)
- [ ] Viewport set: `<meta name="viewport" content="width=device-width, initial-scale=1">`

### Focus Indicators
- [ ] Visible focus ring on email field
- [ ] Visible focus ring on password field
- [ ] Visible focus ring on all buttons
- [ ] Focus ring not obscured by other elements
- [ ] Focus ring contrast adequate in both light and dark modes
- [ ] Focus ring appears on keyboard navigation (not removed)

### Dark Mode
- [ ] All text readable on dark background (4.5:1 contrast)
- [ ] Input fields have visible borders in dark mode
- [ ] Error messages visible in dark mode
- [ ] Focus indicators visible in dark mode
- [ ] All UI elements distinguishable in dark mode

---

## Sample Test Data

### Valid Admin Accounts
```json
{
  "admins": [
    {
      "id": "admin-001",
      "email": "admin@hirter.com",
      "name": "Super Admin",
      "password_hash": "hashed_password_123",
      "role": "Super-Admin",
      "status": "active"
    },
    {
      "id": "admin-002",
      "email": "manager@hirter.com",
      "name": "Contest Manager",
      "password_hash": "hashed_password_456",
      "role": "Contest-Manager",
      "status": "active"
    },
    {
      "id": "admin-003",
      "email": "viewer@hirter.com",
      "name": "Analytics Viewer",
      "password_hash": "hashed_password_789",
      "role": "Analytics-Viewer",
      "status": "active"
    }
  ]
}
```

### Valid Passwords
```json
{
  "validPasswords": [
    "SecurePass123!",
    "MyPassword@456",
    "Test_Pass_789!",
    "Strong#2026Pass",
    "AdminAccess$999"
  ]
}
```

### Invalid Passwords
```json
{
  "invalidPasswords": [
    "pass",
    "password",
    "12345678",
    "!@#$%^&*",
    "NoNumbers!Abc",
    "NoSpecial123abc",
    "NoLowerCase123!",
    "NoUpperCase123!"
  ]
}
```

### Valid Email Formats
```json
{
  "validEmails": [
    "admin@hirter.com",
    "admin+test@hirter.com",
    "admin.name@hirter.co.uk",
    "admin_123@subdomain.hirter.com",
    "a@hirter.com"
  ]
}
```

### Invalid Email Formats
```json
{
  "invalidEmails": [
    "",
    "admin",
    "admin@",
    "@hirter.com",
    "admin @hirter.com",
    "admin@hirter",
    "admin@@hirter.com"
  ]
}
```

### Reset Token Data
```json
{
  "resetTokens": [
    {
      "token": "abc123xyz789",
      "admin_id": "admin-001",
      "email": "admin@hirter.com",
      "created_at": "2026-02-11T14:00:00Z",
      "expires_at": "2026-02-11T15:00:00Z",
      "used": false
    }
  ]
}
```

### Error Scenarios
```json
{
  "errorScenarios": [
    {
      "type": "invalid_credentials",
      "message": "Invalid email or password."
    },
    {
      "type": "account_locked",
      "message": "Too many failed login attempts. Please try again in 15 minutes."
    },
    {
      "type": "account_inactive",
      "message": "This account is inactive. Contact your administrator."
    },
    {
      "type": "network_error",
      "message": "Connection lost. Please check your internet and try again."
    },
    {
      "type": "invalid_token",
      "message": "Reset link is invalid or has expired."
    },
    {
      "type": "token_expired",
      "message": "Reset link has expired. Please request a new one."
    },
    {
      "type": "password_mismatch",
      "message": "Passwords do not match."
    },
    {
      "type": "weak_password",
      "message": "Password does not meet all requirements."
    }
  ]
}
```

---

## Test Execution Checklist

- [ ] Valid credentials result in successful login
- [ ] Invalid credentials show generic error message
- [ ] Brute force protection triggers after failed attempts
- [ ] Session is created and persists across page refreshes
- [ ] Password reset email is sent with valid token
- [ ] Password reset link is time-limited
- [ ] Invalid tokens are rejected clearly
- [ ] New password meets all requirements
- [ ] Password confirmation validation works
- [ ] Old password no longer works after reset
- [ ] All existing sessions terminated after password reset
- [ ] Dark mode is fully readable
- [ ] Accessibility requirements met (keyboard nav, screen readers, contrast)
- [ ] All error messages are clear and actionable
- [ ] Form data persists on network errors
- [ ] Token manipulation prevents unauthorized access
- [ ] Email addresses are case-insensitive for matching
- [ ] All form fields have proper labels and ARIA attributes

