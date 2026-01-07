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

import { Region, RegionStorageKey } from '@/domains/region';

import FlagEstonia from '../../assets/flag_estonia.svg';
import FlagUK from '../../assets/flag_united_kingdom.svg';
import FlagUSA from '../../assets/flag_usa.svg';

const FLAGS: Record<Region, { src: string; alt: string }> = {
  [Region.EE]: { src: FlagEstonia, alt: 'Estonia' },
  [Region.UK]: { src: FlagUK, alt: 'United Kingdom' },
  [Region.US]: { src: FlagUSA, alt: 'United States' },
};

const REGIONS = [Region.EE, Region.UK, Region.US] as const;

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
  } else if (timezone.includes('America/')) {
    return Region.US;
  }

  return Region.US;
};

export function RegionSelector() {
  const { t } = useTranslation();
  const [region, setRegion] = useLocalStorage<Region>(RegionStorageKey.REGION, getInitialRegion());

  const currentFlag = FLAGS[region];

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
              <img src={currentFlag.src} alt={currentFlag.alt} className="size-5 rounded-sm object-cover" />
            </motion.button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>{t('userMenu.region')}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end">
        {REGIONS.map((r) => (
          <DropdownMenuItem key={r} onClick={() => setRegion(r)} className={region === r ? 'bg-muted' : ''}>
            <img src={FLAGS[r].src} alt={FLAGS[r].alt} className="size-5 rounded-sm object-cover" />
            <span className="ml-2">{FLAGS[r].alt}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
