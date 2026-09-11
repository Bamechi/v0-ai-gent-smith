-- 006: preview images, moderation status, pricing, and tighter RLS.
-- Run in the Supabase SQL editor after 001–005.

ALTER TABLE public.ai_tools
  ADD COLUMN IF NOT EXISTS preview_image_url TEXT,
  ADD COLUMN IF NOT EXISTS pricing TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published'
    CHECK (status IN ('published', 'pending', 'rejected'));

CREATE INDEX IF NOT EXISTS idx_ai_tools_status ON public.ai_tools(status);
CREATE INDEX IF NOT EXISTS idx_ai_tools_url_lower ON public.ai_tools (lower(url));

-- Public can read published rows only.
DROP POLICY IF EXISTS "Allow public read access to ai_tools" ON public.ai_tools;
CREATE POLICY "Public read published tools"
  ON public.ai_tools FOR SELECT
  USING (status = 'published');

-- Public inserts are removed. Submissions arrive as `pending` through the
-- server action (service role) and the weekly sync (service role).
DROP POLICY IF EXISTS "Allow public insert to ai_tools" ON public.ai_tools;

-- Keep last_updated honest.
CREATE OR REPLACE FUNCTION public.touch_last_updated() RETURNS trigger AS $$
BEGIN
  NEW.last_updated = NOW();
  RETURN NEW;
END $$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS trg_ai_tools_touch ON public.ai_tools;
CREATE TRIGGER trg_ai_tools_touch BEFORE UPDATE ON public.ai_tools
  FOR EACH ROW EXECUTE FUNCTION public.touch_last_updated();
