import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '../Input';
import { Label } from './';

const meta = {
  component: Label,
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <Label>Basic Label</Label>,
};

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="example-input">Email Address</Label>
      <Input id="example-input" type="email" placeholder="email@example.com" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="disabled-input">Disabled Field</Label>
      <Input id="disabled-input" placeholder="This field is disabled" disabled />
    </div>
  ),
};

export const WithCustomClassName: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="custom-input" className="text-display-large text-muted-foreground">
        Custom Styled Label
      </Label>
      <Input id="custom-input" placeholder="Input with custom label styling" />
    </div>
  ),
};
