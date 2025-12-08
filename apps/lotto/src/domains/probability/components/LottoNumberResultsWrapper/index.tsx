import type React from 'react';
import { useTranslation } from 'react-i18next';

import { LottoNumbersButton } from './LottoNumbersButton';
import type { LottoNumberResultsWrapperProps } from './types';

export const LottoNumberResultsWrapper = ({
  children,
  allNumberStats,
  titleKey,
}: LottoNumberResultsWrapperProps): React.JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="col-span-12">
      <p className="px-2 py-4 text-title-small-bold">{t(titleKey)}</p>
      {children}
      <LottoNumbersButton buttonText={t('result.seeMore')} numberStats={allNumberStats} />
    </div>
  );
};
