import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const optStr = (max: number) =>
  z.string().trim().max(max).optional().or(z.literal(""));

const leadSchema = z.object({
  // Contact
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  phone: optStr(40),
  role: optStr(80),
  // Business
  business: z.string().trim().min(1).max(160),
  website: optStr(500),
  country: optStr(80),
  industry: optStr(80),
  main_service: optStr(160),
  company_size: optStr(40),
  // Metrics
  revenue_range: optStr(60),
  avg_customer_value: optStr(60),
  monthly_leads: optStr(40),
  has_website: z.boolean().optional(),
  has_crm: z.boolean().optional(),
  acquisition_source: optStr(120),
  response_time: optStr(60),
  // Goals
  bottleneck: z.string().trim().min(10).max(2000),
  solution_interest: optStr(200),
  timeline: optStr(60),
  investment_range: optStr(60),
  // Consent
  consent: z.literal(true),
  // Attribution
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
      email: data.email.trim(),
      phone: emptyToNull(data.phone),
      role: emptyToNull(data.role),
      business: data.business.trim(),
      website: emptyToNull(data.website),
      country: emptyToNull(data.country),
      industry: emptyToNull(data.industry),
      main_service: emptyToNull(data.main_service),
      company_size: emptyToNull(data.company_size),
      revenue_range: emptyToNull(data.revenue_range),
      avg_customer_value: emptyToNull(data.avg_customer_value),
      monthly_leads: emptyToNull(data.monthly_leads),
      has_website: data.has_website ?? null,
      has_crm: data.has_crm ?? null,
      acquisition_source: emptyToNull(data.acquisition_source),
      response_time: emptyToNull(data.response_time),
      bottleneck: data.bottleneck.trim(),
      solution_interest: emptyToNull(data.solution_interest),
      timeline: emptyToNull(data.timeline),
      investment_range: emptyToNull(data.investment_range),
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
