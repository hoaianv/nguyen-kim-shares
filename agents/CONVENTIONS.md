# Conventions Observed

- **Imports:** TypeScript path alias `@/*` maps to `src/*` (`tsconfig.json`) and is used throughout.
- **Naming:** feature folders generally use camel/lowercase file names; React components/functions are PascalCase; hooks use `use*`; API modules use `<domain>.apis.ts`.
- **Routes:** App Router uses route groups, lowercase Vietnamese URL segments, and dynamic `[slug]`/`[id]` segments under `src/app/`.
- **API pattern:** server-action modules in `src/apis/` call the shared `api()` wrapper, source paths from constants, and type requests/responses from `src/interfaces/`.
- **Validation:** interactive forms use React Hook Form with Zod schemas (for example login/register).
- **State:** Zustand stores live in `src/stores/`; root data is hydrated with `src/init/` components rather than fetched independently by every client component.
- **UI/styling:** Tailwind utility classes, `cn()` from `src/lib/utils.ts`, shared primitives in `src/components/ui/`, `sonner` toasts, and dynamic imports for selected client-heavy sections.
- **Errors:** API consumers inspect response `status`/`errorCode`; client catches often show a toast and may `console.error`.

These are observed patterns, not newly imposed standards. There is no confirmed global formatter or logging framework.
