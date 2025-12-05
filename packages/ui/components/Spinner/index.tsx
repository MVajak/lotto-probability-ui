import { LoaderIcon } from 'lucide-react';

import { cn } from '../../utils';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  // This is the spinner icon from lucide
  return <LoaderIcon className={cn('size-4 animate-spin', className)} {...props} />;
}

export { Spinner };
