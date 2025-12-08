import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const THEME_STORAGE_KEY = 'lotto-theme';
const themes = ['system', 'light', 'dark'] as const;

type Theme = (typeof themes)[number];

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});

interface ThemeHookResult extends ThemeContextType {
  resolvedTheme: Omit<Theme, 'system'>;
}

export const useTheme = (): ThemeHookResult => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  const [systemTheme, setSystemTheme] = useState<Omit<Theme, 'system'>>('light');

  useEffect(() => {
    const matchMedia = typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)');
    if (matchMedia) {
      setSystemTheme(matchMedia.matches ? 'dark' : 'light');

      const changeListener = (event: MediaQueryListEvent) => {
        setSystemTheme(event.matches ? 'dark' : 'light');
      };

      matchMedia.addEventListener('change', changeListener);

      return () => {
        matchMedia.removeEventListener('change', changeListener);
      };
    }
  }, []);

  const { theme, setTheme } = context;

  const resolvedTheme = useMemo(() => {
    if (theme === 'system') {
      return systemTheme;
    }
    return theme;
  }, [theme, systemTheme]);

  return { theme, setTheme, resolvedTheme };
};

const isValidTheme = (value: unknown): value is Theme => {
  return typeof value === 'string' && themes.includes(value as Theme);
};

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, _setTheme] = useState<Theme>('light');

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme && isValidTheme(storedTheme)) {
      _setTheme(storedTheme);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    // Disable transitions temporarily during theme change
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('disable-transitions');
      _setTheme(newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);

      // Re-enable transitions after theme change is applied
      requestAnimationFrame(() => {
        document.documentElement.classList.remove('disable-transitions');
      });
    } else {
      _setTheme(newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    }
  };

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

// Component that applies the theme class to the document
export const ThemeApplier = () => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [resolvedTheme]);

  return null;
};
