import type {
  DocumentResolver,
  DocumentResolverContext,
} from '@sanity/presentation'

export const resolveDocForRoute = (
  context: DocumentResolverContext,
): DocumentResolver => {
  const fullRoute = context.path

  // Skip resolution for API routes
  if (fullRoute.startsWith('/api/')) {
    return {
      filter: '_type == "page" && seo.slug.current == "home"',
      params: {}
    }
  }

  // Remove any trailing slashes and get the last segment
  const cleanRoute = fullRoute.replace(/\/$/, '')
  const slug = cleanRoute ? cleanRoute.split('/').pop() : '/'

  const types = fullRoute.includes('solutions')
          ? ['useCasePage', 'industryPage']
          : fullRoute.includes('product')
            ? ['productPage']
            : fullRoute.includes('resources/reports-and-guides')
              ? ['report', 'guide']
              : fullRoute.includes('webinars/')
                ? ['ebook', 'event']
                : fullRoute.includes('blog/')
                    ? ['blogPost']
                    : fullRoute.includes('legal/')
                      ? ['legalPage']
                      : fullRoute.includes('client-stories')
                        ? ['clientStory']
                        : ['page']

  const filterParams = {
    types,
    slug:
      fullRoute === '/'
        ? fullRoute
        : arraysOverlap(types, [
              'page',
              'capabilitiesPage',
              'stagePage',
              'industryPage',
              'useCasePage',
              'paidLandingPage',
              'listingPage',
            ])
          ? fullRoute.replace('/', '')
          : slug,
  }

  return {
    filter: 'seo.slug.current == $slug',
    // @ts-ignore - valid filter params can include records with a string array value
    params: filterParams,
  }
}

const arraysOverlap = (arr1: string[], arr2: string[]): boolean =>
  arr1.some((item) => arr2.includes(item))
