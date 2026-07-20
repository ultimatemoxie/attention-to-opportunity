# Myric AI — Brand Redesign Plan

Rebrand the existing site to the final Myric AI identity. **No copy, route, form, or functional changes.** All edits are visual/presentation.

## Audit — current state

- Design tokens: dark navy canvas, electric blue + cyan accents, Sora + Inter (styles.css)
- Components: `SiteNav`, `SiteFooter`, `Section`/`Eyebrow`, `ConnectedDiagram`
- Routes: `/`, `/growth-audit`, `/thank-you`, `/privacy`, `/terms`, sitemap, 404 in `__root`
- Homepage (443 lines) already has: hero, problem, three-engine, how-it-works, who-it-is-for, demonstrations, growth audit CTA, FAQ, final CTA
- Fonts loaded via `<link>` in `__root.tsx` (Sora + Inter)

## 1. Design tokens (`src/styles.css`)

Swap palette wholesale — no purple/cyan/neon:

```
--background:      #FAF8F3  (warm white — becomes default)
--foreground:      #061A3A  (primary navy)
--surface:         #FFFFFF
--surface-2:       #F3EEE2  (soft paper)
--primary:         #061A3A  (navy)
--primary-foreground: #FAF8F3
--accent-gold:     #C79635  (Myric gold)
--accent-gold-soft:#E1C27A
--navy-deep:       #031127
--muted-foreground:#566176  (slate)
--border:          #E7E1D5  (light warm border)
```

- Remove `.dark` class from `<html>` in `__root.tsx` — site is light/warm now.
- Replace `--font-display` with `"Cormorant Garamond"` (editorial serif).
- Add `--font-sans` = `Manrope`, keep Inter for body/forms via `--font-body`.
- Update Google Fonts link: `Cormorant+Garamond:wght@500;600;700|Manrope:wght@400;500;600;700|Inter:wght@400;500;600`.
- Update `bg-grid` / `bg-radial-glow` utilities to warm-white base with subtle gold radial + faint navy grid.
- Add utilities: `text-gold`, `bg-navy`, `bg-navy-deep`, `divider-gold` (thin 1px gold rule), `paper-texture` (very subtle noise/marble via SVG data-URI).
- `theme-color` meta → `#061A3A`.

## 2. Logo asset

- Upload the provided brand sheet crops via `lovable-assets create` to produce:
  - `myric-horizontal.svg` (nav desktop + footer reversed)
  - `myric-mark.svg` (nav mobile, favicon fallback)
- Replace inline `<LogoMark />` SVG in `src/components/site/nav.tsx` and `SiteFooter`.
- Since the upload is a raster brand sheet, I'll recreate the mark as clean inline SVG (M in circle w/ 4 connected nodes, navy + gold gradient) rather than crop the PNG — sharp at any size, matches identity, no image weight.

## 3. Navigation (`src/components/site/nav.tsx`)

- Warm-white translucent bg (`bg-background/80 backdrop-blur` after scroll)
- Thin `border-b border-[--border]` on scroll
- Nav links: navy text, gold underline on hover (animated `after:` bar)
- CTA button: solid navy, warm-white text, gold arrow `→`
- Mobile: swap horizontal lockup for compact mark

## 4. Footer (`footer.tsx`)

- `bg-navy-deep` (#031127), warm-white text
- Reversed logo (mark + wordmark in warm white with gold node)
- Tagline: "Connected. Automated. Growth."
- Faint connected-node SVG pattern in background (5% opacity)
- Keep all existing links exactly

## 5. Homepage (`src/routes/index.tsx`) — section by section

Copy is preserved verbatim. Only wrappers, tokens, and decorative visuals change.

- **Hero**: warm-white bg with faint architectural line-art SVG + tiny node grid. Left col unchanged copy; highlight 2–3 outcome words in gold via inline `<span class="text-gold">`. Right: replace current diagram with new **ConnectedJourney** SVG — 5 nodes (Attention → Website → Lead → CRM → Customer) on a curved path, thin gold connectors, a small gold dot animating along the path (`@keyframes` + `prefers-reduced-motion` guard).
- **Problem section**: `bg-navy-deep`, warm-white text, gold uppercase labels, thin gold top border on each card, faint connecting hairlines between the 3 cards. Add the "Disconnected tools create disconnected growth." pull-quote centered below (already exists or add if copy present).
- **Three-engine system**: warm-white section, three large panels side-by-side on desktop w/ a thin gold horizontal rule running behind them. Each panel: navy line icon, existing title/copy, small demonstration mini-mock (SVG), gold outcome pill, hover lifts border to gold.
- **How it works**: five numbered navy circles on a horizontal gold line (desktop) / vertical timeline (mobile). Add small gold deliverable labels under each step (Diagnose → audit doc, Design → system map, Build → live components, Launch → go-live, Optimise → monthly review) — these are labels not copy changes to the descriptions.
- **Who it is for**: editorial grid, navy line icons replace any emoji/filled icons, add a bordered gold-accent "qualification card" wrapping the existing final statement.
- **System demonstrations**: one large featured card "Connected Growth System" spanning full width w/ inline SVG showing AI Content → Landing Page → Lead Form → CRM → Follow-Up → Booked Call as chained mini-UI mocks. Below: 4 smaller cards (AI video, landing page, CRM pipeline, before/after). Keep "Conceptual demonstration" pill. Add expand-on-click: reveal problem / what was designed / components / metric (already in copy? — if not, use existing card body; no new copy invented).
- **Growth Audit CTA**: `bg-navy-deep`, gold check icons for the checklist, warm-white text, right col shows a small system-audit diagram (SVG of the same 5-node flow with a magnifier glyph).
- **FAQ**: warm-white bg, navy accordion headings, gold `+` / `−` icons, fine `border-[--border]` between items.
- **Final CTA**: `bg-navy-deep`, warm-white heading (serif), gold accent word, navy button on warm-white or outlined gold.

## 6. Growth Audit / Thank-You / Privacy / Terms

- Re-skin only: warm-white backgrounds, navy headings (Cormorant), Manrope labels, gold accents on step indicators and check marks. **Zero form field / validation / submission changes.**

## 7. Root layout (`__root.tsx`)

- Remove `className="dark"` from `<html>`.
- Update fonts link (Cormorant Garamond + Manrope + Inter).
- Update `theme-color` to `#061A3A`.
- 404 page: warm-white bg, navy heading, gold accent.

## 8. Motion & a11y

- All animations respect `@media (prefers-reduced-motion: reduce)` — kill journey-dot travel + hover lifts.
- Focus rings: 2px gold offset on all interactive elements.
- Contrast: navy on warm-white = 15:1; gold reserved for accents/large text only (gold-on-warm-white ~3.5:1 → decorative only, never body copy).

## 9. Performance

- Fonts: `display=swap`, preconnect already present.
- All new visuals are inline SVG (no raster).
- Paper texture: single tiny SVG data-URI, no image request.
- Lazy-mount FAQ + demonstrations sections stay as-is (already server-rendered static).

## Out of scope (explicit)

- No copy edits, no new sections, no route changes, no form/DB/analytics changes, no new dependencies.

Ready to implement on approval.
