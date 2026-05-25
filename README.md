# 🎓 CampusLens — College Discovery Platform

> A production-grade college discovery and comparison platform built for students, by students. Search, compare, and decide — without the noise.

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
- [Deployment](#deployment)
- [Design Decisions & Tradeoffs](#design-decisions--tradeoffs)
- [Edge Cases Handled](#edge-cases-handled)
- [Folder Structure](#folder-structure)
- [Research & Competitive Analysis](#research--competitive-analysis)

---

## Overview

CampusLens is a full-stack college discovery platform that allows students to search, filter, compare, and save colleges — all backed by a real PostgreSQL database with server-side rendering and authentication.

Built as part of a Full Stack Engineer evaluation (Track B — College Discovery Platform). The goal was to ship a cohesive, production-oriented MVP with clean architecture rather than excessive features.

**Chosen Features (4 of 6):**
1. College Listing + Search with filters and pagination
2. College Detail Page (Overview, Courses, Placements, Reviews)
3. Compare Colleges (side-by-side, up to 3)
4. Authentication + Saved Items

---

## Live Demo

| Link | Description |
|------|-------------|
| 🌐 **[campuslens.vercel.app](https://campuslens.vercel.app)** | Production deployment |
| 🎥 **[Loom Walkthrough](#)** | 5-min architecture + demo video |
| 💻 **[GitHub Repository](https://github.com/yourusername/campuslens)** | Source code |

**Test credentials:**
```
Email:    demo@campuslens.app
Password: demo1234
```

---

## Features

### 🔍 College Listing + Search
- Full-text search on college name, city, and state (case-insensitive, Prisma `contains`)
- Filters: College Type, State, Annual Fees (range), Avg Placement Package, Rating
- Sort by: Rating, Fees (low→high), Avg Package, Name (A→Z)
- Server-side pagination (12 per page) with URL-driven state
- Filter state persisted in URL search params — shareable links
- Skeleton loading states on every card

### 🏛️ College Detail Page
- Overview tab: about text, key info (established, type, affiliation, website)
- Courses tab: full table of degrees, durations, fees, seat count
- Placements tab: avg/highest/median packages, placement %, top recruiters
- Reviews tab: star ratings, batch/course info, paginated reviews
- Sticky action sidebar: Save, Add to Compare, Share
- Similar colleges recommendation (same type/state)
- `generateMetadata` for full SEO support

### ⚖️ Compare Colleges
- Select up to 3 colleges via search modal
- Side-by-side comparison table: General, Fees, Placements, Courses, Ratings
- Best-value highlighting (green tint) per row: lowest fees, highest package, best rating
- Sticky first column on mobile with horizontal scroll
- Compare state managed in Zustand (persists across navigation)
- Fixed compare tray on listing page showing selected colleges

### 🔐 Authentication + Saved Items
- Email/password signup and login via NextAuth v5 Credentials provider
- Passwords hashed with bcryptjs (salt rounds: 12)
- JWT session strategy
- Protected `/saved` route via Next.js middleware
- Save/unsave colleges with optimistic UI updates
- Saved state hydrated from API on session start

---

## Tech Stack

| Layer | Technology | Why |
|-------|------------|-----|
| Frontend | Next.js 14 (App Router) | SSR, RSC, file-based routing, metadata API |
| Language | TypeScript | Type safety across frontend + backend |
| Styling | TailwindCSS | Utility-first, consistent design system |
| State | Zustand | Lightweight, no boilerplate for compare/saved state |
| Database | PostgreSQL (Neon) | Relational, free tier, serverless-compatible |
| ORM | Prisma | Type-safe queries, excellent DX, migration support |
| Auth | NextAuth v5 | Flexible, supports credentials + OAuth |
| Deployment | Vercel + Neon | Zero-config Next.js deploy, serverless Postgres |
| Icons | lucide-react | Consistent, tree-shakeable icon set |

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Vercel Edge                       │
│  ┌─────────────────────────────────────────────┐    │
│  │           Next.js 14 App Router              │    │
│  │                                              │    │
│  │  ┌──────────────┐    ┌───────────────────┐  │    │
│  │  │ Server        │    │  Client Components│  │    │
│  │  │ Components    │    │  (Islands)        │  │    │
│  │  │               │    │                   │  │    │
│  │  │ page.tsx      │    │ SearchBar.tsx      │  │    │
│  │  │ [id]/page.tsx │    │ FilterSidebar.tsx  │  │    │
│  │  │ compare/      │    │ CompareTray.tsx    │  │    │
│  │  │ saved/        │    │ SaveButton.tsx     │  │    │
│  │  └──────┬────────┘    └────────┬──────────┘  │    │
│  │         │                      │              │    │
│  │         ▼                      ▼              │    │
│  │  ┌─────────────────────────────────────┐     │    │
│  │  │         Next.js API Routes           │     │    │
│  │  │  /api/colleges     (search/filter)  │     │    │
│  │  │  /api/colleges/[id] (detail)        │     │    │
│  │  │  /api/colleges/compare              │     │    │
│  │  │  /api/saved         (CRUD)          │     │    │
│  │  │  /api/auth/[...nextauth]            │     │    │
│  │  └──────────────────┬──────────────────┘     │    │
│  └─────────────────────┼────────────────────────┘    │
└────────────────────────┼─────────────────────────────┘
                         │ Prisma Client
                         ▼
              ┌─────────────────────┐
              │   Neon PostgreSQL   │
              │                     │
              │  colleges           │
              │  courses            │
              │  placements         │
              │  reviews            │
              │  users              │
              │  saved_colleges     │
              └─────────────────────┘
```

**Key architectural decisions:**
- Server Components for initial data fetching (no client-side waterfall on load)
- Client Components only where interactivity is needed (search, filters, compare tray)
- URL as source of truth for filter/search/page state — supports back button, sharing
- Zustand for cross-page state (compare tray, saved IDs) that doesn't belong in URL

---

## Database Schema

```prisma
model College {
  id            String      @id @default(cuid())
  name          String
  slug          String      @unique
  abbreviation  String
  city          String
  state         String
  type          CollegeType
  established   Int
  annualFees    Int
  rating        Float
  overview      String      @db.Text
  gradientFrom  String
  gradientTo    String
  nirf          Int?
  courses       Course[]
  placements    Placement?
  reviews       Review[]
  savedBy       SavedCollege[]
}

model Course {
  id          String  @id @default(cuid())
  name        String
  degree      String
  duration    String
  annualFees  Int
  totalSeats  Int
  college     College @relation(fields: [collegeId], references: [id])
  collegeId   String
}

model Placement {
  id               String   @id @default(cuid())
  avgPackage       Int
  highestPackage   Int
  medianPackage    Int
  placementPercent Int
  topRecruiters    String[]
  year             Int
  college          College  @relation(fields: [collegeId], references: [id])
  collegeId        String   @unique
}

model Review {
  id         String   @id @default(cuid())
  rating     Float
  title      String
  content    String   @db.Text
  authorName String
  batch      String?
  course     String?
  helpful    Int      @default(0)
  college    College  @relation(fields: [collegeId], references: [id])
  collegeId  String
  createdAt  DateTime @default(now())
}

model User {
  id            String         @id @default(cuid())
  email         String         @unique
  name          String?
  password      String
  savedColleges SavedCollege[]
  createdAt     DateTime       @default(now())
}

model SavedCollege {
  id        String  @id @default(cuid())
  userId    String
  collegeId String
  user      User    @relation(fields: [userId], references: [id])
  college   College @relation(fields: [collegeId], references: [id])
  @@unique([userId, collegeId])
}

enum CollegeType {
  IIT
  NIT
  IIIT
  GOVERNMENT
  PRIVATE
  DEEMED
  AUTONOMOUS
}
```

---

## API Reference

### `GET /api/colleges`

Returns paginated, filtered college listings.

**Query Parameters:**

| Param | Type | Description | Example |
|-------|------|-------------|---------|
| `q` | string | Search query (name, city, state) | `?q=IIT` |
| `type` | string | College type enum | `?type=IIT` |
| `state` | string | State name | `?state=Maharashtra` |
| `minFees` | number | Minimum annual fees | `?minFees=100000` |
| `maxFees` | number | Maximum annual fees | `?maxFees=500000` |
| `minRating` | number | Minimum rating | `?minRating=4.0` |
| `minPlacement` | number | Min avg placement pkg | `?minPlacement=1000000` |
| `sortBy` | string | Sort field | `?sortBy=rating` |
| `order` | string | `asc` or `desc` | `?order=desc` |
| `page` | number | Page number (default: 1) | `?page=2` |
| `limit` | number | Results per page (default: 12) | `?limit=9` |

**Response:**
```json
{
  "colleges": [...],
  "total": 48,
  "page": 1,
  "totalPages": 4
}
```

---

### `GET /api/colleges/[id]`

Returns full college detail by ID or slug.

**Response:** Full college object including courses, placements, reviews.

---

### `GET /api/colleges/compare`

Returns multiple colleges for comparison.

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `ids` | string | Comma-separated college IDs | `?ids=clx1,clx2,clx3` |

---

### `GET /api/saved` *(Auth required)*

Returns saved college IDs for the current user.

---

### `POST /api/saved` *(Auth required)*

Save a college.

**Body:** `{ "collegeId": "clx123..." }`

**Responses:** `201 Created` / `409 Conflict` (already saved) / `401 Unauthorized`

---

### `DELETE /api/saved` *(Auth required)*

Remove a saved college.

**Body:** `{ "collegeId": "clx123..." }`

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A PostgreSQL database (free at [neon.tech](https://neon.tech))

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/campuslens.git
cd campuslens
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in your values (see [Environment Variables](#environment-variables) below).

### 4. Push database schema

```bash
npx prisma db push
```

### 5. Seed the database

```bash
npm run db:seed
```

This seeds 20 Indian colleges with realistic data including courses, placements, and reviews.

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Create a `.env.local` file in the root:

```env
# Database — get from neon.tech (free tier)
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# NextAuth — generate with: openssl rand -base64 32
NEXTAUTH_SECRET="your-32-char-random-secret"

# Base URL
NEXTAUTH_URL="http://localhost:3000"
```

For production, add these same variables in your Vercel dashboard under **Settings → Environment Variables**.

---

## Deployment

### Deploy to Vercel + Neon (Recommended)

**Step 1 — Create Neon database**
1. Go to [neon.tech](https://neon.tech) → Sign up free
2. Create a new project
3. Copy the connection string from the dashboard

**Step 2 — Deploy to Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deployments on push.

**Step 3 — Add environment variables**

In Vercel dashboard → Settings → Environment Variables, add:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (your production URL)

**Step 4 — Run migrations + seed**
```bash
# With production DATABASE_URL set locally
npx prisma db push
npm run db:seed
```

### npm Scripts

```bash
npm run dev          # Start dev server
npm run build        # prisma generate + next build
npm run start        # Start production server
npm run db:push      # Push schema to database
npm run db:seed      # Seed 20 colleges
npm run db:studio    # Open Prisma Studio (visual DB browser)
npm run db:reset     # Reset DB and re-seed
```

---

## Design Decisions & Tradeoffs

### 1. URL as filter state (not React state)
Filter values live in URL search params, not `useState`. This means filters survive page refresh, support browser back/forward, and produce shareable links. Tradeoff: slightly more complex routing logic with `useRouter` and `useSearchParams`.

### 2. Server Components for listing pages
The college listing page is a Server Component that fetches data at request time. This gives fast first paint and zero loading spinners for the initial view. Only the search input and filter sidebar are Client Components (they need event handlers). Tradeoff: any filter change triggers a full server round-trip instead of a client-side re-filter.

### 3. Zustand for compare + saved state
Compare tray state (which colleges are selected) and saved IDs are stored in Zustand rather than URL or React context. This lets the compare tray persist as users navigate between listing and detail pages. Tradeoff: state is lost on full page refresh (acceptable for a compare tray).

### 4. Prisma `contains` search (not full-text)
Search uses Prisma's `contains` with `mode: 'insensitive'` rather than PostgreSQL full-text search (`tsvector`). This is simpler and fast enough for the dataset size (~1,200 colleges). For production scale, migrating to `pg_trgm` or a dedicated search service (Algolia, Meilisearch) would be the next step.

### 5. Mock data with realistic values
All college data is seeded from `prisma/seed.ts` rather than scraped. This keeps the app legally clean and gives full control over data shape. 20 well-seeded colleges demonstrate all features effectively.

### 6. bcryptjs with 12 salt rounds
Secure enough for the use case without being slow. NextAuth JWT strategy avoids a database lookup on every request.

---

## Edge Cases Handled

| Scenario | Handling |
|----------|----------|
| Compare tray full (3 colleges selected) | Toast: "Max 3 colleges for comparison" — button disabled |
| Duplicate save attempt | API returns `409 Conflict`, frontend shows "Already saved" |
| Compare page with no colleges selected | Empty state with "Add colleges to compare" prompt |
| College not found (bad ID/slug) | `notFound()` → Next.js 404 page |
| Filter returns 0 results | Empty state with "Clear filters" CTA |
| Invalid pagination page (e.g. page=999) | Clamped to last valid page |
| Unauthenticated save attempt | Redirected to `/auth/login?callbackUrl=/saved` |
| Missing placement data | Metric cells show "N/A" gracefully |
| Long college names in compare table | Truncated with CSS `line-clamp-2`, full name on hover |
| API error on filter | Error boundary + "Something went wrong. Try again." |
| Concurrent save/unsave clicks | Request debounced, optimistic update reverted on failure |

---

## Folder Structure

```
campuslens/
├── app/
│   ├── layout.tsx               # Root layout, fonts, providers
│   ├── page.tsx                 # Home — college listing (Server Component)
│   ├── error.tsx                # Root error boundary
│   ├── not-found.tsx            # 404 page
│   ├── colleges/
│   │   └── [id]/
│   │       └── page.tsx         # College detail page
│   ├── compare/
│   │   └── page.tsx             # Compare page (Client Component)
│   ├── saved/
│   │   └── page.tsx             # Saved colleges (protected)
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   └── api/
│       ├── colleges/
│       │   ├── route.ts         # GET: search + filter + paginate
│       │   ├── [id]/route.ts    # GET: college detail
│       │   └── compare/route.ts # GET: ?ids=...
│       ├── saved/route.ts       # GET/POST/DELETE
│       └── auth/[...nextauth]/route.ts
├── components/
│   ├── ui/                      # Button, Badge, Input, Skeleton, etc.
│   ├── layout/                  # Navbar, Footer, MobileFilterSheet
│   ├── college/                 # CollegeCard, FilterSidebar, SearchBar, etc.
│   ├── detail/                  # CollegeHero, SubNav, tab components
│   ├── compare/                 # CollegeSelector, CompareTable
│   └── auth/                    # LoginForm, SignupForm
├── hooks/
│   ├── useCompare.ts            # Zustand store
│   ├── useSaved.ts              # Zustand store
│   └── useDebounce.ts
├── lib/
│   ├── prisma.ts                # Prisma client singleton
│   ├── auth.ts                  # NextAuth config
│   └── utils.ts                 # formatFees, formatPackage, cn()
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── middleware.ts                 # Protect /saved route
├── tailwind.config.ts
├── .env.example
└── README.md
```

---

## Research & Competitive Analysis

Before building, I analyzed Careers360, CollegeDunia, Levels.fyi, and AmbitionBox.

| Feature | Careers360 | CollegeDunia | CampusLens |
|---------|-----------|--------------|------------|
| College Search | ✅ | ✅ | ✅ |
| Filters (type, fees, location) | ✅ | ✅ | ✅ |
| College Detail Page | ✅ | ✅ | ✅ |
| Placements Data | ✅ | ✅ | ✅ |
| Side-by-side Compare | ✅ | ✅ | ✅ |
| Best-value Highlighting | ❌ | ❌ | ✅ |
| Rank Predictor | ✅ | ✅ | ❌ (not in scope) |
| Q&A / Forums | ✅ | ✅ | ❌ (not in scope) |
| Auth + Saved Colleges | ✅ | ✅ | ✅ |
| URL-shareable filters | ❌ | ❌ | ✅ |
| Mobile-first design | Partial | Partial | ✅ |
| Ad-free experience | ❌ | ❌ | ✅ |
| Fast initial load (SSR) | ❌ (slow) | ❌ (slow) | ✅ |

**Key observations from research:**
- Both Careers360 and CollegeDunia have extremely slow, ad-heavy experiences
- Filter state is not preserved in URL (no shareable filter links)
- Compare tables don't highlight best values — users have to read and compare manually
- Mobile experience is an afterthought on both platforms
- CampusLens differentiates on speed (SSR), clean UX, best-value highlighting, and URL-driven state

---

## Contributing

This is an evaluation project and not open for public contributions.

---

## License

MIT — see [LICENSE](./LICENSE) for details.

---

<div align="center">
  Built with ☕ and too many browser tabs open
  <br/>
  <strong>CampusLens</strong> — making college decisions slightly less overwhelming
</div>
