import type * as React from 'react';
import { type HTMLMotionProps, motion } from 'motion/react';

import { cn } from '@lotto/ui/utils';

// Card subcomponents automatically get px-6 when the card has a py-6
function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'group flex w-full flex-col gap-2 rounded-2xl border border-glass-border bg-glass p-4 text-card-foreground backdrop-blur-xli',
        className
      )}
      {...props}
    />
  );
}

interface InteractiveCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children?: React.ReactNode;
}

function InteractiveCard({ className, children, ...props }: InteractiveCardProps) {
  return (
    <motion.div
      data-slot="card"
      className={cn(
        'group flex w-full cursor-pointer flex-col gap-2 rounded-2xl border border-glass-border bg-glass p-4 text-card-foreground backdrop-blur-xl',
        className
      )}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid items-start gap-2 px-4 group-[.py-6]:px-6 [.border-b]:pb-4',
        className
      )}
      {...props}
    />
  );
}
function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-title" className={cn('text-title-default leading-none', className)} {...props} />;
}
function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="card-description" className={cn('text-body-default text-muted-foreground', className)} {...props} />
  );
}
function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-full row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  );
}
function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('group-[.py-6]:px-6', className)} {...props} />;
}
function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="card-footer" className={cn('flex items-center px-4 group-[.py-6]:px-6', className)} {...props} />
  );
}
export { Card, InteractiveCard, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
