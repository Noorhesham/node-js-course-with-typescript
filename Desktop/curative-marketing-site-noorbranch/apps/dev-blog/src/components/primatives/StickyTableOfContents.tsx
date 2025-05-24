import React, { FC } from 'react';
import Link from 'next/link';

interface Topic {
  id: string;
  text: string;
}

interface StickyTableOfContentsProps {
  topics: Topic[];
  className?: string;
  maxHeight?: string;
}

/**
 * A reusable sticky table of contents component
 * 
 * @param topics - Array of topics with id and text
 * @param className - Additional CSS classes
 * @param maxHeight - Maximum height for the scrollable area (default: calc(100vh-200px))
 */
export const StickyTableOfContents: FC<StickyTableOfContentsProps> = ({
  topics,
  className = '',
  maxHeight = 'calc(100vh-200px)'
}) => {
  if (!topics || topics.length === 0) {
    return null;
  }

  return (
    <div className={`mb-4 relative lg:sticky lg:top-[calc(100vh-400px)] ${className}`}>
      <div className="flex h-[32px] w-full items-center whitespace-nowrap text-center font-mono text-xs uppercase text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border-y border-dashed border-gray-300 dark:border-gray-700 py-1 px-4 sticky top-0 z-10">
        <div className="">&#47;&#47;&#47;&#47;&#47;</div>
        <div className="pl-1 text-gray-800 dark:text-gray-200"> TABLE OF CONTENTS</div>
      </div>
      <div className={`max-h-[${maxHeight}] overflow-auto no-scrollbar border-b border-dashed border-gray-300 dark:border-gray-700`}>
        <div className="text-xs font-mono bg-white dark:bg-gray-900">
          {topics.map((item, index) => (
            <Link
              key={item.id || index}
              href={`#${item.id}`}
              className="group border-t border-dashed border-gray-300 dark:border-gray-700 flex justify-start items-center min-h-11 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div className="m-0 p-3 block w-full">
                <div className="flex items-center">
                  <div className="text-gray-400 dark:text-gray-600 w-6 text-right mr-3">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="text-gray-800 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-400">
                    {item.text}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StickyTableOfContents;
