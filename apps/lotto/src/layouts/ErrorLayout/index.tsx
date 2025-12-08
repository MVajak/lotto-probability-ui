import type React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Link } from '@tanstack/react-router';

import { Button } from '@lotto/ui';

interface ErrorLayoutProps {
  title: string;
  message?: string;
  actionLabel?: string;
  actionPath?: string;
}

export const ErrorLayout: React.FC<ErrorLayoutProps> = ({ title, message, actionLabel, actionPath }) => {
  return (
    <div className="text-center">
      <ExclamationCircleIcon className="mx-auto mb-4 size-16 text-primary-red" />
      <h1 className="mb-2 text-primary-red text-title-medium">{title}</h1>
      <p className="mb-6 text-body-default text-muted-foreground">{message}</p>
      {actionLabel && actionPath && (
        <Button asChild size="lg">
          <Link to={actionPath}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  );
};
