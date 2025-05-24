import type { PortableTextBlock } from '@portabletext/types';

/**
 * Returns the ordinal suffix for a given number
 * @param day - The day number
 * @returns The appropriate ordinal suffix
 */
const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) {
    return 'th';
  }
  
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

/**
 * Creates a Date object from a string and validates it
 * @param dateString - The input date string
 * @returns A valid Date object
 * @throws Error if the date is invalid
 */
const createValidDate = (dateString: string): Date => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string provided');
  }
  return date;
};

/**
 * Formats a date string into a human-readable format with ordinal suffix
 * @param dateString - The input date string
 * @param preferredOptions - Optional formatting options
 * @param showWeek - Whether to include the day of the week
 * @returns A formatted date string
 */
export const formatDate = (dateString: string, preferredOptions?: Intl.DateTimeFormatOptions, showWeek = true): string => {
  const date = createValidDate(dateString);

  if (preferredOptions) {
    return date.toLocaleDateString('en-US', preferredOptions);
  }

  const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
  const formattedDate = date.toLocaleDateString(
    'en-US', 
    showWeek ? { weekday: 'long', ...options } : options
  );

  const day = date.getDate();
  return formattedDate.replace(/\d+/, `${day}${getOrdinalSuffix(day)}`);
};

/**
 * Converts Portable Text blocks to plain text
 * @param blocks - Array of Portable Text blocks
 * @returns Plain text string
 */
/**
 * Time units for relative time formatting
 */
type TimeUnit = {
  name: string;
  singularName: string;
  threshold: number;
  divisor: number;
};

/**
 * Time units configuration for relative time formatting
 */
const TIME_UNITS: TimeUnit[] = [
  { name: 'seconds', singularName: 'second', threshold: 60, divisor: 1 },
  { name: 'minutes', singularName: 'minute', threshold: 60, divisor: 60 },
  { name: 'hours', singularName: 'hour', threshold: 24, divisor: 60 * 60 },
  { name: 'days', singularName: 'day', threshold: 7, divisor: 60 * 60 * 24 },
  { name: 'weeks', singularName: 'week', threshold: 4, divisor: 60 * 60 * 24 * 7 },
  { name: 'months', singularName: 'month', threshold: 12, divisor: 60 * 60 * 24 * 30 },
  { name: 'years', singularName: 'year', threshold: Infinity, divisor: 60 * 60 * 24 * 365 }
];

/**
 * Formats a time difference into a human-readable string
 * @param diffSeconds - Time difference in seconds
 * @returns A formatted string representing the time difference
 */
const formatTimeDifference = (diffSeconds: number): string => {
  // Special case for very recent times
  if (diffSeconds < 60) {
    return 'just now';
  }
  
  // Find the appropriate time unit
  const unit = TIME_UNITS.find((unit, index) => {
    const nextUnit = TIME_UNITS[index + 1];
    if (!nextUnit) return true;
    
    const value = Math.floor(diffSeconds / unit.divisor);
    return value < unit.threshold;
  });
  
  if (!unit) return 'some time ago'; // Fallback
  
  const value = Math.floor(diffSeconds / unit.divisor);
  const unitName = value === 1 ? unit.singularName : unit.name;
  const prefix = value === 1 ? 'a' : value.toString();
  const article = value === 1 && unit.singularName.match(/^[aeiou]/i) ? 'an' : 'a';
  
  return `${value === 1 ? article : prefix} ${unitName} ago`;
};

/**
 * Formats a date as a relative time estimate (e.g., "a day ago", "2 months ago")
 * @param dateString - The input date string
 * @returns A string representing the relative time
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = createValidDate(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  
  return formatTimeDifference(diffSeconds);
};

/**
 * Extracts text from a single Portable Text block
 * @param block - A Portable Text block
 * @returns The extracted text as a string
 */
const extractTextFromBlock = (block: PortableTextBlock): string => {
  if (block._type !== 'block' || !block.children) {
    return '';
  }
  
  return block.children
    .map((child: any) => child.text || '')
    .join('');
};

/**
 * Validates input blocks for the toPlainText function
 * @param blocks - Array of Portable Text blocks
 * @throws Error if blocks are invalid
 */
const validateBlocks = (blocks: PortableTextBlock[] = []): void => {
  if (!blocks || !Array.isArray(blocks)) {
    throw new Error('Invalid blocks provided to toPlainText');
  }
};

/**
 * Converts Portable Text blocks to plain text
 * @param blocks - Array of Portable Text blocks
 * @returns Plain text string
 */
export const toPlainText = (blocks: PortableTextBlock[] = []): string => {
  validateBlocks(blocks);
  return blocks
    .map(extractTextFromBlock)
    .filter(text => text.length > 0)
    .join('\n\n');
};

/**
 * Transforms a string by applying a series of replacements
 * @param str - The input string
 * @param replacements - Array of [regex, replacement] tuples
 * @returns The transformed string
 */
const applyReplacements = (str: string, replacements: [RegExp, string][]): string => {
  return replacements.reduce(
    (result, [pattern, replacement]) => result.replace(pattern, replacement),
    str
  );
};

/**
 * Converts a string to kebab-case
 * @param str - The input string
 * @returns A kebab-cased string
 */
export const toKebabCase = (str: string): string => {
  const replacements: [RegExp, string][] = [
    [/([a-z])([A-Z])/g, '$1-$2'],
    [/\s+/g, '-'],
    [/[^a-zA-Z0-9-]/g, '']
  ];
  
  return applyReplacements(str, replacements).toLowerCase();
};

/**
 * Capitalizes the first letter of a word
 * @param word - The input word
 * @returns The capitalized word
 */
const capitalizeWord = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

/**
 * Converts a kebab-cased string to a title-cased string
 * @param str - The input kebab-cased string
 * @returns A title-cased string
 */
export const kebabToTitleCase = (str: string): string => {
  return str
    .split('-')
    .map(capitalizeWord)
    .join(' ');
};
