import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export const BrandLogo = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="relative z-10"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 scale-150 rounded-full bg-gold/30 blur-xl" />
          <img src="/img/lotto_lens.png" alt="Lotto Lens" className="relative size-12" />
        </div>
        <span className="text-foreground text-title-large-bold">{t('authLayout.title')}</span>
      </div>
    </motion.div>
  );
};
