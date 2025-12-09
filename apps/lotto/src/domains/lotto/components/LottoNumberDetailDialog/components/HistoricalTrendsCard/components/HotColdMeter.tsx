import type React from 'react';
import { FireIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

import { cn } from '@lotto/ui';

import type { NumberHistoryDto } from '@/domains/lotto';

interface HotColdMeterProps {
  summary: NumberHistoryDto['summary'];
}

/**
 * A simple visual gauge showing if a number is "hot" (appearing more than expected)
 * or "cold" (appearing less than expected).
 */
export const HotColdMeter: React.FC<HotColdMeterProps> = ({ summary }) => {
  const { t } = useTranslation();

  const { frequencyPercent, expectedFrequencyPercent, status } = summary;

  // Deviation might not be available
  const hasDeviation = summary.deviationPercent !== undefined && summary.deviationPercent !== null;
  const deviationPercent = summary.deviationPercent ?? 0;

  // Normalize deviation to a -100 to +100 scale for the meter
  // Clamp to reasonable bounds
  const normalizedDeviation = Math.max(-100, Math.min(100, deviationPercent));

  // Calculate meter position (0 = far left cold, 50 = neutral, 100 = far right hot)
  const meterPosition = 50 + normalizedDeviation / 2;

  const isHot = status === 'frequent';
  const isCold = status === 'rare';
  const isNeutral = status === 'normal';

  const getStatusIcon = () => {
    if (isHot) return <FireIcon className="size-6 text-primary-orange" />;
    if (isCold) return <SparklesIcon className="size-6 text-primary-blue" />;
    return null;
  };

  const getStatusLabel = () => {
    if (isHot) return t('numberStats.hotCold.hot');
    if (isCold) return t('numberStats.hotCold.cold');
    return t('numberStats.hotCold.neutral');
  };

  const getStatusDescription = () => {
    if (isHot) {
      return t('numberStats.hotCold.hotDescription', { percent: Math.abs(deviationPercent).toFixed(1) });
    }
    if (isCold) {
      return t('numberStats.hotCold.coldDescription', { percent: Math.abs(deviationPercent).toFixed(1) });
    }
    return t('numberStats.hotCold.neutralDescription');
  };

  return (
    <div>
      <h4 className="mb-1 text-body-default-bold">{t('numberStats.hotCold.title')}</h4>
      <p className="mb-4 text-body-small text-muted-foreground">{t('numberStats.hotCold.description')}</p>

      <div className="rounded-lg bg-muted/50 p-4">
        {/* Status header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span
              className={cn(
                'text-title-small-bold',
                isHot && 'text-primary-orange',
                isCold && 'text-primary-blue',
                isNeutral && 'text-foreground'
              )}
            >
              {getStatusLabel()}
            </span>
          </div>
          {hasDeviation && (
            <span
              className={cn(
                'text-body-default-bold',
                deviationPercent > 0 && 'text-primary-orange',
                deviationPercent < 0 && 'text-primary-blue'
              )}
            >
              {deviationPercent > 0 ? '+' : ''}
              {deviationPercent.toFixed(1)}%
            </span>
          )}
        </div>

        {/* Visual meter - only show when deviation data available */}
        {hasDeviation && (
          <>
            <div className="relative mb-2 h-3 overflow-hidden rounded-full bg-gradient-to-r from-primary-blue via-muted-foreground to-primary-orange">
              {/* Indicator */}
              <div
                className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 size-5 rounded-full border-2 border-background bg-foreground shadow-md transition-all"
                style={{ left: `${meterPosition}%` }}
              />
            </div>

            {/* Labels */}
            <div className="mb-4 flex justify-between text-body-small text-muted-foreground">
              <span>{t('numberStats.hotCold.cold')}</span>
              <span>{t('numberStats.hotCold.expected')}</span>
              <span>{t('numberStats.hotCold.hot')}</span>
            </div>

            {/* Description */}
            <p className="text-body-small text-muted-foreground">{getStatusDescription()}</p>
          </>
        )}

        {/* Frequency comparison */}
        <div className={cn('grid grid-cols-2 gap-4', hasDeviation && 'mt-4')}>
          <div className="rounded-lg bg-background p-3">
            <p className="text-body-small text-muted-foreground">{t('numberStats.hotCold.actualFrequency')}</p>
            <p className="text-title-small-bold">{frequencyPercent.toFixed(2)}%</p>
          </div>
          <div className="rounded-lg bg-background p-3">
            <p className="text-body-small text-muted-foreground">{t('numberStats.hotCold.expectedFrequency')}</p>
            <p className="text-title-small-bold">{expectedFrequencyPercent.toFixed(2)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};
