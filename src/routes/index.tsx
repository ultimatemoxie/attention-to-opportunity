import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Compass,
  FileSearch,
  Layers3,
  MoveRight,
  Quote,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { Section, Eyebrow } from "@/components/site/section";
import { trackEvent } from "@/lib/analytics";

const SITE_URL = process.env.SITE_URL || "https://myric.ai";

const faqs = [
  {
    q: "Who is this for?",
    a: "Shopify and e-commerce brands already investing in paid attention, with a real product and an internal owner who can move a focused sprint forward.",
  },
  {
    q: "What do I receive from a Growth Audit?",
    a: "A concise review of the ad promise, post-click journey and follow-up, followed by a prioritised action plan. It is designed to make the next decision clear — not to create a 40-page report.",
  },
  {
    q: "What does a first engagement look like?",
    a: "Usually a focused campaign sprint: diagnose the leak, improve the most important destination, then connect the follow-up only where the evidence supports it.",
  },
  {
    q: "Do you run paid media?",
    a: "No. Media buying stays with you or your media partner. Myric AI focuses on the promise, the post-click experience and what happens next.",
  },
  {
    q: "Will you replace our current stack?",
    a: "Not by default. The work is designed around the tools you already use, including Shopify and Klaviyo. New technology should earn its place.",
  },
  {
    q: "Do you guarantee results?",
    a: "No invented averages and no universal ROI promises. The work creates a measurable customer journey that can be evaluated against your own traffic and commercial numbers.",
  },
];

const leaks = [
  {
    icon: Sparkles,
    number: "01",
    title: "The promise gets attention",
    body: "The creative earns a click, but the destination changes the subject or sends visitors into a catalogue.",
  },
  {
    icon: Layers3,
    number: "02",
    title: "The page loses the thread",
    body: "The offer, proof and next step are harder to understand than they were in the ad.",
  },
  {
    icon: Workflow,
    number: "03",
    title: "Interest goes quiet",
    body: "A cart, enquiry or return visit happens, but there is no deliberate next action or owner.",
  },
];

const services = [
  {
    icon: Target,
    label: "Attention",
    title: "A promise worth following",
    body: "Creative direction and AI-assisted production shaped around a sharp customer promise — not generic volume for its own sake.",
    deliverables: ["Campaign hook", "Creative direction", "Ad-to-page message map"],
  },
  {
    icon: Layers3,
    label: "Conversion",
    title: "A destination that keeps it",
    body: "Focused campaign experiences that continue the message, make the value tangible and offer one confident next step.",
    deliverables: ["Journey structure", "Campaign landing page", "Offer and proof hierarchy"],
  },
  {
    icon: Workflow,
    label: "Follow-up",
    title: "A next action with an owner",
    body: "Practical follow-up across your existing stack so meaningful interest does not disappear between disconnected tools.",
    deliverables: ["Lifecycle map", "Follow-up logic", "Ownership and measurement"],
  },
];

const auditIncludes = [
  "Ad promise and creative hook",
  "Post-click destination",
  "Offer, proof and next action",
  "Cart and enquiry follow-up",
  "Existing stack fit",
  "Prioritised recommendation",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Myric AI | Post-click growth for e-commerce brands" },
      {
        name: "description",
        content:
          "Myric AI connects campaign creative, landing experiences and follow-up so e-commerce brands can turn paid attention into customers.",
      },
      { property: "og:title", content: "Myric AI | Turn attention into customers" },
      {
        property: "og:description",
        content:
          "Post-click growth systems for e-commerce brands: a stronger promise, a focused destination and a deliberate next step.",
      },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}/og.png` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE_URL}/og.png` },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-full bg-navy px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="main-content">
        <Hero />
        <PositioningStrip />
        <LeakSection />
        <Services />
        <FirstEngagement />
        <Principles />
        <Process />
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
    <section className="hero-paper relative overflow-hidden border-b border-border/70">
      <div className="absolute inset-0 bg-grid opacity-35" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.8fr)] lg:items-center lg:gap-16">
          <div>
            <Eyebrow>Post-click growth for e-commerce</Eyebrow>
            <h1 className="mt-7 max-w-3xl text-[2.75rem] font-semibold leading-[0.98] text-foreground sm:text-6xl lg:text-[4.8rem]">
              Turn paid attention into a path people want to follow.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Myric AI connects campaign creative, landing experiences and follow-up around one
              clear customer promise.
            </p>
            <div className="mt-9 flex flex-col gap-3 min-[420px]:flex-row">
              <Link
                to="/growth-audit"
                onClick={() => trackEvent("hero_primary_cta_clicked")}
                className="button-primary"
              >
                Request a Growth Audit
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
              <a
                href="#services"
                onClick={() => trackEvent("hero_secondary_cta_clicked")}
                className="button-secondary"
              >
                Explore the approach
              </a>
            </div>
            <p className="mt-7 max-w-xl border-l border-gold pl-4 text-sm leading-relaxed text-muted-foreground">
              Media buying stays with you. We strengthen what happens around and after the click.
            </p>
          </div>

          <div className="relative lg:pl-4">
            <div className="brief-card relative overflow-hidden rounded-[1.75rem] border border-border bg-white p-6 shadow-[0_30px_80px_-45px_rgba(6,26,58,0.45)] sm:p-8">
              <div className="flex items-center justify-between border-b border-border pb-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-gold">
                    Growth brief
                  </p>
                  <p className="mt-1 font-display text-2xl font-semibold text-foreground">
                    Follow the promise
                  </p>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-gold">
                  <Compass aria-hidden className="h-5 w-5" />
                </span>
              </div>
              <div className="space-y-0">
                <BriefRow label="Signal" value="The ad earns qualified attention" />
                <BriefRow label="Friction" value="The destination breaks the story" />
                <BriefRow label="Next move" value="Build one focused campaign path" accent />
              </div>
              <div className="mt-6 rounded-2xl bg-navy px-5 py-4 text-primary-foreground">
                <div className="flex items-center gap-3 text-sm">
                  <span className="h-px flex-1 bg-white/20" />
                  <span className="text-xs uppercase tracking-[0.2em] text-gold-soft">
                    One promise
                  </span>
                  <MoveRight aria-hidden className="h-4 w-4 text-gold" />
                  <span className="text-xs uppercase tracking-[0.2em] text-gold-soft">
                    One path
                  </span>
                  <span className="h-px flex-1 bg-white/20" />
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
              A practical view of the journey — not another dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BriefRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="grid grid-cols-[82px_1fr] gap-4 border-b border-border py-5 last:border-0">
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <span className={accent ? "font-medium text-gold" : "font-medium text-foreground"}>
        {value}
      </span>
    </div>
  );
}

function PositioningStrip() {
  return (
    <div className="border-b border-border bg-white">
      <div className="mx-auto grid max-w-6xl divide-y divide-border px-4 sm:px-6 md:grid-cols-3 md:divide-x md:divide-y-0">
        {[
          "Built for active e-commerce brands",
          "Designed around your existing stack",
          "Focused, senior-led delivery",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center justify-center gap-2 py-5 text-center text-xs font-semibold uppercase tracking-[0.13em] text-muted-foreground md:px-6"
          >
            <Check aria-hidden className="h-4 w-4 text-gold" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function LeakSection() {
  return (
    <Section id="problem" className="bg-navy-deep text-primary-foreground">
      <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div>
          <Eyebrow className="text-white/65" dotClassName="bg-gold">
            Where growth leaks
          </Eyebrow>
          <h2 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl">
            The click is only the beginning.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/65">
            Strong campaigns lose momentum when each part of the journey tells a different story.
          </p>
        </div>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {leaks.map((item) => (
            <article key={item.title} className="grid gap-4 py-7 sm:grid-cols-[52px_1fr] sm:gap-6">
              <div className="flex items-center gap-3 sm:block">
                <item.icon aria-hidden className="h-5 w-5 text-gold" />
                <span className="ml-auto text-xs font-semibold tracking-[0.2em] text-white/35 sm:ml-0 sm:mt-4 sm:block">
                  {item.number}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/60">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Services() {
  return (
    <Section id="services">
      <div className="max-w-3xl">
        <Eyebrow>The connected approach</Eyebrow>
        <h2 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
          One promise, carried through the whole journey.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Each engagement starts with the largest visible leak. The rest is connected only when it
          improves the customer path.
        </p>
      </div>
      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.label}
            className="service-card flex h-full flex-col rounded-[1.5rem] border border-border bg-white p-7 sm:p-8"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-foreground">
                <service.icon aria-hidden className="h-5 w-5" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">
                {service.label}
              </span>
            </div>
            <h3 className="mt-8 text-3xl font-semibold leading-tight">{service.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{service.body}</p>
            <ul className="mt-8 space-y-3 border-t border-border pt-6">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

function FirstEngagement() {
  return (
    <Section className="border-y border-border bg-surface-2/55">
      <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-20">
        <div>
          <Eyebrow>A typical first engagement</Eyebrow>
          <h2 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
            Start with the decision that matters most.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Most brands do not need a full rebuild. They need a clear view of the journey, a better
            destination for one important campaign and a way to measure what changed.
          </p>
          <div className="mt-8 flex items-start gap-4 border-l-2 border-gold pl-5">
            <Quote aria-hidden className="mt-1 h-5 w-5 shrink-0 text-gold" />
            <p className="font-display text-2xl leading-snug text-foreground">
              Improve the path before adding more traffic to it.
            </p>
          </div>
        </div>
        <div className="rounded-[1.75rem] border border-border bg-white p-6 shadow-[0_24px_70px_-50px_rgba(6,26,58,0.45)] sm:p-9">
          <div className="flex items-center justify-between border-b border-border pb-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">
                Campaign sprint
              </p>
              <h3 className="mt-2 text-2xl font-semibold">What you actually receive</h3>
            </div>
            <FileSearch aria-hidden className="h-7 w-7 text-muted-foreground" />
          </div>
          <ol className="mt-2 divide-y divide-border">
            {[
              [
                "01",
                "Annotated journey review",
                "The promise, destination and next action in one view.",
              ],
              [
                "02",
                "Prioritised action plan",
                "What to change now, next and later — with reasons.",
              ],
              [
                "03",
                "Focused sprint recommendation",
                "A clear scope for the highest-value improvement.",
              ],
              [
                "04",
                "Measurement plan",
                "The signals that will show whether the new path is working.",
              ],
            ].map(([number, title, body]) => (
              <li key={number} className="grid grid-cols-[42px_1fr] gap-4 py-5">
                <span className="font-display text-xl font-semibold text-gold">{number}</span>
                <div>
                  <h4 className="font-sans text-sm font-semibold tracking-normal">{title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

function Principles() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <div>
          <Eyebrow>Why Myric AI</Eyebrow>
          <h2 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
            Small by design. Clear by default.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Myric AI is a founder-led growth studio built for focused collaboration, direct thinking
            and accountable delivery.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-border bg-border sm:grid-cols-3">
          {[
            [
              "01",
              "No theatre",
              "No invented ROI, inflated audits or strategy designed to look complicated.",
            ],
            [
              "02",
              "Stack-aware",
              "Work with what is already useful before recommending another platform.",
            ],
            [
              "03",
              "One accountable lead",
              "A direct line from diagnosis to delivery, with fewer hand-offs.",
            ],
          ].map(([number, title, body]) => (
            <article key={number} className="bg-white p-7">
              <span className="text-xs font-bold tracking-[0.2em] text-gold">{number}</span>
              <h3 className="mt-10 text-2xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Process() {
  const steps = [
    ["01", "Diagnose", "Review the ad promise, destination and what happens after interest."],
    ["02", "Prioritise", "Identify the one leak most likely to improve the journey."],
    ["03", "Build", "Create the focused experience and connect the essential follow-up."],
    ["04", "Learn", "Measure real behaviour and decide what deserves the next iteration."],
  ];

  return (
    <Section
      id="how-it-works"
      className="border-y border-border bg-navy-deep text-primary-foreground"
    >
      <div className="max-w-3xl">
        <Eyebrow className="text-white/65" dotClassName="bg-gold">
          How the work moves
        </Eyebrow>
        <h2 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl">
          Four deliberate steps. No transformation theatre.
        </h2>
      </div>
      <ol className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
        {steps.map(([number, title, body]) => (
          <li key={number} className="bg-navy-deep p-7 sm:p-8">
            <span className="font-display text-3xl font-semibold text-gold">{number}</span>
            <h3 className="mt-10 text-2xl font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function AuditInvite() {
  return (
    <Section id="audit">
      <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_30px_90px_-60px_rgba(6,26,58,0.5)]">
        <div className="grid lg:grid-cols-[1.04fr_0.96fr]">
          <div className="p-7 sm:p-12 lg:p-14">
            <Eyebrow>Growth Audit</Eyebrow>
            <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">
              Find the clearest next move for your customer journey.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              Share the essentials in five short steps. We will review the journey and respond
              within one business day with the right next conversation.
            </p>
            <Link
              to="/growth-audit"
              onClick={() => trackEvent("growth_audit_cta_clicked", { location: "invite" })}
              className="button-primary mt-9"
            >
              Request your Growth Audit
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
          <div className="bg-secondary p-7 sm:p-12 lg:p-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">
              The review covers
            </p>
            <ul className="mt-7 space-y-4">
              {auditIncludes.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 border-b border-border pb-4 text-sm font-medium last:border-0"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy text-primary-foreground">
                    <Check aria-hidden className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Faq() {
  return (
    <Section id="faq" className="border-t border-border bg-surface-2/45">
      <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
        <div>
          <Eyebrow>Questions, answered</Eyebrow>
          <h2 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
            Useful clarity before a call.
          </h2>
        </div>
        <div className="divide-y divide-border border-y border-border">
          {faqs.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-semibold text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
                {item.q}
                <span
                  aria-hidden
                  className="text-2xl font-light text-gold transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-2 pt-3 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

function FinalCta() {
  return (
    <section className="bg-gold">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 sm:py-18 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-navy/65">
            Start with clarity
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-navy sm:text-5xl">
            Your next campaign deserves somewhere better to land.
          </h2>
        </div>
        <Link
          to="/growth-audit"
          onClick={() => trackEvent("growth_audit_cta_clicked", { location: "final" })}
          className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy md:self-auto"
        >
          Request a Growth Audit
          <ArrowRight aria-hidden className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
