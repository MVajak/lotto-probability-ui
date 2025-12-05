import { ComponentProps } from 'react';

import { ComponentStyleVariant } from '../../types';

export interface CheckboxProps extends Omit<ComponentProps<'input'>, 'type'> {
  variant?: ComponentStyleVariant;
  label?: string;
  error?: boolean;
  /**
   * Whether the checkbox is in an indeterminate state (neither checked nor unchecked)
   * @default false
   */
  indeterminate?: boolean;
}
