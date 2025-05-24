// types.d.ts
import { PortableTextBlock } from '@portabletext/types';

// Sanity image type
export interface sanityImageProps {
  _type: 'image';
  asset?: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
}

// Sanity video type
export interface sanityVideoProps {
  _type: 'video';
  asset?: {
    _ref: string;
    _type: 'reference';
  };
  url?: string;
}

// SEO type
export interface SeoType {
  title?: string;
  description?: string;
  slug?: {
    current?: string;
  };
  image?: sanityImageProps;
  keywords?: string[];
  canonicalUrl?: string;
}

// Category props
export interface CategoryProps {
  _id: string;
  name?: string;
  slug?: {
    current?: string;
  };
}

// Person props
export interface PersonProps {
  _id: string;
  firstName?: string;
  lastName?: string;
  headshotUrl?: string;
  bio?: PortableTextBlock[];
}

// Blog post props
export interface BlogProps {
  _key: string;
  _id: string;
  _type: 'webstacksDevPost';
  seo: SeoType;
  title?: string;
  excerpt?: string;
  featuredImage?: sanityImageProps;
  author?: PersonProps[];
  body?: PortableTextBlock[];
  plainBody?: string;
  blogCategories?: {
    blogCategory?: CategoryProps;
    blogTopic?: CategoryProps;
    blogTag?: CategoryProps;
    industry?: CategoryProps;
    technology?: CategoryProps;
    useCases?: CategoryProps[];
  };
  publishDate?: string;
  hideFromListing?: boolean;
  readTime?: number;
  tableOfContents?: {
    title: string;
    originalTitle: string;
    level: number;
    sectionId: string;
    hidden: boolean;
    order: number;
  }[];
  highlights?: string[];
  highlightsTitle?: string;
}
