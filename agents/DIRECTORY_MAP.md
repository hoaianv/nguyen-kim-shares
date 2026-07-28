# Directory Map

## `src/app/` — routes and layouts — edit with route-level validation

App Router pages, grouped layouts `(home)` and `(standalone)`, global layout, error/not-found views, middleware-adjacent API route, metadata and robots. Dynamic `[slug]` dispatches product, category, news, and promotion rendering.

## `src/apis/` and `src/helpers/` — backend integration — sensitive

Server-action request modules grouped by auth/common and model domain. `src/helpers/api.helper.ts` adds JSON/form headers, a bearer token derived from the httpOnly cookie, and `credentials: "include"`. Avoid direct fetch duplication and preserve `src/interfaces/` contracts.

## `src/components/` — feature and presentation UI — generally safe with focused checks

Feature folders mirror page domains: `cart`, `checkout`, `product`, `category`, `account`, `eventCheckin`, etc. `src/components/ui/` holds shared primitives; avoid breaking their consumers.

## `src/hooks/`, `src/stores/`, `src/init/` — client orchestration/state — sensitive

Hooks run cart, quote, buy-now, search and check-in workflows. Zustand stores are hydrated by initializers in `src/app/layout.tsx`; `useBuildPc.ts` is persisted locally.

## `src/interfaces/` — request/response/domain types — contract-sensitive

`common/` defines generic response/pagination types; `models/` defines domain payloads and API result shapes. Update alongside API/backend contract changes.

## `src/constants/`, `src/lib/`, `src/until/` — shared configuration/utilities — sensitive

Includes API path/base constants, routes, values (including token-cookie name), company data, and `getValidData` response extraction. Check broad import usage before edits.

## `messages/`, `public/` — i18n/static assets — safe with content review

Locale JSON and static images. No locale-routing implementation was confirmed beyond the provider/config.

## Root config — operationally sensitive

`next.config.mjs`, `server.js`, and `ecosystem.config.js` determine framework, image/network allowlist, production port, and PM2 behavior. `package.json` is the command/dependency source of truth.
