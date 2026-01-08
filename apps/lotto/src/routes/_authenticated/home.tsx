import { useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'motion/react';

import { Separator } from '@lotto/ui';

import { HeroSection, LotteryGrid } from '@/domains/home';
import { GenericLottoCard, getLotteryConfig, isLotteryConfigured, useLottoStore } from '@/domains/lotto';
import { PageLayout } from '@/layouts/PageLayout';

export const Route = createFileRoute('/_authenticated/home')({
  component: HomePage,
});

function HomePage() {
  const lottoType = useLottoStore((state) => state.searchParams.lottoType);
  const setLottoType = useLottoStore((state) => state.setLottoType);
  const analysisRef = useRef<HTMLDivElement>(null);

  const handleSelectLottery = (selectedType: typeof lottoType) => {
    setLottoType(selectedType);

    // Scroll to analysis section after a brief delay for animation
    setTimeout(() => {
      analysisRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const renderAnalysisSection = () => {
    if (!lottoType) {
      return null;
    }

    if (!isLotteryConfigured(lottoType)) {
      return (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="py-8 text-center"
        >
          <h6 className="text-muted-foreground text-title-small">{lottoType} analysis coming soon...</h6>
        </motion.div>
      );
    }

    const config = getLotteryConfig(lottoType);
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <GenericLottoCard config={config} />
      </motion.div>
    );
  };

  return (
    <PageLayout>
      <div className="flex flex-col gap-6">
        {/* Hero Section */}
        <HeroSection />

        <Separator />

        {/* Lottery Selection Grid */}
        <LotteryGrid selectedLottery={lottoType} onSelectLottery={handleSelectLottery} />

        {/* Analysis Section - slides in when lottery selected */}
        <AnimatePresence mode="wait">
          {lottoType && (
            <motion.div
              ref={analysisRef}
              key={lottoType}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4"
            >
              <Separator className="my-2" />
              {renderAnalysisSection()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  );
}
