-- Create the attempts table to store user progress
CREATE TABLE public.attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    card_id UUID NOT NULL,
    mode TEXT NOT NULL,
    correct BOOLEAN NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.attempts ENABLE ROW LEVEL SECURITY;

-- Create policies ensuring users can only access their own records
CREATE POLICY "Users can insert their own attempts"
    ON public.attempts
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own attempts"
    ON public.attempts
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own attempts"
    ON public.attempts
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own attempts"
    ON public.attempts
    FOR DELETE
    USING (auth.uid() = user_id);
