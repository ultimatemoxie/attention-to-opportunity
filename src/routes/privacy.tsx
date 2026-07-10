import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site/footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Myric AI" },
      {
        name: "description",
        content: "How Myric AI collects, uses and protects your personal information.",
      },
      { property: "og:title", content: "Privacy — Myric AI" },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalShell title="Privacy notice" updated="Last updated: 10 July 2026">
      <p>
        This notice explains how Myric AI (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects
        and uses your personal information when you visit this website or request a
        Growth Audit.
      </p>

      <H>Information we collect</H>
      <p>
        When you submit the Growth Audit form we collect your name, business name,
        website, email, phone (if provided), monthly revenue range and a description
        of your current growth bottleneck. We also record basic attribution data such
        as UTM parameters and the referring URL.
      </p>

      <H>How we use it</H>
      <p>
        We use this information only to respond to your enquiry, prepare your Growth
        Audit and — with your consent — follow up about relevant services.
      </p>

      <H>Legal basis</H>
      <p>
        We process your data on the basis of your consent (given when you submit the
        form) and our legitimate interest in responding to enquiries about our
        services.
      </p>

      <H>Sharing</H>
      <p>
        We do not sell your data. We use trusted service providers (hosting,
        analytics, CRM, email) that process data on our behalf under appropriate
        contracts.
      </p>

      <H>Your rights</H>
      <p>
        You can request access, correction or deletion of your data at any time by
        emailing us. You may also withdraw consent by replying to any communication
        from us.
      </p>

      <H>Contact</H>
      <p>
        Questions? Email us via the address you'll receive after submitting your
        Growth Audit request, or use the form on the{" "}
        <Link to="/growth-audit" className="text-primary hover:underline">
          Growth Audit page
        </Link>
        .
      </p>

      <p className="text-xs text-muted-foreground">
        This is a template. Replace with your finalised, jurisdiction-appropriate
        privacy notice before publishing.
      </p>
    </LegalShell>
  );
}

export function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="font-display text-base font-semibold">
            Myric AI
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold text-gradient sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{updated}</p>
        <div className="prose-legal mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground [&_p]:text-muted-foreground">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function H({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-8 font-display text-lg font-semibold text-foreground">
      {children}
    </h2>
  );
}
