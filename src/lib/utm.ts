// UTM capture. Reads on first visit, persists to sessionStorage so the
// attribution survives internal navigation between homepage and audit form.

export type UtmPayload = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_path?: string;
};

const KEY = "myric_utm_v1";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export function captureUtm(): UtmPayload {
  if (typeof window === "undefined") return {};
  try {
    const existing = window.sessionStorage.getItem(KEY);
    if (existing) return JSON.parse(existing) as UtmPayload;

    const params = new URLSearchParams(window.location.search);
    const payload: UtmPayload = {
      referrer: document.referrer || undefined,
      landing_path: window.location.pathname + window.location.search || undefined,
    };
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) payload[key] = value.slice(0, 200);
    }
    window.sessionStorage.setItem(KEY, JSON.stringify(payload));
    return payload;
  } catch {
    return {};
  }
}

export function readUtm(): UtmPayload {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as UtmPayload) : {};
  } catch {
    return {};
  }
}
