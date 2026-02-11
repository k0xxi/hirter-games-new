# Application Shell Specification

## Overview
Hirter Gewinnspiele uses two distinct shell patterns to separate public customer-facing features from admin backend functionality.

## Navigation Structure
- **Public Shell** → Top navigation with hamburger menu for Contest Teilnahme, AGB, Impressum, Datenschutz
- **Admin Shell: Contest Management** → Create and manage contests
- **Admin Shell: Analytics & Insights** → Receipt data and winner selection

## Layout Pattern
**Public Shell**: Top navigation with logo and hamburger menu
**Admin Shell**: Sidebar navigation (desktop) / Bottom navigation (mobile)

---

## Public Shell (Customer-Facing)

### Layout Pattern
Top navigation with logo and hamburger menu

### Navigation Structure
- **Contest Teilnahme** → Main contest participation page
- **Teilnahmebedingungen / AGB** → Terms and conditions
- **Link zu hirterbier.at** → External link to Hirter website
- **Impressum** → Legal imprint
- **Datenschutz** → Privacy policy

### Header Components
- **Logo**: Hirter branding, left-aligned
- **Hamburger Menu**: Right-aligned, opens overlay menu

### Responsive Behavior
- **Desktop**: Logo left, hamburger right, full-width header
- **Tablet**: Same as desktop
- **Mobile**: Compact header, hamburger menu expands to full overlay

## Admin Shell (Backend Dashboard)

### Layout Pattern
Sidebar navigation with main content area

### Navigation Structure
- **Contest Management** → Create and manage contests
- **Analytics & Insights** → Receipt data and winner selection

### User Menu
- **Location**: Top right of main content area
- **Contents**: Admin avatar, name, logout button
- **Style**: Dropdown menu on click

### Layout Components
- **Sidebar**: Fixed left side, contains navigation items
- **Content Area**: Main area for section screens
- **User Menu**: Top right corner of content area

### Responsive Behavior
- **Desktop**: Sidebar left (240px), content area right (fluid)
- **Tablet**: Sidebar left (200px), content area right (fluid)
- **Mobile**: Bottom navigation bar with 3 items (Contest, Analytics, Profile)

## Authentication (Login/Auth)

**No Shell** — Standalone page

Login and authentication pages use a **minimal, standalone layout** without navigation chrome:
- Logo centered at top
- Login form (email + password)
- Primary action button ("Anmelden")
- Optional minimal footer with legal links
- **No navigation menu** (user not authenticated yet)
- Focus on single action: logging in

**Post-Login Flow:**
After successful authentication → Redirect to Admin Shell (`/admin/contests`)

## Design Notes
- Both shells use Hirter brand colors (primary: #253081, secondary: #D5B376)
- Apercu Pro typography for all text
- Light and dark mode support throughout
- Mobile-optimized touch targets (44px minimum)
- Smooth transitions between navigation states
- **Authentication pages are shell-less** for maximum focus and clarity
