import type React from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, Separator } from '@lotto/ui';

import type { NumberDetailDto } from '@/domains/lotto';
import { UpgradePromptCard, useSubscriptionTier } from '@/domains/subscription';

import { InsufficientDataWarningCard, PremiumFeatures, ProFeatures } from './components';

interface NumberInsightsCardProps {
  numberDetail: NumberDetailDto;
}

export const NumberInsightsCard: React.FC<NumberInsightsCardProps> = ({ numberDetail }) => {
  const { t } = useTranslation();
  const { isPremium } = useSubscriptionTier();
  const { summary, trends, timeline } = numberDetail;

  const hasData = summary.appearanceCount > 0;

  return (
    <Card className="h-full">
      <CardContent className="flex flex-col gap-4 p-2">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-md bg-base-green p-2">
            <ChartBarIcon className="size-5 text-primary-green" />
          </div>
          <h3 className="text-title-small-bold">{t('numberStats.historicalTrendsTitle')}</h3>
        </div>

        {hasData ? (
          <>
            <ProFeatures summary={summary} trends={trends} timeline={timeline} />
            <Separator className="my-6" />

            {isPremium ? (
              <PremiumFeatures numberDetail={numberDetail} />
            ) : (
              <UpgradePromptCard requiredTier="PREMIUM" />
            )}
          </>
        ) : (
          <InsufficientDataWarningCard
            titleKey="numberStats.insufficientData.generalTitle"
            messageKey="numberStats.insufficientData.generalMessage"
          />
        )}
      </CardContent>
    </Card>
  );
};
