import type { NumberStat } from '../../../types';

// Grid column sizes (maps to Tailwind col-span-* classes)
export type GridColSpan = 4 | 6 | 8 | 12;

export interface LottoNumberResults {
  titleKey: string;
  allNumberStats: NumberStat[];
  displayNumberStats: NumberStat[];
  hiddenNumberStats: NumberStat[];
  maxNumbersCount: number;
  containerSize?: { sm?: GridColSpan };
  isSecondaryNumbers?: boolean;
}

export interface LottoProbabilityResultsProps {
  totalDraws: number;
  /** Total draws available in range (before tier limit) */
  totalDrawsInRange: number;
  isLoading: boolean;
  numberStatsResults: LottoNumberResults[];
}
