import { render, screen } from '@testing-library/react';
import React from 'react';

import { Loader } from '../index';
import { LoaderProps } from '../types';

describe('Loader', () => {
  const propsMock: LoaderProps = {
    shouldShow: true,
  };
  const loaderTestId = 'lotto-loader';

  const renderLoader = (props = propsMock) => {
    render(<Loader {...props} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render loader', () => {
    renderLoader();

    expect(screen.getByTestId(loaderTestId)).toBeInTheDocument();
  });

  test('should call onClick when button is clicked', () => {
    renderLoader({ ...propsMock, shouldShow: false });

    expect(screen.queryByTestId(loaderTestId)).not.toBeInTheDocument();
  });
});
