import { Link } from '@tanstack/react-router';

import { UserMenu } from './UserMenu';

export function Header() {
  return (
    <header className="mb-4 rounded-xl bg-gradient-to-br from-[#00347f] to-[#004ba3] shadow-lg">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="flex items-center py-3">
          {/* Desktop Logo */}
          <Link
            to="/home"
            className="mr-2 hidden cursor-pointer transition-transform duration-200 hover:scale-105 md:flex"
          >
            <img src="/img/logo_lotto.png" alt="Lotto Logo" className="h-auto max-w-[50px]" />
          </Link>
          <Link
            to="/home"
            className="mr-4 hidden text-secondary text-title-small-bold tracking-wider no-underline transition-opacity duration-200 hover:opacity-85 md:flex"
          >
            LOTTO
          </Link>
          <div className="hidden flex-grow md:flex" />

          {/* Mobile Logo */}
          <Link
            to="/home"
            className="mr-2 flex cursor-pointer transition-transform duration-200 hover:scale-105 md:hidden"
          >
            <img src="/img/logo_lotto.png" alt="Lotto Logo" className="h-auto max-w-[50px]" />
          </Link>
          <Link
            to="/home"
            className="mr-4 flex text-secondary text-title-small-bold tracking-wider no-underline transition-opacity duration-200 hover:opacity-85 md:hidden"
          >
            LOTTO
          </Link>
          <div className="flex flex-grow md:hidden" />

          {/* User Menu */}
          <div className="my-2 flex text-secondary">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
