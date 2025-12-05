import type { SubscriptionTier } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSubscriptionTiers = createAsyncThunk<SubscriptionTier[]>('subscription/fetchTiers', async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await axios.get<SubscriptionTier[]>(`${apiUrl}/subscription-tiers`);
  return response.data;
});
