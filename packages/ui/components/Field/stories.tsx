import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '../Input';
import { Textarea } from '../Textarea';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from './';

const meta = {
  component: Field,
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="basic-input">Basic Field</FieldLabel>
      <FieldContent>
        <Input id="basic-input" placeholder="Enter text..." />
      </FieldContent>
    </Field>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="description-input">Field with Description</FieldLabel>
      <FieldDescription>This is a helpful description that explains what this field is for.</FieldDescription>
      <FieldContent>
        <Input id="description-input" placeholder="Enter text..." />
      </FieldContent>
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="error-input">Field with Error</FieldLabel>
      <FieldContent>
        <Input id="error-input" placeholder="Enter text..." aria-invalid={true} />
        <FieldError>This field is required.</FieldError>
      </FieldContent>
    </Field>
  ),
};

export const WithErrorAndDescription: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="error-desc-input">Field with Error and Description</FieldLabel>
      <FieldDescription>This is a helpful description that explains what this field is for.</FieldDescription>
      <FieldContent>
        <Input id="error-desc-input" placeholder="Enter text..." aria-invalid={true} />
        <FieldError>This field is required and must be at least 8 characters.</FieldError>
      </FieldContent>
    </Field>
  ),
};

export const WithMultipleErrors: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="multiple-errors-input">Field with Multiple Errors</FieldLabel>
      <FieldContent>
        <Input id="multiple-errors-input" placeholder="Enter text..." aria-invalid={true} />
        <FieldError
          errors={[
            { message: 'This field is required.' },
            { message: 'Must be at least 8 characters long.' },
            { message: 'Must contain at least one number.' },
          ]}
        />
      </FieldContent>
    </Field>
  ),
};

export const HorizontalOrientation: Story = {
  render: () => (
    <Field orientation="horizontal">
      <FieldLabel htmlFor="horizontal-input">Horizontal Field</FieldLabel>
      <FieldContent>
        <Input id="horizontal-input" placeholder="Enter text..." />
      </FieldContent>
    </Field>
  ),
};

export const ResponsiveOrientation: Story = {
  render: () => (
    <FieldGroup>
      <Field orientation="responsive">
        <FieldLabel htmlFor="responsive-input">Responsive Field</FieldLabel>
        <FieldContent>
          <Input id="responsive-input" placeholder="Enter text..." />
        </FieldContent>
      </Field>
    </FieldGroup>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="textarea-field">Textarea Field</FieldLabel>
      <FieldDescription>Enter a longer description or message here.</FieldDescription>
      <FieldContent>
        <Textarea id="textarea-field" placeholder="Enter text..." rows={4} />
      </FieldContent>
    </Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field data-disabled="true">
      <FieldLabel htmlFor="disabled-input">Disabled Field</FieldLabel>
      <FieldDescription>This field is disabled and cannot be edited.</FieldDescription>
      <FieldContent>
        <Input id="disabled-input" placeholder="Enter text..." disabled />
      </FieldContent>
    </Field>
  ),
};

export const MultipleFields: Story = {
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="group-input-1">First Field</FieldLabel>
        <FieldContent>
          <Input id="group-input-1" placeholder="Enter text..." />
        </FieldContent>
      </Field>
      <Field>
        <FieldLabel htmlFor="group-input-2">Second Field</FieldLabel>
        <FieldContent>
          <Input id="group-input-2" placeholder="Enter text..." />
        </FieldContent>
      </Field>
      <Field>
        <FieldLabel htmlFor="group-input-3">Third Field</FieldLabel>
        <FieldContent>
          <Input id="group-input-3" placeholder="Enter text..." />
        </FieldContent>
      </Field>
    </FieldGroup>
  ),
};

export const WithFieldSet: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend>Contact Information</FieldLegend>
      <Field>
        <FieldLabel htmlFor="fieldset-name">Name</FieldLabel>
        <FieldContent>
          <Input id="fieldset-name" placeholder="Enter your name..." />
        </FieldContent>
      </Field>
      <Field>
        <FieldLabel htmlFor="fieldset-email">Email</FieldLabel>
        <FieldContent>
          <Input id="fieldset-email" type="email" placeholder="Enter your email..." />
        </FieldContent>
      </Field>
      <Field>
        <FieldLabel htmlFor="fieldset-phone">Phone</FieldLabel>
        <FieldContent>
          <Input id="fieldset-phone" type="tel" placeholder="Enter your phone..." />
        </FieldContent>
      </Field>
    </FieldSet>
  ),
};

export const FieldSetWithVariant: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend variant="label">Personal Details</FieldLegend>
      <Field>
        <FieldLabel htmlFor="variant-name">Name</FieldLabel>
        <FieldContent>
          <Input id="variant-name" placeholder="Enter your name..." />
        </FieldContent>
      </Field>
      <Field>
        <FieldLabel htmlFor="variant-bio">Bio</FieldLabel>
        <FieldDescription>Tell us a little about yourself.</FieldDescription>
        <FieldContent>
          <Textarea id="variant-bio" placeholder="Enter your bio..." rows={3} />
        </FieldContent>
      </Field>
    </FieldSet>
  ),
};

export const WithSeparator: Story = {
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="separator-input-1">First Field</FieldLabel>
        <FieldContent>
          <Input id="separator-input-1" placeholder="Enter text..." />
        </FieldContent>
      </Field>
      <FieldSeparator>or</FieldSeparator>
      <Field>
        <FieldLabel htmlFor="separator-input-2">Second Field</FieldLabel>
        <FieldContent>
          <Input id="separator-input-2" placeholder="Enter text..." />
        </FieldContent>
      </Field>
    </FieldGroup>
  ),
};

export const WithSeparatorNoContent: Story = {
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="separator-no-content-1">First Field</FieldLabel>
        <FieldContent>
          <Input id="separator-no-content-1" placeholder="Enter text..." />
        </FieldContent>
      </Field>
      <FieldSeparator />
      <Field>
        <FieldLabel htmlFor="separator-no-content-2">Second Field</FieldLabel>
        <FieldContent>
          <Input id="separator-no-content-2" placeholder="Enter text..." />
        </FieldContent>
      </Field>
    </FieldGroup>
  ),
};

export const WithFieldTitle: Story = {
  render: () => (
    <Field>
      <FieldTitle>Field Title</FieldTitle>
      <FieldDescription>This uses FieldTitle instead of FieldLabel.</FieldDescription>
      <FieldContent>
        <Input placeholder="Enter text..." />
      </FieldContent>
    </Field>
  ),
};

export const ComplexForm: Story = {
  render: () => (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Account Information</FieldLegend>
        <Field>
          <FieldLabel htmlFor="complex-username">Username</FieldLabel>
          <FieldDescription>Choose a unique username for your account.</FieldDescription>
          <FieldContent>
            <Input id="complex-username" placeholder="username" />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="complex-email">Email</FieldLabel>
          <FieldContent>
            <Input id="complex-email" type="email" placeholder="email@example.com" aria-invalid={true} />
            <FieldError>This email is already registered.</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="complex-password">Password</FieldLabel>
          <FieldDescription>Must be at least 8 characters with one number.</FieldDescription>
          <FieldContent>
            <Input id="complex-password" type="password" placeholder="Enter password..." aria-invalid={true} />
            <FieldError
              errors={[
                { message: 'Must be at least 8 characters long.' },
                { message: 'Must contain at least one number.' },
              ]}
            />
          </FieldContent>
        </Field>
      </FieldSet>
      <FieldSeparator />
      <FieldSet>
        <FieldLegend variant="label">Profile Information</FieldLegend>
        <Field data-disabled="true">
          <FieldLabel htmlFor="complex-name">Full Name</FieldLabel>
          <FieldContent>
            <Input id="complex-name" placeholder="John Doe" disabled />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="complex-bio">Bio</FieldLabel>
          <FieldDescription>Tell us about yourself (optional).</FieldDescription>
          <FieldContent>
            <Textarea id="complex-bio" placeholder="Enter your bio..." rows={4} />
          </FieldContent>
        </Field>
      </FieldSet>
    </FieldGroup>
  ),
};
