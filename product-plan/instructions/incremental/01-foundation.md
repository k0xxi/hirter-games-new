# Milestone 1: Foundation

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** None

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Set up the foundational elements: design tokens, data model types, routing structure, and application shell (both Public and Admin shells).

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

**Colors:**
- Primary: #253081 (Hirter Blue) — For buttons, links, key accents
- Secondary: #D5B376 (Hirter Gold) — For highlights, badges
- Neutral: stone (Tailwind stone palette) — For backgrounds, text, borders

**Typography:**
- Heading: Apercu Pro
- Body: Apercu Pro
- Mono: Apercu Mono Pro

**Note:** Apercu Pro is a commercial font. See `design-system/fonts.md` for licensing info or free alternatives (Inter, DM Sans, Work Sans).

**Setup:**
- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind v4 configuration
- See `product-plan/design-system/fonts.md` for font setup

**Tailwind CSS v4:**
- Use Tailwind CSS v4 (not v3)
- No `tailwind.config.js` file needed
- Configure via `@theme` in your CSS

### 2. Data Model Types

Create TypeScript interfaces for your core entities:

**Entities:**
- Contest — Sweepstakes campaigns with rules, dates, prizes
- Participant — Customers who enter contests
- Receipt — Uploaded receipt images with AI-extracted data
- Admin User — Staff with dashboard access
- Role — Permission levels (super_admin, contest_manager, analytics_viewer)
- Session — Active admin login sessions
- Winner — Selected winners for contests

**Setup:**
- See `product-plan/data-model/types.ts` for interface definitions
- See `product-plan/data-model/README.md` for entity relationships
- See `product-plan/data-model/sample-data.json` for example data

**Implementation Notes:**
- Add database-specific fields (id, created_at, updated_at)
- Implement proper foreign key constraints
- Consider using Supabase for backend + storage
- Receipt images should use blob/file storage
- Implement soft deletes for audit trails

### 3. Routing Structure

Create placeholder routes for each section:

**Public Routes:**
- `/` or `/contest` — Contest participation (public-facing)
- `/terms` — Teilnahmebedingungen / AGB
- `/privacy` — Datenschutz
- `/imprint` — Impressum

**Authentication Routes (no shell):**
- `/login` — Admin login
- `/reset-password` — Password reset request
- `/reset-password/confirm` — Password reset confirmation

**Admin Routes (authenticated):**
- `/admin/contests` — Contest management
- `/admin/contests/:id` — Contest details
- `/admin/contests/new` — Create new contest
- `/admin/analytics` — Analytics & Insights dashboard
- `/admin/users` — User management (Super-Admin only)
- `/admin/users/invite` — Invite new admin
- `/admin/users/:id` — Admin user details
- `/admin/profile/password` — Change own password

### 4. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

**Public Shell Components:**
- `PublicShell.tsx` — Top navigation layout for customer-facing pages
- `PublicHeader.tsx` — Header with logo and hamburger menu
- `MobileMenu.tsx` — Full-screen overlay menu

**Admin Shell Components:**
- `AdminShell.tsx` — Sidebar/bottom navigation layout for admin pages
- `Sidebar.tsx` — Desktop sidebar navigation
- `BottomNav.tsx` — Mobile bottom navigation bar
- `UserMenu.tsx` — User dropdown menu

**AppShell.tsx:**
Main wrapper that renders the appropriate shell based on section type

**Wire Up Navigation:**

Public Shell navigation items:
- Contest Teilnahme → `/contest`
- Hirter Bier Website → `https://hirterbier.at` (external)
- Teilnahmebedingungen / AGB → `/terms`
- Impressum → `/imprint`
- Datenschutz → `/privacy`
- Admin Login → `/login`

Admin Shell navigation items:
- Contest Management → `/admin/contests`
- Analytics & Insights → `/admin/analytics`

**User Menu:**

The admin user menu expects:
- User name
- User email
- Avatar URL (optional — defaults to initials)
- Logout callback

**Responsive Behavior:**

Public Shell:
- All screens: Top header with hamburger menu
- Mobile: Full-screen overlay menu

Admin Shell:
- Desktop (≥768px): Sidebar left (272px), user menu top right
- Mobile (<768px): Bottom navigation bar with profile button

### 5. Authentication Setup

While not a full section, set up basic authentication infrastructure:

- Session management (secure httpOnly cookies)
- CSRF protection
- Role-based access control (Super-Admin, Contest-Manager, Analytics-Viewer)
- Protected route wrapper for admin routes

This will be fully implemented in Milestone 3 (Authentication section).

## Files to Reference

- `product-plan/design-system/` — Design tokens and configuration
- `product-plan/data-model/` — Type definitions and relationships
- `product-plan/shell/README.md` — Shell design intent and usage
- `product-plan/shell/components/` — Shell React components

## Done When

- [ ] Design tokens are configured (colors, fonts)
- [ ] Data model types are defined in your codebase
- [ ] Routes exist for all sections (can be placeholder pages)
- [ ] Public Shell renders with navigation
- [ ] Admin Shell renders with navigation and user menu
- [ ] Navigation links to correct routes
- [ ] Responsive behavior works on mobile and desktop
- [ ] Light and dark mode work correctly
- [ ] Authentication infrastructure is in place (session handling, protected routes)

## Next Steps

After completing the foundation, proceed to implement the sections in this order:

1. **Milestone 2: Contest Participation** — Customer-facing receipt upload flow
2. **Milestone 3: Authentication** — Admin login and password reset
3. **Milestone 4: User Management** — Admin user management
4. **Milestone 5: Contest Management** — Contest creation and management
5. **Milestone 6: Analytics Insights** — Analytics dashboard and winner selection

Each milestone builds on the foundation and can be implemented incrementally.
