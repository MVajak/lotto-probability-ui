import { CircularProgress, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { NumberStat } from '../../types';
import { safeBig } from '../../utils/calculations';
import { CardWrapper } from '../CardWrapper';
import { LottoNumberButton } from '../LottoNumberButton';
import { LottoNumberResultsWrapper } from '../LottoNumberResultsWrapper';
import { LottoPositionalProbabilityResultsProps } from './types';

export const LottoPositionalProbabilityResults = (
  props: LottoPositionalProbabilityResultsProps
): React.JSX.Element => {
  const { totalDraws, numberStatsByPosition, allNumberStats, isLoading } = props;
  const { t } = useTranslation();

  const renderLottoNumbers = (stats: NumberStat[], index: number) => {
    const { frequency, count, digit } = stats[0];
    const hiddenNumberStats = stats.slice(1);
    return (
      <LottoNumberButton
        key={index}
        index={index}
        frequency={frequency}
        count={count}
        digit={digit}
        leftoverNumbers={hiddenNumberStats}
        numberStat={stats[0]}
      />
    );
  };

  const hasResults = safeBig(totalDraws).gt(0);

  return (
    <CardWrapper sx={{ width: '100%' }}>
      <Divider textAlign="center">{t('result.totalDraws', { totalDraws })}</Divider>
      <div style={{ position: 'relative' }}>
        {isLoading && (
          <Grid
            size={{ xs: 12 }}
            padding={8}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: isLoading ? 1 : 0,
              transition: 'opacity 400ms ease-in-out',
              zIndex: 1,
            }}
          >
            <CircularProgress />
          </Grid>
        )}
        <div
          style={{
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 400ms ease-in-out',
          }}
        >
          {hasResults ? (
            <Grid container size={{ xs: 12 }} padding={2}>
              <Grid size={{ xs: 12 }}>
                <LottoNumberResultsWrapper allNumberStats={allNumberStats} titleKey={'result.primaryNumbers'}>
                  <>{Object.entries(numberStatsByPosition).map(([, stats], index) => renderLottoNumbers(stats, index))}</>
                </LottoNumberResultsWrapper>
              </Grid>
            </Grid>
          ) : (
            <Grid size={{ xs: 12 }} padding={2}>
              <Typography>{t('result.noResults')}</Typography>
            </Grid>
          )}
        </div>
      </div>
    </CardWrapper>
  );
};
