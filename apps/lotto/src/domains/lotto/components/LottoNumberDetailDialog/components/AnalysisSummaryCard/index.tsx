import type React from 'react';
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import { Trans, useTranslation } from 'react-i18next';

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
      <CardContent className="flex flex-col gap-4 p-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-md bg-base-orange p-2">
            <LightBulbIcon className="size-5 text-primary-orange" />
          </div>
          <h3 className="text-title-small-bold">{t('numberStats.analysisSummary')}</h3>
        </div>

        {/* Appearance count */}
        <Card className="rounded">
          <CardContent>
            <Trans
              i18nKey="numberStats.appearedTimes"
              values={{
                count: numberStat.interpretation.appearedCount,
                total: numberStat.interpretation.totalDraws,
              }}
              components={{
                bold: <span className="text-body-large-bold text-foreground" />,
              }}
            />
          </CardContent>
        </Card>

        {/* Deviation highlight with icon */}
        {hasDeviation && (
          <Card
            className={cn('rounded', isMoreFrequent ? 'border-base-red bg-base-red' : 'border-base-blue bg-base-blue')}
          >
            <CardContent className="flex items-center gap-2">
              <div className={cn('rounded p-1', isMoreFrequent ? 'bg-secondary-red' : 'bg-secondary-blue')}>
                {isMoreFrequent ? (
                  <ArrowTrendingUpIcon className="size-5 text-primary-red" />
                ) : (
                  <ArrowTrendingDownIcon className="size-5 text-primary-blue" />
                )}
              </div>
              <p className="flex-1 text-body-default-bold">
                {isMoreFrequent ? (
                  <Trans
                    i18nKey="numberStats.appearingMoreThanExpected"
                    values={{ percent: numberStat.interpretation.percentDifference }}
                    components={{
                      highlight: <span className="text-body-large-bold text-primary-red" />,
                    }}
                  />
                ) : (
                  <Trans
                    i18nKey="numberStats.appearingLessThanExpected"
                    values={{ percent: Math.abs(numberStat.interpretation.percentDifference) }}
                    components={{
                      highlight: <span className="text-body-large-bold text-primary-blue" />,
                    }}
                  />
                )}
              </p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};
