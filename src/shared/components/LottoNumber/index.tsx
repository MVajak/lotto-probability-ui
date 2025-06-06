import { Badge, Button } from '@mui/material';
import React from 'react';

import { LottoNumberProps } from './types';

export const LottoNumber = ({ index, digit, onClick, showBadge, style }: LottoNumberProps): React.JSX.Element => {
  const id = `lotto-number-${index}`;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick?.(e)
  }

  const renderButton = (): React.JSX.Element => (
    <Button
      aria-describedby={id}
      variant="contained"
      data-testid={`lotto-button-${index}`}
      onClick={(event) => handleClick(event)}
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
      <Badge
        color="warning"
        data-testid={`lotto-button-badge-${index}`}
        overlap="circular"
        badgeContent="!"
        sx={{ cursor: 'help' }}
        onClick={handleClick}
      >
        {renderButton()}
      </Badge>
    </>
  );
};
