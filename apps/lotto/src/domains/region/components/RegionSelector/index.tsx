import type React from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, useLocalStorage } from '@lotto/ui';

import { Region, RegionStorageKey } from '@/domains/region';

import FlagEstonia from '../../assets/flag_estonia.svg';
import FlagUK from '../../assets/flag_united_kingdom.svg';
import FlagUSA from '../../assets/flag_usa.svg';

const FLAGS: Record<Region, string> = {
  [Region.EE]: FlagEstonia,
  [Region.UK]: FlagUK,
  [Region.US]: FlagUSA,
};

const getInitialRegion = (): Region => {
  // Check if region is already stored
  const storedRegion = localStorage.getItem(RegionStorageKey.REGION);
  if (storedRegion) {
    return storedRegion as Region;
  }

  // Try to detect region from timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (timezone.includes('Europe/Tallinn')) {
    return Region.EE;
  } else if (timezone.includes('Europe/London') || timezone.includes('Europe/Edinburgh')) {
    return Region.UK;
  } else if (timezone.includes('America/')) {
    return Region.US;
  }

  // Default to US if region cannot be determined
  return Region.US;
};

export const RegionSelector: React.FC = () => {
  const [region, setRegion] = useLocalStorage<Region>(RegionStorageKey.REGION, getInitialRegion());

  const handleRegionChange = (value: string) => {
    const changedRegion: Region = value as Region;
    setRegion(changedRegion);
  };

  return (
    <Select value={region} onValueChange={handleRegionChange}>
      <SelectTrigger className="w-20">
        <img src={FLAGS[region]} alt={region} width={25} height={15} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={Region.EE}>
          <img src={FlagEstonia} alt="Estonia" width={25} height={15} />
        </SelectItem>
        <SelectItem value={Region.UK}>
          <img src={FlagUK} alt="United Kingdom" width={25} height={15} />
        </SelectItem>
        <SelectItem value={Region.US}>
          <img src={FlagUSA} alt="United States" width={25} height={15} />
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
