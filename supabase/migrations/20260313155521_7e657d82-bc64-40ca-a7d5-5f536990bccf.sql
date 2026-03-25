
-- Drop old table and recreate with individual columns for R analysis
DROP TABLE IF EXISTS public.survey_responses;

CREATE TABLE public.survey_responses (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  
  -- Video Game Engagement (g1-g8)
  gaming_frequency text,           -- g1
  gaming_hours text,               -- g2
  gaming_platforms text,           -- g3 (comma-separated for checkbox)
  gaming_genres text,              -- g4 (comma-separated for checkbox)
  gaming_social_importance integer, -- g5 (scale 1-5)
  gaming_news_following text,      -- g6
  gaming_political_themes text,    -- g7
  gaming_political_thinking integer, -- g8 (scale 1-5)
  
  -- Political Attitudes (p1-p8)
  political_interest integer,      -- p1 (scale 1-5)
  voted_2022 text,                 -- p2
  political_spectrum text,         -- p3
  political_trust integer,         -- p4 (scale 1-5)
  political_news_sources text,    -- p5 (comma-separated for checkbox)
  politics_in_gaming text,         -- p6
  games_influence_politics integer, -- p7 (scale 1-5)
  important_political_issues text, -- p8
  
  -- Demographics (d1-d6)
  age_group text,                  -- d1
  gender text,                     -- d2
  occupation text,                 -- d3
  education_level text,            -- d4
  location text,                   -- d5
  open_comments text               -- d6
);

-- Enable RLS
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Anyone can submit survey responses"
  ON public.survey_responses
  FOR INSERT
  TO public
  WITH CHECK (true);
