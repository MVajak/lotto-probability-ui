import { ComponentProps } from 'react';

import { cn } from '../../../utils';

export const DefaultCheckIcon = ({ className, ...props }: ComponentProps<'svg'>) => (
  <svg
    width="13"
    height="9"
    viewBox="0 0 13 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('pointer-events-none', className)}
    {...props}
  >
    <path
      stroke="currentColor"
      d="M11.4167 0.75L4.08333 8.08333L0.75 4.75"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
