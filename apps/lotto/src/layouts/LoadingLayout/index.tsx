import type React from 'react';

import { Spinner } from '@lotto/ui';

interface LoadingLayoutProps {
  title: string;
  message?: string;
}

export const LoadingLayout: React.FC<LoadingLayoutProps> = ({ title, message }) => {
  return (
    <div className="text-center">
      <Spinner className="mb-4 size-16" />
      <h1 className="mb-2 text-title-medium">{title}</h1>
      {message && <p className="text-body-default text-muted-foreground">{message}</p>}
    </div>
  );
};
