import { SubscriptionTierCode } from '@/domains/subscription';

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
