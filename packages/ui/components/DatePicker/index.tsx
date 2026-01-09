'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { DayPicker, type DayPickerProps } from 'react-day-picker';

import { cn } from '@lotto/ui/utils';

import { buttonVariants } from '../Button';

export type CalendarProps = DayPickerProps;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      fixedWeeks
      captionLayout="dropdown"
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row gap-2',
        month: 'flex flex-col gap-4 px-3',
        month_caption: 'flex justify-center pt-1 relative items-center w-full',
        caption_label: 'hidden',
        dropdowns: 'flex items-center gap-4',
        months_dropdown: 'cursor-pointer text-body-default-bold',
        years_dropdown: 'cursor-pointer text-body-default-bold',
        nav: 'flex items-center gap-1',
        button_previous: cn(
          buttonVariants({ variant: 'outline' }),
          'absolute left-1 top-1/2 size-7 -translate-y-1/2 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline' }),
          'absolute right-1 top-1/2 size-7 -translate-y-1/2 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        month_grid: 'w-full border-collapse mx-auto',
        weekdays: 'flex',
        weekday: 'text-muted-foreground rounded-md w-8 text-body-small text-center',
        week: 'flex w-full mt-2',
        day: cn(
          'relative p-0 text-center text-body-default focus-within:relative focus-within:z-20',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : ''
        ),
        day_button: cn(buttonVariants({ variant: 'ghost' }), 'size-8 rounded-full p-0 aria-selected:opacity-100'),
        range_start: 'day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground',
        range_end: 'day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground',
        selected:
          'rounded-full bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
        today: '',
        outside: 'day-outside text-muted-foreground aria-selected:text-muted-foreground',
        disabled: 'text-muted-foreground opacity-50',
        range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === 'left' ? <ChevronLeftIcon className="size-4" /> : <ChevronRightIcon className="size-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };

export { DatePicker, type DatePickerProps } from './DatePicker';
