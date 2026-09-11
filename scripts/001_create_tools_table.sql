-- Create the ai_tools table to store all AI tool information
CREATE TABLE IF NOT EXISTS public.ai_tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id TEXT UNIQUE NOT NULL,
  app_name TEXT NOT NULL,
  url TEXT NOT NULL,
  short_description TEXT,
  category_1 TEXT,
  category_2 TEXT,
  category_3 TEXT,
  tags TEXT[], -- Array of tags
  platforms TEXT,
  promo_code TEXT,
  featured_today BOOLEAN DEFAULT FALSE,
  sponsored BOOLEAN DEFAULT FALSE,
  date_added TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source_name_or_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_ai_tools_category_1 ON public.ai_tools(category_1);
CREATE INDEX IF NOT EXISTS idx_ai_tools_category_2 ON public.ai_tools(category_2);
CREATE INDEX IF NOT EXISTS idx_ai_tools_category_3 ON public.ai_tools(category_3);
CREATE INDEX IF NOT EXISTS idx_ai_tools_featured ON public.ai_tools(featured_today) WHERE featured_today = TRUE;
CREATE INDEX IF NOT EXISTS idx_ai_tools_app_name ON public.ai_tools USING gin(to_tsvector('english', app_name));
CREATE INDEX IF NOT EXISTS idx_ai_tools_description ON public.ai_tools USING gin(to_tsvector('english', short_description));
CREATE INDEX IF NOT EXISTS idx_ai_tools_tags ON public.ai_tools USING gin(tags);

-- Enable Row Level Security
ALTER TABLE public.ai_tools ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read tools
CREATE POLICY "Allow public read access to ai_tools"
  ON public.ai_tools
  FOR SELECT
  USING (TRUE);

-- For now, allow inserts without authentication (will be restricted later with admin roles)
CREATE POLICY "Allow public insert to ai_tools"
  ON public.ai_tools
  FOR INSERT
  WITH CHECK (TRUE);
