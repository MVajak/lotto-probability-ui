import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { MagicLinkRequestDto, MagicLinkResponseDto } from './types';

export const requestMagicLink = createAsyncThunk<MagicLinkResponseDto, MagicLinkRequestDto>(
  'auth/requestMagicLink',
  async (payload: MagicLinkRequestDto) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await axios.post<MagicLinkResponseDto>(`${apiUrl}/auth/request-magic-link`, payload);
    return response.data;
  }
);
