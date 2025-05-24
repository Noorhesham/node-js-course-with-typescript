import React, { FC } from 'react';
import Image from 'next/image';

interface Author {
  name: string;
  role?: string;
  image?: {
    url?: string;
    alt?: string;
  };
  bio?: string;
}

interface AuthorInfoProps {
  author: Author;
  className?: string;
  maxHeight?: string;
}

/**
 * A reusable component for displaying author information
 * 
 * @param author - Author object with name, role, image, and bio
 * @param className - Additional CSS classes
 * @param maxHeight - Maximum height for the scrollable area (default: calc(100vh-200px))
 */
export const AuthorInfo: FC<AuthorInfoProps> = ({
  author,
  className = '',
  maxHeight = 'calc(100vh-200px)'
}) => {
  if (!author) {
    return null;
  }

  return (
    <div className={`mb-4 relative ${className}`}>
      <div className={`max-h-[${maxHeight}] overflow-auto no-scrollbar border-b border-dashed border-gray-300 dark:border-gray-700`}>
        <div className="text-xs font-mono bg-white dark:bg-gray-900">
          <div className="group border-dashed border-gray-300 dark:border-gray-700 flex justify-start items-center min-h-11">
            <div className="m-0 p-3 block w-full">
              <div className="flex items-center mb-2">
                {author.image?.url && (
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src={author.image.url}
                      alt={author.image.alt || author.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <div className="text-gray-800 dark:text-gray-200 font-medium">
                    {author.name}
                  </div>
                  {author.role && (
                    <div className="text-gray-500 dark:text-gray-400 text-xs">
                      {author.role}
                    </div>
                  )}
                </div>
              </div>
              {author.bio && (
                <div className="text-gray-700 dark:text-gray-300 text-xs">
                  {author.bio}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorInfo;
