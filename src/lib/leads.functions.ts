import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const leadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  business: z.string().trim().min(1).max(160),
  website: z.string().trim().max(500).optional().or(z.literal("")),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  revenue_range: z.string().trim().max(60).optional().or(z.literal("")),
  bottleneck: z.string().trim().min(10).max(2000),
  consent: z.literal(true),
  utm_source: z.string().max(200).optional(),
  utm_medium: z.string().max(200).optional(),
  utm_campaign: z.string().max(200).optional(),
  utm_term: z.string().max(200).optional(),
  utm_content: z.string().max(200).optional(),
  referrer: z.string().max(500).optional(),
  landing_path: z.string().max(500).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

const emptyToNull = (value: string | undefined) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => leadSchema.parse(raw))
  .handler(async ({ data }) => {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) throw new Error("Backend is not configured.");

    const supabase = createClient<Database>(url, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    });

    const { error } = await supabase.from("leads").insert({
      name: data.name.trim(),
      business: data.business.trim(),
      website: emptyToNull(data.website),
      email: data.email.trim(),
      phone: emptyToNull(data.phone),
      revenue_range: emptyToNull(data.revenue_range),
      bottleneck: data.bottleneck.trim(),
      consent: data.consent,
      utm_source: data.utm_source ?? null,
      utm_medium: data.utm_medium ?? null,
      utm_campaign: data.utm_campaign ?? null,
      utm_term: data.utm_term ?? null,
      utm_content: data.utm_content ?? null,
      referrer: data.referrer ?? null,
      landing_path: data.landing_path ?? null,
    });

    if (error) {
      console.error("[leads] insert failed", error);
      throw new Error("We couldn't submit your request. Please try again.");
    }

    return { ok: true as const };
  });
