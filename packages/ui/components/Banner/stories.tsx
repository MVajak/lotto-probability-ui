import {
  ChartBarIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid';
import type { Meta, StoryObj } from '@storybook/react';

import { Banner } from './';

const meta = {
  component: Banner,
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Default Banner',
    description: 'This is a neutral banner with default styling.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    icon: <CheckCircleIcon className="size-5" />,
    title: 'Success!',
    description: 'Your changes have been saved successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    icon: <ExclamationTriangleIcon className="size-5" />,
    title: 'Warning',
    description: 'Please review your input before proceeding.',
  },
};

export const ErrorVariant: Story = {
  args: {
    variant: 'error',
    icon: <ExclamationCircleIcon className="size-5" />,
    title: 'Error',
    description: 'Something went wrong. Please try again.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    icon: <InformationCircleIcon className="size-5" />,
    title: 'Information',
    description: 'Here is some helpful information for you.',
  },
};

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    icon: <ChartBarIcon className="size-5" />,
    title: 'Normal Distribution',
    description: 'This number appears as expected.',
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: 'info',
    title: 'No Icon Banner',
    description: 'This banner does not have an icon.',
  },
};

export const WithoutDescription: Story = {
  args: {
    variant: 'success',
    icon: <CheckCircleIcon className="size-5" />,
    title: 'Title Only Banner',
  },
};

export const FrequentNumber: Story = {
  args: {
    variant: 'warning',
    icon: <ChartBarIcon className="size-5" />,
    title: 'Frequent Number',
    description: 'This number appears more often than expected.',
  },
};

export const RareNumber: Story = {
  args: {
    variant: 'info',
    icon: <ChartBarIcon className="size-5" />,
    title: 'Rare Number',
    description: 'This number appears less often than expected.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Banner
        variant="success"
        icon={<CheckCircleIcon className="size-5" />}
        title="Success"
        description="Operation completed successfully."
      />
      <Banner
        variant="warning"
        icon={<ExclamationTriangleIcon className="size-5" />}
        title="Warning"
        description="Please review before proceeding."
      />
      <Banner
        variant="error"
        icon={<ExclamationCircleIcon className="size-5" />}
        title="Error"
        description="Something went wrong."
      />
      <Banner
        variant="info"
        icon={<InformationCircleIcon className="size-5" />}
        title="Info"
        description="Here is some useful information."
      />
      <Banner
        variant="neutral"
        icon={<ChartBarIcon className="size-5" />}
        title="Neutral"
        description="Default neutral state."
      />
    </div>
  ),
};

export const WithChildren: Story = {
  args: {
    variant: 'info',
    icon: <InformationCircleIcon className="size-5" />,
    title: 'Custom Content',
    children: (
      <div className="mt-2 flex gap-2">
        <button type="button" className="text-body-small-bold text-primary-blue hover:underline">
          Learn more
        </button>
        <button type="button" className="text-body-small text-muted-foreground hover:underline">
          Dismiss
        </button>
      </div>
    ),
  },
};
