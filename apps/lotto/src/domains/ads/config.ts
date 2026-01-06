import { config } from '@/config';

export type AdPosition = 'sidebar' | 'bottom-mobile' | 'in-content' | 'dialog';

const slotMap: Record<AdPosition, string> = {
  sidebar: config.adsense.slots.sidebar,
  'bottom-mobile': config.adsense.slots.mobile,
  'in-content': config.adsense.slots.incontent,
  dialog: config.adsense.slots.dialog,
};

export const adConfig = {
  clientId: config.adsense.clientId,
  showPlaceholder: config.isDev,
  getSlot: (position: AdPosition) => slotMap[position],
  getAdProps: (position: AdPosition) => ({
    clientId: config.adsense.clientId,
    slot: slotMap[position],
    showPlaceholder: config.isDev,
  }),
};