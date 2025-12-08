import type React from 'react';
import { useMemo } from 'react';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { useTranslation } from 'react-i18next';

import type { NumberHistoryDto } from '@/domains/lotto';

// Helper to get CSS variable values for chart colors
const getCSSColor = (varName: string): string => {
  if (typeof window === 'undefined') return '#555555'; // fallback for SSR
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || '#555555';
};

interface MarkovHeatmapProps {
  transitionProbabilities: NumberHistoryDto['markovChain']['transitionProbabilities'];
}

export const MarkovHeatmap: React.FC<MarkovHeatmapProps> = ({ transitionProbabilities }) => {
  const { t } = useTranslation();
  const emptyColor = useMemo(() => getCSSColor('--color-muted-foreground'), []);

  return (
    <div>
      <h4 className="mb-1 text-body-default-bold">{t('numberStats.markovHeatmap.title')}</h4>
      <p className="mb-4 text-body-small text-muted-foreground">{t('numberStats.markovHeatmap.description')}</p>
      <div className="h-[200px]">
        <ResponsiveHeatMap
          data={[
            {
              id: 'After Appeared',
              data: [
                {
                  x: 'Appears Again',
                  y: transitionProbabilities.appearedToAppeared * 100,
                },
                {
                  x: 'Does Not Appear',
                  y: transitionProbabilities.appearedToNotAppeared * 100,
                },
              ],
            },
            {
              id: 'After Not Appeared',
              data: [
                {
                  x: 'Appears',
                  y: transitionProbabilities.notAppearedToAppeared * 100,
                },
                {
                  x: 'Does Not Appear',
                  y: transitionProbabilities.notAppearedToNotAppeared * 100,
                },
              ],
            },
          ]}
          margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
          valueFormat={(value) => `${value.toFixed(1)}%`}
          axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: '',
            legendOffset: 46,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Previous State',
            legendPosition: 'middle',
            legendOffset: -72,
          }}
          colors={{
            type: 'sequential',
            scheme: 'blues',
          }}
          emptyColor={emptyColor}
          legends={[
            {
              anchor: 'bottom',
              translateX: 0,
              translateY: 30,
              length: 400,
              thickness: 8,
              direction: 'row',
              tickPosition: 'after',
              tickSize: 3,
              tickSpacing: 4,
              tickOverlap: false,
              title: 'Probability (%) →',
              titleAlign: 'start',
              titleOffset: 4,
            },
          ]}
        />
      </div>
    </div>
  );
};
