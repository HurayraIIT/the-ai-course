<div align="center">

# 🎓 The AI Course — LMS

**One course for AI engineering, agents, and prompting — now a full LMS.**

Three [roadmap.sh](https://roadmap.sh) roadmaps — [AI Engineer](https://roadmap.sh/ai-engineer) · [AI Agents](https://roadmap.sh/ai-agents) · [Prompt Engineering](https://roadmap.sh/prompt-engineering) — merged into a single, deduplicated, logically-ordered curriculum.

**240 lessons · 17 modules · 745+ curated resources**

![React](https://img.shields.io/badge/React_19-087EA4?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38BDF8?logo=tailwindcss&logoColor=white)
![PHP](https://img.shields.io/badge/PHP_8.2+-777BB4?logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL_8-4479A1?logo=mysql&logoColor=white)

*Accounts · sequential lesson unlocking · leaderboard · comments · admin panel*

</div>

---

## Stack

- **Frontend**: React 19 SPA (Vite, Tailwind CSS v4, react-router), built into `public/`
- **Backend**: vanilla PHP 8.2+ JSON API (`/api/*`), single front controller, session-cookie auth
- **Database**: MySQL 8 (PDO, prepared statements everywhere)
- **Email**: PHPMailer with main + fallback SMTP profiles

## Features

- Register / login / logout / forgot + reset password (email verification schema-ready, not enforced yet)
- Fully linear course: lesson N unlocks only when lessons 1..N−1 are complete; a lesson completes when all its resources are marked read (zero-resource lessons get a "Mark as complete" button)
- Guests see the curriculum outline (titles + lock icons) only — no lesson content
- Global leaderboard (Gravatar avatar + username), ranked by completed lessons, ties broken by who got there first; users can opt out in Settings
- Flat comments per lesson with 👍/👎 reactions
- Admin panel: user list/search, per-user progress with completion dates, profile editing, password/progress resets, user deletion, basic analytics
- Security: CSRF tokens on all mutations, rate-limited auth endpoints, `password_hash`, hashed single-use reset tokens, no account enumeration, server-side authorization on every route
- Accessibility: skip link, focus management on route change, labeled inputs with `aria-live` errors, `aria-pressed` toggles, locked items announced to screen readers

## Local setup

Requirements: PHP 8.2+, Composer, Node 22+, MySQL 8.

```bash
composer install
npm install
cp .env.example .env          # fill in DB_* (and SMTP_* for real email)

php scripts/migrate.php       # creates DB, applies schema, seeds admin user
php scripts/seed.php          # imports 240 lessons from src/content/topics

npm run build                 # builds the SPA into public/
php -S localhost:8000 -t public scripts/dev-router.php
```

Open http://localhost:8000. For frontend development with hot reload, additionally run `npm run dev` (Vite on :5173, proxying `/api` to :8000).

Seeded admin: `hurayraiit+admin@gmail.com` / `Pass1234@@` — **change this password immediately in production.**

With `MAIL_DRIVER=log` (default), password-reset emails are appended to `storage/mail.log` instead of being sent. Set `MAIL_DRIVER=smtp` and the `SMTP_MAIN_*` / `SMTP_FALLBACK_*` variables for real delivery (main is tried first, fallback on failure).

## Tests

```bash
php tests/api/run-all.php     # 81 checks against a disposable test DB on :8001
```

Covers auth (validation, duplicates, CSRF, rate limits), the reset flow (token single-use), progress (locking, skip-ahead rejection, auto-completion), comments/reactions, leaderboard (tie-break, opt-out), and every admin route (including 403s for non-admins).

## Deploying (xCloud / nginx + PHP-FPM)

1. Point the site's web root at `public/`.
2. Standard `try_files $uri $uri/ /index.php?$args` (xCloud default) is all that's needed — `public/index.php` dispatches `/api/*` and serves the SPA for everything else.
3. Create `.env` from `.env.example` with production DB + SMTP credentials (never commit it).
4. Run `composer install --no-dev`, `php scripts/migrate.php`, `php scripts/seed.php`.
5. Build the frontend (`npm ci && npm run build`) locally or in CI and deploy the resulting `public/` — the server doesn't need Node.

## Content pipeline

Lesson content lives as markdown in `src/content/topics/` (JSON frontmatter) with ordering in `src/data/curriculum.ts`. To change content:

```bash
npm run export:curriculum > database/curriculum.json   # if curriculum.ts changed
php scripts/seed.php                                   # refuses if user progress exists; --force to override
```
