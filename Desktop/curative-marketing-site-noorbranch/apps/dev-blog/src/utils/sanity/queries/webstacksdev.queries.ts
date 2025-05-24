// webstacksdev.queries.ts
import groq from 'groq';

import { complexRichTextQuery } from '@utils/sanity/queries/queryFragments/complexRichText.query';
import { sanityFetch } from '@utils/sanity/client/sanity.fetch';

import type { BlogProps } from 'types';

export const fetchWebstacksDevPosts = async () => {
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

export const fetchWebstacksDevSlugs = async () => {
  const results = await sanityFetch<{ slug: string }[]>({
    query: groq`
    *[_type == "webstacksDevPost"]{
      "slug": seo.slug.current
    }`,
  });

  // Normalize slugs to use the 'dev/' prefix
  return results
    .map(item => ({
      ...item,
      slug: item.slug?.trim().replace(/^webstacksdev\//, 'dev/') || '',
    }))
    .filter(item => item.slug);
};

const pageQuery = groq`
*[_type == "webstacksDevPost" && seo.slug.current == $slug][0] {
  _id,
  seo,
  title,
  featuredImage,
  author[]-> { 
    _id, 
    firstName, 
    lastName, 
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
  },
  body[] {
    ...,
    ${complexRichTextQuery}
  }
}`;

export const fetchFullWebstacksDevData = async (slug: string) => {
  if (!slug) {
    throw new Error('Slug is required to fetch webstacks.dev post data');
  }

  // Normalize the slug to handle both with and without the 'webstacksdev/' prefix
  const normalizedSlug = slug.replace(/^(webstacksdev|dev)\//, '');
  
  // Try to find the post with the normalized slug
  const post = await sanityFetch<BlogProps>({
    query: pageQuery,
    params: {
      slug: `webstacksdev/${normalizedSlug}`,
    },
  });

  if (!post) {
    // If not found, try with the dev/ prefix
    const altPost = await sanityFetch<BlogProps>({
      query: pageQuery,
      params: {
        slug: `dev/${normalizedSlug}`,
      },
    });

    return altPost || null;
  }

  return post;
};
