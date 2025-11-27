import { createSlice } from '@reduxjs/toolkit';

import { tokenStorage } from '../../shared/utils/tokenStorage';
import { getMe, requestMagicLink, verifyMagicLink } from './authThunks';
import type { AuthState } from './types';

const initialState: AuthState = {
  isLoading: false,
  error: null,
  emailSent: false,
  isVerifying: false,
  verificationError: null,
  isAuthenticated: !!tokenStorage.getAccessToken(),
  user: null,
  subscription: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.emailSent = false;
      state.isVerifying = false;
      state.verificationError = null;
    },
    logout: (state) => {
      tokenStorage.clearTokens();
      state.isAuthenticated = false;
      state.user = null;
      state.subscription = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Request magic link
      .addCase(requestMagicLink.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.emailSent = false;
      })
      .addCase(requestMagicLink.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.emailSent = true;
      })
      .addCase(requestMagicLink.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to send magic link';
        state.emailSent = false;
      })
      // Verify magic link
      .addCase(verifyMagicLink.pending, (state) => {
        state.isVerifying = true;
        state.verificationError = null;
        state.isAuthenticated = false;
      })
      .addCase(verifyMagicLink.fulfilled, (state) => {
        state.isVerifying = false;
        state.verificationError = null;
        state.isAuthenticated = true;
      })
      .addCase(verifyMagicLink.rejected, (state, action) => {
        state.isVerifying = false;
        state.verificationError = action.error.message || 'Failed to verify magic link';
        state.isAuthenticated = false;
        state.user = null;
        state.subscription = null;
      })
      // Get me
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.subscription = action.payload.subscription;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch user data';
        state.isAuthenticated = false;
        state.user = null;
        state.subscription = null;
        tokenStorage.clearTokens();
      });
  },
});

export const { resetAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
