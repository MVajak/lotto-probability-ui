import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { isValidEmail } from '../../utils/validators';
import { InputTags } from './';

const meta = {
  component: InputTags,
} satisfies Meta<typeof InputTags>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { value: [], onChange: () => {} },
  render: () => {
    const [tags, setTags] = useState<string[]>([]);
    return <InputTags value={tags} onChange={setTags} placeholder="Add tags..." />;
  },
};

export const WithTags: Story = {
  args: { value: [], onChange: () => {} },
  render: () => {
    const [tags, setTags] = useState(['Design', 'Development', 'Marketing']);
    return <InputTags value={tags} onChange={setTags} placeholder="Add tags..." />;
  },
};

export const WithValidation: Story = {
  args: { value: [], onChange: () => {} },
  render: () => {
    const [emails, setEmails] = useState<string[]>([]);
    return (
      <InputTags
        value={emails}
        onChange={setEmails}
        validateTag={isValidEmail}
        placeholder="Enter email addresses..."
      />
    );
  },
};

export const Disabled: Story = {
  args: { value: [], onChange: () => {} },
  render: () => {
    const [tags, setTags] = useState(['Read-only', 'Tags']);
    return <InputTags value={tags} onChange={setTags} placeholder="Add tags..." disabled />;
  },
};
