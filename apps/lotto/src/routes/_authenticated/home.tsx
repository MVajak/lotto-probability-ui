import { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { Card, CardContent, useLocalStorage } from '@lotto/ui';

import { LottoType } from '@/domains/lotto';
import { BingoLottoCard } from '@/domains/lotto/components/cards/BingoLottoCard';
import { EuroJackpotLottoCard } from '@/domains/lotto/components/cards/EuroJackpotLottoCard';
import { JokkerLottoCard } from '@/domains/lotto/components/cards/JokkerLottoCard';
import { KenoLottoCard } from '@/domains/lotto/components/cards/KenoLottoCard';
import { PageLayout } from '@/domains/lotto/components/cards/PageLayout';
import { VikingLottoCard } from '@/domains/lotto/components/cards/VikingLottoCard';
import { REGION_LOTTERY_TYPES, Region, RegionStorageKey } from '@/domains/region';

import { LotterySelector } from '../../components/LotterySelector';

export const Route = createFileRoute('/_authenticated/home')({
  component: HomePage,
});

function HomePage() {
  const [region] = useLocalStorage<Region>(RegionStorageKey.REGION, Region.EE);
  const [selectedLottery, setSelectedLottery] = useState<LottoType>(() => {
    const availableLotteries = REGION_LOTTERY_TYPES[region] || REGION_LOTTERY_TYPES[Region.EE];
    return availableLotteries[0] || LottoType.EURO;
  });

  useEffect(() => {
    const availableLotteries = REGION_LOTTERY_TYPES[region] || REGION_LOTTERY_TYPES[Region.EE];
    if (!availableLotteries.includes(selectedLottery)) {
      setSelectedLottery(availableLotteries[0] || LottoType.EURO);
    }
  }, [region, selectedLottery]);

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
          <div className="col-span-12">
            <h6 className="py-8 text-center text-title-small">{selectedLottery} analysis coming soon...</h6>
          </div>
        );

      default:
        return <EuroJackpotLottoCard />;
    }
  };

  return (
    <PageLayout>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <Card className="shadow-md">
            <CardContent>
              <LotterySelector selectedLottery={selectedLottery} onLotteryChange={setSelectedLottery} />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-12" key={selectedLottery}>
          {renderLottoCard()}
        </div>
      </div>
    </PageLayout>
  );
}
