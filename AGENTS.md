<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Stack

- **Next.js 16** (App Router, Server Components, Server Actions)
- **React 19**, **TypeScript** (strict)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — no `tailwind.config.*` file; theme lives in `src/app/globals.css`
- **shadcn v4 "base-nova"** style — UI primitives use `@base-ui/react`, NOT Radix. See `components.json`.
- **Zod v4** — uses `z.email()`, not `z.string().email()`
- **@tanstack/react-form** for all forms
- **sonner** for toasts (global `<Toaster>` in root layout)
- **js-cookie** for client-side token storage
- Images served from Cloudinary (`res.cloudinary.com` whitelisted in `next.config.ts`)

## Commands

```bash
npm run dev        # start dev server (port 3000)
npm run build      # production build
npm run lint       # eslint (flat config, core-web-vitals + typescript)
```

No test framework, no formatter config, no CI pipelines.

## Path alias

`@/*` maps to `./src/*` (configured in `tsconfig.json`).

## Project structure

```
src/
  app/           # App Router pages — mostly Server Components
  components/    # ui/ (shadcn primitives + Navbar), auth/, booking/, event/
  actions/       # 'use server' — thin wrappers forwarding to service layer
  service/       # API call layer — auth/ (client-side), bookings/ + event/ (server-side)
  types/         # Shared types (types.ts)
  utils/         # Data formatting helpers
  lib/           # Just utils.ts (cn helper)
```

## Env vars

| Variable | Scope | Purpose |
|---|---|---|
| `BASE_API` | Server-only | Backend API base URL |
| `NEXT_PUBLIC_BASE_API` | Client + server | Same URL, used by client-side auth calls |

Both point to the same backend. The `.env` file exists; commit it without secrets.

## Data fetching pattern

- Most pages are **async Server Components** that call service functions directly (`src/service/`).
- Server Actions (`src/actions/`) are used by client components that need to mutate (forms).
- Every server-side fetch uses `cache: 'no-store'` — no ISR or static caching.
- There are **no API routes** (`src/app/api/` does not exist). The app is a frontend to an external backend.

## Auth

- Token stored as cookie via `js-cookie` (client-side, `secure: true`, `sameSite: 'none'`).
- Server reads token via `cookies()` from `next/headers`.
- No middleware for route protection — auth-required pages rely on the API returning an error, then `<Unauthorize>` component redirects client-side.
- **Gotcha**: `secure: true` + `sameSite: 'none'` requires HTTPS. Auth may silently fail in local dev over HTTP.

## Key conventions

- shadcn components live in `src/components/ui/`. Add new primitives there following existing patterns (CVA variants, Tailwind classes, `@base-ui/react` primitives).
- Forms: `@tanstack/react-form` `useForm` + Zod schema + `toast.loading`/`toast.success` via sonner.
- Server actions are thin: they validate, then delegate to `service/` functions. Client components call them directly.
- All date formatting hardcodes `timeZone: 'Asia/Dhaka'` — duplicated in `src/utils/dataUtils.ts` and individual card components.

## Known issues (don't repeat these)

- `@tanstack/react-query` is in `package.json` but **never imported or used** anywhere.
- Navbar polls auth state via `setInterval` every 500ms (checks both cookie and localStorage).
- Footer links to non-existent routes (`/tickets`, `/about`, `/faq`, `/contact`, `/terms`).
- `EventCard` and `MyEventCard` duplicate the same `formatEventTime` logic instead of using the shared util.
- `my-events/update/page.tsx` renders `null` (empty placeholder).
