import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LegalShell } from "./privacy";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — Myric AI" },
      {
        name: "description",
        content: "Terms governing your use of the Myric AI website.",
      },
      { property: "og:title", content: "Terms — Myric AI" },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalShell title="Terms of use" updated="Last updated: 10 July 2026">
      <p>
        These terms govern your use of the Myric AI website. By using the site you
        agree to them.
      </p>

      <H>Content</H>
      <p>
        Content on this site is provided for information only. It does not constitute
        professional advice, and no client relationship is formed until we sign an
        engagement agreement.
      </p>

      <H>Intellectual property</H>
      <p>
        All content, branding and design on this site is owned by Myric AI unless
        stated otherwise. You may share links to the site freely; please don't
        republish substantial portions without permission.
      </p>

      <H>Third-party services</H>
      <p>
        The site links to and integrates with third-party services (booking,
        analytics, CRM). Their terms and privacy policies apply to your use of them.
      </p>

      <H>Liability</H>
      <p>
        We take reasonable care with this site's information and availability, but
        provide it &ldquo;as is&rdquo;. To the extent permitted by law, we exclude
        liability for indirect or consequential losses arising from your use of it.
      </p>

      <H>Changes</H>
      <p>
        We may update these terms from time to time. The current version is always
        the one shown on this page.
      </p>

      <p className="text-xs text-muted-foreground">
        This is a template. Replace with your finalised, jurisdiction-appropriate
        terms before publishing.
      </p>
    </LegalShell>
  );
}

function H({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-8 font-display text-lg font-semibold text-foreground">
      {children}
    </h2>
  );
}
