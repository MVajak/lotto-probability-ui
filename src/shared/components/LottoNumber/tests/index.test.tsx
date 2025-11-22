import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { LottoNumber } from '../index';
import { LottoNumberProps } from '../types';

describe('LottoNumber', () => {
  const onClickMock = jest.fn();
  const propsMock: LottoNumberProps = {
    digit: 5,
    index: 0,
    onClick: onClickMock,
  };
  const buttonTestId = `lotto-button-${propsMock.index}`;

  const renderLottoNumbers = (props = propsMock) => {
    render(<LottoNumber {...props} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render button with digit', () => {
    renderLottoNumbers();

    expect(screen.getByTestId(buttonTestId)).toHaveTextContent('5');
  });

  test('should call onClick when button is clicked', () => {
    renderLottoNumbers();

    fireEvent.click(screen.getByTestId(buttonTestId));

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
