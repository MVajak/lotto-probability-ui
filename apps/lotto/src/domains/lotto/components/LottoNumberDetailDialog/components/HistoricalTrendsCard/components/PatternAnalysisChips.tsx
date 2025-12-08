import type React from 'react';
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon, MinusIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

import { Badge, cn } from '@lotto/ui';

import type { NumberHistoryDto } from '@/domains/lotto';

interface PatternAnalysisChipsProps {
  autocorrelation: NumberHistoryDto['autocorrelation'];
  markovChain: NumberHistoryDto['markovChain'];
}

const getInterpretationIcon = (interpretation: string) => {
  if (interpretation === 'random' || interpretation === 'memoryless') {
    return <MinusIcon className="size-4" />;
  }
  if (interpretation === 'clustered' || interpretation === 'persistent') {
    return <ArrowTrendingUpIcon className="size-4" />;
  }
  return <ArrowTrendingDownIcon className="size-4" />;
};

const getInterpretationColorClasses = (interpretation: string) => {
  if (interpretation === 'random' || interpretation === 'memoryless') {
    return 'bg-secondary-blue text-primary-blue';
  }
  if (interpretation === 'clustered' || interpretation === 'persistent') {
    return 'bg-secondary-green text-primary-green';
  }
  return 'bg-secondary-orange text-primary-orange';
};

export const PatternAnalysisChips: React.FC<PatternAnalysisChipsProps> = ({ autocorrelation, markovChain }) => {
  const { t } = useTranslation();

  return (
    <div className="mb-4">
      <h4 className="mb-2 text-body-default-bold">{t('numberStats.patternAnalysis.title')}</h4>
      <div className="flex flex-wrap gap-2">
        <Badge
          className={cn(
            'flex items-center gap-1 px-2 py-1 text-body-small-bold',
            getInterpretationColorClasses(autocorrelation.interpretation)
          )}
        >
          {getInterpretationIcon(autocorrelation.interpretation)}
          {t('numberStats.patternAnalysis.autocorrelation', { interpretation: autocorrelation.interpretation })}
        </Badge>
        <Badge
          className={cn(
            'flex items-center gap-1 px-2 py-1 text-body-small-bold',
            getInterpretationColorClasses(markovChain.interpretation)
          )}
        >
          {getInterpretationIcon(markovChain.interpretation)}
          {t('numberStats.patternAnalysis.markov', { interpretation: markovChain.interpretation })}
        </Badge>
      </div>
    </div>
  );
};
