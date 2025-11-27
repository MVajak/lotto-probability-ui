import type { SxProps, Theme } from '@mui/material';
import type { ReactNode } from 'react';

export interface CardWrapperProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}
