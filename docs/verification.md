# Verification

## Fresh verification — 2026-10-10

Windows, Node.js 24.15.0, repository lockfile; synthetic loopback settings with `SKIP_DB=1` and placeholder `DATABASE_URL`. No production credentials or real database were used.

| Check | Observed result |
| --- | --- |
| `npm ci` | Completed; transient tarball retries recovered |
| `npm run lint` | Passed |
| `npm run db:generate` | Passed |
| `npm run typecheck` | Passed |
| `npm test` | Before containment fix:5 files/16 tests; after approved fix:6 files/21 tests passed |
| `npm run build` | Next.js build completed |
| `npm run start -- --hostname 127.0.0.1 --port 3000` | Actual start checked on an unused loopback port |
| Chromium mobile smoke | Eight routes returned 200, no page errors or horizontal overflow at 390px |

Browser routes: `/`, `/services`, `/portfolio`, `/contacts`, `/faq`, `/materials`, `/privacy`, `/admin` (login only). This was a one-off acceptance check, not a new repository test suite. Existing screenshots remain from the previously recorded fictional-data demo.

No Actions workflow is present. PostgreSQL migration/seed, admin writes, authenticated image upload, Docker build and production integration were **not rerun**. Authentication, storage boundary hardening and database/file consistency need further tests before production. Full public source history was scanned with redacted Gitleaks; automated scans are not a guarantee or a full security audit.

Reproduce the README database-free demo and the commands above. Do not use local fallback success as evidence of durable storage or configured administrator access.

## Historical verification — 2026-07-21

Date: 2026-07-21

## Environment

- OS: Windows
- Node.js: local Windows installation
- Package manager: npm
- Database during build verification: skipped with `SKIP_DB=1` and a local placeholder `DATABASE_URL`

No production credentials were used for verification.

## Checks

| Check | Result | Notes |
| --- | --- | --- |
| `npm ci` | Passed | npm audit reported 0 vulnerabilities. |
| `npm run lint` | Passed | ESLint completed successfully. |
| `npm run db:generate` | Passed | Prisma Client generated successfully. |
| `npm run typecheck` | Passed | TypeScript completed successfully. |
| `npm run test` | Passed | 5 test files, 16 tests. |
| `npm run build` | Passed | Completed with safe local env variables. |
| Gitleaks filesystem scan | Passed | No leaks detected in the cleaned publishable tree. |
| TruffleHog scan | Not run | Installation/download was unavailable in this environment; see final report. |
| Extended `rg` audit | Passed with reviewed expected matches | Matches were limited to local placeholders, documented environment variable names, test values, and `randomUUID` usage. |

## Build Notes

The application uses server actions, route handlers, Prisma, image processing, and dynamic admin routes. It is not a static GitHub Pages application. A Node-capable host with PostgreSQL support is the appropriate deployment target.

Next.js/Turbopack currently emits a non-blocking warning about dynamic filesystem tracing through the upload storage route. The build exits successfully.
