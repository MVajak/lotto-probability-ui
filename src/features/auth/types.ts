export interface AuthState {
  isLoading: boolean;
  error: string | null;
  emailSent: boolean;
}

export interface MagicLinkRequestDto {
  email: string;
}

export interface MagicLinkResponseDto {
  message: string;
}
