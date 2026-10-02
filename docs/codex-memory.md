# Project memory — v2, 2026-10-02

- Purpose: MVP website for a local 3D-printing service; public source at https://github.com/lolpul/3d-printing-order-website, `origin`, branch `main`.
- Architecture: Next.js App Router and TypeScript, public/admin pages, Prisma/PostgreSQL, server validation and image uploads. See README and `docs/verification.md` for existing implementation/verification details.
- Documentation baseline: `8f9f5bb0fc2ef38433171640f3c1aabda7e7373c`.
- Current change: README credits Elisey Kochura (`lolpul`) and links https://elisey.kochura.com. Repository homepage uses the same portfolio URL. There is no matching portfolio case study and no verified project demo; do not imply either exists.
- Future public project descriptions should preserve an author/profile link and link to a verified matching case study when one exists; otherwise use the portfolio home.
- Verification for this patch: focused documentation diff, author/portfolio HTTPS responses and public GitHub README/homepage checks. No application code changed or application tests rerun.
- Existing development commands: `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`. Environment/setup guidance remains in README; never commit actual credentials, uploads or local databases.
- Rollback: revert the focused documentation commit and restore the previously empty repository homepage. A timestamped local snapshot of the earlier README and metadata is retained outside this public repository.
- Latest change: README Code highlights points to validation, Prisma server actions, Sharp image processing, authentication, and SEO implementation, with focused test links and explicit verification limits. MVP wording retained; no separate source showcase created.
- Verified: each claim against current implementation/test source, Markdown targets against the tracked tree, and documentation diff/whitespace. Application code unchanged; historical build/test evidence in verification.md was not rerun for this documentation patch. No CI workflow exists in this repository at this stage.
- Records: [portfolio links](patches/2026-10-02-1324-portfolio-links.md), [code highlights](patches/2026-10-02-code-highlights.md). Next: profile Additional public code link; maintain factual MVP status. Deployment remains separate scope.
