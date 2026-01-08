import dayjs from 'dayjs';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { LottoStorageKey, type LottoType } from './types';

interface LottoSearchParams {
  lottoType: LottoType | null;
  dateFrom: string;
  dateTo: string;
}

interface LottoStore {
  searchParams: LottoSearchParams;
  setSearchParams: (params: LottoSearchParams) => void;
  setLottoType: (lottoType: LottoType | null) => void;
  resetSearchParams: () => void;
}

const getInitialSearchParams = (lottoType: LottoType | null = null): LottoSearchParams => ({
  lottoType,
  dateFrom: dayjs().subtract(1, 'month').toISOString(),
  dateTo: dayjs().toISOString(),
});

export const useLottoStore = create<LottoStore>()(
  persist(
    (set) => ({
      searchParams: getInitialSearchParams(),
      setSearchParams: (params) => set({ searchParams: params }),
      setLottoType: (lottoType) =>
        set(() => ({
          searchParams: getInitialSearchParams(lottoType),
        })),
      resetSearchParams: () => set({ searchParams: getInitialSearchParams() }),
    }),
    {
      name: LottoStorageKey.SELECTED_LOTTERY,
      // Only persist lottoType, not dates (dates should be fresh each session)
      partialize: (state) => ({ lottoType: state.searchParams.lottoType }),
      merge: (persisted, current) => {
        const saved = persisted as { lottoType?: LottoType | null } | undefined;
        return {
          ...current,
          searchParams: getInitialSearchParams(saved?.lottoType ?? null),
        };
      },
    }
  )
);
