import type React from 'react';

import i18n, { Language } from '@lotto/i18n';
import { Select, SelectContent, SelectItem, SelectTrigger, useLocalStorage } from '@lotto/ui';

import { RegionStorageKey } from '@/domains/region';

import FlagEstonia from '../../assets/flag_estonia.svg';
import FlagUK from '../../assets/flag_united_kingdom.svg';

const FLAGS: Record<Language, string> = {
  [Language.ET]: FlagEstonia,
  [Language.EN]: FlagUK,
};

export const LanguageSelector: React.FC = () => {
  const [language, setLanguage] = useLocalStorage<Language>(RegionStorageKey.LANGUAGE, Language.EN);

  const handleLanguageChange = async (value: string) => {
    const changedLanguage: Language = value as Language;

    await i18n.changeLanguage(changedLanguage);
    setLanguage(changedLanguage);
  };

  return (
    <Select value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-20">
        <img src={FLAGS[language]} alt={language} width={25} height={15} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={Language.ET}>
          <img src={FlagEstonia} alt="ET" width={25} height={15} />
        </SelectItem>
        <SelectItem value={Language.EN}>
          <img src={FlagUK} alt="EN" width={25} height={15} />
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
