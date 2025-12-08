export type SubscriptionTierCode = 'FREE' | 'PRO' | 'PREMIUM';

export type SubscriptionFeature =
  | 'STATS_2_MONTHS'
  | 'STATS_2_YEARS'
  | 'STATS_5_YEARS'
  | 'BASIC_FREQUENCY'
  | 'AD_SUPPORTED'
  | 'NO_ADS'
  | 'WILSON_CI'
  | 'STD_DEVIATION'
  | 'MARKOV_CHAIN'
  | 'AUTOCORRELATION'
  | 'INTERACTIVE_GRAPHS'
  | 'ADVANCED_VISUALIZATION';

export interface SubscriptionTier {
  id: string;
  code: SubscriptionTierCode;
  price: string;
  features: SubscriptionFeature[];
  displayOrder: number;
}
