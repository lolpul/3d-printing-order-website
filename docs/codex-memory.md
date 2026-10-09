# Project memory — v4, 2026-10-10

- Purpose: Full-source public Next.js/Prisma MVP; reproducible database-free local demo.
- Repository: https://github.com/lolpul/3d-printing-order-website, PUBLIC, main; containment branch storage-containment-2026-10-10. Use git log/PR for delivery SHA.
- Entry: README Review in 30 seconds → key implementation files/tests; existing architecture and deeper decisions retained.
- Run/test commands: README and [dated verification](verification.md), checked during this review.
- Verified: npm ci/lint/generate/typecheck/21 tests/build and 8 browser routes passed; no CI, no PostgreSQL/admin/upload/Docker rerun.
- Limits: MVP hardening/integration and CI remain pending. Full source already public; no LICENSE added and visibility unchanged.
- Changes: review navigation, honest maturity/validation wording, reproducible demonstration notes and this compact memory. Owner separately approved path.relative containment fix +5 regression tests; all21 tests/lint/typecheck/build passed. Workflows unchanged; docs PR previously corrected MVP metadata.
- Existing public portfolio integration was accepted 2026-10-02; no site deployment or production/network change in this review.
- IP: no private original files/history, configuration, identifiers or working data transferred. New code/visibility/license/history changes require separate owner decision.
- Backup: central ignored career-materials/.backups/github-review-20261010-015431 manifest; published-doc rollback via ordinary revert; unrelated files preserved.
- Next: use these source/test paths for interviews; address documented integration/security/rights gaps through separate scoped work.
- Patch: [portfolio review](patches/2026-10-10-portfolio-review.md).

- Current dependency audit:21 affected package entries (1 critical); minimal runtime/dev update candidate stays private until separately reviewed. Do not claim the historical zero audit result applies now.
- Approved fix is lexical containment; symlink/root trust policy and actual route exploitability are not established by these tests.
- Fix record: [storage containment](patches/2026-10-10-storage-containment.md); [scope](../docs/spec-storage-containment.md).
