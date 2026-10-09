# Upload path containment ? 2026-10-10

Problem: safeUploadPath accepted an absolute sibling of the upload directory when both paths shared a textual prefix. Leading parent segments were also stripped rather than rejected. No remote exploitation or file read/write was attempted.

Change: resolve against one upload root; use path.relative to reject parent/cross-root results. Preserve valid relative and absolute paths inside the root. Five tests cover the boundary; source is src/lib/storage.ts and src/lib/storage.test.ts. This is lexical containment and does not resolve symlinks.

Owner explicitly approved publication through a separate PR in the current task. Backup/manifest retained in private ignored career-materials/.backups/3d-storage-containment-20261010-020841. Rollback is an ordinary revert of this focused commit.

Verification: original helper3 negative tests fail/2 valid cases pass; fixed full suite21 PASS. Prisma generation, typecheck, lint and Next build passed. Initial linked-node_modules setup failed Turbopack's root check; direct local npm ci corrected the environment. Existing dynamic filesystem tracing warning remains non-blocking. No real database, authenticated upload, production, network configuration or hardware was touched.

Fresh npm audit reports21 affected packages including1 critical runtime advisory; this fix does not claim dependency remediation or production readiness. Separate dependency candidate and DB/admin/upload/CI/symlink-policy work remain follow-up. README, dated verification and memory updated accordingly.
