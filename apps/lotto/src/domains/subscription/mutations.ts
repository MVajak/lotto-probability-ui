import { useMutation, useQueryClient } from '@tanstack/react-query';

import { currentUserQuery, refreshAuthTokens } from '@/domains/auth';
import { numberDetailQueryKey } from '@/domains/lotto';

import { apiFetch } from '../api/client';

// ─────────────────────────────────────────────────────────────────────────────
// Update Tier (direct update, kept for admin/testing)
// ─────────────────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────────────
// Stripe Checkout Session
// ─────────────────────────────────────────────────────────────────────────────

interface CreateCheckoutSessionRequest {
  tierCode: 'PRO' | 'PREMIUM';
  successUrl: string;
  cancelUrl: string;
}

interface CreateCheckoutSessionResponse {
  checkoutUrl: string;
}

export function useCreateCheckoutSessionMutation() {
  return useMutation({
    mutationFn: (data: CreateCheckoutSessionRequest) =>
      apiFetch<CreateCheckoutSessionResponse>('/subscriptions/create-checkout-session', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: (data) => {
      // Redirect to Stripe checkout page
      window.location.href = data.checkoutUrl;
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Cancel Subscription (downgrade to FREE at period end)
// ─────────────────────────────────────────────────────────────────────────────

export function useCancelSubscriptionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiFetch<void>('/subscriptions/cancel', {
        method: 'POST',
      }),
    onSuccess: async () => {
      // Refresh tokens to get updated subscription status
      await refreshAuthTokens();
      // Invalidate user data to reflect cancellation
      void queryClient.invalidateQueries({ queryKey: currentUserQuery.queryKey });
      void queryClient.invalidateQueries({ queryKey: numberDetailQueryKey });
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Change Tier (PRO ↔ PREMIUM) - also resumes if cancelled
// ─────────────────────────────────────────────────────────────────────────────

interface ChangeTierRequest {
  tierCode: 'PRO' | 'PREMIUM';
}

export function useChangeTierMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ChangeTierRequest) =>
      apiFetch<void>('/subscriptions/change-tier', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: async () => {
      await refreshAuthTokens();
      void queryClient.invalidateQueries({ queryKey: currentUserQuery.queryKey });
      void queryClient.invalidateQueries({ queryKey: numberDetailQueryKey });
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Resume Subscription (undo cancellation)
// ─────────────────────────────────────────────────────────────────────────────

export function useResumeSubscriptionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiFetch<void>('/subscriptions/resume', {
        method: 'POST',
      }),
    onSuccess: async () => {
      await refreshAuthTokens();
      void queryClient.invalidateQueries({ queryKey: currentUserQuery.queryKey });
      void queryClient.invalidateQueries({ queryKey: numberDetailQueryKey });
    },
  });
}
