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

import { LINK_BUY_TICKETS, LINK_GAME_RULES, MAX_PRIMARY_NUMBERS, MAX_SECONDARY_NUMBERS } from './constants';

export const EuroJackpotLottoCard = () => {
  const searchParams = useLottoStore((state) => state.searchParams);
  const isCurrentLottoType = searchParams.lottoType === LottoType.EURO;

  const { data, isLoading } = useQuery({
    ...probabilityQueryOptions({
      lottoType: LottoType.EURO,
      dateFrom: searchParams.dateFrom,
      dateTo: searchParams.dateTo,
    }),
    enabled: isCurrentLottoType,
  });

  const { mainNumbers, winningNumberStats, secWinningNumberStats, totalDraws } = useMemo(() => {
    const probabilityNumbers = data?.probabilityNumbers[0];
    if (!probabilityNumbers) {
      return {
        mainNumbers: { winningNumberStats: [], secWinningNumberStats: [] },
        winningNumberStats: [],
        secWinningNumberStats: [],
        totalDraws: 0,
      };
    }

    return {
      mainNumbers: {
        winningNumberStats: getTopProbabilityStats(probabilityNumbers.winningNumbersCount, MAX_PRIMARY_NUMBERS),
        secWinningNumberStats: getTopProbabilityStats(
          probabilityNumbers.secWinningNumbersCount ?? [],
          MAX_SECONDARY_NUMBERS
        ),
      },
      winningNumberStats: probabilityNumbers.winningNumbersCount,
      secWinningNumberStats: probabilityNumbers.secWinningNumbersCount ?? [],
      totalDraws: data?.totalDraws ?? 0,
    };
  }, [data]);

  const mainDisplayNumbers = mainNumbers.winningNumberStats.slice(0, MAX_PRIMARY_NUMBERS);
  const hiddenMainDisplayNumbers = mainNumbers.winningNumberStats.slice(MAX_PRIMARY_NUMBERS);
  const secDisplayNumbers = mainNumbers.secWinningNumberStats.slice(0, MAX_SECONDARY_NUMBERS);
  const hiddenSecDisplayNumbers = mainNumbers.secWinningNumberStats.slice(MAX_SECONDARY_NUMBERS);

  return (
    <div className="flex flex-col gap-4">
      <LottoInfo lottoType={LottoType.EURO} linkBuyTickets={LINK_BUY_TICKETS} linkGameRules={LINK_GAME_RULES} />
      <div className="block lg:hidden">
        <AdSpace position="in-content" showPlaceholder={import.meta.env.DEV} />
      </div>
      <div>
        <LottoSearch lottoType={LottoType.EURO} />
      </div>
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
            containerSize: { sm: 6 },
          },
          {
            titleKey: 'result.secondaryNumbers',
            maxNumbersCount: MAX_SECONDARY_NUMBERS,
            allNumberStats: secWinningNumberStats,
            displayNumberStats: secDisplayNumbers,
            hiddenNumberStats: hiddenSecDisplayNumbers,
            containerSize: { sm: 6 },
          },
        ]}
      />
    </div>
  );
};
