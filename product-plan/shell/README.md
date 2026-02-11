# Application Shell

## Overview

Hirter Gewinnspiele uses two distinct shell patterns to separate public customer-facing features from admin backend functionality:

- **Public Shell** — Top navigation with hamburger menu for Contest Teilnahme, AGB, Impressum, Datenschutz
- **Admin Shell** — Sidebar navigation (desktop) / Bottom navigation (mobile) for Contest Management and Analytics & Insights

## Components Provided

### AppShell
Main wrapper component that renders the appropriate shell based on section type (`admin` or `public`). Use this in your implementation to wrap all your routes.

### AdminShell
Admin dashboard layout with sidebar navigation (desktop) and bottom navigation (mobile). Includes user menu for logout functionality.

**Props:**
- `children` — Content to display in main area
- `navigationItems` — Array of nav items with label, href, icon, isActive
- `user` — User object with name, email, avatarUrl (optional)
- `onNavigate` — Callback for navigation clicks
- `onLogout` — Callback for logout action

### PublicShell
Customer-facing layout with top header and hamburger menu. Supports hero sections and footer.

**Props:**
- `children` — Content to display in main area
- `logoSrc` — Optional logo image URL
- `navigationGroups` — Array of navigation groups (main, legal, action)
- `hero` — Optional hero section React node
- `footer` — Optional footer React node
- `onNavigate` — Callback for navigation clicks

### Supporting Components
- **Sidebar** — Desktop sidebar for admin shell
- **BottomNav** — Mobile bottom navigation for admin shell
- **UserMenu** — Desktop user menu dropdown for admin shell
- **PublicHeader** — Top header with logo and hamburger menu
- **MobileMenu** — Full-screen mobile menu overlay

## Design Intent

### Public Shell
- **Mobile-first** design with touch-friendly targets
- **Top navigation** with Hirter branding and hamburger menu
- **Full-screen overlay menu** on mobile
- **Clean footer** with links and contact info
- **Hero sections** for visual impact on landing pages

### Admin Shell
- **Desktop-first** with responsive mobile adaptations
- **Sidebar navigation** on desktop (240px-272px wide)
- **Bottom navigation** on mobile with profile access
- **User menu** showing admin name, email, and logout
- **Smooth transitions** between navigation states

### Authentication Pages
- **No shell** — Standalone pages for login and password reset
- Focus on single action without navigation distractions

## Responsive Behavior

**Admin Shell:**
- **Desktop** (≥768px): Sidebar left, user menu top right
- **Mobile** (<768px): Bottom navigation bar with profile button

**Public Shell:**
- **All screens**: Top header with hamburger menu
- **Mobile**: Full-screen overlay menu

## Color and Typography

Both shells use Hirter brand colors:
- **Primary**: #253081 (Hirter Blue)
- **Secondary**: #D5B376 (Hirter Gold)
- **Typography**: Apercu Pro throughout

All UI elements support light and dark mode with `dark:` variants.

## Integration Notes

1. **Import the components:**
   ```typescript
   import { AppShell, AdminShell, PublicShell } from './shell/components'
   ```

2. **Wire up navigation:**
   - Connect `onNavigate` callbacks to your router
   - Set `isActive` based on current route
   - Handle authentication state for user menu

3. **Provide user data:**
   - Admin shell expects user object with name, email
   - Avatar URL is optional (defaults to initials)

4. **Handle logout:**
   - Connect `onLogout` to your authentication system
   - Clear session and redirect to login

5. **Customize navigation:**
   - Admin shell: Define navigation items with icons
   - Public shell: Define navigation groups (main, legal, action)

## Visual Reference

See screenshots (if available) for the final shell design in both light and dark modes.
