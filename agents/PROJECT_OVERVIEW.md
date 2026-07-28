# Project Overview

## Purpose and users

This is a Vietnamese B2B/e-commerce web frontend for Nguyen Kim Computer. Evidence: product/category/catalog pages, cart and checkout, account/order/address pages, quotation, PC configuration, recruitment, news/promotion/content, and standalone event check-in routes under `src/app/`.

Primary consumers are public shoppers/business customers, authenticated account holders, and event staff using `/su-kien-checkin`.

## Confirmed stack

- Next.js `14.2.3`, React `18`, TypeScript `5`: `package.json`, `src/app/`.
- Tailwind CSS and component configuration: `tailwind.config.ts`, `components.json`.
- Zustand state: `src/stores/`; `useBuildPc` persists to browser storage.
- React Hook Form, Zod, and `@hookform/resolvers`: forms such as `src/components/login/loginForm.tsx`.
- `next-intl`: `next.config.mjs`, `src/app/layout.tsx`, `messages/`.

## Applications/services in this repository

One Next.js application is confirmed. It has a custom Node production entry (`server.js`) and PM2 definition (`ecosystem.config.js`). It calls an external member API through `src/apis/`; no backend source, ORM, database schema, migration, queue, or worker is present.

## Verified / unverified

- **Verified:** the frontend uses a constant API base URL in `src/constants/apis.constant.ts`; API calls are executed through server actions.
- **Verified:** one local route handler proxies participant-export downloads: `src/app/api/export-participants/route.ts`.
- **Not confirmed:** backend implementation, database technology, user roles/permissions, analytics configuration, actual deployment topology, API retry/timeout policy, and CI pipeline.
