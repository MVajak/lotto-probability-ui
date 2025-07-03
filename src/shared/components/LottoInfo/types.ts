import { LottoType } from '../../types';

export interface LottoInfoProps {
  lottoType: LottoType;
  linkBuyTickets: string;
  linkGameRules: string;
}

export const LottoName: Record<LottoType, string> = {
  VIKINGLOTTO: 'Vikinglotto',
  EURO: 'Eurojackpot',
  KENO: 'Keno',
  JOKKER: 'Jokker',
  BINGO: 'Bingo lotto',
};
