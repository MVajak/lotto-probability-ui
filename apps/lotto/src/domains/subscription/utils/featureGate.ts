import type { SubscriptionFeature, SubscriptionTierCode } from '../types';

/**
 * Features available for each subscription tier.
 * PRO includes all FREE features, PREMIUM includes all PRO features.
 */
export const TIER_FEATURES: Record<SubscriptionTierCode, SubscriptionFeature[]> = {
  FREE: ['STATS_2_MONTHS', 'BASIC_FREQUENCY', 'AD_SUPPORTED'],
  PRO: ['STATS_2_YEARS', 'WILSON_CI', 'STD_DEVIATION', 'NO_ADS', 'INTERACTIVE_GRAPHS'],
  PREMIUM: [
    'STATS_5_YEARS',
    'WILSON_CI',
    'STD_DEVIATION',
    'MARKOV_CHAIN',
    'AUTOCORRELATION',
    'NO_ADS',
    'INTERACTIVE_GRAPHS',
    'ADVANCED_VISUALIZATION',
  ],
};

/**
 * Maximum date range in months for each tier.
 */
export const DATE_RANGE_MONTHS: Record<SubscriptionTierCode, number> = {
  FREE: 2,
  PRO: 24,
  PREMIUM: 60,
};

/**
 * Check if a tier has access to a specific feature.
 */
export function hasFeature(tier: SubscriptionTierCode, feature: SubscriptionFeature): boolean {
  return TIER_FEATURES[tier]?.includes(feature) ?? false;
}

/**
 * Get the maximum date range in months for a tier.
 */
export function getMaxDateRange(tier: SubscriptionTierCode): number {
  return DATE_RANGE_MONTHS[tier] ?? 2;
}

/**
 * Get the minimum allowed date for searches based on tier.
 */
export function getMinAllowedDate(tier: SubscriptionTierCode): Date {
  const months = getMaxDateRange(tier);
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  return date;
}
