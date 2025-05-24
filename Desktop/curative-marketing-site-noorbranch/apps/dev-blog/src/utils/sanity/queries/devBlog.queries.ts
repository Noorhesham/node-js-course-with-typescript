// devBlog.queries.ts
import groq from 'groq';

import { sanityFetch } from '@utils/sanity/client/sanity.fetch';

import type { BlogProps } from '@/types';

/**
 * Fetch all dev blog posts, ordered by publish date (newest first)
 */
export const fetchDevBlogPosts = async () => {
  return await sanityFetch<BlogProps[]>({
    query: groq`
    *[_type == "webstacksDevPost"] | order(publishDate desc){
      _id,
      seo,
      title,
      featuredImage,
      author[]-> { 
        _id, 
        firstName, 
        lastName, 
        headshot,
        "headshotUrl": headshot.asset->url
      },
      excerpt,
      publishDate,
      "readTime": round(length(pt::text(body)) / 5000),
      blogCategories{
        blogTopic-> { _id, name, slug },
        blogTag-> { _id, name, slug },
        useCases[]-> { _id, name, slug },
        industry-> { _id, name, slug },
        technology-> { _id, name, slug },
      }
    }`,
  });
};

/**
 * Fetch all dev blog post slugs
 */
export const fetchDevBlogSlugs = async () => {
  const results = await sanityFetch<{ slug: string }[]>({
    query: groq`
    *[_type == "webstacksDevPost"]{
      "slug": seo.slug.current
    }`,
  });

  // Normalize slugs to use the 'blog/' prefix for the dev-blog app
  return results
    .map(item => ({
      ...item,
      slug: item.slug?.trim() || '',
    }))
    .filter(item => item.slug);
};

/**
 * Fetch a single dev blog post by slug
 */
export const fetchDevBlogPostBySlug = async (slug: string) => {
  const query = groq`
  *[_type == "webstacksDevPost" && seo.slug.current == $slug][0] {
    ...,
    _id,
    title,
    seo,
    featuredImage,
    author[]-> { 
      _id, 
      firstName, 
      lastName, 
      headshot,
      "headshotUrl": headshot.asset->url,
      bio
    },
    publishDate,
    excerpt,
    body,
    "readTime": round(length(pt::text(body)) / 5000),
    blogCategories {
      blogTopic-> {
        _id,
        name,
        slug
      },
      blogTag-> {
        _id,
        name,
        slug
      },
      useCases[]-> {
        _id,
        name,
        slug
      },
      industry-> {
        _id,
        name,
        slug
      },
      technology-> {
        _id,
        name,
        slug
      }
    }
  }`;

  try {
    // Try with the original slug first
    let post = await sanityFetch<BlogProps>({
      query,
      params: { slug },
    });
    
    // If no post found and slug doesn't have a prefix, try with 'blog/' prefix
    if (!post && !slug.includes('/')) {
      const blogSlug = `blog/${slug}`;
      post = await sanityFetch<BlogProps>({
        query,
        params: { slug: blogSlug },
      });
    }
    
    // If still no post found, try with 'dev/' prefix
    if (!post && !slug.includes('/')) {
      const devSlug = `dev/${slug}`;
      post = await sanityFetch<BlogProps>({
        query,
        params: { slug: devSlug },
      });
    }

    // If still no post found and slug starts with 'blog/', try without the prefix
    if (!post && slug.startsWith('blog/')) {
      const cleanSlug = slug.replace(/^blog\//, '');
      post = await sanityFetch<BlogProps>({
        query,
        params: { slug: cleanSlug },
      });
    }
    
    return post;
  } catch (error) {
    console.error('Error fetching dev blog post by slug:', error);
    return null;
  }
};
