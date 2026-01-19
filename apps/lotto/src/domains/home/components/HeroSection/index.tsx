import { ChartBarIcon, GlobeAltIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { currentUserQuery } from '@/domains/auth';

const stats = [
  { icon: SparklesIcon, labelKey: 'home.hero.stats.lotteries', value: '54' },
  { icon: ChartBarIcon, labelKey: 'home.hero.stats.draws', value: '50K+' },
  { icon: GlobeAltIcon, labelKey: 'home.hero.stats.regions', value: '10' },
];

export function HeroSection() {
  const { t } = useTranslation();
  const { data } = useQuery(currentUserQuery);

  const firstName = data?.user?.firstName?.split(' ')[0] || null;

  return (
    <motion.div
      className="flex flex-col gap-6 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Greeting */}
      <div className="flex flex-col gap-2">
        <motion.h1
          className="text-foreground text-title-small"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {firstName ? t('home.hero.welcomeBack', { name: firstName }) : t('home.hero.welcome')}
        </motion.h1>
        <motion.p
          className="text-body-default text-muted-foreground"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {t('home.hero.tagline')}
        </motion.p>
      </div>

      {/* Stats Row */}
      <motion.div
        className="flex flex-wrap gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.labelKey}
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <stat.icon className="size-4 text-primary" />
            <span className="text-body-small">
              <span className="font-semibold text-foreground">{stat.value}</span>
              <span className="text-muted-foreground"> {t(stat.labelKey)}</span>
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
