# 🎓 Unisphere — College Discovery Platform

> Search, compare, and decide on the right college — without the noise. Built for serious students, backed by real data.

![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 📌 Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Seeding the Database](#seeding-the-database)
- [Deployment](#deployment)
- [Design Decisions & Tradeoffs](#design-decisions--tradeoffs)
- [Known Issues & Roadmap](#known-issues--roadmap)
- [Folder Structure](#folder-structure)

---

## Overview

**Unisphere** is a production-grade, full-stack college discovery platform built for Indian students navigating undergraduate and postgraduate admissions. It covers 177+ institutions — all 23 IITs, all 31 NITs, all 26 IIITs, 47 GFTIs, and top private/deemed universities — with real placement data, course details, student reviews, JEE/GATE/CAT cutoffs, and a rank-based college predictor.

The platform is a monolith — Next.js handles both the frontend (React Server Components) and backend (API Routes). PostgreSQL via Neon is the database, with Prisma as the ORM.

**Core Features Shipped:**
1. College listing with full-text search, multi-dimensional filters, and URL-driven pagination
2. College detail pages (Overview, Courses, Placements, Reviews, Cutoffs)
3. Side-by-side college comparison (up to 3)
4. College Predictor — rank-based admission chance estimator
5. Q&A / Discussions — community questions and answers
6. Authentication (email/password) + Saved Colleges + Saved Comparisons

---

## Live Demo

| Link | Description |
|------|-------------|
| 🌐 **[unisphere.vercel.app](https://unisphere.vercel.app)** | Production deployment |
| 💻 **[GitHub Repository](https://github.com/kirtankumarsanghi/unisphere)** | Source code |

**Test credentials:**
```
Email:    demo@unisphere.app
Password: demo1234
```

---

## Features

### 🔍 Explore — College Listing & Search
- Full-text search across college name, city, state, and course names (case-insensitive via Prisma `contains`)
- Filters: Type (IIT/NIT/IIIT/Government/Private/Deemed/Autonomous), State, City, Course, Degree, Annual Fees range, Min Avg Package, Min Rating, Est. Year, Max NIRF Rank
- Sort by: Rating (default), Fees low→high, Avg Package, Name A→Z, Most Popular
- Server-side pagination — 12 cards per page, URL-driven (shareable, back-button safe)
- Skeleton loading states on every card
- Fallback to in-memory data if database is unavailable

### 🏛️ College Detail Page
- **Overview tab** — about text, established year, type, website
- **Courses tab** — degree, duration, annual fees, seat intake per course
- **Placements tab** — avg/highest/median packages, placement %, top recruiters, year
- **Reviews tab** — star ratings, batch/course info, author name
- **Exam Cutoffs** — JEE Advanced, JEE Main, BITSAT, GATE, CAT closing ranks per course and category
- Sticky action sidebar: Save college, Add to Compare, Share link
- Similar colleges recommendation (same type, ranked by rating)
- `generateMetadata` for full SEO — unique title and description per college

### ⚖️ Compare Colleges
- Search and select up to 3 colleges via modal
- Side-by-side table: Location, Type, Established, NIRF Rank, Fees, Total Cost, Avg/Highest/Median Package, Placement %, Degrees, Course Count, Rating, Reviews
- Best-value highlighting per row: lowest fees, highest package, best rating
- Save comparison to dashboard (requires login)
- Compare state in Zustand — persists across navigation
- Fixed compare tray on listing page showing selected colleges

### 🎯 College Predictor
- Input your exam (JEE Advanced / JEE Main / BITSAT / GATE / CAT), rank, and branch interest
- Returns colleges where your rank falls within historical closing rank ranges
- Groups results by college, shows matched courses and their closing ranks
- Sorted by best-match (closest closing rank to your rank first)

### 💬 Q&A / Discussions
- Community questions — optionally linked to a specific college
- Post answers (requires login)
- Questions seeded per college (2 Q&A threads with answers per institution)
- Paginated, ordered newest first

### 🔐 Authentication + Saved Items
- Email/password signup and login via NextAuth v5 Credentials provider
- Passwords hashed with bcryptjs (salt rounds: 12)
- JWT session strategy
- Protected `/saved` route via Next.js middleware
- Save/unsave colleges with optimistic UI (heart icon)
- Saved state hydrated from `/api/saved` on session start via `SavedHydrator`
- Save entire comparisons from the Compare page

---

## Tech Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| Framework | Next.js 14 (App Router) | SSR, RSC, file-based routing, metadata API, API routes |
| Language | TypeScript (strict) | End-to-end type safety across all components and API routes |
| Styling | TailwindCSS | Utility-first, consistent dark design system via CSS variables |
| State | Zustand | Lightweight global state for compare tray and saved IDs |
| Database | PostgreSQL (Neon) | Relational, serverless-compatible, free tier on Neon |
| ORM | Prisma | Type-safe queries, excellent DX, migration support |
| Auth | NextAuth v5 | Credentials provider, JWT sessions, middleware protection |
| Validation | Zod | Schema validation on all API route inputs |
| Icons | lucide-react | Tree-shakeable, consistent icon set |
| Fonts | Cabinet Grotesk + DM Sans | Editorial display + clean body font pair |
| Deployment | Vercel + Neon | Zero-config Next.js deploy, serverless Postgres |

---

## Architecture

```
┌──────────────────────────────────────────────────────┐
│                     Vercel Edge                       │
│  ┌──────────────────────────────────────────────┐    │
│  │          Next.js 14 App Router                │    │
│  │                                               │    │
│  │  ┌─────────────────┐  ┌────────────────────┐ │    │
│  │  │ Server Components│  │ Client Components  │ │    │
│  │  │ (initial render) │  │ (interactive islands│ │    │
│  │  │                  │  │                    │ │    │
│  │  │ app/page.tsx     │  │ SearchBar.tsx       │ │    │
│  │  │ colleges/[slug]/ │  │ FilterSidebar.tsx   │ │    │
│  │  │ saved/page.tsx   │  │ CompareTray.tsx     │ │    │
│  │  └────────┬─────────┘  └──────────┬─────────┘ │    │
│  │           │                       │            │    │
│  │           ▼                       ▼            │    │
│  │  ┌──────────────────────────────────────────┐  │    │
│  │  │            Next.js API Routes             │  │    │
│  │  │  /api/colleges          (search/filter)  │  │    │
│  │  │  /api/colleges/[id]     (detail)         │  │    │
│  │  │  /api/colleges/compare  (batch fetch)    │  │    │
│  │  │  /api/colleges/suggestions (autocomplete)│  │    │
│  │  │  /api/predictor         (rank lookup)    │  │    │
│  │  │  /api/discussions       (Q&A CRUD)       │  │    │
│  │  │  /api/saved             (save/unsave)    │  │    │
│  │  │  /api/saved-comparisons (comparisons)    │  │    │
│  │  │  /api/auth/[...nextauth]                 │  │    │
│  │  │  /api/auth/signup                        │  │    │
│  │  │  /api/health + /api/ready               │  │    │
│  │  └────────────────────┬─────────────────────┘  │    │
│  └───────────────────────┼──────────────────────┘  │    │
└──────────────────────────┼───────────────────────────┘
                           │ Prisma Client
                           ▼
               ┌─────────────────────┐
               │    Neon PostgreSQL   │
               │                     │
               │  College            │
               │  Course             │
               │  Placement          │
               │  Review             │
               │  ExamCutoff         │
               │  Question           │
               │  Answer             │
               │  User               │
               │  SavedCollege       │
               │  SavedComparison    │
               └─────────────────────┘
```

**Key architectural decisions:**
- Server Components fetch initial data directly via Prisma — no client-side waterfall on first load
- Client Components only where interactivity is needed (search, filters, compare tray, save button)
- URL as single source of truth for filter/search/page state — supports back button and shareable links
- Zustand for cross-page ephemeral state (compare tray contents, saved college IDs) that lives in memory
- Graceful fallback: if DB is unreachable, the listing and detail pages fall back to a static in-memory dataset (`lib/fallback-colleges.ts`) so the app never shows a blank error page

---

## Database Schema

```prisma
model College {
  id            String        @id @default(cuid())
  name          String
  slug          String        @unique
  abbreviation  String
  location      String
  city          String
  state         String
  type          CollegeType
  established   Int
  annualFees    Int
  rating        Float
  totalReviews  Int           @default(0)
  overview      String        @db.Text
  gradientFrom  String        @default("#1e1b4b")
  gradientTo    String        @default("#312e81")
  nirf          Int?
  website       String?
  image         String?
  courses       Course[]
  placements    Placement?
  reviews       Review[]
  savedBy       SavedCollege[]
  questions     Question[]
  cutoffs       ExamCutoff[]
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
}

enum CollegeType {
  IIT | NIT | IIIT | GOVERNMENT | PRIVATE | DEEMED | AUTONOMOUS
}

model ExamCutoff {
  id          String  @id @default(cuid())
  examName    String  // "JEE Advanced" | "JEE Main" | "BITSAT" | "GATE" | "CAT"
  courseName  String
  category    String  @default("GENERAL")
  closingRank Int
  year        Int     @default(2024)
  college     College @relation(fields: [collegeId], references: [id], onDelete: Cascade)
  collegeId   String
}

// ... Course, Placement, Review, User, SavedCollege, SavedComparison, Question, Answer
// See frontend/prisma/schema.prisma for full schema
```

---

## API Reference

### Colleges

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/colleges` | List colleges with filters, sort, pagination |
| `GET` | `/api/colleges/[id]` | Single college detail by ID or slug |
| `GET` | `/api/colleges/compare?ids=a,b,c` | Fetch up to 3 colleges by ID for comparison |
| `GET` | `/api/colleges/suggestions?q=query` | Autocomplete suggestions (up to 8) |

**`GET /api/colleges` Query Parameters:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `q` | string | — | Full-text search (name, city, state, courses) |
| `type` | string | — | IIT / NIT / IIIT / GOVERNMENT / PRIVATE / DEEMED / AUTONOMOUS |
| `state` | string | — | Exact state name |
| `city` | string | — | Partial city match |
| `course` | string | — | Partial course name match |
| `degree` | string | — | Partial degree match (B.Tech, MBA) |
| `minFees` | number | 0 | Minimum annual fees (₹) |
| `maxFees` | number | 10000000 | Maximum annual fees (₹) |
| `minRating` | number | 0 | Minimum rating (0–5) |
| `minPlacement` | number | 0 | Minimum avg package (₹) |
| `minYear` | number | 1900 | Minimum establishment year |
| `maxNirf` | number | 9999 | Maximum NIRF rank |
| `sort` | string | `rating_desc` | `rating_desc`, `fees_asc`, `placement_desc`, `name_asc`, `popular_desc` |
| `page` | number | 1 | Page number |
| `limit` | number | 12 | Results per page |

### Predictor

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/predictor?exam=X&rank=Y&interest=Z` | Colleges matching rank+exam, grouped by college |

**Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `exam` | string | ✅ | JEE Advanced / JEE Main / BITSAT / GATE / CAT |
| `rank` | number | ✅ | Student's rank (closing rank must be ≥ this) |
| `interest` | string | — | Branch/course keyword filter |

### Discussions

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/discussions?collegeId=X` | All questions (optionally filtered by college) |
| `POST` | `/api/discussions` | Post new question (auth required) |
| `POST` | `/api/discussions/[id]/answer` | Post answer to a question (auth required) |

### Saved

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/saved` | Returns array of saved college IDs for session user |
| `POST` | `/api/saved` | Save a college `{ collegeId }` |
| `DELETE` | `/api/saved` | Unsave a college `{ collegeId }` |
| `GET` | `/api/saved-comparisons` | List saved comparisons |
| `POST` | `/api/saved-comparisons` | Save comparison `{ collegeIds[], name }` |

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | Register `{ name, email, password }` — validated with Zod |
| `*` | `/api/auth/[...nextauth]` | NextAuth v5 handler (login, session, signout) |

### Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Returns `{ status: "ok" }` — no DB dependency |
| `GET` | `/api/ready` | Returns `{ status: "ready" }` if DB is reachable |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18.17
- npm or yarn
- PostgreSQL database (local or [Neon](https://neon.tech) free tier)

### 1. Clone the repository

```bash
git clone https://github.com/kirtankumarsanghi/unisphere.git
cd unisphere/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in the values — see [Environment Variables](#environment-variables) below.

### 4. Generate the fallback data file

> This step is required before seeding. The script reads the college list and writes `lib/fallback-colleges.ts`, which is used both as a DB seed source and as an in-memory fallback if the database is unavailable.

```bash
node script.js
```

### 5. Push the Prisma schema and seed

```bash
# Apply schema to your database
npx prisma db push

# Seed the database (177+ colleges, courses, placements, reviews, cutoffs, Q&A)
npx prisma db seed
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Create a `.env.local` file in `/frontend` with the following:

```env
# Database — Neon PostgreSQL connection string (or any PostgreSQL URL)
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# NextAuth — generate a random secret: openssl rand -base64 32
NEXTAUTH_SECRET="your-secret-here"

# NextAuth URL — your app's public URL (localhost for dev)
NEXTAUTH_URL="http://localhost:3000"
```

**Neon setup (recommended):**
1. Go to [neon.tech](https://neon.tech) and create a free project
2. Copy the connection string from the dashboard
3. Paste into `DATABASE_URL`

---

## Seeding the Database

The seed script at `frontend/prisma/seed.ts` populates:

| Entity | Count |
|--------|-------|
| Colleges | 177 |
| Courses | 7 per college (1,239 total) |
| Placements | 1 per college (177 total) |
| Reviews | 3 per college (531 total) |
| Exam Cutoffs | 5–7 per college (~1,000 total) |
| Q&A Questions | 2 per college (354 total) |
| Answers | 2 per question (708 total) |

**Institution breakdown:**
- 23 IITs (all, from IIT Kharagpur 1951 to IIT Goa 2016)
- 31 NITs (all, including all northeastern NITs)
- 26 IIITs (autonomous, centrally funded, and all PPP-model)
- 47 GFTIs (Wikipedia-verified JoSAA 2025-26 list)
- 50+ top private, deemed, and autonomous colleges

**Run seed:**
```bash
# From frontend/ directory
npx prisma db seed
```

**Reset and re-seed:**
```bash
npx prisma db push --force-reset
node script.js
npx prisma db seed
```

> **Note**: The seed always deletes all existing data before inserting. It's safe to re-run.

---

## Deployment

### Vercel + Neon (recommended)

1. Push the `frontend/` directory to a GitHub repository
2. Import the project in [Vercel](https://vercel.com)
3. Set the root directory to `frontend`
4. Add environment variables in the Vercel dashboard:
   - `DATABASE_URL` — your Neon connection string
   - `NEXTAUTH_SECRET` — random secret
   - `NEXTAUTH_URL` — your Vercel deployment URL (e.g. `https://unisphere.vercel.app`)
5. Add a build command override if needed: `npm run build`
6. Deploy

**Post-deploy database setup:**
```bash
# From your local machine, pointing to the Neon production DB
DATABASE_URL="your-neon-url" node script.js
DATABASE_URL="your-neon-url" npx prisma db push
DATABASE_URL="your-neon-url" npx prisma db seed
```

### Self-hosted / Docker

```bash
# Build
cd frontend
npm run build

# Start
npm start
```

Ensure `DATABASE_URL`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL` are set in your environment.

---

## Design Decisions & Tradeoffs

### Server Components for data fetching
The listing page (`app/page.tsx`) and college detail page (`app/colleges/[slug]/page.tsx`) are React Server Components that query Prisma directly. This eliminates client-side data waterfall on load, improves SEO (full HTML on first byte), and avoids a redundant API round-trip for initial data. Client components fetch via API routes only for interactivity (save, search autocomplete, compare).

### URL as source of truth for filters
All filter state (type, state, fees range, rating, sort, page) lives in URL search params. This means filter state survives page refresh, is shareable, and works with the browser back button natively. Zustand is used only for ephemeral cross-page state (compare tray, saved IDs) that doesn't belong in URLs.

### Fallback data layer
If the database is unreachable (cold start, network error, Neon free tier sleep), the app falls back to `lib/fallback-colleges.ts` — a static in-memory dataset generated by `script.js`. This ensures the listing, search, filters, and college detail pages always render real content instead of blank error states. The fallback is limited (no reviews, no cutoffs, minimal course data) but far better than a 500 error.

### Prisma in Next.js — singleton pattern
`lib/prisma.ts` uses the global singleton pattern to prevent multiple Prisma Client instances in Next.js hot reload:
```ts
const globalForPrisma = global as typeof global & { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### `totalReviews` denormalization
`College.totalReviews` is a cached count stored on the college row and set at seed time. It is not auto-updated when users post new reviews via the API. This is a known tradeoff — for seed data it's correct, but real user-submitted reviews won't update this count unless you add a Prisma `$transaction` that increments it on review create. The count displayed in UI cards comes from this field, not a live `_count` query, to avoid the N+1 JOIN on listing pages.

### Why no `backend/` service
The project is a Next.js monolith. The `backend/` folder in the repo root contains only a `README.md` and a `prisma/` copy — it is not a running service. All data access happens through Next.js API Routes in `frontend/app/api/`. This was a deliberate simplification for the MVP scope.

---

## Known Issues & Roadmap

### Known Issues

| # | Issue | Location | Fix |
|---|-------|----------|-----|
| 1 | `₹` symbol may render as `?` if file encoding is wrong | `lib/utils.ts` | Ensure file is saved as UTF-8; replace `?` literals with `₹` |
| 2 | `totalReviews` not updated on new user review | `api/saved`, reviews flow | Add `college.update({ data: { totalReviews: { increment: 1 } } })` on review create |
| 3 | Q&A discussion cards appear blank | `discussions/page.tsx` | Explicit `text-[color]` on all text elements — no `color: inherit` on dark backgrounds |
| 4 | Predictor has no fallback when DB is down | `api/predictor/route.ts` | Add fallback rank estimation from `fallbackColleges` |
| 5 | `maxFees` filter default caps at ₹25L | `app/page.tsx` line 1655 | Change default from `2500000` to `10000000` to include Plaksha/Ashoka |
| 6 | Discussions input has no length validation | `api/discussions/route.ts` | Add `title.length <= 200 && content.length <= 5000` check or Zod schema |
| 7 | Compare page has duplicate table logic | `compare/page.tsx` + `CompareTable.tsx` | Remove inline rows from `compare/page.tsx`, use `<CompareTable />` component only |

### Roadmap

- [ ] Exam cutoffs tab on college detail page (UI for `ExamCutoff` data already seeded)
- [ ] OAuth login (Google) alongside credentials
- [ ] College reviews — allow authenticated users to submit reviews via UI
- [ ] Predictor: category-wise cutoffs (OBC/SC/ST/EWS)
- [ ] NIRF ranking history chart on college detail page
- [ ] Advanced predictor: confidence bands (safe/moderate/ambitious tiers)
- [ ] Email verification on signup
- [ ] Rate limiting on auth routes via `lib/rate-limit.ts` (module exists, not yet wired)
- [ ] Discussions pagination (currently loads all questions at once)
- [ ] College image upload / official logo integration
- [ ] Mobile app (React Native with shared API layer)

---

## Folder Structure

```
frontend/
├── app/
│   ├── page.tsx                    # Explore / listing page (Server Component)
│   ├── layout.tsx                  # Root layout, fonts, providers
│   ├── globals.css                 # CSS variables, base styles
│   ├── api/
│   │   ├── colleges/               # GET list, GET detail, GET compare, GET suggestions
│   │   ├── predictor/              # GET rank-based college recommendations
│   │   ├── discussions/            # GET/POST questions, POST answers
│   │   ├── saved/                  # GET/POST/DELETE saved colleges
│   │   ├── saved-comparisons/      # GET/POST saved comparisons
│   │   ├── auth/                   # NextAuth handler + signup
│   │   ├── health/                 # Liveness check
│   │   └── ready/                  # Readiness check (DB ping)
│   ├── colleges/[slug]/page.tsx    # College detail (Server Component)
│   ├── compare/page.tsx            # Compare page (Client Component)
│   ├── predictor/page.tsx          # Predictor page
│   ├── discussions/page.tsx        # Q&A page
│   ├── saved/page.tsx              # Saved colleges + comparisons
│   └── auth/login/ + signup/       # Auth pages
│
├── components/
│   ├── college/                    # CollegeCard, FilterSidebar, SearchBar,
│   │                               # CompareTray, SortDropdown, Pagination
│   ├── compare/                    # CollegeSelector, CompareTable, CompareHighlight
│   ├── detail/                     # CollegeHero, SubNav, OverviewTab, CoursesTab,
│   │                               # PlacementsTab, ReviewsTab, DetailSidebar, SimilarColleges
│   ├── auth/                       # LoginForm, SignupForm
│   ├── layout/                     # Navbar, Footer, MobileFilterSheet
│   ├── providers/                  # AppProviders, AuthProvider, ToastProvider, SavedHydrator
│   └── ui/                         # Badge, Button, Input, Skeleton, EmptyState, RatingPill
│
├── hooks/
│   ├── useCompare.ts               # Zustand compare tray state
│   ├── useSaved.ts                 # Zustand saved college IDs
│   └── useDebounce.ts              # Debounce hook for search
│
├── lib/
│   ├── prisma.ts                   # Prisma client singleton
│   ├── auth.ts                     # NextAuth config
│   ├── utils.ts                    # formatFees, formatPackage, getBestValue
│   ├── validators.ts               # Zod schemas for all API inputs
│   ├── rate-limit.ts               # Rate limiter (defined, not yet wired to routes)
│   ├── fallback-loader.ts          # Async loader for fallback-colleges.ts
│   └── fallback-colleges.ts        # ⚠️ Generated by script.js — do not edit manually
│
├── prisma/
│   ├── schema.prisma               # Full database schema
│   └── seed.ts                     # Seed script (177 colleges, all related data)
│
├── types/
│   └── next-auth.d.ts              # NextAuth session + JWT type extensions
│
├── script.js                       # ⚠️ Run BEFORE seeding — generates fallback-colleges.ts
├── middleware.ts                   # Protects /saved route, redirects to /auth/login
├── tailwind.config.ts              # CSS variable tokens, font families
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push and open a pull request

Please run `npm run build` before opening a PR to catch TypeScript errors.

---

## License

MIT — see [LICENSE](./LICENSE) for details.

---

*Built by [Kirtan Kumar Sanghi](https://github.com/kirtankumarsanghi)*
