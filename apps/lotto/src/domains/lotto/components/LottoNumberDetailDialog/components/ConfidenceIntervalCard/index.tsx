import type React from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, Progress } from '@lotto/ui';
import { convertToPercentage } from '@lotto/ui/utils/calculations';

import type { ConfidenceInterval } from '@/domains/lotto';

interface ConfidenceIntervalCardProps {
  confidenceInterval: ConfidenceInterval;
}

export const ConfidenceIntervalCard: React.FC<ConfidenceIntervalCardProps> = ({ confidenceInterval }) => {
  const { t } = useTranslation();

  return (
    <Card className="h-full">
      <CardContent className="flex flex-col gap-4 p-2">
        <div className="flex items-center gap-2 p-2">
          <ChartBarIcon className="size-5 text-foreground" />
          <h3 className="text-title-small-bold">{t('numberStats.wilsonConfidenceInterval')}</h3>
        </div>
        <Card className="mb-4 rounded bg-base-blue p-2">
          <CardContent>
            <p className="text-body-small text-muted-foreground italic">
              {t('numberStats.wilsonConfidenceIntervalHelp', {
                confidence: Math.round(confidenceInterval.confidenceLevel * 100),
              })}
            </p>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Card className="rounded p-4">
            <CardContent className="p-0">
              <div className="mb-1 flex justify-between">
                <span className="text-body-small text-muted-foreground">{t('numberStats.lowerBound')}</span>
                <span className="text-foreground text-title-small-bold">
                {convertToPercentage(confidenceInterval.lower)}
              </span>
              </div>
              <Progress value={confidenceInterval.lower * 100} className="h-2" />
            </CardContent>
          </Card>
          <Card className="rounded p-4">
            <CardContent className="p-0">
              <div className="mb-1 flex justify-between">
                <span className="text-body-small text-muted-foreground">{t('numberStats.upperBound')}</span>
                <span className="text-foreground text-title-small-bold">
                                {convertToPercentage(confidenceInterval.upper)}

              </span>
              </div>
              <Progress value={confidenceInterval.lower * 100} className="h-2" />
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};
