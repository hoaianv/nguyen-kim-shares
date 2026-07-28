# Development Guide

## Requirements and installation

The committed lockfile is npm (`package-lock.json`), so use a compatible Node.js/npm installation and run `npm ci`. Exact Node/npm versions are not pinned in `package.json`; **TODO: confirm with maintainers/hosting environment**.

## Commands

- `npm run dev`: starts Next development server on port 4002.
- `npm run build`: builds Next production output.
- `npm run start`: sets production mode and runs `server.js`, which listens on port 6868.
- `npm run lint`: invokes `next lint`.

PM2 deployment configuration is in `ecosystem.config.js` (`nkcgroup`, `server.js`, production environment). The actual deployment pipeline is not present. Do not infer the default README port; it is stale relative to `package.json`.

## Environment and services

No `process.env.*` usage or `.env.example` file was found. The external API base is a source constant, not an environment variable. Do not create or change `.env` files without an explicit, reviewed configuration change.

No local database setup exists in this repository. API-backed flows require reachable backend services and valid session state; do not exercise write/delete/import endpoints against real data without authorization.

## Safe development sequence

1. Read the focused `agents/` document and inspect affected types/API consumer.
2. Make the smallest scoped code change.
3. Run `npm run lint` when feasible; build or manually exercise the changed route when risk warrants it.
4. Report executed checks and any skipped backend-dependent validation.
