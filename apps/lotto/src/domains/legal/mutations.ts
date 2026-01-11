import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiFetch } from '@/domains/api/client';
import { refreshAuthTokens } from '@/domains/auth/mutations';

/**
 * Mutation to accept terms of service and privacy policy.
 * Updates the user's accepted_terms_version in the database.
 * Refreshes tokens and user data on success.
 */
export function useAcceptTermsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (version: string) => {
      return apiFetch('/auth/accept-terms', {
        method: 'POST',
        body: JSON.stringify({ acceptedTermsVersion: version }),
      });
    },
    onSuccess: async () => {
      // Refresh tokens to get new token with updated terms claim
      await refreshAuthTokens();
      // Invalidate user query to re-fetch with updated terms version
      void queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    },
  });
}
