import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site/footer";
import { trackEvent } from "@/lib/analytics";

const BOOKING_URL = process.env.BOOKING_URL;
const SITE_URL = process.env.SITE_URL || "https://myric.ai";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank you — Myric AI" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content: "We've received your Growth Audit request and will follow up to book discovery.",
      },
      { property: "og:title", content: "Request received — Myric AI" },
      {
        property: "og:description",
        content:
          "We'll follow up to book a discovery call and discuss your e-commerce growth audit.",
      },
      { property: "og:url", content: `${SITE_URL}/thank-you` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/thank-you` }],
  }),
  component: ThankYou,
});

function ThankYou() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="font-display text-base font-semibold">
            Myric AI
          </Link>
        </div>
      </header>

      <main className="relative flex-1">
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-96 bg-radial-glow" aria-hidden />
        <div className="relative mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12l4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gradient sm:text-4xl">Request received.</h1>
          <p className="mt-4 text-muted-foreground">
            Thanks — we've got your details. We'll follow up to book a discovery call and discuss
            where attention is leaking after the click.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {BOOKING_URL && (
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("booking_calendar_opened")}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[0_10px_30px_-12px_var(--electric)]"
              >
                Book your intro call
                <span aria-hidden>→</span>
              </a>
            )}
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-5 py-3 text-sm font-medium text-foreground hover:bg-surface"
            >
              Back to home
            </Link>
          </div>

          <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
            {[
              { k: "1", t: "Review", b: "We review your submission and current funnel." },
              { k: "2", t: "Call", b: "We meet for 20 minutes to align on goals." },
              { k: "3", t: "Plan", b: "You get a prioritised, actionable plan." },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl border border-border/60 bg-surface/50 p-5">
                <div className="font-display text-2xl font-bold text-primary">{s.k}</div>
                <div className="mt-2 text-sm font-semibold">{s.t}</div>
                <p className="mt-1 text-xs text-muted-foreground">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
