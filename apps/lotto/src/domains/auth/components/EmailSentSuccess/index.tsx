import type React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Alert, Button } from '@lotto/ui';

interface EmailSentSuccessProps {
  email: string;
  onBack: () => void;
}

export const EmailSentSuccess: React.FC<EmailSentSuccessProps> = ({ email, onBack }) => {
  const { t } = useTranslation();

  return (
    <div className="animate-fade-in">
      <div className="flex justify-center">
        <img src="/img/logo_lotto.png" alt="Lotto Logo" className="max-w-[120px] p-4" />
      </div>
      <div className="flex flex-col gap-6 px-4">
        <h5 className="text-center text-foreground text-title-default">{t('login.checkYourInbox')}</h5>
        <Alert variant="success" className="justify-center text-center">
          <span>
            <Trans i18nKey="login.sentToEmail" values={{ email }} components={{ strong: <strong /> }} />
          </span>
        </Alert>
        <Button variant="outline" className="w-full" onClick={onBack}>
          {t('login.back')}
        </Button>
      </div>
    </div>
  );
};
