import type { ComponentProps } from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';
import { Spinner } from '../Spinner';

const buttonVariants = cva(
  'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full text-body-default-bold outline-none transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_img:not([class*="size-"])]:size-4 [&_svg:not([class*="size-"])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'border border-border bg-background text-foreground hover:bg-accent',
        ghost: 'bg-transparent text-foreground hover:bg-accent',
        link: 'text-foreground underline-offset-4 hover:underline',
        error: 'bg-secondary-red text-primary-red hover:bg-base-red',
      },
      size: {
        sm: 'h-9 px-4',
        md: 'h-10 px-4',
        lg: 'h-11 px-8',
      },
      loading: {
        true: 'opacity-50',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  loading?: boolean;
  asChild?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export { buttonVariants };

export const Button = ({
  variant,
  size,
  loading = false,
  iconLeft,
  iconRight,
  asChild = false,
  children,
  className,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Slot : 'button';

  return (
    <Component
      className={cn(
        buttonVariants({
          variant,
          size,
          loading,
        }),
        className
      )}
      {...props}
    >
      {loading ? <Spinner /> : iconLeft}
      <Slottable>{children}</Slottable>
      {iconRight}
    </Component>
  );
};
