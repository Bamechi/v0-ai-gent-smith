-- Create beta_signups table for email collection
CREATE TABLE IF NOT EXISTS public.beta_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  signed_up_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_beta_signups_email ON public.beta_signups(email);

-- Enable Row Level Security
ALTER TABLE public.beta_signups ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (sign up)
CREATE POLICY "Allow public insert to beta_signups"
  ON public.beta_signups
  FOR INSERT
  WITH CHECK (TRUE);
