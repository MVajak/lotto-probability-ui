import type React from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, Separator } from '@lotto/ui';

import type { NumberDetailDto } from '@/domains/lotto';
import { UpgradePromptCard, useSubscriptionTier } from '@/domains/subscription';

import {
  AutocorrelationChart,
  HotColdMeter,
  InsufficientDataWarningCard,
  MarkovStatsCards,
  MonteCarloCard,
  PairAnalysisCard,
  RecentDrawsChart,
  SeasonalPatternsCard,
  StreakStats,
  TrendSparkline,
} from './components';

interface HistoricalTrendsCardProps {
  numberDetail: NumberDetailDto;
}

export const HistoricalTrendsCard: React.FC<HistoricalTrendsCardProps> = ({ numberDetail }) => {
  const { t } = useTranslation();
  const { isPremium } = useSubscriptionTier();
  const {
    summary,
    trends,
    timeline,
    markovChain,
    autocorrelation,
    pairAnalysis,
    monteCarlo,
    seasonalPatterns,
  } = numberDetail;

  const hasBasicData = summary.appearanceCount > 0;
  const hasTrendsData = trends?.timeSeries && trends.timeSeries.length > 0;
  const hasTimelineData = timeline && timeline.length > 0;

  const allPremiumFeaturesAvailable =
    markovChain && autocorrelation && pairAnalysis && monteCarlo && seasonalPatterns;

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
            {/* Hot/Cold Meter */}
            <HotColdMeter summary={summary} />

            <Separator className="my-6" />

            {/* Trend Sparkline */}
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

            {/* Streak Stats */}
            {hasTrendsData && (
              <>
                <StreakStats trends={trends} />
                <Separator className="my-6" />
              </>
            )}

            {/* Premium Features */}
            {isPremium ? (
              <>
                {/* Markov Chain */}
                {markovChain && (
                  <>
                    <MarkovStatsCards markovChain={markovChain} />
                    <Separator className="my-6" />
                  </>
                )}

                {/* Autocorrelation */}
                {autocorrelation && (
                  <>
                    <AutocorrelationChart autocorrelation={autocorrelation} />
                    <Separator className="my-6" />
                  </>
                )}

                {/* Pair Analysis */}
                {pairAnalysis && (
                  <>
                    <PairAnalysisCard pairAnalysis={pairAnalysis} />
                    <Separator className="my-6" />
                  </>
                )}

                {/* Monte Carlo Simulation */}
                {monteCarlo && (
                  <>
                    <MonteCarloCard monteCarlo={monteCarlo} />
                    <Separator className="my-6" />
                  </>
                )}

                {/* Seasonal Patterns */}
                {seasonalPatterns && (
                  <>
                    <SeasonalPatternsCard seasonalPatterns={seasonalPatterns} />
                    {!allPremiumFeaturesAvailable && <Separator className="my-6" />}
                  </>
                )}

                {/* Show consolidated warning if any features are missing data */}
                {!allPremiumFeaturesAvailable && (
                  <InsufficientDataWarningCard
                    premiumFeatures={{
                      MARKOV_CHAIN: Boolean(markovChain),
                      AUTOCORRELATION: Boolean(autocorrelation),
                      PAIR_ANALYSIS: Boolean(pairAnalysis),
                      MONTE_CARLO: Boolean(monteCarlo),
                      SEASONAL_PATTERNS: Boolean(seasonalPatterns),
                    }}
                  />
                )}
              </>
            ) : (
              <UpgradePromptCard requiredTier="PREMIUM" />
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
