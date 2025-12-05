'use client';

import { BellAlertIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { Loader2Icon } from 'lucide-react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

// Check usages here: https://sonner.emilkowal.ski/toast
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: <CheckCircleIcon className="size-4" />,
        info: <InformationCircleIcon className="size-4" />,
        warning: <BellAlertIcon className="size-4" />,
        error: <BellAlertIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          '--toast-icon-margin-start': '0',
        } as React.CSSProperties
      }
      position="top-center"
      toastOptions={{
        classNames: {
          toast: '!bg-screen !rounded-lg',
          actionButton: '!rounded-full',
          cancelButton: '!rounded-full',
        },
      }}
      {...props}
    />
  );
};
export { Toaster };
