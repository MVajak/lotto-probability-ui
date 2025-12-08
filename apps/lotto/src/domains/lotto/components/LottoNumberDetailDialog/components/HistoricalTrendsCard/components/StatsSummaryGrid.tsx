import type React from 'react';
import { useTranslation } from 'react-i18next';

import type { NumberHistoryDto } from '@/domains/lotto';

interface StatsSummaryGridProps {
  trends: NumberHistoryDto['trends'];
  markovChain?: NumberHistoryDto['markovChain'];
}

export const StatsSummaryGrid: React.FC<StatsSummaryGridProps> = ({ trends, markovChain }) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {/* Current Streak */}
      <div className="rounded bg-muted/50 p-3">
        <p className="text-body-small text-muted-foreground">{t('numberStats.statsSummary.currentStreak')}</p>
        <p className="text-foreground text-title-small-bold">{trends.currentStreak}</p>
        <p className="text-body-small text-muted-foreground">
          {t('numberStats.statsSummary.longestStreak', { count: trends.longestStreak })}
        </p>
      </div>

      {/* Current Drought */}
      <div className="rounded bg-muted/50 p-3">
        <p className="text-body-small text-muted-foreground">{t('numberStats.statsSummary.currentDrought')}</p>
        <p className="text-primary-orange text-title-small-bold">
          {t('numberStats.statsSummary.days', { count: trends.currentDroughtDays })}
        </p>
        <p className="text-body-small text-muted-foreground">
          {t('numberStats.statsSummary.longestStreak', { count: trends.longestDroughtDays })}
        </p>
      </div>

      {/* Average Days Between */}
      <div className="rounded bg-muted/50 p-3">
        <p className="text-body-small text-muted-foreground">{t('numberStats.statsSummary.avgDaysBetween')}</p>
        <p className="text-title-small-bold">
          {t('numberStats.statsSummary.days', { count: trends.averageDaysBetweenAppearances })}
        </p>
      </div>

      {/* Steady State Probability */}
      {markovChain && (
        <div className="rounded bg-muted/50 p-3">
          <p className="text-body-small text-muted-foreground">{t('numberStats.statsSummary.steadyStateProb')}</p>
          <p className="text-primary-green text-title-small-bold">
            {(markovChain.steadyStateProbability * 100).toFixed(1)}%
          </p>
        </div>
      )}
    </div>
  );
};
