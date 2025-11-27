import type React from 'react';

import { CircularProgress, Grid } from '@mui/material';

import type { LoaderProps } from './types';

export const Loader = ({ shouldShow }: LoaderProps): React.JSX.Element | null => {
  if (!shouldShow) {
    return null;
  }

  return (
    <Grid
      data-testid="lotto-loader"
      padding={8}
      display="flex"
      justifyContent="center"
      alignItems="center"
      size={{ xs: 12 }}
    >
      <CircularProgress />
    </Grid>
  );
};
