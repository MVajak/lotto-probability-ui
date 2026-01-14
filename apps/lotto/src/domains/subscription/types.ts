export type SubscriptionTierCode = 'FREE' | 'PRO' | 'PREMIUM';

export type SubscriptionFeature =
  // Tier identifiers (for display/billing)
  | 'STATS_5_DRAWS'
  | 'BASIC_FREQUENCY'
  | 'AD_SUPPORTED'
  // PRO tier analysis features
  | 'NO_ADS'
  | 'STATS_100_DRAWS'
  | 'TIMELINE'
  | 'TRENDS'
  | 'WILSON_CI'
  | 'STD_DEVIATION'
  // PREMIUM tier analysis features
  | 'MARKOV_CHAIN'
  | 'STATS_ALL_DRAWS'
  | 'AUTOCORRELATION'
  | 'PAIR_ANALYSIS'
  | 'MONTE_CARLO'
  | 'SEASONAL_PATTERNS';

export interface SubscriptionTier {
  id: string;
  code: SubscriptionTierCode;
  price: string;
  features: SubscriptionFeature[];
  displayOrder: number;
}
