import { Divider, Grid, Link, Typography } from '@mui/material';
import React from 'react';

import { LottoDescription, LottoInfoProps, LottoName } from './types';

export const LottoInfo = ({ lottoType, linkBuyTickets, linkGameRules }: LottoInfoProps): React.JSX.Element => {
  return (
    <Grid size={{ xs: 12 }}>
      <Grid size={{ xs: 12 }}>
        <Divider textAlign="center">{LottoName[lottoType].toUpperCase()}</Divider>
      </Grid>
      <Grid container size={{ xs: 12 }} padding={2}>
        <Grid container size={{ xs: 12 }}>
          <Typography sx={{ p: 2 }}>{LottoDescription[lottoType]}</Typography>
          <Typography sx={{ p: 2 }}>
            The system calculates the probability of {LottoName[lottoType]} numbers based on historical data. You can
            search for historical data by dates or by draw numbers.
          </Typography>
        </Grid>
        <Grid container size={{ xs: 12 }} sx={{ px: 2 }}>
          <Link href={linkGameRules} underline="hover" sx={{ lineHeight: '20px', pr: 1 }}>
            Game rules
          </Link>
          <Divider orientation="vertical" flexItem />
          <Link href={linkBuyTickets} underline="hover" sx={{ lineHeight: '20px', pl: 1 }}>
            Buy tickets
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};
