import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { createStubInstances } from '../../../test-utils/mocking';
import { NumberStat } from '../../../types';
import { LottoDrawer } from '../index';
import { LottoDrawerProps } from '../types';

describe('LottoDrawer', () => {
  const onCloseMock = jest.fn();
  const numberStats = createStubInstances<NumberStat>([
    { digit: 1, count: 10, probability: 0.25, position: 0 },
    { digit: 2, count: 5, probability: 0.15, position: 0 },
  ]);
  const propsMock: LottoDrawerProps = {
    isOpen: true,
    onClose: onCloseMock,
    numberStats: numberStats,
  };

  const drawerTestId = 'lotto-drawer';
  const closeButton = 'drawer-close-button';
  const positionTitleTestId = 'position-0-title';
  const countStatisticsTestId = 'count-0-0-statistics';
  const probabilityStatisticsTestId = 'probability-0-0-statistics';

  const renderLottoDrawer = (props = propsMock) => {
    render(<LottoDrawer {...props} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should not render drawer', () => {
    renderLottoDrawer({ ...propsMock, isOpen: false });

    expect(screen.queryByTestId(drawerTestId)).not.toBeInTheDocument();
  });

  test('should render drawer', () => {
    renderLottoDrawer();

    expect(screen.getByTestId(drawerTestId)).toBeInTheDocument();
  });

  it('should call onClose when drawer is closed', () => {
    renderLottoDrawer();

    fireEvent.click(screen.getByTestId(closeButton));

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should render stats grouped by position correctly', () => {
    renderLottoDrawer();

    expect(screen.getByTestId(positionTitleTestId)).toHaveTextContent('Position: 1');
    expect(screen.getByTestId(countStatisticsTestId)).toHaveTextContent('Count: 10');
    expect(screen.getByTestId(probabilityStatisticsTestId)).toHaveTextContent('Probability: 25.00%');
  });

  it('should render unassigned position without position title', () => {
    const numberStats = createStubInstances<NumberStat>([{ digit: 9, count: 8, probability: 0.2, position: null }]);

    renderLottoDrawer({ ...propsMock, numberStats: numberStats });

    expect(screen.queryByTestId('position-null-title')).not.toBeInTheDocument();
  });
});
