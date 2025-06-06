import { Divider, Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import { isLoadingSelector, lottoTotalDrawsSelector } from '../../features/lottoProbability/selectors';
import { Loader } from '../../shared/components/Loader';
import { LottoInfo } from '../../shared/components/LottoInfo';
import { LottoProbabilityResults } from '../../shared/components/LottoProbabilityResults';
import { LottoSearch } from '../../shared/components/LottoSearch';
import { LottoType } from '../../shared/types';
import { LINK_BUY_TICKETS, LINK_GAME_RULES, MAX_PRIMARY_NUMBERS } from './constants';
import { kenoLottoMainNumbersSelector, kenoLottoWinningNumberStatsSelector } from './selectors';

export const KenoLottoCard = () => {
  const isLoading = useSelector(isLoadingSelector);
  const lottoMainNumbers = useSelector(kenoLottoMainNumbersSelector);
  const winningNumberStats = useSelector(kenoLottoWinningNumberStatsSelector);
  const totalDraws = useSelector(lottoTotalDrawsSelector);

  const mainDisplayNumbers = lottoMainNumbers.winningNumberStats.slice(0, MAX_PRIMARY_NUMBERS);
  const hiddenMainDisplayNumbers = lottoMainNumbers.winningNumberStats.slice(MAX_PRIMARY_NUMBERS);

  return (
    <Grid container spacing={2}>
      <Grid container size={{ xs: 12 }}>
        <LottoInfo lottoType={LottoType.KENO} linkBuyTickets={LINK_BUY_TICKETS} linkGameRules={LINK_GAME_RULES} />
      </Grid>
      <Grid container size={{ xs: 12 }} sx={{ textAlign: 'center' }}>
        <LottoSearch lottoType={LottoType.KENO} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Divider textAlign="center">Total: {totalDraws} draws</Divider>
      </Grid>
      <Grid container size={{ xs: 12 }} sx={{ textAlign: 'center' }}>
        <Loader shouldShow={isLoading} />
        <LottoProbabilityResults
          shouldShow={!isLoading}
          totalDraws={totalDraws}
          numberStatsResults={[
            {
              title: 'Primary numbers',
              maxNumbersCount: MAX_PRIMARY_NUMBERS,
              allNumberStats: winningNumberStats,
              displayNumberStats: mainDisplayNumbers,
              hiddenNumberStats: hiddenMainDisplayNumbers,
            },
          ]}
        />
      </Grid>
    </Grid>
  );
};
