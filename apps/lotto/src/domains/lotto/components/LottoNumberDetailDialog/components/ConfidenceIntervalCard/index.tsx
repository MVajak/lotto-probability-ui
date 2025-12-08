import type React from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, Progress } from '@lotto/ui';
import { convertToPercentage } from '@lotto/ui/utils/calculations';

import type { NumberStat } from '@/domains/lotto';

interface ConfidenceIntervalCardProps {
  numberStat: NumberStat;
}

export const ConfidenceIntervalCard: React.FC<ConfidenceIntervalCardProps> = ({ numberStat }) => {
  const { t } = useTranslation();

  if (!numberStat.confidenceInterval) return null;

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="mb-2 flex items-center gap-2">
          <ChartBarIcon className="size-5 text-foreground" />
          <h3 className="text-title-small-bold">{t('numberStats.wilsonConfidenceInterval')}</h3>
        </div>
        <p className="mb-4 rounded bg-base-blue p-3 text-body-small text-muted-foreground italic">
          {t('numberStats.wilsonConfidenceIntervalHelp', {
            confidence: Math.round(numberStat.confidenceInterval.confidenceLevel * 100),
          })}
        </p>
        <div className="mt-6 space-y-4">
          <div>
            <div className="mb-1 flex justify-between">
              <span className="text-body-small text-muted-foreground">{t('numberStats.lowerBound')}</span>
              <span className="text-foreground text-title-small-bold">
                {convertToPercentage(numberStat.confidenceInterval.lower)}
              </span>
            </div>
            <Progress value={numberStat.confidenceInterval.lower * 100} className="h-2" />
          </div>
          <div>
            <div className="mb-1 flex justify-between">
              <span className="text-body-small text-muted-foreground">{t('numberStats.upperBound')}</span>
              <span className="text-foreground text-title-small-bold">
                {convertToPercentage(numberStat.confidenceInterval.upper)}
              </span>
            </div>
            <Progress value={numberStat.confidenceInterval.upper * 100} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
