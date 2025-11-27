import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';
import type React from 'react';

import type { NumberStat } from '../../types';

export interface LottoNumberResultsWrapperProps {
  children: React.JSX.Element;
  allNumberStats: NumberStat[];
  titleKey: string;
  style?: { digitButton?: SxProps<Theme> };
}
