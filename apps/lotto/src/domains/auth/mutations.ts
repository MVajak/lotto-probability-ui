import { apiFetch } from '../api/client';

interface RequestOtpResponse {
  message: string;
}

interface VerifyOtpResponse {
  accessToken: string;
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
    apiFetch<VerifyOtpResponse>('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    }),
};
