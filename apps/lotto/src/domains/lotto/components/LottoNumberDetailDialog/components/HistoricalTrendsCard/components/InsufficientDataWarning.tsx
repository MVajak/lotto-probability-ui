import type React from 'react';
import { useTranslation } from 'react-i18next';

interface InsufficientDataWarningProps {
  titleKey: string;
  messageKey: string;
}

export const InsufficientDataWarning: React.FC<InsufficientDataWarningProps> = ({ titleKey, messageKey }) => {
  const { t } = useTranslation();

  return (
    <div className="rounded border border-primary-orange border-dashed bg-base-orange p-4">
      <p className="mb-1 text-body-default-bold text-muted-foreground">{t(titleKey)}</p>
      <p className="text-body-small text-muted-foreground">{t(messageKey)}</p>
    </div>
  );
};
