'use client';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import ThemeToggle from '../primatives/ThemeToggle';

interface HeaderProps {
  isDark?: boolean;
}

const Header = ({ isDark = false }: HeaderProps) => {
  return (
    <header
      className={twMerge('w-full z-50 bg-white dark:bg-gray-900 border-b border-dashed border-gray-300 dark:border-gray-700', isDark && 'dark')}
      data-site-header
    >
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex w-full items-center justify-between min-h-[50px] py-6">
            <Link
              className="flex items-center z-[100] relative"
              href="/"
              data-event-name="Header"
              data-event-label="Logo"
            >
              <Image
                src="/images/webstacks-dev-logo-onlight.svg"
                width={149}
                height={21}
                priority={true}
                alt="webstacks.dev"
                className="h-5 w-auto dark:hidden"
              />
              <Image
                src="/images/webstacks-dev-logo-ondark.svg"
                width={149}
                height={21}
                priority={true}
                alt="webstacks.dev"
                className="h-5 w-auto hidden dark:block"
              />
            </Link>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Check us out button */}
              <Link
                href="https://www.webstacks.com"
                className="bg-blue-600 border-[1.5px] relative top-[2px] w-auto text-white inline-block border-blue-700 border-dashed text-center group"
                target="_blank"
                rel="noopener"
              >
                <span className="relative text-center w-auto bg-blue-500 text-white hover:bg-blue-600 border-blue-700 border-dashed text-[15px] font-medium border-[1.5px] px-5 py-1 -translate-y-1 hover:-translate-y-1.5 active:-translate-y-0.5 mx-[-1.5px] block active:transition-all active:duration-100 select-none font-mono">
                  Visit our .com
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
