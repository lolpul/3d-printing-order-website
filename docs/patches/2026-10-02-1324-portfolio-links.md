# Author and portfolio links — 2026-10-02

## Intent and change

Connect this public project to Elisey Kochura's engineering profile. README now includes the author's name, GitHub handle/profile and portfolio home. The repository homepage is set to `https://elisey.kochura.com`. Project memory records the link policy.

Use the home page because this project has no dedicated portfolio case study. Keep the existing statement that no public project demo has been verified. Application code, deployment configuration and project visibility are unchanged.

## Verification

- Pre-change main: `8f9f5bb0fc2ef38433171640f3c1aabda7e7373c`; clean clone from the existing public repository.
- Review the documentation-only diff with `git diff --check` and `git diff -- README.md`.
- Verify portfolio/profile HTTPS responses, published README content, repository homepage and public visibility after push.
- No application tests required for these documentation/link changes; earlier application evidence remains in `../verification.md`.

## Rollback and limits

The earlier README and repository metadata were backed up locally before editing. Revert this focused commit and restore the previously empty GitHub homepage field. Do not alter application deployments or repository visibility. No deployment or search-indexing result is claimed.
