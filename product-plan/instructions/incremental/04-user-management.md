# Milestone 4: User Management

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) and Milestone 3 (Authentication) complete

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
