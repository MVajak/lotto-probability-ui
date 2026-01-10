import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { ContactSection, FAQSection, ResourcesSection } from '@/domains/support';
import { PageLayout } from '@/layouts/PageLayout';

export const Route = createFileRoute('/_authenticated/support')({
  component: SupportPage,
});

function SupportPage() {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <div className="p-6">
        {/* Header */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-3 text-display-small-bold text-foreground">{t('support.title')}</h1>
          <p className="mx-auto max-w-md text-body-large text-muted-foreground">{t('support.subtitle')}</p>
        </motion.div>

        {/* Content sections */}
        <div className="mx-auto max-w-4xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <FAQSection />
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <ContactSection />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <ResourcesSection />
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
