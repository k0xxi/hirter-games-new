# User Management

## Overview

Rollenbasiertes Admin-Benutzerverwaltungssystem mit zwei Rollen (Super-Admin und Contest-Manager). Umfasst Benutzerverwaltung, Einladungssystem per E-Mail und Passwort-Änderung.

## User Flows

### Flow 1: View Admin List
1. Super-Admin sieht Liste aller Admin-Benutzer
2. Liste zeigt Name, E-Mail, Rolle, Status (aktiv/inaktiv)
3. Super-Admin kann filtern und suchen

### Flow 2: Invite New Admin
1. Super-Admin klickt "Admin einladen"
2. Formular mit E-Mail, Name, Rollenauswahl öffnet sich
3. Super-Admin wählt Rolle (Super-Admin oder Contest-Manager)
4. System sendet Einladungs-E-Mail mit temporärem Login-Link
5. Bestätigungsnachricht wird angezeigt

### Flow 3: View/Edit Admin Details
1. Super-Admin klickt auf Admin in der Liste
2. Detailansicht mit allen Informationen öffnet sich
3. Super-Admin kann Name, E-Mail, Rolle bearbeiten
4. Super-Admin kann Admin deaktivieren oder löschen
5. Änderungen werden gespeichert

### Flow 4: Change Own Password
1. Eingeloggter Admin öffnet Passwort-Änderung
2. Admin gibt aktuelles Passwort ein
3. Admin gibt neues Passwort ein (zweimal zur Bestätigung)
4. Admin klickt "Passwort ändern"
5. Bei Erfolg: Bestätigungsnachricht

## Design Decisions

- **Role-based access** — Only Super-Admins can invite/edit admins
- **Email invitation system** — No manual password setup
- **Session management** — View active sessions for security
- **Self-service password change** — All admins can change their own password

## Data Used

**Entities:**
- Admin User
- Role
- Session

**From global model:**
- Admin User with email, name, role
- Role defining permissions (super_admin, contest_manager, analytics_viewer)
- Session for active login tracking

## Visual Reference

See screenshots:
- `AdminList.png` — List of all admin users
- `AdminInvite.png` — Invite new admin form
- `AdminDetail.png` — Admin detail/edit view
- `PasswordChange.png` — Password change form

## Components Provided

### AdminList
Table/cards view of all admin users with filtering and actions.

**Props:**
- `admins` — Array of admin user objects
- `currentUserRole` — Role of logged-in user (for permissions)
- `onViewDetails` — Callback with (adminId) when user clicks on admin
- `onInviteAdmin` — Callback when user clicks "Invite Admin"

### AdminInvite
Form for inviting new admin users.

**Props:**
- `onInvite` — Callback with (email, name, role) when user submits
- `onCancel` — Callback when user cancels
- `error` — Error message to display (optional)

### AdminDetail
Detail view with editable fields for admin user.

**Props:**
- `admin` — Admin user object with all details
- `currentUserRole` — Role of logged-in user (for permissions)
- `sessions` — Array of active sessions for this admin
- `onSave` — Callback with (adminId, updates) when user saves changes
- `onDeactivate` — Callback with (adminId) to deactivate admin
- `onDelete` — Callback with (adminId) to delete admin
- `onBack` — Callback to return to list

### PasswordChange
Form for changing own password.

**Props:**
- `onChangePassword` — Callback with (currentPassword, newPassword) when user submits
- `error` — Error message to display (optional)
- `success` — Success message to display (optional)

## Callback Props

| Callback | Description |
|----------|-------------|
| `onViewDetails` | Called with (adminId) when user clicks on admin in list |
| `onInviteAdmin` | Called when user clicks "Invite Admin" button |
| `onInvite` | Called with (email, name, role) to send invitation |
| `onSave` | Called with (adminId, updates) to save admin changes |
| `onDeactivate` | Called with (adminId) to deactivate admin |
| `onDelete` | Called with (adminId) to delete admin (with confirmation) |
| `onChangePassword` | Called with (currentPassword, newPassword) to change password |

## Implementation Notes

- Only Super-Admins can invite, edit, or delete other admins
- Admins cannot delete themselves
- Deactivated admins cannot log in but data is preserved
- Session management helps track security and active logins
- Password change requires current password for security
