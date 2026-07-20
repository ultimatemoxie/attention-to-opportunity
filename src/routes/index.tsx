import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { Section, Eyebrow } from "@/components/site/section";
import { ConnectedDiagram } from "@/components/site/connected-diagram";
import { trackEvent } from "@/lib/analytics";

const faqs = [
  {
    q: "Who is Myric AI for?",
    a: "Established high-value service businesses — professional services, home services, real estate, clinics, consultants — with a proven offer, capacity for more customers, and a team ready to respond to opportunities.",
  },
  {
    q: "What is a Growth Audit?",
    a: "A structured review of your website, calls to action, lead capture, content, CRM structure and follow-up. You leave with a prioritised action plan.",
  },
  {
    q: "Do you guarantee results?",
    a: "No. We don't do guaranteed-revenue promises. We build measurable systems and optimise them against your real numbers.",
  },
  {
    q: "How long does implementation take?",
    a: "Most systems go live in three to six weeks depending on scope. Quick wins usually land in the first two weeks.",
  },
  {
    q: "Do we need to replace our current tools?",
    a: "Usually not. We work with your existing website, CRM and calendar where sensible.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Myric AI | Websites, AI Content and CRM Growth Systems" },
      {
        name: "description",
        content:
          "Myric AI helps service businesses attract attention, convert visitors into qualified leads and automate follow-up through connected websites, AI content and CRM systems.",
      },
      { property: "og:title", content: "Myric AI | Websites, AI Content and CRM Growth Systems" },
      {
        property: "og:description",
        content:
          "Connected customer-growth systems for service businesses — AI content, conversion websites and CRM automation.",
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
    title: "Attention without direction",
    body: "Content and ads drive views but don't route the right prospects to an offer or enquiry point.",
  },
  {
    title: "Website without conversion",
    body: "Traffic arrives, scrolls, and leaves. The site informs but never asks for a clear next step.",
  },
  {
    title: "Leads without follow-up",
    body: "Enquiries land in an inbox, a spreadsheet or nowhere. Opportunities cool off before they're worked.",
  },
];

const engines = [
  {
    tag: "Attention Engine",
    title: "Attract the right people",
    body: "Strategic AI-powered video and social content that communicates value, builds recognition and directs relevant prospects toward an offer.",
  },
  {
    tag: "Conversion Engine",
    title: "Convert attention into leads",
    body: "Conversion-focused websites and landing pages that establish trust and guide visitors toward a single, clear action.",
  },
  {
    tag: "Follow-Up Engine",
    title: "Move leads toward a decision",
    body: "CRM pipelines and automated follow-up that organise opportunities and give each lead a clear next step.",
  },
];

const process = [
  { n: "01", title: "Diagnose", body: "Audit your current journey — website, content, capture and follow-up." },
  { n: "02", title: "Design", body: "Map the system to your service, capacity, sales cycle and tools." },
  { n: "03", title: "Build", body: "Ship the pages, content plan, pipelines and automations." },
  { n: "04", title: "Launch", body: "Integrate, connect analytics and go live." },
  { n: "05", title: "Optimise", body: "Track what converts, refine and compound results." },
];

const audiences = [
  { title: "Home-service companies", body: "Renovation, HVAC, landscaping, cleaning, installation." },
  { title: "Real estate & property", body: "Agents, brokerages, property managers, developers." },
  { title: "Professional-service firms", body: "Legal, accounting, financial services, advisory." },
  { title: "Clinics & appointment businesses", body: "Dental, aesthetics, wellness, therapy, veterinary." },
  { title: "Consultants & training companies", body: "B2B consultants, coaches, corporate training." },
];

const proofItems = [
  { tag: "Conceptual demonstration", title: "AI commercial video", body: "Short-form video concept illustrating a service business offer." },
  { tag: "Conceptual demonstration", title: "Landing page example", body: "Example of a single-offer landing page structure." },
  { tag: "Conceptual demonstration", title: "CRM pipeline", body: "Visual of an Audit Requested → Qualified → Booked pipeline." },
  { tag: "Conceptual demonstration", title: "Customer journey map", body: "Content → Website → Lead → CRM → Follow-up → Customer." },
  { tag: "Conceptual demonstration", title: "Before / after website analysis", body: "Structural comparison of a legacy site vs a converting one." },
];

const auditCoverage = [
  "Website clarity",
  "Calls to action",
  "Lead capture",
  "Content opportunities",
  "CRM structure",
  "Follow-up gaps",
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
              Turn online attention into qualified leads and customers.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Myric AI combines conversion-focused websites, AI-powered content and automated CRM follow-up
              into one connected customer-growth system for service businesses.
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
              Built for service businesses ready to attract, manage and convert more opportunities.
            </p>
          </div>

          <div className="relative rounded-3xl border border-border/60 bg-surface/70 p-6 backdrop-blur">
            <ConnectedDiagram className="w-full max-w-md" />
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>Content → Website → Lead → CRM → Follow-up → Customer</span>
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
          Five stages. One measurable journey.
        </h2>
      </div>
      <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
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
          Built for high-value service businesses.
        </h2>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {audiences.map((a) => (
          <div key={a.title} className="rounded-2xl border border-border/60 bg-background p-6">
            <h3 className="text-lg font-semibold">{a.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{a.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 max-w-3xl text-sm text-muted-foreground">
        Myric AI is best suited to established businesses with a proven service, capacity for more
        customers, and a team prepared to respond to opportunities.
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
