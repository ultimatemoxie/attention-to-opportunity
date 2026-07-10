import { createFileRoute, Link, useNavigate, useServerFn } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { submitLead } from "@/lib/leads.functions";
import { captureUtm, readUtm } from "@/lib/utm";
import { trackEvent } from "@/lib/analytics";
import { SiteFooter } from "@/components/site/footer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/growth-audit")({
  head: () => ({
    meta: [
      { title: "Request a Growth Audit — Myric AI" },
      {
        name: "description",
        content:
          "Get a structured review of your website, funnel and follow-up. Concrete recommendations, no obligation.",
      },
      { property: "og:title", content: "Request a Growth Audit — Myric AI" },
      {
        property: "og:description",
        content:
          "Structured review of your website, funnel and follow-up. Clear recommendations, no obligation.",
      },
      { property: "og:url", content: "/growth-audit" },
    ],
    links: [{ rel: "canonical", href: "/growth-audit" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Growth Audit",
          provider: { "@type": "Organization", name: "Myric AI" },
          description:
            "A structured review of a service business's website, funnel and lead follow-up.",
        }),
      },
    ],
  }),
  component: GrowthAudit,
});

type Errors = Partial<Record<string, string>>;

const revenueRanges = [
  "Under £10k / month",
  "£10k–£50k / month",
  "£50k–£250k / month",
  "£250k+ / month",
  "Prefer not to say",
];

function GrowthAudit() {
  const navigate = useNavigate();
  const submit = useServerFn(submitLead);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    captureUtm();
  }, []);

  const handleFirstInteraction = () => {
    if (started) return;
    setStarted(true);
    trackEvent("form_start", { form: "growth_audit" });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    const fd = new FormData(e.currentTarget);
    const utm = readUtm();

    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      business: String(fd.get("business") ?? "").trim(),
      website: String(fd.get("website") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      revenue_range: String(fd.get("revenue_range") ?? "").trim(),
      bottleneck: String(fd.get("bottleneck") ?? "").trim(),
      consent: fd.get("consent") === "on",
      ...utm,
    };

    const nextErrors: Errors = {};
    if (!payload.name) nextErrors.name = "Please add your name.";
    if (!payload.business) nextErrors.business = "Please add your business name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email))
      nextErrors.email = "Please enter a valid email.";
    if (payload.bottleneck.length < 10)
      nextErrors.bottleneck = "Please share a little more detail (10+ characters).";
    if (!payload.consent) nextErrors.consent = "Please confirm you're happy to be contacted.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      trackEvent("form_error", { form: "growth_audit" });
      return;
    }

    setSubmitting(true);
    try {
      await submit({
        data: {
          ...payload,
          consent: true as const,
        },
      });
      trackEvent("form_submit", { form: "growth_audit" });
      navigate({ to: "/thank-you" });
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
      trackEvent("form_error", { form: "growth_audit", server: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="font-display text-base font-semibold">
            Myric AI
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back
          </Link>
        </div>
      </header>

      <main className="relative">
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-96 bg-radial-glow" aria-hidden />
        <div className="relative mx-auto grid max-w-4xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_1.5fr]">
          <aside>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Growth Audit
            </div>
            <h1 className="mt-5 text-3xl font-bold text-gradient sm:text-4xl">
              A clear plan for your next growth step.
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              Share a few details and we'll review your website, funnel and follow-up.
              You'll get concrete, prioritised recommendations — not a sales pitch.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Website & funnel review",
                "Content & attention analysis",
                "CRM & follow-up assessment",
                "Prioritised action plan",
              ].map((v) => (
                <li key={v} className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                    ✓
                  </span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </aside>

          <form
            onSubmit={onSubmit}
            onChange={handleFirstInteraction}
            className="rounded-2xl border border-border/60 bg-surface/70 p-6 backdrop-blur sm:p-8"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name" name="name" error={errors.name} required />
              <Field label="Business name" name="business" error={errors.business} required />
              <Field label="Website" name="website" type="url" placeholder="https://" />
              <Field label="Email" name="email" type="email" error={errors.email} required />
              <Field label="Phone (optional)" name="phone" type="tel" />
              <SelectField
                label="Monthly revenue"
                name="revenue_range"
                options={revenueRanges}
              />
            </div>

            <div className="mt-5">
              <label className="mb-1.5 block text-sm font-medium">
                Biggest growth bottleneck <span className="text-primary">*</span>
              </label>
              <textarea
                name="bottleneck"
                rows={5}
                required
                minLength={10}
                maxLength={2000}
                placeholder="e.g. We get traffic but few enquiries convert into calls."
                className={cn(
                  "w-full rounded-md border bg-background/60 px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/30",
                  errors.bottleneck ? "border-destructive" : "border-input",
                )}
              />
              {errors.bottleneck ? (
                <p className="mt-1 text-xs text-destructive">{errors.bottleneck}</p>
              ) : null}
            </div>

            <label className="mt-5 flex items-start gap-3 text-sm text-muted-foreground">
              <input
                type="checkbox"
                name="consent"
                className="mt-1 h-4 w-4 shrink-0 rounded border-input bg-background accent-[var(--electric)]"
              />
              <span>
                I'm happy for Myric AI to contact me about my Growth Audit. See our{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  privacy notice
                </Link>
                .
              </span>
            </label>
            {errors.consent ? (
              <p className="mt-1 text-xs text-destructive">{errors.consent}</p>
            ) : null}

            {serverError ? (
              <div
                role="alert"
                className="mt-4 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
              >
                {serverError}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[0_10px_30px_-12px_var(--electric)] transition-transform hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {submitting ? "Sending…" : "Request my Growth Audit"}
              {!submitting && <span aria-hidden>→</span>}
            </button>
            <p className="mt-3 text-xs text-muted-foreground">
              We usually respond within one business day.
            </p>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">
        {label} {required ? <span className="text-primary">*</span> : null}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-md border bg-background/60 px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/30",
          error ? "border-destructive" : "border-input",
        )}
      />
      {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      <select
        name={name}
        defaultValue=""
        className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
      >
        <option value="">Select a range</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
