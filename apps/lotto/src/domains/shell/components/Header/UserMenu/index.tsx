import React from 'react';
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  CreditCardIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@lotto/ui';

import { useAuthStore } from '@/domains/auth';
import { LanguageSelector } from '@/domains/region/components/LanguageSelector';
import { RegionSelector } from '@/domains/region/components/RegionSelector';
import { useTheme } from '@/domains/theme';

export const UserMenu: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const { theme, setTheme } = useTheme();

  const handleProfile = () => {
    void navigate({ to: '/profile' });
  };

  const handleSubscription = () => {
    void navigate({ to: '/subscription' });
  };

  const handleLogout = () => {
    logout();
    void navigate({ to: '/login' });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="flex cursor-pointer items-center gap-1 text-inherit focus:outline-none">
          <Cog6ToothIcon className="size-6" />
          <ChevronDownIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={handleProfile}>
          <UserIcon className="size-4" />
          {t('userMenu.profile')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSubscription}>
          <CreditCardIcon className="size-4" />
          {t('userMenu.subscription')}
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <SunIcon className="size-4" />
            {t('userMenu.theme')}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={theme}
              onValueChange={(value) => setTheme(value as 'system' | 'light' | 'dark')}
            >
              <DropdownMenuRadioItem value="light">
                <SunIcon className="size-4" />
                {t('userMenu.themeLight')}
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark">
                <MoonIcon className="size-4" />
                {t('userMenu.themeDark')}
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="system">
                <ComputerDesktopIcon className="size-4" />
                {t('userMenu.themeSystem')}
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem onClick={handleLogout}>
          <ArrowRightStartOnRectangleIcon className="size-4" />
          {t('userMenu.logout')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="flex gap-4 p-2">
          <div className="flex-1">
            <p className="mb-1 text-body-small text-muted-foreground">{t('userMenu.language')}</p>
            <LanguageSelector />
          </div>
          <div className="flex-1">
            <p className="mb-1 text-body-small text-muted-foreground">{t('userMenu.region')}</p>
            <RegionSelector />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
