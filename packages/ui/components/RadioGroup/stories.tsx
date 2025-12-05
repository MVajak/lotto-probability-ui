import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { RadioGroup, RadioGroupItem } from './index';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('option1');
    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <RadioGroupItem value="option1" id="option1" label="Option 1" />
        <RadioGroupItem value="option2" id="option2" label="Option 2" />
        <RadioGroupItem value="option3" id="option3" label="Option 3" />
      </RadioGroup>
    );
  },
};

export const WithDescriptions: Story = {
  render: () => {
    const [value, setValue] = useState('owner');
    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <RadioGroupItem
          value="owner"
          id="owner"
          label="Owner"
          description="Full access to all data, team, and platform settings."
        />
        <RadioGroupItem
          value="adviser"
          id="adviser"
          label="Adviser"
          description="Manage clients, workflows and team roles with limited platform control."
        />
        <RadioGroupItem
          value="support"
          id="support"
          label="Paraplanner"
          description="Handle client data and operational tasks without approval or team management rights."
        />
        <RadioGroupItem
          value="viewer"
          id="viewer"
          label="View only"
          description="View client data and reports with read-only access."
        />
      </RadioGroup>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState('option1');
    return (
      <RadioGroup value={value} onValueChange={setValue} disabled>
        <RadioGroupItem value="option1" id="disabled-option1" label="Option 1" />
        <RadioGroupItem value="option2" id="disabled-option2" label="Option 2" />
        <RadioGroupItem value="option3" id="disabled-option3" label="Option 3" />
      </RadioGroup>
    );
  },
};
