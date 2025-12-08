import type { ComponentProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@lotto/ui/utils';

const linkVariants = cva('cursor-pointer', {
  variants: {
    underlineStyle: {
      always: 'underline',
      hover: 'no-underline hover:underline',
      never: 'no-underline',
      hoverRemove: 'underline hover:no-underline',
    },
  },
  defaultVariants: {
    underlineStyle: 'always',
  },
});

export interface LinkProps extends ComponentProps<'a'>, VariantProps<typeof linkVariants> {}

export const Link = ({ underlineStyle, className, children, ...props }: LinkProps) => {
  return (
    <a className={cn(linkVariants({ underlineStyle }), className)} {...props}>
      {children}
    </a>
  );
};
