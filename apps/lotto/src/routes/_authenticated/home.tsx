import { createFileRoute } from '@tanstack/react-router';

import {
  GenericLottoCard,
  getLotteryConfig,
  isLotteryConfigured,
  LotterySelectorCard,
  useLottoStore,
} from '@/domains/lotto';
import { PageLayout } from '@/layouts/PageLayout';

export const Route = createFileRoute('/_authenticated/home')({
  component: HomePage,
});

function HomePage() {
  const lottoType = useLottoStore((state) => state.searchParams.lottoType);

  const renderLottoCard = () => {
    if (!lottoType) {
      return null;
    }

    if (!isLotteryConfigured(lottoType)) {
      return (
        <div className="col-span-12">
          <h6 className="py-8 text-center text-title-small">{lottoType} analysis coming soon...</h6>
        </div>
      );
    }

    const config = getLotteryConfig(lottoType);
    return <GenericLottoCard config={config} />;
  };

  return (
    <PageLayout>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <LotterySelectorCard />
        </div>
        <div className="col-span-12" key={lottoType}>
          {renderLottoCard()}
        </div>
      </div>
    </PageLayout>
  );
}
