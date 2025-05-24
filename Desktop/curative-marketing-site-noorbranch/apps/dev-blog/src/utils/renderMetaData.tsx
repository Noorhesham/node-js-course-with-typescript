import type { Metadata } from 'next';
import type { SeoType } from 'types';

const renderMetadata = (slug?: string, seo?: SeoType, featuredImage?: string): Metadata => {
  const title = seo?.title || 'webstacks.dev | Developer Blog';
  const description = seo?.description || 'Technical articles, tutorials, and insights from the Webstacks development team';
  const images = featuredImage || (seo?.image ? seo.image.asset?._ref : '/open-graph-logo.png');
  const site = 'https://www.webstacks.dev';
  const url = `${site}${slug === '/' ? '' : `/${slug || ''}`}`;
  const index = true; // Default to indexable
  const follow = true; // Default to followable
  const canonicalUrl = seo?.canonicalUrl || url;

  const metadata = {
    title,
    description,
    openGraph: {
      images: typeof images === 'string' ? [images] : images,
      description,
      title,
      url: canonicalUrl,
    },
    robots: {
      index,
      follow,
    },
    metadataBase: new URL(site),
    alternates: {
      canonical: canonicalUrl,
    },
  };

  return metadata;
};

export default renderMetadata;
