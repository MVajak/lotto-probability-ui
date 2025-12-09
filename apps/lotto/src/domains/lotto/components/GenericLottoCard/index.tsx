import { AdSpace } from '@lotto/ui';

import type { LotteryConfig } from '../../config/types';
import { useLotteryData } from '../../hooks/useLotteryData';
import { LottoInfoCard } from '../LottoInfoCard';
import { LottoSearchCard } from '../LottoSearchCard';
import { LottoPositionalProbabilityResultsCard, LottoProbabilityResultsCard } from '../results';

export interface GenericLottoCardProps {
  config: LotteryConfig;
}

/**
 * Generic lottery card component that renders any configured lottery type.
 *
 * This component:
 * 1. Uses the config to determine lottery-specific settings
 * 2. Fetches and transforms data via useLotteryData hook
 * 3. Renders the appropriate result component based on dataTransform.mode
 */
export const GenericLottoCard = ({ config }: GenericLottoCardProps) => {
  const { data, isLoading } = useLotteryData(config);

  return (
    <div className="flex flex-col gap-4">
      {/* Lottery Info */}
      <LottoInfoCard
        lottoType={config.lottoType}
        linkBuyTickets={config.links.buyTickets}
        linkGameRules={config.links.gameRules}
      />

      {/* Mobile Ad */}
      <div className="block lg:hidden">
        <AdSpace position="in-content" showPlaceholder={import.meta.env.DEV} />
      </div>

      {/* Search Section */}
      <div className="text-center">
        <LottoSearchCard lottoType={config.lottoType} />
      </div>

      {/* Results Section - Render based on mode */}
      {data?.mode === 'positional' ? (
        <LottoPositionalProbabilityResultsCard
          isLoading={isLoading}
          totalDraws={data.totalDraws}
          allNumberStats={data.allNumberStats}
          numberStatsByPosition={data.numberStatsByPosition}
        />
      ) : (
        <LottoProbabilityResultsCard
          isLoading={isLoading}
          totalDraws={data?.totalDraws ?? 0}
          numberStatsResults={
            data?.categories.map((cat) => ({
              titleKey: cat.config.titleKey,
              maxNumbersCount: cat.config.maxNumbers,
              allNumberStats: cat.allNumberStats,
              displayNumberStats: cat.displayNumberStats,
              hiddenNumberStats: cat.hiddenNumberStats,
              containerSize: cat.config.containerSize,
              isSecondaryNumbers: cat.config.isSecondary,
            })) ?? []
          }
        />
      )}
    </div>
  );
};
