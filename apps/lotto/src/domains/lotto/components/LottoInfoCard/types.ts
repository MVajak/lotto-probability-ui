import type { LottoType } from '../../types';

export interface LottoInfoProps {
  lottoType: LottoType;
  linkBuyTickets: string;
  linkGameRules: string;
}

export const LottoName: Record<LottoType, string> = {
  // European lotteries (Estonian)
  EURO: 'Eurojackpot',
  VIKINGLOTTO: 'Vikinglotto',
  BINGO: 'Bingo lotto',
  KENO: 'Keno',
  JOKKER: 'Jokker',
  // US lotteries
  POWERBALL: 'Powerball',
  MEGA_MILLIONS: 'Mega Millions',
  CASH4LIFE: 'Cash4Life',
  // UK lotteries
  UK_EUROMILLIONS: 'EuroMillions',
  UK_LOTTO: 'Lotto',
  UK_THUNDERBALL: 'Thunderball',
  UK_SET_FOR_LIFE: 'Set For Life',
};
