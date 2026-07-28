# Architecture

## Overall design

The repository is a single Next.js frontend. App Router server components fetch initial data through server-action API modules; client components manage interaction with hooks and Zustand. A separately hosted member API owns domain persistence.

```mermaid
flowchart LR
  Browser --> Middleware[src/middleware.ts]
  Middleware --> AppRouter[src/app routes/layouts]
  AppRouter --> Actions[src/apis server actions]
  Actions --> Wrapper[src/helpers/api.helper.ts]
  Wrapper --> MemberAPI[External member API]
  AppRouter --> Init[Initializers]
  Init --> Zustand[src/stores]
  Browser --> ClientUI[src/components + hooks]
  ClientUI --> Actions
  Browser --> Export[/api/export-participants]
  Export --> MemberAPI
```

## Startup and route boundary

`src/app/layout.tsx` is the global layout. It concurrently requests member, cart, advertising, support, footer config, and menu data, then hydrates Zustand via `src/init/*Initializer.tsx`. `(home)/layout.tsx` wraps normal pages with header/footer/support UI. `(standalone)` hosts check-in pages without that shell.

`src/app/(home)/[slug]/page.tsx` calls `findOne` and dispatches by `ESlug` to `Product`, `CategoryDetail`, `News`, or `Promotion`; its metadata comes from `getSlugMeta`.

## Authentication and authorization

`login()` and `handleGoogleCallback()` in `src/apis/common/auth.apis.ts` set the `token` httpOnly cookie; `logout()` deletes it. The shared `api()` wrapper sends it as `Authorization: Bearer ...`.

`src/middleware.ts` protects `/tai-khoan`, `/dat-hang`, `/gio-hang`, `/thanh-toan`, and `/su-kien-checkin`, except `/su-kien-checkin/xac-nhan`. It calls `checkToken()` before allowing cookie-bearing protected requests and clears invalid tokens. It redirects unauthenticated users to `/login?next=…`. Backend role authorization is **not confirmed**.

## Persistence, async work, and integrations

No local database, ORM, migration, queue, cron, websocket, or background-worker implementation is present. Persistent data is external API-owned. Browser-persisted PC configurations use Zustand `persist` under `build-pc-storage` in `src/stores/useBuildPc.ts`.

External integrations confirmed in source: member API, Google OAuth initiation/callback endpoints, Google Tag Manager components, Google Translate UI, and remote image hosts configured in `next.config.mjs`. Provider credentials/configuration are not confirmed.

## Errors and logging

The shared `api()` wrapper parses JSON but does not check `response.ok`, retry, or set an explicit timeout. UI hooks/forms generally inspect `status`/`errorCode`, show `sonner` toasts, and catch/log errors with `console.error`. `src/app/error.tsx` is the route error boundary. The export proxy explicitly maps non-OK/exception cases to JSON errors.
