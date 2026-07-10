import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground"
        >
          <LogoMark />
          <span className="font-display text-base">Myric AI</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="/#how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How it works
          </a>
          <a
            href="/#services"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Services
          </a>
          <a
            href="/#faq"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            FAQ
          </a>
        </nav>

        <Link
          to="/growth-audit"
          onClick={() => trackEvent("cta_click", { location: "nav", cta: "growth_audit" })}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_6px_20px_-8px_var(--electric)] transition-transform hover:translate-y-[-1px]"
        >
          Request a Growth Audit
          <span aria-hidden>→</span>
        </Link>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-primary to-cyan">
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary-foreground" aria-hidden>
        <path
          fill="currentColor"
          d="M4 4h4l4 8 4-8h4v16h-3V9.5L13 17h-2L7 9.5V20H4z"
        />
      </svg>
    </span>
  );
}
