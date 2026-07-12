# Myric AI — Customer-Growth Systems Website

Current state: a first-pass build already exists (all 6 routes, dark navy design, `leads` table with UTM capture, sitemap, robots, SEO metadata). This plan upgrades it to the full brief: richer homepage sections, multi-step audit form with all qualification fields, confirmation + internal notification emails, expanded analytics, and pipeline/owner defaults on leads.

---

## 1. Website Architecture

Routes (TanStack Start, file-based):
- `/` — homepage
- `/growth-audit` — multi-step qualification form
- `/thank-you` — confirmation + booking
- `/privacy`, `/terms` — legal
- `$.tsx` — branded 404
- `/sitemap.xml`, `/robots.txt` — SEO
- `/api/public/lead-notify` — internal server route (optional, or fold into server fn)

Server layer:
- `src/lib/leads.functions.ts` — `createServerFn` for insert + email dispatch
- `src/lib/analytics.ts` — `trackEvent` → `window.dataLayer`
- `src/lib/utm.ts` — capture + sessionStorage persistence

## 2. Component Structure

```text
src/components/site/
  Nav.tsx              sticky, mobile sheet menu
  Footer.tsx
  Hero.tsx             + JourneyDiagram.tsx (animated Content→…→Customer)
  ProblemCards.tsx     3 cards
  EngineCards.tsx      Attention / Conversion / Follow-Up
  ProcessSteps.tsx     5-stage (Diagnose→Optimise)
  AudienceGrid.tsx     5 industries + qualification statement
  ProofGallery.tsx     labelled conceptual placeholders
  AuditInvite.tsx      what the audit covers + CTA
  FAQ.tsx
  CTASection.tsx
  GridBackground.tsx   subtle node pattern

src/components/audit/
  AuditForm.tsx        multi-step controller
  Step1Contact.tsx     name, email, phone, role
  Step2Business.tsx    business, website, country, industry, service, size
  Step3Metrics.tsx     customer value, monthly leads, has website, has CRM, acquisition source, response time
  Step4Goals.tsx       challenge, solution interest, timeline, investment
  Step5Consent.tsx     consent + submit
  ProgressBar.tsx
  FieldGroup.tsx       label + helper + error
```

## 3. User Journey

```text
Homepage (hero CTA)
   → /growth-audit (5-step form, UTM captured on load)
      → server fn: validate → insert lead (stage=Audit Requested, owner=Aqza)
                → confirmation email to prospect
                → internal notification email
                → analytics: audit_form_submitted
      → /thank-you (booking button → external calendar)
         → analytics: booking_calendar_opened → discovery_call_booked
```

## 4. Responsive Layout Strategy

- Mobile-first Tailwind v4; breakpoints `sm/md/lg`.
- Grid rows use `grid-cols-[minmax(0,1fr)_auto]` on mobile → `sm:flex`.
- Cards stack vertically <md, 2-col md, 3-col lg.
- Sticky nav collapses to sheet menu <md; CTA stays visible.
- Journey diagram: horizontal SVG lg, vertical stacked <md.
- Form: one step per screen on mobile; two-column fields lg only where natural.
- `prefers-reduced-motion` disables framer-motion transitions.

## 5. Database Schema (extends existing `leads`)

Existing columns kept. Add:

```text
country              text
industry             text
main_service         text
role                 text
company_size         text
avg_customer_value   text
monthly_leads        text
has_website          boolean
has_crm              boolean
acquisition_source   text
response_time        text
solution_interest    text
timeline             text
investment_range     text
pipeline_stage       text  default 'Audit Requested'
owner                text  default 'Aqza'
submitted_at         timestamptz default now()
```

RLS: keep `anon/authenticated INSERT` with CHECK validation; no SELECT for anon. `service_role` full access. GRANTs included in the same migration.

## 6. Form-Submission Workflow

1. Client: Zod validation per step, disable Next until valid.
2. Submit → `createServerFn` (public, rate-limited by IP header check).
3. Server: re-validate with Zod, insert into `leads` with defaults.
4. Server: send confirmation email to prospect + internal notification (via Resend using existing `LOVABLE_API_KEY`-style secret, or connector if available — will confirm which in Questions).
5. Return `{ok:true}`; client fires `audit_form_submitted`, navigates to `/thank-you`.
6. Errors surface inline; retry preserves entered data.

## 7. Analytics Events

Wired via `trackEvent(name, props)` → `window.dataLayer.push`:
- `hero_primary_cta_clicked`, `hero_secondary_cta_clicked`
- `growth_audit_cta_clicked`
- `audit_form_started`, `audit_form_step_completed` (with `step`), `audit_form_abandoned` (beforeunload), `audit_form_submitted`
- `booking_calendar_opened`, `discovery_call_booked`
- `portfolio_item_viewed`, `service_card_clicked`

## 8. SEO Implementation

- Per-route `head()` with unique title, description, canonical (relative), og:*, twitter:card.
- Root: Organization JSON-LD, site-wide og defaults, fonts via `<link>` in root head.
- `/growth-audit`: Service JSON-LD.
- `/`: FAQPage JSON-LD from FAQ content.
- `public/robots.txt` allows all + sitemap.
- `src/routes/sitemap[.]xml.tsx` lists 5 public routes.
- Semantic H1/H2/H3, alt text, `lang="en"`.

## 9. Questions & Risks

1. **Emails** — which provider? Options: (a) Resend (need `RESEND_API_KEY` secret + verified sender domain), (b) skip emails for now and only store the lead, (c) already have a connector I should use.
2. **Booking URL** — real Cal.com/Calendly link to embed on `/thank-you`? Currently placeholder `https://cal.com/myric-ai`.
3. **Internal notification recipient** — which email address receives new lead alerts?
4. **Proof gallery assets** — use abstract placeholder graphics for now (clearly labelled "conceptual demonstration"), or wait for real assets?
5. **Risk — no revenue/perf claims**: copy will avoid guarantees; qualification statement included.
6. **Risk — form length**: 20 fields is heavy; multi-step + progress bar mitigates, but expect drop-off. `audit_form_abandoned` will surface it.

Approve and I'll implement the delta on top of the existing build.