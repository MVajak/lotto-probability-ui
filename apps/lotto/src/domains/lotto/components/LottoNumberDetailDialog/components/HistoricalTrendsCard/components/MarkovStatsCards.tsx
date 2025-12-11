import type React from 'react';
import { ArrowPathIcon, ArrowRightIcon, ArrowUturnLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { cn } from '@lotto/ui';

import type { NumberHistoryDto } from '@/domains/lotto';

interface MarkovStatsCardsProps {
  markovChain: NumberHistoryDto['markovChain'];
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
      highlight: transitionProbabilities.appearedToAppeared > 0.5,
    },
    {
      icon: <XMarkIcon className="size-5 text-primary-red" />,
      label: t('numberStats.markov.appearedToNotAppeared'),
      value: (transitionProbabilities.appearedToNotAppeared * 100).toFixed(1),
      description: t('numberStats.markov.appearedToNotAppearedDesc'),
      highlight: false,
    },
    {
      icon: <ArrowRightIcon className="size-5 text-primary-blue" />,
      label: t('numberStats.markov.notAppearedToAppeared'),
      value: (transitionProbabilities.notAppearedToAppeared * 100).toFixed(1),
      description: t('numberStats.markov.notAppearedToAppearedDesc'),
      highlight: transitionProbabilities.notAppearedToAppeared > transitionProbabilities.appearedToAppeared,
    },
    {
      icon: <ArrowUturnLeftIcon className="size-5 text-muted-foreground" />,
      label: t('numberStats.markov.notAppearedToNotAppeared'),
      value: (transitionProbabilities.notAppearedToNotAppeared * 100).toFixed(1),
      description: t('numberStats.markov.notAppearedToNotAppearedDesc'),
      highlight: false,
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
    <div>
      <h4 className="mb-1 text-body-default-bold">{t('numberStats.markov.title')}</h4>
      <p className="mb-4 text-body-small text-muted-foreground">{t('numberStats.markov.description')}</p>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg bg-muted/50 p-4 transition-colors hover:bg-muted/70">
            <div className="mb-2 flex items-center gap-2">
              {stat.icon}
              <span className="text-body-small text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-title-default-bold">
              {stat.value}
              <span className="ml-0.5 font-normal text-body-small text-muted-foreground">%</span>
            </p>
            <p className="mt-1 text-body-small text-subtle-foreground">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Interpretation and steady state */}
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <div className="rounded-lg bg-base-blue p-3">
          <p className="text-body-small">
            <span className="text-muted-foreground">{t('numberStats.markov.pattern')}: </span>
            <span className={cn('text-body-small-bold', getInterpretationColor())}>
              {t(`numberStats.markov.interpretation.${interpretation}`)}
            </span>
          </p>
        </div>
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-body-small">
            <span className="text-muted-foreground">{t('numberStats.markov.steadyState')}: </span>
            <span className="text-body-small-bold">{(steadyStateProbability * 100).toFixed(1)}%</span>
          </p>
        </div>
      </div>
    </div>
  );
};
