import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from './';

const meta = {
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner className="size-3" />
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
      <Spinner className="size-12" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Spinner className="text-primary" />
        <Spinner className="text-secondary" />
        <Spinner className="text-accent" />
        <Spinner className="text-foreground" />
      </div>
      <div className="flex items-center gap-4">
        <Spinner className="text-destructive" />
        <Spinner className="text-muted-foreground" />
        <Spinner className="text-primary-red" />
      </div>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Spinner />
        <span className="text-body-default">Loading...</span>
      </div>
      <div className="flex items-center gap-3">
        <Spinner className="size-6" />
        <span className="text-body-default">Processing request</span>
      </div>
      <div className="flex items-center justify-center gap-3 rounded-lg border p-8">
        <Spinner className="size-8 text-primary" />
        <span className="text-body-default-bold">Loading data</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg border p-8">
        <Spinner className="size-12 text-primary" />
        <span className="text-body-default text-muted-foreground">Please wait while we fetch your content</span>
      </div>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Spinner className="size-6 text-primary opacity-50" />
        <Spinner className="size-6 text-primary opacity-75" />
        <Spinner className="size-6 text-primary" />
      </div>
      <div className="flex items-center gap-4">
        <Spinner className="size-8 text-destructive" />
        <Spinner className="size-8 text-destructive drop-shadow-lg" />
      </div>
    </div>
  ),
};
