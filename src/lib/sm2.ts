export interface SM2State {
  repetition: number;
  easeFactor: number;
  interval: number;
}

/**
 * Calculates the next state for an SM-2 spaced repetition card.
 *
 * @param quality - User's score for the card (0-5)
 *                  0: Complete blackout.
 *                  1: Incorrect response; the correct one remembered.
 *                  2: Incorrect response; where the correct one seemed easy to recall.
 *                  3: Correct response recalled with serious difficulty.
 *                  4: Correct response after a hesitation.
 *                  5: Perfect response.
 * @param repetition - The current repetition count (0 for new cards)
 * @param easeFactor - The current ease factor (typically defaults to 2.5)
 * @param interval - The current interval in days (0 for new cards)
 * @returns The new state (repetition, easeFactor, interval)
 */
export function calculateSM2(
  quality: number,
  repetition: number,
  easeFactor: number,
  interval: number
): SM2State {
  let newRepetition: number;
  let newInterval: number;
  let newEaseFactor: number;

  // Ensure quality is between 0 and 5
  const clampedQuality = Math.max(0, Math.min(5, quality));

  if (clampedQuality >= 3) {
    // Correct response
    if (repetition === 0) {
      newInterval = 1;
    } else if (repetition === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * easeFactor);
    }
    newRepetition = repetition + 1;
  } else {
    // Incorrect response
    newRepetition = 0;
    newInterval = 1;
  }

  // Calculate new ease factor
  newEaseFactor =
    easeFactor +
    (0.1 - (5 - clampedQuality) * (0.08 + (5 - clampedQuality) * 0.02));

  // Ease factor must not be lower than 1.3
  newEaseFactor = Math.max(1.3, newEaseFactor);

  return {
    repetition: newRepetition,
    easeFactor: newEaseFactor,
    interval: newInterval,
  };
}
