import React, { FC } from 'react';
import Link from 'next/link';

interface CategoryLink {
  name: string;
  href: string;
}

interface TerminalBreadcrumbProps {
  basePath?: string;
  category?: CategoryLink;
  title?: string;
  className?: string;
}

/**
 * A terminal-style breadcrumb navigation component
 * 
 * @param basePath - The base path for the blog (default: '/dev')
 * @param category - Optional category object with name and href
 * @param title - Current page title
 * @param className - Additional CSS classes
 */
export const TerminalBreadcrumb: FC<TerminalBreadcrumbProps> = ({
  basePath = '/dev',
  category,
  title = '',
  className = '',
}) => {
  // Truncate title if it's too long
  const displayTitle = title 
    ? (title.length > 25 ? `${title.substring(0, 25)}...` : title) 
    : '';

  return (
    <div className={`font-mono text-xs overflow-x-auto whitespace-nowrap ${className}`}>
      <span className="text-gray-500 dark:text-gray-400">$</span>
      <span className="text-gray-800 dark:text-gray-300 ml-2">cd</span>
      <span className="text-blue-700 dark:text-blue-400 ml-2">/webstacks{basePath}</span>
      <span className="text-gray-500 dark:text-gray-400 ml-2 mr-2">&gt;</span>
      <span className="text-gray-800 dark:text-gray-300">ls</span>
      <span className="text-gray-500 dark:text-gray-400 ml-2 mr-2">-la</span>
      <span className="text-gray-500 dark:text-gray-400">&gt;</span>
      <Link href={basePath} className="text-blue-700 dark:text-blue-400 hover:underline ml-2">
        blog
      </Link>
      {category && (
        <>
          <span className="text-gray-500 dark:text-gray-400 mx-2">/</span>
          <Link
            href={category.href}
            className="text-blue-700 dark:text-blue-400 hover:underline"
          >
            {category.name}
          </Link>
        </>
      )}
      {displayTitle && (
        <>
          <span className="text-gray-500 dark:text-gray-400 mx-2">/</span>
          <span className="text-gray-900 dark:text-gray-100 font-medium">
            {displayTitle}
          </span>
        </>
      )}
    </div>
  );
};

export default TerminalBreadcrumb;
