import type React from 'react';
import { CalendarIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, cn, Progress, StatCard } from '@lotto/ui';

import type { NumberDetailDto } from '@/domains/lotto';

interface LastSeenCardProps {
  summary: NumberDetailDto['summary'];
}

export const LastSeenCard: React.FC<LastSeenCardProps> = ({ summary }) => {
  const { t } = useTranslation();

  const { lastSeenDrawsAgo, lastSeenDate, overdueScore } = summary;

  // Format the date for display
  const formattedDate = new Date(lastSeenDate).toLocaleDateString();

  // Determine overdue status for styling
  const isOverdue = overdueScore > 0.5;
  const isHighlyOverdue = overdueScore > 0.8;

  const getOverdueColor = () => {
    if (isHighlyOverdue) return 'text-primary-red';
    if (isOverdue) return 'text-primary-orange';
    return 'text-primary-green';
  };

  const getOverdueLabel = () => {
    if (isHighlyOverdue) return t('numberStats.lastSeen.highlyOverdue');
    if (isOverdue) return t('numberStats.lastSeen.overdue');
    return t('numberStats.lastSeen.onSchedule');
  };

  return (
    <Card className="h-full">
      <CardContent className="flex flex-col gap-4 p-2">
        {/* Header */}
        <div className="flex items-center gap-2 p-2">
          <ClockIcon className="size-5 text-foreground" />
          <h3 className="text-title-small-bold">{t('numberStats.lastSeen.title')}</h3>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2">
          <StatCard
            icon={<ClockIcon className="size-5 text-primary-blue" />}
            label={t('numberStats.lastSeen.drawsAgo')}
            value={lastSeenDrawsAgo}
            unit={t('numberStats.lastSeen.draws', { count: lastSeenDrawsAgo })}
            description={t('numberStats.lastSeen.drawsAgoHelp')}
          />
          <StatCard
            icon={<CalendarIcon className="size-5 text-primary-green" />}
            label={t('numberStats.lastSeen.lastSeenDate')}
            value={formattedDate}
            description={t('numberStats.lastSeen.lastSeenDateHelp')}
          />
        </div>

        {/* Overdue Score */}
        <Card className="rounded">
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ExclamationTriangleIcon className={cn('size-5', getOverdueColor())} />
                <span className="text-body-small text-muted-foreground">{t('numberStats.lastSeen.overdueScore')}</span>
              </div>
              <span className={cn('text-body-default-bold', getOverdueColor())}>{getOverdueLabel()}</span>
            </div>
            <Progress value={overdueScore * 100} className="h-2" />
            <p className="text-body-small text-muted-foreground italic">{t('numberStats.lastSeen.overdueHelp')}</p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
