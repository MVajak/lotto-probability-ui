import { Divider, Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import { isLoadingSelector, lottoTotalDrawsSelector } from '../../features/lottoProbability/selectors';
import { Loader } from '../../shared/components/Loader';
import { LottoInfo } from '../../shared/components/LottoInfo';
import { LottoPositionalProbabilityResults } from '../../shared/components/LottoPositionalProbabilityResults';
import { LottoSearch } from '../../shared/components/LottoSearch';
import { LottoType } from '../../shared/types';
import { LINK_BUY_TICKETS, LINK_GAME_RULES } from './constants';
import { jokkerLottoMostProbableNumbersByPositionSelector, jokkerLottoWinningNumberStatsSelector } from './selectors';

export const JokkerLottoCard = () => {
  const isLoading = useSelector(isLoadingSelector);
  const mostProbableNumbersByPosition = useSelector(jokkerLottoMostProbableNumbersByPositionSelector);
  const winningNumberStats = useSelector(jokkerLottoWinningNumberStatsSelector);
  const totalDraws = useSelector(lottoTotalDrawsSelector);

  return (
    <Grid container spacing={2}>
      <Grid container size={{ xs: 12 }}>
        <LottoInfo lottoType={LottoType.JOKKER} linkBuyTickets={LINK_BUY_TICKETS} linkGameRules={LINK_GAME_RULES} />
      </Grid>
      <Grid container size={{ xs: 12 }} sx={{ textAlign: 'center' }}>
        <LottoSearch lottoType={LottoType.JOKKER} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Divider textAlign="center">Total: {totalDraws} draws</Divider>
      </Grid>
      <Grid container size={{ xs: 12 }} sx={{ textAlign: 'center' }}>
        <Loader shouldShow={isLoading} />
        <LottoPositionalProbabilityResults
          shouldShow={!isLoading}
          totalDraws={totalDraws}
          allNumberStats={winningNumberStats}
          numberStatsByPosition={mostProbableNumbersByPosition}
        />
      </Grid>
    </Grid>
  );
};
