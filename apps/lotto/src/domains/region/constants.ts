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
    LottoType.UK_49S_LUNCHTIME,
    LottoType.UK_49S_TEATIME,
  ],
  [Region.US]: [
    LottoType.US_POWERBALL,
    LottoType.US_MEGA_MILLIONS,
    LottoType.US_CASH4LIFE,
    LottoType.US_LOTTO_AMERICA,
    LottoType.US_LUCKY_FOR_LIFE,
    LottoType.US_CA_SUPERLOTTO,
    LottoType.US_NY_LOTTO,
    LottoType.US_TX_LOTTO,
  ],
  [Region.ES]: [
    LottoType.EUROMILLIONS,
    LottoType.EURODREAMS,
    LottoType.ES_LA_PRIMITIVA,
    LottoType.ES_BONOLOTO,
    LottoType.ES_EL_GORDO,
  ],
  [Region.IE]: [
    LottoType.EUROMILLIONS,
    LottoType.EURODREAMS,
    LottoType.IE_LOTTO,
    LottoType.IE_LOTTO_PLUS_1,
    LottoType.IE_LOTTO_PLUS_2,
    LottoType.IE_DAILY_MILLION,
    LottoType.IE_DAILY_MILLION_PLUS,
  ],
  [Region.DE]: [
    LottoType.EUROJACKPOT,
    LottoType.DE_LOTTO_6AUS49,
    LottoType.DE_KENO,
    LottoType.DE_SPIEL77,
    LottoType.DE_SUPER6,
  ],
  [Region.FR]: [
    LottoType.EUROMILLIONS,
    LottoType.EURODREAMS,
    LottoType.FR_LOTO,
    LottoType.FR_JOKER,
    LottoType.FR_KENO,
  ],
  [Region.CA]: [
    LottoType.CA_LOTTO_MAX,
    LottoType.CA_LOTTO_649,
    LottoType.CA_DAILY_GRAND,
    LottoType.CA_LOTTARIO,
    LottoType.CA_BC_49,
    LottoType.CA_QUEBEC_49,
    LottoType.CA_ATLANTIC_49,
  ],
  [Region.AU]: [
    LottoType.AU_POWERBALL,
    LottoType.AU_SATURDAY_LOTTO,
    LottoType.AU_OZ_LOTTO,
    LottoType.AU_SET_FOR_LIFE,
    LottoType.AU_WEEKDAY_WINDFALL,
    LottoType.AU_CASH_3,
    LottoType.AU_SUPER_66,
    LottoType.AU_LOTTO_STRIKE,
  ],
};
