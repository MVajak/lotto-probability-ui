import type * as React from 'react';

import { cn } from '../../utils';

// Card subcomponents automatically get px-6 when the card has a py-6
function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'group flex w-full flex-col gap-2 rounded-xl border border-border bg-card py-4 text-card-foreground',
        className
      )}
      {...props}
    />
  );
}
function InteractiveCard({ className, ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn('cursor-pointer transition-shadow duration-200 hover:shadow-lg active:bg-accent', className)}
      {...props}
    />
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
  return <div data-slot="card-content" className={cn('px-4 group-[.py-6]:px-6', className)} {...props} />;
}
function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="card-footer" className={cn('flex items-center px-4 group-[.py-6]:px-6', className)} {...props} />
  );
}
export { Card, InteractiveCard, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
