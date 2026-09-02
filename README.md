# Myric AI website

The company website for Myric AI, a post-click growth studio for e-commerce brands. The site connects a focused marketing narrative with a multi-step Growth Audit lead flow.

## Local development

1. Install dependencies with `bun install`.
2. Copy `.env.example` to `.env` and add the Supabase project values.
3. Run `bun run dev`.

## Quality checks

- `bun run lint`
- `bun run typecheck`
- `bun run build`

## Production configuration

Set `SITE_URL` to the canonical production origin, without a trailing slash. Configure the Supabase values listed in `.env.example` in the deployment environment. The sitemap derives its origin from the incoming request.

Before publishing, confirm the booking URL, business contact details and legal wording for the company’s jurisdiction.

## Main routes

- `/` — company narrative and Growth Audit invitation
- `/growth-audit` — qualified lead form
- `/thank-you` — confirmation and booking step
- `/privacy` and `/terms` — legal information
- `/sitemap.xml` — dynamic sitemap
