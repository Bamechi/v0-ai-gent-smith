-- 007: Clear the randomly-seeded 3.0–5.0 ratings. Ratings now read "Unrated"
-- everywhere until a real signal exists. Run in the Supabase SQL editor.
--
-- The fake numbers came from 003_add_rating_fields.sql (RANDOM()*2+3). This wipes
-- them so the directory is honest. Real ratings can be written later per-tool.

UPDATE public.ai_tools
SET star_rating = NULL,
    review_count = NULL;

-- Optional: if you later want to trust only ratings above a threshold, keep them
-- NULL here and populate star_rating from a real source (your own reviews, an
-- aggregator, etc.). The UI shows "Unrated" for any NULL/0 rating.
