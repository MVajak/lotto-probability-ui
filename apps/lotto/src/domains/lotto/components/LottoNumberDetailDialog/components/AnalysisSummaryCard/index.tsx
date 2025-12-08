import type React from 'react';
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, cn } from '@lotto/ui';

import type { NumberStat } from '@/domains/lotto';

interface AnalysisSummaryCardProps {
  numberStat: NumberStat;
}

export const AnalysisSummaryCard: React.FC<AnalysisSummaryCardProps> = ({ numberStat }) => {
  const { t } = useTranslation();

  if (!numberStat.interpretation) return null;

  const isMoreFrequent = numberStat.interpretation.percentDifference > 0;
  const hasDeviation = numberStat.interpretation.percentDifference !== 0;

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex items-center justify-center rounded-md bg-base-orange p-1.5">
            <LightBulbIcon className="size-5 text-primary-orange" />
          </div>
          <h3 className="text-title-small-bold">{t('numberStats.analysisSummary')}</h3>
        </div>

        {/* Appearance count with modern styling */}
        <div className="mb-4 rounded-lg border border-border bg-muted/50 p-4">
          <p className="leading-relaxed">
            {t('numberStats.appearedTimes', {
              count: numberStat.interpretation.appearedCount,
              total: numberStat.interpretation.totalDraws,
            })
              .split(/(\d+)/g)
              .map((part, index) =>
                /^\d+$/.test(part) ? (
                  <span key={`num-${part}-${index}`} className="text-body-large-bold text-foreground">
                    {part}
                  </span>
                ) : (
                  <span key={`text-${part}-${index}`}>{part}</span>
                )
              )}
          </p>
        </div>

        {/* Deviation highlight with icon */}
        {hasDeviation && (
          <div
            className={cn(
              'rounded-lg border-2 p-5',
              isMoreFrequent
                ? 'border-primary-red bg-base-red shadow-[0_4px_12px_color-mix(in_srgb,var(--color-primary-red)_10%,transparent)]'
                : 'border-primary-blue bg-base-blue shadow-[0_4px_12px_color-mix(in_srgb,var(--color-primary-blue)_10%,transparent)]'
            )}
          >
            <div className="flex items-start gap-3">
              <div className={cn('mt-0.5 rounded p-1.5', isMoreFrequent ? 'bg-secondary-red' : 'bg-secondary-blue')}>
                {isMoreFrequent ? (
                  <ArrowTrendingUpIcon className="size-5 text-primary-red" />
                ) : (
                  <ArrowTrendingDownIcon className="size-5 text-primary-blue" />
                )}
              </div>
              <p className="flex-1 text-body-default-bold leading-relaxed">
                {isMoreFrequent
                  ? t('numberStats.appearingMoreThanExpected', {
                      percent: numberStat.interpretation.percentDifference,
                    })
                      .split(/(\d+%)/g)
                      .map((part, index) =>
                        /^\d+%$/.test(part) ? (
                          <span key={`freq-${part}-${index}`} className="text-body-large-bold text-gold">
                            {part}
                          </span>
                        ) : (
                          <span key={`text-${part}-${index}`}>{part}</span>
                        )
                      )
                  : t('numberStats.appearingLessThanExpected', {
                      percent: Math.abs(numberStat.interpretation.percentDifference),
                    })
                      .split(/(\d+%)/g)
                      .map((part, index) =>
                        /^\d+%$/.test(part) ? (
                          <span key={`rare-${part}-${index}`} className="text-body-large-bold text-primary-blue">
                            {part}
                          </span>
                        ) : (
                          <span key={`text-${part}-${index}`}>{part}</span>
                        )
                      )}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
