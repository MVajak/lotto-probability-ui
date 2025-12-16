import { useMutation, useQueryClient } from '@tanstack/react-query';

import { currentUserQuery, refreshAuthTokens } from '@/domains/auth';
import { numberDetailQueryKey } from '@/domains/lotto';

import { apiFetch } from '../api/client';

interface UpdateTierRequest {
  tierId: string;
}

export function useUpdateTierMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tierId: string) =>
      apiFetch<void>('/subscriptions/tier', {
        method: 'PATCH',
        body: JSON.stringify({ tierId } satisfies UpdateTierRequest),
      }),
    onSuccess: async () => {
      // Refresh tokens to get updated subscription claims in the JWT
      await refreshAuthTokens();
      // Invalidate user data and number detail (tier-gated data may have changed)
      void queryClient.invalidateQueries({ queryKey: currentUserQuery.queryKey });
      void queryClient.invalidateQueries({ queryKey: numberDetailQueryKey });
    },
  });
}
