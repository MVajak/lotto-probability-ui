'use client';

import type React from 'react';
import { useEffect } from 'react';

import { cn } from '@lotto/ui/utils';

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

type AdPosition = 'sidebar' | 'bottom-mobile' | 'in-content' | 'dialog';

interface AdSpaceProps {
  position: AdPosition;
  showPlaceholder?: boolean;
  slot?: string;
  clientId?: string;
  className?: string;
}

const positionConfig: Record<
  AdPosition,
  { label: string; size: string; format: 'vertical' | 'horizontal' | 'rectangle'; responsive: boolean }
> = {
  sidebar: { label: 'Sidebar Ad', size: '300x600', format: 'vertical', responsive: false },
  'bottom-mobile': { label: 'Mobile Banner', size: '320x50', format: 'horizontal', responsive: true },
  'in-content': { label: 'In-Content Ad', size: '320x100', format: 'horizontal', responsive: true },
  dialog: { label: 'Dialog Ad', size: '300x250', format: 'rectangle', responsive: true },
};

const containerStyles: Record<AdPosition, string> = {
  sidebar: 'sticky top-4 h-[600px] w-[300px]',
  'bottom-mobile':
    'fixed bottom-0 left-0 right-0 z-50 h-[80px] bg-background/95 backdrop-blur-sm border-t border-border',
  'in-content': 'my-4 min-h-[100px]',
  dialog: 'min-h-[250px]',
};

export const AdSpace: React.FC<AdSpaceProps> = ({ position, showPlaceholder = false, slot, clientId, className }) => {
  const config = positionConfig[position];

  if (showPlaceholder) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center border border-border border-dashed bg-muted/50',
          containerStyles[position],
          className
        )}
      >
        <span className="text-body-small text-muted-foreground">{config.label}</span>
        <span className="text-body-small text-muted-foreground/60">({config.size})</span>
      </div>
    );
  }

  if (!slot || !clientId) return null;

  return (
    <div className={cn(containerStyles[position], className)}>
      <GoogleAd slot={slot} format={config.format} responsive={config.responsive} clientId={clientId} />
    </div>
  );
};
