# Test Instructions: User Management

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, etc.).

## Overview

User Management is a role-based admin user management system with two roles (Super-Admin and Contest-Manager). The system allows Super-Admins to manage all admin accounts, invite new admins, edit roles, deactivate/delete accounts, and manage sessions. All admins can change their own password.

**Key Flows:**
1. View list of all admin users with role and status
2. Invite new admin via email
3. View and edit admin details
4. Change own password
5. Manage sessions and user accounts (deactivate/delete)

## User Flow Tests

### Flow 1: View Admin User List (Happy Path - Super-Admin)

**Prerequisites:**
- Super-Admin user is logged in
- Multiple admin users exist in system (3-5 for testing)
- User is on the User Management section

**Steps and Expected Results:**

1. **User Management Page Loads**
   - Page title displayed: "Admin Users"
   - Subtext: "Manage administrators and their roles"
   - Design uses Hirter colors (primary #253081, secondary #D5B376)
   - Dark mode: all text readable

2. **Admin List Displays**
   - Table or card layout shows all admins with columns:
     - Name: "Super Admin", "Contest Manager", "Analytics Viewer"
     - Email: "admin@hirter.com", "manager@hirter.com", "viewer@hirter.com"
     - Role: Badge showing role (Super-Admin, Contest-Manager)
     - Status: "Active" in green, "Inactive" in gray
     - Actions: Buttons for View/Edit, Deactivate, Delete
   - Minimum 5 admin records visible (pagination if > 10)
   - List is sortable by name or email (optional)

3. **Search/Filter Functionality**
   - Search box available to filter admins by name or email
   - As user types "Contest", list filters to show matching admins
   - Real-time filtering or search button available

4. **Add New Admin Button**
   - "Add New Admin" or "Invite Admin" button is visible and prominent
   - Button color uses secondary color (#D5B376) or primary action style

5. **Review Each Admin Record**
   - Click on admin name or "View" button
   - Admin details page opens (see Flow 3)

**Assertions:**
- All admins display with correct name, email, role, status
- List is organized and readable
- Search/filter functionality works
- Add button is accessible
- Dark mode readable throughout

---

### Flow 2: Invite New Admin (Happy Path)

**Prerequisites:**
- User is logged in as Super-Admin
- On the User Management section
- New admin email: "newmanager@hirter.com"

**Steps and Expected Results:**

1. **Click "Add New Admin" or "Invite Admin" Button**
   - Form appears or navigates to invitation page
   - Form title: "Invite New Administrator"
   - Form has three fields:
     - "Email Address" input field (required)
     - "Full Name" input field (required)
     - "Role" dropdown selector (required)

2. **Enter Email Address**
   - User clicks email field
   - User types: "newmanager@hirter.com"
   - Field validates email format on blur
   - Valid format: no error
   - Duplicate email check (if email already exists): "This email is already in use"

3. **Enter Full Name**
   - User clicks name field
   - User types: "Eva Schmidt"
   - Field accepts any text input
   - Minimum 2 characters required

4. **Select Role**
   - User clicks "Role" dropdown
   - Options display:
     - "Super-Admin" (grants all permissions)
     - "Contest-Manager" (can create/manage contests)
   - User selects: "Contest-Manager"
   - Selected role displays in dropdown

5. **Submit Invitation**
   - User clicks "Send Invitation" button
   - Button shows loading state: "Sending invitation..."
   - Button becomes disabled
   - Form fields become read-only during submission

6. **Invitation Email Sent**
   - Email is generated and sent to "newmanager@hirter.com"
   - Email subject: "You've been invited to Hirter Admin"
   - Email body includes:
     - Greeting: "Hello Eva Schmidt,"
     - Message: "You've been invited to join Hirter Admin as a Contest-Manager"
     - Acceptance link: "https://admin.hirter.com/accept-invitation?token=unique_token"
     - Link expires in 7 days
     - Message: "If you didn't expect this invitation, you can ignore this email."

7. **Success Message**
   - Form disappears or page redirects
   - Success message displays: "Invitation sent successfully to newmanager@hirter.com"
   - Subtext: "Eva Schmidt will receive an email with instructions to set up their account."
   - "Back to Admins" or "Invite Another" button available

8. **New Admin Appears in List (Status Pending)**
   - Navigate back to admin list
   - New admin appears with status: "Pending" (instead of Active)
   - Row shows name "Eva Schmidt", email "newmanager@hirter.com", role "Contest-Manager"
   - "Resend Invitation" option available instead of Edit

**Assertions:**
- Invitation form accepts all required fields
- Email is sent to correct address
- Invitation is unique and time-limited
- New admin appears in list with pending status
- User can retry invitation if needed

---

### Flow 3: View and Edit Admin Details (Happy Path)

**Prerequisites:**
- Super-Admin is logged in
- Admin "Contest Manager" exists in system
- Super-Admin is on admin list

**Steps and Expected Results:**

1. **Click on Admin Name or "View" Button**
   - Admin detail page loads
   - Page title: "Contest Manager" (admin name)
   - Page subtitle: "Manager@hirter.com"

2. **Display Current Admin Details**
   - Fields shown in read-only mode initially:
     - "Full Name": "Contest Manager"
     - "Email": "manager@hirter.com"
     - "Role": "Contest-Manager" (badge style)
     - "Status": "Active" (green status)
     - "Join Date": "January 15, 2026"
     - "Last Login": "2 hours ago"
     - "Sessions": "2 active sessions"

3. **Edit Admin Details**
   - "Edit" button visible and clickable
   - User clicks "Edit" button
   - Fields become editable:
     - "Full Name" field now accepts text input
     - "Email" field becomes editable
     - "Role" dropdown becomes interactive
   - "Edit" button changes to "Cancel" and "Save" buttons appear

4. **Modify Role**
   - User clicks "Role" dropdown
   - Options available:
     - "Super-Admin"
     - "Contest-Manager" (currently selected)
   - User changes role to: "Super-Admin"
   - Dropdown shows new selection

5. **Save Changes**
   - User clicks "Save" button
   - Loading state: "Saving changes..."
   - Button disabled during save

6. **Update Confirmation**
   - Success message: "Admin details updated successfully"
   - Admin role now shows "Super-Admin" in details
   - Edit button reappears, Cancel/Save buttons disappear

7. **Session Management Section**
   - Below admin details, list of active sessions:
     - Session 1: "Chrome on Windows, 2 hours ago"
     - Session 2: "Safari on iOS, 30 minutes ago"
   - "Sign Out All Sessions" button available
   - User can click to terminate all sessions for this admin
   - Confirmation dialog: "Terminate all sessions for Contest Manager? They will need to login again."

8. **Change Password Section (For Own Account Only)**
   - If viewing own account, "Change Password" button available
   - If viewing another admin's account, button not visible

**Assertions:**
- Admin details display correctly
- All fields are editable by Super-Admin
- Role changes are saved and persist
- Sessions are listed and can be terminated
- Changes are reflected immediately in list

---

### Flow 4: Change Own Password

**Prerequisites:**
- Any logged-in admin user
- Admin is viewing their own profile or account settings

**Steps and Expected Results:**

1. **Click "Change Password" Button**
   - Password change form appears
   - Form title: "Change Your Password"
   - Three fields:
     - "Current Password" (required)
     - "New Password" (required)
     - "Confirm New Password" (required)
   - Password requirements visible:
     - "Minimum 8 characters"
     - "Uppercase letter (A-Z)"
     - "Lowercase letter (a-z)"
     - "Number (0-9)"
     - "Special character (!@#$%^&*)"

2. **Enter Current Password**
   - User clicks "Current Password" field
   - User types: current password (masked as dots)
   - Field validates on blur (if incorrect, error shown on submit)

3. **Enter New Password**
   - User clicks "New Password" field
   - User types: "NewPass123!"
   - Password strength indicator updates in real-time:
     - ✓ Minimum 8 characters (green)
     - ✓ Uppercase (green)
     - ✓ Lowercase (green)
     - ✓ Number (green)
     - ✓ Special character (green)

4. **Confirm New Password**
   - User clicks "Confirm New Password" field
   - User types: "NewPass123!" (same as new password)
   - On blur, field validates passwords match

5. **Submit Password Change**
   - User clicks "Save New Password" button
   - Button shows loading state: "Saving..."
   - Button disabled during submission

6. **Backend Validation**
   - Current password is verified against stored hash
   - New password is different from current password
   - New password meets all requirements
   - Passwords match

7. **Password Updated**
   - Success message: "Your password has been changed successfully"
   - User is logged out from all devices (security best practice)
   - Redirect to login page with message: "Your password was changed. Please log in again."

**Assertions:**
- Current password is validated
- New password meets all requirements
- Password confirmation matches
- User is securely logged out after change
- New password grants successful login

---

### Flow 5: Deactivate Admin Account

**Prerequisites:**
- Super-Admin is logged in
- Admin to be deactivated exists in list
- Admin is "Active"

**Steps and Expected Results:**

1. **Select Admin from List**
   - Super-Admin clicks on admin record
   - Admin detail page opens

2. **Click "Deactivate" Button**
   - Button is visible (red/warning color)
   - User clicks button

3. **Confirmation Dialog**
   - Dialog appears: "Deactivate Admin?"
   - Message: "This admin will no longer be able to log in. You can reactivate them later if needed."
   - Admin name shown: "Contest Manager"
   - "Cancel" button available
   - "Deactivate" button (warning color)

4. **Confirm Deactivation**
   - User clicks "Deactivate" button in dialog
   - Dialog shows loading state

5. **Account Deactivated**
   - Success message: "Admin account deactivated"
   - Admin status changes to "Inactive"
   - All active sessions for this admin are terminated
   - Deactivated admin receives email: "Your account has been deactivated"

6. **In Admin List**
   - Admin now shows status "Inactive" (gray badge)
   - "Activate" button replaces "Deactivate" button
   - Admin can no longer log in

7. **Reactivate Account (Optional)**
   - Click "Activate" button
   - Confirmation: "Activate this admin account?"
   - Confirm activation
   - Status changes back to "Active"
   - Admin can log in again

**Assertions:**
- Deactivation requires confirmation
- Account becomes inactive immediately
- All sessions terminated
- Admin cannot log in when inactive
- Account can be reactivated

---

### Flow 6: Delete Admin Account

**Prerequisites:**
- Super-Admin is logged in
- Admin to be deleted exists
- Admin is in "Inactive" status (optional requirement - check spec)

**Steps and Expected Results:**

1. **Select Admin from List**
   - Click on admin record or "..." menu
   - Options menu shows "Delete" option (red color)

2. **Click "Delete" Button**
   - User clicks delete option
   - (Note: Verify if delete only allowed for inactive accounts in spec)

3. **Confirmation Dialog**
   - Title: "Delete Admin Account?"
   - Message: "This action cannot be undone. All sessions and data associated with this admin will be deleted."
   - Admin email shown: "manager@hirter.com"
   - Warning: "This action is permanent."
   - "Cancel" button (secondary)
   - "Delete Account" button (red/danger)

4. **Confirm Deletion**
   - User clicks "Delete Account" button
   - Dialog shows loading state: "Deleting..."

5. **Account Deleted**
   - Success message: "Admin account deleted successfully"
   - Admin removed from list
   - All sessions terminated
   - Deleted admin receives email: "Your account has been deleted. Contact support if this was unintended."

6. **Cannot Recover**
   - Admin no longer appears in list
   - Admin cannot be reactivated
   - If admin tries to log in, "Invalid email or password" error shown

**Assertions:**
- Deletion requires confirmation dialog
- Confirmation shows clear warning about permanence
- Admin is completely removed from system
- Deleted admin cannot log in
- Email notification sent to deleted admin

---

### Flow 7: Session Management - Terminate All Sessions

**Prerequisites:**
- Super-Admin viewing another admin's account
- Admin has 2+ active sessions

**Steps and Expected Results:**

1. **View Sessions List**
   - On admin detail page, sessions section shows:
     - Session 1: "Chrome, Windows 10, 2 hours ago"
     - Session 2: "Safari, iOS 17, 30 minutes ago"

2. **Click "Sign Out All Sessions"**
   - Button visible below session list
   - User clicks button

3. **Confirmation Dialog**
   - Dialog: "Sign out all sessions for Contest Manager?"
   - Message: "All active sessions will be terminated. They will need to log in again on all devices."
   - "Cancel" (secondary)
   - "Sign Out All" (primary)

4. **Confirm Termination**
   - User clicks "Sign Out All"
   - Dialog shows loading state

5. **Sessions Terminated**
   - Success message: "All sessions terminated"
   - Sessions list updates to show "No active sessions"
   - Admin is logged out from all devices
   - Next time admin tries to use app on another device, login required

**Assertions:**
- All sessions terminated simultaneously
- Admin cannot maintain session on any device
- Clear confirmation dialog prevents accidental termination
- Session list updates immediately

---

## Empty State Tests

### Empty State 1: No Admin Users (System Setup)

**Scenario:** Brand new system with no admins created yet

**Expected:**
- Admin list shows: "No admin users found"
- Subtext: "Invite your first administrator to get started"
- "Invite Admin" button is prominent
- No table or list shown (just empty state)

---

### Empty State 2: Search Returns No Results

**Scenario:** Admin searches for non-existent admin

**Steps:**
- User types "xyz" in search box
- No matching admins

**Expected:**
- List clears
- Message: "No admins match your search for 'xyz'"
- Search box remains visible for new search
- "Clear search" button available

---

### Empty State 3: New Admin - Pending Invitation

**Scenario:** Admin invited but has not yet accepted

**Expected:**
- Status badge shows "Pending" instead of "Active"
- "Resend Invitation" button available
- Cannot edit or delete pending admin
- Different action options than active admins

---

### Empty State 4: No Active Sessions

**Scenario:** Admin account exists but currently no active sessions

**Expected:**
- Sessions section shows: "No active sessions"
- "Sign Out All Sessions" button is disabled (grayed out)
- Last login timestamp displayed

---

## Component Interaction Tests

### Admin List Component Tests

**Test: Table/Card Layout**
- List displays all admins (up to 10 per page)
- Each record shows: Name, Email, Role, Status, Actions
- Actions button opens menu or shows buttons directly
- Hover on row (optional): row background changes, actions more visible
- Click anywhere on row (except action): opens detail page

**Test: Sorting (If Applicable)**
- Click "Name" column header: list sorts A-Z by name
- Click again: list sorts Z-A (reverse)
- Click "Email" header: sorts by email
- Current sort indicator visible (arrow up/down)

**Test: Search Functionality**
- Type in search box: list filters in real-time
- Search case-insensitive: "smith" matches "Smith"
- Search by name or email both work
- Clear search icon appears when typing
- Click clear: search box empty, list shows all again

**Test: Pagination (If Applicable)**
- If > 10 admins, pagination controls shown
- "Previous" / "Next" buttons or page numbers
- Current page highlighted
- Page size option (10, 25, 50 per page)

---

### Invite Admin Form Tests

**Test: Email Field Validation**
- Valid emails: "admin@hirter.com", "admin+test@hirter.co.uk"
- Invalid emails show error: "", "admin@", "admin.com"
- Duplicate email error: "This email is already in use"
- Error appears on blur or submit

**Test: Name Field**
- Accepts any text input (2+ characters)
- Minimum length: 1 character (verify spec)
- No maximum limit (or very high, e.g., 255 chars)
- Special characters allowed

**Test: Role Dropdown**
- Dropdown opens with options: "Super-Admin", "Contest-Manager"
- Selected role displays in dropdown
- User can change selection multiple times
- Role is required (cannot submit without selecting)

**Test: Send Invitation Button**
- Disabled until all required fields filled
- Click shows loading state: "Sending invitation..."
- Disabled during submission
- Only one invitation per email (prevents duplicates)

---

### Admin Details Edit Tests

**Test: Edit Mode Toggle**
- "Edit" button switches to "Cancel" + "Save" buttons
- Fields become editable when in edit mode
- Cancel button reverts all changes
- Save button updates and returns to view mode

**Test: Name Field Edit**
- Field accepts text input
- Minimum length: 2 characters
- Updates in page title when saved

**Test: Email Field Edit**
- Field accepts valid email format
- On blur, validates email format
- Duplicate email check (cannot change to existing email)
- Error message for invalid or duplicate

**Test: Role Dropdown Edit**
- Dropdown shows available roles
- Current role is highlighted
- User can select different role
- Role updates when saved

**Test: Session Termination**
- "Sign Out All Sessions" button triggers confirmation
- Confirmation dialog shows admin name
- After confirmation, sessions list clears
- Admin must log in again on all devices

---

### Change Password Form Tests

**Test: Current Password Validation**
- Field accepts input
- On submit, password is verified
- If incorrect: "Current password is incorrect" error
- If correct: form proceeds to new password validation

**Test: New Password Requirements**
- Requirements list updates in real-time as user types
- Each met requirement shows ✓ in green
- Each unmet requirement shows ✗ in red
- "Save New Password" button disabled until all requirements met

**Test: Password Confirmation**
- Passwords must match exactly
- If mismatch on blur: "Passwords do not match" error
- If match: error clears, submit button enabled

**Test: Save Button**
- Disabled until all validation passed
- Shows loading state: "Saving..."
- Disabled during submission
- After success: page redirects to login with message

---

## Edge Cases

### Edge Case 1: Admin with Very Long Name
- Input: "Muhammad Abdulrahman Muhammad" (or 100+ characters)
- Expected: Full name stored and displayed, truncates with ellipsis in table if needed

### Edge Case 2: Email with Plus Addressing
- Input: "admin+test@hirter.com"
- Expected: Email accepted and recognized as valid
- If exact same base email exists ("admin@hirter.com"), should still be allowed (different emails)

### Edge Case 3: Rapid Invitation Resend
- User invites same email twice rapidly (before page refreshes)
- Expected: Second request rejected with "This email is already pending" or similar

### Edge Case 4: Edit Role While Admin Has Session Active
- Admin is editing another admin's role
- Other admin's browser receives notification
- Expected: Other admin's permissions update on next page refresh or via real-time notification

### Edge Case 5: Delete Account That Still Has Active Sessions
- Admin to be deleted has 3 active sessions
- User clicks delete
- Expected: All sessions terminated before deletion completes

### Edge Case 6: Change Password to Identical Current Password
- User enters current password as new password
- Expected: Error message "New password must be different from current password"

### Edge Case 7: Password Reset Email Fails
- Admin clicks "Change Password" and submits
- Email server is down/fails
- Expected: Either retry mechanism or clear error message to user

### Edge Case 8: Admin Deactivated While Still Logged In
- Admin A is logged in
- Super-Admin B deactivates Admin A's account
- Admin A tries to perform action
- Expected: Session becomes invalid, "Please log in again" message shown

### Edge Case 9: Invitation Link Accessed After Expiration
- Admin invitation sent 8 days ago (7 day expiration)
- Admin clicks link in email
- Expected: Error message "Invitation has expired. Request a new one."

### Edge Case 10: Two Super-Admins - Can They Deactivate Each Other?
- Super-Admin A tries to deactivate Super-Admin B
- Expected: If spec allows, deactivation succeeds; if not, error "Cannot modify super-admin role"

### Edge Case 11: Admin with No Role (Should Not Occur)
- Database record exists without role assignment
- Expected: System handles gracefully - shows "No role assigned" or defaults to read-only role

### Edge Case 12: Mass Deactivation
- Super-Admin selects/deactivates 5 admins in quick succession
- Expected: Each deactivation processes, email sent to each, all succeed

### Edge Case 13: Screen Resolution and Responsive Design
- View admin list on mobile phone (narrow screen)
- Expected: Table adapts to mobile layout (cards, stacked view, scrollable)
- Touch targets remain 44px × 44px minimum

### Edge Case 14: Timezone Differences
- Admin A in UTC, Admin B in PST
- Last login shows different time
- Expected: Timestamps displayed correctly in user's local timezone

---

## Accessibility Checks

### Keyboard Navigation
- [ ] Tab order logical: Admin list → Search → Actions menu → Add button
- [ ] Enter key opens detail page when admin row focused
- [ ] Space bar activates buttons (Add, Save, Delete)
- [ ] Escape closes dialogs and menus
- [ ] Tab through form fields in logical order
- [ ] All buttons and links keyboard accessible

### Screen Reader (ARIA)
- [ ] Admin list: `role="table"` with proper headers
- [ ] Each admin row: `role="row"` with cells as `role="cell"`
- [ ] Buttons labeled clearly: "Edit Contest Manager", "Delete Contest Manager"
- [ ] Dialogs: `role="dialog"` with `aria-labelledby` and `aria-describedby`
- [ ] Form fields have associated labels: `<label for="adminEmail">Email Address</label>`
- [ ] Error messages: `aria-live="polite"` and `aria-describedby="error-id"`
- [ ] Status badges: "Active" vs "Inactive" read correctly
- [ ] Action buttons described: "More options for Contest Manager"

### Color Contrast
- [ ] Admin name and email text: 4.5:1 contrast on background
- [ ] Active/Inactive status badges: distinguishable (not color alone)
- [ ] Button text on background: 4.5:1 contrast
- [ ] Error text (red): 4.5:1 on white/light background
- [ ] Dark mode: all text meets 4.5:1 on dark backgrounds
- [ ] Focus indicators: high contrast, visible

### Mobile Accessibility
- [ ] Buttons/touch targets: minimum 44px × 44px
- [ ] Form inputs: minimum 44px × 44px height
- [ ] Adequate spacing between fields (minimum 8px)
- [ ] Font size minimum 16px (prevents auto-zoom)
- [ ] Viewport meta tag set correctly
- [ ] Table adapts to mobile (cards or scrollable)

### Focus Indicators
- [ ] Visible focus ring on all interactive elements
- [ ] Focus ring not obscured by other elements
- [ ] Focus ring high contrast in both light and dark modes
- [ ] Focus ring appears on keyboard navigation
- [ ] Not removed with CSS (:-moz-focus-inner, outline: none)

### Dark Mode
- [ ] All text readable on dark background (4.5:1 contrast)
- [ ] Table/cards have visible borders in dark mode
- [ ] Button colors distinguish active/inactive in dark mode
- [ ] Form input fields visible in dark mode
- [ ] Dialogs readable in dark mode

---

## Sample Test Data

### Admin Users
```json
{
  "admins": [
    {
      "id": "admin-001",
      "name": "Super Admin",
      "email": "admin@hirter.com",
      "role": "Super-Admin",
      "status": "active",
      "joinDate": "2026-01-15T10:00:00Z",
      "lastLogin": "2026-02-11T14:30:00Z",
      "activeSessions": 1
    },
    {
      "id": "admin-002",
      "name": "Contest Manager",
      "email": "manager@hirter.com",
      "role": "Contest-Manager",
      "status": "active",
      "joinDate": "2026-02-01T10:00:00Z",
      "lastLogin": "2026-02-11T12:15:00Z",
      "activeSessions": 2
    },
    {
      "id": "admin-003",
      "name": "Eva Schmidt",
      "email": "eva@hirter.com",
      "role": "Contest-Manager",
      "status": "pending",
      "invitedAt": "2026-02-10T15:00:00Z",
      "inviteExpiresAt": "2026-02-17T15:00:00Z"
    },
    {
      "id": "admin-004",
      "name": "Max Müller",
      "email": "max@hirter.com",
      "role": "Contest-Manager",
      "status": "inactive",
      "joinDate": "2026-01-20T10:00:00Z",
      "deactivatedAt": "2026-02-05T10:00:00Z"
    }
  ]
}
```

### Invitation Email Template
```json
{
  "invitationEmail": {
    "subject": "You've been invited to Hirter Admin",
    "recipientEmail": "newmanager@hirter.com",
    "recipientName": "Eva Schmidt",
    "role": "Contest-Manager",
    "acceptLink": "https://admin.hirter.com/accept-invitation?token=unique_token_123",
    "expiresIn": "7 days",
    "sentAt": "2026-02-10T15:00:00Z"
  }
}
```

### Session Data
```json
{
  "sessions": [
    {
      "id": "session-001",
      "adminId": "admin-002",
      "browser": "Chrome",
      "os": "Windows 10",
      "createdAt": "2026-02-11T12:15:00Z",
      "lastActivity": "2026-02-11T14:45:00Z"
    },
    {
      "id": "session-002",
      "adminId": "admin-002",
      "browser": "Safari",
      "os": "iOS 17",
      "createdAt": "2026-02-11T13:30:00Z",
      "lastActivity": "2026-02-11T14:30:00Z"
    }
  ]
}
```

### Roles Definition
```json
{
  "roles": [
    {
      "id": "role-001",
      "name": "Super-Admin",
      "permissions": [
        "manage_admins",
        "create_contests",
        "edit_contests",
        "view_analytics",
        "manage_users"
      ]
    },
    {
      "id": "role-002",
      "name": "Contest-Manager",
      "permissions": [
        "create_contests",
        "edit_contests",
        "view_contest_participants"
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
      "type": "duplicate_email",
      "message": "This email is already in use"
    },
    {
      "type": "invalid_email",
      "message": "Please enter a valid email address"
    },
    {
      "type": "invalid_password",
      "message": "Current password is incorrect"
    },
    {
      "type": "password_mismatch",
      "message": "Passwords do not match"
    },
    {
      "type": "network_error",
      "message": "Connection lost. Please check your internet and try again."
    },
    {
      "type": "unauthorized",
      "message": "You don't have permission to perform this action"
    },
    {
      "type": "invitation_expired",
      "message": "Invitation has expired. Request a new one."
    }
  ]
}
```

---

## Test Execution Checklist

- [ ] Admin list displays all users with name, email, role, status
- [ ] Search filters list by name or email in real-time
- [ ] Invitations are sent to correct email address
- [ ] Invitation email includes valid token and expiration
- [ ] Invited admin appears in list with "Pending" status
- [ ] Admin details can be viewed and edited
- [ ] Role changes are saved and persist
- [ ] Admin can change own password with validation
- [ ] Password must meet all requirements
- [ ] Deactivation removes login access
- [ ] Reactivation restores login access
- [ ] Deletion is permanent and irreversible
- [ ] All active sessions shown for each admin
- [ ] Sessions can be terminated individually or all at once
- [ ] Dark mode fully functional and readable
- [ ] Accessibility requirements met (keyboard nav, screen readers, contrast)
- [ ] All error messages clear and actionable
- [ ] Confirmation dialogs prevent accidental actions
- [ ] Form validation prevents invalid submissions
- [ ] Form data persists on network errors

