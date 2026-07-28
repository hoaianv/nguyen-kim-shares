# Nguyen Kim Shares — Agent Guide

## Project identity

Customer-facing e-commerce and content frontend for Nguyen Kim Computer. It is a Next.js App Router application that delegates persistence and domain operations to an external member API.

## Stack

- Next.js 14.2, React 18, TypeScript, App Router
- Tailwind CSS, shadcn-style UI primitives, Lucide, Motion, Swiper
- Zustand client state; React Hook Form + Zod validation
- `next-intl` message provider; PM2-compatible custom production server

## Important locations

- `src/app/`: routes, layouts, and the one local route handler
- `src/apis/`, `src/helpers/api.helper.ts`: external API boundary
- `src/components/`, `src/hooks/`, `src/stores/`: UI and client workflows
- `src/interfaces/`: API payload/response contracts
- `src/middleware.ts`: route protection

## Source-of-truth documentation

Read [agents/README.md](agents/README.md) first. Use its index to open the focused reference before changing a subsystem.

## Commands

- Install: `npm ci`
- Develop: `npm run dev` (port 4002)
- Build: `npm run build`
- Start production server: `npm run start` (custom server, port 6868)
- Lint: `npm run lint`

No type-check or test script is declared. See `agents/DEVELOPMENT_GUIDE.md` and `agents/TESTING_AND_QUALITY.md` before adding or running checks.

## Change rules

- Preserve the App Router/server-action boundary: API modules under `src/apis/` are server actions and should use `api()` unless a documented exception is needed.
- Keep API contracts in `src/interfaces/` aligned with the backend; do not invent response shapes.
- Keep authentication cookie handling in `src/apis/common/auth.apis.ts` and protection rules in `src/middleware.ts` coordinated.
- Keep checkout, cart quote, order, address, and event check-in changes small and validate their affected flows.
- Do not alter `CONST_APIS.SERVER_URL`, token behavior, middleware matchers, or production-server settings casually.
- Do not add secrets to source, docs, or commits. No `.env` contract is currently confirmed.

## Prohibited without explicit approval

- Database migration or direct backend-data mutation.
- Deployment, commit, push, dependency upgrade, or lockfile churn.
- Calling destructive production API operations outside an approved test context.

## Definition of done

Report changed files and checks actually run. For a behavior change, run the narrowest relevant lint/build/manual validation available; explicitly report anything not run.
