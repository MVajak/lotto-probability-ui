import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

import { NumberStat } from '../../types';

export interface LottoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  numberStats: NumberStat[];
  style?: { digitButton?: SxProps<Theme> };
}
