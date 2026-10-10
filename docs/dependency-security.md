# Dependency security — 2026-10-10

This is a dated dependency assessment for the reviewed lockfile, not a complete security audit or production-readiness claim. [Machine-readable package/advisory receipt](dependency-security.json) lists all remaining entries and the package entries removed from the baseline audit.

## Compatible update

| Package | Before | After |
| --- | --- | --- |
| next / eslint-config-next | 16.2.10 | 16.3.8 |
| sharp | 0.35.3 | 0.35.5 |
| vitest | 4.1.10 | 4.1.11 |
| postcss override | 8.5.20 | 8.5.23 |

The reviewed lockfile also updates compatible transitive packages. Prisma/client remain 6.19.3. No forced audit fix, framework/Prisma downgrade or major override was applied.

Fresh baseline: **21 affected package entries: 1 critical, 14 high, 6 moderate**. Updated lockfile: **8 high, 0 critical, 0 moderate**. These are package-entry counts, including inherited dependency chains, not counts of distinct CVEs. The remaining eight entries represent two underlying advisories.

The update removes the Next.js critical advisory for RCE on Windows-hosted affected applications. The project's App Router and local Windows verification make upgrading relevant; no exploit or production host assessment was performed. The selected version exceeds the fixed 16.3.3 version in the [upstream Next.js advisory](https://github.com/vercel/next.js/security/advisories/GHSA-p293-qw3h-jr36).

Next.js, Sharp, Vitest/mocker, PostCSS and compatible transitive entries no longer appear as affected in this audit. This is an observed lockfile result, not proof that every library input path is safe. Sharp's SVG dependency advisory is also removed by the updated binaries; the application's existing upload checks accept JPEG/PNG/WebP and reject SVG before decoding. Authenticated upload integration was not exercised.

## All remaining high entries

| Installed package | Version | Advisory/dependency path | Practical exposure in this repository |
| --- | --- | --- | --- |
| braces | 3.0.3 | GHSA-vfj7-8cjw-p6xm | Deeply nested attacker-supplied glob patterns can exhaust the stack; used through ESLint tooling |
| micromatch | 4.0.8 | inherits braces | Same glob-input precondition through pattern matching |
| fast-glob | 3.3.1 | inherits micromatch → braces | Same chain used by Next ESLint plugin |
| @next/eslint-plugin-next | 16.3.8 | inherits fast-glob | Build/lint tooling reads checked-out project files/configuration |
| eslint-config-next | 16.3.8 | inherits Next ESLint plugin | Explicit development dependency loaded by eslint.config.mjs |
| deepmerge-ts | 7.1.5 | GHSA-ggr8-5vv4-36mx | Recursive JavaScript object graphs can exhaust stack during config merging |
| @prisma/config | 6.19.3 | inherits deepmerge-ts | Prisma configuration/CLI boundary; no application request import found |
| prisma | 6.19.3 | inherits @prisma/config | CLI generation/migration tooling; retained as an optional peer of @prisma/client |

For the glob chain, the checked application source does not import these APIs or accept arbitrary request globs. This lowers the demonstrated request-path exposure; it does not establish non-exploitability. Malicious checked-out source/configuration can still affect tooling. Keep CI unprivileged and timeout-limited. The [upstream braces issue](https://github.com/micromatch/braces/issues/70) describes the recursion problem; the [reviewed advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) currently lists no patched braces version.

For the Prisma chain, the app imports the generated Prisma client. No prisma.config.ts or direct deepmerge/config import is present in application source. The [upstream deepmerge-ts advisory](https://github.com/RebeccaStevens/deepmerge-ts/security/advisories/GHSA-ggr8-5vv4-36mx) requires recursive object graphs; ordinary JSON alone cannot represent that input. Remote applicability was not established. Upstream's fix starts at major version 8; substituting it under Prisma without compatibility checks is outside this patch.

**`npm audit --omit=dev` still reports three high entries**: Prisma, @prisma/config and deepmerge-ts. Lockfile/explain evidence shows Prisma's development dependency plus @prisma/client's optional CLI peer; do not describe the remaining result as development-only or zero runtime risk. The existing Dockerfile copies the complete node_modules tree into the runner, so dependency presence must not be confused with demonstrated reachability. Docker was not built in this task.

npm suggests downgrading eslint-config-next to 14.2.35 and Prisma to 6.12.0 to clear the chains. Those suggestions were not applied. Any future major/downgrade/config change needs a focused compatibility and integration review.

## CI gate and follow-up

[Verify MVP workflow](../.github/workflows/verify.yml) runs npm ci, Prisma generation, ESLint, TypeScript, 21 unit tests, production build and `npm audit --audit-level=critical` on Ubuntu/Node24 with synthetic fallback settings. It uses pinned official actions, only contents:read, no persisted checkout credentials, no deployment step and a 15-minute timeout.

The [npm audit threshold](https://docs.npmjs.com/cli/v11/commands/npm-audit/) controls failure severity. Plain `npm audit` remains nonzero due to the known high entries; the critical gate exits zero for this snapshot. It does not suppress or approve high findings, and a new critical entry will fail CI.

Follow-up: track upstream fixes, validate a compatible Prisma/config migration, and test PostgreSQL/authenticated uploads and file/database recovery separately. Keep the existing lexical safeUploadPath fix; symlink policy and real upload exploitability are outside its unit-test proof. No deployment, production configuration or visibility change is included.

## Install-script policy notices

The actual successful CI uses Node24.21.0/npm11.19.0 and reports five unreviewed allowScripts entries for existing Prisma/client/engines, esbuild and unrs-resolver packages. All five version/integrity pairs match the pre-update lockfile, so these are not newly introduced packages or replaced artifacts. Their selected installation entrypoints were inspected; native preparation/client generation and environment checks remain existing behavior. No blanket allowlist or global npm policy change is included. Keep the warning visible and review future version-pinned script approvals independently. [Hosted receipts and limits](verification.md#hosted-ci-acceptance--2026-10-10).
