import { useState } from 'react';
import {
  Bars3Icon,
  CreditCardIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Link } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { Tooltip, TooltipContent, TooltipTrigger } from '@lotto/ui';

import { LanguageSelector } from '@/domains/region/components/LanguageSelector';
import { RegionSelector } from '@/domains/region/components/RegionSelector';
import { ThemeToggle } from '@/domains/theme/components/ThemeToggle';

import { LogoutButton } from './LogoutButton';

const navItems = [
  { key: 'home', to: '/home', icon: HomeIcon },
  { key: 'profile', to: '/profile', icon: UserIcon },
  { key: 'subscription', to: '/subscription', icon: CreditCardIcon },
  { key: 'support', to: '/support', icon: QuestionMarkCircleIcon },
] as const;

export function Header() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 md:right-20 md:left-20">
      <nav className="glass mx-4 mt-4 rounded-full px-4 py-2 backdrop-blur-xl md:mx-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2">
            <img src="/img/lotto_lens.png" alt="Lotto Logo" className="h-auto max-w-10" />
            <span className="hidden text-foreground text-title-small-bold md:block">LottoLens</span>
          </Link>

          {/* Spacer */}
          <div className="grow" />

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Tooltip key={item.key}>
                <TooltipTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to={item.to}
                      className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <item.icon className="size-5" />
                    </Link>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>{t(`nav.${item.key}`)}</TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Divider (Desktop) */}
          <div className="mx-2 hidden h-6 w-px bg-border md:block" />

          {/* Desktop Actions */}
          <div className="hidden items-center gap-1 md:flex">
            <LanguageSelector />
            <ThemeToggle />
            <RegionSelector />
            <LogoutButton />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            className="flex size-10 items-center justify-center rounded-full text-foreground md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <XMarkIcon className="size-5" /> : <Bars3Icon className="size-5" />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="glass mx-4 mt-2 rounded-2xl p-6 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.to}
                    className="flex items-center gap-3 text-foreground text-title-small-bold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="size-5" />
                    {t(`nav.${item.key}`)}
                  </Link>
                </motion.div>
              ))}
              <div className="my-2 h-px bg-border" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LanguageSelector />
                  <ThemeToggle />
                  <RegionSelector />
                </div>
                <LogoutButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
