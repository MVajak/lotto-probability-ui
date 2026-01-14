import { useSuspenseQuery } from '@tanstack/react-query';

import { currentUserQuery } from '@/domains/auth';

import type { SubscriptionFeature, SubscriptionTierCode } from '../types';
import { getMinAllowedDate, hasFeature } from '../utils/featureGate';

/**
 * Hook to access the current user's subscription tier and feature access.
 * Uses Suspense - must be wrapped in a Suspense boundary.
 */
export function useSubscriptionTier() {
  const { data: userData } = useSuspenseQuery(currentUserQuery);
  const tierCode = (userData.subscription?.tier ?? 'FREE') as SubscriptionTierCode;

  return {
    /** Current subscription tier code */
    tierCode,

    /** Check if user has access to a specific feature */
    hasFeature: (feature: SubscriptionFeature) => hasFeature(tierCode, feature),

    /** Minimum allowed date for searches based on tier */
    minAllowedDate: getMinAllowedDate(tierCode),

    /** True if user is PRO or PREMIUM */
    isPro: tierCode === 'PRO' || tierCode === 'PREMIUM',

    /** True if user is PREMIUM */
    isPremium: tierCode === 'PREMIUM',
  };
}
