import type React from 'react';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, Link, Separator } from '@lotto/ui';

import { type LottoInfoProps, LottoName } from './types';

export const LottoInfoCard = ({ lottoType, linkBuyTickets, linkGameRules }: LottoInfoProps): React.JSX.Element => {
  const { t } = useTranslation();

  const lottoName = LottoName[lottoType];

  return (
    <Card className="shadow-md">
      <CardContent>
        <div>
          {/* Divider with centered text */}
          <div className="flex items-center gap-4" data-testid="lotto-info-divider">
            <Separator className="flex-1" />
            <span className="text-body-small text-muted-foreground">{lottoName.toUpperCase()}</span>
            <Separator className="flex-1" />
          </div>
          <div className="py-2">
            <div>
              <p className="text-body-default" data-testid={`lotto-${lottoName}-description`}>
                {t(`info.${lottoType}`)}
              </p>
              <div className="h-2" />
              <p className="text-body-default" data-testid={`lotto-${lottoName}-default-description`}>
                {t('info.generalDescription', { lottoName })}
              </p>
            </div>
            <div className="flex items-center py-4">
              <Link
                data-testid={`lotto-${lottoName}-rules`}
                href={linkGameRules}
                target="_blank"
                rel="noopener noreferrer"
                underlineStyle="hover"
                className="pr-2 text-body-default leading-5"
              >
                {t('info.gameRules')}
              </Link>
              <Separator orientation="vertical" className="mx-2 h-5" />
              <Link
                data-testid={`lotto-${lottoName}-tickets`}
                href={linkBuyTickets}
                target="_blank"
                rel="noopener noreferrer"
                underlineStyle="hover"
                className="pl-2 text-body-default leading-5"
              >
                {t('info.buyTickets')}
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
