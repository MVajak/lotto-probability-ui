import { createSlice } from '@reduxjs/toolkit';

import { requestMagicLink } from './authThunks';
import { AuthState } from './types';

const initialState: AuthState = {
  isLoading: false,
  error: null,
  emailSent: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.emailSent = false;
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
