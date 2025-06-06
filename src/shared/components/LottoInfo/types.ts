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

export const LottoDescription: Record<LottoType, string> = {
  VIKINGLOTTO:
    'There are 48 primary numbers in total, from which the user must choose 6. In addition, there are 5 secondary numbers, and the user must select 1. The position of the chosen numbers does not matter.',
  EURO: 'There are 50 primary numbers in total, from which the user must choose 5. In addition, there are 12 secondary numbers, and the user must select 2. The position of the chosen numbers does not matter.',
  KENO: 'There are 68 primary numbers in total, from which the user can choose 1-10. There are no secondary numbers. The position of the chosen numbers does not matter.',
  JOKKER:
    'Users must select 7 numbers from the range 0–9, and the sequence in which the numbers are chosen must be correct.',
  BINGO:
    'There are 75 numbers in total, from which the user must choose 25. The game offers five modes: Center Square, Corners, Diagonals, Full Card, and One-Missing.',
};
