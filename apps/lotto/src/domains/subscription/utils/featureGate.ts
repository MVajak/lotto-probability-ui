import type { SubscriptionFeature, SubscriptionTierCode } from '../types';

/**
 * Minimum number of draws required for most statistical analyses.
 * This threshold ensures validity of Normal approximation to binomial distribution
 * (rule of thumb: n×p ≥ 5 and n×(1-p) ≥ 5).
 */
export const MIN_DRAWS_FOR_STATISTICS = 20;

/**
 * Minimum number of draws required for seasonal pattern analysis.
 */
export const MIN_DRAWS_FOR_SEASONAL = 30;

/**
 * Centralized feature configuration combining subscription tier requirements
 * with minimum draw thresholds for statistical validity.
 */
export const FEATURE_CONFIG = {
  // PRO tier features (no min draws needed)
  TIMELINE: { tier: 'PRO' as const, minDraws: 0 },
  TRENDS: { tier: 'PRO' as const, minDraws: 0 },
  WILSON_CI: { tier: 'PRO' as const, minDraws: 0 },
  STD_DEVIATION: { tier: 'PRO' as const, minDraws: 0 },

  // PREMIUM tier features (require sufficient data for statistical validity)
  MARKOV_CHAIN: { tier: 'PREMIUM' as const, minDraws: MIN_DRAWS_FOR_STATISTICS },
  AUTOCORRELATION: { tier: 'PREMIUM' as const, minDraws: MIN_DRAWS_FOR_STATISTICS },
  PAIR_ANALYSIS: { tier: 'PREMIUM' as const, minDraws: MIN_DRAWS_FOR_STATISTICS },
  MONTE_CARLO: { tier: 'PREMIUM' as const, minDraws: MIN_DRAWS_FOR_STATISTICS },
  SEASONAL_PATTERNS: { tier: 'PREMIUM' as const, minDraws: MIN_DRAWS_FOR_SEASONAL },
} as const;

export type AnalysisFeature = keyof typeof FEATURE_CONFIG;

/**
 * Features available for each subscription tier.
 * Derived from FEATURE_CONFIG for consistency.
 */
export const TIER_FEATURES: Record<SubscriptionTierCode, SubscriptionFeature[]> = {
  FREE: [],
  PRO: (Object.entries(FEATURE_CONFIG) as [AnalysisFeature, (typeof FEATURE_CONFIG)[AnalysisFeature]][])
    .filter(([, config]) => config.tier === 'PRO')
    .map(([feature]) => feature),
  PREMIUM: Object.keys(FEATURE_CONFIG) as AnalysisFeature[],
};
/**
 * Date range limits for each tier.
 * - FREE: Max 5 weeks back (covers ~5 weekly draws)
 * - PRO: Max 2 years back
 * - PREMIUM: Since Jan 1, 2021
 */
export const DATE_RANGE_LIMITS: Record<SubscriptionTierCode, { days?: number; minDate?: Date }> = {
  FREE: { days: 35 },
  PRO: { days: 730 },
  PREMIUM: { minDate: new Date('2021-01-01') },
};

/**
 * Check if a tier has access to a specific feature.
 */
export function hasFeature(tier: SubscriptionTierCode, feature: SubscriptionFeature): boolean {
  return TIER_FEATURES[tier]?.includes(feature) ?? false;
}

/**
 * Get the minimum allowed date for searches based on tier.
 * - FREE: 1 week back from today
 * - PRO: 2 years back from today
 * - PREMIUM: Jan 1, 2021
 */
export function getMinAllowedDate(tier: SubscriptionTierCode): Date {
  const limit = DATE_RANGE_LIMITS[tier];

  if (limit.minDate) {
    return limit.minDate;
  }

  const date = new Date();
  date.setDate(date.getDate() - (limit.days ?? 7));
  return date;
}
