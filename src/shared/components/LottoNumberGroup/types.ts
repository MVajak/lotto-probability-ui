import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';

import type { NumberStat } from '../../types';

export interface LottoNumberGroupProps {
  numbers: NumberStat[];
  index: string | number;
  style?: SxProps<Theme>;
  maxVisible?: number;
}
