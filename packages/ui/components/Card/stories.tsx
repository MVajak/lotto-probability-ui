import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { IconButton } from '../IconButton';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  InteractiveCard as InteractiveCardComponent,
} from './';

const meta = {
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <CardContent>This is a simple card with just content.</CardContent>,
  },
};

export const WithHeader: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a description of the card content.</CardDescription>
      </CardHeader>
      <CardContent>This is the main content of the card.</CardContent>
    </Card>
  ),
};

export const WithHeaderAndAction: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This card has an action button in the header.</CardDescription>
        <CardAction>
          <IconButton variant="ghost" label="More options" size="sm">
            <EllipsisHorizontalIcon />
          </IconButton>
        </CardAction>
      </CardHeader>
      <CardContent>Content goes here.</CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This card has a footer with actions.</CardDescription>
      </CardHeader>
      <CardContent>Main content area.</CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save</Button>
      </CardFooter>
    </Card>
  ),
};

export const Complete: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Complete Card</CardTitle>
        <CardDescription>This card shows all components together.</CardDescription>
        <CardAction>
          <IconButton variant="ghost" label="More options">
            <EllipsisHorizontalIcon />
          </IconButton>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>This is the main content area of the card.</p>
        <p>You can put any content here, including forms, lists, or other components.</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button variant="outline" size="sm">
          Secondary Action
        </Button>
        <Button size="sm">Primary Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithLongContent: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card with Long Content</CardTitle>
        <CardDescription>This demonstrates how the card handles longer content.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
        <p className="mb-4">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <ul className="list-disc pl-6">
          <li>First item</li>
          <li>Second item</li>
          <li>Third item</li>
        </ul>
      </CardContent>
    </Card>
  ),
};

export const MultipleCards: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Card 1</CardTitle>
          <CardDescription>First card in a grid.</CardDescription>
        </CardHeader>
        <CardContent>Content for card 1.</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Card 2</CardTitle>
          <CardDescription>Second card in a grid.</CardDescription>
        </CardHeader>
        <CardContent>Content for card 2.</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Card 3</CardTitle>
          <CardDescription>Third card in a grid.</CardDescription>
        </CardHeader>
        <CardContent>Content for card 3.</CardContent>
      </Card>
    </div>
  ),
};

export const WithCustomStyles: Story = {
  render: () => (
    <div className="space-y-4">
      <Card className="bg-accent">
        <CardHeader>
          <CardTitle>Custom Background</CardTitle>
          <CardDescription>Card with accent background.</CardDescription>
        </CardHeader>
        <CardContent>This card has a custom background color.</CardContent>
      </Card>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Custom Shadow</CardTitle>
          <CardDescription>Card with enhanced shadow.</CardDescription>
        </CardHeader>
        <CardContent>This card has a larger shadow effect.</CardContent>
      </Card>
    </div>
  ),
};

export const Minimal: Story = {
  render: () => (
    <Card>
      <CardContent>
        <p>This is a minimal card with no header or footer, just content.</p>
      </CardContent>
    </Card>
  ),
};

export const LargePadding: Story = {
  render: () => (
    <Card className="py-6">
      <CardHeader>
        <CardTitle>Card with Large Padding</CardTitle>
        <CardDescription>This card uses the large padding variant for more spacious content.</CardDescription>
        <CardAction>
          <IconButton variant="ghost" label="More options">
            <EllipsisHorizontalIcon />
          </IconButton>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Notice the increased padding around the content areas.</p>
        <p>The header, content, and footer all have more breathing room with px-6 instead of px-4.</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save</Button>
      </CardFooter>
    </Card>
  ),
};

export const InteractiveCard: Story = {
  render: () => (
    <div className="space-y-4">
      <InteractiveCardComponent
        onClick={() => alert('Card clicked!')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            alert('Card activated!');
          }
        }}
      >
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>Hover to see shadow effect, click to see active state.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has interactive states:</p>
          <ul className="mt-2 list-disc pl-6">
            <li>Hover: Larger shadow (shadow-lg)</li>
            <li>Active/Click: Accent background</li>
            <li>Smooth transitions for all states</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button size="sm">Click me</Button>
        </CardFooter>
      </InteractiveCardComponent>
      <InteractiveCardComponent>
        <CardHeader>
          <CardTitle>Another Interactive Card</CardTitle>
          <CardDescription>Perfect for clickable card lists or navigation items.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Use InteractiveCard when you need clickable cards with visual feedback.</p>
        </CardContent>
      </InteractiveCardComponent>
    </div>
  ),
};
