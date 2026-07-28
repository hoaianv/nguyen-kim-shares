# Testing and Quality

## Confirmed tooling

- ESLint: `.eslintrc.json` extends `next/core-web-vitals`; command is `npm run lint`.
- TypeScript: `tsconfig.json` has `strict: true` and `noEmit: true`, but no `typecheck` script exists.
- Formatting: no Prettier config or formatting script found.
- Automated unit/integration/E2E test framework and test directories: not found.

## Validation checklist

- Verify changed imports, TypeScript interfaces, and API path/method/payload coherence.
- Run `npm run lint` for source changes when the local toolchain supports it.
- Run `npm run build` for routing/layout/config changes when time and backend availability allow.
- For auth/cart/checkout/check-in changes, manually verify the success and failure paths only against an approved non-production context.
- Recheck protected-route behavior if middleware, token handling, or protected pages changed.

## Known coverage gaps

No committed automated tests were found for authentication, cart calculations, quote sequencing, checkout, slug dispatch, or check-in mutations. Do not claim those workflows pass without a real executed check.
