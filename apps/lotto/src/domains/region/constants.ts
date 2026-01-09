import { LottoType } from '@/domains/lotto/types';

import { Region } from './types';

// Map regions to their available lottery types
export const REGION_LOTTERY_TYPES: Record<Region, LottoType[]> = {
  [Region.EE]: [
    LottoType.EUROJACKPOT,
    LottoType.VIKINGLOTTO,
    LottoType.EST_BINGO,
    LottoType.EST_KENO,
    LottoType.EST_JOKKER,
  ],
  [Region.UK]: [
    LottoType.UK_LOTTO,
    LottoType.EUROMILLIONS,
    LottoType.UK_THUNDERBALL,
    LottoType.UK_SET_FOR_LIFE,
    LottoType.UK_HOT_PICKS,
  ],
  [Region.US]: [LottoType.US_POWERBALL, LottoType.US_MEGA_MILLIONS, LottoType.US_CASH4LIFE],
  [Region.ES]: [LottoType.EUROMILLIONS, LottoType.ES_LA_PRIMITIVA, LottoType.ES_BONOLOTO, LottoType.ES_EL_GORDO],
};
