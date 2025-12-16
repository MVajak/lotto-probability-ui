import type React from 'react';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Banner, type BannerVariant, cn, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@lotto/ui';

import type { NumberDetailDto } from '@/domains/lotto';

interface AutocorrelationChartProps {
  autocorrelation: NonNullable<NumberDetailDto['autocorrelation']>;
}

/**
 * Autocorrelation display with simple verdict banner and technical details.
 */
export const AutocorrelationChart: React.FC<AutocorrelationChartProps> = ({ autocorrelation }) => {
  const { t } = useTranslation();
  const { lagCorrelations, interpretation } = autocorrelation;

  const getBannerConfig = (): { variant: BannerVariant; icon: React.ReactNode } => {
    switch (interpretation) {
      case 'clustered':
        return {
          variant: 'warning',
          icon: <ExclamationTriangleIcon className="size-5" />,
        };
      case 'dispersed':
        return {
          variant: 'info',
          icon: <ExclamationTriangleIcon className="size-5" />,
        };
      default:
        return {
          variant: 'success',
          icon: <CheckCircleIcon className="size-5" />,
        };
    }
  };

  const getBarColor = (correlation: number, isSignificant: boolean) => {
    if (!isSignificant) return 'bg-muted-foreground/30';
    return correlation > 0 ? 'bg-primary-green' : 'bg-primary-red';
  };

  const getBarWidth = (correlation: number) => {
    const absCorrelation = Math.abs(correlation);
    return Math.min(absCorrelation * 200, 100);
  };

  const bannerConfig = getBannerConfig();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h4 className="text-body-default-bold">{t('numberStats.autocorrelation.title')}</h4>
        <p className="text-body-small text-muted-foreground">{t('numberStats.autocorrelation.description')}</p>
      </div>

      {/* Simple verdict banner */}
      <Banner
        variant={bannerConfig.variant}
        icon={bannerConfig.icon}
        title={t(`numberStats.autocorrelation.interpretation.${interpretation}`)}
        description={t(`numberStats.autocorrelation.explanation.${interpretation}`)}
      />

      {/* Technical correlation chart */}
      <div className="flex flex-col gap-2">
        <p className="text-body-small-bold text-muted-foreground">
          {t('numberStats.autocorrelationChart.correlation')}
        </p>
        {lagCorrelations.map(({ lag, correlation, pValue, isSignificant }) => (
          <TooltipProvider key={lag}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex cursor-help items-center gap-3">
                  <span className="w-14 text-body-small text-muted-foreground">
                    {t('numberStats.autocorrelationChart.lag', { lag })}
                  </span>
                  <div className="relative flex h-5 flex-1 items-center">
                    {/* Center line */}
                    <div className="absolute left-1/2 h-full w-px bg-border" />
                    {/* Bar */}
                    <div
                      className={cn(
                        'absolute h-3 rounded-sm transition-all',
                        getBarColor(correlation, isSignificant),
                        correlation >= 0 ? 'left-1/2' : 'right-1/2'
                      )}
                      style={{
                        width: `${getBarWidth(correlation)}%`,
                        maxWidth: '50%',
                      }}
                    />
                  </div>
                  <span
                    className={cn(
                      'w-14 text-right font-mono text-body-small',
                      isSignificant ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {correlation > 0 ? '+' : ''}
                    {correlation.toFixed(2)}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex flex-col gap-1 text-body-small">
                  <p>{t('numberStats.autocorrelationChart.correlationValue', { value: correlation.toFixed(3) })}</p>
                  <p>{t('numberStats.autocorrelationChart.pValue', { value: pValue.toFixed(3) })}</p>
                  <p className={isSignificant ? 'text-primary-orange' : 'text-primary-green'}>
                    {isSignificant
                      ? t('numberStats.autocorrelationChart.significant')
                      : t('numberStats.autocorrelationChart.notSignificant')}
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};
