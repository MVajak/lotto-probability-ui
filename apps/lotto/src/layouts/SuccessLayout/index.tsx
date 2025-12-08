import type React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface SuccessLayoutProps {
  title: string;
  message?: string;
}

export const SuccessLayout: React.FC<SuccessLayoutProps> = ({ title, message }) => {
  return (
    <div className="text-center">
      <CheckCircleIcon className="mx-auto mb-4 size-16 text-primary-green" />
      <h1 className="mb-2 text-primary-green text-title-medium">{title}</h1>
      {message && <p className="text-body-default text-muted-foreground">{message}</p>}
    </div>
  );
};
