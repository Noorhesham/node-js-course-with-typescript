/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import Image from 'next/image';
import type { PortableTextReactComponents } from '@portabletext/react';

import { imageBuilder } from '@client';
import CodeSnippet from '@primatives/CodeSnippet';

/**
 * Transforms text into a URL-friendly slug
 * @param text - The input text to convert to a slug
 * @returns A URL-friendly slug string
 */
export const generateSlug = (text: string): string => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
};

/**
 * Props for the Heading component
 */
type HeadingProps = {
  level: number;
  className: string;
  children: React.ReactNode;
};

/**
 * Extracts text content from children for heading ID generation
 * @param children - React children nodes
 * @returns The extracted text content
 */
const extractHeadingText = (children: React.ReactNode): string => {
  if (!children) return '';
  
  // Handle different children structures
  if (Array.isArray(children)) {
    const firstChild = children[0];
    if (firstChild?.props?.text) return firstChild.props.text.toString();
    if (typeof firstChild === 'string') return firstChild;
    return firstChild?.toString() || '';
  }
  
  return children.toString();
};

/**
 * Creates a dynamic heading component with proper ID for anchor links
 */
const Heading = ({ level, className, children }: HeadingProps): JSX.Element => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const headingText = extractHeadingText(children);
  const headingId = generateSlug(headingText) || `heading-${Date.now()}`;

  return (
    <Tag className={className} id={headingId}>
      {children}
    </Tag>
  );
};

/**
 * Props for the RichImage component
 */
type RichImageProps = {
  value: {
    asset?: { _ref: string };
    alt?: string;
  };
};

/**
 * Renders a rich image from Sanity with proper formatting
 */
const RichImage = ({ value }: RichImageProps): JSX.Element | null => {
  if (!value?.asset) return null;
  
  const { asset, alt } = value;
  const imageUrl = imageBuilder.image(asset._ref).url();
  const imageAlt = alt || '';
  
  return (
    <div className="my-8 overflow-hidden rounded-md border border-dashed border-gray-300 dark:border-gray-700">
      <Image
        src={imageUrl}
        alt={imageAlt}
        width={1200}
        height={630}
        className="h-auto w-full"
        loading="lazy"
      />
      {alt && <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">{alt}</p>}
    </div>
  );
};

/**
 * Rich text components for Portable Text rendering
 */
export const RichTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    richImage: RichImage,
    codeSnippet: ({ value }: any) => {
      const { code, language, filename } = value;
      if (!code) return null;

      return <CodeSnippet code={code} language={language} filename={filename} />;
    },
  },
  block: {
    h1: ({ children }) => (
      <Heading level={1} className="mt-8 mb-4 text-3xl font-medium text-gray-900 dark:text-gray-100 font-shareTechMono">
        {children}
      </Heading>
    ),
    h2: ({ children }) => (
      <Heading level={2} className="mt-8 mb-4 text-2xl font-medium text-gray-900 dark:text-gray-100 font-shareTechMono">
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading level={3} className="mt-6 mb-3 text-xl font-medium text-gray-900 dark:text-gray-100 font-shareTechMono">
        {children}
      </Heading>
    ),
    h4: ({ children }) => (
      <Heading level={4} className="mt-6 mb-3 text-lg font-medium text-gray-900 dark:text-gray-100 font-shareTechMono">
        {children}
      </Heading>
    ),
    h5: ({ children }) => (
      <Heading level={5} className="mt-4 mb-2 text-base font-medium text-gray-900 dark:text-gray-100 font-shareTechMono">
        {children}
      </Heading>
    ),
    h6: ({ children }) => (
      <Heading level={6} className="mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-gray-100 font-shareTechMono">
        {children}
      </Heading>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-blue-500 pl-4 italic text-gray-700 dark:text-gray-300">{children}</blockquote>
    ),
    ul: ({ children }) => <ul className="my-4 list-disc pl-6 text-gray-700 dark:text-gray-300">{children}</ul>,
    ol: ({ children }) => <ol className="my-4 list-decimal pl-6 text-gray-700 dark:text-gray-300">{children}</ol>,
    p: ({ children }) => <p className="my-4 text-gray-700 dark:text-gray-300 leading-relaxed">{children}</p>,
  },
  marks: {
    internalLink: ({ children, value }: any) => {
      const { slug } = value;
      if (!slug) return <>{children}</>;

      // Determine if this is a blog post link
      const isBlogPost = slug.current.startsWith('blog/') || slug.current.startsWith('dev/');
      
      // Format the href correctly based on the slug
      let href = slug.current;
      
      // If it's a blog post, ensure it has the correct format
      if (isBlogPost) {
        // Extract the actual slug part (after 'blog/' or 'dev/')
        const slugPart = slug.current.replace(/^(blog|dev)\//, '');
        href = `/blog/${slugPart}`;
      }

      return (
        <Link href={href} className="text-blue-700 dark:text-blue-400 hover:underline">
          {children}
        </Link>
      );
    },
    link: ({ children, value }: any) => {
      const { href, blank } = value;
      if (!href) return <>{children}</>;

      return (
        <a
          href={href}
          target={blank ? '_blank' : undefined}
          rel={blank ? 'noopener noreferrer' : undefined}
          className="text-blue-700 dark:text-blue-400 hover:underline"
        >
          {children}
        </a>
      );
    },
    'grey-400': ({ children }) => <span className="text-gray-400 dark:text-gray-500">{children}</span>,
    bold: ({ children }) => <strong className="font-semibold">{children}</strong>,
    italic: ({ children }) => <em>{children}</em>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="mb-2">
        <span className="mr-2">•</span>
        {children}
      </li>
    ),
    number: ({ children }) => <li className="mb-2">{children}</li>,
  },
};
