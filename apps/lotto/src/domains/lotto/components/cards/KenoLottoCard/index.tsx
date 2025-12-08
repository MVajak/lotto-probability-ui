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

import { LINK_BUY_TICKETS, LINK_GAME_RULES, MAX_PRIMARY_NUMBERS } from './constants';

export const KenoLottoCard = () => {
  const searchParams = useLottoStore((state) => state.searchParams);
  const isCurrentLottoType = searchParams.lottoType === LottoType.KENO;

  const { data, isLoading } = useQuery({
    ...probabilityQueryOptions({
      lottoType: LottoType.KENO,
      dateFrom: searchParams.dateFrom,
      dateTo: searchParams.dateTo,
    }),
    enabled: isCurrentLottoType,
  });

  const { mainNumbers, winningNumberStats, totalDraws } = useMemo(() => {
    const probabilityNumbers = data?.probabilityNumbers[0];
    if (!probabilityNumbers) {
      return {
        mainNumbers: { winningNumberStats: [] },
        winningNumberStats: [],
        totalDraws: 0,
      };
    }

    return {
      mainNumbers: {
        winningNumberStats: getTopProbabilityStats(probabilityNumbers.winningNumbersCount, MAX_PRIMARY_NUMBERS),
      },
      winningNumberStats: probabilityNumbers.winningNumbersCount,
      totalDraws: data?.totalDraws ?? 0,
    };
  }, [data]);

  const mainDisplayNumbers = mainNumbers.winningNumberStats.slice(0, MAX_PRIMARY_NUMBERS);
  const hiddenMainDisplayNumbers = mainNumbers.winningNumberStats.slice(MAX_PRIMARY_NUMBERS);

  return (
    <div className="flex flex-col gap-4">
      <LottoInfo lottoType={LottoType.KENO} linkBuyTickets={LINK_BUY_TICKETS} linkGameRules={LINK_GAME_RULES} />
      <div className="block lg:hidden">
        <AdSpace position="in-content" showPlaceholder={import.meta.env.DEV} />
      </div>
      <div className="text-center">
        <LottoSearch lottoType={LottoType.KENO} />
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
          },
        ]}
      />
    </div>
  );
};
