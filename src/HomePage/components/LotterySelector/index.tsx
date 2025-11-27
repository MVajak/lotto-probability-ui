import { Box, FormControl, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';

import { LotteryTypeSelector } from '../../../shared/components/LotteryTypeSelector';
import type { LottoType } from '../../../shared/types';

interface LotterySelectorProps {
  selectedLottery: LottoType;
  onLotteryChange: (lottery: LottoType) => void;
}

export const LotterySelector: React.FC<LotterySelectorProps> = ({ selectedLottery, onLotteryChange }) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'center', p: 3 }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {t('home.selectLottery')}
        </Typography>
        <Typography>{t('home.selectLotteryDescription')}</Typography>
      </Box>
      <FormControl sx={{ minWidth: { xs: '90%', md: 300 } }}>
        <LotteryTypeSelector selectedLottery={selectedLottery} onLotteryChange={onLotteryChange} />
      </FormControl>
    </Box>
  );
};
