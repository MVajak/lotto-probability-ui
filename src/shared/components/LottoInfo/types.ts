import { LottoType } from '../../types';

export interface LottoInfoProps {
  lottoType: LottoType;
  linkBuyTickets: string;
  linkGameRules: string;
}

export const LottoName: Record<LottoType, string> = {
  // Estonia
  VIKINGLOTTO: 'Vikinglotto',
  EURO: 'Eurojackpot',
  KENO: 'Keno',
  JOKKER: 'Jokker',
  BINGO: 'Bingo lotto',
  // United Kingdom
  UK_LOTTO: 'Lotto',
  UK_EUROMILLIONS: 'EuroMillions',
  UK_THUNDERBALL: 'Thunderball',
  UK_SET_FOR_LIFE: 'Set For Life',
  // United States
  US_POWERBALL: 'Powerball',
  US_MEGA_MILLIONS: 'Mega Millions',
  US_LOTTO_AMERICA: 'Lotto America',
  US_LUCKY_FOR_LIFE: 'Lucky for Life',
  US_CASH4LIFE: 'Cash4Life',
};
