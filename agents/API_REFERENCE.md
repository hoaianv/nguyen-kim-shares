# API Reference

## Shared boundary

- **External base/path source:** `src/constants/apis.constant.ts` (`CONST_APIS` and `CONST_APIS_COMMON`).
- **Caller/wrapper:** `src/helpers/api.helper.ts` server action `api<TypeResult>()`.
- **Authentication:** bearer token from the httpOnly `token` cookie; `credentials: "include"`.
- **Contracts:** `src/interfaces/common/IResponse.interface.ts` and `src/interfaces/models/*`.
- **Response transformation:** callers commonly use `getValidData()` from `src/lib/utils.ts`.
- **Retries/timeouts/interceptors:** not implemented/confirmed in the wrapper.

Routes below are expressed as `FEATURE/...` constants, avoiding duplicate hard-coded base URLs. All listed model API files are server actions.

## Project-provided API

### Participant export

- `GET /api/export-participants` — `src/app/api/export-participants/route.ts`.
- Forwards query filters to the external participant endpoint and forces `export=true`; forwards the bearer token; streams an XLSX response.
- Called by `exportExcel()` in `src/hooks/useEventCheckin.ts`.

## External API: account and customer operations

- Auth: `POST auth/login`, `POST auth/register`, `POST auth/forgot-password`, `POST auth/reset-password`, `POST auth/logout`, `GET me`, `PUT update`, `GET check-token`, and Google auth GET routes — `src/apis/common/auth.apis.ts`; used by account/login/register/callback UI and middleware.
- Address: `GET address/get-all`, `POST address/add`, `PUT address/update/:id`, `DELETE address/delete/:id` — `src/apis/models/address.apis.ts`; account address and checkout pages.
- Cart/order/favorites: cart list/add/update/delete/quote/checkout in `cart.apis.ts`; order list/detail in `order.apis.ts`; favorites list/toggle in `favorite.apis.ts`. Used by cart, checkout, product and account components/hooks.

## External API: commerce catalog/content

- Product catalog/search/detail helpers — `src/apis/models/products.apis.ts` and `category.apis.ts`; used by home, dynamic slug, product, category, search, viewed, and favorite UI.
- Slug resolution/meta — `src/apis/models/slug.apis.ts`; used only by `src/app/(home)/[slug]/page.tsx` for content-type dispatch and metadata.
- Navigation/configuration — menu, advertise, support, footer modules; fetched from `src/app/layout.tsx` and hydrated to stores.
- Content — about, policy, news, promotion, service, recruitment, advise/FAQ, contact, quote modules under `src/apis/models/`; used by matching page/component folders.
- PC configuration — `buildPc.apis.ts`; read/configuration UI in `src/components/buildPc/`.

## External API: event check-in

`src/apis/models/eventCheckin.apis.ts` supplies list/detail, create, update, single/bulk delete, Excel import, and UID check-in status/action. `useEventCheckin()` owns staff CRUD/filter/import/export UI; `src/app/(standalone)/su-kien-checkin/xac-nhan/page.tsx` calls `checkinEventGuest()` for confirmation. Payload/output types are `src/interfaces/models/IEventCheckin.interface.ts`.

## Mock/test-only APIs

None found. Backend endpoint behavior, validation, and authorization beyond client contracts are not verified.
