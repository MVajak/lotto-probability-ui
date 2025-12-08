'use client';

import type React from 'react';
import { useEffect } from 'react';

import { cn } from '../../utils';

declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

interface GoogleAdProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  responsive?: boolean;
  clientId: string;
}

export const GoogleAd: React.FC<GoogleAdProps> = ({ slot, format = 'auto', responsive = false, clientId }) => {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle block"
      data-ad-client={clientId}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  );
};

type AdPosition = 'left' | 'right' | 'top-mobile' | 'in-content';

interface AdSpaceProps {
  position: AdPosition;
  showPlaceholder?: boolean;
  slot?: string;
  clientId?: string;
  className?: string;
}

const containerStyles = {
  base: 'flex flex-col items-center justify-center border border-dashed border-border bg-muted',
  side: 'h-[770px] p-4',
  mobile: 'mb-4 min-h-[70px] p-2',
  inContent: 'my-6 min-h-[100px] max-h-[120px] p-1',
};

const placeholderStyles = 'flex h-full w-full items-center justify-center bg-muted-foreground/10';

export const AdSpace: React.FC<AdSpaceProps> = ({ position, showPlaceholder = false, slot, clientId, className }) => {
  if (showPlaceholder) {
    if (position === 'top-mobile') {
      return (
        <div className={cn(containerStyles.base, containerStyles.mobile, className)}>
          <span className="mb-1 text-muted-foreground text-xs">Advertisement</span>
          <div className={cn(placeholderStyles, 'h-[50px] max-w-[320px]')}>
            <span className="text-center text-muted-foreground text-xs">
              Mobile Banner
              <br />
              320x50
            </span>
          </div>
        </div>
      );
    }

    if (position === 'in-content') {
      return (
        <div className={cn(containerStyles.base, containerStyles.inContent, className)}>
          <div className={placeholderStyles}>
            <span className="text-muted-foreground text-xs">Advertisement - In-Content (320x100)</span>
          </div>
        </div>
      );
    }

    return (
      <div className={cn(containerStyles.base, containerStyles.side, className)}>
        <span className="mb-1 text-muted-foreground text-sm">Advertisement</span>
        <div className={placeholderStyles}>
          <span className="text-center text-muted-foreground text-xs">
            {position === 'left' ? 'Left Ad Space' : 'Right Ad Space'}
            <br />
            300x600
          </span>
        </div>
      </div>
    );
  }

  if (!slot || !clientId) return null;

  const isSidebar = position === 'left' || position === 'right';
  const format = isSidebar ? 'vertical' : 'horizontal';
  const responsive = !isSidebar;

  const getContainerStyle = () => {
    if (position === 'top-mobile') return containerStyles.mobile;
    if (position === 'in-content') return containerStyles.inContent;
    return containerStyles.side;
  };

  return (
    <div className={cn(containerStyles.base, getContainerStyle(), className)}>
      <GoogleAd slot={slot} format={format} responsive={responsive} clientId={clientId} />
    </div>
  );
};
