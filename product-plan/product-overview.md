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
