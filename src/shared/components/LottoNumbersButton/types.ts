import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/material';

import type { NumberStat } from '../../types';

export interface LottoNumbersButtonProps {
  buttonText: string;
  numberStats: NumberStat[];
  style?: { digitButton?: SxProps<Theme> };
}
