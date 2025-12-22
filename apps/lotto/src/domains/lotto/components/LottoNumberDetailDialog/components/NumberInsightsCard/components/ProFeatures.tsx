import type React from 'react';

import { Separator } from '@lotto/ui';

import type { NumberDetailDto } from '@/domains/lotto';

import { HotColdMeterCard } from './cards/HotColdMeterCard';
import { RecentDrawsChartCard } from './cards/RecentDrawsChartCard';
import { StreakStatsCard } from './cards/StreakStatsCard';
import { TrendSparklineCard } from './cards/TrendSparklineCard';
import { Section } from './Section';

interface ProFeaturesProps {
  summary: NumberDetailDto['summary'];
  trends: NumberDetailDto['trends'];
  timeline: NumberDetailDto['timeline'];
}

/**
 * Pro tier features section.
 * Displays: HotColdMeter, TrendSparkline, RecentDrawsChart, StreakStats
 */
export const ProFeatures: React.FC<ProFeaturesProps> = ({ summary, trends, timeline }) => {
  const hasTrendsData = trends?.timeSeries && trends.timeSeries.length > 0;
  const hasTimelineData = timeline && timeline.length > 0;

  return (
    <>
      <HotColdMeterCard summary={summary} />
      <Separator className="my-6" />

      <Section data={hasTrendsData && trends}>
        <TrendSparklineCard timeSeries={trends.timeSeries} />
      </Section>

      <Section data={hasTimelineData && timeline}>
        <RecentDrawsChartCard timeline={timeline} />
      </Section>

      <Section data={hasTrendsData && trends} showSeparator={false}>
        <StreakStatsCard trends={trends} />
      </Section>
    </>
  );
};
