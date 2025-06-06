import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

import { NumberStat } from '../../types';

export interface LottoNumberPopoverProps {
  index: number;
  digit: number;
  count: number;
  probability: number;
  showBadge?: boolean;
  leftoverNumbers?: NumberStat[];
  style?: SxProps<Theme>;
}
