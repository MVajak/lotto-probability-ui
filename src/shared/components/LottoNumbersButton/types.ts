import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

import { NumberStat } from '../../types';

export interface LottoNumbersButtonProps {
  buttonText: string;
  numberStats: NumberStat[];
  style?: { digitButton?: SxProps<Theme> };
}
