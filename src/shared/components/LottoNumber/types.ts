import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import React from 'react';

export interface LottoNumberProps {
  digit: number;
  index?: number | string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  style?: SxProps<Theme>;
}
