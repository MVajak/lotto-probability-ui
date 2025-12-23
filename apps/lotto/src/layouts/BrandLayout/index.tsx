import type React from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '@lotto/ui';

import { useTheme } from '@/domains/theme';

import { LotteryBalls } from './LotteryBalls';
import { StatisticalCurve } from './StatisticalCurve';

interface BrandLayoutProps {
  children: React.ReactNode;
  maxWidth?: string;
}

export const BrandLayout: React.FC<BrandLayoutProps> = ({ children, maxWidth = '400px' }) => {
  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();

  const backgroundImage =
    resolvedTheme === 'dark' ? 'url(/img/lottery_login_clean_light.png)' : 'url(/img/lottery_login_clean.png)';

  return (
    <div
      className="relative flex h-screen justify-center overflow-hidden bg-center bg-cover bg-no-repeat md:justify-end"
      style={{ backgroundImage }}
    >
      {/* Decorative elements - hidden on mobile */}
      <div className="hidden md:block">
        {/* Title and description - top left */}
        <div className="absolute top-[8%] left-[5%]">
          <h3 className="mb-2 text-light text-title-default-bold lg:text-display-small-bold">
            {t('authLayout.title')}
          </h3>
          <h6 className="text-primary-foreground/70 text-title-small">{t('authLayout.subtitle')}</h6>
        </div>

        {/* Lottery balls positioned in upper-left area */}
        <div className="absolute top-[25%] left-[5%] w-[60%] max-w-[1200px]">
          <LotteryBalls width={1100} height={400} className="lottery-balls-svg" />
        </div>

        {/* Statistical curve positioned at bottom */}
        <div className="absolute bottom-[15%] left-[5%] w-[60%] max-w-[1200px]">
          <StatisticalCurve width={1100} height={150} startX={0} baseY={75} className="curve-svg" />
        </div>

        {/* Bottom labels */}
        <div className="absolute bottom-[8%] left-[5%]">
          <p className="text-body-small text-light/60 lg:text-body-large">{t('authLayout.features')}</p>
        </div>
      </div>

      <Card
        className="relative z-10 m-[18px] flex w-full flex-col justify-center"
        style={{ maxWidth: `min(100%, ${maxWidth})` }}
      >
        {children}
      </Card>
    </div>
  );
};
