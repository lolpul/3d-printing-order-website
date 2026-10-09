# Upload path containment

Goal: safeUploadPath must reject paths outside the configured upload root, including an absolute sibling sharing its textual prefix. Preserve valid relative and absolute paths inside the root.

Scope: one helper and five regression tests. Use path.resolve plus path.relative; reject parent/cross-root results. This is lexical path containment, not symlink resolution or an image/database transaction redesign.

Acceptance: original implementation fails three negative cases; candidate passes all five new cases and16 existing tests. Lint, typecheck and build must pass before scoped PR publication. No file writes, credentials, real uploads or production/database actions are required for the path tests.

Owner separately approved public publication through PR on2026-10-10. Backup/rollback manifest is retained in the private ignored career-materials backup directory; normal revert suffices.
