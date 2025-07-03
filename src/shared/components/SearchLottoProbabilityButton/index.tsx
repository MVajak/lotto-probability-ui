import { Button } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { SearchLottoProbabilityButtonProps } from './types';

export const SearchLottoProbabilityButton = ({ onClick }: SearchLottoProbabilityButtonProps): React.JSX.Element => {
  const { t } = useTranslation();

  const handleOnClick = () => {
    onClick();
  };

  return (
    <Button variant="contained" onClick={handleOnClick}>
      {t('search.calculate')}
    </Button>
  );
};
