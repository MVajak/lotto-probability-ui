import type React from 'react';
import { ArrowPathIcon, ArrowRightIcon, ArrowUturnLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, cn, StatCard } from '@lotto/ui';

import type { NumberDetailDto } from '@/domains/lotto';

interface MarkovStatsCardsProps {
  markovChain: NumberDetailDto['markovChain'];
}

/**
 * Simple stat cards showing Markov transition probabilities.
 * Shows what typically happens after the number appears or doesn't appear.
 */
export const MarkovStatsCards: React.FC<MarkovStatsCardsProps> = ({ markovChain }) => {
  const { t } = useTranslation();

  if (!markovChain) {
    return null;
  }

  const { transitionProbabilities, interpretation, steadyStateProbability } = markovChain;

  const stats = [
    {
      icon: <ArrowPathIcon className="size-5 text-primary-green" />,
      label: t('numberStats.markov.appearedToAppeared'),
      value: (transitionProbabilities.appearedToAppeared * 100).toFixed(1),
      description: t('numberStats.markov.appearedToAppearedDesc'),
    },
    {
      icon: <XMarkIcon className="size-5 text-primary-red" />,
      label: t('numberStats.markov.appearedToNotAppeared'),
      value: (transitionProbabilities.appearedToNotAppeared * 100).toFixed(1),
      description: t('numberStats.markov.appearedToNotAppearedDesc'),
    },
    {
      icon: <ArrowRightIcon className="size-5 text-primary-blue" />,
      label: t('numberStats.markov.notAppearedToAppeared'),
      value: (transitionProbabilities.notAppearedToAppeared * 100).toFixed(1),
      description: t('numberStats.markov.notAppearedToAppearedDesc'),
    },
    {
      icon: <ArrowUturnLeftIcon className="size-5 text-muted-foreground" />,
      label: t('numberStats.markov.notAppearedToNotAppeared'),
      value: (transitionProbabilities.notAppearedToNotAppeared * 100).toFixed(1),
      description: t('numberStats.markov.notAppearedToNotAppearedDesc'),
    },
  ];

  const getInterpretationColor = () => {
    switch (interpretation) {
      case 'persistent':
      case 'hot_hand':
        return 'text-primary-green';
      case 'alternating':
        return 'text-primary-orange';
      case 'gamblers_fallacy':
        return 'text-primary-blue';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h4 className="text-body-default-bold text-foreground">{t('numberStats.markov.title')}</h4>
        <p className="text-body-small text-muted-foreground">{t('numberStats.markov.description')}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            unit="%"
            description={stat.description}
          />
        ))}
      </div>

      {/* Interpretation and steady state */}
      <div className="flex flex-wrap items-center gap-4">
        <Card className="w-fit rounded bg-base-blue">
          <CardContent>
            <p className="text-body-small">
              <span className="text-muted-foreground">{t('numberStats.markov.pattern')}: </span>
              <span className={cn('text-body-small-bold', getInterpretationColor())}>
                {t(`numberStats.markov.interpretation.${interpretation}`)}
              </span>
            </p>
          </CardContent>
        </Card>
        <Card className="w-fit rounded">
          <CardContent>
            <p className="text-body-small">
              <span className="text-muted-foreground">{t('numberStats.markov.steadyState')}: </span>
              <span className="text-body-small-bold">{(steadyStateProbability * 100).toFixed(1)}%</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
