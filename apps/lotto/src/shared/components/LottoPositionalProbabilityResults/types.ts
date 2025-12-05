import type { MostProbableDigitsByPosition, NumberStat } from '../../types';

export interface LottoPositionalProbabilityResultsProps {
  totalDraws: number;
  isLoading: boolean;
  numberStatsByPosition: MostProbableDigitsByPosition;
  allNumberStats: NumberStat[];
}
