# InterviewGPT

AI-powered interview preparation platform helping students and job seekers ace technical, HR, aptitude, and coding interviews.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/interview-gpt run dev` — run the frontend (port 18695)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + TailwindCSS + Recharts + Wouter + React Query
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI spec (single source of truth)
- `lib/db/src/schema/` — Drizzle schema tables (profiles, resumes, coding, hr, aptitude, mock-interviews, job-descriptions, misc)
- `artifacts/api-server/src/routes/` — Express route handlers
- `artifacts/interview-gpt/src/` — React frontend

## Features (25+)

1. Dashboard with stats, weekly progress chart, activity feed
2. Study streak tracking
3. Performance analytics by category
4. Coding question bank (filter by topic/difficulty/company)
5. Interactive code editor with language selector
6. Solution submission with auto-evaluation
7. Daily coding challenge
8. Topic-wise progress
9. HR behavioral questions by category
10. AI answer evaluator with STAR feedback
11. Aptitude tests (quantitative, logical, verbal) with timer
12. Aptitude history tracking
13. Mock interview sessions (technical/HR/mixed)
14. One-at-a-time interview flow
15. Post-interview detailed reports (scores, strengths, weaknesses)
16. Resume analyzer with ATS scoring
17. Resume gap analysis & improvement suggestions
18. Job description analyzer with skill matching
19. Global leaderboard by category
20. Bookmark questions across categories
21. Interview tips & resources library
22. Personalized weekly learning roadmap
23. Interview schedule planner
24. Profile management (target role, skills, experience)
25. Recent activity feed

## Architecture decisions

- Single-user mode (no auth) for simplicity — profile auto-created on first request
- Resume analysis is done server-side by keyword extraction (no external AI API needed)
- Leaderboard is seeded with realistic-looking dummy users since it's a shared platform concept
- Aptitude test questions are seeded in the DB; test attempt stores answers for evaluation
- Mock interview questions are hardcoded arrays per type (technical/HR/mixed)

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Run `pnpm --filter @workspace/api-spec run codegen` after any openapi.yaml changes before touching routes or frontend
- The API server must be restarted after schema changes
- `pnpm --filter @workspace/db run push` to sync schema changes to DB

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
