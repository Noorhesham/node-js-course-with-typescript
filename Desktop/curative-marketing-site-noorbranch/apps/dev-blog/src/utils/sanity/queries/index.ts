import groq from 'groq';

import { client } from '@client';

export const getSinglePageData = async (pageType: string | string[], slug: string) => {
  const data = await client.fetch(
    groq`
    *[
      (_type in ${JSON.stringify(typeof pageType === 'string' ? [pageType] : pageType)})
      && seo.slug.current == $slug
    ][0]{
      seo {
        ...,
        "openGraphImage": openGraphImage.asset->url,
      },
      "featuredImage": featuredImage.asset->url,
    }`,
    { slug },
    {
      next: {
        revalidate: 5,
      },
    },
  );

  return {
    props: {
      data,
    },
  };
};

export * from './devBlog.queries';
