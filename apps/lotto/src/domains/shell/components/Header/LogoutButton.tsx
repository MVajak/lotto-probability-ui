import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { Tooltip, TooltipContent, TooltipTrigger } from '@lotto/ui';

import { useAuthStore } from '@/domains/auth';

export function LogoutButton() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    queryClient.clear();
    void navigate({ to: '/login' });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.button
          type="button"
          onClick={handleLogout}
          className="flex size-10 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-destructive focus:outline-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={t('userMenu.logout')}
        >
          <ArrowRightStartOnRectangleIcon className="size-5" />
        </motion.button>
      </TooltipTrigger>
      <TooltipContent>{t('userMenu.logout')}</TooltipContent>
    </Tooltip>
  );
}
