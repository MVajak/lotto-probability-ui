export interface NumberStat {
  position: number | null;
  digit: number;
  count: number;
  frequency: number;
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
  EURO = 'EURO',
  VIKINGLOTTO = 'VIKINGLOTTO',
  BINGO = 'BINGO',
  KENO = 'KENO',
  JOKKER = 'JOKKER',
}

export type PageName = 'Home' | 'Login' | 'Verify' | 'Profile' | 'Subscription';

export const pageRoutes: Record<PageName, string> = {
  Home: '/home',
  Login: '/login',
  Verify: '/verify',
  Profile: '/profile',
  Subscription: '/subscription',
};
