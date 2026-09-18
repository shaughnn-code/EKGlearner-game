import { describe, it, expect } from 'vitest';
import { calculateSM2 } from './sm2';

describe('calculateSM2', () => {
  it('should set interval to 1 for correct answer on repetition 0', () => {
    const result = calculateSM2(4, 0, 2.5, 0);
    expect(result.interval).toBe(1);
    expect(result.repetition).toBe(1);
  });

  it('should set interval to 6 for correct answer on repetition 1', () => {
    const result = calculateSM2(4, 1, 2.5, 1);
    expect(result.interval).toBe(6);
    expect(result.repetition).toBe(2);
  });

  it('should multiply interval by ease factor for higher repetitions', () => {
    const result = calculateSM2(4, 2, 2.5, 6);
    expect(result.interval).toBe(15); // Math.round(6 * 2.5) = 15
    expect(result.repetition).toBe(3);
  });

  it('should reset repetition and set interval to 1 for incorrect answers (quality < 3)', () => {
    const result = calculateSM2(2, 5, 2.5, 30);
    expect(result.interval).toBe(1);
    expect(result.repetition).toBe(0);
    expect(result.easeFactor).toBeLessThan(2.5); // Ease factor should decrease
  });

  it('should not let ease factor drop below 1.3', () => {
    // If ease factor is already 1.3 and quality is 0, it should not drop below 1.3
    const result = calculateSM2(0, 5, 1.3, 30);
    expect(result.easeFactor).toBe(1.3);
  });

  it('should increase ease factor for perfect response (quality 5)', () => {
    const result = calculateSM2(5, 0, 2.5, 0);
    expect(result.easeFactor).toBeGreaterThan(2.5); // Ease factor should increase
  });

  it('should not change ease factor for quality 4', () => {
    const result = calculateSM2(4, 0, 2.5, 0);
    expect(result.easeFactor).toBeCloseTo(2.5, 5); // Ease factor should be same
  });
});
