import { useCallback, useEffect, useState } from 'react';

/**
 * Custom hook to detect if a media query matches
 * @param query - CSS media query string, e.g. '(min-width: 1024px)'
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const getMatches = useCallback((mediaQuery: string): boolean => {
    // Prevents SSR issues
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia(mediaQuery).matches;
  }, []);

  const [matches, setMatches] = useState<boolean>(() => getMatches(query));

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    // Update state on change
    const handleChange = () => {
      setMatches(getMatches(query));
    };

    // Set initial value
    handleChange();

    // Listen for changes
    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query, getMatches]);

  return matches;
}

// Tailwind breakpoints as convenience constants
export const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
} as const;
