import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { motion } from 'motion/react';

import { useTheme } from '@/domains/theme';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className="relative flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: resolvedTheme === 'dark' ? 180 : 0,
          scale: resolvedTheme === 'dark' ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute"
      >
        <SunIcon className="size-5" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          rotate: resolvedTheme === 'light' ? -180 : 0,
          scale: resolvedTheme === 'light' ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute"
      >
        <MoonIcon className="size-5" />
      </motion.div>
    </motion.button>
  );
}
