'use client';

import * as React from 'react';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

import { cn } from '../../utils';
import { Button } from '../Button';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Calendar } from './index';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  dateFormat?: string;
  className?: string;
  disabled?: boolean;
}

export function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  dateFormat = 'dd/MM/yyyy',
  className,
  disabled = false,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (date: Date | undefined) => {
    onChange?.(date);
    setOpen(false);
  };

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn('w-full justify-start text-left font-normal', !value && 'text-muted-foreground')}
          >
            <CalendarIcon className="mr-2 size-4" />
            {value && format(value, dateFormat)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="center">
          <Calendar
            mode="single"
            required
            selected={value}
            onSelect={handleSelect}
            disabled={(date) => {
              if (minDate && date < minDate) return true;
              return !!(maxDate && date > maxDate);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
