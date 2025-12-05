import { EllipsisHorizontalIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { Meta, StoryObj } from '@storybook/react';

import { IconButton } from './';

const meta = {
  component: IconButton,
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <EllipsisHorizontalIcon />,
    label: 'More options',
  },
};

export const Primary: Story = {
  args: {
    children: <PencilIcon />,
    variant: 'primary',
    label: 'Edit',
  },
};

export const Secondary: Story = {
  args: {
    children: <PencilIcon />,
    variant: 'secondary',
    label: 'Edit',
  },
};

export const Outline: Story = {
  args: {
    children: <PencilIcon />,
    variant: 'outline',
    label: 'Edit',
  },
};

export const Ghost: Story = {
  args: {
    children: <EllipsisHorizontalIcon />,
    variant: 'ghost',
    label: 'More options',
  },
};

export const Link: Story = {
  args: {
    children: <PencilIcon />,
    variant: 'link',
    label: 'Edit',
  },
};

export const Danger: Story = {
  args: {
    children: <TrashIcon />,
    variant: 'error',
    label: 'Delete',
  },
};

export const Small: Story = {
  args: {
    children: <EllipsisHorizontalIcon />,
    size: 'sm',
    label: 'More options',
  },
};

export const Medium: Story = {
  args: {
    children: <EllipsisHorizontalIcon />,
    size: 'md',
    label: 'More options',
  },
};

export const Large: Story = {
  args: {
    children: <EllipsisHorizontalIcon />,
    size: 'lg',
    label: 'More options',
  },
};

export const Disabled: Story = {
  args: {
    children: <PencilIcon />,
    variant: 'primary',
    disabled: true,
    label: 'Edit',
  },
};

export const WithCustomClassName: Story = {
  args: {
    children: <PencilIcon />,
    variant: 'primary',
    className: 'ring-2 ring-destructive',
    label: 'Edit',
  },
};
