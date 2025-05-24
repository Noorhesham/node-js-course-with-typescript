import { isEmpty } from 'lodash';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import React, { Fragment } from 'react';
import { FiArrowRight } from 'react-icons/fi';

import ScrambleTextFast from '@components/ui/ScrambleTextFast';
import ArticleWithScramble from '@components/ui/ArticleWithScramble';
import ScrambleTitle from '@components/ui/ScrambleTitle';

import Footer from '@sections/Footer';
import Header from '@sections/Header';
// import Section from '@primatives/Section';

import { fetchDevBlogPosts } from '@utils/sanity/queries/devBlog.queries';
import { fetchFooter } from '@utils/sanity/queries/footer.queries';
import { fetchHeaders } from '@utils/sanity/queries/header.queries';
import { formatDate, formatRelativeTime } from '@utils/functions';

import type { Metadata } from 'next';
import type { BlogProps } from 'types';

import { logger } from '@utils/logger';

export const metadata: Metadata = {
  title: 'webstacks.dev | Developer Blog',
  description: 'Technical articles, tutorials, and insights from the Webstacks development team',
};

const Page = async () => {
  try {
    const [devPosts, globalHeader, footerData] = await Promise.all([
      fetchDevBlogPosts(),
      fetchHeaders(),
      fetchFooter(),
    ]);

    if (isEmpty(devPosts)) {
      logger.warn('No dev blog posts found');
      return notFound();
    }

    return (
      <>
        <Header isDark={false} />

        {/* Retro Knurling Style Layout */}
        <div className="w-full pt-14.25 bg-white dark:bg-gray-900">
          {/* Knurling pattern at the top */}
          <div className="w-full h-6 overflow-hidden">
            <svg className="h-full w-full" preserveAspectRatio="none">
              <defs>
                <pattern id="knurl-pattern" x="0" y="0" width="14" height="28" patternUnits="userSpaceOnUse">
                  <path
                    className="fill-gray-200 dark:fill-gray-800"
                    d="M12 3.6V2.4H13.2V3.6H12ZM0 25.2V24H1.2V25.2H0ZM0 20.4V19.2H1.2V20.4H0ZM0 15.6V14.4H1.2V15.6H0ZM0 10.8V9.6H1.2V10.8H0ZM0 6V4.8H1.2V6H0ZM0 1.2V0H1.2V1.2H0ZM2.4 27.6V26.4H3.6V27.6H2.4ZM2.4 22.8V21.6H3.6V22.8H2.4ZM2.4 18V16.8H3.6V18H2.4ZM2.4 13.2V12H3.6V13.2H2.4ZM2.4 8.4V7.2H3.6V8.4H2.4ZM2.4 3.6V2.4H3.6V3.6H2.4ZM4.8 25.2V24H6V25.2H4.8ZM4.8 20.4V19.2H6V20.4H4.8ZM4.8 15.6V14.4H6V15.6H4.8ZM4.8 10.8V9.6H6V10.8H4.8ZM4.8 6V4.8H6V6H4.8ZM4.8 1.2V0H6V1.2H4.8ZM7.2 27.6V26.4H8.4V27.6H7.2Z"
                    opacity="1"
                  ></path>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#knurl-pattern)"></rect>
            </svg>
          </div>

          {/* Main content area with consistent max-width */}
          <div className="max-w-screen-xl mx-auto p-6 text-gray-950 dark:text-white relative border-x border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="relative mx-auto">
              {/* Blog header section */}
              <div className="relative z-10 border-b border-dashed border-gray-300 dark:border-gray-700 pb-8">
                <div className="font-mono text-xs overflow-x-auto whitespace-nowrap mb-4">
                  <span className="text-gray-500 dark:text-gray-400">$</span>
                  <span className="text-gray-800 dark:text-gray-300 ml-2">cd</span>
                  <span className="text-blue-700 dark:text-blue-400 ml-2">/webstacks/blog</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2 mr-2">&gt;</span>
                  <span className="text-gray-800 dark:text-gray-300">ls</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2 mr-2">-la</span>
                </div>
                <h1 className="text-4xl font-medium tracking-tight sm:text-5xl font-shareTechMono">webstacks.dev</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 font-ttFors">
                  Technical articles, tutorials, and insights from the Webstacks development team
                </p>
              </div>

                    {/* Blog posts section */}
              <div className="lg:mt-6 font-mono divide-y-0 divide-dashed divide-gray-300 dark:divide-gray-700">
                {devPosts.map((post: any, index: number) => (
                  <div key={post._id || index}>
                    <ArticleWithScramble
                      className="flex flex-col lg:flex-row group hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors border border-dashed border-gray-300 dark:border-gray-700 p-1 relative overflow-hidden shadow-md hover:shadow-lg"
                      href={`/blog/${post.seo?.slug?.current?.replace(/^dev\//, '') || '#'}`}
                    >
                            {/* Terminal window decorations */}
                            <div className="absolute top-0 left-0 w-full h-6 bg-gray-200 dark:bg-gray-800 flex items-center px-2 border-b border-dashed border-gray-300 dark:border-gray-700 z-10">
                            </div>
                            {/* Post date indicator - moved to left side with pattern accent */}
                            <div className="relative lg:w-32 lg:shrink-0 lg:grow-0 xl:w-48 lg:border-r lg:border-dashed lg:border-gray-300 lg:p-6 lg:pt-10 mt-8 lg:mt-0 font-mono">
                              <div className="absolute top-0 left-0 w-12 h-12 -mt-2 -ml-2 bg-[image:repeating-linear-gradient(315deg,_rgba(0,0,0,0.05)_0,_rgba(0,0,0,0.05)_1px,_transparent_0,_transparent_50%)] dark:bg-[image:repeating-linear-gradient(315deg,_rgba(255,255,255,0.1)_0,_rgba(255,255,255,0.1)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] opacity-80"></div>
                              <div className="text-xs text-green-600 dark:text-green-400 mb-1 flex items-center">
                                <span className="mr-1">$</span>
                                <span className="text-gray-700 dark:text-gray-300">date</span>
                              </div>
                              <time dateTime={post.publishDate} className="text-sm leading-6 text-gray-500 font-mono relative block pl-2">
                                {post.publishDate ? formatDate(post.publishDate) : 'No date'}
                              </time>
                            </div>

                            {/* Post content */}
                            <div className="relative p-6 pt-10 flex-1 font-mono">
                              {/* Right side corner stroke */}
                              <div className="absolute top-0 right-0 hidden lg:block">
                                <div className="relative w-3 h-3">
                                  <div className="absolute top-0 right-0 w-3 h-px bg-blue-700 dark:bg-blue-500"></div>
                                  <div className="absolute top-0 right-0 w-px h-3 bg-blue-700 dark:bg-blue-500"></div>
                                </div>
                              </div>
                              {/* Categories/Tags */}
                              <div className="flex flex-wrap gap-2 mb-3 font-mono text-xs">
                                <span className="text-green-600 dark:text-green-400 mr-1">$</span>
                                <span className="text-gray-700 dark:text-gray-300 mr-1">topics</span>
                                {post.blogCategories?.blogTopic && (
                                  <div className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 font-mono">
                                    <span>{post.blogCategories.blogTopic.name}</span>
                                  </div>
                                )}
                                {post.blogCategories?.blogCategory && (
                                  <div className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 font-mono">
                                    <span>{post.blogCategories.blogCategory.name}</span>
                                  </div>
                                )}
                                {post.blogCategories?.blogTag && (
                                  <div className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 font-mono">
                                    <span>{post.blogCategories.blogTag.name}</span>
                                  </div>
                                )}
                              </div>

                              {/* Post Title with Scramble Effect */}
                              <ScrambleTitle
                                title={post.title}
                              />

                              {/* Post excerpt */}
                              <p className="text-base text-gray-600 dark:text-gray-400 font-mono mb-4 dark:border-gray-700 pl-3">
                                {post.excerpt || 'No excerpt available'}
                              </p>

                              {/* Command prompt line */}
                              <div className="border-t border-dashed border-gray-300 dark:border-gray-700 pt-3 mt-4 font-mono text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                <span className="text-green-600 dark:text-green-400 mr-1">$</span>
                                <span className="text-gray-700 dark:text-gray-300">cat</span>
                                <span className="text-blue-600 dark:text-blue-400 ml-1">article.md</span>
                              </div>
                              
                              {/* Author avatars and footer */}
                              <div className="flex items-start mt-4">
                                {post.author?.[0]?.headshotUrl && (
                                  <div className="flex-shrink-0 mr-3">
                                    <div className="relative w-8 h-8 overflow-hidden rounded-full border border-dashed border-gray-300 dark:border-gray-700">
                                      <Image
                                        src={post.author[0].headshotUrl}
                                        alt={`${post.author[0].firstName || ''} ${post.author[0].lastName || ''}`}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                  </div>
                                )}
                                <div className="flex-1">
                                  <div className="text-xs text-gray-600 dark:text-gray-400">
                                    {post.author?.[0] ? `${post.author[0].firstName || ''} ${post.author[0].lastName || ''}`.trim() || 'Webstacks Author' : 'Webstacks Author'}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-500">
                                    {post.publishDate && formatRelativeTime(post.publishDate)}
                                    {post.readTime && ` · ${post.readTime} min read`}
                                  </div>
                                </div>
                                <div className="flex items-center text-blue-700 dark:text-blue-400">
                                  <span className="text-xs mr-1 font-mono">Read</span>
                                  <FiArrowRight size={12} />
                                </div>
                              </div>
                            </div>
                    </ArticleWithScramble>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Footer isDark={false} />
      </>
    );
  } catch (error) {
    logger.error('Error fetching dev blog posts:', error);
    return notFound();
  }
};

export default Page;
