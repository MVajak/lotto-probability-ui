import type React from 'react';
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon, MinusIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

import { Badge, Card, CardContent, cn } from '@lotto/ui';
import { convertToPercentage } from '@lotto/ui/utils/calculations';

import { CATEGORY_COLORS } from '../../../../constants';
import type { Interpretation, NumberStat } from '../../../../types';

interface NumberStatsCardProps {
  numberStat: NumberStat;
}

export const NumberStatsCard: React.FC<NumberStatsCardProps> = ({ numberStat }) => {
  const { t } = useTranslation();

  const getStatusIcon = (status?: Interpretation['status']) => {
    switch (status) {
      case 'frequent':
        return <ArrowTrendingUpIcon className="size-5" />;
      case 'rare':
        return <ArrowTrendingDownIcon className="size-5" />;
      default:
        return <MinusIcon className="size-5" />;
    }
  };

  const getStatusLabel = (status?: Interpretation['status']) => {
    switch (status) {
      case 'frequent':
        return t('numberStats.frequentNumber');
      case 'rare':
        return t('numberStats.rareNumber');
      default:
        return t('numberStats.normalDistribution');
    }
  };

  const getCategoryColor = (status?: Interpretation['status']) => {
    if (!status || status === 'normal') return CATEGORY_COLORS.normal.primary;
    return CATEGORY_COLORS[status].primary;
  };

  return (
    <Card>
      <CardContent className="px-5 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          {/* Status Badge */}
          {numberStat.interpretation && (
            <Badge
              className="flex h-9 items-center gap-1.5 px-3 text-body-large-bold text-primary-foreground"
              style={{ backgroundColor: getCategoryColor(numberStat.interpretation.status) }}
            >
              {getStatusIcon(numberStat.interpretation.status)}
              {getStatusLabel(numberStat.interpretation.status)}
            </Badge>
          )}

          {/* Stats Grid */}
          <div className="grid flex-1 grid-cols-2 gap-4 lg:grid-cols-4">
            <div>
              <p className="mb-1 text-body-small-bold text-muted-foreground">{t('general.count')}</p>
              <p className="text-foreground text-title-default-bold">{numberStat.count}</p>
              <p className="mt-1 text-[0.7rem] text-muted-foreground/80">{t('numberStats.countHelp')}</p>
            </div>
            <div>
              <p className="mb-1 text-body-small-bold text-muted-foreground">{t('general.frequency')}</p>
              <p className="text-foreground text-title-default-bold">{convertToPercentage(numberStat.frequency)}</p>
              <p className="mt-1 text-[0.7rem] text-muted-foreground/80">{t('numberStats.probabilityHelp')}</p>
            </div>
            {numberStat.theoreticalProbability !== undefined && (
              <div>
                <p className="mb-1 text-body-small-bold text-muted-foreground">{t('numberStats.theoretical')}</p>
                <p className="text-title-default-bold">{convertToPercentage(numberStat.theoreticalProbability)}</p>
                <p className="mt-1 text-[0.7rem] text-muted-foreground/80">{t('numberStats.theoreticalHelp')}</p>
              </div>
            )}
            {numberStat.interpretation?.percentDifference !== undefined &&
              numberStat.interpretation.percentDifference !== 0 && (
                <div>
                  <p className="mb-1 text-body-small-bold text-muted-foreground">Difference</p>
                  <p
                    className={cn(
                      'text-title-default-bold',
                      numberStat.interpretation.percentDifference > 0 ? 'text-primary-red' : 'text-primary-blue'
                    )}
                  >
                    {numberStat.interpretation.percentDifference > 0 ? '+' : ''}
                    {numberStat.interpretation.percentDifference}%
                  </p>
                  <p className="mt-1 text-[0.7rem] text-muted-foreground/80">{t('numberStats.differenceHelp')}</p>
                </div>
              )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
