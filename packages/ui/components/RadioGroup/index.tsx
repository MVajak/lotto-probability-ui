'use client';

import type * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@lotto/ui/utils';

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn('grid gap-2', className)} {...props} />;
}

interface RadioGroupItemProps extends React.ComponentProps<typeof RadioGroupPrimitive.Item> {
  label?: string;
  description?: string;
}

function RadioGroupItem({ className, label, description, id, ...props }: RadioGroupItemProps) {
  return (
    <label htmlFor={id} className="flex cursor-pointer flex-col gap-0.5">
      <div className="flex items-center gap-2">
        <RadioGroupPrimitive.Item
          id={id}
          data-slot="radio-group-item"
          className={cn(
            'aspect-square h-4 w-4 shrink-0 cursor-pointer rounded-full border border-input text-foreground focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50 group-disabled:opacity-50',
            className
          )}
          {...props}
        >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
            <span className="h-2 w-2 rounded-full bg-current" />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
        {label && <span className="text-body-large">{label}</span>}
      </div>
      {description && <span className="pl-6 text-body-default text-muted-foreground">{description}</span>}
    </label>
  );
}

export { RadioGroup, RadioGroupItem };

export type RadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive.Root>;
export type { RadioGroupItemProps };
