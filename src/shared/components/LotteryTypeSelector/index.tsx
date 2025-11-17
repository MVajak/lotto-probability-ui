import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

import { LottoType } from '../../types';

interface LotteryTypeSelectorProps {
  selectedLottery: LottoType;
  onLotteryChange: (lottery: LottoType) => void;
}

const lotteryOptions = [
  { value: LottoType.EURO, label: 'Eurojackpot' },
  { value: LottoType.VIKINGLOTTO, label: 'Viking Lotto' },
  { value: LottoType.BINGO, label: 'Bingo' },
  { value: LottoType.KENO, label: 'Keno' },
  { value: LottoType.JOKKER, label: 'Jokker' },
];

export const LotteryTypeSelector: React.FC<LotteryTypeSelectorProps> = ({
  selectedLottery,
  onLotteryChange,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    const selectedType = event.target.value as LottoType;
    onLotteryChange(selectedType);
  };

  return (
    <FormControl fullWidth>
      <Select value={selectedLottery} onChange={handleChange}>
        {lotteryOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
