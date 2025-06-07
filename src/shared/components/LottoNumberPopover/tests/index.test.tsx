import { render, screen } from '@testing-library/react';
import React from 'react';

import { LottoNumber } from '../../LottoNumber';
import { LottoNumberPopoverProps } from '../types';

describe('LottoNumberPopover', () => {
  const defaultProps: LottoNumberPopoverProps = {
    index: 0,
    probability: 0.25,
    digit: 7,
    count: 3,
    leftoverNumbers: [],
  };

  const numberPopoverTestId = 'lotto-button-0';

  const renderLottoNumberPopover = (props = defaultProps) => {
    render(<LottoNumber {...props} />);
  };

  it('should render LottoNumber with correct digit', () => {
    renderLottoNumberPopover();

    expect(screen.getByTestId(numberPopoverTestId)).toHaveTextContent(defaultProps.digit.toString());
  });
});
