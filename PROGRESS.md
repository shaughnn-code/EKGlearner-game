# Progress Log

## Complete
- Established project foundation for EKG App.
- Created `supabase/migrations/20240101000000_create_attempts.sql` to securely track user answers using RLS.
- Created `supabase/migrations/20240101000001_create_user_cards.sql` to manage SM-2 spaced repetition state queue using RLS.
- Implemented and rigorously unit-tested standard SM-2 spacing algorithm in `src/lib/sm2.ts` for repetition, ease factor, and interval calculation.
- Populated `.scratch/ekg-app/map.md` with explicit app boundaries (no raw canvas, no AI scan in phase 1) and phase 1 roadmap.

## Next Steps
- Database function creation to link `sm2.ts` logic updates into `user_cards` Table.
- UI construction for Flashcard/Drill components.
