import type React from 'react';
import {
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import {
  Banner,
  type BannerVariant,
  Card,
  CardContent,
  cn,
  LottoNumber,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@lotto/ui';

import type { NumberDetailDto } from '@/domains/lotto';

interface PairNumberRowProps {
  number: number;
  coOccurrences: number;
  expectedCoOccurrences: number;
  lift: number;
  isHighlighted: boolean;
  variant: 'companion' | 'avoided';
  maxLift: number;
}

/**
 * Renders a single row in the pair analysis list with number, stats, and progress bar.
 */
const PairNumberRow: React.FC<PairNumberRowProps> = ({
  number,
  coOccurrences,
  expectedCoOccurrences,
  lift,
  isHighlighted,
  variant,
  maxLift,
}) => {
  const { t } = useTranslation();
  const isCompanion = variant === 'companion';
  const colorClass = isCompanion ? 'text-primary-green' : 'text-primary-red';
  const barBgClass = isCompanion ? 'bg-muted' : 'bg-primary-red/30';
  const barFillClass = isCompanion ? (isHighlighted ? 'bg-primary-green' : 'bg-primary-green/50') : 'bg-primary-red';

  // Companions use lift-based width, avoided uses actual/expected ratio
  const barWidth = isCompanion
    ? Math.min((lift / maxLift) * 100, 100)
    : Math.max((coOccurrences / Math.max(expectedCoOccurrences, 0.1)) * 100, 5);

  return (
    <div className="flex items-center gap-3">
      <LottoNumber digit={number} index={`${variant}-${number}`} />
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-body-small text-muted-foreground">
            {t('numberStats.pairAnalysis.coOccurrencesWithExpected', {
              count: coOccurrences,
              expected: expectedCoOccurrences.toFixed(1),
            })}
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className={cn('cursor-help text-body-small-bold', isHighlighted ? colorClass : 'text-muted-foreground')}
              >
                {lift.toFixed(1)}x
              </span>
            </TooltipTrigger>
            <TooltipContent>
              {t('numberStats.pairAnalysis.liftTooltip', {
                actual: coOccurrences,
                expected: expectedCoOccurrences.toFixed(1),
              })}
            </TooltipContent>
          </Tooltip>
        </div>
        <div className={cn('h-1.5 w-full overflow-hidden rounded-full', barBgClass)}>
          <div className={cn('h-full rounded-full transition-all', barFillClass)} style={{ width: `${barWidth}%` }} />
        </div>
      </div>
    </div>
  );
};

interface PairAnalysisCardProps {
  pairAnalysis: NumberDetailDto['pairAnalysis'];
}

/**
 * Displays pair analysis showing which numbers frequently appear together
 * (companions) and which numbers rarely appear together (avoided).
 */
export const PairAnalysisCard: React.FC<PairAnalysisCardProps> = ({ pairAnalysis }) => {
  const { t } = useTranslation();

  if (!pairAnalysis) {
    return null;
  }

  const { topCompanions, avoidedNumbers, interpretation } = pairAnalysis;

  const getBannerConfig = (): { variant: BannerVariant; icon: React.ReactNode } => {
    switch (interpretation) {
      case 'has_companions':
        return {
          variant: 'success',
          icon: <HandThumbUpIcon className="size-5" />,
        };
      case 'has_avoided':
        return {
          variant: 'warning',
          icon: <ExclamationTriangleIcon className="size-5" />,
        };
      case 'random':
        return {
          variant: 'info',
          icon: <ArrowsRightLeftIcon className="size-5" />,
        };
      default:
        return {
          variant: 'info',
          icon: <CheckCircleIcon className="size-5" />,
        };
    }
  };

  const bannerConfig = getBannerConfig();

  // Get max lift for scaling bars
  const maxLift = Math.max(
    ...topCompanions.map((c) => c.lift),
    ...avoidedNumbers.map((a) => (a.lift === 0 ? 0.1 : a.lift)),
    2
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h4 className="text-body-default-bold text-foreground">{t('numberStats.pairAnalysis.title')}</h4>
        <p className="text-body-small text-muted-foreground">{t('numberStats.pairAnalysis.description')}</p>
      </div>

      {/* Interpretation banner */}
      <Banner
        variant={bannerConfig.variant}
        icon={bannerConfig.icon}
        title={t(`numberStats.pairAnalysis.interpretation.${interpretation}`)}
        description={t(`numberStats.pairAnalysis.interpretationDescription.${interpretation}`)}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {/* Top Companions */}
        <Card className="rounded">
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <HandThumbUpIcon className="size-5 text-primary-green" />
              <span className="text-body-small-bold">{t('numberStats.pairAnalysis.topCompanions')}</span>
            </div>
            <Separator />
            {topCompanions.length > 0 ? (
              <div className="flex flex-col gap-2">
                {topCompanions.slice(0, 5).map((companion) => (
                  <PairNumberRow
                    key={companion.number}
                    number={companion.number}
                    coOccurrences={companion.coOccurrences}
                    expectedCoOccurrences={companion.expectedCoOccurrences}
                    lift={companion.lift}
                    isHighlighted={companion.lift > 1.5}
                    variant="companion"
                    maxLift={maxLift}
                  />
                ))}
              </div>
            ) : (
              <p className="text-body-small text-muted-foreground italic">
                {t('numberStats.pairAnalysis.noCompanions')}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Avoided Numbers */}
        <Card className="rounded">
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <HandThumbDownIcon className="size-5 text-primary-red" />
              <span className="text-body-small-bold">{t('numberStats.pairAnalysis.avoidedNumbers')}</span>
            </div>
            <Separator />
            {avoidedNumbers.length > 0 ? (
              <div className="flex flex-col gap-2">
                {avoidedNumbers.slice(0, 5).map((avoided) => (
                  <PairNumberRow
                    key={avoided.number}
                    number={avoided.number}
                    coOccurrences={avoided.coOccurrences}
                    expectedCoOccurrences={avoided.expectedCoOccurrences}
                    lift={avoided.lift}
                    isHighlighted={avoided.isSignificant}
                    variant="avoided"
                    maxLift={maxLift}
                  />
                ))}
              </div>
            ) : (
              <p className="text-body-small text-muted-foreground italic">{t('numberStats.pairAnalysis.noAvoided')}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-body-small text-muted-foreground">
        <div className="flex items-center gap-1">
          <ArrowsRightLeftIcon className="size-4" />
          <span>{t('numberStats.pairAnalysis.liftExplanation')}</span>
        </div>
      </div>
    </div>
  );
};
