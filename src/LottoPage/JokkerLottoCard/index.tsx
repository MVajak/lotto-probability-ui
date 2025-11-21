import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../app/store';
import { resetState } from '../../features/lottoProbability/lottoProbabilitySlice';
import { isLoadingSelector, lottoTotalDrawsSelector } from '../../features/lottoProbability/selectors';
import { InContentAd } from '../../shared/components/InContentAd';
import { LottoInfo } from '../../shared/components/LottoInfo';
import { LottoPositionalProbabilityResults } from '../../shared/components/LottoPositionalProbabilityResults';
import { LottoSearch } from '../../shared/components/LottoSearch';
import { LottoType } from '../../shared/types';
import { LINK_BUY_TICKETS, LINK_GAME_RULES } from './constants';
import { jokkerLottoMostProbableNumbersByPositionSelector, jokkerLottoWinningNumberStatsSelector } from './selectors';

export const JokkerLottoCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(isLoadingSelector);
  const mostProbableNumbersByPosition = useSelector(jokkerLottoMostProbableNumbersByPositionSelector);
  const winningNumberStats = useSelector(jokkerLottoWinningNumberStatsSelector);
  const totalDraws = useSelector(lottoTotalDrawsSelector);

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  return (
    <>
      <Grid size={{ xs: 12 }}>
        <LottoInfo lottoType={LottoType.JOKKER} linkBuyTickets={LINK_BUY_TICKETS} linkGameRules={LINK_GAME_RULES} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <InContentAd />
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ textAlign: 'center' }}>
        <LottoSearch lottoType={LottoType.JOKKER} />
      </Grid>
      <Grid container size={{ xs: 12 }} sx={{ textAlign: 'center' }}>
        <LottoPositionalProbabilityResults
          isLoading={isLoading}
          totalDraws={totalDraws}
          allNumberStats={winningNumberStats}
          numberStatsByPosition={mostProbableNumbersByPosition}
        />
      </Grid>
    </>
  );
};
