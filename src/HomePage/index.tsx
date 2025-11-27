import { Grid, Typography } from '@mui/material';
import type React from 'react';
import { useEffect, useState } from 'react';

import { LottoPage } from '../LottoPage';
import { BingoLottoCard } from '../LottoPage/BingoLottoCard';
import { EuroJackpotLottoCard } from '../LottoPage/EuroJackpotLottoCard';
import { JokkerLottoCard } from '../LottoPage/JokkerLottoCard';
import { KenoLottoCard } from '../LottoPage/KenoLottoCard';
import { VikingLottoCard } from '../LottoPage/VikingLottoCard';
import { CardWrapper } from '../shared/components/CardWrapper';
import { LocalStorageKey, REGION_LOTTERY_TYPES, Region } from '../shared/constants';
import { useLocalStorage } from '../shared/hooks/useLocalStorage';
import { LottoType } from '../shared/types';
import { LotterySelector } from './components/LotterySelector';

export const HomePage: React.FC = () => {
  const [region] = useLocalStorage<Region>(LocalStorageKey.REGION, Region.EE);
  const [selectedLottery, setSelectedLottery] = useState<LottoType>(() => {
    // Get the first available lottery for the current region
    const availableLotteries = REGION_LOTTERY_TYPES[region] || REGION_LOTTERY_TYPES[Region.EE];
    return availableLotteries[0] || LottoType.EURO;
  });

  // Update selected lottery when region changes
  useEffect(() => {
    const availableLotteries = REGION_LOTTERY_TYPES[region] || REGION_LOTTERY_TYPES[Region.EE];
    if (!availableLotteries.includes(selectedLottery)) {
      setSelectedLottery(availableLotteries[0] || LottoType.EURO);
    }
  }, [region, selectedLottery]);

  const renderLottoCard = () => {
    switch (selectedLottery) {
      // Estonia lotteries
      case LottoType.EURO:
        return <EuroJackpotLottoCard />;
      case LottoType.VIKINGLOTTO:
        return <VikingLottoCard />;
      case LottoType.BINGO:
        return <BingoLottoCard />;
      case LottoType.KENO:
        return <KenoLottoCard />;
      case LottoType.JOKKER:
        return <JokkerLottoCard />;

      // UK and US lotteries - placeholder
      case LottoType.UK_LOTTO:
      case LottoType.UK_EUROMILLIONS:
      case LottoType.UK_THUNDERBALL:
      case LottoType.UK_SET_FOR_LIFE:
      case LottoType.US_POWERBALL:
      case LottoType.US_MEGA_MILLIONS:
      case LottoType.US_LOTTO_AMERICA:
      case LottoType.US_LUCKY_FOR_LIFE:
      case LottoType.US_CASH4LIFE:
        return (
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" align="center" sx={{ py: 4 }}>
              {selectedLottery} analysis coming soon...
            </Typography>
          </Grid>
        );

      default:
        return <EuroJackpotLottoCard />;
    }
  };

  return (
    <LottoPage>
      <Grid>
        <Grid size={{ xs: 12 }}>
          <CardWrapper>
            <LotterySelector selectedLottery={selectedLottery} onLotteryChange={setSelectedLottery} />
          </CardWrapper>
        </Grid>
        <Grid size={{ xs: 12 }} key={selectedLottery}>
          {renderLottoCard()}
        </Grid>
      </Grid>
    </LottoPage>
  );
};
