
-- Create table for survey responses (anonymous, no user_id needed)
CREATE TABLE public.survey_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  answers JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (survey is anonymous)
CREATE POLICY "Anyone can submit survey responses"
  ON public.survey_responses
  FOR INSERT
  WITH CHECK (true);

-- No select/update/delete for public (admin only via dashboard)
