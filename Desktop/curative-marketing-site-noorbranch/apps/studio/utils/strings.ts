/**
 * Converts a camelCase string to Title Case with spaces
 * @example
 * toTitleCase('cardCarousel') // returns 'Card Carousel'
 * toTitleCase('basicText') // returns 'Basic Text'
 * toTitleCase('heroMarquee') // returns 'Hero Marquee'
 */
export const toTitleCase = (str: string): string => {
  // First split by capital letters and join with spaces
  const withSpaces = str.replace(/([A-Z])/g, ' $1').trim()
  
  // Then capitalize first letter and each letter after a space
  return withSpaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
