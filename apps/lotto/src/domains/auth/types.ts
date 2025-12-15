import type { SubscriptionTierCode } from '@/domains/subscription';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  tier: SubscriptionTierCode;
  status: string;
  expiresAt?: string;
}
