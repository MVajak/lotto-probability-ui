import type React from 'react';
import { useTranslation } from 'react-i18next';

import { Card, CardContent } from '@lotto/ui';

interface InsufficientDataWarningCardProps {
  titleKey: string;
  messageKey: string;
}

export const InsufficientDataWarningCard: React.FC<InsufficientDataWarningCardProps> = ({ titleKey, messageKey }) => {
  const { t } = useTranslation();

  return (
    <Card className="rounded border border-primary-orange border-dashed bg-base-orange">
      <CardContent>
        <p className="mb-1 text-body-default-bold text-muted-foreground">{t(titleKey)}</p>
        <p className="text-body-small text-muted-foreground">{t(messageKey)}</p>
      </CardContent>
    </Card>
  );
};
