-- Add star_rating and review_count columns to ai_tools table
ALTER TABLE public.ai_tools 
ADD COLUMN IF NOT EXISTS star_rating DECIMAL(2,1) CHECK (star_rating >= 0 AND star_rating <= 5),
ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0;

-- Update existing records with random ratings for demo purposes
UPDATE public.ai_tools 
SET 
  star_rating = (RANDOM() * 2 + 3)::DECIMAL(2,1), -- Random rating between 3.0 and 5.0
  review_count = (RANDOM() * 500)::INTEGER -- Random review count between 0 and 500
WHERE star_rating IS NULL;

-- Create index for rating queries
CREATE INDEX IF NOT EXISTS idx_ai_tools_rating ON public.ai_tools(star_rating DESC);
