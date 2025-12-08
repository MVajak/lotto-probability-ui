import type * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@lotto/ui/utils';

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-full border border-border px-3 py-1 text-body-small-bold transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:size-4 [button&,a&]:cursor-pointer',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground [button&,a&]:hover:bg-primary/90',
        secondary: 'border-transparent bg-secondary text-secondary-foreground [button&,a&]:hover:bg-secondary/80',
        outline: 'text-foreground [button&,a&]:hover:border-accent',
        success: 'border-transparent bg-base-green text-primary-green [button&,a&]:hover:bg-secondary-green',
        warning: 'border-transparent bg-base-yellow text-primary-yellow [button&,a&]:hover:bg-secondary-yellow',
        destructive: 'border-transparent bg-base-red text-primary-red [button&,a&]:hover:bg-secondary-red',
        info: 'border-transparent bg-base-blue text-primary-blue [button&,a&]:hover:bg-secondary-blue',
      },
      size: {
        md: 'min-h-5 px-2',
        lg: 'min-h-6 px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);
function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return <Comp data-slot="badge" className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}
export { Badge, badgeVariants };
