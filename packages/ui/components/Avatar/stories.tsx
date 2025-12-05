import { UserIcon } from '@heroicons/react/24/solid';
import type { Meta, StoryObj } from '@storybook/react';

import { Avatar, AvatarGroup } from './';

const meta = {
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
};

export const WithInitials: Story = {
  args: {
    displayName: 'John Doe',
  },
};

export const WithSingleName: Story = {
  args: {
    displayName: 'John',
  },
};

export const WithLongName: Story = {
  args: {
    displayName: 'John Michael Smith',
  },
};

export const WithIcon: Story = {
  args: {
    icon: <UserIcon />,
  },
};

export const WithoutProps: Story = {
  args: {},
};

export const WithCustomSize: Story = {
  args: {
    displayName: 'Jane Smith',
    className: 'size-16',
  },
};

export const Small: Story = {
  args: {
    displayName: 'JD',
    className: 'size-8',
  },
};

export const Large: Story = {
  args: {
    displayName: 'John Doe',
    className: 'size-20',
  },
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Avatar displayName="John Doe" color="gray" />
        <span className="text-muted-foreground text-sm">Gray (default)</span>
      </div>
      <div className="flex items-center gap-4">
        <Avatar displayName="John Doe" color="orange" />
        <span className="text-muted-foreground text-sm">Orange</span>
      </div>
      <div className="flex items-center gap-4">
        <Avatar displayName="John Doe" color="yellow" />
        <span className="text-muted-foreground text-sm">Yellow</span>
      </div>
      <div className="flex items-center gap-4">
        <Avatar displayName="John Doe" color="blue" />
        <span className="text-muted-foreground text-sm">Blue</span>
      </div>
      <div className="flex items-center gap-4">
        <Avatar displayName="John Doe" color="green" />
        <span className="text-muted-foreground text-sm">Green</span>
      </div>
      <div className="flex items-center gap-4">
        <Avatar displayName="John Doe" color="purple" />
        <span className="text-muted-foreground text-sm">Purple</span>
      </div>
      <div className="flex items-center gap-4">
        <Avatar displayName="John Doe" color="red" />
        <span className="text-muted-foreground text-sm">Red</span>
      </div>
    </div>
  ),
};

export const AsAvatarGroup: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar
        displayName="John Doe"
        className="size-6"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
      />
      <Avatar
        displayName="Jane Smith"
        className="size-6"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
      />
      <Avatar displayName="Jim Beam" className="size-6" />
    </AvatarGroup>
  ),
};
