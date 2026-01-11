import type React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { Logo } from '@/domains/brand';

interface BrandLayoutProps {
  children: React.ReactNode;
  /** Slot for top-right content like language selector */
  topRight?: React.ReactNode;
}

export const BrandLayout: React.FC<BrandLayoutProps> = ({ children, topRight }) => {
  const { t } = useTranslation();

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-background bg-glass-mesh p-4">
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="-top-1/4 -left-1/4 absolute size-3/4 rounded-full bg-primary/10 blur-3xl" />
        <div className="-right-1/4 -bottom-1/4 absolute size-3/4 rounded-full bg-gold/10 blur-3xl" />
      </div>

      {/* Top right slot (e.g., language selector) */}
      {topRight && <div className="absolute top-4 right-4 z-20">{topRight}</div>}

      {/* Logo */}
      <motion.div
        className="relative z-10 mb-8 mt-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 scale-150 rounded-full bg-gold/30 blur-xl" />
            <Logo size="lg" className="relative" />
          </div>
          <span className="text-foreground text-title-large-bold">{t('authLayout.title')}</span>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl">{children}</div>
    </div>
  );
};
