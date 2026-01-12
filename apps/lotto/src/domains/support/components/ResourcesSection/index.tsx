import {
  ArrowTopRightOnSquareIcon,
  BookOpenIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Card } from '@lotto/ui';

const resources = [
  {
    key: 'methodology',
    descKey: 'methodologyDesc',
    icon: BookOpenIcon,
    href: '/methodology',
    isExternal: false,
  },
  {
    key: 'privacyPolicy',
    icon: ShieldCheckIcon,
    href: '/privacy-policy',
    isExternal: false,
  },
  {
    key: 'termsOfService',
    icon: DocumentTextIcon,
    href: '/terms-of-service',
    isExternal: false,
  },
] as const;

export function ResourcesSection() {
  const { t } = useTranslation();

  return (
    <Card className="h-full p-6">
      <h2 className="mb-6 text-foreground text-title-large-bold">{t('support.resources.title')}</h2>

      <div className="space-y-3">
        {resources.map((resource) => {
          const content = (
            <>
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
              {resource.isExternal ? (
                <ArrowTopRightOnSquareIcon className="size-4 text-muted-foreground" />
              ) : (
                <ChevronRightIcon className="size-4 text-muted-foreground" />
              )}
            </>
          );

          const className =
            'flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:bg-muted/50';

          if (resource.isExternal) {
            return (
              <a key={resource.key} href={resource.href} className={className}>
                {content}
              </a>
            );
          }

          return (
            <Link key={resource.key} to={resource.href} className={className}>
              {content}
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
