import { InformationCircleIcon, PlusIcon } from '@heroicons/react/24/outline';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Tooltip, TooltipContent, TooltipTrigger } from './';

const meta = {
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Short tooltip</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Short text</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Long tooltip</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            This is a longer tooltip that demonstrates how the component handles multiple words and longer text content.
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8 p-8">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Tooltip on top</p>
        </TooltipContent>
      </Tooltip>
      <div className="flex gap-8">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Left</Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Tooltip on left</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Right</Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Tooltip on right</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Tooltip on bottom</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const WithIconButton: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <IconButton variant="ghost" label="Add item">
            <PlusIcon />
          </IconButton>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add new item</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <IconButton variant="ghost" label="Information">
            <InformationCircleIcon />
          </IconButton>
        </TooltipTrigger>
        <TooltipContent>
          <p>More information</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Info</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-semibold">Important Information</p>
          <p className="text-sm opacity-90">
            This tooltip contains multiple lines of text to demonstrate custom content.
          </p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Warning</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>⚠️ This action cannot be undone</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const WithSideOffset: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8 p-8">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Default Offset</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Default side offset (0px)</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Custom Offset</Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={20}>
          <p>Custom side offset (20px)</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" disabled>
          Disabled Button
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This button is disabled</p>
      </TooltipContent>
    </Tooltip>
  ),
};
