# Backend Folder Status

This `backend/` directory is **legacy reference only**.

Authoritative app runtime and APIs are in:
- `frontend/` (Next.js app router)
- `frontend/prisma/schema.prisma`
- `frontend/prisma/seed.ts`

Use only `frontend/` scripts for development:
- `npm run dev`
- `npm run db:push`
- `npm run db:seed`

Do not run migrations/seeds from `backend/prisma` unless this folder is explicitly revived as a separate service.
