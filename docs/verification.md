# Verification

## Dependency update ? 2026-10-10

Fresh isolated checkout, Windows/Node 24.15.0/npm 11.12.1, updated lockfile, no copied .env or production settings. Synthetic SKIP_DB=1 and placeholder loopback DATABASE_URL only.

| Check | Observed result |
| --- | --- |
| npm ci | Clean install completed; 8 known high advisories remain |
| npm run db:generate | Prisma Client 6.19.3 generated |
| npm test -- src/lib/storage.test.ts | All 5 containment regressions passed |
| npm test | 6 files / 21 tests passed |
| npm run lint / npm run typecheck | Passed |
| npm run build | Next.js 16.3.8 production build completed |
| npm audit --audit-level=critical | Exit 0; no critical entries |
| npm audit / npm audit --omit=dev | 8 high / 3 high; default audit is nonzero |
| Built loopback server | Started and stopped as a local smoke process |
| Chromium at 390/1280px | Eight routes at each width: HTTP200, no page/console errors or horizontal overflow |
| GET /api/health | HTTP200, database explicitly skipped |

Routes: /, /services, /portfolio, /contacts, /faq, /materials, /privacy, /admin (login only). Mobile/desktop screenshot viewports visually inspected. These are one-off acceptance checks, not a new automated browser suite. Storage implementation and its five tests are unchanged from fc38aa6; the focused run confirms the existing fix remains effective after dependency updates.

Warnings retained: Vitest reports future native config-loader incompatibility with the current ESM/CommonJS configuration; npm advertises a new major release; Prisma advertises a major prerelease upgrade; Next reports experimental serverActions. No major upgrade or warning suppression was performed. The earlier prototype generated-CSS warning was not reproduced in this fresh local build. Actual hosted notices and their review are recorded below.

PostgreSQL migrations/seed, authenticated admin writes, image upload/processing integration, Docker build and production were **not tested**. Fallback success is not durable DB evidence or proof of secure administrator access. [All remaining advisories and exposure assessment](dependency-security.md), [scope](spec-dependency-verification.md) and [patch/rollback](patches/2026-10-10-dependency-verification.md).

[GitHub Actions workflow](../.github/workflows/verify.yml) uses Ubuntu/Node 24 and a critical-only audit gate. The local results above are separate from the actual hosted receipts below.

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

At the containment baseline fc38aa6, no Actions workflow was present. PostgreSQL migration/seed, admin writes, authenticated image upload, Docker build and production integration were **not rerun**. Authentication, storage boundary hardening and database/file consistency need further tests before production. Full public source history was scanned with redacted Gitleaks; automated scans are not a guarantee or a full security audit.

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

## Hosted CI acceptance ? 2026-10-10

Implementation commit `8e7c9dc81c0dbadf31e5d3ec3b7e38986f00e93d`, [PR #3](https://github.com/lolpul/3d-printing-order-website/pull/3):

- [Pull-request workflow](https://github.com/lolpul/3d-printing-order-website/actions/runs/38031226376): SUCCESS.
- [Push workflow](https://github.com/lolpul/3d-printing-order-website/actions/runs/38031225921): SUCCESS.

Ubuntu runner, Node24.21.0/npm11.19.0. All required steps completed successfully: clean install, Prisma generation, ESLint, TypeScript, 21 unit tests, production build and critical audit. Logs retain the same eight high entries and zero critical; no new dependency advisory was introduced. The documentation-only acceptance follow-up retains the implementation/lockfile/workflow; current PR/main results remain visible in the linked workflow.

CI additionally reports install-script approval warnings for @prisma/client6.19.3, @prisma/engines6.19.3, esbuild0.28.1, prisma6.19.3 and unrs-resolver1.12.2. Their versions and registry integrity hashes are identical to the fc38aa6 baseline. Selected entrypoints were inspected: client generation, engine/native binary preparation and CLI environment checks are existing tooling behavior. This is a bounded review, not a complete package/supply-chain audit. No blanket approvals, user npm configuration changes or warning suppression were added. Review a version-pinned script policy as separate maintenance work; the actual current install/generation/tests/build pass.

Vitest's future config-loader warning, Prisma major-upgrade notice, Next experimental banner and npm's high-advisory/script-policy messages remain visible. No production deployment, PostgreSQL or authenticated upload/admin acceptance follows from this CI result.
