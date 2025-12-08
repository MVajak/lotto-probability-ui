import type React from 'react';

import { cn } from '../../utils';
import type { LottoNumberProps } from './types';

export const LottoNumber = ({ index, digit, onClick, className }: LottoNumberProps): React.JSX.Element => {
  const id = `lotto-number-${index}`;
  const ballSize = 42;

  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div
      aria-describedby={id}
      data-testid={`lotto-button-${index}`}
      onClick={handleClick}
      className={cn('relative m-1 inline-block align-middle', onClick && 'cursor-pointer', className)}
      style={{ width: ballSize, height: ballSize }}
    >
      <svg
        width={ballSize}
        height={ballSize}
        viewBox={`0 0 ${ballSize} ${ballSize}`}
        role="img"
        aria-label={`Lottery number ${digit}`}
      >
        <defs>
          {/* Ball gradient */}
          <radialGradient id={`ballGradient-${index}`}>
            <stop offset="0%" stopColor="var(--color-gold-light)" />
            <stop offset="60%" stopColor="var(--color-gold)" />
            <stop offset="100%" stopColor="var(--color-gold-dark)" />
          </radialGradient>

          {/* Shine gradient */}
          <radialGradient id={`shineGradient-${index}`}>
            <stop offset="0%" stopColor="var(--color-primary-foreground)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--color-primary-foreground)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Main ball */}
        <circle cx={ballSize / 2} cy={ballSize / 2} r={ballSize / 2 - 2} fill={`url(#ballGradient-${index})`} />

        {/* Shine effect */}
        <circle
          cx={ballSize / 2 - (ballSize / 2) * 0.27}
          cy={ballSize / 2 - (ballSize / 2) * 0.27}
          r={(ballSize / 2) * 0.27}
          fill={`url(#shineGradient-${index})`}
        />

        {/* Number on ball */}
        <text
          x={ballSize / 2}
          y={ballSize / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--color-primary)"
          fontSize="18"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          {digit}
        </text>
      </svg>
    </div>
  );
};
