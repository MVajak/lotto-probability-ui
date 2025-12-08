'use client';

import type * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@lotto/ui/utils';

const toggleVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-body-default-bold text-foreground outline-none transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=on]:bg-secondary [&_svg:not([class*="size-"])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        ghost: 'bg-transparent hover:bg-accent',
        outline: 'border border-border bg-background hover:bg-accent',
      },
      size: {
        sm: 'h-9 px-2.5',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'sm',
    },
  }
);

export const Toggle = ({
  className,
  variant,
  size,
  ...props
}: React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) => (
  <TogglePrimitive.Root className={cn(toggleVariants({ variant, size, className }))} {...props} />
);
