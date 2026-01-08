import { motion } from 'motion/react';

import { AdSpace } from '@lotto/ui';

import { adConfig } from '@/domains/ads/config';
import type { LotteryConfig } from '@/domains/lotto';
import { useLotteryData } from '@/domains/lotto';
import { useSubscriptionTier } from '@/domains/subscription';

import { AnalysisHeader } from '../AnalysisHeader';
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
  const { isPro } = useSubscriptionTier();
  const showAds = !isPro;

  return (
    <div className="flex flex-col gap-4">
      {/* Analysis Header (combines info + search) */}
      <AnalysisHeader config={config} />

      {/* In-Content Ad */}
      {showAds && <AdSpace position="in-content" {...adConfig.getAdProps('in-content')} />}

      {/* Results Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.1 }}>
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
      </motion.div>
    </div>
  );
};
