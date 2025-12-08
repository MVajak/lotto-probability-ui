import { queryOptions } from '@tanstack/react-query';

import { apiFetch } from '../api/client';
import type { Subscription, User } from './types';

interface MeResponse {
  user: User;
  subscription: Subscription | null;
}

export const currentUserQuery = queryOptions({
  queryKey: ['auth', 'me'],
  queryFn: () => apiFetch<MeResponse>('/auth/me'),
  staleTime: 24 * 60 * 60 * 1000,
});
