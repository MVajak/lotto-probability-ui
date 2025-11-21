import { render, screen } from '@testing-library/react';
import React from 'react';

import { LottoNumber } from '../../LottoNumber';
import { LottoNumberButtonProps } from '../types';

describe('LottoNumberButton', () => {
  const defaultProps: LottoNumberButtonProps = {
    index: 0,
    frequency: 0.25,
    digit: 7,
    count: 3,
    leftoverNumbers: [],
  };

  const numberButtonTestId = 'lotto-button-0';

  const renderLottoNumberButton = (props = defaultProps) => {
    render(<LottoNumber {...props} />);
  };

  it('should render LottoNumber with correct digit', () => {
    renderLottoNumberButton();

    expect(screen.getByTestId(numberButtonTestId)).toHaveTextContent(defaultProps.digit.toString());
  });
});
