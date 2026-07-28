# Business Logic

## Cart and checkout

**Entry points:** product/cart UI and `useBuyAction()`/`useCartActions()`.

1. `useCartActions.addToCart()` (`src/hooks/useCartActions.ts`) requires Zustand `authenticated`, rejects empty input, normalizes quantity to at least 1, filters `product.isInStock`, then calls `cart.apis.create()` and updates `useCartStore`.
2. `useQuoteActions.runQuote()` debounces quote calls by 250 ms after selected cart IDs/quantities or coupon changes. It calls `cart.apis.quote()`, clears invalid coupons, and redirects to `/gio-hang` for an empty quote.
3. `src/app/(home)/thanh-toan/page.tsx` loads addresses and selects default/first. `OrderSummary` invokes `cart.apis.checkout()`; exact backend order/payment rules are not confirmed.
4. `useBuyAction.buyNow()` requires auth, adds items, selects returned cart item IDs, then routes to `/thanh-toan`.

## Authentication and profile

`LoginForm` validates username/password with Zod and calls `login()`. `RegisterForm` validates account/contact/company fields, matching passwords, Vietnamese phone format, tax-code digits, and accepted terms before `register()`. `AuthInitializer` receives `getMe()` data from the root layout and populates `useAuthStore`. Cookie issuing and route validation are described in `ARCHITECTURE.md`.

## Dynamic catalog/content routing

`src/app/(home)/[slug]/page.tsx` receives a slug, calls `findOne()`, and routes based on backend-returned `ESlug`: product → `Product`, category → `CategoryDetail`, news → `News`, promotion → `Promotion`; absent/unknown data produces `NotFoundPage`. This is a high-impact routing boundary.

## Event check-in

`useEventCheckin()` reads filter query state, fetches participants, keeps selection/modal state, then issues create/update/delete/bulk-delete/import actions and refreshes the list after a successful response. It obtains spreadsheet data via the local export route. The confirmation page uses a UID to read/check in a guest. Server-side authorization and duplicate-check-in policy are not confirmed.

## PC configuration and quotations

`src/stores/useBuildPc.ts` holds component selections by configuration ID and persists them locally. `src/apis/models/buildPc.apis.ts` provides configuration/filter data. Quote submission is exposed by `src/apis/models/quote.apis.ts` and UI under `src/components/quote/`; backend pricing and fulfillment rules are not available here.
