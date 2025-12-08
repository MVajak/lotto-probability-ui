import type React from 'react';
import { useEffect, useMemo } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useLocalStorage } from '@lotto/ui';

import { LottoType } from '@/domains/lotto';
import { REGION_LOTTERY_TYPES, Region, RegionStorageKey } from '@/domains/region';

interface LotteryTypeSelectorProps {
  selectedLottery: LottoType;
  onLotteryChange: (lottery: LottoType) => void;
}

// Lottery type display names mapping
const LOTTERY_NAMES: Record<LottoType, string> = {
  // Estonia
  [LottoType.EURO]: 'Eurojackpot',
  [LottoType.VIKINGLOTTO]: 'Viking Lotto',
  [LottoType.BINGO]: 'Bingo Lotto',
  [LottoType.KENO]: 'Keno',
  [LottoType.JOKKER]: 'Jokker',
  // United Kingdom
  [LottoType.UK_LOTTO]: 'Lotto',
  [LottoType.UK_EUROMILLIONS]: 'EuroMillions',
  [LottoType.UK_THUNDERBALL]: 'Thunderball',
  [LottoType.UK_SET_FOR_LIFE]: 'Set For Life',
  // United States
  [LottoType.US_POWERBALL]: 'Powerball',
  [LottoType.US_MEGA_MILLIONS]: 'Mega Millions',
  [LottoType.US_LOTTO_AMERICA]: 'Lotto America',
  [LottoType.US_LUCKY_FOR_LIFE]: 'Lucky for Life',
  [LottoType.US_CASH4LIFE]: 'Cash4Life',
};

export const LotteryTypeSelector: React.FC<LotteryTypeSelectorProps> = ({ selectedLottery, onLotteryChange }) => {
  const [region] = useLocalStorage<Region>(RegionStorageKey.REGION, Region.EE);

  const availableLotteries = useMemo(() => {
    return REGION_LOTTERY_TYPES[region] || REGION_LOTTERY_TYPES[Region.EE];
  }, [region]);

  // When region changes, if the current lottery is not available, switch to the first available one
  useEffect(() => {
    const lotteries = REGION_LOTTERY_TYPES[region] || REGION_LOTTERY_TYPES[Region.EE];
    if (!lotteries.includes(selectedLottery)) {
      onLotteryChange(lotteries[0]);
    }
  }, [region, onLotteryChange, selectedLottery]);

  const handleChange = (value: string) => {
    const selectedType = value as LottoType;
    onLotteryChange(selectedType);
  };

  // Only show the selected lottery if it's in the available list, otherwise show the first available
  const displayValue = availableLotteries.includes(selectedLottery) ? selectedLottery : availableLotteries[0];

  return (
    <Select value={displayValue} onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {availableLotteries.map((lottoType) => (
          <SelectItem key={lottoType} value={lottoType}>
            {LOTTERY_NAMES[lottoType]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
