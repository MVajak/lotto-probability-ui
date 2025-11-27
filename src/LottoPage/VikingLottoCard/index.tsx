import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch } from '../../app/store';
import { resetState } from '../../features/lottoProbability/lottoProbabilitySlice';
import { isLoadingSelector, lottoTotalDrawsSelector } from '../../features/lottoProbability/selectors';
import { InContentAd } from '../../shared/components/InContentAd';
import { LottoInfo } from '../../shared/components/LottoInfo';
import { LottoProbabilityResults } from '../../shared/components/LottoProbabilityResults';
import { LottoSearch } from '../../shared/components/LottoSearch';
import { LottoType } from '../../shared/types';
import { LINK_BUY_TICKETS, LINK_GAME_RULES, MAX_PRIMARY_NUMBERS, MAX_SECONDARY_NUMBERS } from './constants';
import {
  vikingLottoMainNumbersSelector,
  vikingLottoSecWinningNumberStatsSelector,
  vikingLottoWinningNumberStatsSelector,
} from './selectors';

export const VikingLottoCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(isLoadingSelector);
  const lottoMainNumbers = useSelector(vikingLottoMainNumbersSelector);
  const winningNumberStats = useSelector(vikingLottoWinningNumberStatsSelector);
  const secWinningNumberStats = useSelector(vikingLottoSecWinningNumberStatsSelector);
  const totalDraws = useSelector(lottoTotalDrawsSelector);

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  const mainDisplayNumbers = lottoMainNumbers.winningNumberStats.slice(0, MAX_PRIMARY_NUMBERS);
  const hiddenMainDisplayNumbers = lottoMainNumbers.winningNumberStats.slice(MAX_PRIMARY_NUMBERS);
  const secDisplayNumbers = lottoMainNumbers.secWinningNumberStats.slice(0, MAX_SECONDARY_NUMBERS);
  const hiddenSecDisplayNumbers = lottoMainNumbers.secWinningNumberStats.slice(MAX_SECONDARY_NUMBERS);

  return (
    <>
      <Grid size={{ xs: 12 }}>
        <LottoInfo
          lottoType={LottoType.VIKINGLOTTO}
          linkBuyTickets={LINK_BUY_TICKETS}
          linkGameRules={LINK_GAME_RULES}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <InContentAd />
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ textAlign: 'center' }}>
        <LottoSearch lottoType={LottoType.VIKINGLOTTO} />
      </Grid>
      <Grid container size={{ xs: 12 }} sx={{ textAlign: 'center' }}>
        <LottoProbabilityResults
          isLoading={isLoading}
          totalDraws={totalDraws}
          numberStatsResults={[
            {
              titleKey: 'result.primaryNumbers',
              maxNumbersCount: MAX_PRIMARY_NUMBERS,
              allNumberStats: winningNumberStats,
              displayNumberStats: mainDisplayNumbers,
              hiddenNumberStats: hiddenMainDisplayNumbers,
              style: { container: { sm: 6 } },
            },
            {
              titleKey: 'result.secondaryNumbers',
              maxNumbersCount: MAX_SECONDARY_NUMBERS,
              allNumberStats: secWinningNumberStats,
              displayNumberStats: secDisplayNumbers,
              hiddenNumberStats: hiddenSecDisplayNumbers,
              style: { container: { sm: 6 } },
            },
          ]}
        />
      </Grid>
    </>
  );
};
