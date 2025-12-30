type DateFormat = 'short' | 'long';

/**
 * Formats a date string or Date object
 * @param date - ISO date string or Date object
 * @param format - 'short' (e.g., "12/30/2025") or 'long' (e.g., "December 30, 2025")
 * @returns Formatted date string, or empty string if date is invalid
 */
export function formatDate(date: string | Date | undefined | null, format: DateFormat = 'short'): string {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (format === 'long') {
    return dateObj.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return dateObj.toLocaleDateString();
}
