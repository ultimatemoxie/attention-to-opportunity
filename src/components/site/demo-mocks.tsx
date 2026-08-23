// Conceptual product-UI mocks for the demonstration section.
// Pure presentation — navy / gold / warm-white, no client data.

export function AdCreativeMock() {
  return (
    <div className="aspect-[16/10] w-full overflow-hidden rounded-lg border border-border bg-navy-deep">
      <div className="flex h-full">
        <div className="flex w-1/2 flex-col justify-center gap-2 p-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-gold">
            Sponsored
          </div>
          <div className="font-display text-base leading-tight text-[color:var(--primary-foreground)]">
            The 30-second morning ritual
          </div>
          <div className="h-1 w-10 rounded bg-gold" />
          <div className="mt-1 h-1.5 w-24 rounded bg-white/20" />
          <div className="h-1.5 w-16 rounded bg-white/15" />
          <div className="mt-2 inline-flex w-fit rounded-full bg-gold px-2.5 py-1 text-[9px] font-semibold text-navy">
            Shop the ritual
          </div>
        </div>
        <div className="relative w-1/2 bg-[radial-gradient(circle_at_50%_40%,rgba(199,150,53,0.35),transparent_70%)]">
          <div className="absolute left-1/2 top-1/2 h-16 w-9 -translate-x-1/2 -translate-y-1/2 rounded-md border border-gold/50 bg-white/10" />
          <div className="absolute bottom-2 right-2 rounded bg-white/10 px-1.5 py-0.5 text-[8px] text-white/70">
            0:08
          </div>
        </div>
      </div>
    </div>
  );
}

export function LandingPageMock() {
  return (
    <div className="aspect-[16/10] w-full overflow-hidden rounded-lg border border-border bg-surface">
      <div className="flex items-center gap-1 border-b border-border bg-surface-2 px-2 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-navy/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-navy/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-navy/20" />
        <span className="ml-2 rounded bg-background px-2 py-0.5 text-[8px] text-muted-foreground">
          /pages/morning-ritual
        </span>
      </div>
      <div className="grid h-full grid-cols-2 gap-3 p-3">
        <div className="space-y-1.5">
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gold">
            Same promise as the ad
          </div>
          <div className="font-display text-sm leading-tight text-foreground">
            The 30-second morning ritual
          </div>
          <div className="h-1 w-full rounded bg-navy/10" />
          <div className="h-1 w-4/5 rounded bg-navy/10" />
          <div className="mt-1.5 inline-flex rounded-full bg-navy px-2.5 py-1 text-[8px] font-semibold text-[color:var(--primary-foreground)]">
            Add to cart — one product
          </div>
          <div className="pt-1 text-[8px] text-muted-foreground">No catalogue detour</div>
        </div>
        <div className="rounded-md border border-border bg-surface-2" />
      </div>
    </div>
  );
}

const queueRows = [
  { who: "Clicked ad, no purchase", stage: "Intent", next: "Retarget offer", due: "Today" },
  { who: "Added to cart", stage: "Cart", next: "Reminder 2", due: "Tomorrow" },
  { who: "Enquiry — sizing", stage: "Enquiry", next: "Reply + guide", due: "Today" },
  { who: "Purchased", stage: "Customer", next: "Post-buy flow", due: "Day 7" },
];

export function FollowUpQueueMock() {
  return (
    <div className="aspect-[16/10] w-full overflow-hidden rounded-lg border border-border bg-surface">
      <div className="grid grid-cols-[1.4fr_0.8fr_1fr_0.6fr] border-b border-border bg-surface-2 px-2.5 py-1.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        <span>Contact</span>
        <span>Stage</span>
        <span>Next action</span>
        <span>Due</span>
      </div>
      {queueRows.map((r) => (
        <div
          key={r.who}
          className="grid grid-cols-[1.4fr_0.8fr_1fr_0.6fr] items-center border-b border-border/60 px-2.5 py-[7px] text-[8.5px] text-foreground"
        >
          <span className="truncate">{r.who}</span>
          <span className="truncate text-muted-foreground">{r.stage}</span>
          <span className="truncate text-muted-foreground">{r.next}</span>
          <span className="truncate text-gold">{r.due}</span>
        </div>
      ))}
      <div className="px-2.5 py-1.5 text-[8px] text-muted-foreground">Owner assigned on every row</div>
    </div>
  );
}

const journey = ["AI creative", "Campaign page", "Action", "Follow-up"];

export function CampaignJourneyMock() {
  return (
    <div className="flex aspect-[16/10] w-full items-center justify-center rounded-lg border border-border bg-surface px-3">
      <div className="flex w-full items-center justify-between gap-1">
        {journey.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-1">
            <div className="flex-1 rounded-md border border-border bg-surface-2 px-1.5 py-3 text-center">
              <div className="mx-auto mb-1.5 h-1.5 w-1.5 rounded-full bg-gold" />
              <div className="text-[8.5px] leading-tight text-foreground">{label}</div>
            </div>
            {i < journey.length - 1 && <span className="text-[10px] text-gold">→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
