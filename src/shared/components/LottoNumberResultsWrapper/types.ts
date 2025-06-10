import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import React from 'react';

import { NumberStat } from '../../types';

export interface LottoNumberResultsWrapperProps {
  children: React.JSX.Element;
  allNumberStats: NumberStat[];
  title: string;
  style?: { digitButton?: SxProps<Theme> };
}
