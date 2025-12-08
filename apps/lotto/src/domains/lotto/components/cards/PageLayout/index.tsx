import type React from 'react';

import { AdSpace } from '@lotto/ui';

import { Header } from '@/domains/shell';

export interface PageLayoutProps {
  children: React.JSX.Element;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="container mx-auto max-w-screen-xl px-4">
      <div className="py-4">
        <Header />

        {/* Mobile Top Banner Ad - Only visible on small/medium screens */}
        <div className="block lg:hidden">
          <AdSpace position="top-mobile" />
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Left Ad Space - Hidden on small/medium screens */}
          <div className="hidden min-w-[200px] max-w-[250px] lg:block">
            <AdSpace position="left" />
          </div>

          {/* Main Content */}
          <div className="flex-1 text-muted-foreground leading-[60px]">{children}</div>

          {/* Right Ad Space - Hidden on small/medium screens */}
          <div className="hidden min-w-[200px] max-w-[250px] lg:block">
            <AdSpace position="right" />
          </div>
        </div>
      </div>
    </div>
  );
};
