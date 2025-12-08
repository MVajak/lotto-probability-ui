import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { AdSpace } from '@lotto/ui';

import {
  getMostProbableDigitsByPosition,
  LottoInfo,
  LottoSearch,
  LottoType,
  probabilityQueryOptions,
  useLottoStore,
} from '@/domains/lotto';
import { LottoPositionalProbabilityResults } from '@/domains/probability/components/LottoPositionalProbabilityResults';

import { LINK_BUY_TICKETS, LINK_GAME_RULES } from './constants';

export const JokkerLottoCard = () => {
  const searchParams = useLottoStore((state) => state.searchParams);
  const isCurrentLottoType = searchParams.lottoType === LottoType.JOKKER;

  const { data, isLoading } = useQuery({
    ...probabilityQueryOptions({
      lottoType: LottoType.JOKKER,
      dateFrom: searchParams.dateFrom,
      dateTo: searchParams.dateTo,
    }),
    enabled: isCurrentLottoType,
  });

  const { winningNumberStats, mostProbableNumbersByPosition, totalDraws } = useMemo(() => {
    const probabilityNumbers = data?.probabilityNumbers[0];
    if (!probabilityNumbers) {
      return {
        winningNumberStats: [],
        mostProbableNumbersByPosition: {},
        totalDraws: 0,
      };
    }

    return {
      winningNumberStats: probabilityNumbers.winningNumbersCount,
      mostProbableNumbersByPosition: getMostProbableDigitsByPosition(probabilityNumbers.winningNumbersCount),
      totalDraws: data?.totalDraws ?? 0,
    };
  }, [data]);

  return (
    <div className="flex flex-col gap-4">
      <LottoInfo lottoType={LottoType.JOKKER} linkBuyTickets={LINK_BUY_TICKETS} linkGameRules={LINK_GAME_RULES} />
      <div className="block lg:hidden">
        <AdSpace position="in-content" showPlaceholder={import.meta.env.DEV} />
      </div>
      <div className="text-center">
        <LottoSearch lottoType={LottoType.JOKKER} />
      </div>
      <LottoPositionalProbabilityResults
        isLoading={isLoading}
        totalDraws={totalDraws}
        allNumberStats={winningNumberStats}
        numberStatsByPosition={mostProbableNumbersByPosition}
      />
    </div>
  );
};
