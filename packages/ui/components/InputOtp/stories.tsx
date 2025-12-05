import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './';

const meta = {
  component: InputOTP,
} satisfies Meta<typeof InputOTP>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper to allow render-only stories without args
const createStory = (story: { render: () => React.JSX.Element }) => story as unknown as Story;

export const Default: Story = createStory({
  render: () => {
    const [value, setValue] = useState('');
    return (
      <InputOTP value={value} onChange={setValue} maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    );
  },
});

export const WithSeparator: Story = createStory({
  render: () => {
    const [value, setValue] = useState('');
    return (
      <InputOTP value={value} onChange={setValue} maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    );
  },
});

export const Disabled: Story = createStory({
  render: () => {
    return (
      <InputOTP value="123456" disabled maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    );
  },
});

export const WithError: Story = createStory({
  render: () => {
    const [value, setValue] = useState('');
    return (
      <InputOTP value={value} onChange={setValue} maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} aria-invalid />
          <InputOTPSlot index={1} aria-invalid />
          <InputOTPSlot index={2} aria-invalid />
          <InputOTPSlot index={3} aria-invalid />
          <InputOTPSlot index={4} aria-invalid />
          <InputOTPSlot index={5} aria-invalid />
        </InputOTPGroup>
      </InputOTP>
    );
  },
});

export const WithValue: Story = createStory({
  render: () => {
    return (
      <InputOTP value="123456" maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    );
  },
});
