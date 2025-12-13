import type React from 'react';
import { LinkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Badge, Card, CardContent, LottoNumber } from '@lotto/ui';

import type { NumberStat } from '@/domains/lotto';

interface RelatedNumbersCardProps {
  relatedNumbers: NumberStat[];
  onNumberClick?: (numberStat: NumberStat) => void;
}

export const RelatedNumbersCard: React.FC<RelatedNumbersCardProps> = ({ relatedNumbers, onNumberClick }) => {
  const { t } = useTranslation();

  if (relatedNumbers.length === 0) return null;

  return (
    <Card className="h-full">
      <CardContent className="flex flex-col gap-4 p-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-md bg-primary/10 p-2">
            <LinkIcon className="size-5 text-foreground" />
          </div>
          <h3 className="text-title-small-bold">{t('result.numbersWithSameProbability')}</h3>
        </div>

        <Badge className="rounded bg-primary/10 px-2 py-1 text-body-small-bold text-foreground">
          {relatedNumbers.length} {relatedNumbers.length === 1 ? t('general.number') : t('general.numbers')}
        </Badge>

        <Card className="rounded p-2">
          <CardContent className="flex flex-wrap gap-1">
            {relatedNumbers.map((stat) => (
              <LottoNumber
                key={stat.digit}
                digit={stat.digit}
                index={`related-dialog-${stat.digit}`}
                onClick={onNumberClick ? () => onNumberClick(stat) : undefined}
                className={onNumberClick ? 'cursor-pointer transition-transform duration-200 hover:scale-110' : ''}
              />
            ))}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
