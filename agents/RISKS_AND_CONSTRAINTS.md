# Risks and Constraints

## Critical

- **Authentication/session boundary:** `src/helpers/api.helper.ts`, `src/apis/common/auth.apis.ts`, and `src/middleware.ts` jointly control bearer-token transport, cookie lifecycle, and protected redirects. Inconsistent edits can expose or block protected routes.
- **Real-data mutations:** cart checkout, account/address, recruitment/contact/quote, and event check-in modules call external write/delete/import endpoints. Validate only with approved safe data/context.

## High

- **Dynamic slug dispatcher:** `src/app/(home)/[slug]/page.tsx` maps backend data to several core feature UIs and metadata. Changes can affect catalog, category, news, and promotion rendering.
- **Checkout/quote client state:** `useCartActions.ts`, `useQuoteActions.ts`, `useCartStore.ts`, and checkout components depend on matching cart IDs and backend quote semantics. Automated coverage was not found.
- **Hard-coded integration configuration:** API base and image hosts are source constants/configuration (`src/constants/apis.constant.ts`, `next.config.mjs`). Environment separation is not confirmed.

## Medium

- **HTTP robustness:** `api()` parses JSON without explicit `response.ok`, timeout, or retry handling. Error behavior is backend-shape dependent.
- **Production server divergence:** `npm run dev` uses port 4002 while `npm run start` uses `server.js` port 6868; the README describes a generic port 3000 workflow.
- **Event check-in:** the UI includes delete, bulk-delete, import, and export; no local authorization/UI role guard beyond route authentication is evidenced.

## Low

- **Documentation/encoding drift:** comments and the README contain legacy/misdecoded Vietnamese text in terminal output; preserve file encoding during edits.

## Unknown

- Backend database, migrations, API permission model, CI/CD, hosting, monitoring, alerting, rate limits, and disaster-recovery practices are outside this repository or not evidenced.
