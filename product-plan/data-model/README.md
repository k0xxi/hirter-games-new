# Data Model

This folder contains the core data model for Hirter Gewinnspiele.

## Overview

The data model defines the entities and relationships that power the contest platform. Each entity is described in detail with its purpose and connections to other entities.

## Entities

### Contest
A sweepstakes campaign with its own rules, start/end dates, and prize information. Multiple contests can run simultaneously with independent configurations and participant pools.

**Status Lifecycle:**
- `draft` — Being created, not yet visible to customers
- `active` — Currently running, accepting entries
- `ended` — End date reached, but still visible for review
- `archived` — Permanently archived for historical reference only (read-only)

### Participant
A customer who entered a contest by uploading a receipt. Contains email, name, and optional contact details (address, phone). Can enter multiple contests and submit multiple receipts per contest for additional chances to win.

### Receipt
An uploaded receipt image with AI-extracted data including store name, purchase date, total amount, and products purchased (stored as text). Each receipt represents one entry into a specific contest.

### Admin User
Staff member with access to the admin dashboard. Authenticated user with assigned role that determines their permissions.

### Role
Permission level that defines what actions an admin can perform:
- **Super Admin** — Full access to all features
- **Contest Manager** — Can create and manage contests
- **Analytics Viewer** — Read-only access to analytics

### Session
Active login session for an admin user. Tracks login time, device/browser information, and session status for security and audit purposes.

### Winner
A participant selected as winner for a specific contest. Tracks which contest they won, selection date, prize details, and notification status.

## Relationships

- **Admin User** has one **Role**
- **Admin User** can have many **Sessions**
- **Participant** can enter many **Contests** (many-to-many)
- **Participant** can upload many **Receipts**
- **Receipt** belongs to one **Participant** and one **Contest**
- **Winner** belongs to one **Participant** and one **Contest**
- **Contest** has many **Participants**, **Receipts**, and **Winners**
- **Admin User** can manage many **Contests** (based on Role permissions)

## Files

- **types.ts** — TypeScript interface definitions for all entities
- **sample-data.json** — Example data for testing and development

## Implementation Notes

- The data model is intentionally minimal to leave room for implementation details
- You'll need to add database-specific fields (created_at, updated_at, etc.)
- Consider adding indexes for frequently queried fields
- Implement proper foreign key constraints based on the relationships
- Receipt image storage should use a blob/file storage service (e.g., Supabase Storage, S3)
- Consider implementing soft deletes for audit trails
