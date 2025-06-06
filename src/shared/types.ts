export interface NumberStat {
  position: number | null;
  digit: number;
  count: number;
  probability: number;
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

export type PageName = 'Eurojackpot' | 'VikingLotto' | 'Bingo' | 'Keno' | 'Jokker';

export const pageRoutes: Record<PageName, string> = {
  Eurojackpot: '/eurojackpot',
  VikingLotto: '/viking',
  Bingo: '/bingo',
  Keno: '/keno',
  Jokker: '/jokker',
};
