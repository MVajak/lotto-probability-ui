import type { StorybookConfig } from '@storybook/react-vite';
import react from '@vitejs/plugin-react';
import { type InlineConfig, mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../../../packages/ui/**/*.stories.@(ts|tsx)', '../../../packages/ui/**/stories.@(ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config: InlineConfig) {
    return mergeConfig(config, {
      plugins: [react()],
    });
  },
};
export default config;
