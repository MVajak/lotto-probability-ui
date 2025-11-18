import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import i18n from 'i18next';
import React from 'react';

import { Language } from '../../../locales/types';
import FlagEstonia from '../../assets/flags/flag_estonia.svg';
import FlagUK from '../../assets/flags/flag_united_kingdom.svg';
import { LocalStorageKey } from '../../constants';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface LanguageSelectorProps {
  size?: 'small' | 'medium';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ size = 'small' }) => {
  const [language, setLanguage] = useLocalStorage<Language>(LocalStorageKey.LANGUAGE, Language.EN);

  const handleLanguageChange = async (event: SelectChangeEvent) => {
    const changedLanguage: Language = event.target.value as Language;

    await i18n.changeLanguage(changedLanguage);
    setLanguage(changedLanguage);
  };

  return (
    <FormControl size={size}>
      <Select
        labelId="select-language-label"
        id="select-language"
        value={language}
        onChange={handleLanguageChange}
      >
        <MenuItem value={Language.ET}>
          <img src={FlagEstonia} alt="ET" width={25} height={15} />
        </MenuItem>
        <MenuItem value={Language.EN}>
          <img src={FlagUK} alt="EN" width={25} height={15} />
        </MenuItem>
      </Select>
    </FormControl>
  );
};
