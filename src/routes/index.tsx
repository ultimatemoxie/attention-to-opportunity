import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { Section, Eyebrow } from "@/components/site/section";
import { ConnectedDiagram } from "@/components/site/connected-diagram";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Myric AI — Customer growth systems for service businesses" },
      {
        name: "description",
        content:
          "Turn online attention into qualified leads, booked appointments and structured sales opportunities. AI content, conversion websites and CRM automation as one connected system.",
      },
      {
        property: "og:title",
        content: "Myric AI — Customer growth systems for service businesses",
      },
      {
        property: "og:description",
        content:
          "AI content, conversion websites and CRM automation as one connected system for established service businesses.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const services = [
  {
    tag: "Attract",
    title: "AI-powered content",
    body: "Search, social and long-form content engineered to attract the right prospects — not just traffic.",
  },
  {
    tag: "Capture",
    title: "Conversion websites",
    body: "Landing pages and websites designed around a single decision: enquire, book, or buy.",
  },
  {
    tag: "Convert",
    title: "CRM & automation",
    body: "Pipelines that organise leads, automate follow-up and surface the opportunities worth your time.",
  },
];

const steps = [
  {
    n: "01",
    title: "Growth Audit",
    body: "We review your website, funnel and follow-up. You get a concrete plan — not a sales deck.",
  },
  {
    n: "02",
    title: "System design",
    body: "We map the content, conversion and CRM system to your service, capacity and sales cycle.",
  },
  {
    n: "03",
    title: "Build & launch",
    body: "We build the pages, automations and pipelines, integrate your tools and go live in weeks.",
  },
  {
    n: "04",
    title: "Optimise",
    body: "We track what converts, tune the system and compound results month after month.",
  },
];

const outcomes = [
  { k: "Qualified leads", v: "Higher intent, better fit" },
  { k: "Booked appointments", v: "Straight into your calendar" },
  { k: "Structured pipeline", v: "Nothing falls through the cracks" },
];

const audience = [
  "A proven service and reputation",
  "Real capacity for more customers",
  "An enquiry or appointment-based sale",
  "A need for better marketing, conversion or lead follow-up",
];

const faqs = [
  {
    q: "Who is Myric AI for?",
    a: "Established high-value service businesses — professional services, healthcare, home services, coaching, agencies — with a proven offer and capacity for more customers.",
  },
  {
    q: "What is a Growth Audit?",
    a: "A structured review of your website, funnel and follow-up. You leave with a clear, prioritised plan — no obligation, no long deck.",
  },
  {
    q: "Do you guarantee results?",
    a: "No. We don't do hype or guaranteed revenue claims. What we do is build a measurable system, then optimise it against your real numbers.",
  },
  {
    q: "How long does it take?",
    a: "Most systems go live in three to six weeks depending on scope. We start delivering value in the first two weeks with quick wins.",
  },
  {
    q: "Do we need to replace our current tools?",
    a: "Usually not. We work with your existing website, CRM and calendar where sensible, and only recommend changes when they clearly pay for themselves.",
  },
  {
    q: "What does it cost?",
    a: "Engagements are scoped after the Growth Audit so pricing matches the work. We share transparent numbers before anything is committed.",
  },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <Audience />
        <Outcomes />
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
              Turn online attention into qualified leads.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Myric AI combines AI content, conversion websites and CRM automation into
              one connected system — built for established service businesses with
              capacity to grow.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/growth-audit"
                onClick={() =>
                  trackEvent("cta_click", { location: "hero", cta: "growth_audit" })
                }
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[0_10px_30px_-12px_var(--electric)] transition-transform hover:translate-y-[-1px]"
              >
                Request a Growth Audit
                <span aria-hidden>→</span>
              </Link>
              <a
                href="#how-it-works"
                onClick={() =>
                  trackEvent("cta_click", { location: "hero", cta: "how_it_works" })
                }
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
              >
                See how it works
              </a>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              No hype. No guaranteed-revenue promises. Just a system built around your
              service and your numbers.
            </p>
          </div>

          <div className="relative rounded-3xl border border-border/60 bg-surface/70 p-6 backdrop-blur">
            <ConnectedDiagram className="w-full max-w-md" />
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>Attention → Capture → Conversion</span>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-primary">live</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <Section id="services">
      <div className="max-w-2xl">
        <Eyebrow>One connected system</Eyebrow>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
          Three services. One growth engine.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Marketing that doesn't convert, sites that don't follow up, CRMs that don't
          get used — all common. Myric AI joins them into a system that compounds.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.title}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-surface/60 p-6 transition-colors hover:border-primary/50"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {s.tag}
            </div>
            <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function HowItWorks() {
  return (
    <Section id="how-it-works" className="border-y border-border/40 bg-surface/30">
      <div className="max-w-2xl">
        <Eyebrow>How it works</Eyebrow>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
          From audit to compounding growth.
        </h2>
      </div>
      <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <li
            key={s.n}
            className="rounded-2xl border border-border/60 bg-background p-6"
          >
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
    <Section>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <Eyebrow>Who it's for</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Built for established service businesses.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Myric AI is a fit if you have a proven service and want a dependable system
            for attracting, capturing and converting the right customers.
          </p>
        </div>
        <ul className="grid gap-3">
          {audience.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl border border-border/60 bg-surface/50 p-4 text-sm"
            >
              <span
                aria-hidden
                className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary"
              >
                ✓
              </span>
              <span className="text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function Outcomes() {
  return (
    <Section className="border-y border-border/40 bg-surface/30">
      <div className="grid gap-6 md:grid-cols-3">
        {outcomes.map((o) => (
          <div key={o.k} className="rounded-2xl border border-border/60 bg-background p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Outcome
            </div>
            <div className="mt-3 font-display text-2xl font-semibold">{o.k}</div>
            <div className="mt-1 text-sm text-muted-foreground">{o.v}</div>
          </div>
        ))}
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
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Questions we hear often.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Still curious? Ask us directly in your Growth Audit.
          </p>
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
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-surface via-surface-2 to-surface p-8 sm:p-14">
        <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to turn attention into revenue?
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Request a Growth Audit. We'll review your funnel and share a clear plan —
              no obligation.
            </p>
          </div>
          <Link
            to="/growth-audit"
            onClick={() =>
              trackEvent("cta_click", { location: "final", cta: "growth_audit" })
            }
            className="inline-flex items-center gap-2 justify-self-start rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_10px_30px_-12px_var(--electric)] md:justify-self-end"
          >
            Request a Growth Audit
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </Section>
  );
}
