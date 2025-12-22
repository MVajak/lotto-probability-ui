import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiFetch } from '../api/client';
import { currentUserQuery } from './queries';
import { useAuthStore } from './store';
import type { AuthTokens, UpdateProfileInput, User } from './types';

interface RequestOtpResponse {
  message: string;
}

export const requestOtpMutation = {
  mutationFn: (email: string) =>
    apiFetch<RequestOtpResponse>('/auth/request-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
};

export const verifyOtpMutation = {
  mutationFn: ({ email, code }: { email: string; code: string }) =>
    apiFetch<AuthTokens>('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    }),
};

/**
 * Refresh tokens using the stored refresh token.
 * Updates the auth store with new tokens.
 */
export async function refreshAuthTokens(): Promise<void> {
  const refreshToken = useAuthStore.getState().refreshToken;
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const tokens = await apiFetch<AuthTokens>('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });

  useAuthStore.getState().setTokens(tokens);
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileInput) =>
      apiFetch<User>('/users/me', {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: currentUserQuery.queryKey });
    },
  });
}

export function useDeleteAccountMutation() {
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: () => apiFetch<void>('/users/me', { method: 'DELETE' }),
    onSuccess: () => {
      logout();
    },
  });
}
