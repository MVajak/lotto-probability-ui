import { Big } from 'big.js';

import { convertToPercentage, safeBig } from '../calculations'; // update the path

describe('CALCULATIONS', () => {
  describe('safeBig', () => {
    test('should return Big(0) for null or undefined', () => {
      expect(safeBig(null).eq(0)).toBe(true);
      expect(safeBig(undefined).eq(0)).toBe(true);
    });

    test('should trim string and parses correctly', () => {
      expect(safeBig(' 123 ').eq(123)).toBe(true);
    });

    test('should return Big(0) for empty string or non-numeric string', () => {
      expect(safeBig('').eq(0)).toBe(true);
      expect(safeBig('abc').eq(0)).toBe(true);
      expect(safeBig('   ').eq(0)).toBe(true);
    });

    test('should return Big instance for number input', () => {
      expect(safeBig(456).eq(456)).toBe(true);
    });

    test('should return the same Big instance if input is Big', () => {
      const bigVal = Big(789);

      expect(safeBig(bigVal).eq(bigVal)).toBe(true);
    });
  });

  describe('convertToPercentage', () => {
    test('should convert number to percentage string with 2 decimals', () => {
      expect(convertToPercentage(0.1234)).toBe('12.34%');
    });

    test('should handle string inputs', () => {
      expect(convertToPercentage('0.5')).toBe('50.00%');
    });

    test('should handle null or undefined as zero', () => {
      expect(convertToPercentage(null)).toBe('0.00%');
      expect(convertToPercentage(undefined)).toBe('0.00%');
    });

    test('should handle Big input', () => {
      expect(convertToPercentage(Big(0.75))).toBe('75.00%');
    });
  });
});
