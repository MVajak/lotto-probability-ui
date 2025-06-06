import { Divider, Grid, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../app/store';
import { resetState } from '../../features/lottoProbability/lottoProbabilitySlice';
import { isLoadingSelector, lottoTotalDrawsSelector } from '../../features/lottoProbability/selectors';
import { Loader } from '../../shared/components/Loader';
import { LottoInfo } from '../../shared/components/LottoInfo';
import { LottoProbabilityResults } from '../../shared/components/LottoProbabilityResults';
import { LottoSearch } from '../../shared/components/LottoSearch';
import { LottoType } from '../../shared/types';
import {
  LINK_BUY_TICKETS,
  LINK_GAME_RULES,
  MAX_CENTER_NUMBERS,
  MAX_CORNER_NUMBERS,
  MAX_DIAGONAL_NUMBERS,
  MAX_FULL_NUMBERS,
} from './constants';
import {
  centerSquareGameWinningNumberStatsSelector,
  cornerSquareGameWinningNumberStatsSelector,
  diagonalSquareGameWinningNumberStatsSelector,
  fullGameWinningNumberStatsSelector,
  mainWinningNumberStatsSelector,
} from './selectors';

export const BingoLottoCard = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(isLoadingSelector);
  const centerSquareNumberStats = useSelector(centerSquareGameWinningNumberStatsSelector);
  const cornerSquareNumberStats = useSelector(cornerSquareGameWinningNumberStatsSelector);
  const diagonalSquareNumberStats = useSelector(diagonalSquareGameWinningNumberStatsSelector);
  const fullGameNumberStats = useSelector(fullGameWinningNumberStatsSelector);
  const mainWinningNumberStats = useSelector(mainWinningNumberStatsSelector);
  const totalDraws = useSelector(lottoTotalDrawsSelector);

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  const centerSquareDisplayNumbers = mainWinningNumberStats.centerNumberStats.slice(0, MAX_CENTER_NUMBERS);
  const hiddenCenterSquareNumbers = mainWinningNumberStats.centerNumberStats.slice(MAX_CENTER_NUMBERS);
  const cornerSquareDisplayNumbers = mainWinningNumberStats.cornerNumberStats.slice(0, MAX_CORNER_NUMBERS);
  const hiddenCornerSquareNumbers = mainWinningNumberStats.cornerNumberStats.slice(MAX_CORNER_NUMBERS);
  const diagonalSquareDisplayNumbers = mainWinningNumberStats.diagonalNumberStats.slice(0, MAX_DIAGONAL_NUMBERS);
  const hiddenDiagonalSquareNumbers = mainWinningNumberStats.diagonalNumberStats.slice(MAX_DIAGONAL_NUMBERS);
  const fullGameDisplayNumbers = mainWinningNumberStats.fullNumberStats.slice(0, MAX_FULL_NUMBERS);
  const hiddenFullGameNumbers = mainWinningNumberStats.fullNumberStats.slice(MAX_FULL_NUMBERS);

  return (
    <Grid container spacing={2}>
      <Grid container size={{ xs: 12 }}>
        <LottoInfo lottoType={LottoType.BINGO} linkBuyTickets={LINK_BUY_TICKETS} linkGameRules={LINK_GAME_RULES} />
      </Grid>
      <Grid container size={{ xs: 12 }} sx={{ textAlign: 'center' }}>
        <LottoSearch lottoType={LottoType.BINGO} />
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
              title: 'Center Game',
              maxNumbersCount: MAX_CENTER_NUMBERS,
              allNumberStats: centerSquareNumberStats,
              displayNumberStats: centerSquareDisplayNumbers,
              hiddenNumberStats: hiddenCenterSquareNumbers,
              style: {
                container: { sm: 4 },
                digitButton: { backgroundColor: theme.palette.error.main },
              },
            },
            {
              title: 'Corner Game',
              maxNumbersCount: MAX_CORNER_NUMBERS,
              allNumberStats: cornerSquareNumberStats,
              displayNumberStats: cornerSquareDisplayNumbers,
              hiddenNumberStats: hiddenCornerSquareNumbers,
              style: {
                container: { sm: 8 },
                digitButton: { backgroundColor: theme.palette.primary.light },
              },
            },
            {
              title: 'Diagonal Game',
              maxNumbersCount: MAX_DIAGONAL_NUMBERS,
              allNumberStats: diagonalSquareNumberStats,
              displayNumberStats: diagonalSquareDisplayNumbers,
              hiddenNumberStats: hiddenDiagonalSquareNumbers,
              style: {
                container: { sm: 4 },
                digitButton: { backgroundColor: theme.palette.success.light },
              },
            },
            {
              title: 'Full Game',
              maxNumbersCount: MAX_FULL_NUMBERS,
              allNumberStats: fullGameNumberStats,
              displayNumberStats: fullGameDisplayNumbers,
              hiddenNumberStats: hiddenFullGameNumbers,
              style: {
                container: { sm: 8 },
                digitButton: { backgroundColor: theme.palette.warning.light },
              },
            },
          ]}
        />
      </Grid>
    </Grid>
  );
};
