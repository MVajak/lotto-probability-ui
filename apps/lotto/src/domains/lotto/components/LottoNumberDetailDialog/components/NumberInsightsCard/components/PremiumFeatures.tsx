import type React from 'react';

import type { NumberDetailDto } from '@/domains/lotto';

import { AutocorrelationChart } from './AutocorrelationChart';
import { InsufficientDataWarningCard } from './cards/InsufficientDataWarningCard';
import { MarkovStatsCards } from './cards/MarkovStatsCards';
import { MonteCarloCard } from './cards/MonteCarloCard';
import { PairAnalysisCard } from './cards/PairAnalysisCard';
import { SeasonalPatternsCard } from './cards/SeasonalPatternsCard';
import { Section } from './Section';

interface PremiumFeaturesProps {
  numberDetail: NumberDetailDto;
}

/**
 * Premium tier features section.
 * Displays: Markov, Autocorrelation, PairAnalysis, MonteCarlo, SeasonalPatterns
 */
export const PremiumFeatures: React.FC<PremiumFeaturesProps> = ({ numberDetail }) => {
  const { summary, markovChain, autocorrelation, pairAnalysis, monteCarlo, seasonalPatterns } = numberDetail;

  const allAvailable = markovChain && autocorrelation && pairAnalysis && monteCarlo && seasonalPatterns;

  return (
    <>
      <Section data={markovChain}>
        <MarkovStatsCards markovChain={markovChain} />
      </Section>

      <Section data={autocorrelation}>
        <AutocorrelationChart autocorrelation={autocorrelation} />
      </Section>

      <Section data={pairAnalysis}>
        <PairAnalysisCard pairAnalysis={pairAnalysis} />
      </Section>

      <Section data={monteCarlo}>
        <MonteCarloCard monteCarlo={monteCarlo} />
      </Section>

      <Section data={seasonalPatterns} showSeparator={!allAvailable}>
        <SeasonalPatternsCard seasonalPatterns={seasonalPatterns} />
      </Section>

      {!allAvailable && (
        <InsufficientDataWarningCard
          totalDraws={summary.totalDraws}
          premiumFeatures={{
            MARKOV_CHAIN: Boolean(markovChain),
            AUTOCORRELATION: Boolean(autocorrelation),
            // If we have enough draws but pairAnalysis is null, it's inapplicable (single-number lottery)
            PAIR_ANALYSIS: Boolean(pairAnalysis) || summary.totalDraws >= 20,
            MONTE_CARLO: Boolean(monteCarlo),
            SEASONAL_PATTERNS: Boolean(seasonalPatterns),
          }}
        />
      )}
    </>
  );
};
