import { queryOptions } from '@tanstack/react-query';

import { apiFetch } from '../api/client';
import type { FeatureFlags } from './types';

export const featureFlagsQuery = queryOptions({
  queryKey: ['featureFlags'],
  queryFn: () => apiFetch<FeatureFlags>('/features'),
  staleTime: 5 * 60 * 1000, // 5 minutes - flags can change
});
