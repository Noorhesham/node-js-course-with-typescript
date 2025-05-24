import React, { FC } from 'react';
import { BlogPostListItem } from '@/components/primatives/BlogPostListItem';

interface BlogPost {
  _id?: string;
  title?: string;
  slug?: {
    current?: string;
  };
  publishDate?: string;
  [key: string]: any;
}

interface BlogPostListProps {
  posts: BlogPost[];
  currentSlug?: string;
  basePath?: string;
  showDate?: boolean;
  maxHeight?: string;
  className?: string;
  emptyMessage?: string;
}

/**
 * A reusable component for displaying a list of blog posts
 * 
 * @param posts - Array of blog post objects
 * @param currentSlug - The slug of the currently active post
 * @param basePath - The base path for the blog posts (default: '/dev')
 * @param showDate - Whether to show the publication date (default: true)
 * @param maxHeight - Maximum height for the scrollable container (default: 'calc(100vh-200px)')
 * @param className - Additional CSS classes
 * @param emptyMessage - Message to display when no posts are found (default: 'No posts found')
 */
export const BlogPostList: FC<BlogPostListProps> = ({
  posts,
  currentSlug,
  basePath = '/dev',
  showDate = true,
  maxHeight = 'calc(100vh-200px)',
  className = '',
  emptyMessage = 'No posts found'
}) => {
  return (
    <div className={`max-h-[${maxHeight}] overflow-auto no-scrollbar border-b border-dashed border-gray-300 dark:border-gray-700 ${className}`}>
      <div className="text-xs font-mono bg-white dark:bg-gray-900">
        {posts && posts.length > 0 ? (
          posts.map((post, index) => (
            <BlogPostListItem
              key={post._id || index}
              post={post}
              index={index}
              isActive={post.slug?.current === currentSlug}
              basePath={basePath}
              showDate={showDate}
            />
          ))
        ) : (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            {emptyMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostList;
