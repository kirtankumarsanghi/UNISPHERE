# UNISPHERE - Discover your future, one campus at a time.

A comprehensive, production-grade platform for discovering, comparing, and tracking colleges.

## Quick Start (Running Live)

This application is built as a fully functional, production-ready full-stack platform using Next.js 14, Neon PostgreSQL, Prisma, and NextAuth.

### 1. Database Setup (Neon DB)

The application requires a PostgreSQL database. We use **Neon Database**.

1. Go to [Neon](https://neon.tech/) and create a free PostgreSQL database.
2. Copy your connection string (it should look like `postgresql://owner:password@ep-name.region.aws.neon.tech/neondb?sslmode=require`).
3. Open the `.env.local` file in this directory and replace the `DATABASE_URL` placeholder with your real connection string.

### 2. Prepare the Database

Run the following commands to push the schema to your Neon database and populate it with our highly realistic seed data:

```bash
npm run db:push
npm run db:seed
```

### 3. Start the Application

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to see the live app!

## Features

- **College Discovery**: Filter by type, location, fees, and more.
- **Comparison Engine**: Compare up to 3 colleges side-by-side with comprehensive metrics.
- **Authentication**: Sign up and log in securely.
- **Bookmarks**: Save your favorite colleges and view them in your dashboard.
- **Comprehensive Details**: See full courses, fees, placements, and reviews.

Enjoy your journey with UNISPHERE!
