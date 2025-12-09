import type React from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, Separator } from '@lotto/ui';

import type { NumberHistoryDto } from '@/domains/lotto';

import {
  AutocorrelationChart,
  DroughtStreakChart,
  InsufficientDataWarning,
  MarkovHeatmap,
  MonthlyAppearancesChart,
  PatternAnalysisChips,
  StatsSummaryGrid,
  TimelineScatterPlot,
} from './components';

interface HistoricalTrendsCardProps {
  numberHistory: NumberHistoryDto;
}

export const HistoricalTrendsCard: React.FC<HistoricalTrendsCardProps> = ({ numberHistory }) => {
  const { t } = useTranslation();

  if (!numberHistory) {
    return (
      <Card className="border-2 border-dashed">
        <CardContent className="p-6 text-center">
          <ChartBarIcon className="mx-auto mb-3 size-12 text-muted-foreground/50" />
          <h4 className="mb-1 text-body-default-bold text-muted-foreground">{t('numberStats.historicalTrends')}</h4>
          <p className="text-body-small text-muted-foreground/70">{t('numberStats.historicalTrendsDescription')}</p>
        </CardContent>
      </Card>
    );
  }

  const { summary, trends, autocorrelation, markovChain } = numberHistory;
  const hasEnoughData = (autocorrelation?.lagCorrelations?.length ?? 0) > 0;

  return (
    <Card>
      <CardContent className="p-6">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="flex items-center justify-center rounded-md bg-base-green p-1.5">
            <ChartBarIcon className="size-5 text-primary-green" />
          </div>
          <h3 className="text-title-small-bold">{t('numberStats.historicalTrendsTitle')}</h3>
        </div>

        {/* Stats Summary Grid */}
        <StatsSummaryGrid trends={trends} markovChain={markovChain} />

        <Separator className="my-4" />

        {/* Pattern Analysis Chips */}
        {autocorrelation && markovChain && (
          <PatternAnalysisChips autocorrelation={autocorrelation} markovChain={markovChain} />
        )}

        {/* Monthly Appearances Chart */}
        <MonthlyAppearancesChart timeSeries={trends.timeSeries} numberValue={summary.number} />

        <Separator className="my-6" />

        {/* Autocorrelation Chart */}
        {hasEnoughData && autocorrelation ? (
          <AutocorrelationChart lagCorrelations={autocorrelation.lagCorrelations} />
        ) : (
          <InsufficientDataWarning
            titleKey="numberStats.insufficientData.autocorrelationTitle"
            messageKey="numberStats.insufficientData.autocorrelationMessage"
          />
        )}

        <Separator className="my-6" />

        {/* Markov Transition Heatmap */}
        {hasEnoughData && markovChain ? (
          <MarkovHeatmap transitionProbabilities={markovChain.transitionProbabilities} />
        ) : (
          <InsufficientDataWarning
            titleKey="numberStats.insufficientData.markovTitle"
            messageKey="numberStats.insufficientData.markovMessage"
          />
        )}

        <Separator className="my-6" />

        {/* Timeline Scatter Plot */}
        <TimelineScatterPlot occurrences={numberHistory.occurrences} numberValue={summary.number} />

        <Separator className="my-6" />

        {/* Drought and Streak Chart */}
        <DroughtStreakChart trends={trends} />

        {/* Interpretation Helper */}
        {autocorrelation && (
          <div className="mt-4 rounded bg-base-blue p-3">
            <p className="text-body-small text-muted-foreground">
              <strong>{t('numberStats.patternInterpretation')}</strong>{' '}
              {autocorrelation.interpretation === 'random'
                ? t('numberStats.patternRandom')
                : t('numberStats.patternDetected', { pattern: autocorrelation.interpretation })}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
