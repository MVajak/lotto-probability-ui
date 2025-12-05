'use client';

import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '../../utils';

function Slider({ className, ...props }: React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow cursor-pointer overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-foreground" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block size-5 cursor-pointer rounded-full border-2 border-background bg-foreground shadow outline-none transition-colors disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
}

export { Slider };
