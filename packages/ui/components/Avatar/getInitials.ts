export const getInitials = (name: string): string => {
  const words = name
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  if (words.length === 0) return '';

  if (words.length === 1) {
    // Single word: take first character
    return words[0][0].toUpperCase();
  }

  // Two or more words: take first letter of first and last word
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
};
