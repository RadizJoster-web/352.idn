import { useState } from 'react';
import { BsList } from 'react-icons/bs';
import { IoCloseSharp } from 'react-icons/io5';

import SiteLogo from '../components/navigation/SiteLogo';
import SearchBar from '../components/navigation/SearchBar';
import { MainNavigation } from './MainNavigation';
import { ThemeToggle } from '../components/navigation/ThemeToggle';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-[var(--container-max)] items-center justify-between px-4">
        {/* Kiri: Hamburger (Mobile) / Logo (Desktop) */}
        <div className="flex items-center md:w-1/4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            className="mr-2 rounded-md p-2 text-text-secondary hover:bg-surface md:hidden"
          >
            {mobileMenuOpen ? (
              <IoCloseSharp className="h-6 w-6" />
            ) : (
              <BsList className="h-6 w-6" />
            )}
          </button>
          <div className="hidden md:block">
            <SiteLogo />
          </div>
        </div>

        {/* Tengah: Logo (Mobile) / Search (Desktop) */}
        <div className="flex flex-1 justify-center">
          <div className="md:hidden">
            <SiteLogo />
          </div>
          <div className="hidden md:block">
            <SearchBar className="w-80 lg:w-96" />
          </div>
        </div>

        {/* Kanan: Theme Toggle */}
        <div className="flex items-center justify-end gap-2 md:w-1/4">
          <ThemeToggle />
        </div>
      </div>

      <MainNavigation
        mobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
