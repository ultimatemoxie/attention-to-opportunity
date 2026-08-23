import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { Section, Eyebrow } from "@/components/site/section";
import { ConnectedDiagram } from "@/components/site/connected-diagram";
import {
  AdCreativeMock,
  LandingPageMock,
  FollowUpQueueMock,
  CampaignJourneyMock,
} from "@/components/site/demo-mocks";
import { trackEvent } from "@/lib/analytics";

const faqs = [
  {
    q: "Who is this for?",
    a: "Shopify and e-commerce brands with active ads and a destination that doesn't match the ad. Other stacks with the same leak can talk.",
  },
  {
    q: "What is a Growth Audit?",
    a: "A structured look at creative, the post-click page, and what happens after interest. You leave with priorities, not a 40-page PDF.",
  },
  {
    q: "Do you guarantee results?",
    a: "No. No fake average ROI. We build measurable systems and optimise them against your real numbers.",
  },
  {
    q: "How long is the first sprint?",
    a: "Campaign landing: days to two weeks once we have ads, destination and theme access.",
  },
  {
    q: "Do you run the ads?",
    a: "No. Media buying stays with you. We work on everything after the click.",
  },
  {
    q: "Do we replace Shopify or Klaviyo?",
    a: "No. We work with your existing stack. Custom CRM is not the first conversation.",
  },
];


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Myric AI | Turn attention into customers" },
      {
        name: "description",
        content:
          "AI creative, conversion-focused campaign pages and connected follow-up systems for e-commerce brands already spending on ads.",
      },
      { property: "og:title", content: "Myric AI | Turn attention into customers" },
      {
        property: "og:description",
        content:
          "AI creative, conversion-focused experiences and connected follow-up systems for e-commerce brands.",
      },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: HomePage,
});

const problems = [
  {
    title: "Attention without a destination",
    body: "Ads and video get the click. The click lands on the catalogue homepage.",
  },
  {
    title: "Website without conversion",
    body: "The PDP or home page doesn't continue the promise in the ad. Paid traffic bounces before it has a reason to buy.",
  },
  {
    title: "Interest without a next action",
    body: "They add to cart, enquire, or leave. Nobody owns a next step or a due date.",
  },
];

const engines = [
  {
    tag: "Attention Engine",
    title: "Earn the click with a promise",
    body: "AI-produced product creative and short-form video built around one hook a page can keep — not generic brand filler.",
  },
  {
    tag: "Conversion Engine",
    title: "Continue the promise after the click",
    body: "Campaign landing experiences that match the ad hook, sell one product and offer one clear next step.",
  },
  {
    tag: "Follow-Up Engine",
    title: "Own the next action",
    body: "Connected follow-up across your existing stack — clicked, added to cart, enquired, purchased — each with an owner and a due date.",
  },
];

const process = [
  { n: "01", title: "Diagnose", body: "Ads, destination URL, and what happens after a non-purchase." },
  { n: "02", title: "Isolate the leak", body: "Usually the landing, sometimes the creative, sometimes follow-up." },
  { n: "03", title: "Sprint", body: "Most first jobs are a campaign landing that continues the ad. Not a full rebuild." },
  { n: "04", title: "Connect the rest", body: "Only if the leak is real in the other engines." },
];

const audiences = [
  { title: "Ads landing on the homepage", body: "Paid traffic sent to / or a generic collection page." },
  { title: "PDP that doesn't match the hook", body: "The product page never continues the promise in the ad." },
  { title: "Real product, named owner", body: "Someone internally can approve and ship a sprint." },
  { title: "Heading into a campaign window", body: "Including BFCM — spend booked, no page that matches it." },
];

const proofItems = [
  {
    tag: "Conceptual demonstration",
    title: "AI product commercial",
    body: "Fictional product. The job is to earn a click with a promise a page can keep.",
    Mock: AdCreativeMock,
  },
  {
    tag: "Conceptual demonstration",
    title: "Conversion landing experience",
    body: "Same promise as the ad, one product, one next step. Explicitly not the catalogue homepage.",
    Mock: LandingPageMock,
  },
  {
    tag: "Conceptual demonstration",
    title: "Follow-up queue",
    body: "Owner, stage, last activity, next action and due date across clicked, cart, enquiry and purchased.",
    Mock: FollowUpQueueMock,
  },
  {
    tag: "Conceptual demonstration",
    title: "Connected campaign journey",
    body: "AI creative → campaign page → action → follow-up, running as one system.",
    Mock: CampaignJourneyMock,
  },
];

const auditCoverage = [
  "Ad creative and hook",
  "Post-click destination",
  "Campaign page structure",
  "Offer and next step",
  "Cart and enquiry follow-up",
  "Stack fit (Shopify / Klaviyo)",
  "Recommended priorities",
];


function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <Hero />
        <Problem />
        <Engines />
        <Process />
        <Audience />
        <Proof />
        <AuditInvite />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div className="absolute inset-0 bg-radial-glow" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="max-w-2xl">
            <Eyebrow>Customer growth systems</Eyebrow>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] text-gradient sm:text-5xl lg:text-6xl">
              Turn attention into customers.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              AI creative, conversion-focused experiences and connected follow-up systems for
              e-commerce brands.
            </p>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
              We connect the systems between attention and customers. Media buying stays with you.
              The leak is usually after the click.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/growth-audit"
                onClick={() => trackEvent("hero_primary_cta_clicked")}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[0_10px_30px_-12px_var(--electric)] transition-transform hover:translate-y-[-1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Request a Growth Audit
                <span aria-hidden>→</span>
              </Link>
              <a
                href="#how-it-works"
                onClick={() => trackEvent("hero_secondary_cta_clicked")}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                See how it works
              </a>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              Concept demonstrations below — no invented results.
            </p>
          </div>

          <div className="relative rounded-3xl border border-border/60 bg-surface/70 p-6 backdrop-blur">
            <ConnectedDiagram className="w-full max-w-md" />
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>Creative → Campaign page → Action → Follow-up → Customer</span>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-primary">live</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <Section id="problem">
      <div className="max-w-2xl">
        <Eyebrow>The problem</Eyebrow>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
          Your marketing should work as one system.
        </h2>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {problems.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl border border-border/60 bg-surface/60 p-6"
          >
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 max-w-3xl text-base text-muted-foreground">
        Myric AI connects every stage so attention has a clear path toward becoming revenue.
      </p>
    </Section>
  );
}

function Engines() {
  return (
    <Section id="services" className="border-y border-border/40 bg-surface/30">
      <div className="max-w-2xl">
        <Eyebrow>Three engines, one system</Eyebrow>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
          The connected customer-growth system.
        </h2>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {engines.map((s) => (
          <button
            key={s.title}
            type="button"
            onClick={() => trackEvent("service_card_clicked", { engine: s.tag })}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background p-6 text-left transition-colors hover:border-primary/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {s.tag}
            </div>
            <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
          </button>
        ))}
      </div>
    </Section>
  );
}

function Process() {
  return (
    <Section id="how-it-works">
      <div className="max-w-2xl">
        <Eyebrow>How it works</Eyebrow>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
          Four steps. One measurable journey.
        </h2>
      </div>
      <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {process.map((s) => (
          <li key={s.n} className="rounded-2xl border border-border/60 bg-surface/50 p-6">
            <div className="font-display text-2xl font-bold text-primary">{s.n}</div>
            <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Audience() {
  return (
    <Section id="who" className="border-y border-border/40 bg-surface/30">
      <div className="max-w-2xl">
        <Eyebrow>Who it's for</Eyebrow>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
          Built for Shopify and e-commerce brands already spending on ads.
        </h2>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {audiences.map((a) => (
          <div key={a.title} className="rounded-2xl border border-border/60 bg-background p-6">
            <h3 className="text-lg font-semibold">{a.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{a.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 max-w-3xl text-sm text-muted-foreground">
        Who it is not for: no-traffic stores, raw dropship catalogues, "redesign the whole theme for
        cheap," or anyone who wants us to run their media buying.
      </p>
    </Section>
  );
}

function Proof() {
  return (
    <Section id="proof">
      <div className="max-w-2xl">
        <Eyebrow>Selected work</Eyebrow>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
          System demonstrations.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Structural examples of the pieces we build. Real client work is shared privately in the Growth
          Audit.
        </p>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {proofItems.map((p) => (
          <button
            key={p.title}
            type="button"
            onClick={() => trackEvent("portfolio_item_viewed", { item: p.title })}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-surface/50 p-6 text-left transition-colors hover:border-primary/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <div className="aspect-[16/10] w-full rounded-lg border border-border/60 bg-linear-to-br from-surface via-surface-2 to-surface" />
            <div className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              {p.tag}
            </div>
            <h3 className="mt-2 text-base font-semibold">{p.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
          </button>
        ))}
      </div>
    </Section>
  );
}

function AuditInvite() {
  return (
    <Section id="audit" className="border-y border-border/40 bg-surface/30">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_1.2fr] lg:items-start">
        <div>
          <Eyebrow>Growth Audit</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Discover where your customer journey is losing opportunities.
          </h2>
          <p className="mt-4 text-muted-foreground">
            The Growth Audit is a structured review of the pieces that decide whether attention becomes
            revenue.
          </p>
          <Link
            to="/growth-audit"
            onClick={() => trackEvent("growth_audit_cta_clicked", { location: "invite" })}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[0_10px_30px_-12px_var(--electric)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Request my Growth Audit
            <span aria-hidden>→</span>
          </Link>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {auditCoverage.map((c) => (
            <li
              key={c}
              className="flex items-start gap-3 rounded-xl border border-border/60 bg-background p-4 text-sm"
            >
              <span
                aria-hidden
                className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary"
              >
                ✓
              </span>
              <span className="text-foreground">{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function Faq() {
  return (
    <Section id="faq">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_1.6fr]">
        <div>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Questions we hear often.</h2>
        </div>
        <div className="divide-y divide-border/60 rounded-2xl border border-border/60 bg-surface/40">
          {faqs.map((f) => (
            <details key={f.q} className="group px-5 py-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-medium text-foreground">
                {f.q}
                <span
                  aria-hidden
                  className="text-muted-foreground transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

function FinalCta() {
  return (
    <Section>
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-linear-to-br from-surface via-surface-2 to-surface p-8 sm:p-14">
        <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to connect your customer journey?
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Request a Growth Audit. We'll review your website, funnel and follow-up and share a clear
              plan.
            </p>
          </div>
          <Link
            to="/growth-audit"
            onClick={() => trackEvent("growth_audit_cta_clicked", { location: "final" })}
            className="inline-flex items-center gap-2 justify-self-start rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_10px_30px_-12px_var(--electric)] md:justify-self-end focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Request a Growth Audit
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </Section>
  );
}
