import { useEffect, useState } from 'react';
import { ArrowRightIcon, CheckIcon, PlusIcon } from '@heroicons/react/24/outline';
import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from '../Avatar';
import { Button } from './';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="error">Error</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button loading>Loading</Button>
      <Button variant="secondary" loading>
        Loading
      </Button>
      <Button variant="outline" loading>
        Loading
      </Button>
      <Button variant="ghost" loading>
        Loading
      </Button>
      <Button variant="link" loading>
        Loading
      </Button>
      <Button variant="error" loading>
        Loading
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Disabled</Button>
      <Button variant="secondary" disabled>
        Disabled
      </Button>
      <Button variant="outline" disabled>
        Disabled
      </Button>
      <Button variant="ghost" disabled>
        Disabled
      </Button>
      <Button variant="link" disabled>
        Disabled
      </Button>
      <Button variant="error" disabled>
        Disabled
      </Button>
    </div>
  ),
};

export const IconLeft: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button iconLeft={<PlusIcon />}>Add Item</Button>
      <Button variant="secondary" iconLeft={<CheckIcon />}>
        Confirm
      </Button>
      <Button variant="outline" iconLeft={<PlusIcon />}>
        Add Item
      </Button>
      <Button variant="ghost" iconLeft={<CheckIcon />}>
        Save
      </Button>
    </div>
  ),
};

export const IconRight: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button iconRight={<ArrowRightIcon />}>Continue</Button>
      <Button variant="secondary" iconRight={<ArrowRightIcon />}>
        Next Step
      </Button>
      <Button variant="outline" iconRight={<ArrowRightIcon />}>
        Proceed
      </Button>
      <Button variant="link" iconRight={<ArrowRightIcon />}>
        Learn More
      </Button>
    </div>
  ),
};

export const IconLeftAndRight: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button iconLeft={<PlusIcon />} iconRight={<ArrowRightIcon />}>
        Add and Continue
      </Button>
      <Button variant="secondary" iconLeft={<CheckIcon />} iconRight={<ArrowRightIcon />}>
        Confirm and Next
      </Button>
      <Button variant="outline" iconLeft={<PlusIcon />} iconRight={<CheckIcon />}>
        Create and Save
      </Button>
    </div>
  ),
};

export const IconSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button size="sm" iconLeft={<PlusIcon />}>
          Small
        </Button>
        <Button size="md" iconLeft={<PlusIcon />}>
          Medium
        </Button>
        <Button size="lg" iconLeft={<PlusIcon />}>
          Large
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Button size="sm" iconRight={<ArrowRightIcon />}>
          Small
        </Button>
        <Button size="md" iconRight={<ArrowRightIcon />}>
          Medium
        </Button>
        <Button size="lg" iconRight={<ArrowRightIcon />}>
          Large
        </Button>
      </div>
    </div>
  ),
};

export const IconLeftWithLoading: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const interval = setInterval(() => {
        setLoading((prev) => !prev);
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="flex flex-wrap gap-4">
        <Button iconLeft={<PlusIcon />} loading={loading}>
          Add Item
        </Button>
        <Button variant="secondary" iconLeft={<CheckIcon />} loading={loading}>
          Confirm
        </Button>
        <Button variant="outline" iconLeft={<PlusIcon />} loading={loading}>
          Add Item
        </Button>
      </div>
    );
  },
};

export const AsChild: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button asChild>
        <a href="#example">Link Button</a>
      </Button>
      <Button variant="secondary" asChild>
        <a href="#example">Secondary Link</a>
      </Button>
    </div>
  ),
};

export const CustomContentExample: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>
        <Avatar
          className="size-4"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
          displayName="User"
        />
        With Avatar
      </Button>
    </div>
  ),
};
