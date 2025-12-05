import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './';

const meta = {
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    placeholder: 'Input',
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Input',
    'aria-invalid': true,
  },
};

export const WithDisabled: Story = {
  args: {
    placeholder: 'Input',
    disabled: true,
  },
};

export const WithErrorAndDisabled: Story = {
  args: {
    placeholder: 'Input',
    'aria-invalid': true,
    disabled: true,
  },
};
