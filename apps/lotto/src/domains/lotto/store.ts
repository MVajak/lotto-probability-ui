import dayjs from 'dayjs';
import { create } from 'zustand';

import type { LottoType } from './types';

interface LottoSearchParams {
  lottoType: LottoType | null;
  dateFrom: string;
  dateTo: string;
}

interface LottoStore {
  searchParams: LottoSearchParams;
  setSearchParams: (params: LottoSearchParams) => void;
  resetSearchParams: () => void;
}

const initialSearchParams: LottoSearchParams = {
  lottoType: null,
  dateFrom: dayjs().subtract(1, 'month').toISOString(),
  dateTo: dayjs().toISOString(),
};

export const useLottoStore = create<LottoStore>((set) => ({
  searchParams: initialSearchParams,
  setSearchParams: (params) => set({ searchParams: params }),
  resetSearchParams: () => set({ searchParams: initialSearchParams }),
}));
