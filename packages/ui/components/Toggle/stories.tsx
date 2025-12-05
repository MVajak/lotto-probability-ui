import { useState } from 'react';
import { BoldIcon, ItalicIcon, UnderlineIcon } from '@heroicons/react/24/outline';
import type { Meta, StoryObj } from '@storybook/react';

import { Toggle } from './';

const meta = {
  component: Toggle,
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Toggle aria-label="Toggle">Toggle</Toggle>,
};

export const Pressed: Story = {
  render: () => (
    <Toggle aria-label="Toggle" pressed>
      Toggle
    </Toggle>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Toggle variant="ghost" aria-label="Ghost toggle">
        Ghost
      </Toggle>
      <Toggle variant="outline" aria-label="Outline toggle">
        Outline
      </Toggle>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle size="sm" aria-label="Small toggle">
        Small
      </Toggle>
      <Toggle size="lg" aria-label="Large toggle">
        Large
      </Toggle>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle aria-label="Bold">
        <BoldIcon />
      </Toggle>
      <Toggle aria-label="Italic">
        <ItalicIcon />
      </Toggle>
      <Toggle aria-label="Underline">
        <UnderlineIcon />
      </Toggle>
    </div>
  ),
};

export const WithIconsAndText: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Toggle aria-label="Bold">
        <BoldIcon />
        Bold
      </Toggle>
      <Toggle aria-label="Italic">
        <ItalicIcon />
        Italic
      </Toggle>
      <Toggle aria-label="Underline">
        <UnderlineIcon />
        Underline
      </Toggle>
    </div>
  ),
};

export const TextFormatting: Story = {
  render: () => (
    <div className="flex gap-2 rounded-md border p-2">
      <Toggle aria-label="Bold" variant="ghost" size="sm">
        <BoldIcon />
      </Toggle>
      <Toggle aria-label="Italic" variant="ghost" size="sm">
        <ItalicIcon />
      </Toggle>
      <Toggle aria-label="Underline" variant="ghost" size="sm">
        <UnderlineIcon />
      </Toggle>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Toggle disabled aria-label="Disabled toggle">
        Disabled
      </Toggle>
      <Toggle disabled pressed aria-label="Disabled pressed toggle">
        Disabled Pressed
      </Toggle>
    </div>
  ),
};

export const PressedStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Toggle aria-label="Unpressed ghost" variant="ghost">
        Unpressed
      </Toggle>
      <Toggle aria-label="Pressed ghost" variant="ghost" pressed>
        Pressed
      </Toggle>
      <Toggle aria-label="Unpressed outline" variant="outline">
        Unpressed
      </Toggle>
      <Toggle aria-label="Pressed outline" variant="outline" pressed>
        Pressed
      </Toggle>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex gap-2 rounded-md border p-2">
          <Toggle aria-label="Bold" variant="ghost" size="sm" pressed={bold} onPressedChange={setBold}>
            <BoldIcon />
          </Toggle>
          <Toggle aria-label="Italic" variant="ghost" size="sm" pressed={italic} onPressedChange={setItalic}>
            <ItalicIcon />
          </Toggle>
          <Toggle aria-label="Underline" variant="ghost" size="sm" pressed={underline} onPressedChange={setUnderline}>
            <UnderlineIcon />
          </Toggle>
        </div>
        <div className="text-sm">
          <div>Bold: {bold ? 'On' : 'Off'}</div>
          <div>Italic: {italic ? 'On' : 'Off'}</div>
          <div>Underline: {underline ? 'On' : 'Off'}</div>
        </div>
      </div>
    );
  },
};
