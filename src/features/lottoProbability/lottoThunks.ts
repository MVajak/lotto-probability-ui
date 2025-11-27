import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { LottoSearchDto, NumberHistoryDto, NumberHistoryRequestDto } from './types';

export const calculateLottoProbability = createAsyncThunk('/lotto-probability', async (payload: LottoSearchDto) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await axios.post(`${apiUrl}/lotto-probability`, payload);
  return response.data;
});

export const fetchNumberHistory = createAsyncThunk<NumberHistoryDto, NumberHistoryRequestDto>(
  '/lotto-probability/number-history',
  async (payload: NumberHistoryRequestDto) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await axios.post(`${apiUrl}/number-history`, payload);
    return response.data;
  }
);
