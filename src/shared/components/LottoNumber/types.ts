import type React from 'react';

import type { SxProps } from '@mui/material';
import type { Theme } from '@mui/material/styles';

export interface LottoNumberProps {
  digit: number;
  index?: number | string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  style?: SxProps<Theme>;
}
