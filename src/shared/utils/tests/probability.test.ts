import { createStubInstances } from '../../test-utils/mocking';
import { NumberStat } from '../../types';
import { getMostProbableDigitsByPosition, getTopProbabilityStats } from '../probability';

describe('PROBABILITY', () => {
  describe('getTopProbabilityStats', () => {
    const minCount = 3;
    const numberStats = createStubInstances<NumberStat>([
      { digit: 1, probability: 0.2 },
      { digit: 2, probability: 0.8 },
      { digit: 3, probability: 0.5 },
      { digit: 4, probability: 0.8 },
      { digit: 5, probability: 0.3 },
    ]);

    test('should return empty array when input data is empty', () => {
      expect(getTopProbabilityStats([], minCount)).toEqual([]);
    });

    test('should return original data when data.length <= minCount', () => {
      const numberStatsLocal = createStubInstances<NumberStat>([
        { digit: 1, probability: 0.4 },
        { digit: 2, probability: 0.3 },
      ]);

      expect(getTopProbabilityStats(numberStatsLocal, minCount)).toEqual(numberStatsLocal);
    });

    test('should return top N items based on probability (including ties)', () => {
      const minCountLocal = 2;
      const result = getTopProbabilityStats(numberStats, minCountLocal);

      expect(result).toEqual(expect.arrayContaining([numberStats[1], numberStats[3]]));
      expect(result.length).toBe(minCountLocal);
    });

    test('should include items with equal probability at threshold', () => {
      const result = getTopProbabilityStats(numberStats, minCount);

      expect(result).toEqual(expect.arrayContaining([numberStats[1], numberStats[3], numberStats[2]]));
      expect(result.length).toBe(minCount);
    });

    test('should sort input data descendingly by probability', () => {
      const result = getTopProbabilityStats(numberStats, minCount);
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i].probability).toBeGreaterThanOrEqual(result[i + 1].probability);
      }
    });
  });

  describe('getMostProbableDigitsByPosition', () => {
    const numberStats = createStubInstances<NumberStat>([
      { digit: 1, position: 0, probability: 0.2 },
      { digit: 2, position: 0, probability: 0.8 },
      { digit: 3, position: 0, probability: 0.8 },
      { digit: 4, position: 1, probability: 0.4 },
      { digit: 5, position: 1, probability: 0.9 },
    ]);

    test('returns most probable digits per position', () => {
      const result = getMostProbableDigitsByPosition(numberStats);

      expect(result[0]).toHaveLength(2);
      expect(result[0]).toEqual(expect.arrayContaining([numberStats[1], numberStats[2]]));
      expect(result[1]).toHaveLength(1);
      expect(result[1][0]).toEqual(numberStats[4]);
    });

    test('ignores entries with null or undefined position', () => {
      const numberStatsLocal = createStubInstances<NumberStat>([
        { digit: 1, position: 0, probability: 0.9 },
        { digit: 2, position: null, probability: 1.0 },
        { digit: 3, position: undefined, probability: 0.6 },
      ]);
      const result = getMostProbableDigitsByPosition(numberStatsLocal);

      expect(result[0]).toHaveLength(1);
      expect(Object.keys(result)).not.toContain('null');
      expect(Object.keys(result)).not.toContain('undefined');
      expect(
        Object.values(result)
          .flat()
          .some((s) => s.digit === 2 || s.digit === 3)
      ).toBe(false);
    });

    test('returns empty object when input is empty', () => {
      const result = getMostProbableDigitsByPosition([]);

      expect(result).toEqual({});
    });

    test('handles single entry correctly', () => {
      const numberStatsLocal = createStubInstances<NumberStat>([{ digit: 9, position: 2, probability: 0.99 }]);
      const result = getMostProbableDigitsByPosition(numberStatsLocal);

      expect(result[2]).toHaveLength(1);
      expect(result[2][0]).toEqual(numberStatsLocal[0]);
    });

    test('handles all items with unique positions', () => {
      const uniquePositions: NumberStat[] = createStubInstances<NumberStat>([
        { digit: 1, position: 0, probability: 0.1 },
        { digit: 2, position: 1, probability: 0.2 },
        { digit: 3, position: 2, probability: 0.3 },
      ]);

      const result = getMostProbableDigitsByPosition(uniquePositions);

      expect(Object.keys(result)).toHaveLength(3);
      expect(result[0][0].digit).toBe(1);
      expect(result[1][0].digit).toBe(2);
      expect(result[2][0].digit).toBe(3);
    });
  });
});
