# 3D Printing Order Website

An MVP website for a local 3D printing service. The project combines public service pages, portfolio content, SEO, an admin area, and a local image upload pipeline prepared for later server deployment.

By [Elisey Kochura (lolpul)](https://github.com/lolpul) · [Engineering portfolio](https://elisey.kochura.com).

## Review in 30 seconds

The engineering question is how to connect content administration, validation, image processing and public pages in one application. Start with [server actions](src/app/admin/portfolio/actions.ts), [image storage](src/lib/storage.ts) and [authentication](src/lib/auth.ts); then inspect [validation tests](src/lib/validation.test.ts) and [verification](docs/verification.md).

This is a full-source MVP. The database-free local demo is verified; database/admin/upload integration and operational hardening still need separate validation. There is no GitHub Actions workflow in this repository.

## Live Demo

No public demo URL has been verified yet.

## Overview

The application helps customers understand available 3D printing services, browse portfolio examples, and contact the service owner with order details. It also includes an admin workflow for managing portfolio items, site settings, and uploaded images.

## My Role

I designed and implemented the web application structure, public pages, admin interface, server-side validation, Prisma data model, image processing flow, SEO metadata, and deployment-ready Docker setup.

## Key Features

- Public landing page for a 3D printing service
- Service detail pages for STL printing, sample-based manufacturing, 3D modeling, and small batch printing
- Portfolio listing and detail pages
- Admin authentication with an httpOnly cookie
- Portfolio management forms
- Site settings management
- Local image upload pipeline with MIME validation and Sharp processing
- SEO support with sitemap, robots.txt, canonical URLs, Open Graph metadata, and JSON-LD
- Docker and Docker Compose configuration for local/server deployment
- Health check API route

## Frontend Engineering

The frontend is built with the Next.js App Router and TypeScript. Public routes are organized around service pages, materials, FAQ, contacts, privacy, and portfolio content. Admin routes are separated under `/admin` and protected through server-side authentication checks.

Reusable components cover the site header and footer, breadcrumbs, contact buttons, portfolio cards, forms, confirmation buttons, analytics hooks, structured data, and placeholder images. Forms use Zod-backed validation on the server boundary. The UI is responsive and uses Tailwind CSS for layout, spacing, and typography.

## Architecture

```mermaid
flowchart LR
  Visitor[Website visitor] --> PublicPages[Next.js public pages]
  Admin[Admin user] --> AdminRoutes[Protected admin routes]
  PublicPages --> PortfolioData[Portfolio data access]
  AdminRoutes --> ServerActions[Server actions]
  ServerActions --> Validation[Zod validation]
  ServerActions --> Prisma[Prisma client]
  PortfolioData --> Prisma
  Prisma --> Postgres[(PostgreSQL)]
  ServerActions --> ImagePipeline[Image upload and Sharp processing]
  ImagePipeline --> LocalStorage[Local uploads directory]
  PublicPages --> SEO[SEO metadata, sitemap, robots, JSON-LD]
```

## Code highlights

- [Server validation](src/lib/validation.ts): Zod schemas bound content lengths, allowed publication states, slugs, settings, and image metadata. [Focused tests](src/lib/validation.test.ts) exercise valid states and rejected slugs.
- [Prisma-backed server actions](src/app/admin/portfolio/actions.ts): portfolio mutations check admin access and CSRF, validate form input, then persist through Prisma and revalidate affected pages. File storage and database updates are separate operations, not a distributed transaction.
- [Image processing](src/lib/storage.ts): [path-containment tests](src/lib/storage.test.ts) exercise accepted paths and rejected sibling/parent escapes. The implementation checks declared MIME type, byte size and detected content type, then uses Sharp to re-encode multiple WebP sizes. This is the actual local-upload implementation, not a third-party storage mock.
- [Admin authentication](src/lib/auth.ts): signed expiring session values, HttpOnly cookie settings, password verification, and CSRF checks support the admin boundary. [Session tests](src/lib/auth.test.ts) check valid and tampered signatures; they are not a full security audit.
- [SEO helpers](src/lib/seo.ts): builds canonical/Open Graph metadata and structured data from site settings. [Tests](src/lib/seo.test.ts) exercise the generated metadata and JSON-LD.

These links point to the existing public implementation; no separate showcase or copied source is required. Build and test evidence, including its date and limits, is recorded in [verification notes](docs/verification.md).

## Technology Stack

Frontend:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- lucide-react

Backend:

- Next.js server actions and route handlers
- Zod validation
- bcryptjs authentication helpers
- Sharp image processing

Database:

- PostgreSQL
- Prisma ORM

Infrastructure:

- Docker
- Docker Compose
- Example nginx reverse-proxy configuration

Testing and Tooling:

- Vitest
- ESLint
- TypeScript strict mode
- Prettier

## Engineering Challenges

- Built a split public/admin application without exposing admin pages to indexing.
- Added server-side validation for content and settings workflows.
- Designed an image upload path that validates MIME type, strips metadata through re-encoding, and creates multiple image sizes.
- Kept public pages usable in a demo/fallback mode while preserving a database-backed production path.
- Added SEO primitives without inventing fake ratings, reviews, or business metrics.

## Screenshots

Screenshots were captured from a local demo run using fictional contact data and fallback portfolio items.

| Home | Mobile Home |
| --- | --- |
| ![Desktop home page](docs/screenshots/home-desktop.png) | ![Mobile home page](docs/screenshots/home-mobile.png) |

| Portfolio | Order Contact Flow |
| --- | --- |
| ![Portfolio listing](docs/screenshots/portfolio-list.png) | ![Contact flow](docs/screenshots/contact-flow.png) |

| Service Flow |
| --- |
| ![Service order flow](docs/screenshots/service-order-flow.png) |

## Running Locally

Install dependencies:

```bash
npm ci
```

Create a local environment file from `.env.example` and fill in the required values:

```bash
cp .env.example .env
```

Run database migrations and seed data:

```bash
npm run db:migrate
npm run db:seed
```

Start the development server:

```bash
npm run dev
```

The local development URL is printed by Next.js in the terminal.

## Database-free demo

After `npm ci`, build and run with synthetic local settings. On Windows PowerShell:

```powershell
$env:SKIP_DB = "1"
$env:DATABASE_URL = "postgresql://demo:example@localhost:5432/demo"
$env:NEXT_TELEMETRY_DISABLED = "1"
npm.cmd run build
npm.cmd run start -- --hostname 127.0.0.1 --port 3000
```

POSIX shells:

```sh
SKIP_DB=1 DATABASE_URL=postgresql://demo:example@localhost:5432/demo npm run build
SKIP_DB=1 DATABASE_URL=postgresql://demo:example@localhost:5432/demo npm run start -- --hostname 127.0.0.1 --port 3000
```

Open `http://127.0.0.1:3000`. This uses fallback portfolio data; it does not test PostgreSQL or enable admin mutations. The existing screenshots describe a local fictional-data run, not a deployed business.

## Docker

```bash
docker compose up -d --build
docker compose exec app npx prisma migrate deploy
docker compose exec app npm run db:seed
```

The compose setup binds the application to the local machine by default and does not modify nginx, firewall, DNS, or system services.

## Testing

Detailed verification notes are available in [docs/verification.md](docs/verification.md).

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

For local demo builds without a database connection, use temporary environment variables such as `SKIP_DB=1` and a local placeholder `DATABASE_URL`. Do not commit real credentials.

## Deployment

This project is not a static GitHub Pages site. It uses server-side rendering, route handlers, server actions, Prisma, PostgreSQL, admin authentication, and image processing. A Node-capable host with database support is the correct deployment option.

## Security

Production credentials, user data, server addresses and private infrastructure configuration are intentionally excluded from this repository.

The public export must not include `.env`, upload contents, logs, local databases, build artifacts, private keys, production nginx/systemd files, or customer data.

## Project Status

MVP. Fresh checks passed on 2026-10-10: lint, typecheck, 21 unit tests, build and eight local pages at mobile width. See [dated verification](docs/verification.md) for commands and limits.

Before production use, remediate the dependency advisories recorded in verification, add database/admin/upload integration tests and CI, review authentication and symlink policy, and define recovery for partial file/database failure. Passing the current tests is not a security audit.

## Source and reuse

This repository already contains the full MVP source. No LICENSE file is currently provided; public source visibility does not itself grant an open-source reuse license. Deployment credentials, real customer data and private infrastructure are excluded. The project was prepared with AI assistance; the linked code and recorded checks are the reviewable evidence.
