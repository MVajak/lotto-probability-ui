export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  tierCode: string;
  status: string;
  expiresAt?: string;
}
