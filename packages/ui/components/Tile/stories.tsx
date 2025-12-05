import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Tile, TileEmpty, TileWrapper } from './';

const meta = {
  component: Tile,
  args: {
    title: 'Default Title',
  },
} satisfies Meta<typeof Tile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'My Tile',
    children: (
      <div className="space-y-2">
        <div className="rounded-md bg-background p-3 text-sm">Item 1</div>
        <div className="rounded-md bg-background p-3 text-sm">Item 2</div>
        <div className="rounded-md bg-background p-3 text-sm">Item 3</div>
      </div>
    ),
  },
};

export const WithActions: Story = {
  args: {
    title: 'Tile with Actions',
    actions: (
      <IconButton variant="ghost" label="More options">
        <EllipsisHorizontalIcon />
      </IconButton>
    ),
    children: (
      <div className="space-y-2">
        <div className="rounded-md bg-background p-3 text-sm">Item 1</div>
        <div className="rounded-md bg-background p-3 text-sm">Item 2</div>
        <div className="rounded-md bg-background p-3 text-sm">Item 3</div>
      </div>
    ),
  },
};

export const WithButtonActions: Story = {
  args: {
    title: 'Tile with Button',
    actions: (
      <Button size="sm" variant="outline">
        Action
      </Button>
    ),
    children: (
      <div className="space-y-2">
        <div className="rounded-md bg-background p-3 text-sm">Item 1</div>
        <div className="rounded-md bg-background p-3 text-sm">Item 2</div>
        <div className="rounded-md bg-background p-3 text-sm">Item 3</div>
      </div>
    ),
  },
};

export const WithManyItems: Story = {
  args: {
    title: 'Scrollable Tile',
    className: 'h-90',
    children: (
      <div className="space-y-2">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="rounded-md bg-background p-3 text-sm">
            Item {i + 1}
          </div>
        ))}
      </div>
    ),
  },
};

export const Empty: Story = {
  args: {
    title: 'Empty Tile',
    children: (
      <TileEmpty
        title="No items"
        avatar={
          <div className="flex size-10 items-center justify-center rounded-full bg-muted">
            <span className="text-lg">📋</span>
          </div>
        }
      >
        There are no items to display. Add some items to get started.
      </TileEmpty>
    ),
  },
};

export const EmptyWithCustomAvatar: Story = {
  args: {
    title: 'Empty State',
    children: (
      <TileEmpty
        title="Nothing here"
        avatar={
          <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="text-lg">✨</span>
          </div>
        }
      >
        This tile is empty. You can add content by clicking the action button above.
      </TileEmpty>
    ),
  },
};

export const MultipleTiles: Story = {
  render: () => (
    <TileWrapper>
      <Tile title="Tile 1">
        <div className="space-y-2">
          <div className="rounded-md bg-background p-3 text-sm">Item A</div>
          <div className="rounded-md bg-background p-3 text-sm">Item B</div>
        </div>
      </Tile>
      <Tile title="Tile 2">
        <div className="space-y-2">
          <div className="rounded-md bg-background p-3 text-sm">Item X</div>
          <div className="rounded-md bg-background p-3 text-sm">Item Y</div>
          <div className="rounded-md bg-background p-3 text-sm">Item Z</div>
        </div>
      </Tile>
      <Tile title="Tile 3">
        <TileEmpty
          title="Empty"
          avatar={
            <div className="flex size-10 items-center justify-center rounded-full bg-muted">
              <span className="text-lg">📦</span>
            </div>
          }
        >
          This tile is empty.
        </TileEmpty>
      </Tile>
    </TileWrapper>
  ),
};

export const WithLongTitle: Story = {
  args: {
    title: 'This is a very long title that might wrap to multiple lines',
    children: (
      <div className="space-y-2">
        <div className="rounded-md bg-background p-3 text-sm">Item 1</div>
        <div className="rounded-md bg-background p-3 text-sm">Item 2</div>
        <div className="rounded-md bg-background p-3 text-sm">Item 3</div>
      </div>
    ),
  },
};

export const WithComplexContent: Story = {
  args: {
    title: 'Complex Content',
    actions: (
      <IconButton variant="ghost" label="More options">
        <EllipsisHorizontalIcon />
      </IconButton>
    ),
    children: (
      <div className="space-y-2">
        <div className="rounded-md bg-background p-3">
          <div className="font-medium">Task 1</div>
          <div className="text-muted-foreground text-sm">Description for task 1</div>
        </div>
        <div className="rounded-md bg-background p-3">
          <div className="font-medium">Task 2</div>
          <div className="text-muted-foreground text-sm">Description for task 2</div>
        </div>
        <div className="rounded-md bg-background p-3">
          <div className="font-medium">Task 3</div>
          <div className="text-muted-foreground text-sm">Description for task 3</div>
        </div>
      </div>
    ),
  },
};
