import type React from 'react';
import { useTranslation } from 'react-i18next';

import { safeBig } from '@lotto/ui/utils/calculations';

import type { Interpretation, NumberStat } from '../../../types';
import { NumberStatCard } from './NumberStatCard';

interface NumberStatsGridProps {
  position: string;
  stats: NumberStat[];
  positionIndex: number;
  maxFrequency: number;
  onStatClick: (stat: NumberStat) => void;
}

const UnassignedPosition = 'unassigned';

export const NumberStatsGrid: React.FC<NumberStatsGridProps> = ({
  position,
  stats,
  positionIndex,
  maxFrequency,
  onStatClick,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mb-8">
      {position !== UnassignedPosition ? (
        <h4
          data-testid={`position-${positionIndex}-title`}
          className="mb-4 flex items-center gap-2 px-4 text-foreground text-title-small-bold"
        >
          {t('statisticsDrawer.position')}: {safeBig(position).plus(1).toNumber()}
        </h4>
      ) : null}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:px-4 lg:grid-cols-5">
        {stats.map((stat) => {
          // Use backend's category if available, otherwise default to 'normal'
          const category: Interpretation['status'] = stat.interpretation?.status || 'normal';
          const normalizedFrequency = (stat.frequency / maxFrequency) * 100;

          return (
            <NumberStatCard
              key={`statistics-container-${positionIndex}-${stat.digit}`}
              stat={stat}
              category={category}
              normalizedFrequency={normalizedFrequency}
              onClick={() => onStatClick(stat)}
              index={`dialog-${positionIndex}-${stat.digit}`}
            />
          );
        })}
      </div>
    </div>
  );
};
