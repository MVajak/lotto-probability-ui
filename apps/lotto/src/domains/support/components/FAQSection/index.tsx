import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Link } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'motion/react';
import { Trans, useTranslation } from 'react-i18next';

import { Card } from '@lotto/ui';

const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q6', 'q7', 'q5', 'q8', 'q9', 'q10', 'q11'] as const;

export function FAQSection() {
  const { t } = useTranslation();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Card className="p-6">
      <h2 className="mb-6 text-foreground text-title-large-bold">{t('support.faq.title')}</h2>
      <div className="space-y-3">
        {faqKeys.map((key, index) => (
          <div key={key} className="rounded-lg border border-border bg-muted/30">
            <button
              type="button"
              className="flex w-full items-center justify-between p-4 text-left"
              onClick={() => toggleExpand(index)}
            >
              <span className="text-body-large-bold text-foreground">{t(`support.faq.${key}`)}</span>
              <motion.div animate={{ rotate: expandedIndex === index ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDownIcon className="size-5 text-muted-foreground" />
              </motion.div>
            </button>
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="border-border border-t px-4 pt-3 pb-4">
                    <p className="text-body-medium text-muted-foreground">
                      {key === 'q10' ? (
                        <Trans
                          i18nKey="support.faq.a10"
                          components={{
                            methodology: (
                              <Link to="/methodology" className="text-primary underline hover:text-primary/80" />
                            ),
                          }}
                        />
                      ) : key === 'q11' ? (
                        <Trans
                          i18nKey="support.faq.a11"
                          components={{
                            b: <strong className="text-foreground" />,
                            br: <br />,
                          }}
                        />
                      ) : (
                        t(`support.faq.a${key.slice(1)}` as 'support.faq.a1')
                      )}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Card>
  );
}
