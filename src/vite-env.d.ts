/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_ADSENSE_CLIENT_ID: string;
  readonly VITE_ADSENSE_MOBILE_SLOT: string;
  readonly VITE_ADSENSE_INCONTENT_SLOT: string;
  readonly VITE_ADSENSE_SIDEBAR_SLOT: string;
  readonly VITE_SHOW_AD_PLACEHOLDERS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
