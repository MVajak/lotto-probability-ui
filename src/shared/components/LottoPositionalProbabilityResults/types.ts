import { MostProbableDigitsByPosition, NumberStat } from '../../types';

export interface LottoPositionalProbabilityResultsProps {
  totalDraws: number;
  shouldShow: boolean;
  numberStatsByPosition: MostProbableDigitsByPosition;
  allNumberStats: NumberStat[];
}
