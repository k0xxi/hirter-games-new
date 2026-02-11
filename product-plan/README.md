# Hirter Gewinnspiele — Design Handoff

This folder contains everything needed to implement Hirter Gewinnspiele, a contest platform for Hirter beer.

## What's Included

**Ready-to-Use Prompts:**
- `prompts/one-shot-prompt.md` — Prompt template for full implementation in one session
- `prompts/section-prompt.md` — Prompt template for section-by-section implementation

**Instructions:**
- `product-overview.md` — Product summary (provide with every implementation session)
- `instructions/one-shot-instructions.md` — All milestones combined for full implementation
- `instructions/incremental/` — Milestone-by-milestone instructions (foundation, then 5 sections)

**Design Assets:**
- `design-system/` — Colors, fonts, design tokens
- `data-model/` — Core entities and TypeScript types
- `shell/` — Application shell components (Public and Admin shells)
- `sections/` — All 5 section component packages with test instructions

## How to Use This

### Option A: Incremental (Recommended)

Build your app milestone by milestone for better control:

1. Copy the `product-plan/` folder to your codebase
2. Start with Foundation (`instructions/incremental/01-foundation.md`) — includes design tokens, data model, routing, and application shell
3. For each section:
   - Open `prompts/section-prompt.md`
   - Fill in the section variables at the top (SECTION_NAME, SECTION_ID, NN)
   - Copy/paste into your coding agent
   - Answer questions and implement
4. Review and test after each milestone

**Sections in order:**
- **02-contest-participation.md** — Customer receipt upload flow
- **03-authentication.md** — Admin login and password reset
- **04-user-management.md** — Admin user management
- **05-contest-management.md** — Contest creation and management
- **06-analytics-insights.md** — Analytics and winner selection

### Option B: One-Shot

Build the entire app in one session:

1. Copy the `product-plan/` folder to your codebase
2. Open `prompts/one-shot-prompt.md`
3. Add any additional notes to the prompt
4. Copy/paste the prompt into your coding agent
5. Answer the agent's clarifying questions
6. Let the agent plan and implement everything

## Test-Driven Development

Each section includes a `tests.md` file with test-writing instructions. For best results:

1. Read `sections/[section-id]/tests.md` before implementing
2. Write failing tests based on the instructions
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

The test instructions are **framework-agnostic** — they describe WHAT to test, not HOW. Adapt to your testing setup (Jest, Vitest, Playwright, Cypress, RSpec, Minitest, PHPUnit, etc.).

## Product Overview

**Hirter Gewinnspiele** is a contest platform that removes registration friction by letting customers participate simply by uploading their beer purchase receipts. AI-powered OCR instantly verifies receipts and extracts valuable purchase data, while a multi-contest admin system enables running multiple independent sweepstakes with rich insights into customer behavior.

**Key Features:**
- Frictionless participation (no account creation)
- AI OCR receipt processing with progress visualization
- Customer data verification before submission
- Multi-contest management with independent configs
- Admin dashboard with role-based access (RLS)
- Winner selection and contest analytics
- Supabase backend integration
- Fully responsive design (desktop, tablet, mobile)

**Sections:**
1. **Contest Participation** — Customer receipt upload with AI OCR
2. **Authentication** — Admin login and password reset
3. **User Management** — Admin user management with roles
4. **Contest Management** — Create and manage multiple contests
5. **Analytics Insights** — Receipt analytics and winner selection

## Design System

**Colors:**
- Primary: #253081 (Hirter Blue)
- Secondary: #D5B376 (Hirter Gold)
- Neutral: stone (Tailwind stone palette)

**Typography:**
- Heading: Apercu Pro
- Body: Apercu Pro
- Mono: Apercu Mono Pro

**Note:** Apercu Pro is a commercial font. See `design-system/fonts.md` for licensing info or free alternatives.

## Data Model

**Core Entities:**
- Contest — Sweepstakes campaigns
- Participant — Customers who enter
- Receipt — Uploaded receipt images with AI data
- Admin User — Staff with dashboard access
- Role — Permission levels
- Session — Active admin logins
- Winner — Selected winners

See `data-model/README.md` for full details and relationships.

## Tips

- **Use the pre-written prompts** — They include important clarifying questions about auth and data modeling
- **Add your own notes** — Customize prompts with project-specific context when needed
- **Build on your designs** — Use completed sections as the starting point for future feature development
- **Review thoroughly** — Check plans and implementations carefully to catch details and inconsistencies
- **Fill in the gaps** — Backend business logic may need manual additions. Incremental implementation helps you identify these along the way
- **Test-driven approach** — Writing tests first ensures comprehensive coverage and catches issues early

## Technical Recommendations

**Backend:**
- Supabase (PostgreSQL + Auth + Storage + Realtime)
- Alternative: Node.js + Express + PostgreSQL + AWS S3

**Frontend:**
- React + TypeScript + Tailwind CSS v4
- Vite or Next.js

**OCR:**
- Google Cloud Vision API
- Mindee Receipt OCR
- Alternative: Tesseract.js (open source)

**Deployment:**
- Vercel or Netlify (frontend)
- Supabase (backend + database)

---

*Generated by Design OS*
