import {
  ArrowTopRightOnSquareIcon,
  BookOpenIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { Card } from '@lotto/ui';

const resources = [
  {
    key: 'methodology',
    descKey: 'methodologyDesc',
    icon: BookOpenIcon,
    href: '#',
  },
  {
    key: 'privacyPolicy',
    icon: ShieldCheckIcon,
    href: '#',
  },
  {
    key: 'termsOfService',
    icon: DocumentTextIcon,
    href: '#',
  },
] as const;

export function ResourcesSection() {
  const { t } = useTranslation();

  return (
    <Card className="h-full p-6">
      <h2 className="mb-6 text-foreground text-title-large-bold">{t('support.resources.title')}</h2>

      <div className="space-y-3">
        {resources.map((resource) => (
          <a
            key={resource.key}
            href={resource.href}
            className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:bg-muted/50"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
              <resource.icon className="size-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-body-medium-bold text-foreground">
                {t(`support.resources.${resource.key}` as 'support.resources.methodology')}
              </p>
              {'descKey' in resource && (
                <p className="text-body-small text-muted-foreground">
                  {t(`support.resources.${resource.descKey}` as 'support.resources.methodologyDesc')}
                </p>
              )}
            </div>
            <ArrowTopRightOnSquareIcon className="size-4 text-muted-foreground" />
          </a>
        ))}
      </div>
    </Card>
  );
}
