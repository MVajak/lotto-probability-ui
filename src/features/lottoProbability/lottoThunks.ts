import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { LottoSearchDto } from './types';

export const calculateLottoProbability = createAsyncThunk('/lotto-probability', async (payload: LottoSearchDto) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const response = await axios.post(`${apiUrl}/lotto-probability`, payload);
  return response.data;
});
