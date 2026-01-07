import type React from 'react';
import { CalendarDaysIcon, ClockIcon, FireIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, StatCard } from '@lotto/ui';

import type { NumberDetailDto } from '@/domains/lotto';

interface StreakStatsProps {
  trends: NumberDetailDto['trends'];
}

/**
 * Simple stat cards showing streak and drought information.
 * Replaces the complex grouped bar chart with clear, easy-to-understand metrics.
 */
export const StreakStatsCard: React.FC<StreakStatsProps> = ({ trends }) => {
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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h4 className="text-body-default-bold text-foreground">{t('numberStats.streakStats.title')}</h4>
        <p className="text-body-small text-muted-foreground">{t('numberStats.streakStats.description')}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            unit={stat.unit}
            description={stat.description}
          />
        ))}
      </div>

      {/* Average days between appearances */}
      <Card className="rounded bg-base-blue">
        <CardContent>
          <p className="text-body-small text-muted-foreground">
            <strong>{t('numberStats.streakStats.avgGapLabel')}</strong>{' '}
            {t('numberStats.streakStats.avgGapValue', { days: averageDaysBetweenAppearances.toFixed(1) })}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
