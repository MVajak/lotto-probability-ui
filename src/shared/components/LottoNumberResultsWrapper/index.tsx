import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { LottoNumbersButton } from '../LottoNumbersButton';
import { LottoNumberResultsWrapperProps } from './types';

export const LottoNumberResultsWrapper = ({
  children,
  allNumberStats,
  titleKey,
  style,
}: LottoNumberResultsWrapperProps): React.JSX.Element => {
  const { t } = useTranslation();

  return (
    <Grid size={{ xs: 12 }}>
      <Typography sx={{ p: 2, fontWeight: 600 }}>{t(titleKey)}</Typography>
      {children}
      <LottoNumbersButton buttonText={t('result.seeMore')} numberStats={allNumberStats} style={style} />
    </Grid>
  );
};
