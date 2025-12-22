import type React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, cn } from '@lotto/ui';

import { type AnalysisFeature, FEATURE_CONFIG } from '@/domains/subscription';

/** Features that require minimum draws for statistical validity */
type PremiumAnalysisFeature = Extract<
  AnalysisFeature,
  'MARKOV_CHAIN' | 'AUTOCORRELATION' | 'PAIR_ANALYSIS' | 'MONTE_CARLO' | 'SEASONAL_PATTERNS'
>;

/** Map of premium features to their data availability status */
export type PremiumFeatureAvailability = Partial<Record<PremiumAnalysisFeature, boolean>>;

interface InsufficientDataWarningCardProps {
  /** Simple mode - just show title and message */
  titleKey?: string;
  messageKey?: string;
  /** Premium features mode - show detailed requirements */
  premiumFeatures?: PremiumFeatureAvailability;
}

export const InsufficientDataWarningCard: React.FC<InsufficientDataWarningCardProps> = ({
  titleKey,
  messageKey,
  premiumFeatures,
}) => {
  const { t } = useTranslation();

  // Simple mode - backward compatible
  if (titleKey && messageKey && !premiumFeatures) {
    return (
      <Card className="rounded border border-primary-orange border-dashed bg-base-orange">
        <CardContent>
          <p className="mb-1 text-body-default-bold text-muted-foreground">{t(titleKey)}</p>
          <p className="text-body-small text-muted-foreground">{t(messageKey)}</p>
        </CardContent>
      </Card>
    );
  }

  // Premium features mode - detailed requirements
  if (!premiumFeatures) return null;

  const unavailableFeatures = (Object.keys(premiumFeatures) as PremiumAnalysisFeature[]).filter(
    (key) => !premiumFeatures[key]
  );

  if (unavailableFeatures.length === 0) return null;

  return (
    <Card className="rounded border border-primary-orange border-dashed bg-base-orange">
      <CardContent className="flex flex-col gap-4 py-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-orange/10">
            <ExclamationTriangleIcon className="size-5 text-primary-orange" />
          </div>
          <div>
            <h4 className="text-title-small-bold">{t('numberStats.insufficientData.premiumFeaturesTitle')}</h4>
            <p className="text-body-small text-muted-foreground">
              {t('numberStats.insufficientData.premiumFeaturesDescription')}
            </p>
          </div>
        </div>

        {/* Feature requirements list */}
        <div className="grid gap-2 sm:grid-cols-2">
          {unavailableFeatures.map((feature) => (
            <div
              key={feature}
              className={cn(
                'flex items-center gap-2 rounded-md bg-background/50 px-3 py-2',
                'border border-primary-orange/20'
              )}
            >
              <div className="size-2 shrink-0 rounded-full bg-primary-orange" />
              <div className="flex flex-col">
                <span className="text-body-small-bold">{t(`subscription.features.${feature}`)}</span>
                <span className="text-label-small text-muted-foreground">
                  {t('numberStats.insufficientData.requiresDraws', { count: FEATURE_CONFIG[feature].minDraws })}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Help text */}
        <p className="text-body-small text-muted-foreground">
          {t('numberStats.insufficientData.expandDateRange')}
        </p>
      </CardContent>
    </Card>
  );
};
