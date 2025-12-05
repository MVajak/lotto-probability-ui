export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  userState: string;
  emailVerified: boolean;
  language: string;
  timezone: string;
  loginCount: number;
  createdAt: string;
}

export interface Subscription {
  id: string;
  tier: string;
  status: string;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
}

export interface AuthState {
  isLoading: boolean;
  error: string | null;
  emailSent: boolean;
  isVerifying: boolean;
  verificationError: string | null;
  isAuthenticated: boolean;
  user: User | null;
  subscription: Subscription | null;
}

export interface MagicLinkRequestDto {
  email: string;
}

export interface MagicLinkResponseDto {
  message: string;
}

export interface VerifyMagicLinkDto {
  token: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface GetMeResponseDto {
  user: User;
  subscription: Subscription;
}
