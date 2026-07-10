import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="font-display text-lg font-semibold">Myric AI</div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Customer-growth systems for established service businesses.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm md:col-span-2 md:justify-end">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Company
            </div>
            <ul className="mt-3 space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/growth-audit"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Growth Audit
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Legal
            </div>
            <ul className="mt-3 space-y-2">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:px-6">
          <span>© {new Date().getFullYear()} Myric AI. All rights reserved.</span>
          <span>Built for service businesses that want measurable growth.</span>
        </div>
      </div>
    </footer>
  );
}
