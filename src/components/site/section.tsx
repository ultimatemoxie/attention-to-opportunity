import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </div>
  );
}
