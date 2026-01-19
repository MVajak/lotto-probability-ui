import { BugAntIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Card } from '@lotto/ui';

import { EMAILS } from '../../constants';

export function ContactSection() {
  const { t } = useTranslation();

  return (
    <Card className="h-full p-6">
      <h2 className="mb-4 text-foreground text-title-large-bold">{t('support.contact.title')}</h2>
      <p className="mb-6 text-body-medium text-muted-foreground">{t('support.contact.description')}</p>

      <div className="space-y-4">
        {/* Email */}
        <a
          href={`mailto:${EMAILS.support}`}
          className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:bg-muted/50"
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
            <EnvelopeIcon className="size-5 text-primary" />
          </div>
          <div>
            <p className="text-body-medium-bold text-foreground">{t('support.contact.email')}</p>
            <p className="text-body-small text-muted-foreground">{EMAILS.support}</p>
          </div>
        </a>

        {/* Bug Report */}
        <a
          href={`mailto:${EMAILS.report}?subject=Bug Report`}
          className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:bg-muted/50"
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
            <BugAntIcon className="size-5 text-primary" />
          </div>
          <div>
            <p className="text-body-medium-bold text-foreground">{t('support.contact.bugReport')}</p>
            <p className="text-body-small text-muted-foreground">{t('support.contact.bugReportDescription')}</p>
          </div>
        </a>
      </div>
    </Card>
  );
}
