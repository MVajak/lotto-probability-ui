import type React from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Badge, Card, CardContent, cn } from '@lotto/ui';
import { convertToPercentage } from '@lotto/ui/utils/calculations';

import type { NumberStat } from '@/domains/lotto';

interface DeviationAnalysisCardProps {
  numberStat: NumberStat;
}

export const DeviationAnalysisCard: React.FC<DeviationAnalysisCardProps> = ({ numberStat }) => {
  const { t } = useTranslation();

  if (!numberStat.deviation) return null;

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="mb-2 flex items-center gap-2">
          <ChartBarIcon className="size-5 text-foreground" />
          <h3 className="text-title-small-bold">{t('numberStats.deviationAnalysis')}</h3>
        </div>
        <p className="mb-4 rounded bg-base-orange p-3 text-body-small text-muted-foreground italic">
          {t('numberStats.deviationAnalysisHelp')}
        </p>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
            <span className="text-body-small text-muted-foreground">{t('numberStats.absoluteDeviation')}</span>
            <span className="text-title-small-bold">{convertToPercentage(numberStat.deviation.absolute)}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
            <span className="text-body-small text-muted-foreground">{t('numberStats.relativeDeviation')}</span>
            <span className="text-title-small-bold">{numberStat.deviation.relative.toFixed(2)}x</span>
          </div>
          <Badge
            className={cn(
              'w-fit px-3 py-1.5 text-body-small-bold',
              numberStat.deviation.isSignificant
                ? 'bg-secondary-orange text-primary-orange'
                : 'bg-secondary-green text-primary-green'
            )}
          >
            {numberStat.deviation.isSignificant
              ? t('numberStats.statisticallySignificant')
              : t('numberStats.notSignificant')}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
