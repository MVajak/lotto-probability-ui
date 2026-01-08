import { useState } from 'react';
import { ChartBarIcon, GlobeAltIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { ExpandableList } from './ExpandableList';

const features = [
  { icon: SparklesIcon, key: 'authLayout.feature1' },
  { icon: ChartBarIcon, key: 'authLayout.feature2' },
  { icon: GlobeAltIcon, key: 'authLayout.feature3' },
];

const methods = [
  'authLayout.method1',
  'authLayout.method2',
  'authLayout.method3',
  'authLayout.method4',
  'authLayout.method5',
  'authLayout.method6',
  'authLayout.method7',
  'authLayout.method8',
  'authLayout.method9',
];

const regions = ['authLayout.region1', 'authLayout.region2', 'authLayout.region3'];

export const FeatureList = () => {
  const { t } = useTranslation();
  const [showMethods, setShowMethods] = useState(false);
  const [showRegions, setShowRegions] = useState(false);

  return (
    <div className="flex w-[360px] flex-col gap-4">
      {features.map((feature, index) => (
        <motion.div
          key={feature.key}
          className="flex flex-col gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
              <feature.icon className="size-5 text-primary" />
            </div>
            <span className="text-body-default text-foreground">{t(feature.key)}</span>
          </div>

          {index === 1 && (
            <ExpandableList
              label="authLayout.methodsLabel"
              items={methods}
              isOpen={showMethods}
              onToggle={() => setShowMethods(!showMethods)}
            />
          )}

          {index === 2 && (
            <ExpandableList
              label="authLayout.regionsLabel"
              items={regions}
              isOpen={showRegions}
              onToggle={() => setShowRegions(!showRegions)}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};
