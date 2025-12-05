import { cva } from 'class-variance-authority';

import { cn } from '../..';
import { Button, ButtonProps } from '../Button';

const iconButtonVariants = cva('rounded-full p-0 [&>svg]:size-4', {
  variants: {
    size: {
      sm: 'size-8',
      md: 'size-9',
      lg: 'size-10',
    },
  },
});

export interface IconButtonProps extends Omit<ButtonProps, 'loading' | 'iconLeft' | 'iconRight'> {
  label: string;
}

export const IconButton = ({ label, children, size = 'md', className = '', ...props }: IconButtonProps) => {
  return (
    <Button size={size} aria-label={label} className={cn(iconButtonVariants({ size }), className)} {...props}>
      {children}
    </Button>
  );
};
