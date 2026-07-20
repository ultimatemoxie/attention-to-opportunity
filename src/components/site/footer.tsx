import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-[color:var(--primary-foreground)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-md border border-white/15">
              <span className="h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">Myric AI</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-white/70">
            Customer-growth systems for established service businesses.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-gold">
            Connected. Automated. Growth.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm md:col-span-2 md:justify-end">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Company
            </div>
            <ul className="mt-3 space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/growth-audit" className="text-white/70 hover:text-white">
                  Growth Audit
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Legal
            </div>
            <ul className="mt-3 space-y-2">
              <li>
                <Link to="/privacy" className="text-white/70 hover:text-white">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/70 hover:text-white">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-4 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:px-6">
          <span>© {new Date().getFullYear()} Myric AI. All rights reserved.</span>
          <span>Built for service businesses that want measurable growth.</span>
        </div>
      </div>
    </footer>
  );
}
