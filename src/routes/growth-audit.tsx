import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
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
          "Get a structured review of your ads, post-click experience and follow-up. Concrete recommendations, no obligation.",
      },
      { property: "og:title", content: "Request a Growth Audit — Myric AI" },
      {
        property: "og:description",
        content:
          "Structured review of your creative, campaign destination and follow-up. Clear recommendations, no obligation.",
      },
      { property: "og:url", content: "/growth-audit" },
      { name: "twitter:card", content: "summary_large_image" },
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
            "A structured review of an e-commerce brand's creative, post-click experience and follow-up.",
        }),
      },
    ],
  }),
  component: GrowthAudit,
});

type FormState = {
  // Step 1
  name: string;
  email: string;
  phone: string;
  role: string;
  // Step 2
  business: string;
  website: string;
  industry: string;
  // Step 3
  running_ads: "yes" | "no" | "";
  ad_destination: string;
  // Step 4
  biggest_leak: string;
  timeline: string;
  // Step 5
  consent: boolean;
};

const initialState: FormState = {
  name: "", email: "", phone: "", role: "",
  business: "", website: "", industry: "",
  running_ads: "", ad_destination: "",
  biggest_leak: "", timeline: "",
  consent: false,
};

const industries = ["Shopify", "Other e-commerce", "Other"];
const adDestinations = ["Homepage (/)" , "Product detail page (PDP)", "Campaign landing page", "Collection page", "Not sure"];
const biggestLeaks = ["Creative", "Conversion", "Follow-up", "Not sure"];
const timelines = ["ASAP", "Within 1 month", "1–3 months", "Just exploring"];

const stepLabels = ["Contact", "Business", "Traffic", "Challenge", "Consent"];

function GrowthAudit() {
  const navigate = useNavigate();
  const submit = useServerFn(submitLead);
  const [state, setState] = useState<FormState>(initialState);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const startedRef = useRef(false);
  const submittedRef = useRef(false);

  useEffect(() => {
    captureUtm();
  }, []);

  useEffect(() => {
    const onLeave = () => {
      if (startedRef.current && !submittedRef.current) {
        trackEvent("audit_form_abandoned", { step: step + 1 });
      }
    };
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [step]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("audit_form_started");
    }
    setState((s) => ({ ...s, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validateStep = (i: number): boolean => {
    const next: typeof errors = {};
    if (i === 0) {
      if (!state.name.trim()) next.name = "Required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) next.email = "Enter a valid email";
    }
    if (i === 1) {
      if (!state.business.trim()) next.business = "Required";
    }
    if (i === 3) {
      if (!state.biggest_leak) next.biggest_leak = "Please choose the biggest leak";
    }
    if (i === 4) {
      if (!state.consent) next.consent = "Please confirm to continue";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    trackEvent("audit_form_step_completed", { step: step + 1 });
    setStep((s) => Math.min(s + 1, stepLabels.length - 1));
  };
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;
    setServerError(null);
    setSubmitting(true);
    try {
      const utm = readUtm();
      await submit({
        data: {
          name: state.name.trim(),
          email: state.email.trim(),
          phone: state.phone.trim(),
          role: state.role.trim(),
          business: state.business.trim(),
          website: state.website.trim(),
          industry: state.industry.trim(),
          bottleneck: [
            `Biggest leak: ${state.biggest_leak}`,
            `Running ads: ${state.running_ads || "Not specified"}`,
            `Main ad destination: ${state.ad_destination || "Not specified"}`,
          ].join(". "),
          timeline: state.timeline.trim(),
          consent: true as const,
          ...utm,
        },
      });
      submittedRef.current = true;
      trackEvent("audit_form_submitted");
      navigate({ to: "/thank-you" });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const progress = ((step + 1) / stepLabels.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="font-display text-base font-semibold">Myric AI</Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back</Link>
        </div>
      </header>

      <main className="relative">
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-96 bg-radial-glow" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Growth Audit
          </div>
          <h1 className="mt-5 text-3xl font-bold text-gradient sm:text-4xl">
            A clear plan for your next growth step.
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
             Five short steps. We use this to prepare a structured review of your creative, campaign
             destination and follow-up before we speak.
          </p>

          {/* Progress */}
          <div className="mt-8">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Step {step + 1} of {stepLabels.length} — {stepLabels[step]}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface">
              <div
                className="h-full bg-primary transition-[width] duration-300"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
              />
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="mt-8 rounded-2xl border border-border/60 bg-surface/70 p-6 backdrop-blur sm:p-8"
            noValidate
          >
            {step === 0 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" value={state.name} onChange={(v) => set("name", v)} error={errors.name} required />
                <Field label="Business email" type="email" value={state.email} onChange={(v) => set("email", v)} error={errors.email} required />
                <Field label="Phone or WhatsApp" type="tel" value={state.phone} onChange={(v) => set("phone", v)} />
                <Field label="Your role" value={state.role} onChange={(v) => set("role", v)} placeholder="Founder, Marketing lead…" />
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Business name" value={state.business} onChange={(v) => set("business", v)} error={errors.business} required />
                <Field label="Website" type="url" value={state.website} onChange={(v) => set("website", v)} placeholder="https://" />
                <Select label="Industry" value={state.industry} onChange={(v) => set("industry", v)} options={industries} />
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <YesNo label="Are you running ads right now?" value={state.running_ads} onChange={(v) => set("running_ads", v)} />
                <Select label="Destination of your main ad" value={state.ad_destination} onChange={(v) => set("ad_destination", v)} options={adDestinations} />
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Select label="Biggest leak" value={state.biggest_leak} onChange={(v) => set("biggest_leak", v)} options={biggestLeaks} />
                <Select label="Desired timeline" value={state.timeline} onChange={(v) => set("timeline", v)} options={timelines} />
                {errors.biggest_leak && <p className="text-xs text-destructive">{errors.biggest_leak}</p>}
              </div>
            )}

            {step === 4 && (
              <div className="grid gap-5">
                <div className="rounded-xl border border-border/60 bg-background/60 p-4 text-sm text-muted-foreground">
                  <p>
                    We'll review your submission and reply within one business day with next steps.
                    Everything you share is treated confidentially.
                  </p>
                </div>
                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={state.consent}
                    onChange={(e) => set("consent", e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-input bg-background accent-[var(--electric)]"
                  />
                  <span>
                    I'm happy for Myric AI to contact me about my Growth Audit. See our{" "}
                    <Link to="/privacy" className="text-primary hover:underline">privacy notice</Link>.
                  </span>
                </label>
                {errors.consent && <p className="text-xs text-destructive">{errors.consent}</p>}
                {serverError && (
                  <div role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {serverError}
                  </div>
                )}
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Back
              </button>
              {step < stepLabels.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_10px_30px_-12px_var(--electric)] hover:translate-y-[-1px]"
                >
                  Continue <span aria-hidden>→</span>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_10px_30px_-12px_var(--electric)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? "Sending…" : "Submit Growth Audit request"}
                  {!submitting && <span aria-hidden>→</span>}
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", required, placeholder, error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        required={required}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-md border bg-background/60 px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/30",
          error ? "border-destructive" : "border-input",
        )}
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function Select({
  label, value, onChange, options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
      >
        <option value="">Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function YesNo({
  label, value, onChange,
}: {
  label: string;
  value: "yes" | "no" | "";
  onChange: (v: "yes" | "no") => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        {(["yes", "no"] as const).map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "rounded-md border px-3 py-2 text-sm font-medium capitalize transition-colors",
              value === opt
                ? "border-primary bg-primary/15 text-primary"
                : "border-input bg-background/60 text-foreground hover:border-primary/40",
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
