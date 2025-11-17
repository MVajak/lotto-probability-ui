import { Grid } from '@mui/material';
import React, { useState } from 'react';

import { LottoPage } from '../LottoPage';
import { BingoLottoCard } from '../LottoPage/BingoLottoCard';
import { EuroJackpotLottoCard } from '../LottoPage/EuroJackpotLottoCard';
import { JokkerLottoCard } from '../LottoPage/JokkerLottoCard';
import { KenoLottoCard } from '../LottoPage/KenoLottoCard';
import { VikingLottoCard } from '../LottoPage/VikingLottoCard';
import { LotteryTypeSelector } from '../shared/components/LotteryTypeSelector';
import { LottoType } from '../shared/types';

export const HomePage: React.FC = () => {
  const [selectedLottery, setSelectedLottery] = useState<LottoType>(LottoType.EURO);

  const renderLottoCard = () => {
    switch (selectedLottery) {
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
      default:
        return <EuroJackpotLottoCard />;
    }
  };

  return (
    <LottoPage>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <LotteryTypeSelector
            selectedLottery={selectedLottery}
            onLotteryChange={setSelectedLottery}
          />
        </Grid>
        {renderLottoCard()}
      </Grid>
    </LottoPage>
  );
};
