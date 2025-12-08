import type React from 'react';

export interface LottoNumberProps {
  digit: number;
  index?: number | string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  className?: string;
}
