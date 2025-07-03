import { Divider, Grid, Link, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { LottoInfoProps, LottoName } from './types';

export const LottoInfo = ({ lottoType, linkBuyTickets, linkGameRules }: LottoInfoProps): React.JSX.Element => {
  const { t } = useTranslation();

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
            {t(`info.${lottoType}`)}
          </Typography>
          <Typography sx={{ p: 2 }} data-testid={`lotto-${lottoName}-default-description`}>
            {t('info.generalDescription', { lottoName })}
          </Typography>
        </Grid>
        <Grid container size={{ xs: 12 }} sx={{ px: 2 }}>
          <Link
            data-testid={`lotto-${lottoName}-rules`}
            href={linkGameRules}
            underline="hover"
            target={`_blank`}
            sx={{ lineHeight: '20px', pr: 1 }}
          >
            {t('info.gameRules')}
          </Link>
          <Divider orientation="vertical" flexItem />
          <Link
            data-testid={`lotto-${lottoName}-tickets`}
            href={linkBuyTickets}
            underline="hover"
            target={`_blank`}
            sx={{ lineHeight: '20px', pl: 1 }}
          >
            {t('info.buyTickets')}
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};
