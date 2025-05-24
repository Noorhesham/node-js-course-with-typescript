import { isEmpty } from 'lodash';
import { notFound } from 'next/navigation';

import BlogPostDetail from '@patterns/blog/BlogPostDetail';
import Footer from '@sections/Footer';
import Header from '@sections/Header';

import renderMetadata from 'utils/renderMetaData';
import { getSinglePageData } from 'utils/sanity/queries';
import {
  fetchDevBlogPosts,
  fetchDevBlogSlugs,
  fetchDevBlogPostBySlug,
} from 'utils/sanity/queries/devBlog.queries';

import type { Metadata } from 'next';
import type { BlogProps } from 'types';

// Add logger utility for consistent logging
const logger = {
  warn: (message: string, ...args: any[]) => console.warn(message, ...args),
  error: (message: string, ...args: any[]) => console.error(message, ...args),
};

type Params = {
  params: {
    slug: string;
  };
};

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
  const pageType = 'devBlogPost';
  const paramSlug = params?.slug || '';
  // Ensure proper slug format for Sanity queries
  const slug = paramSlug.startsWith('blog/') ? paramSlug : `blog/${paramSlug}`;

  // Try to get SEO data with blog/ prefix
  const seoData = await getSinglePageData(pageType, slug);

  return renderMetadata(slug, seoData?.props?.data?.seo);
};

const Page = async ({ params }: Params) => {
  const paramSlug = params?.slug || '';
  // Decode the slug but don't add any prefixes - our improved fetchDevBlogPostBySlug will handle that
  const decodedSlug = decodeURIComponent(paramSlug).trim();

  try {
    // Fetch the blog post data
    // The improved fetchDevBlogPostBySlug function will try multiple slug formats
    const [pageData, devPosts] = await Promise.all([
      fetchDevBlogPostBySlug(decodedSlug),
      fetchDevBlogPosts(),
    ]);

    if (isEmpty(pageData)) {
      logger.warn(`No dev blog post found for slug: ${decodedSlug}`);
      return notFound();
    }

    const recentPosts = devPosts
      ?.filter(post => post?.seo?.slug?.current !== pageData?.seo?.slug?.current)
      ?.slice(0, 3);

    return (
      <>
        <Header isDark={false} />
        <main className="size-full dark:bg-gray-900">
          <BlogPostDetail
            {...pageData}
            _internalCustomProps={{
              blogDetailScrollerProps: {
                category: 'DEV BLOG',
                slug: '/',
              },
              relatedPosts: recentPosts,
            }}
          />
        </main>
        <Footer isDark={true} />
      </>
    );
  } catch (error) {
    logger.error('Error fetching dev blog post data:', error);
    return notFound();
  }
};

export const generateStaticParams = async () => {
  // Only generate pages for slugs that exist in Sanity
  const slugs = await fetchDevBlogSlugs();
  const validSlugs = [];

  for (const item of slugs) {
    if (!item.slug || item.slug === '' || typeof item.slug !== 'string') continue;
    
    // The slug in the URL should not include the 'blog/' prefix
    // as that's already part of the route structure
    let routeSlug = item.slug;
    
    // Remove any blog/ or dev/ prefix if present
    if (routeSlug.startsWith('blog/') || routeSlug.startsWith('dev/')) {
      routeSlug = routeSlug.replace(/^(blog|dev)\//, '');
    }
    
    // Verify the content exists using the original slug from Sanity
    const data = await fetchDevBlogPostBySlug(routeSlug);
    if (data) {
      validSlugs.push({ slug: routeSlug });
    } else {
      logger.warn(`Skipping generation for missing dev blog post: ${routeSlug}`);
    }
  }

  return validSlugs;
};

export default Page;
