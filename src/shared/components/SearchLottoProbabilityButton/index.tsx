import { Button } from '@mui/material';
import React from 'react';

import { SearchLottoProbabilityButtonProps } from './types';

export const SearchLottoProbabilityButton = ({ onClick }: SearchLottoProbabilityButtonProps): React.JSX.Element => {
  const handleOnClick = () => {
    onClick();
  };

  return (
    <Button variant="contained" onClick={handleOnClick}>
      Calculate
    </Button>
  );
};
