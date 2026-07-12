# The AI Course — LMS

React SPA (Vite + Tailwind v4) + vanilla PHP JSON API + MySQL.

## Development

- Backend: `php -S localhost:8000 -t public scripts/dev-router.php`
- Frontend dev: `npm run dev` (Vite on :5173, proxies /api to :8000)
- Frontend build: `npm run build` (outputs into `public/`)
- DB setup: `php scripts/migrate.php` then `php scripts/seed.php`
- API tests: `php tests/api/run-all.php` (needs backend running)

## Layout

- `public/` — web root; `index.php` front controller (API dispatch + SPA fallback)
- `app/` — PHP source: bootstrap, db, http, auth, mailer, ratelimit, routes, `handlers/`
- `frontend/` — Vite root, React SPA source
- `database/schema.sql` — schema; `database/curriculum.json` — committed curriculum export
- `src/content/topics/` + `src/data/curriculum.ts` — lesson seed sources (markdown, JSON frontmatter)

## Conventions

- All SQL via PDO prepared statements; all state-changing requests require `X-CSRF-Token` header (token from `GET /api/me`)
- Auth levels per route: public / user / admin, enforced server-side in `app/routes.php`
- Copy `.env.example` to `.env`; `MAIL_DRIVER=log` writes to `storage/mail.log`
