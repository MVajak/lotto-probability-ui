import type React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@lotto/ui';

export interface SearchLottoProbabilityButtonProps {
  onClick: () => void;
}

export const SearchLottoProbabilityButton = ({ onClick }: SearchLottoProbabilityButtonProps): React.JSX.Element => {
  const { t } = useTranslation();

  const handleOnClick = () => {
    onClick();
  };

  return (
    <Button className="w-full" variant="primary" onClick={handleOnClick}>
      {t('search.calculate')}
    </Button>
  );
};
