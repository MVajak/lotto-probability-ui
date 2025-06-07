import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { LottoNumber } from '../index';
import { LottoNumberProps } from '../types';

describe('LottoNumber', () => {
  const onClickMock = jest.fn();
  const propsMock: LottoNumberProps = {
    digit: 5,
    index: 0,
    showBadge: true,
    onClick: onClickMock,
  };
  const buttonTestId = `lotto-button-${propsMock.index}`;
  const badgeTestId = `lotto-button-badge-${propsMock.index}`;

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

  test('should render badge when showBadge is true', () => {
    renderLottoNumbers({ ...propsMock, showBadge: true });

    expect(screen.getByTestId(badgeTestId)).toBeInTheDocument();
    expect(screen.getByTestId(badgeTestId)).toHaveTextContent('!');
    expect(screen.getByTestId(buttonTestId)).toHaveTextContent('5');
  });

  test('should call onClick when badge is clicked', () => {
    renderLottoNumbers({ ...propsMock, showBadge: true });

    const badge = screen.getByTestId(badgeTestId);
    fireEvent.click(badge);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
