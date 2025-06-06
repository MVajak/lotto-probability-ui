import { Grid, Typography } from '@mui/material';
import React from 'react';

import { LottoButtonDrawer } from '../LottoButtonDrawer';
import { LottoNumberResultsWrapperProps } from './types';

export const LottoNumberResultsWrapper = ({
  children,
  allNumberStats,
  title,
}: LottoNumberResultsWrapperProps): React.JSX.Element => {
  return (
    <Grid size={{ xs: 12 }}>
      <Typography sx={{ p: 2, fontWeight: 600 }}>{title}</Typography>
      {children}
      <LottoButtonDrawer buttonText={'See more...'} numberStats={allNumberStats} />
    </Grid>
  );
};
