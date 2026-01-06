import type React from 'react';

import { AdSpace } from '@lotto/ui';

import { adConfig } from '@/domains/ads/config';
import { Header } from '@/domains/shell';
import { useSubscriptionTier } from '@/domains/subscription';

export interface PageLayoutProps {
  children: React.JSX.Element;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  const { isPro } = useSubscriptionTier();
  const showAds = !isPro;

  return (
    <div className="container mx-auto max-w-screen-xl px-4">
      <div className="py-4">
        <Header />

        <div className={`flex${showAds ? ' gap-6' : ''}`}>
          {/* Main Content */}
          <div className="min-w-0 flex-1">{children}</div>

          {/* Right Sidebar Ad - Desktop only */}
          {showAds && (
            <div className="hidden lg:block">
              <AdSpace position="sidebar" {...adConfig.getAdProps('sidebar')} />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Mobile Ad - Fixed at bottom, mobile only */}
      {showAds && (
        <div className="block lg:hidden">
          <AdSpace position="bottom-mobile" {...adConfig.getAdProps('bottom-mobile')} />
        </div>
      )}
    </div>
  );
};
