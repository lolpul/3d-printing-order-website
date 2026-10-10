# Dependency security and CI — 2026-10-10

Goal: remove critical dependency advisories through the approved compatible update while preserving the MVP and the existing upload-containment fix.

Baseline: `fc38aa65183bb334e451d77dff5fde0a048b168a`. The owner explicitly approved this dependency/CI patch, scoped commit/PR and merge after successful checks. Current main and local changes must be checked again before merging.

1. Apply the reviewed Next.js/eslint-config-next, Sharp, Vitest, PostCSS and compatible lockfile updates. Verify the patch against current main and keep storage implementation/tests unchanged. No forced audit fix, major override or downgrade.
2. Add CI on push/PR with read-only contents permission, pinned official actions, Node24 and synthetic database-free settings. Require npm ci, Prisma generation, lint, TypeScript, unit tests, production build and a critical-advisory audit gate. No deployment step.
3. Run a fresh local install and all checks, explicitly exercise the five safeUploadPath regressions, start the built fallback on loopback and smoke-test public pages. Record audit entries, practical exposure, warnings and checks not performed.
4. Publish a scoped PR, inspect successful hosted CI, merge only after mandatory checks pass, then verify main SHA/tree and its workflow. Update this repository's documentation/memory and its existing Obsidian note. Stop after this project.

Acceptance: zero critical audit entries; unchanged containment implementation with passing regressions; all local checks and actual hosted CI successful; remaining advisories and warnings documented. PostgreSQL, authenticated admin/upload, Docker or production behavior must not be claimed unless actually tested.

Rollback: timestamped baseline manifest and local file/note backups. Revert the focused commit or merge with a new reviewed commit; reinstall from the reverted lockfile and rerun checks. Do not reset, force-push, rewrite history, delete user data or change production/access.

- Next.js regenerates next-env.d.ts with the root-params type import in this version; the generated refresh is included in the same patch and its original is backed up. Application/storage logic is unchanged.
