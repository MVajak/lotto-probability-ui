import type { ReactNode } from 'react';

import type { SxProps, Theme } from '@mui/material';

export interface CardWrapperProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}
