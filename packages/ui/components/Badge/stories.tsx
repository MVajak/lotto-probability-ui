import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './';

const meta = {
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Badge',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Badge',
    variant: 'outline',
  },
};

export const Success: Story = {
  args: {
    children: 'Badge',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Badge',
    variant: 'warning',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Badge',
    variant: 'destructive',
  },
};

export const Info: Story = {
  args: {
    children: 'Badge',
    variant: 'info',
  },
};

export const WithLongText: Story = {
  args: {
    children: 'This is a longer badge text',
    variant: 'default',
  },
};

export const WithCustomClassName: Story = {
  args: {
    children: 'Custom Badge',
    className: 'uppercase',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <CheckIcon className="size-3" /> Hello
      </>
    ),
    variant: 'default',
  },
};

export const WithLargeSize: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'lg',
  },
};

export const AsInteractive: Story = {
  args: {
    children: (
      <button type="button">
        Interactive
        <ChevronDownIcon className="size-3" />
      </button>
    ),
    variant: 'secondary',
    asChild: true,
  },
};

export const AllVariantsAsInteractiveAndLarge: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default" size="lg" asChild>
        <button type="button">Default</button>
      </Badge>
      <Badge variant="secondary" size="lg" asChild>
        <button type="button">Secondary</button>
      </Badge>
      <Badge variant="outline" size="lg" asChild>
        <button type="button">Outline</button>
      </Badge>
      <Badge variant="success" size="lg" asChild>
        <button type="button">Positive</button>
      </Badge>
      <Badge variant="destructive" size="lg" asChild>
        <button type="button">Destructive</button>
      </Badge>
      <Badge variant="warning" size="lg" asChild>
        <button type="button">Warning</button>
      </Badge>
      <Badge variant="info" size="lg" asChild>
        <button type="button">Info</button>
      </Badge>
    </div>
  ),
};
