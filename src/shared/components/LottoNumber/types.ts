import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import React from 'react';

export interface LottoNumberProps {
  digit: number;
  index?: number | string;
  showBadge?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style?: SxProps<Theme>;
}
