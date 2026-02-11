# Data Model

## Entities

### Contest
A sweepstakes campaign with its own rules, start/end dates, and prize information. Multiple contests can run simultaneously with independent configurations and participant pools. Each contest has a status that determines its lifecycle state: `draft` (being created), `active` (currently running), `ended` (end date reached, but still visible), `archived` (permanently archived for historical reference only).

### Participant
A customer who entered a contest by uploading a receipt. Contains email, name, and optional contact details (address, phone). Can enter multiple contests and submit multiple receipts per contest for additional chances to win.

### Receipt
An uploaded receipt image with AI-extracted data including store name, purchase date, total amount, and products purchased (stored as text). Each receipt represents one entry into a specific contest.

### Admin User
Staff member with access to the admin dashboard. Authenticated user with assigned role that determines their permissions.

### Role
Permission level that defines what actions an admin can perform (Super Admin, Contest Manager, Analytics Viewer). Controls access to different sections of the admin dashboard.

### Session
Active login session for an admin user. Tracks login time, device/browser information, and session status for security and audit purposes.

### Winner
A participant selected as winner for a specific contest. Tracks which contest they won, selection date, prize details, and notification status.

## Relationships

- Admin User has one Role
- Admin User can have many Sessions
- Participant can enter many Contests (many-to-many)
- Participant can upload many Receipts
- Receipt belongs to one Participant and one Contest
- Winner belongs to one Participant and one Contest
- Contest has many Participants, Receipts, and Winners
- Admin User can manage many Contests (based on Role permissions)
