import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export const MobileBranding = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="relative z-10 mb-8 flex flex-col items-center gap-2 text-center lg:hidden"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative mb-2">
        <div className="absolute inset-0 scale-150 rounded-full bg-gold/20 blur-xl" />
        <img src="/img/lotto_lens.png" alt="Lotto Lens" className="relative size-16" />
      </div>
      <h1 className="text-foreground text-title-large-bold">{t('authLayout.title')}</h1>
      <p className="text-body-small text-muted-foreground">{t('authLayout.subtitle')}</p>
    </motion.div>
  );
};
