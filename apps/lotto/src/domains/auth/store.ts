import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { AuthTokens } from './types';

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (tokens: AuthTokens) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: (tokens) => set({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken }),
      logout: () => set({ accessToken: null, refreshToken: null }),
    }),
    { name: 'auth-storage' }
  )
);
