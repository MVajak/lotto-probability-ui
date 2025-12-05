import type { Meta, StoryObj } from '@storybook/react';

import { Link } from './';

const meta = {
  component: Link,
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Link text',
    href: '#',
  },
};

export const AlwaysUnderline: Story = {
  args: {
    children: 'Always underlined link',
    href: '#',
    underlineStyle: 'always',
  },
};

export const HoverUnderline: Story = {
  args: {
    children: 'Underline on hover',
    href: '#',
    underlineStyle: 'hover',
  },
};

export const NeverUnderline: Story = {
  args: {
    children: 'Never underlined link',
    href: '#',
    underlineStyle: 'never',
  },
};

export const HoverRemoveUnderline: Story = {
  args: {
    children: 'Remove underline on hover',
    href: '#',
    underlineStyle: 'hoverRemove',
  },
};

export const WithLongText: Story = {
  args: {
    children: 'This is a longer link text that demonstrates how the component handles multiple words',
    href: '#',
  },
};

export const InParagraph: Story = {
  render: () => (
    <p>
      This is a paragraph with an{' '}
      <Link href="#" underlineStyle="always">
        inline link
      </Link>{' '}
      that appears within the text.
    </p>
  ),
};

export const MultipleLinks: Story = {
  render: () => (
    <div className="space-y-2">
      <div>
        <Link href="#" underlineStyle="always">
          Always underlined
        </Link>
      </div>
      <div>
        <Link href="#" underlineStyle="hover">
          Hover to underline
        </Link>
      </div>
      <div>
        <Link href="#" underlineStyle="never">
          Never underlined
        </Link>
      </div>
      <div>
        <Link href="#" underlineStyle="hoverRemove">
          Remove underline on hover
        </Link>
      </div>
    </div>
  ),
};

export const AllUnderlineStyles: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">Always</p>
        <Link href="#" underlineStyle="always">
          This link is always underlined
        </Link>
      </div>
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">Hover</p>
        <Link href="#" underlineStyle="hover">
          Hover over this link to see the underline appear
        </Link>
      </div>
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">Never</p>
        <Link href="#" underlineStyle="never">
          This link is never underlined
        </Link>
      </div>
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">Hover Remove</p>
        <Link href="#" underlineStyle="hoverRemove">
          This link has underline that disappears on hover
        </Link>
      </div>
    </div>
  ),
};

export const WithCustomClassName: Story = {
  args: {
    children: 'Custom styled link',
    href: '#',
    className: 'text-primary font-bold',
  },
};

export const ExternalLink: Story = {
  args: {
    children: 'External link',
    href: 'https://example.com',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
};
