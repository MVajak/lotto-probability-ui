import {
  CalendarIcon,
  ClipboardDocumentIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
  EyeIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import type { Meta, StoryObj } from '@storybook/react';

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from './';

const meta = {
  component: InputGroup,
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInlineStartIcon: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText>
          <MagnifyingGlassIcon className="size-4" />
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
};

export const WithInlineEndIcon: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Enter email" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>
          <EnvelopeIcon className="size-4" />
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithInlineStartText: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
    </InputGroup>
  ),
};

export const WithInlineEndText: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Enter amount" type="number" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>USD</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithInlineStartButton: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupButton size="icon-xs">
          <MagnifyingGlassIcon className="size-4" />
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
};

export const WithInlineEndButton: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput type="password" placeholder="Enter password" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs">
          <EyeIcon className="size-4" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithBothInlineAddons: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText>
          <CurrencyDollarIcon className="size-4" />
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="0.00" type="number" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>USD</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithBlockStartAddon: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="block-start">
        <InputGroupText>
          <CalendarIcon className="size-4" />
          Date
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupInput type="date" />
    </InputGroup>
  ),
};

export const WithBlockEndAddon: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Enter value" />
      <InputGroupAddon align="block-end">
        <InputGroupText>Additional information</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithBlockAddonsAndButton: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="block-start">
        <InputGroupText>API Key</InputGroupText>
        <InputGroupButton size="xs">
          <ClipboardDocumentIcon className="size-4" />
          Copy
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupInput placeholder="sk_test_..." readOnly />
    </InputGroup>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="block-start">
        <InputGroupText>Description</InputGroupText>
      </InputGroupAddon>
      <InputGroupTextarea placeholder="Enter description..." rows={4} />
    </InputGroup>
  ),
};

export const WithTextareaAndButtons: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="block-start">
        <InputGroupText>Message</InputGroupText>
      </InputGroupAddon>
      <InputGroupTextarea placeholder="Type your message..." rows={4} />
      <InputGroupAddon align="block-end">
        <InputGroupButton size="sm">Send</InputGroupButton>
        <InputGroupButton size="sm" variant="outline">
          Cancel
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithError: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText>
          <EnvelopeIcon className="size-4" />
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="email@example.com" aria-invalid={true} />
    </InputGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <InputGroup data-disabled="true">
      <InputGroupAddon align="inline-start">
        <InputGroupText>
          <MagnifyingGlassIcon className="size-4" />
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." disabled />
    </InputGroup>
  ),
};

export const ComplexExample: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupButton size="icon-xs">
          <MagnifyingGlassIcon className="size-4" />
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupInput placeholder="Search files..." />
      <InputGroupAddon align="inline-end">
        <InputGroupText>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-medium font-mono text-[10px] text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
};
