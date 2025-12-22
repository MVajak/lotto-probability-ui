import type React from 'react';
import { useMemo } from 'react';
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Banner, type BannerVariant, Card, CardContent, cn } from '@lotto/ui';

import type { NumberDetailDto } from '@/domains/lotto';

interface MonteCarloCardProps {
  monteCarlo: NumberDetailDto['monteCarlo'];
}

/**
 * Visual Gauge design showing a horizontal bar with expected range and actual marker.
 * Helps users understand if a number's appearances are normal or unusual.
 */
export const MonteCarloCard: React.FC<MonteCarloCardProps> = ({ monteCarlo }) => {
  const { t } = useTranslation();

  const {
    simulationCount = 0,
    percentile5 = 0,
    percentile95 = 0,
    actualAppearances = 0,
    interpretation = 'within_expected',
  } = monteCarlo ?? {};

  // Calculate positions for the gauge (must be called before early return)
  const gaugeData = useMemo(() => {
    // Create a range that includes some buffer on both sides
    const buffer = Math.max(3, Math.floor((percentile95 - percentile5) * 0.3));
    const min = Math.max(0, percentile5 - buffer);
    const max = percentile95 + buffer;
    const range = max - min || 1; // Prevent division by zero

    // Calculate percentage positions
    const expectedStartPct = ((percentile5 - min) / range) * 100;
    const expectedEndPct = ((percentile95 - min) / range) * 100;
    const expectedWidthPct = expectedEndPct - expectedStartPct;
    const actualPct = Math.max(0, Math.min(100, ((actualAppearances - min) / range) * 100));

    return { min, max, expectedStartPct, expectedWidthPct, actualPct };
  }, [percentile5, percentile95, actualAppearances]);

  // Early return after hooks
  if (!monteCarlo) {
    return null;
  }

  const getBannerConfig = (): { variant: BannerVariant; icon: React.ReactNode } => {
    switch (interpretation) {
      case 'above_expected':
        return { variant: 'success', icon: <ArrowTrendingUpIcon className="size-5" /> };
      case 'below_expected':
        return { variant: 'warning', icon: <ArrowTrendingDownIcon className="size-5" /> };
      default:
        return { variant: 'info', icon: <CheckCircleIcon className="size-5" /> };
    }
  };

  const bannerConfig = getBannerConfig();

  const isAbove = actualAppearances > percentile95;
  const isBelow = actualAppearances < percentile5;

  const getMarkerColor = () => {
    if (isAbove) return 'bg-primary-green border-primary-green';
    if (isBelow) return 'bg-primary-red border-primary-red';
    return 'bg-primary-blue border-primary-blue';
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h4 className="text-body-default-bold">{t('numberStats.monteCarlo.title')}</h4>
        <p className="text-body-small text-muted-foreground">{t('numberStats.monteCarlo.description')}</p>
      </div>

      {/* Interpretation banner */}
      <Banner
        variant={bannerConfig.variant}
        icon={bannerConfig.icon}
        title={t(`numberStats.monteCarlo.interpretation.${interpretation}`)}
        description={t(`numberStats.monteCarlo.interpretationDescription.${interpretation}`)}
      />

      {/* Visual Gauge Card */}
      <Card className="rounded">
        <CardContent className="flex flex-col gap-6">
          {/* The Gauge */}
          <div className="flex flex-col gap-3">
            {/* Gauge bar */}
            <div className="relative h-10">
              {/* Background track */}
              <div className="-translate-y-1/2 absolute inset-x-0 top-1/2 h-3 rounded-full bg-muted" />

              {/* Expected range highlight */}
              <div
                className="-translate-y-1/2 absolute top-1/2 h-3 rounded-full border border-primary/40 bg-primary/20"
                style={{
                  left: `${gaugeData.expectedStartPct}%`,
                  width: `${gaugeData.expectedWidthPct}%`,
                }}
              />

              {/* Expected range labels */}
              <div
                className="-bottom-2 absolute text-label-small text-muted-foreground"
                style={{ left: `${gaugeData.expectedStartPct}%`, transform: 'translateX(-50%)' }}
              >
                {percentile5}
              </div>
              <div
                className="-bottom-2 absolute text-label-small text-muted-foreground"
                style={{ left: `${gaugeData.expectedStartPct + gaugeData.expectedWidthPct}%`, transform: 'translateX(-50%)' }}
              >
                {percentile95}
              </div>

              {/* Actual value marker */}
              <div
                className={cn(
                  '-translate-x-1/2 -translate-y-3 absolute top-1/2 flex flex-col items-center'
                )}
                style={{ left: `${gaugeData.actualPct}%` }}
              >
                <div
                  className={cn(
                    'size-6 rounded-full border-3 shadow-lg',
                    getMarkerColor()
                  )}
                />
                <div
                  className={cn(
                    'mt-1 rounded px-2 py-0.5 text-body-small-bold text-white',
                    isAbove && 'bg-primary-green',
                    isBelow && 'bg-primary-red',
                    !isAbove && !isBelow && 'bg-primary-blue'
                  )}
                >
                  {actualAppearances}
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-body-small">
            <div className="flex items-center gap-2">
              <div className="h-3 w-8 rounded border border-primary/40 bg-primary/20" />
              <span className="text-muted-foreground">{t('numberStats.monteCarlo.expectedRangeLegend')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={cn('size-4 rounded-full', getMarkerColor())} />
              <span className="text-muted-foreground">{t('numberStats.monteCarlo.actualValueLegend')}</span>
            </div>
          </div>

          {/* Simple explanation */}
          <p className="text-center text-body-small text-muted-foreground">
            {t('numberStats.monteCarlo.explanationText', { count: simulationCount })}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
