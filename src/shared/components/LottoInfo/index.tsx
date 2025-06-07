import { Divider, Grid, Link, Typography } from '@mui/material';
import React from 'react';

import { LottoDescription, LottoInfoProps, LottoName } from './types';

export const LottoInfo = ({ lottoType, linkBuyTickets, linkGameRules }: LottoInfoProps): React.JSX.Element => {
  const lottoName = LottoName[lottoType];

  return (
    <Grid size={{ xs: 12 }}>
      <Grid size={{ xs: 12 }}>
        <Divider data-testid="lotto-info-divider" textAlign="center">
          {lottoName.toUpperCase()}
        </Divider>
      </Grid>
      <Grid container size={{ xs: 12 }} padding={2}>
        <Grid container size={{ xs: 12 }}>
          <Typography sx={{ p: 2 }} data-testid={`lotto-${lottoName}-description`}>
            {LottoDescription[lottoType]}
          </Typography>
          <Typography sx={{ p: 2 }} data-testid={`lotto-${lottoName}-default-description`}>
            The system calculates the probability of {lottoName} numbers based on historical data. You can search for
            historical data by dates or by draw numbers.
          </Typography>
        </Grid>
        <Grid container size={{ xs: 12 }} sx={{ px: 2 }}>
          <Link
            data-testid={`lotto-${lottoName}-rules`}
            href={linkGameRules}
            underline="hover"
            sx={{ lineHeight: '20px', pr: 1 }}
          >
            Game rules
          </Link>
          <Divider orientation="vertical" flexItem />
          <Link
            data-testid={`lotto-${lottoName}-tickets`}
            href={linkBuyTickets}
            underline="hover"
            sx={{ lineHeight: '20px', pl: 1 }}
          >
            Buy tickets
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};
