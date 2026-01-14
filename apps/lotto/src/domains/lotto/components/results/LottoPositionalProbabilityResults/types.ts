import type { MostProbableDigitsByPosition, NumberStat } from '../../../types';

export interface LottoPositionalProbabilityResultsProps {
  totalDraws: number;
  /** Total draws available in range (before tier limit) */
  totalDrawsInRange: number;
  isLoading: boolean;
  numberStatsByPosition: MostProbableDigitsByPosition;
  allNumberStats: NumberStat[];
}
