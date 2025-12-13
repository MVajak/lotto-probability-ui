import type React from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Badge, Card, CardContent, cn } from '@lotto/ui';
import { convertToPercentage } from '@lotto/ui/utils/calculations';

import type { Deviation } from '@/domains/lotto';

interface DeviationAnalysisCardProps {
  deviation: Deviation;
}

export const DeviationAnalysisCard: React.FC<DeviationAnalysisCardProps> = ({ deviation }) => {
  const { t } = useTranslation();

  return (
    <Card className="h-full">
      <CardContent className="flex flex-col gap-4 p-2">
        <div className="flex items-center gap-2 p-2">
          <ChartBarIcon className="size-5 text-foreground" />
          <h3 className="text-title-small-bold">{t('numberStats.deviationAnalysis')}</h3>
        </div>
        <Card className="rounded bg-base-orange">
          <CardContent>
            <p className="text-body-small text-muted-foreground italic">{t('numberStats.deviationAnalysisHelp')}</p>
          </CardContent>
        </Card>
        <div className="space-y-2">
          <Card className="rounded p-4">
            <CardContent className="flex items-center justify-between p-0">
              <span className="text-body-small text-muted-foreground">{t('numberStats.absoluteDeviation')}</span>
              <span className="text-title-small-bold">{convertToPercentage(deviation.absolute)}</span>
            </CardContent>
          </Card>
          <Card className="rounded p-4">
            <CardContent className="flex items-center justify-between p-0">
              <span className="text-body-small text-muted-foreground">{t('numberStats.relativeDeviation')}</span>
              <span className="text-title-small-bold">{deviation.relative.toFixed(2)}x</span>
            </CardContent>
          </Card>
          <Badge
            className={cn(
              'w-fit px-3 py-1.5 text-body-small-bold',
              deviation.isSignificant ? 'bg-base-orange text-primary-orange' : 'bg-base-green text-primary-green'
            )}
          >
            {deviation.isSignificant ? t('numberStats.statisticallySignificant') : t('numberStats.notSignificant')}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
