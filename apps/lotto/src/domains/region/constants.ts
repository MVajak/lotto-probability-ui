import { LottoType } from '@/domains/lotto/types';

import { Region } from './types';

// Map regions to their available lottery types
export const REGION_LOTTERY_TYPES: Record<Region, LottoType[]> = {
  [Region.EE]: [LottoType.EURO, LottoType.VIKINGLOTTO, LottoType.BINGO, LottoType.KENO, LottoType.JOKKER],
  [Region.UK]: [LottoType.UK_LOTTO, LottoType.UK_EUROMILLIONS, LottoType.UK_THUNDERBALL, LottoType.UK_SET_FOR_LIFE, LottoType.UK_HOT_PICKS],
  [Region.US]: [LottoType.POWERBALL, LottoType.MEGA_MILLIONS, LottoType.CASH4LIFE],
  [Region.ES]: [LottoType.UK_EUROMILLIONS, LottoType.ES_LA_PRIMITIVA, LottoType.ES_BONOLOTO, LottoType.ES_EL_GORDO],
};
