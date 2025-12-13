import type React from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, Separator } from '@lotto/ui';

import type { NumberHistoryDto } from '@/domains/lotto';

import {
  HotColdMeter,
  InsufficientDataWarningCard,
  MarkovStatsCards,
  RecentDrawsChart,
  StreakStats,
  TrendSparkline,
} from './components';

interface HistoricalTrendsCardProps {
  numberHistory: NumberHistoryDto;
}

export const HistoricalTrendsCard: React.FC<HistoricalTrendsCardProps> = ({ numberHistory }) => {
  const { t } = useTranslation();
  const { summary, trends, timeline, markovChain } = numberHistory;
  const hasEnoughData = summary.appearanceCount > 0 && trends.timeSeries.length > 0;

  return (
    <Card className="h-full">
      <CardContent className="flex flex-col gap-4 p-2">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-md bg-base-green p-2">
            <ChartBarIcon className="size-5 text-primary-green" />
          </div>
          <h3 className="text-title-small-bold">{t('numberStats.historicalTrendsTitle')}</h3>
        </div>

        {hasEnoughData ? (
          <>
            {/* Hot/Cold Meter - Simple visual for frequency comparison */}
            <HotColdMeter summary={summary} />

            <Separator className="my-6" />

            {/* Trend Sparkline - Simple trend visualization */}
            {trends.timeSeries.length > 0 && <TrendSparkline timeSeries={trends.timeSeries} />}

            {trends.timeSeries.length > 0 && <Separator className="my-6" />}

            {/* Recent Draws - Visual timeline of all draws */}
            <RecentDrawsChart timeline={timeline} />

            <Separator className="my-6" />

            {/* Streak Stats - Simple cards for streak/drought info */}
            <StreakStats trends={trends} />

            <Separator className="my-6" />

            {/* Markov Chain - What happens next? */}
            {markovChain ? (
              <MarkovStatsCards markovChain={markovChain} />
            ) : (
              <InsufficientDataWarningCard
                titleKey="numberStats.insufficientData.markovTitle"
                messageKey="numberStats.insufficientData.markovMessage"
              />
            )}
          </>
        ) : (
          <InsufficientDataWarningCard
            titleKey="numberStats.insufficientData.generalTitle"
            messageKey="numberStats.insufficientData.generalMessage"
          />
        )}
      </CardContent>
    </Card>
  );
};
