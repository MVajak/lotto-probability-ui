import { fetchSubscriptionTiers } from './subscriptionThunks';
import type { SubscriptionState } from './types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: SubscriptionState = {
  tiers: [],
  isLoading: false,
  error: null,
};

export const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptionTiers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptionTiers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tiers = action.payload;
      })
      .addCase(fetchSubscriptionTiers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch subscription tiers';
      });
  },
});

export default subscriptionSlice.reducer;
