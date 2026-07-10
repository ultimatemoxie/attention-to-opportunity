
# Myric AI — Marketing Site Build Plan

## Scope
Build the full site in one pass: all 6 routes, premium modern-tech design system, lead capture backed by Lovable Cloud, SEO baseline, and legal placeholders you can edit.

## Design system
- **Palette (tokens in `src/styles.css`, oklch)**: deep navy background, near-black surfaces, white/light-grey text, electric blue primary, subtle cyan accent, restrained gradients.
- **Type**: Sora for headings, Inter for body (loaded via `<link>` in `__root.tsx` head, then registered in `@theme` as `--font-display` / `--font-sans`).
- **Motion**: framer-motion for one hero reveal + subtle section fades. No neon, no robot/brain imagery, no stock photos.
- **Texture**: subtle grid background, connected-node diagram illustration in hero, controlled linear gradients on CTAs and section dividers.

## Routes & sections

**`/` Homepage**
- Sticky nav (logo, links: How it works, Services, Growth Audit CTA)
- Hero: headline "Turn online attention into qualified leads", subhead, primary CTA "Request a Growth Audit" → `/growth-audit`, secondary "See How It Works" → anchor
- Three-service band: AI Content · Conversion Sites · CRM & Automation (connected-system diagram)
- How It Works (4 steps)
- Who it's for (audience qualifiers)
- Outcomes strip (qualified leads / booked appointments / structured pipeline)
- FAQ (6 items)
- Final CTA band → Growth Audit
- Footer (nav, legal, contact)

**`/growth-audit`**
- Focused header, no distractions
- Value bullets + form: name, business, website, email, phone, monthly revenue range, biggest bottleneck (textarea), consent checkbox
- Zod validation, inline errors, submitting state
- On submit: insert into Cloud `leads` table with captured UTM params (source/medium/campaign/term/content) + referrer + landing page → navigate to `/thank-you`

**`/thank-you`**
- Confirmation, next-step instructions
- "Book your call" button linking to external booking URL (placeholder `https://cal.com/myric` — you can swap it later or ask me to embed Calendly)
- Secondary link back home

**`/privacy`, `/terms`** — clean typographic templates with editable placeholder copy tailored to a UK-style service business.

**`/404`** — already handled by root `notFoundComponent`; I'll restyle it to match the brand.

## Data & backend (Lovable Cloud)
- Enable Cloud.
- Table `public.leads`: id, created_at, name, business, website, email, phone, revenue_range, bottleneck, consent, utm_source, utm_medium, utm_campaign, utm_term, utm_content, referrer, landing_path.
- GRANTs: `INSERT` to `anon` + `authenticated`; no SELECT to anon (leads are private). `ALL` to `service_role`. RLS enabled with an INSERT-only policy `WITH CHECK (true)`.
- Submission via a `createServerFn` that validates with zod and inserts using the server publishable client (respects the anon INSERT policy).
- UTM capture: small hook reads `window.location.search` on mount of `/growth-audit`, persists to sessionStorage so cross-page navigation preserves attribution.

## SEO & metadata
- Per-route `head()` with unique title, description, og:title, og:description, og:url, canonical (relative paths — no domain set yet).
- Root sets viewport, charset, og:type=website, og:site_name=Myric AI, twitter:card.
- JSON-LD Organization on `__root.tsx`; Service schema on `/growth-audit`.
- `public/robots.txt` (Allow: /), `src/routes/sitemap[.]xml.ts` with all public routes.
- Privacy/terms carry `noindex`? No — indexable. `/thank-you` gets `noindex`.

## Analytics events
- Lightweight `trackEvent` helper writing to `window.dataLayer` (safe no-op if absent) so you can wire GA4/Plausible later. Events: `cta_click`, `form_start`, `form_submit`, `form_error`.

## Technical details
- New files: route files, `src/components/site/` (Nav, Footer, Hero, ServiceCard, StepList, FAQ, CTASection, GridBackground, ConnectedDiagram), `src/lib/utm.ts`, `src/lib/analytics.ts`, `src/lib/leads.functions.ts` (createServerFn), Cloud migration for `leads`.
- Update `__root.tsx`: real metadata, font `<link>` tags, remove "Lovable App" defaults.
- Update `src/styles.css`: new tokens (`--font-display`, `--font-sans`, refined navy/electric-blue palette, gradient + shadow tokens), keep shadcn `@theme inline` mapping.
- Replace `src/routes/index.tsx` placeholder.
- Add sitemap route, robots.txt.

## Deliverable in this pass
Fully navigable site with working lead capture into Cloud, external booking link on thank-you, SEO metadata, sitemap, and legal placeholders. You can later: swap the booking URL for a Calendly embed, replace legal copy, connect analytics, and add case studies.
