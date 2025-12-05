import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { Popover, PopoverContent, PopoverTrigger } from './';

const meta = {
  component: Popover,
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Dimensions</h4>
          <p className="text-muted-foreground text-sm">Set the dimensions for the layer.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open form</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-muted-foreground text-sm">Set the dimensions for the layer.</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="width" className="text-sm">
                Width
              </label>
              <input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8 rounded-md border border-input bg-background px-3 text-sm"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="height" className="text-sm">
                Height
              </label>
              <input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8 rounded-md border border-input bg-background px-3 text-sm"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithList: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open menu</Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="space-y-2">
          <div className="px-2 py-1.5 font-semibold text-sm">Actions</div>
          <div className="space-y-1">
            <button type="button" className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent">
              Edit
            </button>
            <button type="button" className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent">
              Duplicate
            </button>
            <button type="button" className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent">
              Delete
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8 p-8">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Top</Button>
        </PopoverTrigger>
        <PopoverContent side="top">
          <p>Popover on top</p>
        </PopoverContent>
      </Popover>
      <div className="flex gap-8">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Left</Button>
          </PopoverTrigger>
          <PopoverContent side="left">
            <p>Popover on left</p>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Right</Button>
          </PopoverTrigger>
          <PopoverContent side="right">
            <p>Popover on right</p>
          </PopoverContent>
        </Popover>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom">
          <p>Popover on bottom</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const WithAlignment: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8 p-8">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Start</Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <p>Aligned to start</p>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Center</Button>
        </PopoverTrigger>
        <PopoverContent align="center">
          <p>Aligned to center</p>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">End</Button>
        </PopoverTrigger>
        <PopoverContent align="end">
          <p>Aligned to end</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const WithCustomOffset: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8 p-8">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Default Offset</Button>
        </PopoverTrigger>
        <PopoverContent>
          <p>Default side offset (4px)</p>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Custom Offset</Button>
        </PopoverTrigger>
        <PopoverContent sideOffset={20}>
          <p>Custom side offset (20px)</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const WithRichContent: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">View details</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Project Details</h4>
            <p className="text-muted-foreground text-sm">Information about the selected project.</p>
          </div>
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">Status:</span> Active
            </div>
            <div className="text-sm">
              <span className="font-medium">Created:</span> January 15, 2024
            </div>
            <div className="text-sm">
              <span className="font-medium">Members:</span> 12
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
