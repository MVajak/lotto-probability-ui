import { SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

export interface CardWrapperProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}
