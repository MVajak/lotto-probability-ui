import { apiFetch } from '../api/client';

interface MagicLinkResponse {
  message: string;
}

interface VerifyResponse {
  accessToken: string;
}

export const requestMagicLinkMutation = {
  mutationFn: (email: string) =>
    apiFetch<MagicLinkResponse>('/auth/request-magic-link', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
};

export const verifyMagicLinkMutation = {
  mutationFn: (token: string) => apiFetch<VerifyResponse>(`/auth/verify?token=${token}`),
};
