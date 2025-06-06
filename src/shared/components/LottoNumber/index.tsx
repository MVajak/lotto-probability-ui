import { Badge, Button } from '@mui/material';
import React from 'react';

import { LottoNumberProps } from './types';

export const LottoNumber = ({ index, digit, onClick, showBadge, style }: LottoNumberProps): React.JSX.Element => {
  const id = `lotto-number-${index}`;

  const renderButton = (): React.JSX.Element => (
    <Button
      aria-describedby={id}
      variant="contained"
      onClick={onClick}
      sx={{
        borderRadius: '50%',
        width: 42,
        height: 42,
        minWidth: 0,
        margin: '4px',
        cursor: 'auto',
        ...style,
      }}
    >
      {digit}
    </Button>
  );

  if (!showBadge) {
    return renderButton();
  }

  return (
    <>
      <Badge color="warning" overlap="circular" badgeContent="!" sx={{ cursor: 'help' }} onClick={onClick}>
        {renderButton()}
      </Badge>
    </>
  );
};
