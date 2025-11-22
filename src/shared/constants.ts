import { LottoType } from './types';

export enum LocalStorageKey {
  LANGUAGE = 'locale',
  REGION = 'region',
}

export enum Region {
  EE = 'EE',
  UK = 'UK',
  US = 'US',
}

// Map regions to their available lottery types
export const REGION_LOTTERY_TYPES: Record<Region, LottoType[]> = {
  [Region.EE]: [LottoType.EURO, LottoType.VIKINGLOTTO, LottoType.BINGO, LottoType.KENO, LottoType.JOKKER],
  [Region.UK]: [LottoType.UK_LOTTO, LottoType.UK_EUROMILLIONS, LottoType.UK_THUNDERBALL, LottoType.UK_SET_FOR_LIFE],
  [Region.US]: [
    LottoType.US_POWERBALL,
    LottoType.US_MEGA_MILLIONS,
    LottoType.US_LOTTO_AMERICA,
    LottoType.US_LUCKY_FOR_LIFE,
    LottoType.US_CASH4LIFE,
  ],
};

// Category color palette (Gold/Gray/Blue scheme)
export const CATEGORY_COLORS = {
  frequent: {
    // Gold/Amber for high-frequency numbers
    primary: '#f59e0b', // Amber-500
    gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.10) 100%)',
    border: 'rgba(245, 158, 11, 0.5)',
    borderHover: 'rgba(245, 158, 11, 0.8)',
  },
  rare: {
    // Blue for low-frequency numbers
    primary: '#3b82f6', // Blue-500
    gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(37, 99, 235, 0.08) 100%)',
    border: 'rgba(59, 130, 246, 0.5)',
    borderHover: 'rgba(59, 130, 246, 0.8)',
  },
  normal: {
    // Gray for average-frequency numbers
    primary: '#9ca3af', // Gray-400
    gradient: 'linear-gradient(135deg, rgba(229, 231, 235, 0.5) 0%, rgba(209, 213, 219, 0.3) 100%)',
    border: 'rgba(209, 213, 219, 0.6)',
    borderHover: 'rgba(156, 163, 175, 0.5)',
  },
} as const;
