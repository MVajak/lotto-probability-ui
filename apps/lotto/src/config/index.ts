export const config = {
  api: {
    url: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  },
  adsense: {
    clientId: import.meta.env.VITE_ADSENSE_CLIENT_ID || '',
    slots: {
      sidebar: import.meta.env.VITE_ADSENSE_SLOT_SIDEBAR || '',
      mobile: import.meta.env.VITE_ADSENSE_SLOT_MOBILE || '',
      incontent: import.meta.env.VITE_ADSENSE_SLOT_INCONTENT || '',
      dialog: import.meta.env.VITE_ADSENSE_SLOT_DIALOG || '',
    },
  },
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};