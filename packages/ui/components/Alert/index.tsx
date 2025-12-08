import type * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@lotto/ui/utils';

const alertVariants = cva(
  'relative flex w-full items-start gap-3 rounded-lg border p-4 text-body-default [&>svg]:size-5 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'border-border bg-background text-foreground',
        success: 'border-primary-green/20 bg-base-green text-primary-green',
        warning: 'border-primary-yellow/20 bg-base-yellow text-primary-yellow',
        destructive: 'border-primary-red/20 bg-base-red text-primary-red',
        info: 'border-primary-blue/20 bg-base-blue text-primary-blue',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Alert({ className, variant, ...props }: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return <div role="alert" data-slot="alert" className={cn(alertVariants({ variant }), className)} {...props} />;
}

function AlertTitle({ className, ...props }: React.ComponentProps<'h5'>) {
  return <h5 data-slot="alert-title" className={cn('text-body-default-bold leading-none', className)} {...props} />;
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn('text-body-default [&_p]:leading-relaxed', className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription, alertVariants };
