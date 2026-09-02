import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

const navItems = [
  { href: "/#services", label: "Approach" },
  { href: "/#how-it-works", label: "Process" },
  { href: "/#about", label: "Why Myric" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/90 shadow-[0_10px_35px_-30px_rgba(6,26,58,0.45)] backdrop-blur-xl"
          : "border-b border-border/50 bg-background/80 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:h-[4.5rem] sm:px-6">
        <Link
          to="/"
          aria-label="Myric AI home"
          className="flex shrink-0 items-center gap-2.5 text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          <LogoMark />
          <span className="whitespace-nowrap font-display text-lg font-semibold">Myric AI</span>
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link text-sm font-medium text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-5">
          <details ref={menuRef} className="group relative lg:hidden">
            <summary
              aria-label="Open navigation menu"
              className="grid h-10 w-10 cursor-pointer list-none place-items-center rounded-full border border-border bg-white text-foreground transition-colors hover:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <Menu aria-hidden className="h-4 w-4" />
            </summary>
            <nav
              aria-label="Mobile navigation"
              className="absolute right-0 top-12 w-56 overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-[0_24px_70px_-35px_rgba(6,26,58,0.55)]"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => menuRef.current?.removeAttribute("open")}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </details>

          <Link
            to="/growth-audit"
            onClick={() => trackEvent("cta_click", { location: "nav", cta: "growth_audit" })}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:px-5"
          >
            <span className="hidden min-[390px]:inline">Growth Audit</span>
            <span className="min-[390px]:hidden">Start</span>
            <ArrowRight aria-hidden className="h-3.5 w-3.5 text-gold-soft" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function LogoMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span
      className={cn(
        "relative grid h-9 w-9 shrink-0 place-items-center rounded-full",
        inverse ? "border border-white/20 bg-white/5" : "bg-navy",
      )}
      aria-hidden
    >
      <svg viewBox="0 0 36 36" className="h-6 w-6">
        <path
          d="M8.5 11.5 18 25l9.5-13.5"
          fill="none"
          stroke={inverse ? "#FAF8F3" : "#FAF8F3"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
        <circle cx="8.5" cy="11.5" r="2.2" fill="#C79635" />
        <circle cx="27.5" cy="11.5" r="2.2" fill="#C79635" />
        <circle cx="18" cy="25" r="2.2" fill="#C79635" />
      </svg>
    </span>
  );
}
