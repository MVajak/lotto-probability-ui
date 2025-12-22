import type React from 'react';

import { Separator } from '@lotto/ui';

interface SectionProps {
  data: unknown;
  children: React.ReactNode;
  showSeparator?: boolean;
}

/**
 * Reusable section wrapper that handles conditional rendering and separators.
 * Renders nothing if data is falsy.
 */
export const Section: React.FC<SectionProps> = ({ data, children, showSeparator = true }) => {
  if (!data) return null;

  return (
    <>
      {children}
      {showSeparator && <Separator className="my-6" />}
    </>
  );
};
