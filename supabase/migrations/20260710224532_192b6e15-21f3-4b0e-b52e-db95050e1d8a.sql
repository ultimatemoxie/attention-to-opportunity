
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;

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
    AND (utm_source IS NULL OR length(utm_source) <= 200)
    AND (utm_medium IS NULL OR length(utm_medium) <= 200)
    AND (utm_campaign IS NULL OR length(utm_campaign) <= 200)
    AND (utm_term IS NULL OR length(utm_term) <= 200)
    AND (utm_content IS NULL OR length(utm_content) <= 200)
    AND (referrer IS NULL OR length(referrer) <= 500)
    AND (landing_path IS NULL OR length(landing_path) <= 500)
  );
