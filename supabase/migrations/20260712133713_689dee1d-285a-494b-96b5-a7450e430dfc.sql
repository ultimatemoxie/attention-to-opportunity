
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS industry text,
  ADD COLUMN IF NOT EXISTS main_service text,
  ADD COLUMN IF NOT EXISTS role text,
  ADD COLUMN IF NOT EXISTS company_size text,
  ADD COLUMN IF NOT EXISTS avg_customer_value text,
  ADD COLUMN IF NOT EXISTS monthly_leads text,
  ADD COLUMN IF NOT EXISTS has_website boolean,
  ADD COLUMN IF NOT EXISTS has_crm boolean,
  ADD COLUMN IF NOT EXISTS acquisition_source text,
  ADD COLUMN IF NOT EXISTS response_time text,
  ADD COLUMN IF NOT EXISTS solution_interest text,
  ADD COLUMN IF NOT EXISTS timeline text,
  ADD COLUMN IF NOT EXISTS investment_range text,
  ADD COLUMN IF NOT EXISTS pipeline_stage text NOT NULL DEFAULT 'Audit Requested',
  ADD COLUMN IF NOT EXISTS owner text NOT NULL DEFAULT 'Aqza',
  ADD COLUMN IF NOT EXISTS submitted_at timestamptz NOT NULL DEFAULT now();

-- Recreate the insert policy with widened validation
DROP POLICY IF EXISTS "Anyone can submit a valid lead" ON public.leads;

CREATE POLICY "Anyone can submit a valid lead"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 120
  AND length(btrim(business)) BETWEEN 1 AND 160
  AND length(btrim(email)) BETWEEN 5 AND 254
  AND position('@' in email) > 1
  AND length(btrim(bottleneck)) BETWEEN 10 AND 2000
  AND (website IS NULL OR length(website) <= 500)
  AND (phone IS NULL OR length(phone) <= 40)
  AND (revenue_range IS NULL OR length(revenue_range) <= 60)
  AND (country IS NULL OR length(country) <= 80)
  AND (industry IS NULL OR length(industry) <= 80)
  AND (main_service IS NULL OR length(main_service) <= 160)
  AND (role IS NULL OR length(role) <= 80)
  AND (company_size IS NULL OR length(company_size) <= 40)
  AND (avg_customer_value IS NULL OR length(avg_customer_value) <= 60)
  AND (monthly_leads IS NULL OR length(monthly_leads) <= 40)
  AND (acquisition_source IS NULL OR length(acquisition_source) <= 120)
  AND (response_time IS NULL OR length(response_time) <= 60)
  AND (solution_interest IS NULL OR length(solution_interest) <= 200)
  AND (timeline IS NULL OR length(timeline) <= 60)
  AND (investment_range IS NULL OR length(investment_range) <= 60)
  AND (utm_source IS NULL OR length(utm_source) <= 200)
  AND (utm_medium IS NULL OR length(utm_medium) <= 200)
  AND (utm_campaign IS NULL OR length(utm_campaign) <= 200)
  AND (utm_term IS NULL OR length(utm_term) <= 200)
  AND (utm_content IS NULL OR length(utm_content) <= 200)
  AND (referrer IS NULL OR length(referrer) <= 500)
  AND (landing_path IS NULL OR length(landing_path) <= 500)
);
