import type React from 'react';
import { ArrowsRightLeftIcon, CalculatorIcon, ChartBarIcon, HashtagIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

import { Banner, type BannerVariant, cn, StatCard } from '@lotto/ui';
import { convertToPercentage } from '@lotto/ui/utils/calculations';

import type { Interpretation, NumberDetailDto, NumberStat } from '@/domains/lotto';

interface NumberStatsCardProps {
  numberStat: NumberStat;
  numberDetail: NumberDetailDto | null;
}

export const NumberStatsCard: React.FC<NumberStatsCardProps> = ({ numberStat, numberDetail }) => {
  const { t } = useTranslation();

  const status = numberStat.interpretation?.status;

  const getBannerVariant = (s?: Interpretation['status']): BannerVariant => {
    switch (s) {
      case 'frequent':
        return 'warning';
      case 'rare':
        return 'info';
      default:
        return 'neutral';
    }
  };

  const getStatusLabel = (s?: Interpretation['status']) => {
    switch (s) {
      case 'frequent':
        return t('numberStats.frequentNumber');
      case 'rare':
        return t('numberStats.rareNumber');
      default:
        return t('numberStats.normalDistribution');
    }
  };

  const getStatusDescription = (s?: Interpretation['status']) => {
    switch (s) {
      case 'frequent':
        return t('numberStats.statusDescriptionFrequent');
      case 'rare':
        return t('numberStats.statusDescriptionRare');
      default:
        return t('numberStats.statusDescriptionNormal');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Status Banner */}
      {numberStat.interpretation && (
        <Banner
          variant={getBannerVariant(status)}
          icon={<ChartBarIcon className="size-5" />}
          title={getStatusLabel(status)}
          description={getStatusDescription(status)}
        />
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <StatCard
          icon={<HashtagIcon className="size-5 text-primary-blue" />}
          label={t('general.count')}
          value={numberStat.count}
          description={t('numberStats.countHelp')}
        />
        <StatCard
          icon={<ChartBarIcon className="size-5 text-primary-green" />}
          label={t('general.frequency')}
          value={convertToPercentage(numberStat.frequency)}
          description={t('numberStats.probabilityHelp')}
        />
        {numberDetail?.summary.expectedFrequencyPercent !== undefined && (
          <StatCard
            icon={<CalculatorIcon className="size-5 text-primary-orange" />}
            label={t('numberStats.theoretical')}
            value={`${numberDetail.summary.expectedFrequencyPercent.toFixed(2)}%`}
            description={t('numberStats.theoreticalHelp')}
          />
        )}
        {numberStat.interpretation?.percentDifference !== undefined &&
          numberStat.interpretation.percentDifference !== 0 && (
            <StatCard
              icon={
                <ArrowsRightLeftIcon
                  className={cn(
                    'size-5',
                    numberStat.interpretation.percentDifference > 0 ? 'text-primary-red' : 'text-primary-blue'
                  )}
                />
              }
              label={t('numberStats.difference')}
              value={`${numberStat.interpretation.percentDifference > 0 ? '+' : ''}${numberStat.interpretation.percentDifference}%`}
              description={t('numberStats.differenceHelp')}
            />
          )}
      </div>
    </div>
  );
};
