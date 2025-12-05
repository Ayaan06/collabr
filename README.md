# BuildUp — Founder ↔ Contributor UI

Frontend-only Next.js app (App Router + TypeScript + Tailwind v4) that showcases a modern platform connecting startup founders with contributors. The UI is fully mocked and ready to plug into real APIs later.

## Run it locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## What’s inside

- **App shell** with glassmorphism, gradient accents, top nav, sidebar, and mobile nav.
- **Dark & light themes** via `next-themes`, with toggle in the header.
- **Reusable components** (`Button`, `Badge`, `Card`, `Chip`, `Modal`, `Skeleton`, etc.) plus layout primitives.
- **Mock data + types** in `src/lib/mock-data.ts` and `src/types/index.ts` for projects, users, and messages.
- **Animations** powered by Framer Motion for hover/tap micro-interactions.

## Key routes (UI only)

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

- `src/app` — Routes and layouts (App Router).
- `src/components` — UI building blocks, layout pieces, and forms.
- `src/lib` — Mock data and helpers.
- `src/types` — Shared TypeScript types.

## Notes

- All data is mocked in-memory; wire up real API calls where noted.
- Tailwind v4 is configured via `@import "tailwindcss"` in `globals.css` with inline theme tokens.
- Linting: `npm run lint`.
