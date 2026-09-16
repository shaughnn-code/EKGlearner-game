# EKG App - Project Map & Roadmap

## Overview
EKG interpretation training app for medical residents/students. A structured learning curriculum with spaced-repetition review, built around static curated EKG strip images. Not a raw signal viewer.

## Boundaries & Constraints
- **Stack**: React, Vite, Supabase.
- **Roles**: Admin (content management) and Resident (learner) via Supabase Auth.
- **Strict Limits**:
  - NO real-patient clinical use.
  - NO raw canvas digital waveforms or interactive rendering. Only static curated images.
  - NO AI scanning or pathology flagging functionality in Phase 1 (reserved for Phase 2).
- **Security**: Strict Supabase Row Level Security (RLS) is required for all tables.

## Data Model Layout
1. **Attempts Logging (`attempts`)**: Tracks every user attempt for performance review. Contains `user_id`, `card_id`, `mode`, `correct`, and `timestamp`.
2. **SM-2 State (`user_cards`)**: Tracks the spaced repetition state driving the due-review queue. Contains `user_id`, `card_id`, `repetition`, `ease_factor`, `interval`, and `due_date`.
3. **Core Logic**: Pure mathematical logic for SM-2 resides in `src/lib/sm2.ts` isolated from UI and side-effects.

## Phase 1 Implementation Plan
- [x] Establish base directory structure (`src/lib`, `supabase/migrations`).
- [x] Scaffold Core Database Schema for logging attempts and SM-2 State with RLS.
- [x] Implement Pure SM-2 mathematical logic and test suite.
- [ ] Next: integrate SM-2 logic with backend/Supabase triggers.
- [ ] Next: build UI components for Block 1 (MC Drill), Block 2 (Guided Walkthrough), and Block 3 (Mixed Practice).

## Open Issues / Decisions Needed
- Content volume & authoring methodology.
- Learning category taxonomy.
- Block progression gating rules.
- SRS card identity semantics (per-case vs per-question).
- Standalone flashcard pool separation.
- Free-text grading methodology.
