import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

import { NumberStat } from '../../types';

export interface LottoNumberResults {
  title: string;
  allNumberStats: NumberStat[];
  displayNumberStats: NumberStat[];
  hiddenNumberStats: NumberStat[];
  maxNumbersCount: number;
  style?: { container?: SxProps<Theme>; digitButton?: SxProps<Theme> };
}

export interface LottoProbabilityResultsProps {
  totalDraws: number;
  shouldShow: boolean;
  numberStatsResults: LottoNumberResults[];
}
