import { render, screen } from '@testing-library/react';
import React from 'react';

import { LottoType } from '../../../types';
import { LottoInfo } from '../index';
import { LottoInfoProps, LottoName } from '../types';

describe('LottoInfo', () => {
  const propsMock: LottoInfoProps = {
    lottoType: LottoType.EURO,
    linkBuyTickets: 'localhost/buyTickets',
    linkGameRules: 'localhost/rules',
  };

  const lottoName = LottoName[propsMock.lottoType];
  const divider = 'lotto-info-divider';
  const lottoDescription = `lotto-${lottoName}-description`;
  const lottoRulesLink = `lotto-${lottoName}-rules`;
  const lottoTicketsLink = `lotto-${lottoName}-tickets`;

  const renderLottoInfo = (props = propsMock) => {
    render(<LottoInfo {...props} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render info section', () => {
    renderLottoInfo();

    expect(screen.getByTestId(divider)).toBeInTheDocument();
    expect(screen.getByTestId(lottoDescription)).toBeInTheDocument();
    expect(screen.getByTestId(lottoRulesLink)).toBeInTheDocument();
    expect(screen.getByTestId(lottoTicketsLink)).toBeInTheDocument();
  });
});
