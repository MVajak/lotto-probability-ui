import type React from 'react';
import { InformationCircleIcon, LightBulbIcon } from '@heroicons/react/24/outline';
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
  /** Current number of draws available */
  totalDraws?: number;
  /** Premium features mode - show detailed requirements */
  premiumFeatures?: PremiumFeatureAvailability;
}

export const InsufficientDataWarningCard: React.FC<InsufficientDataWarningCardProps> = ({
  titleKey,
  messageKey,
  totalDraws = 0,
  premiumFeatures,
}) => {
  const { t } = useTranslation();

  // Simple mode - just a basic info message
  if (titleKey && messageKey && !premiumFeatures) {
    return (
      <Card className="rounded border border-primary-blue/30 bg-base-blue/50">
        <CardContent className="flex items-start gap-3 py-4">
          <InformationCircleIcon className="mt-0.5 size-5 shrink-0 text-primary-blue" />
          <div>
            <p className="text-body-default-bold text-foreground">{t(titleKey)}</p>
            <p className="text-body-small text-muted-foreground">{t(messageKey)}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Premium features mode - detailed requirements with progress
  if (!premiumFeatures) return null;

  const unavailableFeatures = (Object.keys(premiumFeatures) as PremiumAnalysisFeature[]).filter(
    (key) => !premiumFeatures[key]
  );

  if (unavailableFeatures.length === 0) return null;

  // Find the minimum draws needed for the next feature to unlock
  const drawsNeededForNext = Math.min(...unavailableFeatures.map((f) => FEATURE_CONFIG[f].minDraws));

  // Find the maximum draws needed to unlock everything
  const drawsNeededForAll = Math.max(...unavailableFeatures.map((f) => FEATURE_CONFIG[f].minDraws));

  const progressPercent = Math.min(100, (totalDraws / drawsNeededForAll) * 100);

  return (
    <Card className="rounded border border-primary-blue/30 bg-base-blue/30">
      <CardContent className="flex flex-col gap-4 py-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-blue/10">
            <InformationCircleIcon className="size-5 text-primary-blue" />
          </div>
          <div className="flex-1">
            <h4 className="text-body-default-bold">{t('numberStats.insufficientData.premiumFeaturesTitle')}</h4>
            <p className="text-body-small text-muted-foreground">
              {t('numberStats.insufficientData.premiumFeaturesDescription')}
            </p>
          </div>
        </div>

        {/* Progress indicator */}
        {totalDraws > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-body-small">
              <span className="text-muted-foreground">{t('numberStats.insufficientData.currentDraws')}</span>
              <span className="text-body-small">
                {totalDraws} / {drawsNeededForAll}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-500',
                  progressPercent >= 100 ? 'bg-primary-green' : 'bg-primary-blue'
                )}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {totalDraws < drawsNeededForNext && (
              <p className="text-label-small text-muted-foreground">
                {t('numberStats.insufficientData.needMoreDraws', {
                  count: drawsNeededForNext - totalDraws,
                })}
              </p>
            )}
          </div>
        )}

        {/* Unavailable features - compact pills */}
        <div className="flex flex-wrap gap-2">
          {unavailableFeatures.map((feature) => (
            <div
              key={feature}
              className="inline-flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1 text-body-small"
            >
              <span className="text-muted-foreground">{t(`subscription.features.${feature}`)}</span>
              <span className="font-mono text-label-small text-muted-foreground/70">
                ({FEATURE_CONFIG[feature].minDraws}+)
              </span>
            </div>
          ))}
        </div>

        {/* Tip */}
        <div className="flex items-center gap-2 rounded-md bg-background/50 px-3 py-2">
          <LightBulbIcon className="size-4 shrink-0 text-primary-yellow" />
          <p className="text-body-small text-muted-foreground">{t('numberStats.insufficientData.expandDateRange')}</p>
        </div>
      </CardContent>
    </Card>
  );
};
