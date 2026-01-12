import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { Trans, useTranslation } from 'react-i18next';

import { Button, Card } from '@lotto/ui';

import { LanguageSelector } from '@/domains/region/components/LanguageSelector';
import { BrandLayout } from '@/layouts/BrandLayout';

export const Route = createFileRoute('/privacy-policy')({
  component: PrivacyPolicyPage,
});

const sections = [
  'intro',
  'dataCollection',
  'dataUse',
  'dataSharing',
  'dataRetention',
  'yourRights',
  'cookies',
  'childrenPrivacy',
  'security',
  'changes',
  'contact',
] as const;

function PrivacyPolicyPage() {
  const { t } = useTranslation();

  return (
    <BrandLayout topRight={<LanguageSelector />}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-3xl"
      >
        <Card className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-6 flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="size-9 p-0">
                <ArrowLeftIcon className="size-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-title-large-bold text-foreground">{t('legal.privacyPolicy.title')}</h1>
              <p className="text-body-small text-muted-foreground">
                {t('legal.privacyPolicy.lastUpdated', { date: 'January 10, 2026' })}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
                {sections.map((section) => (
              <section key={section}>
                <h2 className="mb-2 text-title-medium-bold text-foreground">
                  {t(`legal.privacyPolicy.${section}.title`)}
                </h2>
                {section === 'contact' ? (
                  <p className="text-body-medium text-muted-foreground">
                    <Trans
                      i18nKey="legal.privacyPolicy.contact.content"
                      components={{
                        email: (
                          <a
                            href="mailto:support@lottolens.com"
                            className="text-primary underline hover:text-primary/80"
                          />
                        ),
                      }}
                    />
                  </p>
                ) : (
                  <p className="text-body-medium text-muted-foreground">{t(`legal.privacyPolicy.${section}.content`)}</p>
                )}
                {section === 'dataCollection' ||
                section === 'dataUse' ||
                section === 'dataSharing' ||
                section === 'yourRights' ? (
                  <ul className="mt-2 list-inside list-disc space-y-1 text-body-medium text-muted-foreground">
                    {Object.entries(
                      t(`legal.privacyPolicy.${section}.items`, { returnObjects: true }) as Record<string, string>
                    ).map(([key, value]) => (
                      <li key={key}>{value}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          {/* Back button */}
          <div className="mt-8">
            <Link to="/login">
              <Button variant="outline">{t('legal.privacyPolicy.back')}</Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </BrandLayout>
  );
}
