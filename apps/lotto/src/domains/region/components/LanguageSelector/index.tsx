import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@lotto/ui';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'et', label: 'Eesti' },
] as const;

export function LanguageSelector() {
  const { t, i18n } = useTranslation();
  // Handle locale codes like "et-EE" by extracting base language
  const currentLang = i18n.language.split('-')[0];

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <motion.button
              type="button"
              className="flex size-10 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GlobeAltIcon className="size-5" />
            </motion.button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>{t('userMenu.language')}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={currentLang === lang.code ? 'bg-muted' : ''}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
