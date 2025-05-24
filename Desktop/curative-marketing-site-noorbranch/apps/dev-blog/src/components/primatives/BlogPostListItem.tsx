import React, { FC } from 'react';
import Link from 'next/link';
import { formatRelativeTime } from 'utils/functions';

interface BlogPostListItemProps {
  post: {
    _id?: string;
    title?: string;
    slug?: {
      current?: string;
    };
    publishDate?: string;
    [key: string]: any;
  };
  index: number;
  isActive?: boolean;
  basePath?: string;
  showDate?: boolean;
  className?: string;
}

/**
 * A reusable component for displaying a blog post item in a list
 * 
 * @param post - The blog post object
 * @param index - The index of the post in the list
 * @param isActive - Whether this post is the currently active one
 * @param basePath - The base path for the blog posts (default: '/dev')
 * @param showDate - Whether to show the publication date (default: true)
 * @param className - Additional CSS classes
 */
export const BlogPostListItem: FC<BlogPostListItemProps> = ({
  post,
  index,
  isActive = false,
  basePath = '/dev',
  showDate = true,
  className = '',
}) => {
  if (!post) return null;

  const formattedIndex = String(index + 1).padStart(2, '0');
  const postUrl = `${basePath}/${post.slug?.current || '#'}`;

  return (
    <Link
      href={postUrl}
      className={`group border-t border-dashed border-gray-300 dark:border-gray-700 flex justify-start items-center min-h-11 ${
        isActive
          ? 'bg-gray-50 dark:bg-gray-800'
          : 'bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800'
      } ${className}`}
    >
      <div className="m-0 p-3 pl-4 block cursor-pointer w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-gray-400 dark:text-gray-600 w-6 text-right mr-3">
              {formattedIndex}
            </div>
            <p className={`line-clamp-2 leading-4 font-medium ${
              isActive
                ? 'text-blue-700 dark:text-blue-400'
                : 'text-gray-800 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-400'
            }`}>
              {post.title}
            </p>
          </div>
          {showDate && post.publishDate && (
            <span className="text-xs text-gray-600 dark:text-gray-400 ml-2 whitespace-nowrap font-medium">
              {formatRelativeTime(post.publishDate)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BlogPostListItem;
