import type { MostProbableDigitsByPosition, NumberStat } from '@/domains/lotto';

export interface LottoPositionalProbabilityResultsProps {
  totalDraws: number;
  isLoading: boolean;
  numberStatsByPosition: MostProbableDigitsByPosition;
  allNumberStats: NumberStat[];
}
