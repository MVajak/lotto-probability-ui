import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

import { LottoDrawerProps } from '../LottoDrawer/types';

export interface LottoButtonDrawerProps {
  buttonText: string;
  numberStats: LottoDrawerProps['numberStats'];
  style?: { digitButton?: SxProps<Theme> };
}
