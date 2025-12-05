import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '../Label';
import { Checkbox } from './';

const meta = {
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    checked: 'indeterminate',
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Checkbox disabled />
      <Checkbox disabled checked />
      <Checkbox disabled checked="indeterminate" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const WithLabelChecked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="newsletter" checked />
      <Label htmlFor="newsletter">Subscribe to newsletter</Label>
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="required" aria-invalid />
      <Label htmlFor="required">Required field (error state)</Label>
    </div>
  ),
};

export const WithIndeterminateParent: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: '1', label: 'Item 1', checked: true },
      { id: '2', label: 'Item 2', checked: false },
      { id: '3', label: 'Item 3', checked: true },
    ]);

    const allChecked = items.every((item) => item.checked);
    const someChecked = items.some((item) => item.checked);
    const parentChecked = allChecked ? true : someChecked ? 'indeterminate' : false;

    const handleParentChange = (checked: boolean) => {
      setItems(items.map((item) => ({ ...item, checked })));
    };

    const handleItemChange = (id: string, checked: boolean) => {
      setItems(items.map((item) => (item.id === id ? { ...item, checked } : item)));
    };

    return (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all"
            checked={parentChecked}
            onCheckedChange={(checked) => handleParentChange(checked === true)}
          />
          <Label htmlFor="select-all">Select All</Label>
        </div>
        <div className="ml-6 space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox
                id={item.id}
                checked={item.checked}
                onCheckedChange={(checked) => handleItemChange(item.id, checked === true)}
              />
              <Label htmlFor={item.id}>{item.label}</Label>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
