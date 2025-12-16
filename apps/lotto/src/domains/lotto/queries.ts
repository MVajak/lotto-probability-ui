import { queryOptions } from '@tanstack/react-query';

import { apiFetch } from '../api/client';
import type { LottoProbabilityDto, LottoSearchDto, NumberDetailDto, NumberDetailRequestDto } from './types';

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

export const numberDetailQueryKey = ['lotto', 'detail'] as const;

export const numberDetailQueryOptions = (params: NumberDetailRequestDto) =>
  queryOptions({
    queryKey: [...numberDetailQueryKey, params],
    queryFn: () =>
      apiFetch<NumberDetailDto>('/number-detail', {
        method: 'POST',
        body: JSON.stringify(params),
      }),
  });
