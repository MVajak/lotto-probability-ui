import type { NumberStat } from '@/domains/lotto';

// Grid column sizes (maps to Tailwind col-span-* classes)
export type GridColSpan = 4 | 6 | 8 | 12;

export interface LottoNumberResults {
  titleKey: string;
  allNumberStats: NumberStat[];
  displayNumberStats: NumberStat[];
  hiddenNumberStats: NumberStat[];
  maxNumbersCount: number;
  containerSize?: { sm?: GridColSpan };
}

export interface LottoProbabilityResultsProps {
  totalDraws: number;
  isLoading: boolean;
  numberStatsResults: LottoNumberResults[];
}
