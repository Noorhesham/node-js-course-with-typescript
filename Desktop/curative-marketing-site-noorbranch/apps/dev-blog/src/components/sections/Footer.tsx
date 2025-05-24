import Image from 'next/image';
import Link from 'next/link';

interface FooterProps {
  isDark?: boolean;
}

const Footer = ({ isDark = true }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-gray-900 text-sm">
      <div className="w-full border-t border-dashed border-gray-300 dark:border-gray-700">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <Link href="/" className="mr-4">
                <Image
                  src="/images/webstacks-dev-logo-onlight.svg"
                  width={149}
                  height={21}
                  alt="webstacks.dev"
                  className="h-5 w-auto dark:hidden"
                />
                <Image
                  src="/images/webstacks-dev-logo-ondark.svg"
                  width={149}
                  height={21}
                  alt="webstacks.dev"
                  className="h-5 w-auto hidden dark:block"
                />
              </Link>
              <span className="text-gray-600 dark:text-gray-400">Your website is never done.</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border-t border-dashed border-gray-300 dark:border-gray-700">
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400">
            <div>© {currentYear} Webstacks, Inc. All rights reserved.</div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="https://www.webstacks.com/legal/privacy-policy" target="_blank" rel="noopener" className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
