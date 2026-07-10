// Lightweight analytics helper. No-ops if no data layer is present.
// Wire GA4 / Plausible / GTM later without changing call sites.

type EventProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(event: string, props?: EventProps) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event, ...props });
  } catch {
    /* no-op */
  }
}
