import type React from 'react';
import { FireIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

import { Badge, CardContent, cn, InteractiveCard, LottoNumber, Progress } from '@lotto/ui';
import { convertToPercentage } from '@lotto/ui/utils/calculations';

import type { Interpretation, NumberStat } from '@/domains/lotto';

interface NumberStatCardProps {
  stat: NumberStat;
  category: Interpretation['status'];
  normalizedFrequency: number;
  onClick: () => void;
  index: string;
}

export const NumberStatCard: React.FC<NumberStatCardProps> = ({
  stat,
  category,
  normalizedFrequency,
  onClick,
  index,
}) => {
  const { t } = useTranslation();

  const getCategoryLabel = (cat: Interpretation['status']): string => {
    switch (cat) {
      case 'frequent':
        return t('numberStats.frequent');
      case 'rare':
        return t('numberStats.rare');
      default:
        return t('numberStats.normal');
    }
  };

  return (
    <InteractiveCard
      onClick={onClick}
      className={cn(
        'relative border-2 p-1',
        category === 'frequent' && 'border-gold/50 bg-gold/10',
        category === 'rare' && 'border-primary-blue/50 bg-primary-blue/10',
        category === 'normal' && 'border-border bg-muted/50'
      )}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      role="button"
      tabIndex={0}
    >
      {/* Frequent/Rare Badge */}
      {(category === 'frequent' || category === 'rare') && (
        <Badge
          className={cn(
            '-top-2.5 -translate-x-1/2 absolute left-1/2 z-10 flex items-center gap-1 px-2 py-0.5 text-body-small-bold text-primary-foreground shadow-md',
            category === 'frequent' && 'bg-gold',
            category === 'rare' && 'bg-primary-blue'
          )}
        >
          {category === 'frequent' ? <FireIcon className="size-4" /> : <SparklesIcon className="size-4" />}
          {getCategoryLabel(category)}
        </Badge>
      )}

      <CardContent className="p-4">
        <div className="mb-2 flex items-center gap-3">
          <LottoNumber digit={stat.digit} index={index} />
          <div className="min-w-0 flex-grow">
            <p className="mb-1 text-foreground text-title-small-bold">{convertToPercentage(stat.frequency)}</p>
            <p className="text-body-small-bold text-muted-foreground">
              {stat.count} {t('general.count').toLowerCase()}
            </p>
          </div>
        </div>

        {/* Probability Progress Bar */}
        <Progress
          value={normalizedFrequency}
          className="h-1.5 rounded-full bg-foreground/10"
          indicatorClassName={cn(
            category === 'frequent' && 'bg-gold',
            category === 'rare' && 'bg-primary-blue',
            category === 'normal' && 'bg-muted-foreground'
          )}
        />
      </CardContent>
    </InteractiveCard>
  );
};
