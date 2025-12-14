import type React from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, Separator } from '@lotto/ui';

import type { NumberHistoryDto } from '@/domains/lotto';
import { UpgradePromptCard, useSubscriptionTier } from '@/domains/subscription';

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
  const { isPro, isPremium } = useSubscriptionTier();
  const { summary, trends, timeline, markovChain } = numberHistory;

  const hasBasicData = summary.appearanceCount > 0;
  const hasTrendsData = trends?.timeSeries && trends.timeSeries.length > 0;
  const hasTimelineData = timeline && timeline.length > 0;

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

        {hasBasicData ? (
          <>
            {/* Hot/Cold Meter - Available for all tiers (basic frequency) */}
            <HotColdMeter summary={summary} />

            <Separator className="my-6" />

            {/* Trends & Timeline - PRO and PREMIUM feature */}
            {isPro ? (
              <>
                {/* Trend Sparkline - Simple trend visualization */}
                {hasTrendsData && (
                  <>
                    <TrendSparkline timeSeries={trends.timeSeries} />
                    <Separator className="my-6" />
                  </>
                )}

                {/* Recent Draws - Visual timeline of all draws */}
                {hasTimelineData && (
                  <>
                    <RecentDrawsChart timeline={timeline} />
                    <Separator className="my-6" />
                  </>
                )}

                {/* Streak Stats - Simple cards for streak/drought info */}
                {hasTrendsData && (
                  <>
                    <StreakStats trends={trends} />
                    <Separator className="my-6" />
                  </>
                )}

                {/* Markov Chain - PREMIUM only feature */}
                {isPremium ? (
                  markovChain ? (
                    <MarkovStatsCards markovChain={markovChain} />
                  ) : (
                    <InsufficientDataWarningCard
                      titleKey="numberStats.insufficientData.markovTitle"
                      messageKey="numberStats.insufficientData.markovMessage"
                    />
                  )
                ) : (
                  <UpgradePromptCard feature="markov" requiredTier="PREMIUM" />
                )}
              </>
            ) : (
              <UpgradePromptCard feature="trends" requiredTier="PRO" />
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
