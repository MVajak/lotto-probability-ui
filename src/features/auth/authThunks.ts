import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { tokenStorage } from '../../shared/utils/tokenStorage';
import { AuthTokens, GetMeResponseDto, MagicLinkRequestDto, MagicLinkResponseDto, VerifyMagicLinkDto } from './types';

export const requestMagicLink = createAsyncThunk<MagicLinkResponseDto, MagicLinkRequestDto>(
  'auth/requestMagicLink',
  async (payload: MagicLinkRequestDto) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await axios.post<MagicLinkResponseDto>(`${apiUrl}/auth/request-magic-link`, payload);
    return response.data;
  }
);

export const verifyMagicLink = createAsyncThunk<AuthTokens, VerifyMagicLinkDto>(
  'auth/verifyMagicLink',
  async (payload: VerifyMagicLinkDto) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await axios.get<AuthTokens>(`${apiUrl}/auth/verify`, {
      params: { token: payload.token },
    });

    // Store tokens in localStorage
    tokenStorage.setTokens(response.data);

    return response.data;
  }
);

export const getMe = createAsyncThunk<GetMeResponseDto>('auth/getMe', async () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const response = await axios.get<GetMeResponseDto>(`${apiUrl}/auth/me`);
  return response.data;
});
