import type { Meta, StoryObj } from '@storybook/react';

import { Separator } from './';

const meta = {
  component: Separator,
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-1">
        <h4 className="font-medium text-sm leading-none">Radix Primitives</h4>
        <p className="text-muted-foreground text-sm">An open-source UI component library.</p>
      </div>
      <Separator />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-1">
        <h4 className="font-medium text-sm leading-none">Section 1</h4>
        <p className="text-muted-foreground text-sm">Content above the separator.</p>
      </div>
      <Separator orientation="horizontal" />
      <div className="space-y-1">
        <h4 className="font-medium text-sm leading-none">Section 2</h4>
        <p className="text-muted-foreground text-sm">Content below the separator.</p>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-20 items-center space-x-4">
      <div className="text-sm">Left</div>
      <Separator orientation="vertical" />
      <div className="text-sm">Center</div>
      <Separator orientation="vertical" />
      <div className="text-sm">Right</div>
    </div>
  ),
};

export const InList: Story = {
  render: () => (
    <div className="w-64 space-y-2 rounded-lg border p-4">
      <div className="px-2 py-1.5 font-semibold text-sm">Navigation</div>
      <div className="space-y-1">
        <button type="button" className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent">
          Home
        </button>
        <button type="button" className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent">
          About
        </button>
        <button type="button" className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent">
          Contact
        </button>
      </div>
      <Separator />
      <div className="space-y-1">
        <button type="button" className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent">
          Settings
        </button>
        <button type="button" className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent">
          Logout
        </button>
      </div>
    </div>
  ),
};

export const MultipleSeparators: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-1">
        <h4 className="font-medium text-sm leading-none">Section 1</h4>
        <p className="text-muted-foreground text-sm">First section content.</p>
      </div>
      <Separator />
      <div className="space-y-1">
        <h4 className="font-medium text-sm leading-none">Section 2</h4>
        <p className="text-muted-foreground text-sm">Second section content.</p>
      </div>
      <Separator />
      <div className="space-y-1">
        <h4 className="font-medium text-sm leading-none">Section 3</h4>
        <p className="text-muted-foreground text-sm">Third section content.</p>
      </div>
    </div>
  ),
};

export const WithSpacing: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-1">
        <h4 className="font-medium text-sm leading-none">Top Section</h4>
        <p className="text-muted-foreground text-sm">Content with more spacing.</p>
      </div>
      <Separator />
      <div className="space-y-1">
        <h4 className="font-medium text-sm leading-none">Bottom Section</h4>
        <p className="text-muted-foreground text-sm">Content with more spacing.</p>
      </div>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="w-80 rounded-lg border p-6">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg">Card Title</h3>
          <p className="text-muted-foreground text-sm">Card description goes here.</p>
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Item 1</span>
            <span className="font-medium">$10</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Item 2</span>
            <span className="font-medium">$20</span>
          </div>
        </div>
        <Separator />
        <div className="flex justify-between font-semibold text-sm">
          <span>Total</span>
          <span>$30</span>
        </div>
      </div>
    </div>
  ),
};
