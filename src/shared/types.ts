export interface ConfidenceInterval {
  lower: number;
  upper: number;
  confidenceLevel: number;
}

export interface Deviation {
  absolute: number;
  relative: number;
  isSignificant: boolean;
}

export interface Interpretation {
  status: 'hot' | 'normal' | 'cold';
  percentDifference: number;
  appearedCount: number;
  totalDraws: number;
}

export interface NumberStat {
  position: number | null;
  digit: number;
  count: number;
  totalDraws?: number;
  frequency: number;
  confidenceInterval?: ConfidenceInterval;
  theoreticalProbability?: number;
  deviation?: Deviation;
  interpretation?: Interpretation;
}

export interface WinningNumberStat {
  winningNumberStats: NumberStat[];
  secWinningNumberStats: NumberStat[];
}

export type MostProbableDigitsByPosition = {
  [position: number]: NumberStat[];
};

export enum DateFormat {
  European = 'DD.MM.YYYY',
}

export enum LottoType {
  // Estonia (EE)
  EURO = 'EURO',
  VIKINGLOTTO = 'VIKINGLOTTO',
  BINGO = 'BINGO',
  KENO = 'KENO',
  JOKKER = 'JOKKER',

  // United Kingdom (UK)
  UK_LOTTO = 'UK_LOTTO',
  UK_EUROMILLIONS = 'UK_EUROMILLIONS',
  UK_THUNDERBALL = 'UK_THUNDERBALL',
  UK_SET_FOR_LIFE = 'UK_SET_FOR_LIFE',

  // United States (US)
  US_POWERBALL = 'US_POWERBALL',
  US_MEGA_MILLIONS = 'US_MEGA_MILLIONS',
  US_LOTTO_AMERICA = 'US_LOTTO_AMERICA',
  US_LUCKY_FOR_LIFE = 'US_LUCKY_FOR_LIFE',
  US_CASH4LIFE = 'US_CASH4LIFE',
}

export type PageName = 'Home' | 'Login' | 'Verify' | 'Profile' | 'Subscription';

export const pageRoutes: Record<PageName, string> = {
  Home: '/home',
  Login: '/login',
  Verify: '/verify',
  Profile: '/profile',
  Subscription: '/subscription',
};
