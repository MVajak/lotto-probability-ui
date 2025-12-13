import { useEffect, useMemo } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useLocalStorage } from '@lotto/ui';

import { REGION_LOTTERY_TYPES, Region, RegionStorageKey } from '@/domains/region';

import { useLottoStore } from '../../../store';
import type { LottoType } from '../../../types';

// Lottery type display names mapping
const LOTTERY_NAMES: Record<LottoType, string> = {
  // European lotteries (Estonian)
  EURO: 'Eurojackpot',
  VIKINGLOTTO: 'Viking Lotto',
  BINGO: 'Bingo Lotto',
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

/**
 * Dropdown selector for choosing a lottery type.
 * Reads and writes directly to the lotto store.
 * Automatically syncs with region changes.
 */
export const LotteryTypeSelector = () => {
  const [region] = useLocalStorage<Region>(RegionStorageKey.REGION, Region.EE);
  const lottoType = useLottoStore((state) => state.searchParams.lottoType);
  const setLottoType = useLottoStore((state) => state.setLottoType);

  const availableLotteries = useMemo(() => {
    return REGION_LOTTERY_TYPES[region] || REGION_LOTTERY_TYPES[Region.EE];
  }, [region]);

  // When region changes or on mount, ensure a valid lottery is selected
  useEffect(() => {
    const lotteries = REGION_LOTTERY_TYPES[region] || REGION_LOTTERY_TYPES[Region.EE];
    if (!lottoType || !lotteries.includes(lottoType)) {
      setLottoType(lotteries[0]);
    }
  }, [region, lottoType, setLottoType]);

  const handleChange = (value: string) => {
    setLottoType(value as LottoType);
  };

  // Only show the selected lottery if it's in the available list, otherwise show the first available
  const displayValue = lottoType && availableLotteries.includes(lottoType) ? lottoType : availableLotteries[0];

  return (
    <Select value={displayValue} onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {availableLotteries.map((type) => (
          <SelectItem key={type} value={type}>
            {LOTTERY_NAMES[type]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
