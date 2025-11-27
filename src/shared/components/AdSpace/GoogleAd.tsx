import type React from 'react';
import { useEffect } from 'react';

// Extend the Window interface to include adsbygoogle
declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

interface GoogleAdProps {
  slot: string;
  format?: string;
  responsive?: boolean;
}

/**
 * Google AdSense Ad Component
 * Renders a Google AdSense ad unit
 *
 * @param slot - Your AdSense Ad Slot ID (e.g., "1234567890")
 * @param format - Ad format: "auto", "horizontal", "vertical", "rectangle" (default: "auto")
 * @param responsive - Whether the ad should be responsive (default: false)
 */
export const GoogleAd: React.FC<GoogleAdProps> = ({ slot, format, responsive }) => {
  useEffect(() => {
    try {
      // Push ad to AdSense
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXX'}
      data-ad-slot={slot}
      data-ad-format={format || 'auto'}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  );
};
