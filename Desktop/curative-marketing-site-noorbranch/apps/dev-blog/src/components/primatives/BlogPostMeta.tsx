import React, { FC } from 'react';
import { formatDate } from 'utils/functions';

interface BlogPostMetaProps {
  publishDate?: string;
  readTime?: number;
  category?: string;
  className?: string;
  dateFormat?: Intl.DateTimeFormatOptions | boolean;
}

/**
 * A reusable component for displaying blog post metadata
 * 
 * @param publishDate - The publication date of the post
 * @param readTime - The estimated reading time in minutes
 * @param category - The post category
 * @param className - Additional CSS classes
 * @param dateFormat - Date format to use (default: 'MMMM d, yyyy')
 */
export const BlogPostMeta: FC<BlogPostMetaProps> = ({
  publishDate,
  readTime,
  category,
  className = '',
  dateFormat = false
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-400 font-mono ${className}`}>
      {publishDate && (
        <div className="flex items-center">
          <svg 
            className="w-4 h-4 mr-1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>{formatDate(publishDate, typeof dateFormat === 'object' ? dateFormat : undefined, typeof dateFormat === 'boolean' ? !dateFormat : false)}</span>
        </div>
      )}
      
      {readTime && (
        <div className="flex items-center">
          <svg 
            className="w-4 h-4 mr-1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>{readTime} min read</span>
        </div>
      )}
      
      {category && (
        <div className="flex items-center">
          <svg 
            className="w-4 h-4 mr-1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          <span>{category}</span>
        </div>
      )}
    </div>
  );
};

export default BlogPostMeta;
