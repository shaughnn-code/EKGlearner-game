-- Create the user_cards table to store the SM-2 state
CREATE TABLE public.user_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    card_id UUID NOT NULL,
    repetition INTEGER NOT NULL DEFAULT 0,
    ease_factor NUMERIC NOT NULL DEFAULT 2.5,
    interval NUMERIC NOT NULL DEFAULT 0,
    due_date TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(user_id, card_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_cards ENABLE ROW LEVEL SECURITY;

-- Create policies ensuring users can only access their own records
CREATE POLICY "Users can insert their own user_cards"
    ON public.user_cards
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own user_cards"
    ON public.user_cards
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own user_cards"
    ON public.user_cards
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own user_cards"
    ON public.user_cards
    FOR DELETE
    USING (auth.uid() = user_id);
