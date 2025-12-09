import type React from 'react';
import { CalendarDaysIcon, ClockIcon, FireIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import type { NumberHistoryDto } from '@/domains/lotto';

interface StreakStatsProps {
  trends: NumberHistoryDto['trends'];
}

/**
 * Simple stat cards showing streak and drought information.
 * Replaces the complex grouped bar chart with clear, easy-to-understand metrics.
 */
export const StreakStats: React.FC<StreakStatsProps> = ({ trends }) => {
  const { t } = useTranslation();

  // Guard against undefined trends
  if (!trends) {
    return null;
  }

  // Safely destructure with fallback values
  const currentStreak = trends.currentStreak ?? 0;
  const longestStreak = trends.longestStreak ?? 0;
  const currentDroughtDays = trends.currentDroughtDays ?? 0;
  const longestDroughtDays = trends.longestDroughtDays ?? 0;
  const averageDaysBetweenAppearances = trends.averageDaysBetweenAppearances ?? 0;

  const stats = [
    {
      icon: <ClockIcon className="size-5 text-primary-blue" />,
      label: t('numberStats.streakStats.daysSinceLastAppearance'),
      value: currentDroughtDays,
      unit: t('numberStats.streakStats.days', { count: currentDroughtDays }),
      highlight: currentDroughtDays > averageDaysBetweenAppearances,
      description:
        currentDroughtDays === 0
          ? t('numberStats.streakStats.appearedRecently')
          : currentDroughtDays > longestDroughtDays * 0.8
            ? t('numberStats.streakStats.longWait')
            : t('numberStats.streakStats.normalWait'),
    },
    {
      icon: <FireIcon className="size-5 text-primary-orange" />,
      label: t('numberStats.streakStats.currentStreak'),
      value: currentStreak,
      unit: t('numberStats.streakStats.draws', { count: currentStreak }),
      highlight: currentStreak > 0,
      description:
        currentStreak === 0
          ? t('numberStats.streakStats.noStreak')
          : currentStreak >= longestStreak
            ? t('numberStats.streakStats.bestStreak')
            : t('numberStats.streakStats.activeStreak'),
    },
    {
      icon: <TrophyIcon className="size-5 text-gold" />,
      label: t('numberStats.streakStats.longestStreak'),
      value: longestStreak,
      unit: t('numberStats.streakStats.draws', { count: longestStreak }),
      highlight: false,
      description: t('numberStats.streakStats.longestStreakDesc'),
    },
    {
      icon: <CalendarDaysIcon className="size-5 text-muted-foreground" />,
      label: t('numberStats.streakStats.longestGap'),
      value: longestDroughtDays,
      unit: t('numberStats.streakStats.days', { count: longestDroughtDays }),
      highlight: false,
      description: t('numberStats.streakStats.longestGapDesc'),
    },
  ];

  return (
    <div>
      <h4 className="mb-1 text-body-default-bold">{t('numberStats.streakStats.title')}</h4>
      <p className="mb-4 text-body-small text-muted-foreground">{t('numberStats.streakStats.description')}</p>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg bg-muted/50 p-4 transition-colors hover:bg-muted/70">
            <div className="mb-2 flex items-center gap-2">
              {stat.icon}
              <span className="text-body-small text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-title-default-bold">
              {stat.value}
              <span className="ml-1 font-normal text-body-small text-muted-foreground">{stat.unit}</span>
            </p>
            <p className="mt-1 text-body-small text-subtle-foreground">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Average days between appearances */}
      <div className="mt-4 rounded-lg bg-base-blue p-3">
        <p className="text-body-small text-muted-foreground">
          <strong>{t('numberStats.streakStats.avgGapLabel')}</strong>{' '}
          {t('numberStats.streakStats.avgGapValue', { days: averageDaysBetweenAppearances.toFixed(1) })}
        </p>
      </div>
    </div>
  );
};
