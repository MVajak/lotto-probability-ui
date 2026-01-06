/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Google AdSense
  readonly VITE_ADSENSE_CLIENT_ID?: string;
  readonly VITE_ADSENSE_SLOT_SIDEBAR?: string;
  readonly VITE_ADSENSE_SLOT_MOBILE?: string;
  readonly VITE_ADSENSE_SLOT_INCONTENT?: string;
  readonly VITE_ADSENSE_SLOT_DIALOG?: string;
  // Vite built-in env variables
  readonly MODE: string;
  readonly BASE_URL: string;
  readonly PROD: boolean;
  readonly DEV: boolean;
  readonly SSR: boolean;
}
