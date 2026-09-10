-- Add rating and review columns to ai_tools table
ALTER TABLE public.ai_tools 
ADD COLUMN IF NOT EXISTS star_rating NUMERIC(2,1),
ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0;

-- Create index for sorting by rating
CREATE INDEX IF NOT EXISTS idx_ai_tools_rating ON public.ai_tools(star_rating DESC NULLS LAST);
