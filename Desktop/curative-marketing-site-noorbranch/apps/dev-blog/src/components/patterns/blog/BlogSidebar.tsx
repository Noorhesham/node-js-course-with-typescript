import React, { FC } from 'react';
import Link from 'next/link';
import KnurlingPattern from '../../primatives/KnurlingPattern';

interface Post {
  _id?: string;
  title?: string;
  slug?: {
    current?: string;
  };
  [key: string]: any;
}

interface BlogSidebarProps {
  posts: Post[];
  currentSlug?: string;
  className?: string;
}

/**
 * A reusable blog sidebar component with related posts
 * 
 * @param posts - Array of related post objects
 * @param currentSlug - Current post slug to highlight the active post
 * @param className - Additional CSS classes
 */
export const BlogSidebar: FC<BlogSidebarProps> = ({
  posts,
  currentSlug,
  className = '',
}) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className={`hidden lg:block lg:col-span-3 relative order-1
      min-w-0 transition-all flex-col h-auto sticky top-0 z-10
      border-r border-dashed border-gray-300 dark:border-gray-700
      2xl:border-l border-l overflow-hidden ${className}`}
    >
      {/* Sticky header */}
      <div className="h-[8px] w-full sticky top-0 z-10 overflow-hidden">
        <div className="relative h-full w-full bg-gray-50 dark:bg-gray-800 border-y border-dashed border-gray-300 dark:border-gray-700">
          {/* Knurling pattern */}
          <KnurlingPattern size={4} />
        </div>
      </div>

      {/* Header */}
      <div className="flex h-[32px] w-full items-center whitespace-nowrap text-center font-mono text-xs uppercase text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border-b border-dashed border-gray-300 dark:border-gray-700 py-1 px-4">
        <div className="">&#47;&#47;&#47;&#47;&#47;</div>
        <div className="pl-1 text-gray-800 dark:text-gray-200"> RELATED POSTS</div>
      </div>

      {/* Posts list */}
      <div className="relative">
        <div className="max-h-[calc(100vh-200px)] overflow-auto no-scrollbar border-b border-dashed border-gray-300 dark:border-gray-700">
          <div className="text-xs font-mono bg-white">
            {posts.map((post, index) => (
              <Link
                key={post._id || index}
                href={`/dev/${post.slug?.current || '#'}`}
                className={`group border-t border-dashed border-gray-300 dark:border-gray-700 flex justify-start items-center min-h-11 ${
                  post.slug?.current === currentSlug
                    ? 'bg-gray-50 dark:bg-gray-800'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <div className="m-0 p-3 block w-full">
                  <div className="flex items-center">
                    <div className="text-gray-400 dark:text-gray-600 w-6 text-right mr-3">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className={`${
                      post.slug?.current === currentSlug
                        ? 'text-blue-700 dark:text-blue-400'
                        : 'text-gray-800 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-400'
                    }`}>
                      {post.title}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-4 px-4">
          <Link
            href="/"
            className="bg-gray-200 dark:bg-gray-700 border-[1.5px] relative top-[2px] w-auto text-gray-800 dark:text-gray-200 inline-block border-gray-300 dark:border-gray-600 border-dashed text-center group w-full block"
          >
            <span className="relative text-center w-auto bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:text-blue-700 dark:hover:text-blue-400 border-gray-300 dark:border-gray-600 border-dashed text-[15px] font-medium border-[1.5px] px-5 py-2 -translate-y-1 hover:-translate-y-1.5 active:-translate-y-0.5 mx-[-1.5px] block active:transition-all active:duration-100 select-none font-mono">
              VIEW ALL POSTS
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
