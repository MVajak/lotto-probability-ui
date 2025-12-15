import { queryOptions } from '@tanstack/react-query';

import { apiFetch } from '../api/client';
import type { LottoProbabilityDto, LottoSearchDto, NumberHistoryDto, NumberHistoryRequestDto } from './types';

export const probabilityQueryOptions = (params: LottoSearchDto) =>
  queryOptions({
    queryKey: ['lotto', 'probability', params],
    queryFn: () =>
      apiFetch<LottoProbabilityDto>('/lotto-probability', {
        method: 'POST',
        body: JSON.stringify(params),
      }),
    enabled: !!params.lottoType,
  });

export const numberHistoryQueryKey = ['lotto', 'history'] as const;

export const numberHistoryQueryOptions = (params: NumberHistoryRequestDto) =>
  queryOptions({
    queryKey: [...numberHistoryQueryKey, params],
    queryFn: () =>
      apiFetch<NumberHistoryDto>('/number-history', {
        method: 'POST',
        body: JSON.stringify(params),
      }),
  });
