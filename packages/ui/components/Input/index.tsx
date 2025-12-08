import type { ComponentProps } from 'react';

import { cn } from '@lotto/ui/utils';

export const Input = ({ className, ...props }: ComponentProps<'input'>) => {
  return (
    <input
      data-slot="input"
      className={cn(
        'box-border h-12 w-full min-w-0 rounded-md border border-input px-3 text-body-large text-foreground transition-all duration-200 placeholder:text-muted-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground',
        'aria-invalid:ring-2 aria-invalid:ring-destructive aria-invalid:focus:ring-destructive',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
};
