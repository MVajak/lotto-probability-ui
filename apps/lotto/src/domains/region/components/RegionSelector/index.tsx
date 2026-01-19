import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  useLocalStorage,
} from '@lotto/ui';

import { useLottoStore } from '@/domains/lotto';
import { Region, RegionStorageKey } from '@/domains/region';

import FlagAustralia from '../../assets/flag_australia.png';
import FlagCanada from '../../assets/flag_canada.png';
import FlagEstonia from '../../assets/flag_estonia.svg';
import FlagFrance from '../../assets/flag_france.svg';
import FlagGermany from '../../assets/flag_germany.svg';
import FlagIreland from '../../assets/flag_ireland.svg';
import FlagSouthAfrica from '../../assets/flag_south_africa.png';
import FlagSpain from '../../assets/flag_spain.svg';
import FlagUK from '../../assets/flag_united_kingdom.svg';
import FlagUSA from '../../assets/flag_usa.svg';

const FLAGS: Record<Region, string> = {
  [Region.EE]: FlagEstonia,
  [Region.UK]: FlagUK,
  [Region.US]: FlagUSA,
  [Region.ES]: FlagSpain,
  [Region.IE]: FlagIreland,
  [Region.DE]: FlagGermany,
  [Region.FR]: FlagFrance,
  [Region.CA]: FlagCanada,
  [Region.AU]: FlagAustralia,
  [Region.ZA]: FlagSouthAfrica,
};

const REGIONS = [
  Region.EE,
  Region.UK,
  Region.US,
  Region.ES,
  Region.IE,
  Region.DE,
  Region.FR,
  Region.CA,
  Region.AU,
  Region.ZA,
] as const;

const getInitialRegion = (): Region => {
  const storedRegion = localStorage.getItem(RegionStorageKey.REGION);
  if (storedRegion) {
    return storedRegion as Region;
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (timezone.includes('Europe/Tallinn')) {
    return Region.EE;
  } else if (timezone.includes('Europe/London') || timezone.includes('Europe/Edinburgh')) {
    return Region.UK;
  } else if (timezone.includes('Europe/Madrid') || timezone.includes('Atlantic/Canary')) {
    return Region.ES;
  } else if (timezone.includes('Europe/Berlin')) {
    return Region.DE;
  } else if (timezone.includes('Europe/Dublin')) {
    return Region.IE;
  } else if (timezone.includes('Europe/Paris')) {
    return Region.FR;
  } else if (timezone.includes('Africa/Johannesburg')) {
    return Region.ZA;
  } else if (timezone.includes('America/')) {
    return Region.US;
  }

  return Region.US;
};

export function RegionSelector() {
  const { t } = useTranslation();
  const [region, setRegion] = useLocalStorage<Region>(RegionStorageKey.REGION, getInitialRegion());
  const setLottoType = useLottoStore((state) => state.setLottoType);

  const handleRegionChange = (newRegion: Region) => {
    if (newRegion !== region) {
      setLottoType(null); // Clear lottery selection when region changes
    }
    setRegion(newRegion);
  };

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <motion.button
              type="button"
              className="flex size-10 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={FLAGS[region]} alt={t(`region.${region}`)} className="size-5 rounded-sm object-cover" />
            </motion.button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>{t('userMenu.region')}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end">
        {REGIONS.map((r) => (
          <DropdownMenuItem key={r} onClick={() => handleRegionChange(r)} className={region === r ? 'bg-muted' : ''}>
            <img src={FLAGS[r]} alt={t(`region.${r}`)} className="size-5 rounded-sm object-cover" />
            <span className="ml-2">{t(`region.${r}`)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
