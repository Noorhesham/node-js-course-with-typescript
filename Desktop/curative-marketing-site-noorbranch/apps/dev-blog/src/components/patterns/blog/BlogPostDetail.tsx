'use client';

import { PortableText } from '@portabletext/react';
import { getImageDimensions } from '@sanity/asset-utils';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { useState, useRef, useEffect, FC } from 'react';

// Import reusable components
import KnurlingPattern from '@/components/primatives/KnurlingPattern';
import KnurlingPatternSVG from '@/components/primatives/KnurlingPatternSVG';
import SectionHeader from '@/components/primatives/SectionHeader';
import BlogPostList from '@/components/patterns/blog/BlogPostList';
import StickyTableOfContents from '@/components/primatives/StickyTableOfContents';
import TerminalBreadcrumb from '@/components/primatives/TerminalBreadcrumb';
import AuthorInfo from '@/components/primatives/AuthorInfo';
import KeyPoints from '@/components/primatives/KeyPoints';
import Button from '@/components/primatives/Button';
import BlogPostMeta from '@/components/primatives/BlogPostMeta';
import CategoryDropdown from '@/components/primatives/CategoryDropdown';
import SortOptions from '@/components/primatives/SortOptions';
import ArticleFeedback from '@/components/primatives/ArticleFeedback';

import { formatDate, formatRelativeTime } from 'utils/functions';
import { createDevBlogComponents } from 'utils/devBlogStyles';

import { imageBuilder } from '@client';

// FC is now imported directly above
import type { BlogProps } from 'types';

// Define internal custom props interface
interface InternalCustomProps {
  blogDetailScrollerProps?: {
    category?: string;
    slug?: string;
  };
  relatedPosts?: BlogProps[];
}

// Extend BlogProps with internal custom props
interface ExtendedBlogProps extends BlogProps {
  _internalCustomProps?: InternalCustomProps;
}

const BlogPostDetail: FC<ExtendedBlogProps> = ({
  _id,
  body,
  title,
  excerpt,
  featuredImage,
  publishDate,
  author,
  tableOfContents,
  highlights,
  highlightsTitle,
  _internalCustomProps,
}) => {
  /**
   * Get author headshot URL with proper fallback handling
   * @param authorData - Author data from Sanity
   * @returns URL to the author's headshot image
   */
  const getAuthorHeadshot = (authorData: any): string => {
    if (!authorData || !authorData[0]) return '';
    
    // First try to use the direct URL if available
    if (authorData[0].headshotUrl) return authorData[0].headshotUrl;
    
    // Then try to build the URL from the asset reference
    if (authorData[0]?.headshot?.asset?._ref) {
      return imageBuilder.image(authorData[0].headshot).url();
    }
    
    // Fallback to empty string if no image is available
    return '';
  };
  
  /**
   * Topic item interface for table of contents
   */
  interface TopicItem {
    id: string;
    title: string;
    level?: number;
  }
  
  /**
   * Props for the CategoryDropdown component
   */
  interface CategoryDropdownProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
  }
  
  /**
   * Props for the SortOptions component
   */
  interface SortOptionsProps {
    sortOption: 'date' | 'popularity';
    onSortChange: (option: 'date' | 'popularity') => void;
  }
  
  /**
   * Props for the RelatedPostsList component
   */
  interface RelatedPostsListProps {
    posts: any[];
    currentSlug?: string;
  }
  
  /**
   * Props for the TableOfContentsItem component
   */
  interface TableOfContentsItemProps {
    item: TopicItem;
    index: number;
  }
  
  /**
   * Formats the line number with leading zeros
   * @param index - The index of the item
   * @returns Formatted line number string
   */
  const formatLineNumber = (index: number): string => {
    return (index + 1).toString().padStart(2, '0');
  };
  
  /**
   * Determines if a topic is a main heading based on its title
   * @param title - The title of the topic
   * @param level - Optional level of the heading
   * @returns Whether the topic is a main heading
   */
  const isMainHeading = (title: string, level?: number): boolean => {
    if (level === 1) return true;
    return title.startsWith('Why') || title.startsWith('How') || title.startsWith('What');
  };
  
  /**
   * Component for rendering a single table of contents item
   */
  const TableOfContentsItem: FC<TableOfContentsItemProps> = ({ item, index }) => {
    const lineNumber = formatLineNumber(index);
    const isMain = isMainHeading(item.title, item.level as number);
    const isFirst = index === 0;
    
    return (
      <Link
        href={`#${item.id}`}
        className="group border-t border-dashed border-gray-300 dark:border-gray-700 flex justify-start items-center min-h-11 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <div
          className={`flex self-start justify-center items-center absolute left-0 w-8 h-6 shrink-0 border-r border-b border-dashed border-gray-300 dark:border-gray-700 ${
            isFirst ? 'bg-gray-900 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'
          } group-hover:bg-blue-700 transition-colors`}
        >
          <p
            className={`p-1 m-0 ${
              isFirst ? 'text-white' : 'text-gray-700'
            } group-hover:text-white transition-colors`}
          >
            {lineNumber}
          </p>
        </div>
        <div className="m-0 p-3 pl-10 block cursor-pointer">
          <p className="line-clamp-2 leading-4 text-gray-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-400">
            {isMain ? (
              <span className="font-medium">// {item.title}</span>
            ) : (
              item.title
            )}
          </p>
        </div>
      </Link>
    );
  };
  
  /**
   * Props for the DefaultTocItem component
   */
  interface DefaultTocItemProps {
    href: string;
    title: string;
    index: number;
    isMain?: boolean;
  }
  
  /**
   * Component for rendering a default table of contents item
   */
  const DefaultTocItem: FC<DefaultTocItemProps> = ({ href, title, index, isMain = false }) => {
    const lineNumber = formatLineNumber(index);
    
    return (
      <Link
        href={href}
        className="group border-t border-dashed border-gray-300 dark:border-gray-700 flex justify-start items-center min-h-11 hover:bg-gray-100 dark:hover:bg-gray-800 bg-white dark:bg-gray-900"
      >
        <div 
          className={`flex self-start justify-center items-center absolute left-0 w-8 h-6 shrink-0 border-r border-b border-dashed border-gray-300 dark:border-gray-700 ${
            isMain ? 'bg-gray-900 dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
          } group-hover:${isMain ? 'bg-blue-700' : 'bg-blue-100'} transition-colors`}
        >
          <p className={`p-1 m-0 ${isMain ? 'text-gray-200' : 'text-gray-700'} group-hover:${isMain ? 'text-white' : 'text-blue-700'} transition-colors`}>
            {lineNumber}
          </p>
        </div>
        <div className="m-0 p-3 pl-10 block cursor-pointer">
          <p className="line-clamp-2 leading-4 text-gray-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-400">
            {isMain ? <span className="font-medium">// {title}</span> : title}
          </p>
        </div>
      </Link>
    );
  };
  
  // These components have been moved to standalone files
  
  // Get author headshot URL using the pure function
  const authorAvatarUrl = getAuthorHeadshot(author);
      
  // Log author data for debugging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Author data:', author);
    }
  }, [author]);
  const authorName =
    author?.[0]?.firstName && author?.[0]?.lastName
      ? `${author[0].firstName} ${author[0].lastName}`
      : author?.[0]?.firstName || author?.[0]?.lastName || 'Webstacks Author';
  const [relatedPostsData] = useState(_internalCustomProps?.relatedPosts || []);
  const [sortOption, setSortOption] = useState<'date' | 'popularity'>('date');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All posts');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Extract unique blog topics from related posts
  const categories = [
    'All posts',
    ...Array.from(
      new Set(relatedPostsData.map(post => post.blogCategories?.blogTopic?.name).filter(Boolean) as string[]),
    ),
  ];

  // Filter posts by selected category
  const filteredPosts =
    selectedCategory === 'All posts'
      ? relatedPostsData
      : relatedPostsData.filter(post => post.blogCategories?.blogTopic?.name === selectedCategory);

  // Sort the filtered posts based on the selected option
  const relatedPosts = [...filteredPosts].sort((a, b) => {
    if (sortOption === 'date') {
      // Sort by date (newest first)
      return new Date(b.publishDate || '').getTime() - new Date(a.publishDate || '').getTime();
    } else {
      // Sort by popularity (using views or a popularity field if available)
      // For now, we'll use a random value as a placeholder for popularity
      // In a real implementation, you would use actual view counts or other metrics
      // Since 'views' is not in BlogProps, we'll use a fallback method
      const viewsA = (a as any).views || 0;
      const viewsB = (b as any).views || 0;
      return viewsB - viewsA;
    }
  });

  // Extract main topics from the post for the sidebar if tableOfContents is not available
  const extractTopics = (): TopicItem[] => {
    if (!body) return [];

    // Find all the h2 headings in the body
    const topics = body
      .filter(block => block._type === 'block' && block.style === 'h2')
      .map(block => ({
        title: block.children[0]?.text || '',
        id: block._key || `heading-${Math.random().toString(36).substring(2, 9)}`,
        level: 2
      }));

    return topics;
  };

  // Use tableOfContents from Sanity if available, otherwise extract from body
  const topics: TopicItem[] =
    tableOfContents && tableOfContents.length > 0
      ? tableOfContents
          .map(item => ({
            title: (item as any).sectionTitle || item.title || '',
            id: item.sectionId || '',
            level: item.level || 2,
            hidden: item.hidden || false,
          }))
          .filter(item => !item.hidden)
      : extractTopics();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 relative overflow-x-hidden">
      {/* Knurling pattern at the top */}
      <KnurlingPatternSVG height="6" />

      {/* Main content area */}
      <div className="w-full px-4 overflow-x-hidden">
        {/* Dotted line separator */}
        <div className="grid grid-cols-12 gap-4 max-w-screen-xl mx-auto">
          {/* Left sidebar - 3 columns */}
          <div
            className="
            hidden lg:block lg:col-span-3 relative order-1
            min-w-0 transition-all flex-col h-auto sticky top-0 z-10
            border-r border-dashed border-gray-300 dark:border-gray-700
            2xl:border-l overflow-hidden
            border-l
          "
          >
            {/* Sticky header */}
            <div className="h-[8px] w-full sticky top-0 z-10 overflow-hidden">
              <div className="relative h-full w-full bg-gray-50 dark:bg-gray-800 border-y border-dashed border-gray-300 dark:border-gray-700">
                {/* Knurling pattern */}
                <div
                  className="absolute inset-0 overflow-hidden dark:opacity-50"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
                    backgroundSize: '4px 4px',
                    backgroundPosition: '0 0',
                  }}
                ></div>
              </div>
            </div>

            {/* Category filter bar */}
            <CategoryDropdown 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            {/* Sort options */}
            <SortOptions 
              sortOption={sortOption}
              onSortChange={(option) => setSortOption(option as 'date' | 'popularity')}
            />

            {/* Posts list with gradient overlay */}
            <div className="relative">
              <BlogPostList 
                posts={relatedPosts} 
                currentSlug={_internalCustomProps?.blogDetailScrollerProps?.slug}
              />
              <div className="mt-4 px-4">
                <Button href="/">
                  View all posts
                </Button>
              </div>
            </div>
          </div>

          {/* Main article content - 6 columns */}
          <div className="col-span-12 lg:col-span-6 p-4 relative order-2 overflow-hidden">
            {/* Navigation links - only visible on mobile */}
            <div className="flex items-center gap-2 text-sm py-4 border-b border-dashed border-gray-300 dark:border-gray-700 lg:hidden">
              <Link href="/dev" className="text-blue-700 hover:underline">
                Posts
              </Link>
              <span className="text-gray-900 dark:text-gray-100">→</span>
              <Link href="/dev" className="text-blue-700 hover:underline">
                Engineering
              </Link>
            </div>

            {/* Author info moved to sidebar */}

            {/* Featured image */}
            {featuredImage?.asset && (
              <div className="overflow-hidden border-t border-b border-dashed border-gray-300 dark:border-gray-700 relative">
                <div className="absolute left-0 top-0 w-full">
                  <KnurlingPatternSVG height="3" />
                </div>
                <div className="absolute left-0 bottom-0 w-full">
                  <KnurlingPatternSVG height="3" />
                </div>
                <Image
                  src={imageBuilder.image(featuredImage.asset._ref).url()}
                  alt={title || 'Featured Image'}
                  width={800}
                  height={450}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Article content */}
            {body && (
              <div id="article" className="max-w-none text-gray-900 dark:text-gray-100 px-0 text-base font-ttFors">
                <div className="grid grid-cols-1 gap-6 relative">
                  {/* Retro terminal-style breadcrumbs */}
                  <TerminalBreadcrumb 
                    basePath="/dev"
                    category={_internalCustomProps?.blogDetailScrollerProps?.category ? {
                      name: _internalCustomProps.blogDetailScrollerProps.category,
                      href: `/dev/category/${_internalCustomProps.blogDetailScrollerProps.category}`
                    } : undefined}
                    title={title}
                  />
                  <div>
                    <h1 className="text-3xl md:text-4xl font-medium text-gray-950 dark:text-gray-50 relative font-shareTechMono mb-4">
                      {title}
                    </h1>
                    {/* Date with knurl pattern */}
                    {publishDate && <p className="text-sm text-gray-900 dark:text-gray-100 pb-6 font-ttFors">{formatDate(publishDate)}</p>}
                  </div>
                  {/* Vertical dotted line */}
                  <PortableText
                    components={createDevBlogComponents(topics) as any}
                    value={body.map(item => ({ ...item, hasSocialShare: true, isInBlogDetail: true }))}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar - 3 columns */}
          <div className="col-span-12 lg:col-span-3 lg:border-l lg:border-r border-dashed border-gray-300 dark:border-gray-700 relative order-3">
            <div className="divide-y divide-dashed divide-gray-300 dark:divide-gray-700">
              {/* Was this post useful? */}
              <ArticleFeedback 
                articleId={_id || ''} 
                articleTitle={title || ''}
              />
              
              {/* Author information */}
              <div className="mb-4 relative">
                <div className="max-h-[calc(100vh-200px)] overflow-auto no-scrollbar border-b border-dashed border-gray-300 dark:border-gray-700">
                  <div className="text-xs font-mono bg-white dark:bg-gray-900">
                    <div className="group border-dashed border-gray-300 dark:border-gray-700 flex justify-start items-center min-h-11">
                      <div className="m-0 p-3 block w-full">
                        <p className="text-xs font-mono text-gray-900 dark:text-gray-100 mb-2">Posted by</p>
                        {author && author.length > 0 && (
                          <div className="flex items-center space-x-4">
                            <div className="h-10 w-10">
                              {authorAvatarUrl ? (
                                <img
                                  src={authorAvatarUrl}
                                  alt={`Portrait of ${authorName}`}
                                  width={40}
                                  height={40}
                                  className="rounded-full grayscale"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-700">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col space-y-1 font-mono text-xs text-gray-700 dark:text-gray-300">
                              <h4 className="font-medium">{authorName}</h4>
                              <h5>{''}</h5>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main topics from the article - Key Points */}
              <div className="mb-4 relative lg:sticky lg:top-4" style={{ zIndex: 20 }}>
                <KeyPoints 
                  title={highlightsTitle || 'HIGHLIGHTS'}
                  points={highlights && highlights.length > 0 
                    ? highlights 
                    : topics.length > 0 
                      ? topics.slice(0, 5).map(topic => topic.title) 
                      : [
                          "It's upstream of other metrics",
                          "Engineers can directly influence it",
                          "It's useful across the organization"
                        ]}
                />
              </div>

              {/* On this page - Table of Contents */}
              <div className="mb-4 relative lg:sticky lg:top-[calc(100vh-400px)]">
                <div className="flex h-[32px] w-full items-center whitespace-nowrap text-center font-mono text-xs uppercase text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border-y border-dashed border-gray-300 dark:border-gray-700 py-1 px-4 sticky top-0 z-10">
                  <div className="">&#47;&#47;&#47;&#47;&#47;</div>
                  <div className="pl-1 text-gray-800 dark:text-gray-200"> TABLE OF CONTENTS</div>
                </div>
                <div className="max-h-[calc(100vh-200px)] overflow-auto no-scrollbar border-b border-dashed border-gray-300 dark:border-gray-700">
                  <div className="text-xs font-mono bg-white dark:bg-gray-900">
                    {topics && topics.length > 0 ? (
                      topics.map((item, index) => (
                        <TableOfContentsItem 
                          key={index} 
                          item={item} 
                          index={index} 
                        />
                      ))
                    ) : (
                      // If no tableOfContents, create a structured TOC from topics
                      <>
                        <DefaultTocItem 
                          href="#article" 
                          title={title || 'Main Content'} 
                          index={0} 
                          isMain={true} 
                        />

                        {/* If we have default content for activation */}
                        {title && title.includes('activation') && topics.length === 0 && (
                          <>
                            <DefaultTocItem 
                              href="#metrics" 
                              title="1. It's upstream of other metrics" 
                              index={1} 
                            />
                            <DefaultTocItem 
                              href="#influence" 
                              title="2. It's something engineers can directly influence" 
                              index={2} 
                            />
                            <DefaultTocItem 
                              href="#organization" 
                              title="3. It's useful across the organization" 
                              index={3} 
                            />

                            {/* Additional sections */}
                            <DefaultTocItem 
                              href="#finding" 
                              title="How we find activation metrics at Webstacks" 
                              index={4} 
                              isMain={true} 
                            />
                            <DefaultTocItem 
                              href="#after" 
                              title="What to do after you've defined activation" 
                              index={5} 
                              isMain={true} 
                            />
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom knurling pattern */}
        <div className="w-full h-6 overflow-hidden mt-8">
          <svg className="h-full w-full" preserveAspectRatio="none">
            <rect width="100%" height="100%" fill="url(#knurl-pattern)"></rect>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;
