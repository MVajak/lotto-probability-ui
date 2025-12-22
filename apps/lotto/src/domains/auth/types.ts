import type { SubscriptionTierCode } from '@/domains/subscription';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  country: string | null;
  createdAt: string;
}

export interface Subscription {
  id: string;
  tier: SubscriptionTierCode;
  status: string;
  expiresAt?: string;
}

export interface UpdateProfileInput {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country: string;
}
