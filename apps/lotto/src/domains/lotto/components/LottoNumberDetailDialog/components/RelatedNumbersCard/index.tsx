import type React from 'react';
import { LinkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Badge, Card, CardContent, LottoNumber } from '@lotto/ui';

import type { NumberStat } from '../../../../types';

interface RelatedNumbersCardProps {
  relatedNumbers: NumberStat[];
  onNumberClick?: (numberStat: NumberStat) => void;
}

export const RelatedNumbersCard: React.FC<RelatedNumbersCardProps> = ({ relatedNumbers, onNumberClick }) => {
  const { t } = useTranslation();

  if (relatedNumbers.length === 0) return null;

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex items-center justify-center rounded-md bg-primary/10 p-1.5">
            <LinkIcon className="size-5 text-foreground" />
          </div>
          <h3 className="text-title-small-bold">{t('result.numbersWithSameProbability')}</h3>
        </div>

        <Badge className="mb-4 rounded bg-primary/10 px-2 py-1 text-body-small-bold text-foreground">
          {relatedNumbers.length} {relatedNumbers.length === 1 ? t('general.number') : t('general.numbers')}
        </Badge>

        <div className="flex flex-wrap gap-3 rounded-lg border border-border bg-muted/50 p-4">
          {relatedNumbers.map((stat) => (
            <LottoNumber
              key={stat.digit}
              digit={stat.digit}
              index={`related-dialog-${stat.digit}`}
              onClick={onNumberClick ? () => onNumberClick(stat) : undefined}
              className={onNumberClick ? 'cursor-pointer transition-transform duration-200 hover:scale-110' : ''}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
