import type React from 'react';

import type { SxProps } from '@mui/material';
import type { Theme } from '@mui/material/styles';

import type { NumberStat } from '../../types';

export interface LottoNumberResultsWrapperProps {
  children: React.ReactNode;
  allNumberStats: NumberStat[];
  titleKey: string;
  style?: { digitButton?: SxProps<Theme> };
}
