# Project memory ? v6, 2026-10-10

- Purpose: full-source public Next.js/Prisma MVP with a reproducible database-free local demo; no verified public application deployment.
- Repository: https://github.com/lolpul/3d-printing-order-website, PUBLIC. Dependency branch dependency-verification-2026-10-10; baseline fc38aa65183bb334e451d77dff5fde0a048b168a. Exact delivery through PR/Git log.
- Scope: owner explicitly authorised the prepared compatible dependency update and new CI, commit/push/PR and merge after successful hosted checks. Other repositories and production remain outside this task.
- Versions: Next/eslint-config-next 16.3.8, Sharp 0.35.5, Vitest 4.1.11, PostCSS override 8.5.23; compatible lockfile transitive updates; Prisma/client 6.19.3 unchanged. No forced fix, major override or downgrade.
- Local checks: fresh npm ci/generate, 21 tests including focused 5 containment tests, lint/typecheck/build pass. Eight loopback browser routes pass at390/1280px with no errors/overflow; health 200/database skipped. Details in verification.
- CI: .github/workflows/verify.yml on push/PR, Ubuntu/Node 24, pinned official actions, contents:read, no persisted checkout credentials, timeout 15min. Install/generate/lint/typecheck/test/build/critical audit; no deployment. Implementation8e7c9dc has successful push/PR workflows on Node24.21.0/npm11.19.0; receipts in verification.md, delivery via PR#3.
- Security: baseline 21 affected entries (1 critical) ?8 high/0 critical; omit-dev 3 high. Two root advisories: braces/glob tooling and deepmerge-ts/Prisma config; practical preconditions/inherited entries in dependency-security.md. Presence is not proven reachability; no zero-runtime-risk claim.
- Containment: src/lib/storage.ts and storage.test.ts unchanged from approved PR #2. Lexical path.relative boundary is covered by 5 tests; symlink policy and remote exploitability remain unproved.
- Not exercised: PostgreSQL migration/seed, authenticated admin/upload writes, Docker or production integration. Vitest future config-loader warning and npm/Prisma notices are retained; no production-ready claim.
- IP: no original private files/history, operational configuration, customer data or raw audit materials published. Visibility/licenses/history unchanged.
- Backups: local timestamped target manifest and original file/project-note snapshots outside Git. Rollback by ordinary reviewed revert, npm ci from restored lockfile, then checks; preserve user files and data.
- Entry/commands: README ? source/tests; verification.md documents fresh commands/results and historical receipts. Existing architecture and safe screenshots retained.
- Next: track remaining high advisories and validate DB/auth/upload/symlink integration in separately scoped work. This approved dependency/CI task stops after verified main delivery; exact merged SHA/status are in PR#3 and Actions.
- Records: [scope](spec-dependency-verification.md), [security](dependency-security.md), [verification](verification.md), [dependency patch](patches/2026-10-10-dependency-verification.md), [approved containment](patches/2026-10-10-storage-containment.md).

- Next.js regenerates next-env.d.ts with the root-params type import in this version; the generated refresh is included in the same patch and its original is backed up. Application/storage logic is unchanged.

- CI npm reports five existing unapproved install-script entries; all five versions/integrity hashes match baseline. No blanket approvals or config/suppression changes. Entry-point review and residual policy limits in verification.
