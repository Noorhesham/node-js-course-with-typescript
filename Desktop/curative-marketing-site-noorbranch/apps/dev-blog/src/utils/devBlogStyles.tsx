import { RichTextComponents } from './richTextParser';
import { imageBuilder } from '@client';
import Image from 'next/image';
import { getImageDimensions } from '@sanity/asset-utils';
import CodeSnippet from '@primatives/CodeSnippet';

/**
 * Topic item from table of contents
 */
type TopicItem = {
  title: string;
  id: string;
  level?: number;
};

/**
 * Props for heading components
 */
type HeadingProps = {
  children: React.ReactNode;
  value: {
    _key: string;
  };
};

/**
 * Finds a matching topic item for a heading
 * @param topics - Array of topic items
 * @param headingText - Text content of the heading
 * @param level - Heading level (h1, h2, etc.)
 * @returns The matching topic item or undefined
 */
const findMatchingTopic = (topics: TopicItem[], headingText: string, level: number): TopicItem | undefined => {
  return topics.find(item => item.title === headingText && (!item.level || item.level === level));
};

/**
 * Extracts text content from children
 * @param children - React children nodes
 * @returns The extracted text content
 */
const getHeadingText = (children: React.ReactNode): string => {
  if (!children || !Array.isArray(children)) return '';
  return children[0]?.text || '';
};

/**
 * Creates a heading component with proper ID and styling
 * @param level - Heading level (h2, h3, etc.)
 * @param className - CSS class name
 * @param topicsArray - Array of topic items for finding matching headings
 * @returns A heading component function
 */
const createHeadingComponent = (level: number, className: string, topicsArray: TopicItem[]) => {
  return ({ children, value }: HeadingProps): JSX.Element => {
    const headingText = getHeadingText(children);
    const tocItem = findMatchingTopic(topicsArray, headingText, level);
    const id = tocItem?.id || value._key;
    
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  };
};

/**
 * Creates dev blog specific rich text components by extending the base components
 * @param topics - Array of table of contents topics for linking headings
 * @returns Customized portable text components for dev blog
 */
export const createDevBlogComponents = (topics: TopicItem[] = []) => {
  // Common class names for headings
  const baseHeadingClasses = "font-medium col-span-1 font-shareTechMono scroll-mt-20";
  
  return {
    ...RichTextComponents,
    block: {
      ...RichTextComponents.block,
      h2: createHeadingComponent(2, `text-2xl text-gray-900 dark:text-gray-100 ${baseHeadingClasses}`, topics),
      h3: createHeadingComponent(3, `text-xl text-gray-800 dark:text-gray-200 ${baseHeadingClasses}`, topics),
      h4: createHeadingComponent(4, `text-lg text-gray-800 dark:text-gray-200 ${baseHeadingClasses}`, topics),
      h5: createHeadingComponent(5, `text-base text-gray-800 dark:text-gray-200 ${baseHeadingClasses}`, topics),
      h6: createHeadingComponent(6, `text-sm mb-2 text-gray-800 dark:text-gray-200 ${baseHeadingClasses}`, topics),
      /**
       * Blockquote component for quoted content
       */
      blockquote: ({ children }: { children: React.ReactNode }): JSX.Element => (
        <blockquote className="border-l-4 border-dashed border-gray-300 dark:border-gray-700 pl-4 mb-4 italic col-span-1 font-ttFors text-base text-gray-700 dark:text-gray-300">
          {children}
        </blockquote>
      ),
      
      /**
       * Normal paragraph wrapper
       */
      normal: ({ children }: { children: React.ReactNode }): JSX.Element => (
        <div className="col-span-1">{children}</div>
      ),
      
      /**
       * Paragraph component
       */
      p: ({ children }: { children: React.ReactNode }): JSX.Element => (
        <p className="text-gray-800 dark:text-gray-200 font-ttFors text-base">{children}</p>
      ),
      
      /**
       * Unordered list component
       */
      ul: ({ children }: { children: React.ReactNode }): JSX.Element => (
        <ul className="list-disc pl-5 space-y-1 col-span-1 font-ttFors text-base text-gray-800 dark:text-gray-200">
          {children}
        </ul>
      ),
      
      /**
       * Ordered list component
       */
      ol: ({ children }: { children: React.ReactNode }): JSX.Element => (
        <ol className="list-decimal pl-5 space-y-1 col-span-1 font-ttFors text-base text-gray-800 dark:text-gray-200">
          {children}
        </ol>
      ),
    },
    marks: {
      ...RichTextComponents.marks,
      link: ({ children, value }: any) => {
        return (
          <a
            href={value?.href}
            className="text-blue-700 dark:text-blue-400 no-underline hover:underline"
            target={value?.href.startsWith('http') ? '_blank' : undefined}
            rel={value?.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {children}
          </a>
        );
      },
      code: ({ children }: any) => <code className="font-shareTechMono bg-gray-900 px-2 py-0.5 border-[1px] border-dashed border-gray-700 text-green-400 text-sm">{children}</code>,
      strong: ({ children }: any) => <strong className="font-medium text-gray-950 dark:text-gray-50">{children}</strong>,
    },
    types: {
      ...RichTextComponents.types,
      codeSnippet: ({ value }: any) => {
        const { code, language, filename } = value;
        if (!code) return null;

        return <CodeSnippet code={code} language={language} filename={filename} />;
      },
      image: ({ value }: any) => {
        const { width, height } = getImageDimensions(value);
        return (
          <div className="my-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-none overflow-hidden">
            <Image
              src={imageBuilder.image(value).url()}
              alt={value.alt || ''}
              width={width}
              height={height}
              className="w-full h-auto"
              loading="lazy"
            />
            {value.caption && (
              <div className="p-3 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border-t border-dashed border-gray-300 dark:border-gray-700">
                {value.caption}
              </div>
            )}
          </div>
        );
      },
    },
  };
};
