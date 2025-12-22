export type SubscriptionTierCode = 'FREE' | 'PRO' | 'PREMIUM';

export type SubscriptionFeature =
  // Tier identifiers (for display/billing)
  | 'STATS_2_MONTHS'
  | 'STATS_2_YEARS'
  | 'STATS_5_YEARS'
  | 'BASIC_FREQUENCY'
  | 'AD_SUPPORTED'
  | 'NO_ADS'
  // PRO tier analysis features
  | 'TIMELINE'
  | 'TRENDS'
  | 'WILSON_CI'
  | 'STD_DEVIATION'
  // PREMIUM tier analysis features
  | 'MARKOV_CHAIN'
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
