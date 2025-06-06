import { CircularProgress, Grid } from '@mui/material';
import React from 'react';

import { LoaderProps } from './types';

export const Loader = ({ shouldShow }: LoaderProps): React.JSX.Element | null => {
  if (!shouldShow) {
    return null;
  }

  return (
    <Grid padding={8} display="flex" justifyContent="center" alignItems="center" size={{ xs: 12 }}>
      <CircularProgress />
    </Grid>
  );
};
