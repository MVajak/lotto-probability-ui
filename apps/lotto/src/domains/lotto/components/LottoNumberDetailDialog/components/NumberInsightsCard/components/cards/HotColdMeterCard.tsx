import type React from 'react';
import { FireIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, cn } from '@lotto/ui';

import type { NumberDetailDto } from '@/domains/lotto';

interface HotColdMeterProps {
  summary: NumberDetailDto['summary'];
}

/**
 * A simple visual gauge showing if a number is "hot" (appearing more than expected)
 * or "cold" (appearing less than expected).
 */
export const HotColdMeterCard: React.FC<HotColdMeterProps> = ({ summary }) => {
  const { t } = useTranslation();

  const { frequencyPercent, expectedFrequencyPercent, status } = summary;
  // Calculate deviation percent from actual vs expected frequency
  const deviationPercent = frequencyPercent - expectedFrequencyPercent;

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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h4 className="text-body-default-bold text-foreground">{t('numberStats.hotCold.title')}</h4>
        <p className="text-body-small text-muted-foreground">{t('numberStats.hotCold.description')}</p>
      </div>

      <Card className="rounded">
        <CardContent>
          {/* Status header */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
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
            </div>

            {/* Visual meter */}
            <div className="items-center gap-2">
              <div className="relative h-4 overflow-hidden rounded-full bg-gradient-to-r from-primary-blue via-muted-foreground to-primary-orange p-3">
                {/* Indicator */}
                <div
                  className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 size-5 rounded-full border-2 border-background bg-foreground shadow-md transition-all"
                  style={{ left: `${meterPosition}%` }}
                />
              </div>

              {/* Labels */}
              <div className="mb-1 flex justify-between text-body-small text-muted-foreground">
                <span>{t('numberStats.hotCold.cold')}</span>
                <span>{t('numberStats.hotCold.expected')}</span>
                <span>{t('numberStats.hotCold.hot')}</span>
              </div>

              {/* Description */}
              <p className="text-body-small text-muted-foreground">{getStatusDescription()}</p>
            </div>
          </div>

          {/* Frequency comparison */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Card className="rounded">
              <CardContent>
                <p className="text-body-small text-muted-foreground">{t('numberStats.hotCold.actualFrequency')}</p>
                <p className="text-title-small-bold">{frequencyPercent.toFixed(2)}%</p>
              </CardContent>
            </Card>
            <Card className="rounded">
              <CardContent>
                <p className="text-body-small text-muted-foreground">{t('numberStats.hotCold.expectedFrequency')}</p>
                <p className="text-title-small-bold">{expectedFrequencyPercent.toFixed(2)}%</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
