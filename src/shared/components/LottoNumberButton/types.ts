import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

import { NumberStat } from '../../types';

export interface LottoNumberButtonProps {
  index: number;
  digit: number;
  count: number;
  frequency: number;
  showBadge?: boolean;
  leftoverNumbers?: NumberStat[];
  style?: SxProps<Theme>;
  numberStat?: NumberStat; // Full stat object for drawer display
}
