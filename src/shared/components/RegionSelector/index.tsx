import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

import FlagEstonia from '../../assets/flags/flag_estonia.svg';
import FlagUK from '../../assets/flags/flag_united_kingdom.svg';
import FlagUSA from '../../assets/flags/flag_usa.svg';
import { LocalStorageKey, Region } from '../../constants';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface RegionSelectorProps {
  size?: 'small' | 'medium';
}

const getInitialRegion = (): Region => {
  // Check if region is already stored
  const storedRegion = localStorage.getItem(LocalStorageKey.REGION);
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

export const RegionSelector: React.FC<RegionSelectorProps> = ({ size = 'small' }) => {
  const [region, setRegion] = useLocalStorage<Region>(LocalStorageKey.REGION, getInitialRegion());

  const handleRegionChange = (event: SelectChangeEvent) => {
    const changedRegion: Region = event.target.value as Region;
    setRegion(changedRegion);
  };

  return (
    <FormControl size={size}>
      <Select labelId="select-region-label" id="select-region" value={region} onChange={handleRegionChange}>
        <MenuItem value={Region.EE}>
          <img src={FlagEstonia} alt="Estonia" width={25} height={15} />
        </MenuItem>
        <MenuItem value={Region.UK}>
          <img src={FlagUK} alt="United Kingdom" width={25} height={15} />
        </MenuItem>
        <MenuItem value={Region.US}>
          <img src={FlagUSA} alt="United States" width={25} height={15} />
        </MenuItem>
      </Select>
    </FormControl>
  );
};
