import { getInitials } from '../getInitials';

describe('getInitials', () => {
  it('should return first character for single word', () => {
    expect(getInitials('John')).toBe('J');
    expect(getInitials('Sarah')).toBe('S');
  });

  it('should return first and last initials for two words', () => {
    expect(getInitials('John Wick')).toBe('JW');
    expect(getInitials('Sarah Connor')).toBe('SC');
  });

  it('should return first and last initials for three or more words', () => {
    expect(getInitials('John Michael Wick')).toBe('JW');
    expect(getInitials('Mary Jane Watson Parker')).toBe('MP');
  });

  it('should handle empty string', () => {
    expect(getInitials('')).toBe('');
  });

  it('should handle string with only whitespace', () => {
    expect(getInitials('   ')).toBe('');
  });

  it('should handle extra whitespace between words', () => {
    expect(getInitials('John   Wick')).toBe('JW');
  });

  it('should convert to uppercase', () => {
    expect(getInitials('john')).toBe('J');
    expect(getInitials('john wick')).toBe('JW');
  });
});
