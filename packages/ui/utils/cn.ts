import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-display-large',
        'text-display-default',
        'text-display-small',
        'text-title-large',
        'text-title-default',
        'text-title-small',
        'text-body-large',
        'text-body-large-bold',
        'text-body-default',
        'text-body-default-bold',
        'text-body-small',
        'text-body-small-bold',
        'text-link-large',
        'text-link-default',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
