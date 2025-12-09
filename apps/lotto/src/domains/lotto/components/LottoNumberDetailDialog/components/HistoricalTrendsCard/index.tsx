import type React from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, Separator } from '@lotto/ui';

import type { NumberHistoryDto } from '@/domains/lotto';

import {
  HotColdMeter,
  InsufficientDataWarning,
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

  if (!numberHistory) {
    return (
      <Card className="border-2 border-dashed">
        <CardContent className="p-6 text-center">
          <ChartBarIcon className="mx-auto mb-3 size-12 text-muted-foreground/50" />
          <h4 className="mb-1 text-body-default-bold text-muted-foreground">{t('numberStats.historicalTrends')}</h4>
          <p className="text-body-small text-muted-foreground/70">{t('numberStats.historicalTrendsDescription')}</p>
        </CardContent>
      </Card>
    );
  }

  const { summary, trends, occurrences, markovChain } = numberHistory;
  const hasEnoughData = occurrences.length > 0 && trends.timeSeries.length > 0;

  return (
    <Card>
      <CardContent className="p-6">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex items-center justify-center rounded-md bg-base-green p-1.5">
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

            {/* Recent Draws - Visual dots for appearances */}
            <RecentDrawsChart occurrences={occurrences} totalDraws={summary.totalDraws} />

            <Separator className="my-6" />

            {/* Streak Stats - Simple cards for streak/drought info */}
            <StreakStats trends={trends} />

            <Separator className="my-6" />

            {/* Markov Chain - What happens next? */}
            {markovChain ? (
              <MarkovStatsCards markovChain={markovChain} />
            ) : (
              <InsufficientDataWarning
                titleKey="numberStats.insufficientData.markovTitle"
                messageKey="numberStats.insufficientData.markovMessage"
              />
            )}
          </>
        ) : (
          <InsufficientDataWarning
            titleKey="numberStats.insufficientData.generalTitle"
            messageKey="numberStats.insufficientData.generalMessage"
          />
        )}
      </CardContent>
    </Card>
  );
};
