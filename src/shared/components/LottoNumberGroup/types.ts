import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

import { NumberStat } from '../../types';

export interface LottoNumberGroupProps {
  numbers: NumberStat[];
  index: string | number;
  style?: SxProps<Theme>;
  maxVisible?: number;
}
