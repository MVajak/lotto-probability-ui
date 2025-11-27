import { Paper } from '@mui/material';
import type React from 'react';

import type { CardWrapperProps } from './types';

export const CardWrapper: React.FC<CardWrapperProps> = ({ children, sx }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        p: 2,
        my: 1,
        boxShadow: { xs: '0px 4px 12px rgba(0, 0, 0, 0.15)' },
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
};
