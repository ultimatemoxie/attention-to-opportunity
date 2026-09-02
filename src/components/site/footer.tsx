import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { LogoMark } from "./nav";

const companyLinks = [
  { href: "/#services", label: "Approach" },
  { href: "/#how-it-works", label: "Process" },
  { href: "/#about", label: "Why Myric" },
  { href: "/growth-audit", label: "Growth Audit", internal: true },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark inverse />
              <span className="font-display text-2xl font-semibold">Myric AI</span>
            </div>
            <p className="mt-7 max-w-xl font-display text-3xl leading-tight text-white sm:text-4xl">
              A clearer path from paid attention to customer action.
            </p>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/55">
              Campaign creative, focused landing experiences and connected follow-up for e-commerce
              brands.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">Explore</p>
              <ul className="mt-5 space-y-3">
                {companyLinks.map((item) => (
                  <li key={item.href}>
                    {item.internal ? (
                      <Link to="/growth-audit" className="footer-link">
                        {item.label}
                      </Link>
                    ) : (
                      <a href={item.href} className="footer-link">
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">Legal</p>
              <ul className="mt-5 space-y-3">
                <li>
                  <Link to="/privacy" className="footer-link">
                    Privacy notice
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="footer-link">
                    Terms of use
                  </Link>
                </li>
              </ul>
              <Link
                to="/growth-audit"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-gold-soft hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                Start a conversation
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© {new Date().getFullYear()} Myric AI. All rights reserved.</span>
          <span>Connected thinking. Focused delivery.</span>
        </div>
      </div>
    </footer>
  );
}
