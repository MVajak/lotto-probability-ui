import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { AdSpace } from '@lotto/ui';

import {
  getTopProbabilityStats,
  LottoInfo,
  LottoSearch,
  LottoType,
  probabilityQueryOptions,
  useLottoStore,
} from '@/domains/lotto';
import { LottoProbabilityResults } from '@/domains/probability/components/LottoProbabilityResults';

import {
  CENTER_SQUARE_GAME_WIN_CLASS,
  CORNER_SQUARE_GAME_WIN_CLASS,
  DIAGONAL_SQUARE_GAME_WIN_CLASS,
  FULL_GAME_WIN_CLASS,
  LINK_BUY_TICKETS,
  LINK_GAME_RULES,
  MAX_CENTER_NUMBERS,
  MAX_CORNER_NUMBERS,
  MAX_DIAGONAL_NUMBERS,
  MAX_FULL_NUMBERS,
} from './constants';

export const BingoLottoCard = () => {
  const searchParams = useLottoStore((state) => state.searchParams);
  const isCurrentLottoType = searchParams.lottoType === LottoType.BINGO;

  const { data, isLoading } = useQuery({
    ...probabilityQueryOptions({
      lottoType: LottoType.BINGO,
      dateFrom: searchParams.dateFrom,
      dateTo: searchParams.dateTo,
    }),
    enabled: isCurrentLottoType,
  });

  const {
    centerSquareNumberStats,
    cornerSquareNumberStats,
    diagonalSquareNumberStats,
    fullGameNumberStats,
    mainWinningNumberStats,
    totalDraws,
  } = useMemo(() => {
    if (!data) {
      return {
        centerSquareNumberStats: [],
        cornerSquareNumberStats: [],
        diagonalSquareNumberStats: [],
        fullGameNumberStats: [],
        mainWinningNumberStats: {
          centerNumberStats: [],
          cornerNumberStats: [],
          diagonalNumberStats: [],
          fullNumberStats: [],
        },
        totalDraws: 0,
      };
    }

    const centerStats =
      data.probabilityNumbers.find((p) => p.winClass === CENTER_SQUARE_GAME_WIN_CLASS)?.winningNumbersCount ?? [];
    const cornerStats =
      data.probabilityNumbers.find((p) => p.winClass === CORNER_SQUARE_GAME_WIN_CLASS)?.winningNumbersCount ?? [];
    const diagonalStats =
      data.probabilityNumbers.find((p) => p.winClass === DIAGONAL_SQUARE_GAME_WIN_CLASS)?.winningNumbersCount ?? [];
    const fullStats =
      data.probabilityNumbers.find((p) => p.winClass === FULL_GAME_WIN_CLASS)?.winningNumbersCount ?? [];

    return {
      centerSquareNumberStats: centerStats,
      cornerSquareNumberStats: cornerStats,
      diagonalSquareNumberStats: diagonalStats,
      fullGameNumberStats: fullStats,
      mainWinningNumberStats: {
        centerNumberStats: getTopProbabilityStats(centerStats, MAX_CENTER_NUMBERS),
        cornerNumberStats: getTopProbabilityStats(cornerStats, MAX_CORNER_NUMBERS),
        diagonalNumberStats: getTopProbabilityStats(diagonalStats, MAX_DIAGONAL_NUMBERS),
        fullNumberStats: getTopProbabilityStats(fullStats, MAX_FULL_NUMBERS),
      },
      totalDraws: data.totalDraws,
    };
  }, [data]);

  const centerSquareDisplayNumbers = mainWinningNumberStats.centerNumberStats.slice(0, MAX_CENTER_NUMBERS);
  const hiddenCenterSquareNumbers = mainWinningNumberStats.centerNumberStats.slice(MAX_CENTER_NUMBERS);
  const cornerSquareDisplayNumbers = mainWinningNumberStats.cornerNumberStats.slice(0, MAX_CORNER_NUMBERS);
  const hiddenCornerSquareNumbers = mainWinningNumberStats.cornerNumberStats.slice(MAX_CORNER_NUMBERS);
  const diagonalSquareDisplayNumbers = mainWinningNumberStats.diagonalNumberStats.slice(0, MAX_DIAGONAL_NUMBERS);
  const hiddenDiagonalSquareNumbers = mainWinningNumberStats.diagonalNumberStats.slice(MAX_DIAGONAL_NUMBERS);
  const fullGameDisplayNumbers = mainWinningNumberStats.fullNumberStats.slice(0, MAX_FULL_NUMBERS);
  const hiddenFullGameNumbers = mainWinningNumberStats.fullNumberStats.slice(MAX_FULL_NUMBERS);

  return (
    <div className="flex flex-col gap-4">
      <LottoInfo lottoType={LottoType.BINGO} linkBuyTickets={LINK_BUY_TICKETS} linkGameRules={LINK_GAME_RULES} />
      <div className="block lg:hidden">
        <AdSpace position="in-content" showPlaceholder={import.meta.env.DEV} />
      </div>
      <div className="text-center">
        <LottoSearch lottoType={LottoType.BINGO} />
      </div>
      <LottoProbabilityResults
        isLoading={isLoading}
        totalDraws={totalDraws}
        numberStatsResults={[
          {
            titleKey: 'result.bingo.centerGame',
            maxNumbersCount: MAX_CENTER_NUMBERS,
            allNumberStats: centerSquareNumberStats,
            displayNumberStats: centerSquareDisplayNumbers,
            hiddenNumberStats: hiddenCenterSquareNumbers,
            containerSize: { sm: 4 },
          },
          {
            titleKey: 'result.bingo.cornerGame',
            maxNumbersCount: MAX_CORNER_NUMBERS,
            allNumberStats: cornerSquareNumberStats,
            displayNumberStats: cornerSquareDisplayNumbers,
            hiddenNumberStats: hiddenCornerSquareNumbers,
            containerSize: { sm: 8 },
          },
          {
            titleKey: 'result.bingo.diagonalGame',
            maxNumbersCount: MAX_DIAGONAL_NUMBERS,
            allNumberStats: diagonalSquareNumberStats,
            displayNumberStats: diagonalSquareDisplayNumbers,
            hiddenNumberStats: hiddenDiagonalSquareNumbers,
            containerSize: { sm: 4 },
          },
          {
            titleKey: 'result.bingo.fullGame',
            maxNumbersCount: MAX_FULL_NUMBERS,
            allNumberStats: fullGameNumberStats,
            displayNumberStats: fullGameDisplayNumbers,
            hiddenNumberStats: hiddenFullGameNumbers,
            containerSize: { sm: 8 },
          },
        ]}
      />
    </div>
  );
};
