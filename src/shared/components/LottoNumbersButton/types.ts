import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';

import type { NumberStat } from '../../types';

export interface LottoNumbersButtonProps {
  buttonText: string;
  numberStats: NumberStat[];
  style?: { digitButton?: SxProps<Theme> };
}
