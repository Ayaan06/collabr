# BuildUp — Founder + Contributor Platform

Full-stack Next.js (App Router + TypeScript + Tailwind v4) app for matching founders and contributors. Backend is powered by Supabase Postgres via Prisma plus NextAuth (Google, GitHub, and email/password).

## Run it locally

```bash
npm install
cp .env.local.example .env.local
# set your env values in .env.local first
npx prisma migrate dev
npm run dev
# open http://localhost:3000
```

## What’s inside

- **App shell** with glassmorphism, gradient accents, top nav, sidebar, and mobile nav.
- **Dark & light themes** via `next-themes`, with toggle in the header.
- **Reusable components** (`Button`, `Badge`, `Card`, `Chip`, `Modal`, `Skeleton`, etc.) plus layout primitives.
- **Auth** via NextAuth with Google, GitHub, and credentials providers, backed by the Prisma adapter.
- **Database** schema for projects, members, interests, messages, tasks, and notifications (Prisma + Supabase Postgres).
- **API routes** (App Router route handlers) for projects, users, interests, messages, tasks, and auth registration.
- **Animations** powered by Framer Motion for hover/tap micro-interactions.

## Key routes (UI)

- `/` — Landing page with hero, “how it works,” feature highlights, and social proof.
- `/auth/login`, `/auth/register` — Two-column auth layouts with role-aware copy.
- `/dashboard` — Role toggle (founder/contributor), stats, project cards, suggested contributors.
- `/projects` — Discovery with filters (search, industry, stage, remote/local) and loading/empty states.
- `/projects/[id]` — Project detail with CTAs, founder sidebar, team, and similar projects.
- `/people` — Filterable contributor directory (skills, location, availability).
- `/messages` — Two-column messaging UI with conversation list and chat thread.
- `/profile` — Current user profile form with completeness indicator.
- `/users/[id]` — Public profile view with tabs for overview/projects.

## Project structure

- `src/app` — Routes, layouts, and API route handlers (App Router).
- `src/components` — UI building blocks, layout pieces, and forms.
- `src/lib` — Auth config, Prisma client, and helpers.
- `src/types` — Shared TypeScript types and NextAuth module augmentation.
- `prisma/schema.prisma` — Database models for Supabase Postgres and NextAuth adapter tables.

## Deployment (Vercel + Supabase)

1. Create a Supabase Postgres project and copy the connection string into `DATABASE_URL` (serverless-compatible).
2. Set all env vars in Vercel (`NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `DATABASE_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_ID`, `GITHUB_SECRET`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
3. Optional build command override: `npx prisma generate && npx prisma migrate deploy && next build`.
4. Deploy with `vercel --prod`. Route handlers are App Router compatible and filesystem-safe for the Vercel runtime.

## Notes

- Tailwind v4 is configured via `@import "tailwindcss"` in `globals.css` with inline theme tokens.
- Prisma client is guarded with `globalThis` to support hot reloads on Vercel.
- API routes enforce authentication on mutations; adjust `middleware.ts` to gate additional pages if needed.
- Linting: `npm run lint`.
