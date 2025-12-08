import { queryOptions } from '@tanstack/react-query';

import { apiFetch } from '../api/client';
import type { SubscriptionTier } from './types';

export const subscriptionTiersQuery = queryOptions({
  queryKey: ['subscription', 'tiers'],
  queryFn: () => apiFetch<SubscriptionTier[]>('/subscription-tiers'),
  staleTime: 24 * 60 * 60 * 1000, // 24 hours - tiers rarely change
});
