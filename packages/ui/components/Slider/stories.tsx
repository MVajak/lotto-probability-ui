import type { Meta, StoryObj } from '@storybook/react';

import { Slider } from './';

const meta = {
  component: Slider,
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
  },
};

export const WithStep: Story = {
  args: {
    defaultValue: [20],
    min: 0,
    max: 100,
    step: 10,
  },
};
