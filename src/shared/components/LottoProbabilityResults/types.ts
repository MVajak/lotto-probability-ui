import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';

import type { NumberStat } from '../../types';

export interface LottoNumberResults {
  titleKey: string;
  allNumberStats: NumberStat[];
  displayNumberStats: NumberStat[];
  hiddenNumberStats: NumberStat[];
  maxNumbersCount: number;
  style?: { container?: SxProps<Theme>; digitButton?: SxProps<Theme> };
}

export interface LottoProbabilityResultsProps {
  totalDraws: number;
  isLoading: boolean;
  numberStatsResults: LottoNumberResults[];
}
