import type React from 'react';

import { Spinner } from '@lotto/ui';

interface LoadingLayoutProps {
  title?: string;
  message?: string;
}

export const LoadingLayout: React.FC<LoadingLayoutProps> = ({ title, message }) => {
  return (
    <div className="flex flex-1 items-center justify-center py-20">
      <Spinner className="mb-4 size-8" />
      {title && <h1 className="mb-2 text-title-medium">{title}</h1>}
      {message && <p className="text-body-default text-muted-foreground">{message}</p>}
    </div>
  );
};
