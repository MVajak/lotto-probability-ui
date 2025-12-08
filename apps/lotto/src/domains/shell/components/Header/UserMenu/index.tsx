import React from 'react';
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@lotto/ui';

import { useAuthStore } from '@/domains/auth';
import { LanguageSelector } from '@/domains/region/components/LanguageSelector';
import { RegionSelector } from '@/domains/region/components/RegionSelector';

export const UserMenu: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

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
