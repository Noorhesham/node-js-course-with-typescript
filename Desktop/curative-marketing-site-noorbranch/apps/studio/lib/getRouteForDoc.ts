type DocWithType = {
  _type?: string
  seo?: {
    slug: {
      current: string
    }
  }
}

const getRoutePrefixForType = (type: string) => {
  switch (type) {
    case 'blogPost':
      return 'resources/articles'
    case 'clientStory':
      return 'client-stories'
    case 'legalPage':
      return 'company/legal'
    case 'glossaryTerm':
      return 'resources/articles/glossary'
    case 'report':
      return 'resources/reports-and-guides'
    case 'guide':
      return 'resources/reports-and-guides'
    case 'ebook':
      return 'resources/webinars-and-events'
    case 'event':
      return 'resources/webinars-and-events'
    case 'technologyPartner':
      return 'partners/technology-partners'
    case 'solutionsPartner':
      return 'partners/solutions-partners'
    case 'technologyPage':
      return 'capabilities'
    default:
      return null
  }
}

export const getRouteForDoc = ({ _type, seo }: DocWithType) => {
  if (!_type) {
    return null
  }

  if (!seo?.slug?.current) {
    return null
  }

  if (seo.slug.current === '/') {
    return '/'
  }

  const prefix = getRoutePrefixForType(_type)

  const routeSegements = [
    prefix ? `/${prefix}` : undefined,
    `/${seo.slug.current}`,
  ]

  const route = routeSegements.filter(Boolean).join('')

  return route
}
